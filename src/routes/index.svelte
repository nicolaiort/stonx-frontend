<script lang="ts">
	import Statscard from '$lib/Statscard.svelte';
	import axios from 'axios';

	const baseurl = 'http://localhost:8083';
	$: current_indices = [];
	$: current_wallets = [];

	let promises: Promise<any>[] = new Array<Promise<any>>();

	promises.push(
		axios.get(`${baseurl}/rest/bitpanda/assets/index`).then((res) => {
			current_indices = res.data;
		})
	);
	promises.push(
		axios.get(`${baseurl}/rest/bitpanda/assets/crypto`).then((res) => {
			current_wallets = res.data;
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
		<div>
			<span>
				<span class="text-green-500 dark:text-green-200"> 23 </span>
				Different coins on bitpanda
			</span>
			<span>
				<span class="text-green-500 dark:text-green-200"> 22 </span>
				Other wallets
			</span>
			<span>
				<span class="text-green-500 dark:text-green-200"> 33 </span>
				roles
			</span>
		</div>
	</div>
	<div class="mt-4">
		{#await promises[0] && promises[1]}
			<p>Loading data....</p>
		{:then}
			<Statscard
				title="Bitpanda Index"
				value={current_indices.reduce((sum, cur) => (sum = sum + cur.fiat), 0).toFixed(2)}
			/>
			<Statscard
				title="Bitpanda Tokens"
				value={current_wallets.reduce((sum, cur) => (sum = sum + cur.fiat), 0).toFixed(2)}
			/>
		{/await}
	</div>
</div>
