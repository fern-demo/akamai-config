---
title: "Deploy Hello World"
slug: "deploy-hello-world-2"
excerpt: ""
hidden: false
metadata: 
  image: []
  robots: "index"
createdAt: "Mon Jul 05 2021 12:42:58 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Mon Nov 22 2021 20:32:09 GMT+0000 (Coordinated Universal Time)"
---
Now that you've created the code bundle in the previous step, you can use HTTPie and httpie-edgegrid to access the <<COMPANY_NICKNAME>> APIs. 

# Add an EdgeWorker version

1. Add a new version to the **Hello World** EdgeWorker ID.

```shell
cat <edgeworker code bundle> | http --timeout=30 --auth-type edgegrid -a <API credentials section>: POST :/edgeworkers/v1/ids/<edgeWorkerId>/versions Content-Type:application/gzip
```

- Replace `<edgeWorkerId>` with the ID of your Hello World EdgeWorker.

- Replace `<edgeworker code bundle>` with the filename and path to the Hello World code bundle.

2. Issue this API request to verify that the EdgeWorker version was created:

```shell
http --timeout=30 --auth-type edgegrid -a <API credentials section>: POST :/edgeworkers/v1/ids/<edgeWorkerId>/activations network=<network> version=<version>
```

- Replace `<edgeWorkerId>` with the ID of your Hello World EdgeWorker.

- Replace `<network>` with `STAGING`.

- Replace `<version>` with the version number of your Hello World EdgeWorker ID.

# Activate the EdgeWorker version

1. Activate the EdgeWorker version on the <<COMPANY_NICKNAME>> network. Note the `activationId`. You'll need it to monitor the activation status.

```shell
http --timeout=30 --auth-type edgegrid -a <API credentials section>: POST :/edgeworkers/v1/ids/<edgeWorkerId>/activations network=<network> version=<version>
```

- Replace `<edgeWorkerId>` with the ID of your Hello World EdgeWorker.

- Replace `<network>` with `STAGING`.

- Replace `<version>` with the version number of your Hello World EdgeWorker ID.

2. To monitor the activation of the EdgeWorker version, try issuing this API request.

```shell
http --timeout=30 --auth-type edgegrid -a <API credentials section>: GET :/edgeworkers/v1/ids/<edgeWorkerId>/activations/<activationId>
```

- Replace `<edgeWorkerId>` with the ID of your Hello World EdgeWorker.

- Replace `<activationId>` with the activation response.

    The `activationId` was provided in the previous step when the EdgeWorker ID was activated.

3. Next, follow these instructions to [test the Hello World code bundle](doc:test-hello-world-2).
