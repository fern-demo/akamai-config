---
title: "Use npm package manager to import external modules"
slug: "import-external-module-npm-package-mgr"
---
EdgeWorkers lets you run custom JavaScript code on Akamai's edge network. While Akamai provides a variety of [built-in modules](built-in-modules.md), there are use cases that may require custom modules from other developers or organizations. In this tutorial, you'll learn how to import a Node.js module into your EdgeWorkers functions. This process also applies to other package registries such as Yarn and GitHub.

## EdgeWorkers specifications

Akamai EdgeWorkers uses the [ECMAScript Modules (ESM)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules) system for JavaScript. ESM aligns with modern practices and offers efficient code execution at the edge. If, however, you have a Node.js module written in [CommonJS (CJS)](https://en.m.wikipedia.org/wiki/CommonJS), you need to convert it to an ESM format. Converting it makes it compatible with EdgeWorkers' runtime environment and paves the way for efficient code execution. 

<Frame>
  <img src="https://techdocs.akamai.com/edgeworkers/img/importNPM.jpg" alt="Image"/>
</Frame>


# Convert a CJS module to an ESM format

Follow these steps to import an NPM CJS module as an ESM to seamlessly integrate Node.js modules into your EdgeWorkers environment. In this specific use case, the EdgeWorkers function needs to hash certain inputs efficiently. To accomplish this, you can use a [`murmurhash3js`](https://www.npmjs.com/package/murmurhash3js) module for its speed and effectiveness. 

## 1. Review the module source code for interoperability

Before you start, review the source code of the module you intend to use. This example, uses the `murmurhash3js` module for hashing purposes. 

1. Navigate to the module's GitHub repository and review its `package.json` to check for dependencies. You need to evaluate any dependencies using the same process in Step 2 below.

> 📘 When assessing dependencies, it's crucial to consider the direct dependencies of the module, their nested dependencies, and so on. To ensure compatibility with EdgeWorkers' runtime, you need to evaluate the entire dependency tree. If the dependency hierarchy becomes overly complex, it can be more practical to bundle the module and identify any errors during the bundling process.

2. Examine the source code, looking for native `Node.js` modules, browser APIs, or any code that might not be compatible with Akamai EdgeWorkers' runtime. In this case, the `murmurhash3js` module appears to be compatible.

> 📘 When assessing the source code refer to the [EdgeWorkers specifications](specifications.md) for more information.

## 2. Convert the CJS module to ESM

To convert a CJS module to ESM, we'll use [Rollup](https://rollupjs.org/), a module bundler. 

1. Install [Node.js](https://nodejs.org/en/download) if not already installed on your system.
2. Initialize a new Node.js project.

```shell
npm init -y
```

3. Install necessary Rollup plugins.

```shell
npm install --save-dev @rollup/plugin-node-resolve  
npm install --save-dev @rollup/plugin-commonjs  
npm install --save-dev rollup-plugin-copy-assets  
npm install murmurhash3js
```

4. Create a `rollup.config.js` file with the following code.

```javascript rollup.config.js
import resolve from '@rollup/plugin-node-resolve';  
import commonjs from '@rollup/plugin-commonjs';  
import copy from 'rollup-plugin-copy-assets';
export default {  
  input: 'main.js',  
  external: ['log'],  
  output: {  
    format: 'es',  
    dir: 'dist/work',
    preserveModules: true
  },
  plugins: [  
    //Converts CommonJS modules to ES6 modules.  
    commonjs(),  
    //Helps Rollup resolve modules from the node_modules directory.  
    resolve(),  
    //Copies bundle.json to the output directory  
    copy({  
      assets: ['./bundle.json']  
    })  
  ]  
};
```

5. Update your `package.json` with the following build script and package type.

```json package.json
"type": "module",  
"scripts": {  
  "build": "rollup -c && cd dist/work && tar -czvf ../murmurhash.tgz *"  
}
```

6. Create the EdgeWorkers function in a new `main.js` file.

```javascript main.js
import { logger } from 'log';  
import murmurHash3 from 'murmurhash3js';

export function onClientRequest(request) {  
  let hash = murmurHash3.x86.hash32("418, I'm a teapot");  
  logger.log('32bit hash unsigned int: %s', hash);
  request.respondWith(
    200,
    {}, 
    `${hash}`
  );
}
```

7. Create a `bundle.json` file.

```json bundle.json
{  
  "edgeworker-version": "0.1",  
  "description" : "murmurhash"  
}
```

8. Build the ESM bundle.

```shell
npm run build
```

9. Go to the  `dist/work` directory, and review the `main.js` file. You'll notice that it now includes the necessary code to execute `murmurhash3js`.

   You now have a bundle in the `dist` directory named `murmurhash.tgz`, ready to be deployed to Akamai EdgeWorkers.
