---
title: "Response orchestration"
slug: "response-orchestration"
---
Response Orchestration, also known as Dynamic Content Assembly, is the ability to create on-the-fly response data and content.

You can use Response Orchestration to dynamically create tailored, personalized data or web content for a specific set of users or devices. You can also source data and content from multiple server-side APIs or content origins. Response Orchestration supports conditions when combining multiple data sets or HTML fragments.

EdgeWorkers provides two mechanisms for returning response objects to the client from the edge:

- the `responseProvider` event handler.
- the `respondWith()` JavaScript method available from the Request Object.

# responseProvider

Use the `responseProvider` event handler to generate and manipulate response bodies within an EdgeWorkers function. When building your Edge solutions, you can fetch resources from other external origins and add them directly or indirectly into the main response body. With `responseProvider` you can make Edge decisions, build content, and optionally cache response output.

The diagram below illustrates how the `responseProvider` function generates a response, acting as a surrogate origin.

 <Frame>
  <img src="https://techdocs.akamai.com/edgeworkers/img/responseprovider-event-handler-v1.png" alt="responseProvider event handler"/>
</Frame>

If the `responseProvider` event fails, for example as a result of an error, the request is forwarded to the origin.

# respondWith

The [respondWith](request-object.md#respondwith) JavaScript method, implemented by the [Request Object](request-object.md), provides similar functionality to the construct-response behavior in metadata. It constructs a response for the given request, rather than fetching the response from cache or the origin.   The `respondWith` method is available from `onClientRequest`, `onClientResponse`,  `onOriginRequest`, and `onOriginResponse` event handlers.  Whereas, the JavaScript module [create-response](create-response.md)  is available only from `responseProvider`.

The `respondWith` event is typically used to prevent a request from going to origin, and to return a response, such as a redirect, from the edge. 

# Get started with a code sample

To help you learn more about how to use the `responseProvider` event handler, we've added code samples to the [EdgeWorkers GitHub Repository](https://github.com/akamai/edgeworkers-examples/tree/master/edgecompute/examples).

**Response Orchestration example**

In this [Response manipulation example](https://github.com/akamai/edgeworkers-examples/tree/master/edgecompute/examples/stream/response-manipulation) we use an EdgeWorkers function to modify an HTML response stream by adding content to the response. The script adds the content to the page just before the closing head tag.

You can modify this example to support the addition of various types of scripts to other sections of the HTML. You can also use HTTP sub-request functionality to dynamically add content to the page.

**API Orchestration example**

This [API Orchestration example](https://github.com/akamai/edgeworkers-examples/tree/master/edgecompute/examples/orchestration/api-orchestration) demonstrates how to use an EdgeWorkers function to merge multiple internal APIs into a single API response that is delivered to the user.

HTTP sub-requests made from EdgeWorkers functions provide numerous possibilities to generate API responses.
