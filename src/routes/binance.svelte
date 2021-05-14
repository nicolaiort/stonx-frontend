<script lang="ts">
	import { ApiClient } from '$lib/ApiClient';
	import Walletcard from '$lib/Walletcard.svelte';

	$: binance_wallets = [];

	let promises: Promise<any>[] = new Array<Promise<any>>();
	promises.push(
		ApiClient.getBinanceSpot().then((res) => {
			binance_wallets = res;
		})
	);
</script>

<div>
	<div class="max-w-7xl px-4 sm:px-6 md:px-8">
		<h1 class="text-2xl font-semibold text-gray-900">Binance Spot</h1>
	</div>
	<div class="max-w-7xl py-5 px-4 sm:px-6 lg:px-8">
		{#await Promise.all(promises)}
			<p>Loading data....</p>
		{:then}
			<div class="border-b dark:border-gray-600">
				{#each binance_wallets as current_wallet}
					<Walletcard bind:wallet={current_wallet} />
				{/each}
			</div>
		{/await}
	</div>
</div>
