---
title: "EdgeWorkers JavaScript code"
slug: "edgeworkers-javascript-code"
excerpt: ""
hidden: false
createdAt: "Wed May 05 2021 13:52:00 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Mon Jan 20 2025 15:01:53 GMT+0000 (Coordinated Universal Time)"
---
### Are there code samples to help me get started ?

Yes, for sure! Check out our [public GitHub repository](https://github.com/akamai/edgeworkers-examples/tree/master/edgecompute/examples) that outlines several example use cases for EdgeWorkers.

### What JavaScript runtime is used to execute JavaScript code?

EdgeWorkers uses [Google's V8 engine](https://v8.dev/) for its code execution runtime. It is high-performing, and constantly evolving and improving.

### What is the activation time for EdgeWorkers code bundle updates?

Expected activation (propagation) times align with delivery properties at 2-5 minutes on staging, and 8-10 minutes on production. Activations into your developer [<Markdown src="../../../snippets/COMPANY_NICKNAME.mdx" /> Sandbox](https://techdocs.akamai.com/sandbox/docs) tunnel is near real-time.

### Which JavaScript libraries can I include in an EdgeWorkers code bundle?

You can use most self-contained JavaScript libraries that:  

- Roll up into a flat .js file.

- You can include in the local EdgeWorkers code bundle.

- Do not try to make external calls.

- Fit within the EdgeWorkers [system limits](limitations.md).

 You can also review this blog article on how to use [rollup](store-locator.md) to flatten a JavaScript library for use within EdgeWorkers.

### When will EdgeWorkers support additional languages?

We selected the V8 runtime because of its native support for JavaScript. It also provides a direct path for additional language support in the future. To provide a successful environment for customer developers, we decided to focus on JavaScript, a language that virtually all developers know.

We'll revisit support for other languages, based on customer demand, in our extended roadmap.

### Can I re-use request and response headers?

Review these guidelines when copying request and sub-request headers. You can also find  information about copying a response from a sub-request and an actual response.

- Avoid setting the `Proxy-Authorization` and `TE` hop-by-hop headers when creating a request.
- Avoid setting the following hop-by-hop headers for a request or response.
  - `Connection`
  - `Keep-Alive`
  - `Trailers`
  - `Transfer-Encoding`
- Do not **set** or **copy** the `Content-Length` header from another request or response. An incorrect value in the `Content-Length` header will break the response. If you opt to set it anyway, make sure that the value reflects the actual length of the payload you're passing.
- Do **set** or **copy** the `Vary` header from another response. An incorrect value in the `Vary` header can break cacheability.
- Do not **set** or **copy** the `Host` request header from another request. If you opt to set it anyway, you need to make sure that the values are correct. An incorrect value in the `Host` header can break your request.

### Can I include sub-request headers in the response?

As a general rule you should avoid passing sub-request headers back in the response to prevent intermittent data corruption errors that are hard to debug.

If you do decide to include sub-request headers in the response you should use an allow list to choose and explicitly add only the headers that need to be forwarded. This method also lets you avoid sending extraneous headers, which speeds up the response and lowers the load on the network. 

```javascript
import {createResponse} from 'create-response';
import {httpRequest} from 'http-request'

export async function responseProvider(request) {
    	let response = await httpRequest('https://myhost.com');

    	let response_headers = response.getHeaders();

    	let hdrs = {};
    	for (let allowed of ['server', 'mime-version', 'content-type']) {
            	if (allowed in response_headers) {
                    	hdrs[allowed] = response_headers[allowed];
            	}
    	}
```
