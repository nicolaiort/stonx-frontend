<script>
	import Sidebar from '$lib/Sidebar.svelte';
	import UserStore from '$lib/UserStore';
	import '../../app.postcss';
	import { onDestroy } from 'svelte';
	import Footer from '$lib/Footer.svelte';

	$: isLoggedIn = false;

	UserStore.init();
	const unsubscribe = UserStore.subscribe((value) => {
		isLoggedIn = value.isLoggedIn;
	});

	onDestroy(unsubscribe);
</script>

<slot />
<Footer />
<!--
    Temporary tailwind import fixes for classes that wouldn't be directly used otherwise. 
    Or as others may call it: Real big bullshit time.
 -->
<div class="opacity-50" />
