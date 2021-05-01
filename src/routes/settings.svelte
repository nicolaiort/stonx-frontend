<script lang="ts">
	import { ApiClient } from '$lib/ApiClient';
	import IndexCard from '$lib/IndexCard.svelte';
	import Walletcard from '$lib/Walletcard.svelte';

	$: email = '';
	$: username = '';
	$: bitpanda_api_key = '';
	$: password = '';
	$: repeat_password = '';

	let promises: Promise<any>[] = new Array<Promise<any>>();

	// promises.push(
	// 	ApiClient.getBitpandaIndices().then((res) => {
	// 		bitpanda_indices = res;
	// 	})
	// );
</script>

<div class="mx-10 my-2">
	<h2 class="my-4 text-4xl font-semibold dark:text-gray-400">User Settings</h2>

	<div
		class="pb-2 flex items-center justify-between text-gray-600
				dark:text-gray-400 border-b dark:border-gray-600"
	>
		<!-- Header -->
	</div>
	<div class="mt-4">
		{#await promises[1]}
			<p>Loading data....</p>
		{:then}
			Settings
		{/await}
	</div>
</div>
