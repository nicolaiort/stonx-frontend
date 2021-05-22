<script>
	import Chart from 'svelte-frappe-charts';
	export let values = [];
	export let timespan = 'TODAY';

	$: data = getData(values, timespan);

	function getData(values, timespan) {
		return {
			labels: getLabels(values, timespan),
			datasets: [
				{
					values: values.map((l) => l.fiat_value)
				}
			]
		};
	}

	function getLabels(values, timespan) {
		switch (timespan) {
			case 'TODAY':
				return values.map((l) => {
					return new Date(l.timestamp).toLocaleTimeString();
				});
			default:
				return values.map((l) => {
					return new Date(l.timestamp).toLocaleDateString();
				});
		}
	}
</script>

<div class="bg-gray-100">
	<div class="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
		<div class="max-w-2xl mx-auto">
			<div class="bg-white overflow-hidden shadow rounded-lg">
				<div class="px-4 py-5 sm:p-6">
					<Chart {data} type="line" class="w-full" />
				</div>
				<div class="border-t border-gray-200 px-4 py-4 sm:px-6">
					<div class="p-8 bg-white flex items-center justify-center">
						<span class="relative z-0 inline-flex shadow-sm rounded-md">
							<button
								type="button"
								on:click={() => {
									timespan = 'TODAY';
								}}
								class="relative inline-flex items-center px-4 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
							>
								Day
							</button>
							<button
								type="button"
								on:click={() => {
									timespan = 'THISWEEK';
								}}
								class="-ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
							>
								Week
							</button>
							<button
								type="button"
								on:click={() => {
									timespan = 'THISMONTH';
								}}
								class="-ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
							>
								Month
							</button>
							<button
								type="button"
								on:click={() => {
									timespan = 'THISYEAR';
								}}
								class="-ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
							>
								Year
							</button>
							<button
								type="button"
								on:click={() => {
									timespan = 'ALL';
								}}
								class="-ml-px relative inline-flex items-center px-4 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
							>
								Since start
							</button>
						</span>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
