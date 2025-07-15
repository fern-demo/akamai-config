---
title: "Technical"
slug: "technical"
excerpt: ""
hidden: false
createdAt: "Wed May 05 2021 13:51:16 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Tue Mar 11 2025 14:50:49 GMT+0000 (Coordinated Universal Time)"
---
### How does EdgeWorkers apply its business logic?

The EdgeWorkers [event model](doc:event-handler-functions) contains "hooks" that can be called at specific points throughout the end user request-response workflow. Each event has [specific features and capabilities](doc:about-the-javascript-api) that allow it to transform and modify the request and response as it flows through the Intelligent Edge Platform.

### How does the order of execution work?

Metadata actions are performed during the stages where EdgeWorkers events are defined. EdgeWorkers functions do not alter the execution order from the metadata stage or from a top-to-bottom perspective. You can think of EdgeWorkers as a different way to produce a metadata equivalent.

Let’s review the order in which actions are applied when manipulating a response header that includes:

- An [Edge Side Includes (ESI)](https://techdocs.akamai.com/property-mgr/docs/esi-edge-side-includes) add_header()
- The EdgeWorkers [response.setHeader()](doc:response-object#setheader) in the onClientResponse event
- The Property Manager [Modify Outgoing Response Header](https://techdocs.akamai.com/property-mgr/docs/modify-outgoing-response-header) behavior

EdgeWorkers and Property Manager are different interfaces that result in the same proxy task.

- EdgeWorkers and Property Manager both perform header manipulation. They provide different interfaces that can achieve the same results. This means both default to the general rule of thumb that whichever behavior is encountered last in the delivery property wins.
- In this scenario, the EdgeWorkers or Property Manager header behavior that happens last will not see what the previous behavior did. It is a stateless change that gets confirmed at the end of the metadata stage.
- ESI is processed on the last proxy before the client, in nearly the last metadata stage. An EdgeWorkers function will not apply after ESI is processed because the EdgeWorkers job is complete at that point.

### How do security products impact the order of execution?

Security products tend to run prior to delivery features. EdgeWorkers functions live inside the delivery block of feature applications, so they would typically happen after security features. Some security products perform detections and mitigations that run after the `onClientRequest` event handler. For example, Bot Manager Premier and the order of execution should be tested and evaluated before you go to production.

### How does EdgeWorkers handle errors?

Ultimately, it depends on the error handling options you enable as well as the type of error it is. Generally, you can enable [Site Failover](doc:site-failover) to catch EdgeWorkers failures and apply alternate logic. You can also write try/catch blocks in your JavaScript code to handle exceptions.

### Can multiple EdgeWorkers fire for a single request?

Yes, you can make an HTTP request from one EdgeWorker to another on the same or different property and account. For more information, go to [Create a subWorker](doc:create-a-subworker) in this guide.
