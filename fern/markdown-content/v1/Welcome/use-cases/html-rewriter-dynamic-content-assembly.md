---
title: "Dynamic Content Assembly using the html-rewriter"
slug: "html-rewriter-dynamic-content-assembly"
excerpt: "Learn how to use the EdgeWorkers [html-rewriter](doc:htmlrewriter) to generate dynamic HTML content."
hidden: false
createdAt: "Tue Jul 25 2023 13:49:53 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Tue Oct 01 2024 16:38:19 GMT+0000 (Coordinated Universal Time)"
---
This example demonstrates how to combine JSON data from an API endpoint with an HTML template to make real-time changes to HTML code. When a logged in user makes a request, a discount code is also dynamically applied to the rendered content. These changes are made without altering the original source code on the origin server.

The template, JSON data, and rendered content can all be efficiently cached at the Edge. This further optimizes response times and the overall site experience.

# How the html-rewriter works

The [html-rewriter](doc:htmlrewriter) module modifies HTML content programmatically at the Akamai Edge. It intercepts the HTML response from the origin and processes it before delivering it to the client. The main purpose of an HTML rewriter is to make these real-time changes to the HTML code without altering the original code on the origin server. 

The html-rewriter operates on an HTTP response stream and solves the challenges of matching selectors across chunk boundaries as we read from the stream. It supports CSS selectors to define patterns used to match or select elements that you want to rewrite with the html-rewriter. It also exposes the `onElement()` method which lets you register a handler to run when a CSS selector matches. This handler can insert new content, modify the selected element, or even remove it from the document.

# Benefits of using the html-rewriter

By using an EdgeWorkers function to perform Dynamic Content Assembly you enhance site performance, offload server resources, and unlock SEO advantages. Review this list to learn more about the benefits that this approach offers.

- **Content Personalization** - Customize the HTML content based on various factors, such as the user's location, device type, preferences, or browsing history.
- **A/B Testing** - Serve different variations of content to different users to evaluate the effectiveness of different content strategies.
- **Dynamic Content Injection** -  Dynamically insert content into the HTML response based on specific conditions or events, allowing for targeted messages or promotions.
- **Security** - Sanitize and validate the HTML content and even dynamically add CSP headers.
- **Performance Optimization** - Remove unnecessary or redundant elements from the HTML to reduce the size of the response and improve page load times.
- **SEO Optimization** - Customize SEO elements, such as meta tags and page titles to improve search engine rankings.
- **Quick Fixes and Emergency Changes** - Apply updates or temporary patches to resolve critical issues without modifying the original source code.

# Before you begin

Let's get started building your EdgeWorkers function. This example shows you how to use the html-rewriter module in an EdgeWorkers function to deliver customized HTML content based on dynamic data, the menu items, and the user authentication status. You'll also learned how to effectively cache the different resources. 

> 📘 For more information and access to a complete EdgeWorkers code bundle for the Dynamic Content Assembly example go to the [EdgeWorkers GitHub repo](https://github.com/akamai/edgeworkers-examples/tree/master/edgecompute/examples/stream/dynamic%20content%20assembly).
> 
> You can also go to the [EdgeWorkers Edge Compute demo site](https://www.edgecompute.live/)to see this use case example in action and to view the underlying code.

Here's the complete JavaScript code for the EdgeWorkers `main.js` file. We'll go through the different sections of this example in more detail below.

```javascript
import { HtmlRewritingStream } from 'html-rewriter';
import { httpRequest } from 'http-request';
import { createResponse } from 'create-response';
export async function responseProvider(request) {

  let jsonresponse = await httpRequest('/menujson');
  let menujson = await jsonresponse.json();

  let rewriter = new HtmlRewritingStream();
  rewriter.onElement('section', el => {
    el.before(`<h2>${menujson[0].name}</h2>`);
    el.after(`<article class="item"><p class="coffee">${menujson[0].items[3].item}</p><p class="mocha">${menujson[0].items[3].price}</p></article>`);
    el.prepend(`<article class="item"><p class="coffee">${menujson[0].items[2].item}</p><p class="latte">${menujson[0].items[2].price}</p></article>`);
    el.append(`<article class="item"><p class="coffee">${menujson[0].items[1].item}</p><p class="espresso">${menujson[0].items[1].price}</p></article>`);
    el.replaceChildren(`<article class="item"><p class="coffee">${menujson[0].items[0].item}</p><p class="americano">${menujson[0].items[0].price}</p></article>`);
  });

  if(getLoggedInUser(request)){
    rewriter.onElement('h1', el => {
      el.after('<p class="offer">Special 20% discount member offer applied!</p>');
    });
  }

  let subrequestHeaders = {"X-Subrequest": ["true"]};
  let htmlResponse = await httpRequest("/template", {headers: subrequestHeaders});
  if (!htmlResponse.ok) {
    return createResponse(500, {}, `Failed to fetch doc: ${htmlResponse.status}`);
  }
  return createResponse(200, {}, htmlResponse.body.pipeThrough(rewriter));
}

function getLoggedInUser(){
  //your logic for logged in users
}
```

# 1. Make a request to origin

The first step when configuring dynamic content assembly is to make a request to the origin server to get the content you want to use in the response. 

Follow these steps to make a request to origin to get a JSON object. The JSON object will be read and used to populate the response HTML.

1. Make an http sub-request to `/menujson`. The sub-request returns a Promise that resolves to an `httpResponse` object.

```javascript
 let jsonresponse = await httpRequest('/menujson');
```

2. Next, take the response stream and resolve the result as JSON.

```javascript
 let menujson = await jsonresponse.json();
```

# 2. Make a request for the template

The next step is to make a request to get the barebones template that you will populate with the JSON using the html-rewriter.

1. Set a header called `X-Subrequest`. This header will identify http requests from EdgeWorkers functions and configure cache keys to enable caching of this request.

```javascript
let subrequestHeaders = {"X-Subrequest": ["true"]};
```

2. Make an http sub-request to `/template`. This template returns a Promise that resolves to an `httpResponse` object.

```javascript
let htmlResponse = await httpRequest("/template", {headers: subrequestHeaders});
```

# 3. Pipe the response stream through the html-rewriter

In this step you need to pipe the response stream through the html-writer and register handlers to update the HTML template with the JSON.

1. Create a new `HtmlRewritingStream`. This creates a new rewriter for each stream, because it's a stateful HTML parser.

```javascript
 let rewriter = new HtmlRewritingStream();
```

2. Add handlers using the `onElement()` method to modify the stream.

In this example we use five different selectors for the callback. You can simplify your code but for the purpose of the example it showcases the different selectors and how they behave.

```javascript
rewriter.onElement('section', el => {
    el.before(`<h2>${menujson[0].name}</h2>`);
    el.after(`<article class="item"><p class="coffee">${menujson[0].items[3].item}</p><p class="mocha">${menujson[0].items[3].price}</p></article>`);
    el.prepend(`<article class="item"><p class="coffee">${menujson[0].items[2].item}</p><p class="latte">${menujson[0].items[2].price}</p></article>`);
    el.append(`<article class="item"><p class="coffee">${menujson[0].items[1].item}</p><p class="espresso">${menujson[0].items[1].price}</p></article>`);
    el.replaceChildren(`<article class="item"><p class="coffee">${menujson[0].items[0].item}</p><p class="americano">${menujson[0].items[0].price}</p></article>`);
  });
```

3. Pipe the HTML template stream through the html-rewriter. This creates the response.

```javascript
 return createResponse(200, {}, htmlResponse.body.pipeThrough(rewriter));
```

# 4. Review the response

Here's the template before the EdgeWorkers function runs.

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <title>Akamai Coffee</title>
    <link rel="stylesheet" href="/styles.css">
</head>
<body>
<div class="menu">
    <main>
        <h1>Akamai Menu</h1>
        <hr>
        <section>
        </section>
    </main>
</div>
</body>
</html>


```

Here's the generated content after the EdgeWorkers function runs.

```html
<!DOCTYPE html>

<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <title>Akamai Coffee</title>
    <link rel="stylesheet" href="/styles.css">
</head>
<body>
<div class="menu">
    <main>
        <h1>Akamai Coffee</h1>
        <hr>
        <section>
            <h2>Coffee Menu</h2>
            <article class="item">
                <p class="coffee">Americano</p><p class="americano">$3.00</p>
            </article>
            <article class="item">
                <p class="coffee">Espresso</p><p class="espresso">$2.50</p>
            </article>
            <article class="item">
                <p class="coffee">Latte</p><p class="latte">$3.50</p>
            </article>
            <article class="item">
                <p class="coffee">Mocha</p><p class="mocha">$4.50</p>
            </article>
        </section>
    </main>
</div>
</body>
</html>
```

This is JSON that is returned.

```json
\[  
    {  
        "id": "1",  
        "name": "Coffee Menu",  
        "items": [  
            {  
                "item": "Americano",  
                "price": "$3.00"  
            },  
            {  
                "item": "Espresso",  
                "price": "$2.50"  
            },  
            {  
                "item": "Latte",  
                "price": "$3.50"  
            },  
            {  
                "item": "Mocha",  
                "price": "$4.50"  
            }  
        ]  
    }  
]
```

# 5. Implement caching

To gain further performance benefits from dynamic content assembly you can also implement caching. In the example above there's opportunity to cache the HTML template, the JSON object, and the content generated from html-rewriter.

To cache the HTML template and JSON you can use the [caching](https://techdocs.akamai.com/property-mgr/docs/caching-2) and [cache prefresh](https://techdocs.akamai.com/property-mgr/docs/cache-prefresh-refresh) Property Manager behaviors. You also need to make a small addition to the EdgeWorkers sub-request and add an `\X-Subrequest` header to the request. This identifies requests that come from an EdgeWorkers function so you can then use the header as part of the cache key.

[block:image]
{
  "images": [
    {
      "image": [
        "https://techdocs.akamai.com/edgeworkers/img/cacheIdModification-v1.png",
        null,
        ""
      ],
      "align": "center",
      "border": true
    }
  ]
}
[/block]


Caching the content created by the html-rewriter requires a little extra care. There are two variants of content, one for regular users and one displaying a discount code for logged in users. You need to distinguish between the two variants to avoid cache key collisions because they both share the same URL. To do this you need to include the cookie that is set for logged in users as part of the cache key. This creates separate cache keys for each variant defined by attributes in the request. The final result looks like this.

[block:image]
{
  "images": [
    {
      "image": [
        "https://techdocs.akamai.com/edgeworkers/img/cacheIdModification2-v1.png",
        null,
        ""
      ],
      "align": "center",
      "border": true
    }
  ]
}
[/block]


> 📘 For a deep dive into caching considerations and transformed content refer to the [Response content transformation](doc:transform-response-content) use case.
