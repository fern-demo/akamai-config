---
title: "Welcome to EdgeWorkers"
slug: "welcome-to-edgeworkers"
description: "Use Akamai's EdgeWorkers service to deploy JavaScript functions at the edge and create customized experiences for your website visitors."
---
Use the EdgeWorkers service to deploy JavaScript functions at the edge to create customized experiences for your website visitors.

> 📘 To see live examples in action and to view the underlying code, go to the [Akamai Edge Compute demo site](https://www.edgecompute.live/).

# Benefits

EdgeWorkers, the world's most distributed serverless edge platform, offers these benefits:

- **Just code**. Write JavaScript code and deploy it via API, CLI, or GUI. 
- **Scalable architecture**. Let automatic scaling manage your infrastructure through continued growth or massive traffic spikes.  
- **Increased productivity**. Use curated EdgeWorkers developer tools to help you create, test, and debug your EdgeWorkers functions.  
- **Closest Proximity**. Execute code in close proximity to end users on the world's largest edge platform for serverless compute.  
- **Run code on demand**. Execute request-driven code on Akamai edge servers. The cold start time for first execution is currently less than five milliseconds.  
- **Build data-driven applications**. Include [EdgeKV](https://techdocs.akamai.com/edgekv/docs), Akamai's distributed key-value store in your EdgeWorkers function to access data locally and enable fast, frequent reads.

This diagram shows how EdgeWorkers requests and responses are executed. You can invoke EdgeWorkers code based on specific events in a request or response cycle. For more information, refer to the [EdgeWorkers event model](doc:event-handler-functions).

<Frame>
  <img src="https://techdocs.akamai.com/edgeworkers/img/edgeWorkersEventModel-v1.png" alt="EdgeWorkers Event Model"/>
</Frame>

# Where to start

To get started, you need entitlement for EdgeWorkers on [contract](doc:add-edgeworkers-to-contract). To make sure EdgeWorkers is present, go to Akamai Control Center and from the services menu find **Account Admin **> **Contracts**. In the list of products, search for EdgeWorkers.

> 📘 Select a delivery product
> 
> You can find a list of the supported delivery products for EdgeWorkers in the [Product limits](doc:limitations) section. A delivery product is a prerequisite to use EdgeWorkers. It's the base layer used to manage your property (domain) on top of which you can stack different ​Akamai​ services.

Once you've confirmed that you have the necessary contract requirements and delivery product, review these tips and prerequisites that will help you design and create an EdgeWorkers function.

<table>
<tbody>

<tr>
<td>

**1.**

</td>
<td>

**Event model**. Learn how EdgeWorkers' [granular event model](doc:event-handler-functions) lets you control when to execute code. Each event has specific features and capabilities that allow it to transform and modify the request and response as it flows through the Intelligent Edge Platform. 

</td>
</tr>

<tr>
<td>

**2.** 

</td>
<td>

**Authentication credentials.** Before you can use the management [API](doc:edgeworkers-api)  or [CLI](https://github.com/akamai/cli-edgeworkers), you need to [Create authentication credentials](https://techdocs.akamai.com/developer/docs/set-up-authentication-credentials).

</td>
</tr>

<tr>
<td>

**3.** 

</td>
<td>

**JavaScript API Reference**. Refer to the [JavaScript API Reference](doc:about-the-javascript-api)  when writing the code you want to execute at the edge. Then use the guidelines in [Create a code bundle](doc:create-a-code-bundle) to learn how to package your EdgeWorkers files along with any other dependencies in a compressed TGZ file.

</td>
</tr>

<tr>
<td>

**4.**

</td>
<td>

**Developer tools**. Explore the tools available to increase your productivity, such as the [Code bundle editor](doc:code-bundle-editor), [TypeScript bindings](doc:typescript), [Akamai Sandbox](doc:sandbox), and [Debugging](doc:about-javacript-troubleshooting).

</td>
</tr>

<tr>
<td>

**5.**

</td>
<td>

**Product limits**. Before you start designing your EdgeWorkers refer to the [Product limits](doc:limitations). You might also find it helpful to review the [Hello world](doc:api-hello-world) example. 

</td>
</tr>

<tr>
<td>

**6.**

</td>
<td>

**Join Serverless Slack**. Join us on the [EdgeWorkers Serverless Slack channel](https://forms.gle/xhFxiNbA92p8YMkQ6) to get help and provide feedback.

</td>
</tr>

</tbody>
</table>

# What to watch

You can also watch this three-minute introductory video to learn about edge computing and how you can build on top of Akamai to create edge applications.

<iframe width="560" height="315" src="https://www.youtube.com/embed/eEIacL_P-Oc?si=uu1xA0VNhcJUlDBa" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
