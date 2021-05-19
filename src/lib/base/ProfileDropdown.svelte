<script lang="ts">
	import { clickOutside } from 'svelte-use-click-outside';
	import UserStore from '../UserStore';
	$: open = false;
</script>

<div
	class="ml-3 relative"
	use:clickOutside={() => {
		open = false;
	}}
>
	<div>
		<button
			on:click={() => {
				open = !open;
			}}
			class="max-w-xs bg-white flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
			id="user-menu"
			aria-haspopup="true"
		>
			<span class="sr-only">Open user menu</span>
			<img class="h-14 w-14 rounded-full" src="/stonx.webp" alt="Profile Pic" />
		</button>
	</div>
	<transition
		enter-active-class="transition ease-out duration-100"
		enter-class="transform opacity-0 scale-95"
		enter-to-class="transform opacity-100 scale-100"
		leave-active-class="transition ease-in duration-75"
		leave-class="transform opacity-100 scale-100"
		leave-to-class="transform opacity-0 scale-95"
	>
		<div
			hidden={!open}
			class="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5"
			role="menu"
			aria-orientation="vertical"
			aria-labelledby="user-menu"
		>
			<a
				href="/settings"
				class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
				role="menuitem">Settings</a
			>

			<button
				on:click={() => {
					UserStore.logout();
				}}
				class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
				role="menuitem">Sign out</button
			>
		</div>
	</transition>
</div>
