<script lang="ts">
	import { ApiClient } from '$lib/ApiClient';
	import Select from 'svelte-select';

	export let add_exchange_modal_open = true;
	let supportedExchanges = [];
	$: processed_last_submit = true;

	$: exchange = '';
	$: api_key = '';
	$: api_secret = '';
	$: submit_enabled = check_submit(exchange, api_key, api_secret);

	let exchange_promise = ApiClient.getSupportedExchanges().then((res) => {
		supportedExchanges = res;
	});

	function check_submit(exchange, key, secret) {
		if (!processed_last_submit) {
			return false;
		}
		if (!exchange || exchange == '') {
			return false;
		}
		if (!key || key == '') {
			return false;
		}
		if (exchange == 'BINANCE' && (!secret || secret == '')) {
			return false;
		}
		return true;
	}

	function close() {
		add_exchange_modal_open = false;
		exchange = '';
		api_key = '';
		api_secret = '';
	}

	function submit() {
		if (!processed_last_submit) {
			return;
		}
		processed_last_submit = false;
		ApiClient.addExchange(exchange, api_key, api_secret).then((data) => {
			processed_last_submit = true;
			close();
		});
	}
</script>

{#await exchange_promise}
	<!--  -->
{:then}
	<div
		class:overflow-hidden={add_exchange_modal_open}
		hidden={!add_exchange_modal_open}
		class="fixed z-10 inset-0 overflow-y-auto"
	>
		<div
			class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
		>
			<transition
				enter-active-class="ease-out duration-300"
				enter-class="opacity-0"
				enter-to-class="opacity-100"
				leave-active-class="ease-in duration-200"
				leave-class="opacity-100"
				leave-to-class="opacity-0"
			>
				<div class="fixed inset-0 transition-opacity" aria-hidden="true">
					<div class="absolute inset-0 bg-gray-500 opacity-75" />
				</div>
			</transition>

			<!-- This element is to trick the browser into centering the modal contents. -->
			<span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">​</span>
			<transition
				enter-active-class="ease-out duration-300"
				enter-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
				enter-to-class="opacity-100 translate-y-0 sm:scale-100"
				leave-active-class="ease-in duration-200"
				leave-class="opacity-100 translate-y-0 sm:scale-100"
				leave-to-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
			>
				<div
					class="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6"
					role="dialog"
					aria-modal="true"
					aria-labelledby="modal-headline"
				>
					<div class="hidden sm:block absolute top-0 right-0 pt-4 pr-4">
						<button
							on:click={close}
							type="button"
							class="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
						>
							<svg
								class="h-6 w-6"
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
								aria-hidden="true"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M6 18L18 6M6 6l12 12"
								/>
							</svg>
						</button>
					</div>
					<div class="sm:items-start">
						<div
							class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10"
						>
							<svg
								class="h-6 w-6 mx-auto fill-current"
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
								><path fill="none" d="M0 0h24v24H0z" /><path
									d="M11 11V5h2v6h6v2h-6v6h-2v-6H5v-2z"
								/></svg
							>
						</div>
						<div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
							<h3 class="text-lg leading-6 font-medium text-gray-900" id="modal-headline">
								Add Exchange
							</h3>
							<div class="grid grid-cols-6 gap-6">
								<div class="col-span-6">
									<label for="exchange" class="block text-sm font-medium text-gray-700"
										>Exchange</label
									>
									<Select
										containerClasses="rounded-l-md mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm rounded-l-md sm:text-sm border-gray-300 border bg-gray-50 dark:bg-grey-600 text-gray-500 dark:text-grey-300 rounded-md p-2"
										bind:items={supportedExchanges}
										on:select={(selectedValue) => (exchange = selectedValue.detail.value)}
										showChevron={true}
										MultiSelection={false}
									/>
								</div>
								<div class="col-span-6">
									<label for="key" class="block text-sm font-medium text-gray-700">API Key</label>
									<input
										autocomplete="off"
										placeholder="API Key"
										bind:value={api_key}
										type="text"
										name="key"
										class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm rounded-l-md sm:text-sm border-gray-300 border bg-gray-50 text-gray-500 rounded-md p-2"
									/>
								</div>
								{#if exchange == 'BINANCE'}
									<div class="col-span-6">
										<label for="secret" class="block text-sm font-medium text-gray-700"
											>API Secret</label
										>
										<input
											autocomplete="off"
											placeholder="API Secret"
											bind:value={api_secret}
											type="text"
											name="secret"
											class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm rounded-l-md sm:text-sm border-gray-300 border bg-gray-50 text-gray-500 rounded-md p-2"
										/>
									</div>
								{/if}
							</div>
							<div class="mt-5 sm:mt-4">
								<button
									on:click={close}
									type="button"
									class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
								>
									Cancel
								</button>
								<button
									on:click={submit}
									disabled={!submit_enabled}
									class:opacity-50={!submit_enabled}
									type="button"
									class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
								>
									Add Exchange
								</button>
							</div>
						</div>
					</div>
				</div></transition
			>
		</div>
	</div>
{/await}
