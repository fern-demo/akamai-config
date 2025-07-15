---
title: "Specifications"
slug: "specifications"
excerpt: ""
hidden: false
metadata: 
  image: []
  robots: "index"
createdAt: "Wed May 05 2021 19:31:46 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Fri Jan 14 2022 15:14:12 GMT+0000 (Coordinated Universal Time)"
---
The EdgeWorkers service is built on V8 and supports various [ECMAScript](https://tc39.es/ecma262/) language features implemented by the [V8 JavaScript engine](https://v8.dev/). APIs commonly used by web developers, that are not part of the language specification itself, are not provided by EdgeWorkers.

The following are examples of common APIs not provided by EdgeWorkers: [DOM APIs](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model), Network request APIs such as [XMLHttpRequest](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest), and the[ Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API).

# JavaScript language feature modifications

Review the table below for information about updates to the JavaScript runtime security. 

[block:parameters]
{
  "data": {
    "h-0": "Feature",
    "h-1": "Update",
    "h-2": "Description",
    "0-0": "SharedArrayBuffer",
    "0-1": "removed",
    "0-2": "Sets the V8 Flag `--no-harmony-SharedArrayBuffer`.  \nPrevents the use of features such as `SharedArrayBuffer` and `Atomics` in the API.",
    "1-0": "Code Generation",
    "1-1": "removed",
    "1-2": "Disables code generation from strings.  \nPrevents the use of features such as `new Function ()` and `eval` in the API.",
    "2-0": "System Time",
    "2-1": "modified",
    "2-2": "Prevents time from incrementing during an event handler in the JavaScript API.  \nFeatures such as `Date.now()` return the start time of the callback execution.",
    "3-0": "WebAssembly",
    "3-1": "removed",
    "3-2": "Sets the V8 Flag `--no-expose-wasm`.  \nPrevents the use of features such as `WebAssembly` in the API."
  },
  "cols": 3,
  "rows": 4,
  "align": [
    "left",
    "left",
    "left"
  ]
}
[/block]


# Considerations

The EdgeWorkers service compiles scripts as an ECMAScript 6 module. When using an ECMAScript 6 module you must enable strict mode and export the event handler functions.

Different event handlers may be executed in different instances of the JavaScript engine. As a result, writes to global JavaScript variables within event handlers are not reliably preserved across separate event handler executions.
