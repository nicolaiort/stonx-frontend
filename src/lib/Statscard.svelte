<script lang="ts">
	export let title: string = 'Title';
	export let value: string = 'Value';
</script>

<div class="widget p-4 rounded-lg bg-white dark:bg-gray-600 dark:text-gray-200 inline-block">
	<div class="flex flex-row items-center justify-between">
		<div class="flex flex-col">
			<div class="text-xs uppercase font-light">{title}</div>
			<div class="text-xl font-bold">{value}</div>
		</div>
		<svg
			height="24"
			width="24"
			fill="currentColor"
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
			><path d="M0 0h24v24H0z" fill="none" />
			<path
				d="M13.49 5.48c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm-3.6 13.9l1-4.4 2.1 2v6h2v-7.5l-2.1-2 .6-3c1.3 1.5 3.3 2.5 5.5 2.5v-2c-1.9 0-3.5-1-4.3-2.4l-1-1.6c-.4-.6-1-1-1.7-1-.3 0-.5.1-.8.1l-5.2 2.2v4.7h2v-3.4l1.8-.7-1.6 8.1-4.9-1-.4 2 7 1.4z"
			/></svg
		>
	</div>
</div>
