---
title: "Code bundle format"
slug: "code-bundle-format"
excerpt: ""
hidden: false
createdAt: "Thu May 20 2021 16:07:14 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Thu Feb 06 2025 16:01:08 GMT+0000 (Coordinated Universal Time)"
---
To create the EdgeWorkers bundle, you need a JavaScript source file called `main.js` that contains event handler definitions for when to execute the code:

- `onClientRequest`. This event happens for every request as the request is received, before checking if a response is available in cache.

- `onOriginRequest`. This event happens just before sending the request to the origin.

- `onOriginResponse`. This event happens as the origin response is created.

- `onClientResponse`. This event happens for every request just before the client response is sent.

- `responseProvider`. This event happens if the response is not already found in cache. You can use `responseProvider` to generate dynamic responses from various content and API sources.

You also need to create a manifest file called `bundle.json` that includes meta information as described in the table below.

[block:parameters]
{
  "data": {
    "h-0": "Name",
    "h-1": "Type",
    "h-2": "Description",
    "h-3": "Required",
    "0-0": "`edgeworker-version`",
    "0-1": "String",
    "0-2": "Unique identifier for the EdgeWorkers version.",
    "0-3": "<<CHAR_CHECK>>",
    "1-0": "`bundle-version`",
    "1-1": "Integer",
    "1-2": "Bundle format version.",
    "1-3": "<<CHAR_CROSS>>",
    "2-0": "`api-version`",
    "2-1": "String",
    "2-2": "Version of JavaScript API when the EdgeWorkers code was created.",
    "2-3": "<<CHAR_CROSS>>",
    "3-0": "`description`",
    "3-1": "String",
    "3-2": "Phrase describing the EdgeWorkers script function.",
    "3-3": "<<CHAR_CROSS>>",
    "4-0": "`misc`",
    "4-1": "Object",
    "4-2": "Information you can include in the manifest to identify the EdgeWorkers function.",
    "4-3": "<<CHAR_CROSS>>",
    "5-0": "`invoke-for-edgeworker-clients`",
    "5-1": "Boolean",
    "5-2": "When set to `true`, it enables support for subWorkers. By default, this configuration setting is set to `false`.",
    "5-3": "<<CHAR_CROSS>>",
    "6-0": "`config`",
    "6-1": "Object",
    "6-2": "Additional, not required configuration, such as the`logging` object.",
    "6-3": "<<CHAR_CROSS>>",
    "7-0": "`logging`",
    "7-1": "Object",
    "7-2": "Contains information about the log delivery destination stream, and/or the default log level.",
    "7-3": "<<CHAR_CROSS>>",
    "8-0": "`level`",
    "8-1": "Trace, Debug, Info, Warn, or Error",
    "8-2": "The default [JavaScript logging](doc:enable-javascript-logging) level applied to the EdgeWorkers code bundle. You can use this parameter to override the default log level, error.",
    "8-3": "<<CHAR_CROSS>>",
    "9-0": "`schema`",
    "9-1": "String",
    "9-2": "Not currently in use. Use `v1` as a placeholder.",
    "9-3": "<<CHAR_CROSS>>",
    "10-0": "`ds2id`",
    "10-1": "Integer",
    "10-2": "The Data Stream 2 stream id to associate with the JavaScript logging data.  \nThe stream needs to be active before you include it in the EdgeWorkers code bundle.  \nWhen you add the `logging` config setting to the `bundle.json` file, the `ds2id` is required.",
    "10-3": "<<CHAR_CHECK>>"
  },
  "cols": 4,
  "rows": 11,
  "align": [
    "left",
    "left",
    "left",
    "center"
  ]
}
[/block]


> 📘 Limit `edgeworker-version` characters to alphanumeric, underscore, dash, dot, and tilde. The maximum length of the `edgeworker-version` is 32 characters. You can't use a single period (.) as the version.

```json
{
   "edgeworker-version":"4.22.3",
   "bundle-version":1,
   "api-version":"0.3",
   "description":"Language Redirect",
   "misc":{
      "author":"jsmith",
      "git-commit":"4ce52c8ff4fdd1771e5347297ea5691b55c4f6ed",
      "updated":"2027-09-23"
   }
}
```
