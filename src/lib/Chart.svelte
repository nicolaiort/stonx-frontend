<script lang="ts">
	import Chart from 'svelte-frappe-charts';
	export let values_fiat = {
		day: [],
		week: [],
		month: [],
		year: [],
		all: []
	};

	$: timespan = 'TODAY';
	$: data = getData(values_fiat, timespan);

	function getData(values, timespan) {
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
					return new Date(l.timestamp).toLocaleTimeString('de-DE', {
						hour: '2-digit',
						minute: '2-digit'
					});
				}
				return new Date(l.timestamp).toLocaleDateString();
			}),
			datasets: [
				{
					values: data.map((l) => l.fiat_value)
				}
			]
		};
	}
</script>

<div class="bg-gray-100">
	<div class="w-full mx-auto py-12 px-4 sm:px-6 lg:px-8">
		<div class="mx-auto">
			<div class="bg-white overflow-hidden shadow rounded-lg">
				<div class="px-4 pt-4 sm:p-6">
					<Chart {data} type="line" class="w-full" />
				</div>
				<div class="border-gray-200 px-4 py-4 sm:px-6">
					<div class="bg-white flex items-center justify-center">
						<span class="relative z-0 inline-flex shadow-sm rounded-md">
							{#if values_fiat.day.length > 0}
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
							{#if values_fiat.week.length > 0}
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
							{#if values_fiat.month.length > 0}
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
							{#if values_fiat.year.length > 0}
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
							{#if values_fiat.all.length > 0}
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
	</div>
</div>
