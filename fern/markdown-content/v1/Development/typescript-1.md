---
title: "TypeScript tutorial"
slug: "typescript-1"
excerpt: ""
hidden: true
metadata: 
  image: []
  robots: "index"
createdAt: "Sun Feb 20 2022 01:12:51 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Sun Feb 20 2022 21:34:06 GMT+0000 (Coordinated Universal Time)"
---
TypeScript is a JavaScript superset that provides static typing. It lets you find problems at compile time, rather than run time. It also has excellent integrated development environment (IDE) and editor support so you can build EdgeWorkers in the comfort of your favorite TypeScript environment.

Here's a sneak peek of the kind of hints [VS Code](https://code.visualstudio.com/) can provide when you're typing:

In this tutorial, we’ll walk through how to install this new type definition and how to create your first TypeScript EdgeWorkers function. 

# Prerequisites 

Before you start, create an EdgeWorkers script on your property and have a working [TypeScript (version 3.5.1+) development environment](https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html). 

# Create a New Project

To make a home for your new project. Create a new directory, cd into it, and run `tsc --init`.

```shell
$ mkdir ts-ew-hello
$ cd ts-ew-hello
$ tsc --init
message TS6071: Successfully created a tsconfig.json file.
```

Since you'll probably want to install the dependency locally, run npm init to create an NPM package:

```shell
$ npm init
This utility will walk you through creating a package.json file.
It only covers the most common items, and tries to guess sensible defaults.
...
```

Hit return for reasonable defaults. 

# Configure the Project

Since the EdgeWorkers JavaScript runtime supports ECMAScript 2015 (also known as ES 6), modify your `tsconfig.json` to set the target and module generation to be es2015 compatible. The generated file is full of helpful comments, but the values for the target and module generation should look like:

```shell
{
 "compilerOptions": {
    "target": "ES2015",
    "module": "es2015",
//...
}
```

# Install the TypeScript Bindings

The [EdgeWorkers bindings](https://www.npmjs.com/package/@types/akamai-edgeworkers) have been distributed as part of [DefinitelyTyped](http://definitelytyped.org/) type definitions. Install them with:

```text
$ npm install --save-dev @types/akamai-edgeworkers
```

# Create an EdgeWorker

Your EdgeWorker will live in a file named `main.ts`, and needs to follow a special shape. Create `main.ts` in your editor, and paste the following code into it:

```shell
/// <reference types="akamai-edgeworkers"/>
export function onClientRequest(request : EW.IngressClientRequest) {}
export function onOriginRequest(request : EW.IngressOriginRequest) {}
export function onOriginResponse(request: EW.EgressOriginRequest, response: EW.EgressOriginResponse) {}
export function onClientResponse(request: EW.EgressClientRequest, response: EW.EgressClientResponse) {}
```

Let's take a brief tour of the file:

**Line 1** references the EdgeWorkers package. It pulls the EdgeWorkers types into the environment, but doesn't generate import statements in the transpiled JavaScript. That's exactly what we need, because those types are defined by the EdgeWorkers runtime and don't need explicit inclusion. 

**Line 3** defines the client request callback that fires when {{COMPANY_NICKNAME}} first receives a browser request. The single argument is a modifiable representation of the request (the EW.IngressClientRequest). Any changes you make to the request will propagate to your origin server.

**Line 4** defines the onOriginRequest() callback, which fires before {{COMPANY_NICKNAME}} makes a request to your origin server. You can use the request object to modify what is sent to the origin. 

The `onOriginResponse()` callback on line 5 is called after a response has been received from your origin. At this point, it's too late to change anything on the request, but the response can be modified. Changes made to the response object will be sent to the client. 

`onClientResponse()` on line 6 is the final callback in request processing. It fires before the request leaves the {{COMPANY_NICKNAME}} edge. As with the previous callback, you can modify the response. 

Update the EdgeWorker so it terminates processing during `onClientRequest`:

```shell
/// <reference types="akamai-edgeworkers"/>

export function onClientRequest(request : EW.IngressClientRequest) {
    request.respondWith(200, {}, "Hello TypeScript!");
}
```

As the snippet shows, you can remove the unused EdgeWorker callbacks, which will provide a very small performance improvement. The `respondWith()` method will set the status code and body of the response. 

Compile the TypeScript. You can do that by running the command-line compiler, or using your favorite IDE. Using the command-line: 

```text
$ tsc
$
```

There shouldn't be any output, because the input files are well-formed. If you get an error that includes the text TS1084: Invalid 'reference' directive syntax, then you need to upgrade your TypeScript compiler to version 3.5.1.

The compiler should write a `main.js` to the same directory. It will contain:

```text
/// <reference types="akamai-edgeworkers"/>
export function onClientRequest(request) {
    request.respondWith(200, {}, "Hello TypeScript!");
}
```

You can create a package tarball out of the file and publish the EdgeWorker normally. 

# Built-in Modules

{{COMPANY_NICKNAME}} provides a number of built-in modules, including parameter parsing and cookie management. The module APIs are defined in the same akamai-edgeworkers package listed above and can be referenced with imports.

Here we use the query parameter module to personalize the hello world:

```shell
/// <reference types="akamai-edgeworkers"/>
import URLSearchParams from 'url-search-params';
export function onClientRequest(request : EW.IngressClientRequest) {
    var params = new URLSearchParams(request.query);
 
    var who = params.get('who') || 'parameter world';
    request.respondWith(200, {}, `Hello ${who}!`);
}
```

If you deploy that EdgeWorker, you'll see that it emits "Hello parameter world!" for requests without a query string, or the value of who when that is specified.

To learn more about EdgeWorkers - including more on our use cases and Git repository of sample codes - visit the EdgeWorkers home page.
