<script lang="ts">
	import Line from '$lib/charts/Line.svelte';
	export let values = {
		day: [],
		week: [],
		month: [],
		year: [],
		all: []
	};

	$: timespan = 'TODAY';
	$: dataLine = getData(values, timespan, true);

	function getData(values, timespan, fiat) {
		let data;
		switch (timespan) {
			case 'TODAY':
				data = values.day;
				break;
			case 'THISWEEK':
				data = values.week;
				break;
			case 'THISMONTH':
				data = values.month;
				break;
			case 'THISYEAR':
				data = values.year;
				break;
			case 'ALL':
				data = values.all;
				break;
			default:
				throw new Error('Timeframe not supported');
		}

		return {
			labels: data.map((l) => {
				if (timespan == 'TODAY') {
					return new Date(parseInt(l.timestamp)).toLocaleTimeString('de-DE', {
						hour: '2-digit',
						minute: '2-digit'
					});
				}
				return new Date(parseInt(l.timestamp)).toLocaleDateString();
			}),
			datasets: [
				{
					label: 'Fiat value',
					fill: true,
					lineTension: 0.3,
					backgroundColor: 'rgba(225, 204,230, .3)',
					borderColor: 'rgb(205, 130, 158)',
					borderCapStyle: 'butt',
					borderDash: [],
					borderDashOffset: 0.0,
					borderJoinStyle: 'miter',
					pointBorderColor: 'rgb(205, 130,1 58)',
					pointBackgroundColor: 'rgb(255, 255, 255)',
					pointBorderWidth: 10,
					pointHoverRadius: 5,
					pointHoverBackgroundColor: 'rgb(0, 0, 0)',
					pointHoverBorderColor: 'rgba(220, 220, 220,1)',
					pointHoverBorderWidth: 2,
					pointRadius: 1,
					pointHitRadius: 10,
					data: data.map((l) => {
						if (fiat) {
							return l.fiat_value;
						} else {
							return l.balance;
						}
					})
				}
			]
		};
	}
</script>

<div class="mx-auto w-full">
	<div class="bg-white overflow-hidden shadow rounded-lg">
		<div class="md:px-4 pt-4 sm:px-0 sm:py-6">
			<Line data={dataLine} options={{ responsive: true, maintainAspectRatio: false }} />
		</div>
		<div class="border-gray-200 px-4 py-4 sm:px-6">
			<div class="bg-white flex items-center justify-center">
				<span class="relative z-0 inline-flex shadow-sm rounded-md">
					{#if values.day.length > 0}
						<button
							type="button"
							on:click={() => {
								timespan = 'TODAY';
							}}
							class:bg-gray-100={timespan == 'TODAY'}
							class="relative inline-flex items-center px-4 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
						>
							Day
						</button>
					{/if}
					{#if values.week.length > 0}
						<button
							type="button"
							on:click={() => {
								timespan = 'THISWEEK';
							}}
							class:bg-gray-100={timespan == 'THISWEEK'}
							class="-ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
						>
							Week
						</button>
					{/if}
					{#if values.month.length > 0}
						<button
							type="button"
							on:click={() => {
								timespan = 'THISMONTH';
							}}
							class:bg-gray-100={timespan == 'THISMONTH'}
							class="-ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
						>
							Month
						</button>
					{/if}
					{#if values.year.length > 0}
						<button
							type="button"
							on:click={() => {
								timespan = 'THISYEAR';
							}}
							class:bg-gray-100={timespan == 'THISYEAR'}
							class="-ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
						>
							Year
						</button>
					{/if}
					{#if values.all.length > 0}
						<button
							type="button"
							on:click={() => {
								timespan = 'ALL';
							}}
							class:bg-gray-100={timespan == 'ALL'}
							class="-ml-px relative inline-flex items-center px-4 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
						>
							Since start
						</button>
					{/if}
				</span>
			</div>
		</div>
	</div>
</div>
