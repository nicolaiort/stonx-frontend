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
			current_wallets = current_wallets.filter((w) => (w.id = !wallet.id));
		});
	}
</script>

<div class="flex items-center">
	<div class="flex-shrink-0 rounded-md p-3">
		<img class="h-12 w-12" alt={wallet.token} src={IconService.getTokenIconBase64(wallet.token)} />
	</div>
	<div class="ml-5 w-0 flex-1">
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
</div>
