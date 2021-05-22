<script lang="ts">
	import { ApiClient } from '$lib/ApiClient';
	import Walletcard from '$lib/Walletcard.svelte';
	import Chart from '$lib/Chart.svelte';

	$: binance_wallets = [];

	let promises: Promise<any>[] = new Array<Promise<any>>();
	promises.push(
		ApiClient.getBinanceSpot().then((res) => {
			binance_wallets = res;
		})
	);

	$: selected_wallet_asset = 'none';
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
	<div class="max-w-7xl px-4 sm:px-6 md:px-8">
		<h1 class="text-2xl font-semibold text-gray-900">Binance Spot</h1>
	</div>
	<div class="max-w-7xl py-5 px-4 sm:px-6 lg:px-8">
		{#await Promise.all(promises)}
			<p>Loading data....</p>
		{:then}
			<div class="flex h-full">
				<div class="w-1/4 overflow-hidden">
					<ul class="space-y-3 overflow-y-scroll">
						{#each binance_wallets as current_wallet}
							<li
								class="bg-white shadow overflow-hidden px-4 py-4 sm:px-6 sm:rounded-md"
								class:bg-gray-200={current_wallet.token == selected_wallet_asset}
								on:click={() => {
									selected_wallet_asset = current_wallet.token;
									getTimeSeries(current_wallet);
								}}
							>
								<Walletcard bind:wallet={current_wallet} />
							</li>
						{/each}
					</ul>
				</div>
				<div class="w-3/4 overflow-hidden">
					<Chart bind:values_fiat={timeseries} />
				</div>
			</div>
		{/await}
	</div>
</div>
