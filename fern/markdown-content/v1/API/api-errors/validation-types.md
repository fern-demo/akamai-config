---
title: "Validation types"
slug: "validation-types"
excerpt: ""
hidden: false
createdAt: "Thu May 20 2021 16:23:57 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Wed Aug 14 2024 14:05:26 GMT+0000 (Coordinated Universal Time)"
---
This section provides details for each validation type for EdgeWorker code bundles. You get these response values when you run the [Validate an EdgeWorkers code bundle](ref:post-validations) operation.
| Type | Description |
| --- | --- |
| Error types |  |
| `ACCESS_TOKEN_EXPIRED` | The EdgeKV access token is expired. |
| `ACCESS_TOKEN_INVALID` | The EdgeKV access token is invalid. |
| `ACCESS_TOKEN_MISSING` | The EdgeKV access token is missing from the EdgeWorkers code bundle. |
| `ACCESS_TOKEN_REFERENCE_INVALID` | The reference to the EdgeKV access token does not exist or it has not been activated. |
| `EDGEKV_FILE_MISSING` | To use an import statement for `edgekv.js` add the `edgekv.js` file to the EdgeWorkers code bundle. |
| `EDGEKV_TOKENS_FILE_MISSING` | To use an import statement for `edgekv_tokens.js` add the `edgekv_tokens.js` file to the EdgeWorkers code bundle. |
| `EMPTY_TARBALL` | The EdgeWorkers code bundle is empty. Update the code bundle and upload it again. |
| `INVALID_EDGEKV_IMPORTS` | The `edgekv.js` helper library is missing from the EdgeWorkers code bundle. |
| `INVALID_FILE_PERMISSION` | A file in the EdgeWorkers code bundle has invalid permissions. For example, if a file is executable. |
| `INVALID_GZIP_FORMAT` | The GZIP format of the EdgeWorkers code bundle is invalid. Review the code bundle for errors and upload it again. |
| `INVALID_MANIFEST` | The EdgeWorkers code bundle contains an invalid manifest file. Review the code bundle for errors and upload it again. |
| `INVALID_TAR_ARCHIVE` | The TAR archive of the EdgeWorkers code bundle is invalid. Review the code bundle for errors and upload it again. |
| `MAX_COMPRESSED_SIZE_EXCEEDED` | The compressed size of the EdgeWorkers code bundle is invalid. Review the code bundle for errors and upload it again. |
| `MAX_UNCOMPRESSED_SIZE_EXCEEDED` | The GZIP format of the EdgeWorkers code bundle is invalid. Review the code bundle for errors and upload it again. |
| `MISSING_MANDATORY_FILES` | The EdgeWorkers code bundle is missing mandatory files. Review the contents of the code bundle and upload it again. |
| `STATIC_VALIDATION_FAILED` | The EdgeWorkers code bundle failed static validation. Review the code bundle for errors and upload it again. <BR>The response includes any errors encountered when loading the EdgeWorkers code bundle in v8. It also includes any v8 compilation errors it detects when loading the `main.js` file and the imports during validation. </BR>The load executes any code modules outside of the EdgeWorkers event handlers. If that triggers an unhandled exception, the response encodes each call site, separated by commas, as `<file>:<function>:<line>:<column>`. |
| Warning types |  |
| `ACCESS_TOKEN_EXPIRING_SOON` | The EdgeKV access token in your EdgeWorkers code bundle will expire soon. For more information refer to [Generate and retrieve EdgeKV access tokens](https://techdocs.akamai.com/edgekv/docs/generate-and-retrieve-edgekv-access-tokens). |
