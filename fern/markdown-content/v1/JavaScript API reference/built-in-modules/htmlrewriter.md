---
title: "html-rewriter"
slug: "htmlrewriter"
excerpt: ""
hidden: false
createdAt: "Fri Apr 14 2023 15:11:32 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Wed May 08 2024 15:22:44 GMT+0000 (Coordinated Universal Time)"
---
This module is available to use in your EdgeWorkers functions to consume and rewrite HTML documents. The html-rewriter module includes a built-in parser that emulates standard HTML parsing and DOM-construction. 

> 📘 To learn more, go to the [Dynamic Content Assembly using the html-rewriter](doc:html-rewriter-dynamic-content-assembly) use case in this guide.

An EdgeWorkers function can register callbacks on CSS selectors. When the parser encounters an element matching the selector, it executes the callback. The callback can insert new content around the element, modify the tag attributes, or remove the element entirely. 

> 🚧 The HtmlRewritingStream **does not** escape inserted text. This means that you need to validate and escape user-supplied text to prevent [cross-site scripting (XSS)](https://developer.mozilla.org/en-US/docs/Web/Security/Types_of_attacks#cross-site_scripting_xss) vulnerabilities.

# HtmlRewritingStream Object

There are three steps to using the `html-rewriter`.

1. Create a new `HtmlRewritingStream`.  
   You need to create a new rewriter for each stream, because it's a stateful HTML parser. 

2. Add one or more handlers using the `onElement()` method.  
   The handlers call functions on their argument to modify the stream. 

3. Pipe an HTML stream through the rewriter object. 

Consider this EdgeWorkers function that inserts a beacon script into a webpage. 

```javascript
import { HtmlRewritingStream } from 'html-rewriter';
import { httpRequest } from 'http-request';
import { createResponse } from 'create-response';
             
  
export async function responseProvider(request) {
  // Setup: Fetch a stream containing HTML
  let htmlResponse = await httpRequest("/html");
  if (!htmlResponse.ok) {
    return createResponse(500, {}, `Failed to fetch doc: ${htmlResponse.status}`);
  }
  
  // (1) Create a new rewriter instance
  let rewriter = new HtmlRewritingStream();
  
  // (2) Add a handler to the rewriter: this one adds a <script> tag to the <head>.
  rewriter.onElement('head', el => {
    el.append('<script src="/beaconTracker.js"></script>');
  });
  
  // (3) Use `pipeThrough()` to modify the input HTML with the rewriter
  return createResponse(200, {}, htmlResponse.body.pipeThrough(rewriter))
}
```

The handler passed to the `onElement()` method inserts a new script tag into the HTML document.

This example shows how to insert a script tag.

```javascript
<html><head><title>Sample Page</title></head><body>Text</body></html>
```

Here's the updated code snippet that includes the specified script tag. A handler runs when it encounters the open tag. The operations that run on the handler's parameter can either occur immediately, or when the element closes. 

```javascript
<html><head><title>Sample Page</title><script src="/beaconTracker.js"></script></head><body>Text</body></html>
```

> 👍 You can associate multiple handlers with an `HtmlRewritingStream`.

## Streaming

You can use the `HtmlRewritingStream` in pipe chains. It acts as a transform stream that you can use with `ReadableStream.pipeThrough()` and `ReadableStream.pipeTo()`. 

When reading, instances of `HtmlRewritingStream` expect ArrayBuffers, which are interpreted as containing UTF8 characters. When reading from HTTP responses, the `response.body` can be streamed directly to rewriter instances. 

## CSS Selectors

The html-rewriter library supports type, class, attribute, and ID CSS selectors, as well as child and descendent combinators. 

You can, for example, rewrite a page to lazy load images, but load a hero image normally. In this example the hero image includes the ID "hero" so you can use `:not pseudoclass` with the ID selector `img:not(#hero)` to identify all of the non-hero images.

Here's the JavaScript for your EdgeWorkers function.

```javascript
import { HtmlRewritingStream } from 'html-rewriter';
import { httpRequest } from 'http-request';
import { createResponse } from 'create-response';
 
export async function responseProvider(request) {
     return httpRequest('/index.html').then(async response => {
        let rewriter = new HtmlRewritingStream();
        rewriter.onElement('img:not(#hero)', el => {
                el.setAttribute('loading', 'lazy');
        });
 
        return createResponse(200, {},
                response.body.pipeThrough(rewriter)
        );
    });
}
```

If the `index.html` file contains the following details the hero image remains unchanged. Lazy load only applies to the other images. 

```javascript HTML
<img id='hero' src='protagonist.jpg'>
<img id='unrelated' src='raven.jpg'>
<img src='rife.jpg'>
```

The EdgeWorkers output will contain the following images.

```Text HTML
<img id='hero' src='protagonist.jpg'>
<img id='unrelated' src='raven.jpg' loading='lazy'>
<img src='rife.jpg' loading='lazy'>
```

# Methods

## onElement()

Registers a handler to run when a CSS selector matches. The handler takes an Element object as a parameter and provides functions to modify the document. 

[block:parameters]
{
  "data": {
    "h-0": "Parameter",
    "h-1": "Type",
    "h-2": "Description",
    "0-0": "handler",
    "0-1": "Function<Element>",
    "0-2": "The function that runs when the selector matches. When the `HtmlRewritingStream` calls the handler, it passes an Element object as an argument.  \n  \nAsync handlers are not currently supported. It is not possible  to await an `httpRequest()` call in the handler.",
    "1-0": "selector",
    "1-1": "String",
    "1-2": "A CSS selector that specifies when the handler should run.  \n  \nEvaluates the selector string on the incoming text.  It does not match on text inserted with the [Element methods](doc:htmlrewriter#methods-1)."
  },
  "cols": 3,
  "rows": 2,
  "align": [
    "left",
    "left",
    "left"
  ]
}
[/block]


## Handler Execution Ordering

When multiple handlers match an element, they run in the order that `onHandler()` was called. 

The example below specifies the ordering.

```javascript
rewriter.onElement('div#example', tag => tag.append('A'));
rewriter.onElement('div#example', tag => tag.append('B'));
rewriter.onElement('div#example', tag => tag.append('C'));
```

The ordering occurs when the HTML runs.

```javascript
<div id='example'></div><div></div>
```

The output in this example shows that the handler added on line one runs first, followed by the subsequent handlers. 

```javascript
<div id='example'>ABC</div><div></div>
```

# Element Object

The Element object is an argument to the handler registered with the `onElement()`method. The handler calls functions on the Element to modify the output stream.  

> 📘 You should not store the Element object. It's reused when calling each handler. Using the object outside of the handler that it was passed into may have unexpected results.

## Properties

## selector

The CSS string passed to `onElement()`. 

## tag

The lowercase name of the matched HTML tag.

## Methods

The Element object supports methods for adding text around existing elements. The example below shows the output of processing `<div>original</div>`.

```javascript
el.before('before')               	el.after('after')
        |                                	|
     ---+--                            	--+--
     before<div>PREPENDoriginalAPPEND</div>after
                ---+---    	--+--
                   |         	|
    el.prepend('PREPEND') 	el.append('APPEND')
```

## after()

Inserts new content immediately after the end tag of the matched element. The argument is the new text to insert. 

```javascript
rewriter.onElement('div', el => el.after('AFTER'))
```

When given the input `<div></div>`, the rewriter transforms it to `<div></div>AFTER`. 

If the original document doesn't include a close tag for the element, you can use the `insert_implicit_close` optional argument to differentiate between the element child and the appended text. For example, you can use the logic in the code sample below if you want to expand certain links, but `</a>` tags don't appear reliably in the source document.

```javascript
rewriter.onElement('a[external]', el => {
  const external = el.removeAttribute('external');
  el.after(` <a href='https://original/${external}'>(Original)</a>`, {insert_implicit_close: true});
});
```

This lets you to gracefully handle malformed HTML with missing end tags.

```javascript
<div>Link <a href='/local/123.html' external='567.html'>Defrobulator</div>
```

The example below is rewritten so that the original `<a>` element now has an end tag. 

```javascript
<div>Link <a href='/local/123.html'>Defrobulator</a> <a href='https://original/567.html'>(Original)</a></div>
```

| Parameter | Type   | Description                                                                                                                                                                           |
| :-------- | :----- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| newText   | String | Text to add.                                                                                                                                                                          |
| options   | Object | An optional object that allows you to insert a trailing tag. If it includes a `insert_implicit_close` property set to Boolean `true`, then a close tag will be added to the document. |

## append()

Inserts content at the end of the element. 

This example adds scripts at the end of the `<head>` element.

```javascript
rewriter.onElement('head', el => {
    el.append('<script src="seo.js"></script>\n');
    el.append('<script src="browsers.js"></script>\n');
});
```

`<head></head>` is re-written to the following.

```javascript
<head><script src="seo.js"></script>
<script src="browsers.js"></script>
</head>
```

[block:parameters]
{
  "data": {
    "h-0": "Parameter",
    "h-1": "Type",
    "h-2": "Description",
    "0-0": "newText",
    "0-1": "String",
    "0-2": "Text to insert at the end of the element.  \nRepeated calls act like a FIFO queue. It inserts the contents of the first call first, and inserts the contents of the last call next to the end tag.",
    "1-0": "option",
    "1-1": "Object",
    "1-2": "**(Optional)** An argument that controls the insertion of a missing end tag. The rewriter will add the appropriate end tag to an implicitly closed tag of an Object if `insert_implicit_close` is set to `true`."
  },
  "cols": 3,
  "rows": 2,
  "align": [
    "left",
    "left",
    "left"
  ]
}
[/block]


## before()

Inserts text immediately before the start tag of the matched element.

This example inserts a leading div before the title.

```javascript
rewriter.onElement('h2.product-title', el => {
    el.before("<div class='h-product'>");
    el.removeAttribute('class');
});
```

It transforms `<h2 class='product-title'>Cheese slicer</h2>` to a micro friendly format.

```javascript
<div class='h-product'><h2>Cheese slicer</h2>
```

| Parameter | Type   | Description                                  |
| :-------- | :----- | :------------------------------------------- |
| newText   | String | Text to add before the start of the element. |

## getAttribute()

Reads the value of an attribute name on the tag, returning `undefined` if the attribute does not exist. 

This example changes the script path.

```javascript
rewriter.onElement('head script[type=module]', el => {
  const src = el.getAttribute('src');  
  el.setAttribute('src', src.replace('v1', 'v2'));
});
```

It uses the following input.

```javascript
<head><script type='module' src='/v1/mine.js'></script>
```

The rewriter changed the `v1` in the path to `v2`.

```javascript
<head><script type='module' src='/v2/mine.js'></script>
```

| Parameter | Type   | Description                                            |
| :-------- | :----- | :----------------------------------------------------- |
| name      | String | The case-insensitive name of the attribute to extract. |

## prepend()

Inserts content right after the start tag of the element. 

This example adds an `onElement` element to preload directives to a `<head>` element.

```javascript
rewriter.onElement('head', el => {
  el.prepend("<link rel='preload' href='main.js' as='script'/>");
});
```

The rewriter changed `<head></head>` to the following.

```javascript
<head><link rel='preload' href='main.js' as='script'/></head>
```

[block:parameters]
{
  "data": {
    "h-0": "Parameter",
    "h-1": "Type",
    "h-2": "Description",
    "0-0": "newText",
    "0-1": "String",
    "0-2": "New text to insert. Inserts the text immediately after the start tag, but before the content.  \n  \nCalls insert the text immediately after the start tag.  Repeated calls act like a LIFO queue. Inserts the contents of the last call first, and inserts the contents of the first call last."
  },
  "cols": 3,
  "rows": 1,
  "align": [
    "left",
    "left",
    "left"
  ]
}
[/block]


## removeAttribute()

Removes an attribute if it exists. Returns the value.

This example removes the `background` element of a body.

```javascript
rewriter.onElement('body', el => {
  el.removeAttribute('background')
});
```

| Parameter | Type   | Description                      |
| :-------- | :----- | :------------------------------- |
| name      | String | Case-insensitive attribute name. |

## replaceChildren()

Removes the children of the current element and inserts content in place of them. Leaves the tags intact. 

This example removes an inline script and instead loads a remote script.

```javascript
rewriter.onElement('script', el => {
  el.setAttribute('src', 'cached.js');
  el.replaceChildren('');
});
```

Running on an input of `<script>window.alert('hi')</script>`, produces the following output.

```javascript
<script src='cached.js'></script>
```

[block:parameters]
{
  "data": {
    "h-0": "Parameter",
    "h-1": "Type",
    "h-2": "Description",
    "0-0": "newText",
    "0-1": "String",
    "0-2": "The text to insert between the start and end tags.  \nIf `replaceChildren()` is called multiple times, the value passed in to the last invocation is inserted.",
    "1-0": "options",
    "1-1": "Object",
    "1-2": "An optional argument that controls the insertion of a missing end tag. The rewriter will add the appropriate end tag to an implicitly closed tag of an Object if `insert_implicit_close` is set to `true`."
  },
  "cols": 3,
  "rows": 2,
  "align": [
    "left",
    "left",
    "left"
  ]
}
[/block]


## replaceWith()

Removes the tags and element children. Inserts the passed content in its place. 

[block:parameters]
{
  "data": {
    "h-0": "Parameter",
    "h-1": "Type",
    "h-2": "Description",
    "0-0": "newText",
    "0-1": "String",
    "0-2": "The text inserted in place of the element and its children.  \nInserts the value passed in the last invocation if `replaceWith()` is called multiple times."
  },
  "cols": 3,
  "rows": 1,
  "align": [
    "left",
    "left",
    "left"
  ]
}
[/block]


This example registers a new callback.

```javascript
rewriter.onElement('div.loggedIn', el => el.replaceWith(''))
```

It uses the following input.

```javascript
<div>Welcome to our site</div>
<div class='loggedIn'>Cart is empty</div>
<div>Products</div>
```

The rewriter transforms the callback.

```javascript
<div>Welcome to our site</div>
 
<div>Products</div>
```

## setAttribute()

Sets the value of the named attribute.  Creates the attribute if one does not exist.

The following example.

```javascript
rewriter.onElement('div', el => {
  el.setAttribute('single', 'single', {quote: "'"});
  el.setAttribute('double', 'double', {quote: '"'});
});
```

When run on `<div>` produces the results below.

```javascript
<div single='single' double="double">
```

[block:parameters]
{
  "data": {
    "h-0": "Parameter",
    "h-1": "Type",
    "h-2": "Description",
    "0-0": "name",
    "0-1": "String",
    "0-2": "The name is case insensitive.  \n  If the name contains an illegal character, the function will throw a TypeError.",
    "1-0": "value",
    "1-1": "String",
    "1-2": "The value of the attribute. If the string contains illegal characters, they will be escaped. ",
    "2-0": "options",
    "2-1": "Object",
    "2-2": "**Optional  ** Controls the application of quotes to the attribute value. It must include a property named `quote`, whose value is a string containing either a single or double quote."
  },
  "cols": 3,
  "rows": 3,
  "align": [
    "left",
    "left",
    "left"
  ]
}
[/block]


> 👍 A number of functions support an optional `TrailingOpt` argument. If the argument is present, the options object must include a property named `insert_implicit_close` with a boolean value. When the value is `true`, elements that are missing a close tag will have one inserted.

## Insertion Ordering

When inserting text, the insertion point remains the same, even after other insertions. Consider a handler that uses multiple append statements.

```javascript
1 rewriter.onElement('div', tag => {
2   tag.after('A'));
3   tag.after('B')); 
4   tag.after('C'));
5 }
```

The `after()` insertion point is the end of the close tag. This means that an input of `<div></div>` produces an output of `<div></div>CBA`.

- The `after()` on line two inserts the A next to the close angle bracket.
- The `after()` on line three inserts the B between the close angle bracket and the previously inserted A.
- The `after()` on line four inserts the C between the close angle bracket and the previously inserted B.

## Replacement and Nested Handlers

Handler matching is disabled during replacement. 

For example, if you provide the following input.

```javascript
<div id="doomed">
  <i>internal</i>
</div>
```

With the following handlers.

```javascript
rewriter.onElement('div#doomed', el => el.replaceWith(''));
rewriter.onElement('div#doomed i', el => el.append('APPENDED'));
```

The handler that matches on `<i>` will not run.

That means your handlers must not rely on side-effects such as, modifying variables in the module scope, when replacement is occurring. 

# Development Tips

When creating a new handler, it's helpful to iterate on a controlled input. Rather than using an external document for your input, it's possible to use a locally defined `ReadableStream`.

```javascript
import { HtmlRewritingStream } from 'html-rewriter';
import { ReadableStream } from 'streams';
import { createResponse } from 'create-response';
import { TextEncoderStream } from 'text-encode-transform';
 
export async function responseProvider(request) {
    let source = new ReadableStream({
        start(controller) {
            controller.enqueue("<he");
            controller.enqueue("ad></head>");
            controller.enqueue("<div>hi");
            controller.close();
        }
    });
 
    const rewriter = new HtmlRewritingStream();
    rewriter.onElement('head', el => el.append('<script src="/beaconTracker.js"></script>'));
 
    return createResponse(200, {}, source.pipeThrough(new TextEncoderStream()).pipeThrough(rewriter));
}
```

Here's the expected output.

```javascript
<head><script src="/beaconTracker.js"></script></head><div>hi
```

The `ReadableStreams` pattern is helpful when writing small integration tests. 

> 📘 The `TextEncoderStream` is necessary because strings are written into the pipeline, rather than typed arrays.
