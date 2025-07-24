---
title: "Flexible composition"
slug: "flexible-composition"
excerpt: ""
hidden: false
createdAt: "Tue Aug 08 2023 19:31:33 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Mon Jan 27 2025 21:17:37 GMT+0000 (Coordinated Universal Time)"
---
Flexible composition lets development teams within an organization work separately to create and deploy multiple EdgeWorkers for the same website.

With flexible composition two or more EdgeWorkers can handle a single request. The logic for handling the request can be developed, tested, debugged, activated, and monitored by several teams. This is ideal for larger organizations that want to:

- **Reuse code across multiple EdgeWorkers** - Create a library EdgeWorker that other teams can use to perform common functionality, such as verifying an authorization header.
- **Delegate to other EdgeWorkers** - Configure the parent EdgeWorker to choose another child to run based on the path of the request.
- **Wrap API Endpoints** - Encapsulate implementation decisions inside an EdgeWorkers function and use it to modify the implementation of the API endpoint.

This [package management](terminology.md#package-management) solution runs on the Akamai staging and production networks. It enables one EdgeWorker to depend on another EdgeWorker via a dependency list. Dependencies are automatically pulled in to create a [combined code bundle](terminology.md#combined-code-bundle). When a [child](terminology.md#child-edgeworker) is updated the [parent](terminology.md#parent-edgeworker) is automatically updated too.

> 👍 Before you start, review the [limits](limitations.md#flexible-composition-limits) that apply to EdgeWorkers functions created using flexible composition.

The diagram below shows a parent EdgeWorker with dynamic reactivation enabled receiving a request. It then calls into the child EdgeWorkers, Marketing and Security. Two different teams created and activated the child EdgeWorkers using their preferred tools. The parent EdgeWorker imports the active version of each child EdgeWorker. If a new version of a child EdgeWorker is activated, the parent EdgeWorker will be [dynamically reactivated](terminology.md#dynamic-reactivation). This lets teams work independently to add new capabilities to a website.

> 📘 You can also import a child EdgeWorker by specifying the Revision ID. When you import a specific revision you lock the dependency tree of that child EdgeWorker. This can help when working across teams because it prevents dynamic activation. It also lets you import any active or inactive EdgeWorker revision. For more information see, [Import a static revision](review-a-static-activation.md).
<Frame>
  <img src="https://techdocs.akamai.com/edgeworkers/img/flexibleCompositionTutorialv-4.jpg" alt="Image"/>
</Frame>


To learn more go to, [Create a parent EdgeWorker](create-a-parent-edgeworker.md) and [Add a child EdgeWorker to an existing parent](add-child-edgeworkers.md).

> 👍 You can use the EdgeWorkers Management application or the [EdgeWorkers APIs](ref:get-revisions) to perform tasks related to flexible composition.

# Benefits of flexible composition

Flexible composition accommodates organizations that have several development teams. Review these benefits to learn more about how you can use this capability to improve your EdgeWorkers development process.

- **Independent contribution** - Each team can work at its own pace. You can activate a new version of your EdgeWorkers function anytime you need to add content to the website. You don't need to coordinate with other teams.

- **Dynamic activation** - When dynamic activation is enabled, the parent EdgeWorker automatically receives updates when you import the active child EdgeWorker. The owner doesn't need to rebuild, upload, or run a CI pipeline to activate it.

- **Static revisioning** - You can [import a specific Revision ID](review-a-static-activation.md) , instead of the active version, of a child into a parent EdgeWorker. If the owner of the child EdgeWorker continues to activate new versions of the child your dependency tree will not import these changes. This lets you freeze the dependency tree for a particular child if that tree is triggering unneeded revisions.

- **Import EdgeWorkers as separate files** - Each child EdgeWorker is represented as a JavaScript module.

- **Friction-free code reuse** - Child EdgeWorkers can export any type of JavaScript object, including classes and functions.

- **Choose your developer tools** -  Each team in your organization can use the developer tools they prefer. If you want to build your EdgeWorkers in TypeScript, you can do so without having to integrate into a larger build chain.

# Permissions

By default, the security access model grants any parent EdgeWorkers access to child EdgeWorkers created under the same account. This is provided that the team that created the combined code bundle has `Publisher - writeActivationEdgeWorker` permission on the parent EdgeWorker and `Viewer - readVersionEdgeWorker` permission on transitive dependencies.

> 📘 For more information refer the to [Manage access to EdgeWorkers](manage-access-to-edgeworkers.md) section in this guide.

<br/>

> 📘 Refer to the [Terminology](terminology.md) section in this guide to learn more about the concepts and terms used for flexible composition.
