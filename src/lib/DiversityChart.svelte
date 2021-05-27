<script lang="ts">
	import Doughnut from '$lib/charts/Doughnut.svelte';
	export let values = [];
	export const responsive: boolean = false;

	$: dataLine = getData(values);

	function getData(values) {
		return {
			labels: values.map((l) => {
				return l.token;
			}),
			datasets: [
				{
					data: values.map((l) => {
						return l.fiat;
					})
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
