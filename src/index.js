/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

export default {
	async fetch(request, env, ctx) {
		try {
			let myKey = {
				userId: "1235",
				secretId: "secret123",
				templateId: "https://static-page-demo-test.pages.dev/"
			}
			let jsonString = JSON.stringify(myKey)
			await env.kv_handler.put("user_secret", jsonString)
			let value = await env.kv_handler.get("user_secret")
			//in deployment it returns null
			if (value === null) {
				//in deployment it stops here
				return new Response('value not found', { status: 404 })
			}
			return new Response("value is: " + value)
		} catch (error) {
			console.log('KV returned an Error: ' + error)
			return new Response(error + { status: 500 })
		}
	},
};
