---
title: "Deploy Hello World"
slug: "deploy-hello-world-3"
excerpt: ""
hidden: false
metadata: 
  image: []
  robots: "index"
createdAt: "Mon Jul 05 2021 12:50:07 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Tue Aug 31 2021 13:43:10 GMT+0000 (Coordinated Universal Time)"
---
You can also refer to the [EdgeWorkers CLI developer documentation](https://github.com/akamai/cli-edgeworkers) for instructions on how to use the CLI to register, upload, activate and test your EdgeWorker functions.

# Create an EdgeWorker version

1. Add a new version to your Hello World EdgeWorker ID.

```shell
akamai edgeworkers upload <bundlePath> <edgeworker-identifier>
```

- Replace `<bundlePath>`  with the filename and path to the Hello World code bundle.

- Replace `<edgeworker-identifier>` with the ID of your Hello World EdgeWorker.

2. Issue this CLI command to verify that the EdgeWorker version was created:

```shell
akamai edgeworkers list-versions <edgeworker-identifier>
```

- Replace `<edgeworker-identifier>` with the ID of your Hello World EdgeWorker.

The version you just created should appear in the list of versions. 

## Activate the EdgeWorker version

1. Use this command to activate the EdgeWorker version on the Akamai network. Note the activationId.

```shell
akamai edgeworkers activate <edgeworker-identifier> <network> <version-identifier>
```

- Replace `<edgeWorker-identifier>` with the ID of your Hello World EdgeWorker.

- Replace `<network>` with STAGING.

- Replace `<version-identifier>` with the version number of your Hello World EdgeWorker.

2. To monitor the activation of the EdgeWorker version, try issuing this CLI command.

```shell
akamai edgeworkers status <edgeworker-identifier>
```

- Replace `<edgeWorker-identifier>` with the ID of your Hello World EdgeWorker.

3. Next, follow these instructions to [test the Hello World code bundle](doc:test-hello-world-3).
