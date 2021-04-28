<script lang="ts">
	import { ApiClient } from '$lib/ApiClient';
	import IndexCard from '$lib/IndexCard.svelte';
	import Walletcard from '$lib/Walletcard.svelte';

	$: bitpanda_indices = [];
	$: bitpanda_wallets = [];

	let promises: Promise<any>[] = new Array<Promise<any>>();

	promises.push(
		ApiClient.getIndices().then((res) => {
			bitpanda_indices = res;
		})
	);
	promises.push(
		ApiClient.getCrypto().then((res) => {
			bitpanda_wallets = res;
		})
	);
</script>

<div class="mx-10 my-2">
	<h2 class="my-4 text-4xl font-semibold dark:text-gray-400">Bitpanda</h2>

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
					<span class="text-green-500 dark:text-green-200"> {bitpanda_wallets.length} </span>
					Coins on bitpanda
				</span>
				<span>
					<span class="text-green-500 dark:text-green-200"> {bitpanda_indices.length} </span>
					Indices on bitpanda
				</span>
			</div>
		{/await}
	</div>
	<div class="mt-4">
		{#await promises[0] && promises[1]}
			<p>Loading data....</p>
		{:then}
			<div class="border-b dark:border-gray-600">
				{#each bitpanda_wallets as wallet}
					<Walletcard
						bind:coin_name={wallet.token}
						bind:coin_amount={wallet.balance}
						bind:coin_fiat={wallet.fiat}
					/>
				{/each}
			</div>
			<div>
				{#each bitpanda_indices as index}
					<IndexCard bind:index_name={index.token} bind:index_amount={index.balance} />
				{/each}
			</div>
		{/await}
	</div>
</div>
