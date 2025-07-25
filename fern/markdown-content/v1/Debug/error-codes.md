---
title: "Error codes - EdgeWorkers Management Application"
slug: "error-codes"
excerpt: ""
hidden: false
createdAt: "Thu May 06 2021 21:33:03 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Tue Mar 11 2025 14:34:19 GMT+0000 (Coordinated Universal Time)"
---
Error codes are displayed in the EdgeWorkers Management application to keep users informed about limitations and issues.

These error codes are useful when troubleshooting with support. Send an email to [edgeworkers@akamai.com](mailto:edgeworkers@akamai.com) for more information about an error message or for help troubleshooting an issue. You can also contact your account team directly whenever you need to.
| Error Code | Error Message | More Information |
| --- | --- | --- |
| Permission errors |  |  |
| `EW0011` | You don't have permission to access an EdgeWorker ID. For information on how to grant permissions see the EdgeWorkers documentation. | See [Manage access to EdgeWorkers](manage-access-to-edgeworkers.md) for more information. |
| `EW0012` | You don't have permission to access a version. For information on how to grant permissions see the EdgeWorkers documentation. | See [Manage access to EdgeWorkers](manage-access-to-edgeworkers.md) for more information. |
| `EW0013` | You don't have permission to access an activation. For information on how to grant permissions see the EdgeWorkers documentation. | See [Manage access to EdgeWorkers](manage-access-to-edgeworkers.md) for more information. |
| `EW0014` | You don't have permission to create an EdgeWorker ID. For information on how to grant permissions see the EdgeWorkers documentation. | See [Manage access to EdgeWorkers](manage-access-to-edgeworkers.md) for more information. |
| `EW0015` | You don't have permission to create a version. For information on how to grant permissions see the EdgeWorkers documentation. | See [Manage access to EdgeWorkers](manage-access-to-edgeworkers.md) for more information. |
| `EW0016` | You don't have permission to activate a version. For information on how to grant permissions see the EdgeWorkers documentation. | See [Manage access to EdgeWorkers](manage-access-to-edgeworkers.md) for more information. |
| `EW0101` | Access to the production network is not available. Contact support for more information. | See [Manage access to EdgeWorkers](manage-access-to-edgeworkers.md) for more information. |
| Validation errors |  |  |
| `EW1001` | We're unable to process your request at this time. | Contact support to resolve this issue. |
| `EW1002` | We're unable to process your request at this time. | Contact support to resolve this issue. |
| `EW1011` | This version has already been activated for the selected EdgeWorker ID. | See [View the activation history of a version](manage-edgeworkers.md#view-the-version-history) for more information. |
| `EW1021` | This version is currently activating. | See [View the activation history of a version](manage-edgeworkers.md#view-the-version-history) for more information. |
| `EW1022` | This version is already active. | Only one version can be active at a time. See [View the activation history of a version](manage-edgeworkers.md#view-the-version-history) for more information. |
| `EW1101` | The compressed size of the EdgeWorkers code bundle is invalid. Review the code bundle for errors and upload it again. See the EdgeWorkers documentation for more information. | See the [Product limits](limitations.md) section for more information. |
| `EW1103` | The GZIP format of the EdgeWorkers code bundle is invalid. Review the code bundle for errors and upload it again. See the EdgeWorkers documentation for more information. | See [Create a code bundle](create-a-code-bundle.md) for more information. |
| `EW1104` | The uncompressed size of the EdgeWorkers code bundle is invalid. Review the code bundle for errors and upload it again. See the EdgeWorkers documentation for more information. | See the [Product Limits](limitations.md) section for more information. |
| `EW1105` | The TAR archive of the EdgeWorkers code bundle is invalid. Review the code bundle for errors and upload it again. See the EdgeWorkers documentation for more information. | See [Create a code bundle](create-a-code-bundle.md) for more information. |
| `EW1106` | The EdgeWorkers code bundle is missing mandatory files. Review the contents of the code bundle and upload it again. See the EdgeWorkers documentation for more information. | See [Create a code bundle](create-a-code-bundle.md) for more information. |
| `EW1107` | The EdgeWorkers code bundle contains an invalid manifest file. Review the code bundle for errors and upload it again. See the EdgeWorkers documentation for more information. | See [Create a code bundle](create-a-code-bundle.md) for more information. |
| `EW1108` | The script syntax of the EdgeWorkers code bundle is invalid. Review the code bundle for errors and upload it again. See the EdgeWorkers documentation for more information. | See [Create a code bundle](create-a-code-bundle.md) for more information. |
| `EW1201` | The EdgeWorkers code bundle failed to run. Review the code bundle for errors and upload it again. See the EdgeWorkers documentation for more information. | See [Create a code bundle](create-a-code-bundle.md) for more information. |
| Nonexistent resource errors |  |  |
| `EW2001` | This Group doesn't exist. | Contact support for more information. |
| `EW2002` | This EdgeWorker ID doesn't exist. | Contact support for more information. |
| `EW2003` | This version doesn't exist. | Contact support for more information. |
| `EW2004` | This activation doesn't exist. | Contact support for more information. |
| Limits |  |  |
| `EW3001` | This account has reached the limit of activations on this network. | See the [Product limits](limitations.md) section for more information. |
| `EW3002` | This account has reached the limit of EdgeWorkers IDs. | See the [Product limits](limitations.md) section for more information. |
| `EW3003` | The EdgeWorker ID has reached the limit of versions. | See the [Product limits](limitations.md) section for more information. |
| `EW3101` | This account has reached the limit of activations per minute on this network. | See the [Product limits](limitations.md) section for more information. |
| `EW3102` | This account has reached the limit of activations per day. | See the [Product limits](limitations.md) section for more information. |
| Server errors |  |  |
| `EW4001` | We're unable to process your request at this time. | Contact support for more information. |
| `EW4100`-`EW4104` | We're unable to process your request at this time. | Contact support for more information. |
| `EW4111`-`EW4114` | We're unable to process your request at this time. | Contact support for more information. |
| `EW4121`-`EW4124` | We're unable to process your request at this time. | Contact support for more information. |
| `EW4131`-`EW4133` | We're unable to process your request at this time. | Contact support for more information. |
| `EW4141` | We're unable to process your request at this time. | Contact support for more information. |
| `EW4201`-`EW4204` | We're unable to process your request at this time. | Contact support for more information. |
| `EW4301`-`EW4303` | We're unable to process your request at this time. | Contact support for more information. |
| `EW4501`-`EW4505` | We're unable to process your request at this time. | Contact support for more information. |
| `EW4511` | We're unable to process your request at this time. | Contact support for more information. |
| `EW4601` | We're unable to process your request at this time. | Contact support for more information. |
| `EW4611` | We're unable to process your request at this time. | Contact support for more information. |
| JavaScript Logging via DataStream 2 |  |  |
| `EW7101` | Missing DS2 ID: the DS2 ID provided is empty or null. | Contact support for more information. |
| `EW7102` | Unable to find stream for the DS2 ID provided: Token is invalid or expired. | Contact support for more information. |
| `EW7103` | Unable to find stream for the DS2 ID provided: DataStream service failed. | This issue can occur if the following roles and contract line items are missing.<br/><br/>**Contract Line Item **<br/>EdgeWorkers::Datastream<br/><br/>**User Role Permissions**<br/>Data Stream 2 EdgeWorker-Write Access Only<br/>Data Stream 2 EdgeWorker Read Access Only<br/><br/>If you make these changes to your account contract and the the error still persists, contact support for more information. |
| `EW7104` | Insufficient permission to access the stream for the DS2 ID provided. | Contact support for more information. |
