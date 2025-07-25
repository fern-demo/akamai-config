---
title: "Create a subWorker"
slug: "create-a-subworker"
excerpt: ""
hidden: false
createdAt: "Tue Jan 23 2024 14:23:57 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Mon Jan 20 2025 15:09:47 GMT+0000 (Coordinated Universal Time)"
---
A subWorker is an EdgeWorker that is called by another EdgeWorker in an [http request](http-request.md#httprequest). subWorkers let you divide the work and responsibilities for large projects among different teams. Each team can own a separate EdgeWorker, deploy it on different schedules, and use their preferred tool chains. 

You can make HTTP requests to EdgeWorkers on different properties or different accounts. In the example below an EdgeWorker running on property A is making an HTTP request to another EdgeWorker running on property B. 
<Frame>
  <img src="https://techdocs.akamai.com/edgeworkers/img/subWorkers.jpg" alt="Image"/>
</Frame>


When using an HTTP request to call another EdgeWorker you can apply optimizations to accelerate the sub-request. For example, a subWorker can cache the response if it's expected to remain relatively constant. You can also use other behaviors available in Akamai Control Center to route the response to an appropriate EdgeWorker or handle errors.

> 📘 To learn more, refer to the [Fragment generation using subWorkers](subworkers-tutorial.md) tutorial in this guide. When designing your EdgeWorkers functions make sure you review the [subWorkers limits](limitations.md#subworkers-limits).

By executing an EdgeWorker as a subWorker in an HTTP request you can:

- Cache the results of some operations.
- Distribute CPU-intensive work across multiple requests.
- Protect a child EdgeWorker that needs to keep secrets from the parent using an HTTP request to provide true encapsulation. 
- Make requests to EdgeWorkers in different properties or accounts.

> 👍 How are Flexible Composition and subWorkers different?
> 
> [Flexible composition](flexible-composition.md) lets you share code within the same account and property to work collaboratively across teams in a large organization. 
> 
> subWorkers lets you share the results of computation across accounts and use Akamai optimizations to cache or accelerate a sub-request.

# Enable subWorkers

To enable a subWorker you need to add the `invoke-for-edgeworker-clients` configuration setting to the `bundle.json` file and set it to  `true`.  This setting enables the EdgeWorker to execute when a sub-request is made to the EdgeWorkers URL.

> 🚧 Consider your existing workflow before you enable subWorkers
> 
> A single request can trigger a chain of subWorkers. Make sure that you design your configuration to stay within the subWorkers limits. In particular, pay extra attention to the following.
> 
> - If you form a subWorkers loop chain it can inadvertently exhaust your subWorkers limits.  For example, EW1 sends a sub-request back to the property which then calls EW1 again, forming a loop.
> - If you want to cache subWorkers output, you need to design for when the subWorkers output is not cached. These initial subWorkers executions still need to be within the subWorkers limits.

If `invoke-for-edgeworker-clients`  is set to false or if it's not included in the `bundle.json` file the EdgeWorkers function will return a status 22, `SubworkerNotEnabled`, when a sub-request is made to the EdgeWorkers URL.  The sub-request will continue to be processed without the EdgeWorkers being invoked.

In this example the code bundle for the "Hello World Example" is enabled as a subWorker. 

```json
{  
    "edgeworker-version": "0.2",  
    "description" : "Hello World Example",
    "config": {  
        "subrequest": {  
            "invoke-for-edgeworker-clients": true  
        }  
    }  
}
```

# Use cases

subWorkers open the door to ramified and complex use cases. Review these examples to learn more about how you can work with various teams in your organization to create EdgeWorkers functions that create a customized experience for your website visitors. 

## Cache computation results

Using a subWorker to pre-process large bodies of data can result in considerable CPU savings.

To cache computation results you can create a subWorker that reads the data, pre-processes it, and then returns the value with a cache lifetime. The sub-request that runs after the subWorker execution only returns the cached text, instead of re-running the subWorkers function.

Caching computation results offers the following benefits.

- **Saves money** - Reduces the number of times an EdgeWorkers function executes.
- **Prevents errors** - The parent EdgeWorker and the subWorker have separate CPU time limits.
- **Limits complexity** - Manages the cache through standard HTTP means, so EdgeWorkers don't have to manage their own cache.
- **Re-use cached text** - If you build a caching hierarchy, it's possible to share the cached result across invocations of multiple parent EdgeWorkers.

## ESI-like Content Construction

subWorkers let different teams share in the construction of a single web page. A subWorker call can return HTML content that the parent then inserts into the response. The subWorker can use more CPU-time for processing, since its CPU limits are tracked separately from the parent. You can also cache the child output, simplifying cache management for the parent.

> 📘 Use Flexible composition to consume data from a child EdgeWorker
> 
> You should use [Flexible composition](flexible-composition.md) versus subWorkers when the parent EdgeWorker makes a call to a child that returns data for further processing. Flexible composition is a better solution if the parent EdgeWorker needs to manage the HTTP request, the HTTP response, convert the output into a readable format such as JSON, and handle errors. If the child is performing an operation that takes a lot of wall time, then the parent could still exceed the wall-time limit.
> 
> subWorkers is the best option when consuming HTML output from a child that will be included in the output.

## Provide an API endpoint for other EdgeWorkers

You can use a subWorker to provide API endpoints that can call other EdgeWorkers. This lets other teams you're working with protect any secrets in their EdgeWorkers. If each team distributed their JavaScript code it would expose any secrets. Other Akamai customers would also be able to call these endpoints from their EdgeWorkers.

In this scenario subWorkers offers a better solution than Flexible composition because ECMAScript doesn't guarantee encapsulation of modules. subWorkers can prevent a nefarious parent from examining the child EdgeWorkers implementation.

## Microservices

subWorkers let developers split functionality across logical or organization lines. Each team can be in charge of their own tooling and SDLC workflow letting them decide how and when to deploy. Smaller code is easier to test, deploy, and reuse.

This loose coupling makes it easy to adopt subWorkers as teams can work at their own pace and decide how to communicate. You can create a subWorker that returns a 200 or 400 status code or a complex JSON object to provide callers with more specific information. A subWorker can also return HTML to the browser that made the request, delegating the entire UI to the subWorker.

You can also use built-in Akamai optimizations to accelerate a sub-request. For example, you can cache results or use other behaviors to handle errors or route the response to an appropriate EdgeWorkers function.
