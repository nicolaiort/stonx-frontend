<script lang="ts">
	export let title: string = 'Title';
</script>

<div class="w-full h-full bg-white shadow rounded-lg">
	<div class="px-4 py-5 sm:p-6">
		<div class="items-center text-center">
			<div class="rounded-md">
				<slot />
			</div>
			<div class="mx-auto">
				<dt class="text-sm font-medium text-gray-800">
					{title}
				</dt>
			</div>
		</div>
	</div>
</div>
