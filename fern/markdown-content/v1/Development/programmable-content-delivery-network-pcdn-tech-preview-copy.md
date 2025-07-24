---
title: "tutorial - Programmable Content Delivery Network (PCDN) tutorial"
slug: "programmable-content-delivery-network-pcdn-tech-preview-copy"
excerpt: ""
hidden: true
createdAt: "Tue Mar 12 2024 18:12:06 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Tue May 07 2024 15:35:59 GMT+0000 (Coordinated Universal Time)"
---
In this tutorial you'll learn how to install the PCDN tool and perform some basic configuration tasks. We'll also review a more complex use case and review the rules we created in Akamai Control Center.

## Before you start

If you're following along make sure you complete these tasks before you set up your development environment.

- Create an Akamai property and an EdgeWorker. This isn't required but in this use case we're using an existing EdgeWorker and property.
- Get a valid [.edgerc](https://techdocs.akamai.com/developer/docs/set-up-authentication-credentials#add-credential-to-edgerc-file) credential file that includes the client token and client secret required to authenticate Akamai API or CLI requests.

## Set up your development environment

This example shows just one way to set up a development environment. The important part here is to make sure you add the necessary dependencies, TypeScript, Node.js, and the Akamai CLI.

To get started we'll use a blank VS Code environment and add the following built-in tools to construct a Ubuntu container:

- TypeScript
- Node.js
- The Akamai CLI

This one time install constructs the development container files. It then re-builds and re-launches the environment in the container.
<Frame>
  <img src="https://techdocs.akamai.com/edgeworkers/img/devEviroSetup-v1.jpg" alt="Image"/>
</Frame>


## Set up the tool

> 🚧 Comment from Sharad
> 
> This section will need to be augmented significantly. We'll need to:\_
> 
> _Adjust this workflow to assume that they are not using an account switch key (someone please correct me if I'm wrong there)_
> 
> _Adjust this to be the workflow that creates a Property + EdgeWorker from scratch rather than using existing ones, and then create a branch that shows how to use the workflow using an existing Property and/or EdgeWorker_
> 
> _Make a distinction for customers that this workflow will be to onboard a hostname that can receive HTTP traffic, not HTTPS traffic_
> 
> _Add a branch of this workflow showing how the workflow would work if the customer did want to support HTTPS traffic, which would require going outside of the CLI workflow_

Follow the steps in the guided initialization to start using the tech preview. You will need to know the [account switch key](https://techdocs.akamai.com/iam/docs/retrieve-account-switch-keys)  for the account that you want to use.

1. Go to terminal inside your dev container.
2. Navigate to the `pcdndemo` files. 
3. To set up the PCDN tool, create a `node.js` project.
4. To do this create a `package.json` file or in this example we'll copy and paste the `package.json` file from the install package.
5. Next, run the `npm-install` command.

   This command installs all the dependencies for the PCDN tool. It also creates the `npx pcdn` command that lets you work with the `onConfig` event handler and initiate a new setup.

> 👍 To display usage information for the commands use `npx pcdn -help`.

4. Use the `npx pcdn -a <account> init` switch to move into your account.
5. Accept the terms and conditions.

> 🚧 The PCDN tool is currently in Tech Preview and can only be used on the Akamai staging network.
> 
> When using the PCDN tool we encourage you to provide feedback to help prioritize feature development and drive improvements.

4. Select the contract, group, property, and EdgeWorker ID you want to use.

   For each selection the PCDN tool provides a list of available options based on your previous choice. You can use an existing property and EdgeWorker or create a new one. In this example we'll use an existing property and EdgeWorker.

Once you're finished, the following source files are generated for your project in the `src` directory.
| File | Description |
| --- | --- |
| bundle.json | The manifest file that includes necessary meta information. |
| config.js | Defines the module set up. |
| main.js | The JavaScript source code associated with the project that contains event handler functions. |
| property.json | Contains all the information you specified during installation:<br/>property ID<br/>contractID<br/>groupID<br/>edgeworkerID<br/>accountSwitchKey |
<Frame>
  <img src="https://techdocs.akamai.com/edgeworkers/img/srcFolder-v1.jpg" alt="Image"/>
</Frame>


## Create a property manager rule and add behaviors

You can use the onConfig handler to declare the rules and behaviors that will be applied to an incoming request using a `config() `block within the config.js file.

1. Open the `config.js` file.
2. In this example we'll use the `onConfig` handler to set up the following options for the [origin behavior](https://techdocs.akamai.com/property-mgr/reference/ga-origin) . 

- origin type
- hostname
- forwardHostHeader
- cacheKeyHostname

> 📘 Code completion and built-in documentation
> 
> - The `config` Object includes type ahead and IntelliSense for the different behaviors that you can add to a property.
> - The documentation is available inline and the techdocs links are active.
> - All of the different arguments are defined for each function as described in the [Property Manager API](https://techdocs.akamai.com/property-mgr/reference/api). For example, when you type in `originType` a list of origins you can add appears.
> - Sensible defaults provide you with the most common and logical choices.

3. Once the origin behavior is set up you can also configure the [setCaching](https://techdocs.akamai.com/property-mgr/reference/ga-caching) and [setCpCode](https://techdocs.akamai.com/property-mgr/reference/ga-cp-code) behaviors.

```javascript
function onConfig(config) {

    config.setOrigin({
        originType: "CUSTOMER",
        hostname: "vm-0.nl-ams.linode.unified-origin.com",
        forwardHostHeader: "ORIGIN_HOSTNAME",
        cacheKeyHostname: "ORIGIN_HOSTNAME"
    })
        .setCaching({
            ttl: "0d"
        })
        .setCpCode({
            value: {
                id: 740814
            }
        });
```

Here's the complete code sample that shows how we updated the `config.js` file to include an origin type, caching, and enables an EdgeWorker.

```javascript
//@ts-check
/// <reference path="../node_modules/pcdn_tech_preview/types/src/types.d.ts" />

const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

/**
 * 
 * @returns {any} The response from obtaining the JSON configuration for the property.
 */
function getConfig() {
    // @ts-ignore
    const request = new XMLHttpRequest();
    request.open("GET", "https://ew-ops-playground.edgekey.net/config2.json", false); // `false` makes the request synchronous
    request.send(null);

    if (request.status === 200) {
        return JSON.parse(request.responseText);
    }

    throw new Error(`Could not access the configuration object due to statusCode: ${request.status}`);
}

/**
 * @param {import('../node_modules/pcdn_tech_preview/types/src/types').Property} config 
 */
function onConfig(config) {

    config.setOrigin({
        originType: "CUSTOMER",
        hostname: "vm-0.nl-ams.linode.unified-origin.com",
        forwardHostHeader: "ORIGIN_HOSTNAME",
        cacheKeyHostname: "ORIGIN_HOSTNAME"
    })
        .setCaching({
            ttl: "0d"
        })
        .setCpCode({
            value: {
                id: 740814
            }
        });

    // Add EdgeWorker to your property
    config
        .setEdgeWorker({
            enabled: true,
            edgeWorkerId: "83785"
        });

module.exports = {
    onConfig
}
```

### Activate the EdgeWorker on staging

Property manager and EdgeWorkers activations on staging are integrated into the PCDN workflow. You can use several APIs without making separate calls.

1. Go to terminal and run the `npx pcdn .` command  in the project directory to:

- Execute the  `src/config.js` file, and produce PAPI JSON.
- Upload and activate PAPI JSON for the property named in the `property.json` file in Akamai Control Center.
- Create an EdgeWorkers code bundle from the `src/` directory.
- Upload and activate the EdgeWorkers code bundle in Akamai Control Center.

2. Switch over to Akamai Control Center to see that the activation for the new version is pending and activating on staging.
<Frame>
  <img src="https://techdocs.akamai.com/edgeworkers/img/pcdnPM-v1.jpg" alt="Image"/>
</Frame>


3. The PCDN commands we used in the previous steps set up a property with a Linode origin, the hostname settings, the values that were not set are sensibly defaulted. 
<Frame>
  <img src="https://techdocs.akamai.com/edgeworkers/img/pcdnrule2-v1.jpg" alt="Image"/>
</Frame>


4. Here we see that caching is set to 0 days, the CP code and the EdgeWorker ID.
<Frame>
  <img src="https://techdocs.akamai.com/edgeworkers/img/pcdnRule-v2.jpg" alt="Image"/>
</Frame>


### View the EdgeWorker

1. If you go to the EdgeWorker you can see the new version that includes a `config.js` file.
<Frame>
  <img src="https://techdocs.akamai.com/edgeworkers/img/pcdnVersion-v1.jpg" alt="Image"/>
</Frame>
<Frame>
  <img src="https://techdocs.akamai.com/edgeworkers/img/pcdnCodeBundle-v1.jpg" alt="Image"/>
</Frame>


## Download a configuration file

> 🚧 Comment from Sharad
> 
> I don't think the customer would be downloading a configuration file necessarily. We want to be more generic, they would have a separate configuration file that lives somewhere that would need to be added to their project folder for use with their Builder functions

In this more complex example we'll download a configuration file from the internet and parse it into a JSON object and then use it to create a property.

1. Open the `config.js` file and import a library and function that downloads the configuration file from the <https://ew-ops-playground.edgekey.net/config.json> url and parses it into a JSON object.

2. Open the `control.json` file to see the file format. The JSON object includes a rules array that contains overrides for the cpCode, paths, path matching, cachingTime, origins, cacheKeys, and the edgeworkerId.

> ❗️ Chris, can you please share the code you used for the control.json file?

```json
Ask Chris for the code for rules array
```

3. Open the `config.js` file and start modifying it as follows.
4. Download the config and check that it's properly formatted.
5. Next, operate on each of the rules inside the object.
6. For each rule we'll use this path match perform several tasks.

```javascript
 if ('rules' in rulesConfiguration) {
        rulesConfiguration.rules.forEach(rule => {
            let pathMatch = config.onPath({
                matchOperator: 'MATCHES_ONE_OF',
                values: rule.paths
```

7. First we'll override the cpCode and the origin.

```javascript
}).setCpCode(
                {
                    value: {
                        id: rule.cpCode
                    }
                }
            ).setOrigin({
                originType: 'CUSTOMER',
                hostname: rule.origin
            });
```

Sensible defaults help ensure that you only set the hostname of the origin and not the entire set up.

8. This examples sets the cache.

```javascript
// caching override
            if ('cachingTime' in rule) {
                pathMatch.setCaching({
                    ttl: rule.cachingTime
                });
            }
```

9. This example overrides the edgeworkerID.

```javascript
// edgeworker override
            if ('edgeworkerId' in rule) {
                pathMatch.setEdgeWorker({
                    enabled: true,
                    edgeWorkerId: `${rule.edgeworkerId}`
                });
            }
```

10. This example sets the cacheKey.

```javascript
if ('cacheKey' in rule) {
                if ('cookies' in rule.cacheKey) {
                    pathMatch.setCacheId({
                        rule: 'INCLUDE_COOKIES',
                        includeValue: true,
                        optional: true,
                        elements: rule.cacheKey.cookies
                    });
                }
```

Here's the complete code sample.

```javascript
//@ts-check
/// <reference path="../node_modules/pcdn_tech_preview/types/src/types.d.ts" />

const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

/**
 * 
 * @returns {any} The response from obtaining the JSON configuration for the property.
 */
function getConfig() {
    // @ts-ignore
    const request = new XMLHttpRequest();
    request.open("GET", "https://ew-ops-playground.edgekey.net/config.json", false); // `false` makes the request synchronous
    request.send(null);

    if (request.status === 200) {
        return JSON.parse(request.responseText);
    }

    throw new Error(`Could not access the configuration object due to statusCode: ${request.status}`);
}

/**
 * @param {import('../node_modules/pcdn_tech_preview/types/src/types').Property} config 
 */
function onConfig(config) {

    config.setOrigin({
        originType: "CUSTOMER",
        hostname: "vm-0.nl-ams.linode.unified-origin.com",
        forwardHostHeader: "ORIGIN_HOSTNAME",
        cacheKeyHostname: "ORIGIN_HOSTNAME"
    })
        .setCaching({
            ttl: "0d"
        })
        .setCpCode({
            value: {
                id: 740814
            }
        });

    // Add EdgeWorker to your property
    config
        .setEdgeWorker({
            enabled: true,
            edgeWorkerId: "83785"
        });

    const rulesConfiguration = getConfig();

    if ('rules' in rulesConfiguration) {
        rulesConfiguration.rules.forEach(rule => {
            let pathMatch = config.onPath({
                matchOperator: 'MATCHES_ONE_OF',
                values: rule.paths
            }).setCpCode(
                {
                    value: {
                        id: rule.cpCode
                    }
                }
            ).setOrigin({
                originType: 'CUSTOMER',
                hostname: rule.origin
            });

            // caching override
            if ('cachingTime' in rule) {
                pathMatch.setCaching({
                    ttl: rule.cachingTime
                });
            }
            // edgeworker override
            if ('edgeworkerId' in rule) {
                pathMatch.setEdgeWorker({
                    enabled: true,
                    edgeWorkerId: `${rule.edgeworkerId}`
                });
            }

            if ('cacheKey' in rule) {
                if ('cookies' in rule.cacheKey) {
                    pathMatch.setCacheId({
                        rule: 'INCLUDE_COOKIES',
                        includeValue: true,
                        optional: true,
                        elements: rule.cacheKey.cookies
                    });
                }

                if ('queryParams' in rule.cacheKey) {
                    pathMatch.setCacheId({
                        rule: 'INCLUDE_QUERY_PARAMS',
                        includeValue: true,
                        optional: true,
                        elements: rule.cacheKey.queryParams
                    });
                }
            }

        });
    }
}

module.exports = {
    onConfig
}
```

11. Go to the `main.js` EdgeWorkers file to add a few simple functions to the EdgeWorker.

    Here we'll add a header to the `onClientRequest` and the `onClientResponse` event handlers.

```javascript
export function onClientRequest (request) {
    request.addHeader('x-pcdn-test-header', 'onClientRequest');
}
export function onClientResponse (request, response) {
    response.addHeader('x-pcdn-test-header2', 'onClientResponse');
}
export async function onOriginRequest(request) {}
export async function onOriginResponse(request, response) {}
export async function responseProvider(request) {}
```

12. Go to the `bundle.json` file and increment the version number.

```json
{
    "edgeworker-version": "1.1",
    "description" : "Hello World Example"
}
```

13. In terminal run `npx pcdm .` to activate the Property and EdgeWorker.

    This command produces the PAPI JSON after interacting with the PAPI API. It also activates the property and EdgeWorker on staging.

14. You can view the new property version in Akamai Control Center.

    The base rule is still there. There are also configurations for each of the paths. You can also see a new CP Code, the origin override, the new caching value. 

    You'll also notice the cacheKeyID modifications to include the test cookies or query params.
<Frame>
  <img src="https://techdocs.akamai.com/edgeworkers/img/importRules-v1.jpg" alt="Image"/>
</Frame>


```
If you go to the EdgeWorker you can see the code bundle now includes the new headers for `onClientRequest` and `onClientResponse`.
```
<Frame>
  <img src="https://techdocs.akamai.com/edgeworkers/img/headersCodeBundle-v1.jpg" alt="Image"/>
</Frame>


## Troubleshooting an error

In this example you'll learn how to use the PCDN tool to generate rules and troubleshoot issues.

1. Open the second config file. It's the same as the previous version but includes additional rules.

> ❗️ Will we provide the customer with this file?

2. Increment the version number in the `bundle.json` file.
3. Modify the CP code incorrectly and then run the `npx pcdm .` command to activate the EdgeWorker.

   The PCDN tool generates an error that provides a description of the error and the line of code where the error occurred.
<Frame>
  <img src="https://techdocs.akamai.com/edgeworkers/img/errorMessage-v1.jpg" alt="Image"/>
</Frame>


4. Fix the CP code and run the `npx pcdm .` command to activate the EdgeWorker again.
5. Switch back to Akamai Control Center and see that the new version is activating on staging.

   This version includes the new rules.
<Frame>
  <img src="https://techdocs.akamai.com/edgeworkers/img/moreRules-v1.jpg" alt="Image"/>
</Frame>
