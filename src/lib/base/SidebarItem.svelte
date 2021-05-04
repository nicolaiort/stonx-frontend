<script lang="ts">
	export let title = 'Title';
</script>

<!-- Current: "text-gray-300", Default: "text-gray-400 group-hover:text-gray-300" -->
<a
	href="/"
	class="bg-gray-900 text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md"
>
	<slot />
	{title}
</a>
