const sveltePreprocess = require('svelte-preprocess');


/** @type {import('@sveltejs/kit').Config} */
module.exports = {

	preprocess: sveltePreprocess({
		postcss: true
	}),

	kit: {
		// hydrate the <div id="svelte"> element in src/app.html
		target: '#svelte'
	}
};
