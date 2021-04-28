<script>
	import Sidebar from '$lib/Sidebar.svelte';
	import UserStore from '$lib/UserStore';
	import '../app.postcss';

	UserStore.init();
</script>

<Sidebar>
	<slot />
</Sidebar>
