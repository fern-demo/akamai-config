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
| Name | Type | Description | Required |
| --- | --- | --- | :---: |
| `edgeworker-version` | String | Unique identifier for the EdgeWorkers version. | <Markdown src="../../../snippets/CHAR_CHECK.mdx" /> |
| `bundle-version` | Integer | Bundle format version. | <Markdown src="../../../snippets/CHAR_CROSS.mdx" /> |
| `api-version` | String | Version of JavaScript API when the EdgeWorkers code was created. | <Markdown src="../../../snippets/CHAR_CROSS.mdx" /> |
| `description` | String | Phrase describing the EdgeWorkers script function. | <Markdown src="../../../snippets/CHAR_CROSS.mdx" /> |
| `misc` | Object | Information you can include in the manifest to identify the EdgeWorkers function. | <Markdown src="../../../snippets/CHAR_CROSS.mdx" /> |
| `invoke-for-edgeworker-clients` | Boolean | When set to `true`, it enables support for subWorkers. By default, this configuration setting is set to `false`. | <Markdown src="../../../snippets/CHAR_CROSS.mdx" /> |
| `config` | Object | Additional, not required configuration, such as the`logging` object. | <Markdown src="../../../snippets/CHAR_CROSS.mdx" /> |
| `logging` | Object | Contains information about the log delivery destination stream, and/or the default log level. | <Markdown src="../../../snippets/CHAR_CROSS.mdx" /> |
| `level` | Trace, Debug, Info, Warn, or Error | The default [JavaScript logging](enable-javascript-logging.md) level applied to the EdgeWorkers code bundle. You can use this parameter to override the default log level, error. | <Markdown src="../../../snippets/CHAR_CROSS.mdx" /> |
| `schema` | String | Not currently in use. Use `v1` as a placeholder. | <Markdown src="../../../snippets/CHAR_CROSS.mdx" /> |
| `ds2id` | Integer | The Data Stream 2 stream id to associate with the JavaScript logging data.<br/>The stream needs to be active before you include it in the EdgeWorkers code bundle.<br/>When you add the `logging` config setting to the `bundle.json` file, the `ds2id` is required. | <Markdown src="../../../snippets/CHAR_CHECK.mdx" /> |


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
