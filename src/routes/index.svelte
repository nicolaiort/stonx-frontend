<script lang="ts">
	import { ApiClient } from '$lib/ApiClient';
	import Statscard from '$lib/Statscard.svelte';

	$: current_indices = [];
	$: current_wallets = [];

	let promises: Promise<any>[] = new Array<Promise<any>>();

	promises.push(
		ApiClient.getIndices().then((res) => {
			current_indices = res;
		})
	);
	promises.push(
		ApiClient.getCrypto().then((res) => {
			current_wallets = res;
		})
	);
</script>

<div class="mx-10 my-2">
	<h2 class="my-4 text-4xl font-semibold dark:text-gray-400">Overview</h2>

	<div
		class="pb-2 flex items-center justify-between text-gray-600
				dark:text-gray-400 border-b dark:border-gray-600"
	>
		<!-- Header -->
		{#await promises[0] && promises[1]}
			<p>Loading data....</p>
		{:then}
			<div>
				<span>
					<span class="text-green-500 dark:text-green-200"> {current_wallets.length} </span>
					Coins on bitpanda
				</span>
				<span>
					<span class="text-green-500 dark:text-green-200"> {current_indices.length} </span>
					Indices on bitpanda
				</span>
				<span>
					<span class="text-green-500 dark:text-green-200"> 22 </span>
					Other wallets
				</span>
			</div>
		{/await}
	</div>
	<div class="mt-4">
		{#await promises[0] && promises[1]}
			<p>Loading data....</p>
		{:then}
			<Statscard
				title="Bitpanda Tokens"
				value={current_wallets.reduce((sum, cur) => (sum = sum + cur.fiat), 0).toFixed(2) + ' €'}
				><svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24"
					><path fill="none" d="M0 0h24v24H0z" /><path
						fill="currentColor"
						d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 100-16 8 8 0 000 16zm-1-4H8V8h3V6h2v2h1a2.5 2.5 0 012 4 2.5 2.5 0 01-2 4h-1v2h-2v-2zm-1-3v1h4a.5.5 0 100-1h-4zm0-3v1h4a.5.5 0 100-1h-4z"
					/></svg
				>
			</Statscard>
			<Statscard
				title="Bitpanda Index"
				value={current_indices.reduce((sum, cur) => (sum = sum + cur.fiat), 0).toFixed(2) + ' €'}
			>
				<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24"
					><path fill="none" d="M0 0h24v24H0z" /><path
						fill="currentColor"
						d="M4 5v14h16V5H4zM3 3h18a1 1 0 011 1v16a1 1 0 01-1 1H3a1 1 0 01-1-1V4a1 1 0 011-1zm11.793 6.793L13 8h5v5l-1.793-1.793-3.864 3.864-2.121-2.121-2.829 2.828-1.414-1.414 4.243-4.243 2.121 2.122 2.45-2.45z"
					/></svg
				></Statscard
			>
		{/await}
	</div>
</div>
