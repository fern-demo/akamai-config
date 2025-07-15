---
title: "Fragment generation using subWorkers"
slug: "subworkers-tutorial"
excerpt: ""
hidden: false
createdAt: "Tue Mar 05 2024 16:35:47 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Fri Apr 26 2024 11:19:33 GMT+0000 (Coordinated Universal Time)"
---
In this tutorial you'll learn how to use subWorkers to create a simple e-commerce website. There are various teams in this organization and each is responsible for creating their own EdgeWorker. This lets them divide the responsibility and workload while being able to release on their own schedule and use their preferred tools. Each EdgeWorker performs a different task such as authentication, personalization, and adding static content to the site.

To learn more, refer to [Create a subWorker](doc:create-a-subworker) in this guide.

[block:image]
{
  "images": [
    {
      "image": [
        "https://techdocs.akamai.com/edgeworkers/img/subWorkersFragmentGeneration-v2.jpg",
        null,
        ""
      ],
      "align": "center",
      "sizing": "700px"
    }
  ]
}
[/block]


# Create the subWorkers

To get started, you can create the fragment subWorkers pages that will be called by the main page. Each of these subWorkers pages need to be enabled as subWorkers in its `bundle.json` file. You need to [create a code bundle](doc:create-a-code-bundle) and [deploy](doc:deploy-hello-world-1) each subWorker separately.

## Enable subWorkers in the bundle.json files

To enable a subWorker, add the `invoke-for-edgeworker-clients` configuration setting to the EdgeWorkers'`bundle.json`  in each of the subWorkers.

Here's the `bundle.json` file from the Authentication EdgeWorkers code bundle.

```json
{
    "edgeworker-version": "1",
    "description" : "Add general sales items",
    "config" : {
        "subrequest": {
                "invoke-for-edgeworker-clients" : true
        }
    }
}
```

If this configuration setting is not included in the `bundle.json` file the EdgeWorkers function will return a status 22 "SubworkerNotEnabled" if a sub-request is made to the EdgeWorkers URL.

## Authentication subWorker

This EdgeWorkers function retrieves user data as JSON and caches it to pass it to other EdgeWorkers as input. These other EdgeWorkers execute later using the results from the call the Authentication EdgeWorker.

- The **Header EdgeWorker** adds the user name to header of the web page.
- The **Sales EdgeWorker** adds a list of products to the page that fit the interests of the authenticated user.

In this example the code just looks at a map. In an actual deployment the EdgeWorker would call a database.

```javascript
export async function onClientRequest(request) {

        switch (request.getHeader("auth")?.[0]) {
        case "alex":
                request.respondWith(200, {}, `{"name": "Alex", "type": "member", "interests": [
                        "Automotive",
                        "Outdoors",
                        "Movies",
                        "Music"
                ]}`);
                return;

        case "bob":
                request.respondWith(200, {}, `{"name": "Bob Bills", "type": "member", "interests": [
                        "Automotive",
                        "Outdoors",
                        "Movies",
                        "Dogs"
                ]}`);
                return;

        case "gus":
                request.respondWith(200, {}, `{"name": "Gus", "type": "member", "interests": [
                        "Gadgets",
                        "Candy",
                        "Snails",
                        "Star Trek"
                ]}`);
                return;
        }

        request.respondWith(200, {}, '{"name": "Guest", "type": "guest", "interests": []}');
}
```

## Sales subWorker

The **Sales EdgeWorker** also uses input from the Authentication EdgeWorker to add a list of products that fits the interests of the logged in user.

If the user is not logged in, the Acquisition page will display instead.

The Sales EdgeWorker includes a sub-request to another subWorker that picks products of interest also retrieved from the Authorization EdgeWorker. This demonstrates how data is passed dynamically from one EdgeWorker to another. 

```javascript
 let imageReq = await httpRequest('/fragment/products', {headers: {interests: interests.join(',')}});
```

Here's the complete code sample.

```javascript
import { logger } from 'log';
import { httpRequest } from 'http-request';

export async function onClientRequest(request) {
  let memberDeals = "";
  if (request.getHeader("type")?.[0] == "member") {
    let images = "<table><tr align=center>";
    let interests = JSON.parse(request.getHeader("interests")[0]);

    logger.log("interests: ", interests);
    let imageReq = await httpRequest('/fragment/products', {headers: {interests: interests.join(',')}});
    let imageMapping = await imageReq.json();
    logger.log("imageMapping: %o", imageMapping);

    for (const name of interests) {
      images += `<td><div style="font-size: 800%">${imageMapping[name]}</div>${name}\n`;
    }
    images += "</table>"


    let name = request.getHeader("name")[0];
    let first = undefined;
    first = name.split(' ')[0];

    logger.log("Showing interests for %s", name);

    memberDeals = `<div class="deals">Member Deals for ${first.toString()}</div>${images}\n`;
  }

  request.respondWith(200, {}, `Categories: <table><tr align=center><td><div style="font-size: 800%">&#9917;</div>Sports
<td><div style="font-size: 800%">&#127968;</div>Homewares
<td><div style="font-size: 800%">&#x1f33c;</div>Gardening
<td><div style="font-size: 800%">&#127829;</div>Entertaining
</table>\n${memberDeals}\n`);
}
```

## Products subWorker

The **Products EdgeWorker** is nested under the Sales subWorker and includes a static list of potential customer interests to display.

```javascript

export function onClientRequest (request) {
  let products = {
    "Automotive": "&#128663;",
    "Outdoors": "&#129406;",
    "Movies": "&#127871;",
    "Music": "&#127932;",
    "Sports": "&#9917;",
    "Homewares": "&#127968;",
    "Gardening": "&#x1f33c;",
    "Gadgets": "&#128241;",
    "Cats": "&#128008;",
    "Ice Cream": "&#127846;",
    "Entertaining": "&#127829;",
    "Candy": "&#127851;", 
    "Snails": "&#128012;", 
    "Star Trek": "&#128406;"
  };

  let interests = request.getHeader('interests')[0].split(",");
  let out = {};
  for (const interest of interests) {
    if (products.hasOwnProperty(interest)) {
      out[interest] = products[interest].toString();
    }
  }

  request.respondWith(200, {}, JSON.stringify(out));
}

```

## Acquisition subWorker

This page displays if no known user is available or logged in. It provides a generic selection of sale items.

```javascript

export function onClientRequest (request) {
                request.respondWith(200, {}, `<div>Explore our Broad Selection</div>\n
<table><tr align=center><td><div style="font-size: 800%">&#9917;</div>Sports
<td><div style="font-size: 800%">&#127968;</div>Homewares
<td><div style="font-size: 800%">&#x1f33c;</div>Gardening
<td><div style="font-size: 800%">&#127829;</div>Entertaining
</table>
`);
                return;
}
```

## Header and Footer subWorkers

The **Header EdgeWorker** uses input from the Authentication EdgeWorker to add the user name to the header. 

```javascript

export function onClientRequest(request) {
  let msg;
  let name = request.getHeader("name")?.[0];
  if (name) {
          msg = `Hi ${name}`;
  }
  else {
          msg = `Welcome Guest!`;
  }

  let out = `<html><head></head><body style='font-size: x-large'>${msg}<br>\n`
  request.respondWith(200, {}, out);
  
  return;
}
```

The **Footer EdgeWorker** contains static content that can be easily cached.

```javascript

export function onClientRequest (request) {
  request.respondWith(200, {}, `<hr><div style="font-size: small">Copyright testsite.com, 2013-2024</div>`);
}
```

# Main EdgeWorkers page

The main page uses sub-requests to invoke the subWorker pages. The subWorkers are direct children of the main page with the exception of the Products page. The Products page is called by the Sales subWorker page. 

1. This section of the code defines the URLs for the subWorkers. 

```javascript
const AUTH_EW = "/fragment/auth";  
const PAGE_START_EW = "/fragment/header";  
const FOOTER = "/fragment/footer";

const ACQUISITION = "/fragment/acquisition";  
const SALES = "/fragment/sales";
```

2. This is an example an http request call to a subWorker.

```javascript
// Fetch static content early  
	let footerReq = httpRequest(FOOTER);
```

3. This defines the logic that determines if you are guest or a known user. If a known user is logged in it enables the Sales EdgeWorkers that includes the nested Products EdgeWorker.

```javascript
// Choose the EW to run based on whether the user is registered  
	let productReq;  
	if (user.type == "guest") {  
		logger.log("Got a GUEST, showing ACQUISITION");  
		productReq = httpRequest(ACQUISITION);  
	} else {  
		logger.log("Got user %s, showing SALES", user.name);  
		productReq = httpRequest(SALES, {headers: {name: user.name, type: user.type, interests: JSON.stringify(user.interests)}});  
	}
```

4. This builds the final response and streams it back as a response.

```javascript
return createResponse(200, {"Cache-Control": "no-store"}, readable)
}
```

Here's the complete code sample for the main page.

```javascript
import { httpRequest } from "http-request";
import { TransformStream } from 'streams';
import { createResponse } from 'create-response';
import { logger } from 'log';
import URLSearchParams from 'url-search-params';

const AUTH_EW = "/fragment/auth";
const PAGE_START_EW = "/fragment/header";
const FOOTER = "/fragment/footer";

const ACQUISITION = "/fragment/acquisition";
const SALES = "/fragment/sales";

export async function responseProvider(request) {
	// Find the user making the request.
	let userName = new URLSearchParams(request.query).get('user');
	let userReq = httpRequest(AUTH_EW, {headers: {Auth: userName}});

	let {readable, writable} = new TransformStream();

	// Fetch static content early
	let footerReq = httpRequest(FOOTER);

	let user = await (await userReq).json();

	let startReq = httpRequest(PAGE_START_EW, {headers: {name: user.name}});

	// Choose the EW to run based on whether the user is registered
	let productReq;
	if (user.type == "guest") {
		logger.log("Got a GUEST, showing ACQUISITION");
		productReq = httpRequest(ACQUISITION);
	} else {
		logger.log("Got user %s, showing SALES", user.name);
		productReq = httpRequest(SALES, {headers: {name: user.name, type: user.type, interests: JSON.stringify(user.interests)}});
	}

	// Stream the dynamic page head back
	let streamPromise = startReq.then(req => req.body.pipeTo(writable, {preventClose: true}));

	// Stream the dynamic body back
	streamPromise = streamPromise.then(_ => productReq.then(req => req.body.pipeTo(writable, {preventClose: true})));

	// Stream the static page footer back
	streamPromise.then(_ => footerReq.then(req => req.body.pipeTo(writable)));

	return createResponse(200, {"Cache-Control": "no-store"}, readable)
}
```

## Make a call to the main EdgeWorkers page

This example illustrates what happens when a user logs in and makes an HTTP request to the main EdgeWorkers page. 

To see this page, load `https://<hostname>/?user=Alex` in your browser, where the `<hostname>` is the name of the property.

 You can also use a curl request, `https://<hostname>/?user=Alex` to load the page.

The main EdgeWorkers page uses the [Authentication subWorker](doc:subworkers-tutorial#authentication-subworker) to retrieve information about the logged in user and adds a list of products to the page from the [Sales subWorker](doc:subworkers-tutorial#sales-subworker) that fit the interests of the authenticated user.

[block:image]
{
  "images": [
    {
      "image": [
        "https://techdocs.akamai.com/edgeworkers/img/loggedInUser-v2.jpg",
        null,
        ""
      ],
      "align": "center",
      "border": true
    }
  ]
}
[/block]


When, on the other hand, a user makes a request to the main page and  is not logged in, the page only displays generic products.

[block:image]
{
  "images": [
    {
      "image": [
        "https://techdocs.akamai.com/edgeworkers/img/genericUser-v2.jpg",
        null,
        ""
      ],
      "align": "center",
      "border": true
    }
  ]
}
[/block]


<br>
