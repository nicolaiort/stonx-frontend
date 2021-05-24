<script lang="ts">
	import { ApiClient } from '$lib/ApiClient';
	import Walletcard from '$lib/Walletcard.svelte';
	import Chart from '$lib/Chart.svelte';

	$: binance_wallets = [];

	let promises: Promise<any>[] = new Array<Promise<any>>();
	promises.push(
		ApiClient.getBinanceSpot().then((res) => {
			binance_wallets = res;
			selected_asset = res[0];
			getTimeSeries(selected_asset);
		})
	);

	$: selected_asset = {
		id: 'n/a',
		token: 'n/a',
		balance: -1,
		fiat: 0,
		description: ''
	};
	$: timeseries = {
		day: [],
		week: [],
		month: [],
		year: [],
		all: []
	};

	function getTimeSeries(wallet) {
		ApiClient.getBitpandaAssetTimeSeries(wallet.token, 'TODAY').then((res) => {
			timeseries.day = res;
		});
		ApiClient.getBitpandaAssetTimeSeries(wallet.token, 'THISWEEK').then((res) => {
			timeseries.week = res;
		});
		ApiClient.getBitpandaAssetTimeSeries(wallet.token, 'THISMONTH').then((res) => {
			timeseries.month = res;
		});
		ApiClient.getBitpandaAssetTimeSeries(wallet.token, 'THISYEAR').then((res) => {
			timeseries.year = res;
		});
		ApiClient.getBitpandaAssetTimeSeries(wallet.token, 'ALL').then((res) => {
			timeseries.all = res;
		});
	}
</script>

<div>
	<div class="w-full px-4 sm:px-6 md:px-8">
		<h1 class="text-2xl font-semibold text-gray-900">Binance Spot</h1>
	</div>
	<div class="w-full py-5 px-4 sm:px-6 lg:px-8">
		{#await Promise.all(promises)}
			<p>Loading data....</p>
		{:then}
			<div class="w-full h-full py-5 px-4 sm:px-6 lg:px8 flex">
				<div class="w-1/4 mr-4">
					<ul class="space-y-3">
						{#each binance_wallets as wallet}
							<li
								class="bg-white shadow overflow-hidden px-4 py-4 sm:px-6 sm:rounded-md"
								class:bg-gray-200={wallet.id == selected_asset.id}
								on:click={() => {
									selected_asset.id = wallet.id;
									getTimeSeries(wallet);
								}}
							>
								<Walletcard bind:wallet />
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
