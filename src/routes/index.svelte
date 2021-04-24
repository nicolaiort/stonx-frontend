<script lang="ts">
	import Statscard from '$lib/Statscard.svelte';
</script>

<div class="mx-10 my-2">
	<h2 class="my-4 text-4xl font-semibold dark:text-gray-400">Overview</h2>

	<div
		class="pb-2 flex items-center justify-between text-gray-600
				dark:text-gray-400 border-b dark:border-gray-600"
	>
		<!-- Header -->
		<div>
			<span>
				<span class="text-green-500 dark:text-green-200"> 23 </span>
				Different coins on bitpanda
			</span>
			<span>
				<span class="text-green-500 dark:text-green-200"> 22 </span>
				Other wallets
			</span>
			<span>
				<span class="text-green-500 dark:text-green-200"> 33 </span>
				roles
			</span>
		</div>
		<!-- <div>
			<span class="capitalize">
				project
				<span class="text-green-500 dark:text-green-200
                    cursor-pointer">
					all
				</span>
			</span>
			<span class="capitalize ml-12">
				date added
				<span class="text-green-500 dark:text-green-200
                    cursor-pointer">
					all time
				</span>
			</span>
			<span class="capitalize ml-12">
				role
				<span class="text-green-500 dark:text-green-200
                    cursor-pointer">
					all
				</span>
			</span>
		</div> -->
	</div>
	<div class="mt-4">
		<Statscard title="Bitpanda" value="3€" />
	</div>
</div>
