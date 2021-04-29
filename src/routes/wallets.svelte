<script lang="ts">
	import AddWalletModal from '$lib/modals/AddWalletModal.svelte';
	import { ApiClient } from '$lib/ApiClient';
	import Walletcard from '$lib/Walletcard.svelte';

	$: current_wallets = [];
	$: add_modal_open = false;

	let promises: Promise<any>[] = new Array<Promise<any>>();

	promises.push(
		ApiClient.getWallets().then((res) => {
			current_wallets = res;
		})
	);
</script>

<AddWalletModal bind:modal_open={add_modal_open} bind:current_wallets />
<div class="mx-10 my-2">
	<h2 class="my-4 text-4xl font-semibold dark:text-gray-400">Wallets</h2>
	<button
		class="mt-8 flex items-center justify-between py-3 px-2 text-white
	dark:text-gray-200 bg-green-400 dark:bg-green-500 rounded-lg shadow"
		on:click={() => {
			add_modal_open = true;
		}}
	>
		<span>Add wallet</span>
		<svg class="h-5 w-5 fill-current" viewBox="0 0 24 24">
			<path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
		</svg>
	</button>
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
