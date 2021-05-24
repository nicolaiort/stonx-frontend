<script lang="ts">
	import { ApiClient } from './ApiClient';
	import * as cryptoIcons from 'base64-cryptocurrency-icons';
	import { IconService } from './IconService';

	export let wallet = {
		id: 'n/a',
		token: 'n/a',
		balance: -1,
		fiat: 0,
		description: ''
	};
	export let current_wallets = [];

	function deleteWallet() {
		ApiClient.deleteWallet(wallet.id).then((result) => {
			current_wallets = current_wallets.filter((w) => !(w.id === wallet.id));
		});
	}
</script>

<div class="flex items-center">
	<div class="flex-shrink-0 rounded-md p-3">
		<img class="h-12 w-12" alt={wallet.token} src={IconService.getTokenIconBase64(wallet.token)} />
	</div>
	<div class="ml-5 flex-1">
		<dt class="text-sm font-medium text-gray-500">
			{wallet.token}
			{#if wallet.description} - {wallet.description}{/if}
		</dt>
		<dd class="items-baseline">
			<div class="text-2xl font-semibold text-gray-900">
				{wallet.fiat.toFixed(2)} €
			</div>
			<div class="text-md font-semibold text-gray-900">
				{wallet.balance}
				<span class="text-sm text-gray-500">{wallet.token}</span>
			</div>
		</dd>
	</div>
	<div class="ml-auto mt-0 mb-auto mr-4 w-0">
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
			class="h-10 w-10 p-1 rounded-md text-black hover:bg-red-700 hover:text-white fill-current"
			on:click={() => {
				deleteWallet();
			}}
			><path fill="none" d="M0 0h24v24H0z" /><path
				d="M17 6h5v2h-2v13a1 1 0 01-1 1H5a1 1 0 01-1-1V8H2V6h5V3a1 1 0 011-1h8a1 1 0 011 1v3zm1 2H6v12h12V8zm-9 3h2v6H9v-6zm4 0h2v6h-2v-6zM9 4v2h6V4H9z"
			/></svg
		>
	</div>
</div>
