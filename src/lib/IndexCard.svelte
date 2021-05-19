<script lang="ts">
	import { IconService } from './IconService';

	export let index_name: string = 'Crypto69';
	export let index_amount: number = 420.69;
</script>

<div class="mt-4 flex px-4 py-4 justify-between bg-white dark:bg-gray-600 shadow-xl rounded-lg">
	<!-- Card -->

	<div class="flex justify-between">
		<!-- Left side -->

		<span class="mt-2 h-12 w-12 rounded-full object-cover"
			><img
				class="h-12 w-12"
				alt={index_name}
				src={IconService.getIndexIconBase64(index_name)}
			/></span
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
