<script lang="ts">
	import { ApiClient } from '$lib/ApiClient';
	import IndexCard from '$lib/IndexCard.svelte';
	import Walletcard from '$lib/Walletcard.svelte';

	$: bitpanda_indices = [];
	$: bitpanda_wallets = [];

	let promises: Promise<any>[] = new Array<Promise<any>>();

	promises.push(
		ApiClient.getBitpandaIndices().then((res) => {
			bitpanda_indices = res;
		})
	);
	promises.push(
		ApiClient.getBitpandaCrypto().then((res) => {
			bitpanda_wallets = res;
		})
	);
</script>

<div>
	<div class="max-w-7xl px-4 sm:px-6 md:px-8">
		<h1 class="text-2xl font-semibold text-gray-900">Bitpanda</h1>
	</div>
	<div class="max-w-7xl py-5 px-4 sm:px-6 lg:px-8">
		{#await promises[0] && promises[1]}
			<p>Loading data....</p>
		{:then}
			<div class="border-b dark:border-gray-600">
				{#each bitpanda_wallets as current_wallet}
					<Walletcard bind:wallet={current_wallet} />
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
