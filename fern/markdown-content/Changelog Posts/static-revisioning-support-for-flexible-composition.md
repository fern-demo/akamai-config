---
title: "Static revisioning support for flexible composition"
slug: "static-revisioning-support-for-flexible-composition"
type: ""
createdAt: "Fri May 31 2024 18:37:08 GMT+0000 (Coordinated Universal Time)"
hidden: true
---
You can now import a specific Revision ID, instead of the active version, of a child into a parent EdgeWorker. If the owner of the child EdgeWorker continues to activate new versions of the child your dependency tree will not import these changes. This lets you freeze the dependency tree for a particular child if that tree is triggering unneeded revisions. To learn more see, [Import a static revision](doc:review-a-static-activation).