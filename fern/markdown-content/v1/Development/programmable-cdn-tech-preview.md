---
title: "Programmable CDN - Tech Preview"
slug: "programmable-cdn-tech-preview"
excerpt: ""
hidden: true
createdAt: "Thu Feb 29 2024 18:37:13 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Thu Jun 13 2024 18:22:45 GMT+0000 (Coordinated Universal Time)"
---
Welcome to the Programmable CDN Tech Preview! Programmable CDN aims to allow you to powerfully, flexibly, and intuitively express Akamai CDN settings and business logic. As a first step, we've created a proof-of-concept tool to let you get hands-on with our envisioned experience. By participating in this proof-of-concept you can share your feedback directly with our development team and influence future iterations of this initiative.

You can use the PoC tool to programmatically configure Akamai Properties using JavaScript. This lets you complete Akamai configuration tasks in fewer steps and minimizes interaction with the Control Center UI. This guide will help you get started. Please use the Programmable CDN tool to test use-cases that are interesting to you. We'll be following up for feedback. Thank you!

> 🚧 The goal of this tech preview is to gather feedback to further refine the existing capabilities and to identify areas for future development. This tech preview product may contain usability limitations and possibly some bugs. **Do not use this tool to create or update properties enabled on the Akamai production network.**

# Before you start

Before you start, make sure you have the following prerequisites. 

- Version 10.2.4 or above of npm installed and running on your computer. 
- Version 21.6.0 or above of Node installed and running on your computer.
- A valid [~/.edgerc file](https://techdocs.akamai.com/developer/docs/set-up-authentication-credentials)
- Although not a requirement, you should use [VSCode](https://code.visualstudio.com/download) as your development environment to take advantage of the tooling hints built-in to the Programmable CDN tool. 

> 👍 To ensure success using this tech preview tool you should be familiar with:
> 
> - Node, npm, and JavaScript
> - How to [Configure a property](https://techdocs.akamai.com/property-mgr/docs/create-new-prop) and [Edit a property](https://techdocs.akamai.com/property-mgr/docs/know-your-around#editor-view)  using [Property Manager](https://techdocs.akamai.com/property-mgr/docs/welcome-prop-manager) 
> - [Property Manager behaviors](https://techdocs.akamai.com/property-mgr/docs/behs) 
> - How to [activate](https://techdocs.akamai.com/property-mgr/docs/activate-stage)  and [test](https://techdocs.akamai.com/property-mgr/docs/test-https)  property changes on Akamai's STAGING network.
> 
> Although not necessary, we recommend that you are familiar with:
> 
> - TypeScript - the type definition is a .d.ts file  
>   For more information about the official TypeScript binding for the EdgeWorkers JavaScript API  go to the [TypeScript](https://techdocs.akamai.com/edgeworkers/docs/typescript)  section in this document.
> - How to use .d.ts files to get [JavaScript type hints](https://code.visualstudio.com/docs/nodejs/working-with-javascript#_type-checking-javascript)  in VSCode
> - The [Property Manager API](https://techdocs.akamai.com/property-mgr/reference/api)  and the Property Manager API rules variables
> - EdgeWorkers
> - VSCode

# About the Programmable CDN tool

You can use the Programmable CDN tool to **initialize** a directory and to **activate** a property and an EdgeWorker with a new or existing configuration.

You only need to Initialize the directory once to set up the Programmable CDN tool. After initialization, you can edit the `src/config.js` file to change the property configuration. Once you've made and verified the changes with local unit tests, you can activate the property and EdgeWorker.

When you initialize the Programmable CDN tool the process creates:

- An src folder
- A default `config.js` file
- The EdgeWorker files

When you activate a property and an EdgeWorker with a new configuration, the Programmable CDN tool:

- Uses the JavaScript code to build the property configuration and define the behaviors as Property Manager API JSON in the `/src/config.js` file.
- Saves the EdgeWorker in the `src/ directory`. The `akj init` task also adds the `src/main.js` and the `src/bundle.json` files.
- Activates the Property and EdgeWorker after you upload them.

## Examples

You can reference the [Programmable CDN tool examples](https://github.com/akamai/akj-tech-preview/) to view the different usage patterns that the tool enables.

If the Programmable CDN tool was used to setup the following URL: <https://example.com/index.html>  
The staging URL would be: <https://example.com/index.html>.

> 📘 For Standard TLS , the edge hostname uses `edgesuite.net`. For Enhanced TLS, the edge hostname uses `edgekey.net`.

Once an activation is complete, and the confirmation email is sent you can make a cURL request to test it.  For example, if the hostname is `example.com` and it uses Enhanced TLS, use the cURL request below if the domain is CNAME’d.

```curl
curl --connect-to ::example.com.edgekey-staging.net <https://www.example/com>
```

> 👍 If you are using Standard TLS use `edgesuite` instead of `edgekey`.

For more information see [Test your configuration](https://techdocs.akamai.com/property-mgr/docs/test-https).

# Get started

You can watch this video to learn how to install and initialize the Programmable CDN tool.
<video width="600" height="400" controls>
  <source src="https://techdocs.akamai.com/edgeworkers/videos/pcdnInstallInitialization-v1.mp4" type="video/mp4">
  <strong>Error</strong>: The video's URL was inaccessible.
</video>
</div>
<br/>


## Create a code directory

1. Go to terminal inside your dev container and use this command to create a directory for your code.  
   `mkdir akj-setup-start`
2. Move to the directory that you just created.  
   `cd akj-setup-start`
3. To create the helper files in a `package.json` file and a Node package file in your directory run this command.  
   `npm init`

The answers you provide populate the `package.json` file  and will not change the behavior of the Programmable CDN tool.

## Add the Programmable CDN project as a dependency

Run this command to add the [Programmable CDN project](https://www.npmjs.com/package/akj-tech-preview)  as a dependency.  
`npm install -D akj-tech-preview`

## Initialize the Programmable CDN tool

You only need to perform this setup task once. There are two options when setting up the tool, you can either use an existing property and EdgeWorker or you can create them as part of the initialization task.

> 📘 You need privileges to create an EdgeWorker and a property. For more information see, [Manage access to EdgeWorkers](manage-access-to-edgeworkers.md).

1. To initialize the Programmable CDN tool run this command to generate the source files for your project in the `src` directory.  
   `npx akj init`
2. If you answer yes when asked if you want to use an existing property and EdgeWorker to generate the source files you need to provide the contract, group, property, and EdgeWorker ID that you want to use.  
   For each selection the Programmable CDN tool provides a list of available options based on your previous choice.
3. Now you can run the Programmable CDN executable using [npx](https://docs.npmjs.com/cli/v10/commands/npx) . For example:

```
`npx akj --help`
`npx akj activate --help`
Usage: `npx akj[options]`
```

4. Once initialization is complete, you can modify:

- The Property Manager API behavior by changing `src/config.js`, and
- The EdgeWorker behavior by modifying `src/main.js`.

5. To activate a new version of each on staging , use:  
   `npx akj activate`

### About your Programmable CDN environment

When you run the `akj init` command it creates the following files if you aren’t using an existing property and EdgeWorker. If you are using an existing property and EdgeWorker the `akj init` command uses them to create the files in the Programmable CDN directory.

- A property
- A  CP code
- An EdgeWorker
- The `property.json` file in the property root
- The `src/config.js`, `src/main.js`, and `src/bundle.json` that you need to activate the property and EdgeWorker.  
  You can use `-s` to specify the section of the ~/.edgerc file to use, and `-a` to specify the account switch key.

You only need to initialize the directory once to use the tool. After you perform the setup task you'll have a Node package that includes the following files.
| File | Description |
| --- | --- |
| /package.json | This is the standard [npm package file](https://docs.npmjs.com/cli/v10/configuring-npm/package-json) . Only the dependencies are specific to Programmable CDN. |
| /property.json | Contains all the information you specified during installation:<br/>`property ID`<br/>`contractID`<br/>`groupID`<br/>`edgeworkerID`<br/>`accountSwitchKey` |
| /src/ | Directory containing the EdgeWorker that will be uploaded and activated by the tool. |
| /src/config.js | The Programmable CDN tool uses this file to configure the property. It contains the `onConfig()` function that runs automatically.<br/>You can edit this file to change the property configuration. Once you make and verify your changes, using local unit tests, you can activate the property and the EdgeWorker. |
| /src/bundle.json | The EdgeWorkers [manifest file](code-bundle-format.md) that includes necessary meta information.  When you run the Programmable CDN tool it uploads this file. |
| /src/main.js | The EdgeWorkers source code associated with the project that contains the event handler functions. When you run the Programmable CDN tool it uploads and activates this file. |


If you choose to use an existing property and EdgeWorker, the current state of those items is not included in the `config.js` or EdgeWorker. If you run `npx akj init`  on an existing directory, it will overwrite files that already exist. You should only run it once.

# Modify your property and EdgeWorker

You can watch this video to learn more about how to run the Programmable CDN tool and use it to modify your property and/or EdgeWorker.
<video width="600" height="400" controls>
  <source src="https://techdocs.akamai.com/edgeworkers/videos/pcdnIdeIntegrationUsage-v1.mp4" type="video/mp4">
  <strong>Error</strong>: The video's URL was inaccessible.
</video>
</div>
<br/>


Once you’ve set up your Programmable CDN environment, you can modify:

- The Property Manager API behavior by changing the `src/config.js` file.
- The EdgeWorkers behavior by modifying the `src/main.js` file.

Use this Programmable CDN command to activate a new version of each on staging.  
`npx akj activate`

If you run the tool twice in rapid succession, the second upload of the property can fail if the property is still activating.

## Run the Programmable CDN tool

Run the `npx akj activate` command in the project directory.

When run this command in the root of the directory, the Programmable CDN tool:

- Executes `src/config.js`, to produce Property manager API JSON.
- Uploads and activates Property manager API JSON for the property named in `property.json`.
- Creates an EdgeWorkers bundle from the `src/` directory.
- Uploads and activates the EdgeWorkers code bundle.

## Configure your Akamai property

1. To configure your Akamai property using the Programmable CDN tool, open the `/src/config.js` file in your development environment, preferably VSCode.

> 👍 The Programmable CDN tool was designed to leverage the tooling hints available in VSCode.

You can use `npx akj activate` to configure your property by writing JavaScript in the `onConfig()` function. The function receives a single, builder argument. This example demonstrates how to call functions on the builder to create a rule tree. 

```javascript
function onConfig(config) {
// ...
    config
        .onPath({
            matchOperator: 'MATCHES_ONE_OF',
            values: ['/products/serverless-computing-edgeworkers*'],
        })
        .name('EdgeWorkers Page Caching')
        .setCaching({
            behavior: 'MAX_AGE',
            ttl: '1h',
        });
// ...
```

You can use the `onConfig() ` function to declare the rules or behaviors to apply to an incoming request. This lets you more concisely and powerfully express static conditional logic.

> 📘 Code completion and built-in documentation
> 
> - The `config` Object includes type ahead and IntelliSense for the different behaviors that you can add to a property.
> - The documentation is available inline and the techdocs links are active.
> - The different arguments defined for each function as described in the [ Property Manager API](https://techdocs.akamai.com/property-mgr/reference/api) are available. For example, when you type in `originType` a list of origins you can add appears.
> - Sensible defaults provide you with the most common and logical choices.

The `config.onPath()` call creates a new path criteria and returns a new rule. The `.setCaching()` creates a caching behavior inside the rule. It generates the following Property Manager API JSON.

```json
{
  "name": "EdgeWorkers Page Caching",
  "comments": "/private/snip/src/config.js:75",
  "criteria": [
    {
      "name": "path",
      "options": {
        "matchOperator": "MATCHES_ONE_OF",
        "values": [
          "/products/serverless-computing-edgeworkers*"
        ],
        "matchCaseSensitive": false,
        "normalize": false
      },
      "__loc": "/private/snip/src/config.js:75"
    }
  ],
  "behaviors": [
    {
      "name": "caching",
      "options": {
        "behavior": "MAX_AGE",
        "ttl": "1h",
        "mustRevalidate": false
      },
      "__loc": "/private/snip/src/config.js:80"
    }
  ]
}

```

## Call functions on the builder

There are three types of functions that you can call on the builder:

- Criteria
- Behaviors
- Support functions

### Criteria and behaviors

Every criteria and behavior in the [Ion](https://techdocs.akamai.com/ion/docs/welcome-ion)  package is available. All criteria have an `on` prefixed to the function name. For example, you can reference the `fileExtension` criteria with the function call `onFileExtension()`. Behaviors include the  `set` prefix. For example, you can insert the `origin` behavior with `setOrigin()`. 

When calling a criteria or behavior function, the JavaScript object specifies the options.

```javascript
config
        .setOrigin({
                originType: 'CUSTOMER',
                hostname: 'www.akamai.com',
                forwardHostHeader: 'REQUEST_HOST_HEADER',
                cacheKeyHostname: 'REQUEST_HOST_HEADER',
        })
```

Each property in the argument object corresponds to the named fields in the documentation. Default values are set automatically, you don’t need to include those.

### Support Functions

There are a handful of functions that help you when constructing the rule tree.

- `config.all()` - Lets you specify multiple criteria, all of which must match for the subsequent behaviors to run.
- `config.any()` - Lets you specify multiple criteria, any of which can match for the behaviors to run.
- `config.name()` - Sets the name of the current rule.
- `config.comment()` - Sets the comment of the current rule.
- `config.newBlankRule()` - Explicitly creates a new rule.
- `config.group()` - An alternate name for `newBlankRule()` - explicitly creates a new rule.

### Create and nest rules

Calling criteria, any function prefixed with `on`, creates a new rule. Behaviors never create a new rule. 

The config builder is a fluent interface. You can make chained calls and use indentation to indicate the tree hierarchy.

```javascript
// Configure the root default rule.
config
  .setOrigin(...)
  .setCaching(...);
 
// Add a rule to the root. It directs incoming API traffic through an EdgeWorker.
config
  .onPath({value: ['/api/*']}) // <-- Creates a new rule.
    .setCaching(...)
    .setEdgeWorker(...);
 
// Add another rule to the root. It sets caching for products.
config
  .onPath({value: ['/products/*'}) // <-- Creates a new rule.
    .setCaching({ttl: '10d'});
```

If you prefer explicit rule creation, you can use `.newBlankRule()`.

### Add PAPI JSON rules

You can import any complex PAPI JSON rules you've already created into the builder. This way you don’t have to  re-write the rules in JavaScript. To import a rule into the builder use the `config.importChildRule()` function. This function takes the path to a file as an argument. The path is relative to the current file to emulate a JavaScript import or require statement. When you call `importChildRule()` it performs the following tasks:

- Loads the specified path as JSON.
- Verifies that the JSON adheres to the schema of the rule defined in the 2024-02-12 rule format.
- Inserts missing default values into the JSON.
- Adds the passed rule as the last child in the rule tree represented by the receiver. 

There’s a sample PAPI file available in `src/scf.json`. It's functionally is identical to the rule named **Images** in the sample `config.js`. It adds a rule with a [file extension criteria](https://techdocs.akamai.com/property-mgr/reference/ga-file-extension)  that matches common image suffixes and then uses a [caching behavior](https://techdocs.akamai.com/property-mgr/reference/ga-caching)  to set the cache TTL to 30 days. For more information see the [config.js of the staticConfigFile example](https://github.com/akamai/akj-tech-preview/tree/main/examples/staticConfigFile/src/config.js) . 

The sample PAPI JSON file uses VSCode’s `$schema` property to specify the format of the file, which [VSCode uses to provide Intellisense hints and validation](https://code.visualstudio.com/docs/languages/json#_mapping-in-the-json) . If you choose to create your own PAPI JSON files, you need to specify a `$schema` that points to the `akj-tech-preview` module to receive the same tooling support. 

> 📘 You don't need to specify default values if you use `importChildRule()` to add PAPI JSON files.

### Use Property Manager variables

You don't need to manually declare Property Manager variables. Instead, Property Manager variables are implicitly registered through one of the following mechanisms.

- When the variable is mentioned in an option using the `{{user.PMUSER_NAME}}` syntax. The documentation visible in VSCode indicates which options can use that syntax.
- When the variable in an option is the `variable` type.

# To learn more

You can watch this video to preview the examples available in the [Programmable CDN tool GitHub repo](https://github.com/akamai/akj-tech-preview/).
<video width="600" height="400" controls>
  <source src="https://techdocs.akamai.com/edgeworkers/videos/pcdnTechPreviewExamples.mp4" type="video/mp4">
  <strong>Error</strong>: The video's URL was inaccessible.
</video>
</div>
<br/>


# Known issues

Please review the known issues for the Programmable CDN tech preview. 

- You cannot deploy to production. This is to prevent you from accidentally overwriting a real property with a tool that is only available in tech preview and not officially supported by Akamai.
- You cannot set a Property Manager variable default value.
- You need to activate both the EdgeWorker and the Property every time you run the tool. In an actual configuration, you may have several EdgeWorkers that you want to deploy at the same time or you may have none. 

# Common errors

## EdgeWorkers validation error

A [validation error](error-codes.md) will occur if you attempt to activate a previously activated version for the selected EdgeWorker ID.

Every new EdgeWorkers code bundle that you upload needs to have a unique version number in the `bundle.json` file. The following message indicates that EdgeWorker version 0.2 is already registered. 

```
Failed to upload bundle for EdgeWorker 295052  
{  
    "type": "/edgeworkers/error-types/edgeworkers-invalid-argument",  
    "title": "Invalid Argument.",  
    "detail": "Version 0.2 already exists for EdgeWorker ID 295052",  
    "instance": "/edgeworkers/error-instances/2fe25947-b245-4d31-9cb1-fd8e98c8e0dc",  
    "status": 400,  
    "errorCode": "EW1011"  
}
```

To resolve the error,  change the version number in the `src/bundle.json` file and upload the code bundle again.

## Node and NPM version

If you see the following NPM output you need to upgrade to the [current version of Node and NPM](programmable-cdn-tech-preview.md#before-you-start) .

```
npm WARN EBADENGINE Unsupported engine {
npm WARN EBADENGINE   package: '...',
npm WARN EBADENGINE   required: { node: '...' },
npm WARN EBADENGINE   current: { node: '...', npm: '...' }
npm WARN EBADENGINE }
```
