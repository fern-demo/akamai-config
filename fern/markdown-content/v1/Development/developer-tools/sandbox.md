---
title: "Sandbox"
slug: "sandbox"
excerpt: ""
hidden: false
createdAt: "Tue Nov 09 2021 23:58:40 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Thu Apr 18 2024 01:09:09 GMT+0000 (Coordinated Universal Time)"
---
You can use Sandbox to create an isolated development environment to test your EdgeWorkers on the Akamai sandbox network before deploying to the content delivery network.

# Install Akamai Sandbox

Before you install the Sandbox CLI package you need to install the [Akamai CLI](https://github.com/akamai/cli).

You'll also need the EdgeWorker ID and the active version number. You can find this information using the [EdgeWorkers Management application](manage-edgeworkers.md). 

For more information about how to test site and property changes in an isolated development environment before actual deployment review the [Sandbox User Guide](https://techdocs.akamai.com/sandbox/docs).

> 📘 If you need flexible options and more control, use the [Sandbox API](https://techdocs.akamai.com/edgeworkers/reference/api) to test your EdgeWorkers.

1. Run this command to install the Sandbox CLI:

```shell
akamai install sandbox
```

2. You can create a sandbox in one of  two ways.

3. Run this command to create a sandbox based on a hostname in your Property Manager configuration:

```shell
akamai sandbox create --hostname www.example.com --name sandbox_for_example.com
```

4. Run this command to create a sandbox based on a specific version of a property configuration (this example references version 42):

```shell
akamai sandbox create --property example_prod_pm:42 --name sandbox_for_example.com
```

> 📘 When creating the sandbox based on a property, the CLI automatically scans the Property Manager configuration, detects all the origin hostnames defined in the file, and asks you to confirm if you want sandbox requests to go directly to these origins. 
> 
> If you have access to the origins displayed, enter **y** for yes and the CLI will update your configuration file. If not, see the [Sandbox User Guide](https://techdocs.akamai.com/sandbox/docs) for more information about how to configure your sandbox client.

5. Run this command to connect to the sandbox:

```shell
akamai sandbox start
```

6. You'll see this message confirming that you are connected to the sandbox:

   ```
   `INFO c.a.devpops.connector.ConnectorMain - Successfully launched Akamai Sandbox Client` 
   ```

> 📘 Once you are connected to the sandbox you need to open a new terminal window to run commands.

# Deploy an EdgeWorkers code bundle to the sandbox

1. Run this command to add an EdgeWorker ID to the sandbox:

```shell
akamai sandbox add-edgeworker <edgeworker-id> <edgeworker-tarball>
```

> 👍 Run this `add-edgeworker` command for each EdgeWorker ID in the property.

> 📘 Sandbox will use the version active in staging if you make a request without adding an EdgeWorker ID.

2. Test the EdgeWorker IDs that you've added to the sandbox in one of these ways.

   - **Browser**: Open your `/etc/hosts` file and point the `hostname` associated with the property configuration to `127.0.0.1`, then enter `http://<your-hostname>:9550` in your browser.

   - **Curl**: Run this command: `curl --header 'Host: www.example.com' http://127.0.0.1:9550/`

3. Check for the `X-Akamai-Sandbox: true` response header, indicating that the request was routed through the sandbox.

> 📘 All Sandbox traffic is tagged with the `X-Akamai-Sandbox: true` response header.
> 
> See the [Enable enhanced debug headers](enable-enhanced-debug-headers.md) for more information about how to debug the EdgeWorkers script.

4. Run this command every time you update your EdgeWorkers code:

```shell
akamai sandbox update-edgeworker <edgeworker-id> <edgeworker-tarball>
```

5. Repeat steps 5 and 6 each time you update your EdgeWorkers script.
