---
title: "EdgeWorkers Code Profiler"
slug: "edgeworkers-code-profiler"
excerpt: ""
hidden: false
createdAt: "Tue Sep 27 2022 13:34:15 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Tue Mar 25 2025 12:40:05 GMT+0000 (Coordinated Universal Time)"
---
The EdgeWorkers Code Profiler helps you gain insight about the CPU performance and memory usage consumed by your EdgeWorkers code. You can view the profiling information in a V8 compatible profiling tool to see which section of your code is consuming the most CPU timing resources and the most memory [resources](resource-tier-limitations.md). 

> 👍 For more information about how to use the profiling information to improve your code, read the [Code profiler tutorial](code-profiler-tutorial.md).

Watch this video to help you get started and to learn more about how to identify potential performance issues associated with EdgeWorkers execution.
<iframe width="512" height="288" src="https://www.youtube.com/embed/fOatzvRtalc" title="Akamai EdgeWorkers Code Profiler" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>


# Prerequisites

Before you can use the EdgeWorkers Code Profiler you need to:

- Go to [Akamai CLI for EdgeWorkers](https://github.com/akamai/cli-edgeworkers) and use the instructions to install the EdgeWorkers package. You'll also find an overview of commands you can use to manage your EdgeWorkers.

  Make sure to follow the instructions in the [Get Started with APIs](https://techdocs.akamai.com/developer/docs/set-up-authentication-credentials) documentation. These instructions apply to both Akamai APIs and Akamai CLIs. 

- Set up authentication for your CLI requests using [EdgeGrid](https://techdocs.akamai.com/developer/docs/set-up-authentication-credentials#add-credential-to-edgerc-file), a proprietary authentication system for APIs deployed through Akamai Control Center.

- To use the VS Code extension to profile your code, install the [Akamai EdgeWorkers Toolkit for VS Code](https://github.com/akamai/edgeworkers-vscode/blob/main/README.md).

- To use the IntelliJ plugin to profile your code, install the [Akamai EdgeWorkers IntelliJ Plugin](https://github.com/akamai/edgeworkers-intellij). 

# Use the VS Code extension or the IntelliJ plugin to profile your code

Once you've completed the prerequisites, the EdgeWorkers Code Profiler will appear in the bottom panel of the EdgeWorkers VS Code extension or IntelliJ plugin.

> 📘 Profiling is currently limited to the [Akamai staging network](manage-edgeworkers.md#activate-an-edgeworker-version).

1. To profile your code, enter the URL where your EdgeWorkers function is configured to execute. 

Here's an example of the Code Profiler in the **EdgeWorkers VS Code extension**.   
<Frame>
  <img src="https://techdocs.akamai.com/edgeworkers/img/vscodeProfiler-v2.jpg" alt="Image"/>
</Frame>


Here's an example of the Code Profiler in the **EdgeWorkers IntelliJ Plugin**.
<Frame>
  <img src="https://techdocs.akamai.com/edgeworkers/img/injellijCodeProfiler-v2.jpg" alt="Image"/>
</Frame>


2. Select a Profiling type, either **CPU Profiling** or **Memory Profiling**. 

3. Select **Force Cold Start** if you want to run the EdgeWorkers initialization code first.

   Cold start profiling results include information about code that runs outside an EdgeWorkers event handler. You can use these insights to help improve the [wall time](resource-tier-limitations.md) consumption of your code during EdgeWorkers events.

4. The IntelliJ plugin lets you apply the following additional parameters.

- Select an [HTTP Method](event-handler-functions.md#event-handler-methods) supported by EdgeWorkers to use.

- Specify the granularity of the **Sampling Interval** to help display faster running segments of code. Note that you can create a profile that's too big to return. 

5. Select an event handler to profile.

The EdgeWorkers Code Profiler operates on a per event handler basis. Event handler results are limited to one event handler per request. 

6. You can optionally specify a location and a name for the profiler results file.
7. You can also add [request headers](https://developer.mozilla.org/en-US/docs/Glossary/Request_header). 
8. Click the **Run Profiler** button to get a profile of the JavaScript code.

Here's an example of the profiling output in the EdgeWorkers VS Code extension.
<Frame>
  <img src="https://techdocs.akamai.com/edgeworkers/img/codeProfilerOutput-v1.png" alt="Image"/>
</Frame>


Here's an example of the profiling output in the EdgeWorkers IntelliJ Plugin.

 <Frame>
  <img src="https://techdocs.akamai.com/edgeworkers/img/edgeWorkersRunIntellij-v1.png" alt="Code Profiler output"/>
</Frame>

9. Click on the “flame” icon in the top right corner of the profiler tool to view the EdgeWorkers execution details in a [flamegraph](https://www.brendangregg.com/flamegraphs.html). Flamegraphs illustrate the stack trace and the amount of time spent in each stack frame. 

Here's an example of a flamegraph generated using the EdgeWorkers VS Code Extension. 

 <Frame>
  <img src="https://techdocs.akamai.com/edgeworkers/img/codeProfilerFlameGraph-v1.png" alt="Code Profiler flame graph"/>
</Frame>

Here's an example of a flamegraph generated using the EdgeWorkers IntelliJ Plugin. 
<Frame>
  <img src="https://techdocs.akamai.com/edgeworkers/img/edgeWorkersIntelllijFllameGraph.png" alt="Image"/>
</Frame>


# Use the CLI to profile your code

If you can’t use the VS Code extension, the IntelliJ plugin, or if you need more flexibility you can use the CLI to profile your code.  

> 📘 Profiling is currently limited to the [Akamai staging network](manage-edgeworkers.md#activate-an-edgeworker-version).

## Request code profiling information

Follow these steps to generate a JWT authentication token and add code profiling details to your requests. You can also use these steps to re-generate an expired token.

> 👍 You can also use the EdgeWorkers API to [generate a secure token](ref:get-secure-token).

1. Use this EdgeWorkers CLI command to generate an authentication token. In this example we set the token expiry to 60 minutes for the `www.example.com` hostname.

   By default, the token expiry is set at 480 for 8 hours. You can set the token expiry to a value between 1 to 720 minutes.

```shell
akamai edgeworkers auth --expiry 60 www.example.com
```

> 📘 You need to provide the EdgeWorkers CLI with API access to the hostname in the request. Without this access the command will fail to provide valid code profiling information. For more information refer to the  [Get Started with APIs](https://techdocs.akamai.com/developer/docs/set-up-authentication-credentials) documentation.

2. Here’s an example of a response.

```shell
Creating auth token ... /
------------------------------------------------------------------------------------------------------------------------------------------------
Add the following request header to your requests to get additional trace information.
Akamai-EW-Trace: eyJ0eXAiOiJKV1Qi ... iu1XOS9eJOl-54Yw
------------------------------------------------------------------------------------------------------------------------------------------------
```

3. Active your EdgeWorkers code bundle.

4. Choose an event handler to profile:

   - `x-ew-code-profile-onclientrequest: on`
   - `x-ew-code-profile-onoriginrequest: on`
   - `x-ew-code-profile-onoriginresponse: on`
   - `x-ew-code-profile-onclientresponse: on`
   - `x-ew-code-profile-responseprovider: on`

   If multiple headers are included in the request, the one that executes first is used. For example, if `onClientRequest` and `onOriginResponse` are included in the request only `onClientRequest` is included in the profiling request.

5. Select a Profile type, either CPU Profile or Memory Profile. 
   - `x-ew-code-profile-memory: on`
   - `x-ew-code-profile-cpu: on`

6. To profile your code during a cold start include the `x-ew-code-profile-during-cold-start:on` header in the request.

   A cold start profiling request runs the EdgeWorkers initialization code first. The results include information about code that runs outside an EdgeWorkers event handler. You can use these insights to help improve the [wall time](resource-tier-limitations.md) consumption of your code during EdgeWorkers events.

7. Issue an HTTP request with the JWT token and an event handler.

```curl
'https://www.example.com/' --resolve www.example.com:443:23.193.6.69 -H 'akamai-ew-trace: eyJ0eXAiOiJKV1Qi ... iu1XOS9eJOl-54Yw'-H 'x-ew-code-profile-onclientresponse: on' > newprofile.cpuprofile
```

8. The JSON profile data is returned as the HTTP response body. 

```json
{"nodes":[{"id":1,"callFrame":{"functionName":"(root)","scriptId":"0","url":"","lineNumber":-1,"columnNumber":-1},"hitCount":0,"children":[2,3]},{"id":2,"callFrame":{"functionName":"(program)","scriptId":"0","url":"","lineNumber":-1,"columnNumber":-1},"hitCount":5},{"id":3,"callFrame":{"functionName":"onClientRequest","scriptId":"3","url":"main.js","lineNumber":5,"columnNumber":31},"hitCount":1,"children":[4,5,6,7],"positionTicks":[{"line":25,"ticks":1}]},{"id":4,"callFrame":{"functionName":"Cookies","scriptId":"4","url":"cookies","lineNumber":43,"columnNumber":20},"hitCount":1,"positionTicks":[{"line":46,"ticks":1}]},{"id":5,"callFrame":{"functionName":"checkLanguage","scriptId":"3","url":"main.js","lineNumber":45,"columnNumber":22},"hitCount":1,"positionTicks":[{"line":54,"ticks":1}]},{"id":6,"callFrame":{"functionName":"checkRedirect","scriptId":"3","url":"main.js","lineNumber":68,"columnNumber":22},"hitCount":2,"positionTicks":[{"line":86,"ticks":1},{"line":72,"ticks":1}]},{"id":7,"callFrame":{"functionName":"SetCookie","scriptId":"4","url":"cookies","lineNumber":265,"columnNumber":22},"hitCount":1,"positionTicks":[{"line":280,"ticks":1}]}],"startTime":6399655041506,"endTime":6399655043547,"samples":[2,2,2,4,5,6,6,7,3,2,2,2],"timeDeltas":[1373,89,54,65,57,5,62,70,50,58,18,59]}9. 
```

You can import the response into a compatible JavaScript profiling tool. For example, you can view the profiling details in the **Performance** section of the [Chrome DevTools](https://developer.chrome.com/docs/devtools/). 

# FAQ

Review these commonly-asked questions about the EdgeWorkers Code Profiler. 

### How do I use the EdgeWorkers Code Profiler?

The easiest way to use the EdgeWorkers Code Profiler is to install the [VS Code Extension](https://marketplace.visualstudio.com/items?itemName=akamaiEdgeworker.akamai-edgeworkers-vscode-extension) or the [Intellij Plugin](https://github.com/akamai/edgeworkers-intellij) . When you set up this Visual Studio Code extension, you also need to set up the [EdgeWorkers CLI](https://github.com/akamai/cli-edgeworkers) and create an .edgerc file with [Akamai API Client credentials](https://techdocs.akamai.com/developer/docs/set-up-authentication-credentials).

### What profiling capabilities are available?

This release of the EdgeWorkers Code Profiler supports CPU and memory profiling. The next release will cover additional functionality.

### Can I profile code on the Akamai staging and production networks?

Profiling is only supported on the Akamai staging network.

### Can I load the profiling data in Chrome DevTools?

Yes. We recommend that you use the [Chrome DevTools](https://developer.chrome.com/docs/devtools/open/) to help analyze your profiling data.

### Can I use Sandbox to run the EdgeWorkers Code Profiler?

Yes. You can use [Akamai Sandbox](https://techdocs.akamai.com/sandbox/docs) to run the code profiler through a [sandbox URL](https://techdocs.akamai.com/sandbox/reference/post-sandbox).

### Which IDEs support the EdgeWorkers Code Profiler?

Currently the EdgeWorkers Code Profiler supports the VS Code and IntelliJ extensions.

### Why do some very short running functions not appear in the output CPU profile?

The EdgeWorkers Code Profiler leverages the V8 profiler that takes samples from a given interval. Because of this, some functions may not appear in the profile results. A  future release will include the ability to control the sample interval. This update will allow you to tune the sample down to see short running functions at the expense of a larger output file.
