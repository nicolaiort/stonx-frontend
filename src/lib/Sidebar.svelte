<script lang="ts">
	import UserStore from './UserStore';
</script>

<div class="h-screen w-full flex overflow-hidden">
	<nav class="flex flex-col bg-gray-200 dark:bg-gray-900 w-64 px-12 pt-4 pb-6">
		<!-- SideNavBar -->

		<div class="flex flex-row border-b items-center justify-between pb-2">
			<!-- Hearder -->
			<span class="text-xl font-semibold capitalize dark:text-gray-300"> Stonks </span>
		</div>

		<div class="mt-8">
			<!-- User info -->
			<img
				class="h-20 w-20 rounded-full object-fit"
				src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwikimeme.it%2Fwp-content%2Fuploads%2F2020%2F03%2Fstonks-template-meme.jpg"
				alt="enoshima profile"
			/>
			<h2 class="mt-4 text-xl dark:text-gray-300 font-extrabold capitalize">
				Welcome {UserStore.state.email}
			</h2>
			<span class="text-sm dark:text-gray-300">
				<span class="font-semibold text-green-600 dark:text-green-300"> Admin </span>
			</span>
		</div>

		<!-- <button
			class="mt-8 flex items-center justify-between py-3 px-2 text-white
			dark:text-gray-200 bg-green-400 dark:bg-green-500 rounded-lg shadow"
		>
			<span>Add user</span>
			<svg class="h-5 w-5 fill-current" viewBox="0 0 24 24">
				<path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
			</svg>
		</button> -->

		<ul class="mt-2 text-gray-600">
			<!-- Links -->
			<li class="mt-8">
				<a href="/" class="flex ">
					<svg class="fill-current h-5 w-5 dark:text-gray-300" viewBox="0 0 24 24">
						<path
							d="M16 20h4v-4h-4m0-2h4v-4h-4m-6-2h4V4h-4m6
							4h4V4h-4m-6 10h4v-4h-4m-6 4h4v-4H4m0 10h4v-4H4m6
							4h4v-4h-4M4 8h4V4H4v4z"
						/>
					</svg>
					<span class="ml-2 capitalize font-medium text-black
						dark:text-gray-300"> Dashboard </span>
				</a>
			</li>

			<li class="mt-8">
				<a href="/bitpanda" class="flex">
					<svg class="fill-current h-5 w-5 dark:text-gray-300" viewBox="0 0 24 24">
						<path
							d="M19 19H5V8h14m-3-7v2H8V1H6v2H5c-1.11 0-2 .89-2
							2v14a2 2 0 002 2h14a2 2 0 002-2V5a2 2 0
							00-2-2h-1V1m-1 11h-5v5h5v-5z"
						/>
					</svg>
					<span class="ml-2 capitalize font-medium text-black
						dark:text-gray-300"> Bitpanda </span>
				</a>
			</li>
		</ul>

		<div class="mt-auto flex items-center text-red-700 dark:text-red-400">
			<!-- important action -->
			<a href="#home" class="flex items-center">
				<svg class="fill-current h-5 w-5" viewBox="0 0 24 24">
					<path
						d="M16 17v-3H9v-4h7V7l5 5-5 5M14 2a2 2 0 012
						2v2h-2V4H5v16h9v-2h2v2a2 2 0 01-2 2H5a2 2 0 01-2-2V4a2 2
						0 012-2h9z"
					/>
				</svg>
				<span class="ml-2 capitalize font-medium">log out</span>
			</a>
		</div>
	</nav>
	<main
		class="flex-1 flex flex-col bg-gray-100 dark:bg-gray-700 transition
		duration-500 ease-in-out overflow-y-auto"
	>
		<slot />
	</main>
</div>
