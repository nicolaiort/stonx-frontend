<script lang="ts">
	import Doughnut from '$lib/charts/Doughnut.svelte';
	export let values = [];
	export const responsive: boolean = false;

	$: dataLine = getData(values);
	const colors = [
		'#f3558e',
		'#17b978',
		'#3498db',
		'#3f3b3b',
		'#775ada',
		'#7ed6df',
		'#21e6c1',
		'#c0392b',
		'#d35400',
		'#7f8c8d',
		'#6ab04c',
		'#4834d4',
		'#ff1f5a',
		'#eac100'
	];

	function getData(values) {
		return {
			labels: values.map((l) => {
				return l.token;
			}),
			datasets: [
				{
					data: values.map((l) => {
						return l.fiat;
					}),
					backgroundColor: colors
				}
			]
		};
	}
</script>

<div class="mx-auto w-full">
	<div class="bg-white overflow-hidden shadow rounded-lg">
		<div class="md:px-4 pt-4 sm:px-0 sm:py-6">
			<Doughnut data={dataLine} options={{ responsive: true, maintainAspectRatio: responsive }} />
		</div>
	</div>
</div>
