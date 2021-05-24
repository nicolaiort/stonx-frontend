<script>
	import UserStore from '$lib/UserStore';
	import '../app.postcss';
	import Login from '$lib/login.svelte';
	import { onDestroy } from 'svelte';
	import Footer from '$lib/Footer.svelte';
	import BaseLayout from '$lib/base/BaseLayout.svelte';

	$: isLoggedIn = false;

	UserStore.init();
	const unsubscribe = UserStore.subscribe((value) => {
		isLoggedIn = value.isLoggedIn;
	});

	onDestroy(unsubscribe);
</script>

{#if isLoggedIn}
	<BaseLayout>
		<slot />
	</BaseLayout>
{:else}
	<Login />
{/if}
<!--
    Temporary tailwind import fixes for classes that wouldn't be directly used otherwise. 
    Or as others may call it: Real big bullshit time.
 -->
<div class="opacity-50" />
