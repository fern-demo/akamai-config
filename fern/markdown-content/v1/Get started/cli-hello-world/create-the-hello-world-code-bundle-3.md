---
title: "Create the Hello World code bundle"
slug: "create-the-hello-world-code-bundle-3"
excerpt: ""
hidden: false
metadata: 
  image: []
  robots: "index"
createdAt: "Mon Jul 05 2021 12:49:47 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Thu Aug 26 2021 16:53:35 GMT+0000 (Coordinated Universal Time)"
---
Your Hello World code bundle must contain the `main.js` and `bundle.json` files.  See [code bundle format](code-bundle-format.md) for more information.

1. Create a folder on your computer for the code bundle files.

2. Go to the  [EdgeWorkers GitHub repository](https://github.com/akamai/edgeworkers-examples) and download the `main.js` and `bundle.json` files from the helloworld project or create them using the values below.

3. Use the Hello World code sample to create the JavaScript source in a file called `main.js`.

> 👍 When you start creating your own EdgeWorkers functions you can use the built-in [Code bundle editor](code-bundle-editor.md) to validate and edit your `bundle.json` and `main.js` files.

```javascript
// Hello World Example

export function onClientRequest(request) {
  request.respondWith(
      200, {},
      '<html><body><h1>Hello World From Akamai EdgeWorkers</h1></body></html>');
}

export function onClientResponse(request, response) {
  response.setHeader('X-Hello-World', 'From Akamai EdgeWorkers');
}
```

> 📘 Each time you want to activate a new EdgeWorkers code bundle or update an existing EdgeWorkers code bundle you need to create a new version number.

4. Compress the files into a code bundle.

```shell
tar -czvf filename.tgz main.js bundle.json
```

5. Next, follow these instructions to [deploy the Hello World code bundle](deploy-hello-world-3.md).
