---
title: "Import a JavaScript module"
slug: "import-a-javascript-module"
excerpt: ""
hidden: false
metadata: 
  image: []
  robots: "index"
createdAt: "Wed May 05 2021 19:40:07 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Mon Jun 14 2021 20:39:47 GMT+0000 (Coordinated Universal Time)"
---
EdgeWorkers are compiled as ECMAScript 6 Modules, and provide access to static import. You can load relative JavaScript modules in the main.js file that contain the callbacks used to modify HTTP requests and responses.

> 📘 The JavaScript module name you import needs to include the `.js` extension.

```javascript
import { square, diag } from 'utils/lib.js';
export function onClientResponse(request) {
  response.setHeader('X-Square', square(11));
  response.setHeader('X-Diag', diag(4, 3));
}
```

If you use the import function you can load additional module files and directories in the EdgeWorkers code bundle. Use the following structure for the EdgeWorkers code bundle.

```javascript
|-- bundle.json
|-- main.js
|-- utils
     |-- lib.js

//------ lib.js ------
export const sqrt = Math.sqrt;
export function square(x) {
    return x * x;
}
export function diag(x, y) {
    return sqrt(square(x) + square(y));
}
```
