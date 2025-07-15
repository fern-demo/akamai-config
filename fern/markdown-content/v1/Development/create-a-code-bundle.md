---
title: "Create a code bundle"
slug: "create-a-code-bundle"
excerpt: ""
hidden: false
createdAt: "Wed May 05 2021 19:32:49 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Tue Mar 11 2025 14:36:18 GMT+0000 (Coordinated Universal Time)"
---
Refer to these guidelines to create an EdgeWorkers code bundle.

EdgeWorkers functions are defined in a file entitled `main.js`. You also need to create a manifest file called `bundle.json`. These are packaged together, along with any other dependencies as a compressed `.tgz` file.

 ![Create code bundle](https://techdocs.akamai.com/edgeworkers/img/create-code-bundle-v1.png)

For example, a package called `mybundle.tgz` includes two files:

- `main.js`. The JavaScript source that contains event handler functions.

- `bundle.json`. The manifest file that includes necessary meta information.

> 📘 The EdgeWorkers code bundle cannot contain any executable files.
> 
> Any files with a '.\_<xx>' notation inside the EdgeWorkers code bundle are ignored.

> 👍 You cannot re-use a version that you deleted from an EdgeWorker ID. You need to use a new unique version in the `bundle.json` and re-package it and any other files with your `main.js` file.

[block:parameters]
{
  "data": {
    "h-0": "Name",
    "h-1": "Type",
    "h-2": "Required",
    "h-3": "Description",
    "0-0": "`edgeworker-version`",
    "0-1": "String",
    "0-2": "<<CHAR_CHECK>>",
    "0-3": "Unique identifier for the version  \nIf you delete a version from an EdgeWorker ID you cannot re-use it. Follow the steps below to create a new code bundle that you can use to create a version.",
    "1-0": "`bundle-version`",
    "1-1": "Integer",
    "1-2": "<<CHAR_CROSS>>",
    "1-3": "Bundle format version",
    "2-0": "`api-version`",
    "2-1": "String",
    "2-2": "<<CHAR_CROSS>>",
    "2-3": "Version of JavaScript API that the functions are coded against",
    "3-0": "`description`",
    "3-1": "String",
    "3-2": "<<CHAR_CROSS>>",
    "3-3": "Descriptive phrase for the code function",
    "4-0": "`misc`",
    "4-1": "Object",
    "4-2": "<<CHAR_CROSS>>",
    "4-3": "Miscellaneous data you can include in the manifest to identify the function"
  },
  "cols": 4,
  "rows": 5,
  "align": [
    "left",
    "left",
    "center",
    "left"
  ]
}
[/block]


Follow these steps to create the bundle.

> 👍 You can also use the code bundle editor to [create an EdgeWorker version](doc:manage-edgeworkers#create-an-edgeworker-version).

1. Create the JavaScript source in a file called `main.js`.

You can also [enable subWorkers](doc:create-a-code-bundle-copy#enable-subworkers)  and [change the default JavaScript logging level](doc:create-a-code-bundle-copy#change-the-default-javascript-logging-level) in the `main.js` file.

2. Each time you create a new version of the code bundle you need to increment the `edgeworker-version` in the `bundle.json`  file. 

```json
{
    "edgeworker-version": "1.2",
    "description" : "Perform redirect"
}
```

3. Compress the files into a code bundle.

Make sure that the code bundle doesn't contain any executable files. If you include any executable files in the .tgz it will fail when you try to upload it.

```
tar -czvf filename.tgz main.js bundle.json
```

Once you have created the code bundle, you can use the [EdgeWorkers Management application](doc:manage-edgeworkers) to create an EdgeWorker version.

# Code bundle configuration settings

These configuration settings let you enable or disable EdgeWorkers features from within the code bundle.

## Enable subWorkers

To enable subWorkers you need to add the `invoke-for-edgeworker-clients` config setting to the `bundle.json` file and set it to  `true`. For more information, go to [Create a subWorker](doc:create-a-subworker) in this guide.

| Name                            | Description                                                                                                  |
| :------------------------------ | :----------------------------------------------------------------------------------------------------------- |
| `subrequest`                    | Includes config settings for sub-requests. Currently it only includes  “invoke-for-edgeworkers-client”.      |
| `invoke-for-edgeworkers-client` | When set to true, it enables support for subWorkers. By default, this configuration setting is set to false. |

```json
{  
    "edgeworker-version": "0.2",  
    "description" : "Hello World Example",
    "config": {  
        "subrequest": {  
            "invoke-for-edgeworker-clients": true  
        }  
    }  
}
```

If the configuration setting is set to `false` or not included, the EdgeWorkers function will return an information status 22, `SubworkerNotEnabled`, if a sub-request is made to the EdgeWorkers URL. The sub-request will continue to process without invoking the EdgeWorker.

## Change the default JavaScript logging level

You can set the [JavaScript logging](doc:enable-javascript-logging) in the code bundle and deliver these logs using a [DataStream 2](https://techdocs.akamai.com/datastream2/docs/welcome-datastream2)  stream. By default, JavaScript logs are set to ERROR.

> 👍 For more information about how to deliver the logs, go to the [Use DataStream 2 to deliver JavaScript logs](doc:ds2-javascript-logging) tutorial.

To change the default JavaScript log level you need to add the `logging` config setting to the `bundle.json` file.

[block:parameters]
{
  "data": {
    "h-0": "Name",
    "h-1": "Description",
    "0-0": "`level`",
    "0-1": "The log level applied to the EdgeWorkers code bundle. You can use this parameter to override the default log level, ERROR.  \nThe log levels are **trace**, **debug**, **info**, **warn**, and **error**.",
    "1-0": "`schema`",
    "1-1": "Not currently in use. Use `v1` as a placeholder.",
    "2-0": "`ds2id`",
    "2-1": "The DataStream2 stream id to associate with the log data.  \nThe stream needs to be active before you include it in the EdgeWorkers code bundle.  \nWhen you add the `logging` config setting to the `bundle.json` file, the `ds2id` is required."
  },
  "cols": 2,
  "rows": 3,
  "align": [
    "left",
    "left"
  ]
}
[/block]


You can change the `ds2id` using the [EdgeWorkers CLI](https://github.com/akamai/cli-edgeworkers).

```json
{
  "edgeworker-version": "1.2.3",
  "bundle-version": 1,
  "api-version": "0.3",
  "description": "A bundle describing overriding the default log level.",
  "config": {
          "logging": {
                  "level": "info",
                  "schema": "v1",
                  "ds2id": 1234
                  }
           }
}
```

## Enable True Client-IP

Pass the [True-Client-IP request header](doc:request-object#clientip) forward in a sub-request. When enabled, the origin receives the IP address of the client.

| Name               | Description                                                                                                                              |
| :----------------- | :--------------------------------------------------------------------------------------------------------------------------------------- |
| `client-ip-header` | When set to true, it enables the origin to receive the IP address of the client. By default, this configuration setting is set to false. |

```json
{
    "edgeworker-version": "0.2",
    "description" : "Hello World Example",
    "config": {
        "logging": {
            "level": "error"
        },
        "subrequest": {
            "invoke-for-edgeworker-clients": false
        },
        "client-ip-header": true
    }
}
```
