<script lang="ts">
	export let index_name: string = 'Crypto69';
	export let index_amount: number = 420.69;
</script>

<div class="mt-8 flex px-4 py-4 justify-between bg-white dark:bg-gray-600 shadow-xl rounded-lg">
	<!-- Card -->

	<div class="flex justify-between">
		<!-- Left side -->

		<span class="h-12 w-12 rounded-full object-cover"
			><svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24"
				><path fill="none" d="M0 0h24v24H0z" /><path
					fill="currentColor"
					d="M4 5v14h16V5H4zM3 3h18a1 1 0 011 1v16a1 1 0 01-1 1H3a1 1 0 01-1-1V4a1 1 0 011-1zm11.793 6.793L13 8h5v5l-1.793-1.793-3.864 3.864-2.121-2.121-2.829 2.828-1.414-1.414 4.243-4.243 2.121 2.122 2.45-2.45z"
				/></svg
			></span
		>

		<div class="ml-4 flex flex-col capitalize text-gray-600 dark:text-gray-400">
			<span>Index name</span>
			<span class="mt-2 text-black dark:text-gray-200"> {index_name} </span>
		</div>

		<div class="ml-12 flex flex-col capitalize text-gray-600 dark:text-gray-400">
			<span>Current Value (Fiat)</span>
			<span class="mt-2 text-black dark:text-gray-200"> {index_amount.toFixed(2)} €</span>
		</div>
	</div>

	<div class="flex">
		<!-- Rigt side -->

		<!-- <div class="mr-16 flex flex-col capitalize text-gray-600 dark:text-gray-400">
			<span>project</span>
			<span class="mt-2 text-black dark:text-gray-200"> Aero treck </span>
		</div>

		<div class="mr-16 flex flex-col capitalize text-gray-600 dark:text-gray-400">
			<span>role</span>
			<span class="mt-2 text-black dark:text-gray-200"> Front-End </span>
		</div>

		<div class="mr-16 flex flex-col capitalize text-gray-600 dark:text-gray-400">
			<span>status</span>
			<span class="mt-2 text-yellow-600 dark:text-yellow-400"> in work </span>
		</div>

		<div class="mr-8 flex flex-col capitalize text-gray-600 dark:text-gray-400">
			<span>final date</span>
			<span class="mt-2 text-green-400 dark:text-green-200"> 20.02.2020 11:00 </span>
		</div> -->
	</div>
</div>
