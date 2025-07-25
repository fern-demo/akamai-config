---
title: "Integrate DataStream 2 logs"
slug: "integrate-datastream-2-logs"
excerpt: ""
hidden: true
createdAt: "Fri Jun 28 2024 16:31:47 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Tue Jul 09 2024 11:34:59 GMT+0000 (Coordinated Universal Time)"
---
You can configure Akamai's [DataStream 2](https://techdocs.akamai.com/datastream2/docs) reporting service to provide real-time logs that contain details about EdgeWorkers usage and execution. Once you [enable the DataStream 2 behavior](https://techdocs.akamai.com/datastream2/docs/enable-datastream-behavior), you can configure a set of streams that you want to report.

DataStream 2 metrics provide nearly real-time visibility into the performance of your EdgeWorkers functions. This information can help you design and refine the JavaScript code you execute at the edge.

You can also create a Data Stream 2 stream to deliver JavaScript Logging for an EdgeWorkers function. To learn more, refer to the [Use DataStream 2 to deliver JavaScript logs](ds2-javascript-logging.md) tutorial.

# Configure a Delivery stream

Follow this workflow to create a stream with EdgeWorkers data. You can also review the [Create a stream](https://techdocs.akamai.com/datastream2/docs/create-stream) section in the DataStream 2 guide for more details.

To add EdgeWorkers data to DataStream logs, you need to create and configure a stream for at least one property in your Akamai account. Make sure that you have DataStream enabled in your contract. Contact your Akamai account representative if you need help or more information.  

1. In Akamai Control Center, go to ☰ > COMMON SERVICES > DataStream.

2. Click **Create stream** and select **Delivery Products** from the drop-down. Then fill out the necessary fields and choose up to 100 active properties that belong to the same product. 

   If there are no properties in the list, you may need to create or activate one. See [Create a property](https://techdocs.akamai.com/property-mgr/docs/create-new-prop) in the Property Manager guide for more information.

3. On the **Data sets** tab, choose the log format, either Structured or JSON, and the data fields that you want to include in the log files. Go to EdgeWorkers information, and check **EdgeWorkers usage** and **EdgeWorkers execution** to log EdgeWorkers data. Both fields require that the EdgeWorkers behavior is enabled in the property. You can view a list of the [data set parameters](datastream2-reports.md) for both data set fields.

4. On the **Destinations** tab, select the destination for your DataStream logs, and specify how often to deliver them. See [Stream logs to a destination](https://techdocs.akamai.com/datastream2/docs/stream-logs) for configuration details for each available destination.

5. On the **Summary** tab, review the stream details.  Select **Activate stream upon saving **or leave the box unchecked to activate it later. 

6. Go to Property Manager and enable the **DataStream** behavior for each of the properties you chose in step two. Note that data is only logged for a property when the stream is active and the DataStream behavior is enabled.

   The stream activates in about 60 minutes after you save the configuration.

> 👍 After you start receiving data, see [DataStream 2 logs](datastream2-reports.md) for details on how to interpret log lines with EdgeWorkers fields.
