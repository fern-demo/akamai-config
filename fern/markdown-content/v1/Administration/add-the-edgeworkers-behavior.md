---
title: "Add the EdgeWorkers behavior"
slug: "add-the-edgeworkers-behavior"
excerpt: ""
hidden: false
metadata: 
  image: []
  robots: "index"
createdAt: "Wed May 05 2021 19:04:01 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Tue Nov 07 2023 19:10:45 GMT+0000 (Coordinated Universal Time)"
---
Use Property Manager to enable the behavior in your <<COMPANY_NICKNAME>> property configuration.

Before you begin, [Create an EdgeWorker ID](doc:create-an-edgeworker-id) so you can select it in EdgeWorkers behavior in Property Manager.

1. Navigate to your property in <<PORTAL_NAME>>.

2. Click **Edit**.

3. Click **Add rule**.

   [block:image]{"images":[{"image":["https://techdocs.akamai.com/edgeworkers/img/addRule-v1.png",null,"Add new Rule"],"align":"center","border":true}]}[/block]

4. Enter a `name`.

5. Choose a `match criteria` and `scope`.

   For more information about the available match criteria refer to the [Property Manager documentation](https://techdocs.akamai.com/property-mgr/docs/matches).

   [block:image]{"images":[{"image":["https://techdocs.akamai.com/edgeworkers/img/ewCriteria-v1.png",null,"Scope EdgeWorkers"],"align":"center","border":true}]}[/block]

> 📘 Scope defines which requests should have EdgeWorkers functions applied. By limiting the scope you can avoid unnecessary serverless hits, which can improve performance and reduce cost.

6. Search for `EdgeWorkers` in **available behaviors**.

   [block:image]{"images":[{"image":["https://techdocs.akamai.com/edgeworkers/img/addBehavior-v1.png",null,"Search for EdgeWorkers behavior"],"align":"center","border":true}]}[/block]

7. Change the setting to **On**.

8. Click **Insert Behavior**.

9. Select an EdgeWorker identifier from the list.

   If you haven't created an EdgeWorker identifier, click the link in the information dialog. The EdgeWorkers Management application will open in a new window.

   Once you have created your EdgeWorker identifier, close the window and reload the Property Manager Editor page. Now you can select the new EdgeWorker identifier from the list.

10. Save your property.

11. Click the **Activate** tab.

12. Click the **Activate on Staging** or **Activate on Production** button.

    Once you've added the EdgeWorkers behavior in Property Manager follow the steps in the [Hello World tutorial](doc:hello-world-edgeworkers-management-application). This section also includes details about how to Activate an EdgeWorker version on the staging or production network.
