<script lang="ts">
	import { ApiClient } from './ApiClient';

	export let wallet = {
		id: 'n/a',
		token: 'n/a',
		balance: -1,
		fiat: 0
	};
	export let current_wallets = [];

	function deleteWallet() {
		ApiClient.deleteWallet(wallet.id).then((result) => {
			current_wallets = current_wallets.filter((w) => (w.id = !wallet.id));
		});
	}
</script>

<div class="mt-4 flex px-4 py-4 justify-between bg-white dark:bg-gray-600 shadow-xl rounded-lg">
	<!-- Card -->

	<div class="flex justify-between">
		<!-- Left side -->

		<span class="h-12 w-12 rounded-full object-cover">TODO:</span>

		<div class="ml-4 flex flex-col capitalize text-gray-600 dark:text-gray-400">
			<span>Token name</span>
			<span class="mt-2 text-black dark:text-gray-200"> {wallet.token} </span>
		</div>

		<div class="ml-12 flex flex-col capitalize text-gray-600 dark:text-gray-400">
			<span>Current Amount</span>
			<span class="mt-2 text-black dark:text-gray-200"> {wallet.balance} </span>
		</div>
		<div class="ml-12 flex flex-col capitalize text-gray-600 dark:text-gray-400">
			<span>Current Value(Fiat)</span>
			<span class="mt-2 text-black dark:text-gray-200"> {wallet.fiat.toFixed(2)} €</span>
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
		<div class="mr-8 flex flex-col capitalize text-gray-600 dark:text-gray-400">
			<span>Actions</span>
			<button
				on:click={() => {
					deleteWallet();
				}}
				type="button"
				class="h-12 w-12 inline-flex justify-center rounded-md shadow-sm px-2 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
			>
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="h-8 w-8 fill-current"
					><path fill="none" d="M0 0h24v24H0z" /><path
						d="M17 6h5v2h-2v13a1 1 0 01-1 1H5a1 1 0 01-1-1V8H2V6h5V3a1 1 0 011-1h8a1 1 0 011 1v3zm1 2H6v12h12V8zm-9 3h2v6H9v-6zm4 0h2v6h-2v-6zM9 4v2h6V4H9z"
					/></svg
				>
			</button>
		</div>
		-->
	</div>
</div>
