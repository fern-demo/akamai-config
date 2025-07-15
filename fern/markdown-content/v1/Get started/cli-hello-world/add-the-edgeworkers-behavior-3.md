---
title: "Add the EdgeWorkers behavior"
slug: "add-the-edgeworkers-behavior-3"
excerpt: ""
hidden: false
metadata: 
  image: []
  robots: "index"
createdAt: "Mon Jul 05 2021 12:49:08 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Tue Nov 07 2023 19:09:02 GMT+0000 (Coordinated Universal Time)"
---
This section describes how to enable the EdgeWorkers behavior in Property Manager. When you add the EdgeWorkers behavior you can also define which requests apply EdgeWorkers functions. By limiting the scope you can avoid unnecessary serverless hits to improve performance and reduce cost.

Before you begin, make sure you've reviewed the prerequisites. To complete these steps you need access to <<PORTAL_NAME>>.

> 👍 To specify and configure an action to take in the event that an EdgeWorkers function fails, add the [Site Failover](doc:site-failover) behavior to your property.

1. Navigate to your property in <<PORTAL_NICKNAME>>.

2. Click **Edit**.

3. Click **Add rule**.

   [block:image]{"images":[{"image":["https://techdocs.akamai.com/edgeworkers/img/addRule-v1.png",null,"Add EdgeWorkers behavior"],"align":"center","border":true}]}[/block]

4. Enter **Hello World EdgeWorkers use case** as the name of your rule.

5. Choose a `match criteria` and `scope`.

   You can use Property Manager to scope where and when to execute the EdgeWorkers function. This criteria allows you to define which requests apply EdgeWorkers functions. By limiting the scope you can avoid unnecessary serverless hits.

   [block:image]{"images":[{"image":["https://techdocs.akamai.com/edgeworkers/img/ewCriteria-v1.png",null,"Add EdgeWorkers behavior"],"align":"center","border":true}]}[/block]

6. Search for `EdgeWorkers` in **available behaviors**.

   [block:image]{"images":[{"image":["https://techdocs.akamai.com/edgeworkers/img/addBehavior-v1.png",null,"Search for EdgeWorkers behavior"],"align":"center","border":true}]}[/block]

7. Change the setting to **On**.

   To disable the EdgeWorkers behavior you can change the setting to OFF. 

8. Click **Insert Behavior**.

9. Select the EdgeWorker ID named **Hello World** from the list.

10. Save your property.

11. Click the **Activate** tab.

12. Click the **Activate on Staging** button.

13. Next, follow these instructions to [create the Hello World code bundle](doc:create-the-hello-world-code-bundle-3).
