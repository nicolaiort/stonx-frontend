<script>
	import { onMount, afterUpdate, onDestroy } from 'svelte';
	import { Chart, registerables } from 'chart.js/dist/chart.esm';

	//  Expected data
	export let data = {
		labels: [],
		datasets: [{ values: [] }],
		yMarkers: {},
		yRegions: []
	};
	export let type = 'line';
	export let options = {};
	export let plugins = {};
	let chart = null;
	let chartRef;
	let props = clean($$props, ['data', 'type', 'options', 'plugins']);
	onMount(() => {
		Chart.register(...registerables);
		chart = new Chart(chartRef, {
			//@ts-ignore
			type,
			//@ts-ignore
			data,
			options,
			//@ts-ignore
			plugins
		});
	});
	afterUpdate(() => {
		if (!chart) return;

		chart.data = data;
		chart.type = type;
		chart.options = options;
		chart.plugins = plugins;
		chart.update();
	});

	onDestroy(() => {
		chart = null;
	});

	function clean($$props, extra_keys) {
		let keys = ['children', '$$scope', '$$slots'].concat(extra_keys);
		const rest = {};
		for (const key of Object.keys($$props)) {
			if (!keys.includes(key)) {
				rest[key] = $$props[key];
			}
		}
		return rest;
	}
</script>

<canvas bind:this={chartRef} {...props} />
