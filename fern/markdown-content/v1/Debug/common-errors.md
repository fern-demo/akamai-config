---
title: "Common errors"
slug: "common-errors"
excerpt: ""
hidden: false
metadata: 
  image: []
  robots: "index"
createdAt: "Thu May 06 2021 21:35:11 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Thu Feb 10 2022 14:29:34 GMT+0000 (Coordinated Universal Time)"
---
Review this section for information about common errors and how they can be resolved.

# Import error

An import error occurs if you attempt to import an EdgeWorkers module that doesn't include the `.js` extension in the module name.

```javascript
X-Akamai-EdgeWorker-onClientRequest-Info: ew=3716 v0.0.9:edgeWorkerScott; error=GenericError; error_text=main.js::6:26+Unknown+built-in+module:+"yourmodules"
```

To resolve this error update the import statement to include the extension in the module name `yourmodules.js`. Once you update the module name, re-activate the EdgeWorker version.

# 500 Internal Server error

A 500 Internal Server Error can occur as the result of an EdgeWorker request.

```shell
HTTP/1.1 500 Internal Server Error
Server: AkamaiGHost
Mime-Version: 1.0
Content-Type: text/html
Content-Length: 176
Expires: Wed, 09 Oct 2019 16:36:56 GMT
Date: Wed, 09 Oct 2019 16:36:56 GMT
Connection: close
```

To learn more, re-issue the request with the `Pragma: akamai-x-ew-debug` debug header. The results of the re-issued request include a header with information about the error for each callback.

For more information refer to the [Enhanced debug header details](enhanced-debug-header-details.md) section.

# Upload error

Upload errors typically occur if you attempt to install the EdgeGrid plugin for HTTPie using an older version of Python.

```shell
Upload Errors http: error: UnicodeDecodeError: 'ascii' codec can't decode byte 0x8b in position 1: ordinal not in range(128)
```

Use this command to resolve the Python version upload error:

```shell
sudo python3 setup.py install
```

See the troubleshooting section in the [httpie-edgegrid](https://github.com/akamai/httpie-edgegrid#troubleshooting) documentation for more information.

# Token or permission error

A token or permission error occurs when the role assigned to the access-token does not have permission to use the EdgeWorker API.

You can add the required permissions to the role to resolve this issue. For more information see the [Identity and Access Management help](https://techdocs.akamai.com/iam/docs).

```shell
$ http --timeout=90 --auth-type edgegrid -a <access-token>: GET :/edgeworkers/v1/groups
HTTP/1.1 403 Forbidden
Connection: keep-alive
Content-Length: 200
Content-Type: application/problem+json
Date: Mon, 16 Sep 2019 18:20:13 GMT
X-IDS-SESSION-ID: 67ed7ce3-c8bd-47fa-91b3-174f684eacd1
X-Trace-Id: e8fc5d7fd2570232

{
    "detail": "Permission Invalid",
    "instance": "/edgeworkers/error-instances/ce2c4d4a-320c-4065-b660-b1eef2a268ec",
    "status": 403,
    "title": "Forbidden.",
    "type": "/edgeworkers/error-types/edgeworkers-forbidden"
}
```

# EdgeWorkers CLI root user error

You will receive an error message when attempting to use the EdgeWorkers CLI if the package was installed as root. To resolve this issue you can use npm commands to facilitate the install process.

For automation environments such as Dockerfile, run this command to avoid the root user error:

```dockerfile
akamai install edgeworkers
cd ~/.akamai-cli/src/cli-edgeworkers/
 npm run build
```

If you aren't using an automation environment, use these manual steps to avoid the root user error:

Navigate to the source drop directory:

```shell
cd ~/.akamai-cli/src/cli-edgeworkers/
```

Build with root user permissions allowed:

```shell
npm install --unsafe-perm
```
