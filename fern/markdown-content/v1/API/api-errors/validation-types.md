---
title: "Validation types"
slug: "validation-types"
excerpt: ""
hidden: false
createdAt: "Thu May 20 2021 16:23:57 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Wed Aug 14 2024 14:05:26 GMT+0000 (Coordinated Universal Time)"
---
This section provides details for each validation type for EdgeWorker code bundles. You get these response values when you run the [Validate an EdgeWorkers code bundle](ref:post-validations) operation.

[block:parameters]
{
  "data": {
    "h-0": "Type",
    "h-1": "Description",
    "0-0": "Error types",
    "0-1": "",
    "1-0": "`ACCESS_TOKEN_EXPIRED`",
    "1-1": "The EdgeKV access token is expired.",
    "2-0": "`ACCESS_TOKEN_INVALID`",
    "2-1": "The EdgeKV access token is invalid.",
    "3-0": "`ACCESS_TOKEN_MISSING`",
    "3-1": "The EdgeKV access token is missing from the EdgeWorkers code bundle.",
    "4-0": "`ACCESS_TOKEN_REFERENCE_INVALID`",
    "4-1": "The reference to the EdgeKV access token does not exist or it has not been activated.",
    "5-0": "`EDGEKV_FILE_MISSING`",
    "5-1": "To use an import statement for `edgekv.js` add the `edgekv.js` file to the EdgeWorkers code bundle.",
    "6-0": "`EDGEKV_TOKENS_FILE_MISSING`",
    "6-1": "To use an import statement for `edgekv_tokens.js` add the `edgekv_tokens.js` file to the EdgeWorkers code bundle.",
    "7-0": "`EMPTY_TARBALL`",
    "7-1": "The EdgeWorkers code bundle is empty. Update the code bundle and upload it again.",
    "8-0": "`INVALID_EDGEKV_IMPORTS`",
    "8-1": "The `edgekv.js` helper library is missing from the EdgeWorkers code bundle.",
    "9-0": "`INVALID_FILE_PERMISSION`",
    "9-1": "A file in the EdgeWorkers code bundle has invalid permissions. For example, if a file is executable.",
    "10-0": "`INVALID_GZIP_FORMAT`",
    "10-1": "The GZIP format of the EdgeWorkers code bundle is invalid. Review the code bundle for errors and upload it again.",
    "11-0": "`INVALID_MANIFEST`",
    "11-1": "The EdgeWorkers code bundle contains an invalid manifest file. Review the code bundle for errors and upload it again.",
    "12-0": "`INVALID_TAR_ARCHIVE`",
    "12-1": "The TAR archive of the EdgeWorkers code bundle is invalid. Review the code bundle for errors and upload it again.",
    "13-0": "`MAX_COMPRESSED_SIZE_EXCEEDED`",
    "13-1": "The compressed size of the EdgeWorkers code bundle is invalid. Review the code bundle for errors and upload it again.",
    "14-0": "`MAX_UNCOMPRESSED_SIZE_EXCEEDED`",
    "14-1": "The GZIP format of the EdgeWorkers code bundle is invalid. Review the code bundle for errors and upload it again.",
    "15-0": "`MISSING_MANDATORY_FILES`",
    "15-1": "The EdgeWorkers code bundle is missing mandatory files. Review the contents of the code bundle and upload it again.",
    "16-0": "`STATIC_VALIDATION_FAILED`",
    "16-1": "The EdgeWorkers code bundle failed static validation. Review the code bundle for errors and upload it again. <BR>The response includes any errors encountered when loading the EdgeWorkers code bundle in v8. It also includes any v8 compilation errors it detects when loading the `main.js` file and the imports during validation. </BR>The load executes any code modules outside of the EdgeWorkers event handlers. If that triggers an unhandled exception, the response encodes each call site, separated by commas, as `<file>:<function>:<line>:<column>`.",
    "17-0": "Warning types",
    "17-1": "",
    "18-0": "`ACCESS_TOKEN_EXPIRING_SOON`",
    "18-1": "The EdgeKV access token in your EdgeWorkers code bundle will expire soon. For more information refer to [Generate and retrieve EdgeKV access tokens](https://techdocs.akamai.com/edgekv/docs/generate-and-retrieve-edgekv-access-tokens)."
  },
  "cols": 2,
  "rows": 19,
  "align": [
    "left",
    "left"
  ]
}
[/block]
