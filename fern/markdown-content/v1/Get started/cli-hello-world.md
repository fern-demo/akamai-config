---
title: "CLI Hello World"
slug: "cli-hello-world"
excerpt: ""
hidden: false
createdAt: "Mon Jul 05 2021 12:48:14 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Mon Dec 11 2023 21:10:50 GMT+0000 (Coordinated Universal Time)"
---
Here's a high-level overview of the steps required to activate the Hello World code sample using the EdgeWorkers CLI.

> 📘 Request enhanced debug headers
> 
> To return detailed debugging information for your EdgeWorkers functions follow the instructions in the [Enhanced debug headers](doc:enable-enhanced-debug-headers) section.

> 👍 Before you start
> 
> Refer to the comprehensive [CLI documentation](https://github.com/akamai/cli-edgeworkers) for instructions on how to install the EdgeWorkers package. You'll also find an overview of commands you can use to manage your EdgeWorkers.
> 
> Make sure to follow the instructions in the [Get Started with APIs](https://techdocs.akamai.com/developer/docs/set-up-authentication-credentials) documentation. These instructions apply to both Akamai APIs and Akamai CLIs. You need to authenticate your CLI requests using EdgeGrid, a proprietary authentication system for APIs deployed through Akamai Control Center.

| Step | Link                                                                           | Description                                                                                                                                                                                                                                         |
| :--- | :----------------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1    | [Create an EdgeWorker ID](doc:create-an-edgeworker-id-3)                       | Create an EdgeWorker ID to activate and manage your Hello World code bundle.                                                                                                                                                                        |
| 2    | [Add the EdgeWorkers behavior](doc:add-the-edgeworkers-behavior-3)             | Select the EdgeWorker ID you created for the Hello World tutorial when you add the EdgeWorkers behavior.                                                                                                                                            |
| 3    | [Create the Hello World code bundle](doc:create-the-hello-world-code-bundle-3) | Go to the [EdgeWorkers GitHub repository](https://github.com/akamai/edgeworkers-examples/tree/master/edgecompute/examples/getting-started/hello-world%20(EW)) and download the `main.js` and `bundle.json`  files from the **hello-world** project. |
| 4    | [Deploy Hello World](doc:deploy-hello-world-3)                                 | To deploy your Hello World code bundle you need to create a version and activate it on the staging or production network.                                                                                                                           |
| 5    | [Test Hello World](doc:test-hello-world-3)                                     | To test the Hello World code sample make a request to exercise the EdgeWorker and note the response.                                                                                                                                                |
