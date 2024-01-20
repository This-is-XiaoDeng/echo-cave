/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

function getHtmlContent(cave_id, context, sender) {
	return `<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title>XDbot2 回声洞</title>
	</head>
	<body style="text-align: center;">
		<p>回声洞——（${cave_id}）</p>
		<p>${context}</p>
		<p>——${sender}</p>
	</body>
</html>`;
}

export default {
	async fetch(request, env, ctx) {
		let data = await (await fetch("https://caveapi.itcdt.top/random")).json();
		let content = data["content"];
		for (var key in data["images"]) {
			content = content.replace(
				`[[Img:${key}]]]`,
				`<img src="data:image/png;base64,${data["images"][key]}" />`
			);
		}
		return new Response(
      getHtmlContent(data["id"], content, data["sender"]), {
        headers: { 'Content-Type': 'text/html' }
      }
    );
	},
};
