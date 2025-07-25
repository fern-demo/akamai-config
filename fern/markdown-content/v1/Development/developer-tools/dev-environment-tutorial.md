---
title: "Development environment tutorial"
slug: "dev-environment-tutorial"
excerpt: ""
hidden: false
metadata: 
  image: []
  robots: "index"
createdAt: "Wed May 05 2021 16:52:44 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Tue Jan 17 2023 13:21:55 GMT+0000 (Coordinated Universal Time)"
---
Follow the steps in this detailed tutorial to learn how to create, test, and deploy your EdgeWorkers.

In this tutorial we'll use a secure Ion delivery property named `we.makeedgeworkerscoding.fun`.  It includes a rule matching the URL path `/getpremium`. If the rule matches inbound traffic, then the EdgeWorkers code bundle for "WeMakeEdgeWorkersCodingFun - Premium Check" (EdgeWorker ID: 3686) is enabled. We can then confirm that we successfully migrated the "Go Premium" logic from the origin to the {{COMPANY_NICKNAME}} Edge.

> 👍 The `we.makeedgeworkerscoding.fun` property is for example purposes only. If you'd like to use this tutorial as a hands on exercise you'll need to create your own property.

# Prerequisites

Please work with your {{COMPANY_NICKNAME}} administrator to help complete these prerequisite tasks:

- Ensure you have entitlement to EdgeWorkers on your contract and if necessary, [add EdgeWorkers to your contract](add-edgeworkers-to-contract.md).

- Provision credentials for {{COMPANY_NICKNAME}}'s APIs with access to Property Manager (PAPI), {{COMPANY_NICKNAME}} Sandbox, and EdgeWorkers. Follow the instructions in [Get Started with APIs](https://techdocs.akamai.com/developer/docs/set-up-authentication-credentials) to create credentials that allow you to interact with {{COMPANY_NICKNAME}} APIs and CLIs.

- Install the [Akamai CLI for EdgeWorkers](https://github.com/akamai/cli-edgeworkers) and [Sandbox CLI](akamai-cli.md#sandbox-cli) packages into your local development environment.

- Ensure that a [supported delivery product](limitations.md) for your website already exists. You also need to include a rule to enable the EdgeWorkers behavior. For instructions see [Add the EdgeWorkers behavior](add-the-edgeworkers-behavior.md).

# Create a Sandbox

Create a sandbox instance that you can use to test configuration changes in a local, isolated development environment. We'll use the Sandbox CLI to create a sandbox based on the latest active version of the EdgeWorkers coding website's delivery property.

To create the sandbox you need to provide the delivery property name, a version to clone from, and an optional name for the sandbox instance.

> 📘 This {{COMPANY_NICKNAME}} Sandbox instance clones the Ion delivery property configuration for the website.

1. Run this command to create the `CODING_SANDBOX` instance by cloning from Version 10 of the delivery property `we.makeedgeworkerscoding.fun`.

```shell
$ akamai sandbox create --property we.makeedgeworkerscoding.fun:10 --name CODING_SANDBOX
```

2. Run the `list` command to see the details of the sandbox instance:

```shell
$ akamai sandbox list
 
Local sandboxes: 
current  name                sandbox_id
-------  ------------------  ------------------------------------
YES      CODING_SANDBOX        5007551b-92ed-42d4-94b2-2d181db6aa45
```

3. Run the `start` command to start the sandbox instance. You can also verify everything is working on the website when it's delivered through {{COMPANY_NICKNAME}} Sandbox.

   You should see various information lines ending with a success message and the port the sandbox client is listening on.

> 📘 If this is your first time using {{COMPANY_NICKNAME}} Sandbox, it will also download and install the sandbox client. This command also creates a connection to the isolated edge machines and services.

```shell
$ akamai sandbox start
...
 
... INFO  c.a.devpops.connector.ConnectorMain - Successfully launched Akamai Sandbox Client
 
... INFO  c.a.devpops.connector.ConnectorMain - Sandbox Client running on port: 9550
```

4. To ensure your test traffic is going through your sandbox instance, add an entry to your /etc/hosts file. Map the test website's hostname to localhost:

```shell
$ vi /etc/hosts
127.0.0.1       we.makeedgeworkerscoding.fun
```

5. To all test URLs append the port noted in the start-up message: `http://we.makeedgeworkerscoding.fun:9550/`

   If everything is working as expected, exit the sandbox client. This shuts down the tunnel over Port 9550 for now.

# Create a package.json file

Before you start coding, you should organize the files into a package to take advantage of the compile and build capabilities of npm. npm isn't a requirement for EdgeWorkers TypeScript bindings, but is shown here as a convenience.

> 📘 You can also add TypeScript definitions directly into your IDE as a plug-in, such as [Visual Studio Code](https://www.typescriptlang.org/docs/tutorial.html).

The next step replicates the business logic for the "Go Premium" feature within EdgeWorkers events. Now you'll build all of the files necessary and package them so you can pass the resulting archive to {{COMPANY_NICKNAME}} Sandbox.

There are two required files within each EdgeWorkers code bundle:

- `main.js` - contains the JavaScript logic for each event you wish to execute.

- `bundle.json` - is the manifest file indicating meta information about this archive, such as code version.

1. To create version 2.0.0 of the EdgeWorkers instance "WeMakeEdgeWorkersCodingFun - Premium Check" (ID: 3686), let's move to that working directory and initialize the npm package.

2. Run `npm init` to create a `package.json` file containing meta information about this package such as its name, version, author, build scripts, and module dependencies.

> 📘 The output below is for example purposes only. You can enter the values you would like to use. The only mandatory requirement is that the entry point is `main.js`.

```shell
$ cd ~/dev/coding_website/edgeworkers/3686/2.0.0
 
$ npm init
 
This utility will walk you through creating a package.json file.
It only covers the most common items, and tries to guess sensible defaults.
See `npm help json` for definitive documentation on these fields and exactly what they do.
Use `npm install <pkg>` afterwards to install a package and save it as a dependency in the package.json file.
Press ^C at any time to quit.
 
package name: (2.0.0) getpremium-edgeworker
version: (1.0.0) 2.0.0
description: Offloads /getPremium AJAX call for WeMakeEdgeWorkersCoding.Fun landing page
entry point: (index.js) main.js
test command:
git repository:
keywords:
author: David Theobald
license: (ISC)
About to write to ~/dev/coding_website/edgeworkers/3686/2.0.0/package.json:
 
{
  "name": "getpremium-edgeworker",
  "version": "2.0.0",
  "description": "Offloads /getPremium AJAX call for WeMakeEdgeWorkersCoding.Fun landing page",
  "main": "main.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "David Theobald",
  "license": "ISC"
}
 
Is this OK? (yes) yes
```

# Install TypeScript dependencies

After you create the package.json file, you need to install a couple of development dependencies for TypeScript and the EdgeWorkers TypeScript definitions.

EdgeWorkers TypeScript definitions help us understand syntax and data types for the EdgeWorkers JavaScript API. See the [TypeScript](typescript.md) section in this guide for more information about the features TypeScript supports to help write, maintain, and refactor your JavaScript code.

1. You can use npm to install these development dependencies too:

```shell
$ npm install --save-dev typescript
npm notice created a lockfile as package-lock.json. You should commit this file.
 
+ typescript@3.8.2
added 1 package from 1 contributor and audited 1 package in 7.253s
found 0 vulnerabilities
 
$ npm install --save-dev @types/akamai-edgeworkers
 
+ @types/akamai-edgeworkers@1.0.1
added 1 package from 1 contributor and audited 2 packages in 3.561s
found 0 vulnerabilities
```

2. The `package.json` now includes a new stanza that references the latest versions of the required dependencies:

```json
"devDependencies": {
    "@types/akamai-edgeworkers": "^1.0.1",
    "typescript": "^3.8.3"
}
```

3. To initiate the TypeScript configuration, create a new file named `tsconfig.json` within the working directory.

   TypeScript is locally available within your package. This allows you to customize its configuration and ensure that the EdgeWorkers type definitions are available. It also ensures that when you compile code into native JavaScript, you're using the right specification. EdgeWorkers is ES 6 (ES2015) compatible.

4. Include the following JSON stanza. It defines the JavaScript specification that TypeScript should compile into. It also defines where the output .js file will be stored (the `built` directory in this example).

```json
{
    "compilerOptions": {
        "module": "es2015",
        "target": "ES2015",
        "noImplicitAny": false,
        "outDir": "built",
        "rootDir": ".",
        "sourceMap": false
    },
    "exclude": [
        "node_modules"
    ]
}
```

# Code logic into EdgeWorkers events

Now you're ready to code logic into the EdgeWorkers events.

1. To use TypeScript to help verify the syntax and data expectations of EdgeWorkers objects, you need to create a `main.ts` file. 

   The ".ts" extension is for TypeScript.

2. Next you can replicate the "Go Premium" logic currently on the content origin for the coding subscription website. To do this you need to provide a similar JSON payload for the "/getpremium" AJAX call and create a session cookie.

   The logic for these two steps is illustrated in the `main.ts` file below.

   Notice that the first line references the EdgeWorkers types package you installed locally as a dev dependency:

```javascript
/// <reference types="akamai-edgeworkers"/>
import {Cookies, SetCookie} from 'cookies';

export function onClientRequest(request : EW.MutableRequest & EW.HasRespondWith) {

  let cookies = new Cookies(request.getHeader('Cookie'));
  var isPremium = cookies.get('codingPremium');
  var premiumStatus = {premiumStatus: 'gold', statusFrom: 'edge'};

  if (isPremium === undefined) {
    request.respondWith(200, {}, JSON.stringify(premiumStatus));
  }
  else {
    request.respondWith(200, {}, JSON.stringify(isPremium));
  }
}
export function onClientResponse(request : EW.ImmutableRequest, response : EW.Response) {
  
  let cookies = new Cookies(request.getHeader('Cookie'));
  var isPremium = cookies.get('codingPremium');
  var premiumStatus = {premiumStatus: 'gold', statusFrom: 'edge'};

  if (isPremium === undefined) {

    var setPremiumCookie = new SetCookie({name: "codingPremium" , value: JSON.stringify(premiumStatus)});
    response.setHeader('Set-Cookie', setPremiumCookie.toHeader());
  }
  response.setHeader('X-Powered-By', 'Akamai EdgeWorkers');
}
```

# Define the build tasks

At this point, you have a syntactically correct `main.ts` file representing the "Go Premium" business logic that you want to pull forward from the content origin to the {{COMPANY_NICKNAME}} Edge. Next, you need to define the build tasks. This requires one last update to `package.json`. To do this you need to remove the dummy test script placeholder that `npm init` added, add a package config variable to hold the EdgeWorker ID (3686 for this example), and define the build steps.

The build steps must:

- Convert `main.ts`, the required EdgeWorkers code file, into `main.js` via `tsc`, the TypeScript compiler.

- Build `bundle.json`, the required EdgeWorkers manifest file, based on information in `package.json`.

- Create an EdgeWorkers code bundle (tgz) that can be tested via {{COMPANY_NICKNAME}} Sandbox. The tgz file, once confirmed can be deployed to {{COMPANY_NICKNAME}} delivery networks.

Here's an example `package.json` that accomplishes these build steps:

```json
{
  "name": "getpremium-edgeworker",
  "version": "2.0.0",
  "description": "Offloads /getPremium AJAX call for WeMakeEdgeWorkersCoding.Fun landing page",
  "main": "main.js",
  "config": {
    "ewid": "3686"
  },
  "scripts": {
    "build": "npm run build-ts",
    "build-ts": "tsc && npm run build-bundle-json",
    "build-bundle-json": "cd built && echo '{\"edgeworker-version\":\"'$npm_package_version'\",\"description\":\"'$npm_package_description'\"}' > bundle.json && npm run build-ew-tgz",
    "build-ew-tgz": "cd built && tar czvf ../../'ew_'$npm_package_config_ewid'_'$npm_package_version'.tgz' *",
    "postinstall": "npm run build"
  },
  "author": "David Theobald",
  "license": "ISC",
  "devDependencies": {
    "@types/akamai-edgeworkers": "^1.0.1",
    "typescript": "^3.8.3"
  }
}
```

# Create an EdgeWorkers code bundle

Finally, you're ready to build the EdgeWorkers code bundle.

When building the EdgeWorkers code bundle you can also include optional JavaScript files for helper functions or local data dictionaries.

For more information on how to create code bundles see [Create a code bundle](create-a-code-bundle.md).

> 📘 There are [code size limits](limitations.md) enforced on upload, so minification and code reduction techniques are recommended.

1. Run the following within the working directory for this package:

```shell
$ npm install
 
> getpremium-edgeworker@2.0.0 postinstall ~/dev/coding_website/edgeworkers/3686/2.0.0
> npm run build
 
> getpremium-edgeworker@2.0.0 build ~/dev/coding_website/edgeworkers/3686/2.0.0
> npm run build-ts
 
> getpremium-edgeworker@2.0.0 build-ts ~/dev/coding_website/edgeworkers/3686/2.0.0
> tsc && npm run build-bundle-json
 
> getpremium-edgeworker@2.0.0 build-bundle-json ~/dev/coding_website/edgeworkers/3686/2.0.0
> cd built && echo '{"edgeworker-version":"'$npm_package_version'","description":"'$npm_package_description'"}' > bundle.json && npm run build-ew-tgz
 
> getpremium-edgeworker@2.0.0 build-ew-tgz ~/dev/coding_website/edgeworkers/3686/2.0.0
> cd built && tar czvf ../../'ew_'$npm_package_config_ewid'_'$npm_package_version'.tgz' *
 
bundle.json
main.js
 
audited 2 packages in 9.01s
found 0 vulnerabilities
```

The output should be an EdgeWorkers code bundle named `ew_3686_2.0.0.tgz`. You can use this code bundle for confirmation testing.

# Update the Sandbox instance

To test the new EdgeWorkers code bundle update the sandbox using Sandbox CLI.

1. Update the code bundle in sandbox and restart the sandbox client.

```shell
$ akamai sandbox update-edgeworker 3686 ~/dev/coding_website/edgeworkers/3686/ew_3686_2.0.0.tgz
done!
 
$ akamai sandbox start
...
... INFO  c.a.devpops.connector.ConnectorMain - Successfully launched Akamai Sandbox Client
... INFO  c.a.devpops.connector.ConnectorMain - Sandbox Client running on port: 9550
$ akamai sandbox update-edgeworker 3686 ~/dev/coding_website/edgeworkers/3686/ew_3686_2.0.0.tgz
done!
 
$ akamai sandbox start
...
... INFO  c.a.devpops.connector.ConnectorMain - Successfully launched Akamai Sandbox Client
... INFO  c.a.devpops.connector.ConnectorMain - Sandbox Client running on port: 9550
```

2. Validate that the new business logic is applied for the "Go Premium" AJAX call. If it is correct, the new EdgeWorkers code bundle is ready for upload and activation to the {{COMPANY_NICKNAME}} delivery networks. For example: `http://we.makeedgeworkerscoding.fun:9550/getpremium`

3. This yields a JSON payload from the EdgeWorker instead of the content origin:

```json
{
    "premiumStatus": "gold",
    "statusFrom": "edge"
}
```

This proves that the business logic will work as desired when deployed to the {{COMPANY_NICKNAME}} delivery networks.

# Deploy your EdgeWorkers code bundle

This examples shows you how to use EdgeWorkers CLI commands to upload the code bundle, activate it on the {{COMPANY_NICKNAME}} staging network, and check the activation status.

1. Upload your EdgeWorkers code bundle:

```shell
$ akamai edgeworkers upload 3686 --bundle ~/dev/coding_website/edgeworkers/3686/ew_3686_2.0.0.tgz

----------------------------------------------------
--- New version uploaded for EdgeWorker Id: 3686 ---
----------------------------------------------------
edgeWorkerId  version  checksum  createdBy  createdTime
------------  -------  --------  ---------  --------------------
3686          2.0.0    < hash >  dtheobal   2020-01-30T23:19:46Z
```

2. Activate EdgeWorkers version 2.0.0 on the {{COMPANY_NICKNAME}} staging network:

```shell
$ akamai edgeworkers activate 3686 STAGING 2.0.0

--------------------------------------------------------------------------------------------
--- New Activation record created for EdgeWorker Id: 3686, version: 2.0.0, on network: STAGING ---
--------------------------------------------------------------------------------------------
edgeWorkerId  version  activationId  status     network  createdBy  createdTime
------------  -------  ------------  ---------  -------  ---------  --------------------
3686          2.0.0    2             PRESUBMIT  STAGING  dtheobal   2020-01-30T23:21:53Z
```

3. Monitor the activation status:

```shell
$ akamai edgeworkers status 3686 --versionId 2.0.0

--------------------------------------------------------------------------------------------
--- The following EdgeWorker Activations currently exist for account: <account>, ewId: 3686, version: 2.0.0, activationId: any ---
--------------------------------------------------------------------------------------------
edgeWorkerId  version  activationId  status   network  createdBy  createdTime
------------  -------  ------------  -------  -------  ---------  --------------------
3686          2.0.0    2             PENDING  STAGING  dtheobal   2020-01-30T23:21:53Z
```

Once the status indicates COMPLETE you can perform one last round of feature verification on the staging network. In this example, you would validate the new business logic applied for /getPremium — if correct, you're done!
