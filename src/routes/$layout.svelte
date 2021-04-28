<script>
	import Sidebar from '$lib/Sidebar.svelte';
	import UserStore from '$lib/UserStore';
	import '../app.postcss';
	import Login from './login.svelte';
	import { onDestroy } from 'svelte';

	$: isLoggedIn = false;

	UserStore.init();
	const unsubscribe = UserStore.subscribe((value) => console.log(value));

	onDestroy(unsubscribe);
</script>

{isLoggedIn}
{#if isLoggedIn}
	<Sidebar>
		<slot />
	</Sidebar>
{:else}
	<Login />
{/if}
