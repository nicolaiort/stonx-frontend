<script>
	import ProfileDropdown from '$lib/base/ProfileDropdown.svelte';
	import Sidebar from '$lib/base/Sidebar.svelte';
	let sidebarOpen = false;
</script>

<div style="min-height: 640px;" class="bg-gray-100">
	<div class="h-screen flex overflow-hidden bg-gray-100">
		<Sidebar bind:sidebarOpen />
		<div class="flex flex-col w-0 flex-1 overflow-hidden">
			<div class="relative z-10 flex-shrink-0 flex h-16 bg-white shadow">
				<button
					on:click={() => {
						sidebarOpen = true;
					}}
					class="px-4 border-r border-gray-200 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 md:hidden"
				>
					<span class="sr-only">Open sidebar</span>
					<svg
						class="h-6 w-6"
						x-description="Heroicon name: menu-alt-2"
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
							d="M4 6h16M4 12h16M4 18h7"
						/>
					</svg>
				</button>
				<div class="flex-1 px-4 flex justify-between">
					<div class="flex-1 flex">
						<div class="w-full flex md:ml-0">
							<div
								class="block w-full h-full pl-8 pr-3 py-2 border-transparent text-gray-900 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-0 focus:border-transparent sm:text-sm"
							>
								TODO:
							</div>
						</div>
					</div>
					<div class="ml-4 flex items-center md:ml-6">
						<!-- Profile dropdown -->
						<ProfileDropdown />
					</div>
				</div>
			</div>

			<main class="flex-1 relative overflow-y-auto focus:outline-none" tabindex="0">
				<div class="py-6">
					<slot />
				</div>
			</main>
		</div>
	</div>
</div>
