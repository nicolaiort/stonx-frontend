<script lang="ts">
	export let title = 'Title';
	export let link = '/';
</script>

<!-- Current: "text-gray-300", Default: "text-gray-400 group-hover:text-gray-300" -->
<a
	href={link}
	class="bg-gray-900 text-white hover:bg-black group flex items-center px-2 py-2 mx-2 text-l font-medium rounded-md"
>
	<slot />
	{title}
</a>
