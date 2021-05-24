<script lang="ts">
	import AddWalletModal from '$lib/modals/AddWalletModal.svelte';
	import { ApiClient } from '$lib/ApiClient';
	import Walletcard from '$lib/Walletcard.svelte';
	import Chart from '$lib/Chart.svelte';

	$: current_wallets = [];
	$: selected_wallet = {
		id: 'n/a',
		token: 'n/a',
		balance: -1,
		fiat: 0,
		description: ''
	};
	$: add_modal_open = false;
	$: timeseries = {
		day: [],
		week: [],
		month: [],
		year: [],
		all: []
	};

	let promises: Promise<any>[] = new Array<Promise<any>>();

	promises.push(
		ApiClient.getWallets().then((res) => {
			current_wallets = res;
			selected_wallet = res[0];
			getTimeSeries(selected_wallet);
		})
	);

	function getTimeSeries(wallet) {
		ApiClient.getWalletTimeSeries(wallet.token, wallet.id, 'TODAY').then((res) => {
			timeseries.day = res;
		});
		ApiClient.getWalletTimeSeries(wallet.token, wallet.id, 'THISWEEK').then((res) => {
			timeseries.week = res;
		});
		ApiClient.getWalletTimeSeries(wallet.token, wallet.id, 'THISMONTH').then((res) => {
			timeseries.month = res;
		});
		ApiClient.getWalletTimeSeries(wallet.token, wallet.id, 'THISYEAR').then((res) => {
			timeseries.year = res;
		});
		ApiClient.getWalletTimeSeries(wallet.token, wallet.id, 'ALL').then((res) => {
			timeseries.all = res;
		});
	}
</script>

<AddWalletModal bind:modal_open={add_modal_open} bind:current_wallets />
<div>
	<div class="max-full px-4 sm:px-6 md:px-8">
		<h1 class="text-2xl font-semibold text-gray-900">Wallets</h1>
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
	</div>
	<div class="w-full h-full py-5 px-4 sm:px-6 lg:px-8">
		{#await Promise.all(promises)}
			<p>Loading data....</p>
		{:then}
			<div class="w-full h-full py-5 px-4 sm:px-6 lg:px8 flex">
				<div class="w-1/4 mr-4">
					<ul class="space-y-3">
						{#each current_wallets as wallet}
							<li
								class="bg-white shadow overflow-hidden px-4 py-4 sm:px-6 sm:rounded-md"
								class:bg-gray-200={wallet.id == selected_wallet.id}
								on:click={() => {
									selected_wallet.id = wallet.id;
									getTimeSeries(wallet);
								}}
							>
								<Walletcard bind:current_wallets bind:wallet />
							</li>
						{/each}
					</ul>
				</div>
				<div class="w-3/4">
					<Chart bind:values_fiat={timeseries} />
				</div>
			</div>
		{/await}
	</div>
</div>
