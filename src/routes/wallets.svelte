<script lang="ts">
	import { ApiClient } from '$lib/ApiClient';
	import Walletcard from '$lib/Walletcard.svelte';

	$: current_wallets = [];

	let promises: Promise<any>[] = new Array<Promise<any>>();

	promises.push(
		ApiClient.getWallets().then((res) => {
			current_wallets = res;
		})
	);
</script>

<div class="mx-10 my-2">
	<h2 class="my-4 text-4xl font-semibold dark:text-gray-400">Wallets</h2>

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
					Wallets
				</span>
			</div>
		{/await}
	</div>
	<div class="mt-4">
		{#await promises[0] && promises[1]}
			<p>Loading data....</p>
		{:then}
			{#each current_wallets as wallet}
				<Walletcard
					bind:coin_name={wallet.token}
					bind:coin_amount={wallet.balance}
					bind:coin_fiat={wallet.fiat}
				/>
			{/each}
		{/await}
	</div>
</div>
