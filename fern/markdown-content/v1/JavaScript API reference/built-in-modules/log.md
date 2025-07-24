---
title: "log"
slug: "log"
excerpt: ""
hidden: false
createdAt: "Wed May 05 2021 13:27:03 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Tue Jul 09 2024 11:20:10 GMT+0000 (Coordinated Universal Time)"
---
The log built-in module is available to use in your EdgeWorkers code bundles to log messages generated during the current request.

To deliver the logging results from the log module you can either:

- Enable [enhanced debug headers](enable-enhanced-debug-headers.md) or;
- Use a [DataStream 2](ds2-javascript-logging.md).

Logging only occurs once you've requested logging information using [Enable enhanced debug headers](enable-enhanced-debug-headers.md) or a DataStream 2 stream. For more information refer to the [JavaScript logging](enable-javascript-logging.md) section.

# log()

Replaces the `format` string with the contents of the `arguments` parameter. The event handler log headers records this change. If you disable logging, the format string is not replaced and the event log headers are not changed.

```javascript
import { logger } from 'log'; // Import the logger module
export function onClientRequest (request) {
  let random_value_0_to_10 = Math.floor(Math.random() * 10);
  if( random_value_0_to_10 > 5){ //  Simulate an error for some requests
      logger.error("Oh no, a seemingly random bug appeared! Value: %i", random_value_0_to_10);
   }
  logger.info("Responding with hello world from the path: %s", request.path);
  logger.debug("Request device - is mobile: %s", request.device.isMobile);

  request.respondWith(
    200, {},
    '<html><body>\
    <h1>Hello World From Akamai EdgeWorkers</h1>\
    </body></html>');
  }

export function onClientResponse (request, response) {
    let data = {
        name: "EdgeWorkers",
        value: 1,
    };  
  logger.info("Data object: %o", data)//Log complex object

}
```

| Parameter | Type     | Description                                                   |
| :-------- | :------- | :------------------------------------------------------------ |
| format    | String   | The logging header message text.                              |
| arguments | Any type | Zero or more values formatted according to the format string. |

This function adheres to the log behavior defined in the [WhatWG Console Standard](https://console.spec.whatwg.org/#log) document.

# debug()

Sends a **debug** level logging message.

```javascript
logger.debug('Hello'); // Call the debug method from the logger module
```

| Parameter | Type     | Description                                                   |
| :-------- | :------- | :------------------------------------------------------------ |
| format    | String   | The logging header message text.                              |
| arguments | Any type | Zero or more values formatted according to the format string. |

Replaces the `format` string with the contents of the `arguments` parameter. The event handler log headers records this change. If you disable logging, the format string is not replaced and the event log headers are not changed.

This function adheres to the log behavior defined in the [WhatWG Console Standard](https://console.spec.whatwg.org/#debug) document.

# error()

Sends a **error** level logging message.

```javascript
logger.error('Hello'); // Call the error method from the logger module
```

| Parameter | Type     | Description                                                   |
| :-------- | :------- | :------------------------------------------------------------ |
| format    | String   | The logging header message text.                              |
| arguments | Any type | Zero or more values formatted according to the format string. |

Replaces the `format` string with the contents of the `arguments` parameter. The event handler log headers records this change. If you disable logging, the format string is not replaced and the event log headers are not changed.

This function adheres to the log behavior defined in the [WhatWG Console Standard](https://console.spec.whatwg.org/#error) document.

# info()

Sends a **info** level logging message.

```javascript
logger.info('Hello'); // Call the info method from the logger module
```

| Parameter | Type     | Description                                                   |
| :-------- | :------- | :------------------------------------------------------------ |
| format    | String   | The logging header message text.                              |
| arguments | Any type | Zero or more values formatted according to the format string. |

Replaces the `format` string with the contents of the `arguments` parameter. The event handler log headers records this change. If you disable logging, the format string is not replaced and the event log headers are not changed.

This function adheres to the log behavior defined in the [WhatWG Console Standard](https://console.spec.whatwg.org/#info) document.

# trace()

Sends a **trace** level logging message.

```javascript
logger.trace('Hello'); // Call the trace method from the logger module
```

| Parameter | Type     | Description                                                   |
| :-------- | :------- | :------------------------------------------------------------ |
| format    | String   | The logging header message text.                              |
| arguments | Any type | Zero or more values formatted according to the format string. |

Replaces the `format` string with the contents of the `arguments` parameter. The event handler log headers records this change. If you disable logging, the format string is not replaced and the event log headers are not changed.

This function adheres to the log behavior defined in the [WhatWG Console Standard](https://console.spec.whatwg.org/#trace) document.

# warn()

Sends a **warn** level logging message.

```javascript
logger.warn('Hello'); // Call the warn method from the logger module
```

| Parameter | Type     | Description                                                   |
| :-------- | :------- | :------------------------------------------------------------ |
| format    | String   | The logging header message text.                              |
| arguments | Any type | Zero or more values formatted according to the format string. |

Replaces the `format` string with the contents of the `arguments` parameter. The event handler log headers records this change. If you disable logging, the format string is not replaced and the event log headers are not changed.

This function adheres to the log behavior defined in the [WhatWG Console Standard](https://console.spec.whatwg.org/#warn) document.
