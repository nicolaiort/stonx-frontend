<script lang="ts">
	import Chart from 'svelte-lightweight-charts/components/chart.svelte';
	import AreaSeries from 'svelte-lightweight-charts/components/area-series.svelte';
	export const values = [];
</script>

<Chart>
	<AreaSeries data={values} />
</Chart>
