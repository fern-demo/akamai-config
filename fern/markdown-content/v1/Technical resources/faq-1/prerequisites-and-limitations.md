---
title: "Prerequisites and limitations"
slug: "prerequisites-and-limitations"
excerpt: ""
hidden: false
createdAt: "Wed May 05 2021 13:50:27 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Fri Nov 17 2023 18:24:39 GMT+0000 (Coordinated Universal Time)"
---
### What are the supported delivery products?

Refer to the [Limitations](doc:limitations)  section for a list of supported delivery products.

### What are the supported delivery networks?

EdgeWorkers is currently supported on the both the Enhanced TLS and Standard TLS networks. 

### What are the supported programming languages?

EdgeWorkers supports [ES2015 (ECMAScript 2015)](http://www.ecma-international.org/ecma-262/6.0/) compliant JavaScript. [Typescript](https://www.typescriptlang.org/) is also supported as a pre-compiled option via [bindings](https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/akamai-edgeworkers) to our EdgeWorkers JavaScript specification.

### Is EdgeWorkers a Node.js environment?

We decided not to run a Node.js environment within EdgeWorkers to reduce consumption on the edge machines. Instead, lighter-weight ES2015 compliant JavaScript is executable within the EdgeWorkers environment.

### How do I enable EdgeWorkers?

To enable EdgeWorkers you need to [Set up the EdgeWorkers service](doc:set-up-the-edgeworkers-service). You can then [start writing your JavaScript code](doc:write-your-javascript-code).
