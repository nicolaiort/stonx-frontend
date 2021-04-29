<script lang="ts">
	import marked from 'marked';
	import { onMount } from 'svelte';
	let html: string = '';
	let promise: Promise<any>;
	onMount(() => {
		async function load() {
			let md = await fetch('/privacy.md');
			let text = (await md.text()).toString();
			if (text.includes('<meta')) {
				throw new Error('Starts with HTML');
			}
			html = marked(text);
		}
		promise = load();
	});
</script>

<div class="pt-12 px-4 sm:px-6 lg:px-8 lg:pt-20 bg-gray-700 pb-12">
	<div class="text-center mb-8">
		<h1
			class="mt-9 font-display text-4xl leading-none font-semibold text-white sm:text-5xl lg:text-6xl"
		>
			Privacy
		</h1>
	</div>
</div>

<div class="pt-0 pb-16 overflow-hidden lg:pt-12 lg:py-24">
	<div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
		{#await promise}
			<p class="text-center w-full">Loading privacy...</p>
		{:then}
			<div class="simplecontent">
				{@html html}
			</div>
		{:catch error}
			<div class="text-white px-6 py-4 border-0 rounded relative mb-4 bg-red-500">
				<span class="inline-block align-middle mr-8">
					<b class="capitalize">Encountered a problem while loading the privacy</b>
					{error}
				</span>
			</div>
		{/await}
	</div>
</div>
