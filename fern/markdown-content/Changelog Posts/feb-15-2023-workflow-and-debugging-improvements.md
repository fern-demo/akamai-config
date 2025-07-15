---
title: "Feb 15, 2023 —  Workflow and debugging improvements"
slug: "feb-15-2023-workflow-and-debugging-improvements"
type: ""
createdAt: "Wed Feb 15 2023 15:15:00 GMT+0000 (Coordinated Universal Time)"
hidden: false
---
- You can now use the [EdgeWorkers Code Profiler](doc:edgeworkers-code-profiler) to gain insight about the **memory usage** consumed by your EdgeWorkers code.

- The EdgeWorkers [API](ref:post-secure-token) and [CLI](https://github.com/akamai/cli-edgeworkers#create-an-edgeworkers-authentication-token) now support a JSON Web Token (JWT) to use for authentication when adding [enhanced debug headers](doc:enable-enhanced-debug-headers) to your requests or [profiling](doc:edgeworkers-code-profiler) your code.

- To tell the browser to delete a cookie immediately, you can now set the [`maxAge`](doc:cookies#maxage) to zero.

- The maximum streaming request size is currently 16 KB when `request.body` is called in the `responseProvider` event handler. We'll increase this limit to its previous value of 1 MB in the near future.

- You can now set default properties for the `config` commands in the [EdgeWorkers CLI](https://github.com/akamai/cli-edgeworkers). To learn more, see [Provide Default Config Properties](https://github.com/akamai/cli-edgeworkers#provide-default-config-properties).