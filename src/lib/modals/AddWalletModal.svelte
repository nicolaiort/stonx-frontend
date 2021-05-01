<script lang="ts">
	import { ApiClient } from '$lib/ApiClient';
	import Select from 'svelte-select';
	import coinAddressValidator from '@sotatek-anhdao/coin-address-validator';

	export let modal_open = true;
	export let current_wallets = [];

	function focus(el) {
		el.focus();
	}
	$: processed_last_submit = true;
	$: wallet_address = '';
	$: wallet_token = '';
	$: wallet_description = '';
	$: wallet_address_valid = validateAddress(wallet_token, wallet_address);
	$: createbtnenabled = wallet_address != '' && wallet_token != '';
	$: supported_tokens = [];

	let token_promise = ApiClient.getSupportedTokens().then((result) => {
		supported_tokens = result;
	});

	function validateAddress(token: string, address: string): boolean {
		if (!token || token == '') {
			return false;
		}
		return coinAddressValidator.validate(address, token.toLowerCase(), 'prod');
	}

	function submit() {
		if (processed_last_submit === true) {
			processed_last_submit = false;
			modal_open = false;
			ApiClient.createWallet(wallet_address, wallet_token, wallet_description).then((result) => {
				processed_last_submit = true;
				current_wallets.push(result);
				current_wallets = current_wallets;
				close();
			});
		}
	}

	function close() {
		modal_open = false;
		wallet_address = '';
		wallet_token = '';
	}
</script>

{#if modal_open}
	{#await token_promise}
		Loading supported tokens...
	{:then}
		<div class="fixed z-10 inset-0 overflow-y-auto">
			<div
				class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
			>
				<div class="fixed inset-0 transition-opacity" aria-hidden="true">
					<div class="absolute inset-0 bg-gray-500 opacity-75" data-id="modal_backdrop" />
				</div>
				<span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true"
					>&#8203;</span
				>
				<div
					class="inline-block align-bottom bg-white dark:bg-gray-600 rounded-lg text-left shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
					role="dialog"
					aria-modal="true"
					aria-labelledby="modal-headline"
				>
					<div class="bg-white dark:bg-gray-600 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
						<div class="sm:flex sm:items-start">
							<div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
								<h3 class="text-lg leading-6 font-medium text-black dark:text-gray-200">
									Create a new wallet
								</h3>
								<div class="mt-2 mb-6">
									<p class="text-sm text-black dark:text-gray-200">
										Just pick from the supported tokens and enter your wallet's address (we do our
										best to verify them). Never enter your private key!
									</p>
								</div>
								<div class="grid grid-cols-6 gap-6">
									<div class="col-span-6">
										<label
											for="token"
											class="block text-sm font-medium text-gray-700 dark:text-gray-300"
											>Token</label
										>
										<Select
											containerClasses="rounded-l-md mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm rounded-l-md sm:text-sm border-gray-300 border bg-gray-50 dark:bg-grey-600 text-gray-500 dark:text-grey-300 rounded-md p-2"
											bind:items={supported_tokens}
											on:select={(selectedValue) => (wallet_token = selectedValue.detail.value)}
											showChevron={true}
											MultiSelection={false}
										/>
									</div>
									<div class="col-span-6">
										<label
											for="address"
											class="block text-sm font-medium text-gray-700 dark:text-gray-300"
											>Address</label
										>
										<input
											use:focus
											autocomplete="off"
											placeholder="address"
											class:border-red-500={wallet_address == ''}
											class:focus:border-red-500={wallet_address == ''}
											class:focus:ring-red-500={wallet_address == ''}
											bind:value={wallet_address}
											type="text"
											name="address"
											class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm rounded-l-md sm:text-sm border-gray-300 border bg-gray-50 dark:bg-gray-600 text-gray-500 dark:text-gray-200 rounded-md p-2"
										/>
										{#if !wallet_address_valid}
											<p class="dark:text-gray-100">
												Please provide a valid {wallet_token} address.
											</p>
										{/if}
									</div>
									<div class="col-span-6">
										<label
											for="description"
											class="block text-sm font-medium text-gray-700 dark:text-gray-300"
											>Description (optional)</label
										>
										<input
											use:focus
											autocomplete="off"
											placeholder="description"
											bind:value={wallet_description}
											type="text"
											name="description"
											class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm rounded-l-md sm:text-sm border-gray-300 border bg-gray-50 dark:bg-gray-600 text-gray-500 dark:text-gray-200 rounded-md p-2"
										/>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="bg-white dark:bg-gray-600 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
						<button
							disabled={!createbtnenabled}
							class:opacity-50={!createbtnenabled}
							on:click={submit}
							type="button"
							class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
						>
							Create
						</button>
						<button
							on:click={() => {
								close();
							}}
							type="button"
							class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
						>
							Cancel
						</button>
					</div>
				</div>
			</div>
		</div>
	{/await}
{/if}
