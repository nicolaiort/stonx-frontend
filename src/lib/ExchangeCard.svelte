<script lang="ts">
	export let title: string = 'Title';
</script>

<div class="w-full h-full bg-white shadow rounded-lg">
	<div class="px-4 py-5 sm:p-6 w-full">
		<button class="mr-0 ml-auto">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 24 24"
				class="h-6 w-6 mr-0 ml-auto fill-current"
				><path fill="none" d="M0 0h24v24H0z" /><path
					d="M17 6h5v2h-2v13a1 1 0 01-1 1H5a1 1 0 01-1-1V8H2V6h5V3a1 1 0 011-1h8a1 1 0 011 1v3zm1 2H6v12h12V8zm-9 3h2v6H9v-6zm4 0h2v6h-2v-6zM9 4v2h6V4H9z"
				/></svg
			>
		</button>
		<div class="items-center text-center -mt-6">
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
