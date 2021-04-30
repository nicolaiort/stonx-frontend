<script lang="ts">
	export let title: string = 'Title';
	export let value: string = 'Value';
</script>

<div class="widget ml-2 p-4 rounded-lg bg-white dark:bg-gray-600 dark:text-gray-200 inline-block">
	<div class="flex flex-row items-center justify-between">
		<div class="flex flex-col">
			<div class="text-xs uppercase font-light">{title}</div>
			<div class="text-xl font-bold">{value}</div>
		</div>
		<div class="ml-3">
			<slot />
		</div>
	</div>
</div>
