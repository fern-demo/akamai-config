---
title: "API Hello World"
slug: "api-hello-world"
excerpt: ""
hidden: false
createdAt: "Mon Jul 05 2021 12:39:27 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Mon Dec 11 2023 21:11:12 GMT+0000 (Coordinated Universal Time)"
---
Here's a high-level overview of the steps required to activate the Hello World code sample using the EdgeWorkers API.

> 📘 Request enhanced debug headers
> 
> To return detailed debugging information for your EdgeWorkers functions follow the instructions in the [Enhanced debug headers](enable-enhanced-debug-headers.md) section.

Refer to the comprehensive [API documentation](https://techdocs.akamai.com/edgeworkers/reference/api) for a complete list of endpoints.

| Step | Link                                                                           | Description                                                                                                                                                                                                                                         |
| :--- | :----------------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1    | [Create an EdgeWorker ID](create-an-edgeworker-id-2.md)                       | Create an EdgeWorker ID to activate and manage your Hello World code bundle.                                                                                                                                                                        |
| 2    | [Add the EdgeWorkers behavior](add-the-edgeworkers-behavior-2.md)             | Select the EdgeWorker ID you created for the Hello World tutorial when you add the EdgeWorkers behavior.                                                                                                                                            |
| 3    | [Create the Hello World code bundle](create-the-hello-world-code-bundle-2.md) | Go to the [EdgeWorkers GitHub repository](https://github.com/akamai/edgeworkers-examples/tree/master/edgecompute/examples/getting-started/hello-world%20(EW)) and download the `main.js` and `bundle.json`  files from the **hello-world** project. |
| 4    | [Deploy Hello World](deploy-hello-world-2.md)                                 | To deploy your Hello World code bundle you need to create a version and activate it on the staging or production network.                                                                                                                           |
| 5    | [Test Hello World](test-hello-world-2.md)                                     | To test the Hello World code sample make a request to exercise the EdgeWorker and note the response.                                                                                                                                                |
