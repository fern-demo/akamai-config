---
title: "npm package manager"
slug: "npm-package-manager"
excerpt: ""
hidden: true
metadata: 
  image: []
  robots: "index"
createdAt: "Wed Nov 10 2021 00:18:26 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Thu Nov 11 2021 16:16:26 GMT+0000 (Coordinated Universal Time)"
---
# Install npm (If not already in use)

# Use npm to create an EdgeWorkers project

Add links to 

- Add Typescript to project
- Add Jest/Mocha mocks to project to support unit testing

# Add rollup to project to import 3rd party modules

# Install npm

Create a package.json file

Before you start coding, you should organize the files into a package to take advantage of the compile and build capabilities of npm. npm isn't a requirement for EdgeWorkers TypeScript bindings, but is shown here as a convenience.

> 📘 You can also add TypeScript definitions directly into your IDE as a plug-in, such as [Visual Studio Code](https://www.typescriptlang.org/docs/tutorial.html).

The next step replicates the business logic for the "Go Premium" feature within EdgeWorkers events. Now you'll build all of the files necessary and package them so you can pass the resulting archive to <Markdown src="../../snippets/COMPANY_NICKNAME.mdx" /> Sandbox.

There are two required files within each EdgeWorkers code bundle:

- `main.js` - contains the JavaScript logic for each event you wish to execute.

- `bundle.json` - is the manifest file indicating meta information about this archive, such as code version.

1. To create version 2.0.0 of the EdgeWorkers instance "WeMakeGolfFun - Premium Check" (ID: 3686), let's move to that working directory and initialize the npm package.

2. Run `npm init` to create a `package.json` file containing meta information about this package such as its name, version, author, build scripts, and module dependencies.

> 📘 The output below is for example purposes only. You can enter the values you would like to use. The only mandatory requirement is that the entry point is `main.js`.

```shell
$ cd ~/dev/golf_website/edgeworkers/3686/2.0.0
 
$ npm init
 
This utility will walk you through creating a package.json file.
It only covers the most common items, and tries to guess sensible defaults.
See `npm help json` for definitive documentation on these fields and exactly what they do.
Use `npm install <pkg>` afterwards to install a package and save it as a dependency in the package.json file.
Press ^C at any time to quit.
 
package name: (2.0.0) getpremium-edgeworker
version: (1.0.0) 2.0.0
description: Offloads /getPremium AJAX call for WeMakeGolf.Fun landing page
entry point: (index.js) main.js
test command:
git repository:
keywords:
author: David Theobald
license: (ISC)
About to write to ~/dev/golf_website/edgeworkers/3686/2.0.0/package.json:
 
{
  "name": "getpremium-edgeworker",
  "version": "2.0.0",
  "description": "Offloads /getPremium AJAX call for WeMakeGolf.Fun landing page",
  "main": "main.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "David Theobald",
  "license": "ISC"
}
 
Is this OK? (yes) yes
```
