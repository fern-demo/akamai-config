---
title: "TypeScript"
slug: "typescript"
excerpt: ""
hidden: false
metadata: 
  image: []
  robots: "index"
createdAt: "Wed May 05 2021 16:51:58 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Fri May 19 2023 13:23:40 GMT+0000 (Coordinated Universal Time)"
---
An official TypeScript binding for the EdgeWorkers JavaScript API is available to help you design your EdgeWorkers functions.

TypeScript supports these features to help write, maintain, and refactor your JavaScript code:

- Autocomplete functions within the supported integrated development environments (IDE) for the EdgeWorkers JavaScript object model.

- Lint code analysis.

- A TypeScript compiler to find problems before activating your EdgeWorker version.

For more information about TypeScript go to [the language's homepage](https://www.typescriptlang.org/).

You can review the steps to [install typescript dependencies](doc:dev-environment-tutorial#install-typescript-dependencies) in the development environment tutorial.

1. Enter this command to install the `DefinitelyTyped` definition for the EdgeWorkers API inside an existing TypeScript project:

```shell
$ npm install @types/akamai-edgeworkers
```

2. The `node_packages/@types/akamai-edgeworkers` directory contains the type bindings. Set your `tsconfig.json` file to use `es2022` as the compilation target and module code generator:

```json
{
    "compilerOptions": {
    "module": "es2022",
    "target": "es2022",
        //...
    }
}
```
