<script lang="ts">
	import SidebarItem from './SidebarItem.svelte';

	export let sidebarOpen = true;
</script>

<div hidden={!sidebarOpen} class="md:hidden">
	<div class="fixed w-full inset-0 flex z-40">
		<transition
			enter-active-class="transition-opacity ease-linear duration-300"
			enter-class="opacity-0"
			enter-to-class="opacity-100"
			leave-active-class="transition-opacity ease-linear duration-300"
			leave-class="opacity-100"
			leave-to-class="opacity-0"
		>
			<div
				on:click={() => {
					sidebarOpen = false;
				}}
				hidden={!sidebarOpen}
				class="fixed inset-0"
				aria-hidden="true"
			>
				<div class="absolute inset-0 bg-gray-600 opacity-75" />
			</div>
		</transition>
		<transition
			enter-active-class="transition ease-in-out duration-300 transform"
			enter-class="-translate-x-full"
			enter-to-class="translate-x-0"
			leave-active-class="transition ease-in-out duration-300 transform"
			leave-class="translate-x-0"
			leave-to-class="-translate-x-full"
		>
			<div
				hidden={!sidebarOpen}
				class="relative flex-1 flex flex-col max-w-xs w-full h-full pt-5 pb-4 bg-gray-800"
			>
				<div class="absolute top-0 right-0 bottom-0 -mr-12 pt-2">
					<button
						hidden={!sidebarOpen}
						on:click={() => {
							sidebarOpen = false;
						}}
						class="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
					>
						<span class="sr-only">Close sidebar</span>
						<svg
							class="h-6 w-6 text-white"
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
				<div class="flex-shrink-0 flex items-center px-4">
					<span class="text-white text-2xl">Stonx</span>
				</div>
				<div class="mt-5 flex-1 h-0 overflow-y-auto">
					<nav class="px-2 space-y-1">
						<SidebarItem />
					</nav>
				</div>
			</div>
		</transition>
		<div class="flex-shrink-0 w-14" aria-hidden="true">
			<!-- Dummy element to force sidebar to shrink to fit close icon -->
		</div>
	</div>
</div>

<!-- Static sidebar for desktop -->
<div class="hidden md:flex md:flex-shrink-0">
	<div class="flex flex-col w-64">
		<!-- Sidebar component, swap this element with another sidebar if you like -->
		<div class="flex flex-col h-0 flex-1">
			<div class="flex items-center h-16 flex-shrink-0 px-4 bg-gray-900">
				<span class="text-white text-2xl">Stonx</span>
			</div>
			<div class="flex-1 flex flex-col overflow-y-auto">
				<nav class="flex-1 px-2 py-4 bg-gray-800 space-y-1">
					<SidebarItem />
				</nav>
			</div>
		</div>
	</div>
</div>
