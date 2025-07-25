---
title: "Specifications"
slug: "specifications"
---
The EdgeWorkers service is built on V8 and supports various [ECMAScript](https://tc39.es/ecma262/) language features implemented by the [V8 JavaScript engine](https://v8.dev/). APIs commonly used by web developers, that are not part of the language specification itself, are not provided by EdgeWorkers.

The following are examples of common APIs not provided by EdgeWorkers: [DOM APIs](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model), Network request APIs such as [XMLHttpRequest](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest), and the[ Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API).

# JavaScript language feature modifications

Review the table below for information about updates to the JavaScript runtime security. 

| Feature | Update | Description |
|---------|--------|-------------|
| SharedArrayBuffer | removed | Sets the V8 Flag `--no-harmony-SharedArrayBuffer`.<br/>Prevents the use of features such as `SharedArrayBuffer` and `Atomics` in the API. |
| Code Generation | removed | Disables code generation from strings.<br/>Prevents the use of features such as `new Function ()` and `eval` in the API. |
| System Time | modified | Prevents time from incrementing during an event handler in the JavaScript API.<br/>Features such as `Date.now()` return the start time of the callback execution. |
| WebAssembly | removed | Sets the V8 Flag `--no-expose-wasm`.<br/>Prevents the use of features such as `WebAssembly` in the API. |


# Considerations

The EdgeWorkers service compiles scripts as an ECMAScript 6 module. When using an ECMAScript 6 module you must enable strict mode and export the event handler functions.

Different event handlers may be executed in different instances of the JavaScript engine. As a result, writes to global JavaScript variables within event handlers are not reliably preserved across separate event handler executions.
