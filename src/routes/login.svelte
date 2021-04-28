<script lang="ts">
	import { ApiClient } from '$lib/ApiClient';
	import UserStore from '$lib/UserStore';
	let username: string = '';
	let password: string = '';

	async function login() {
		let login = await ApiClient.login(username, password);
		UserStore.login(login);
	}

	function handleKeydown(e) {
		if (e.keyCode === 13) {
			login();
		}
	}
</script>

<div class="mx-10 my-2">
	<div class="mt-4">
		<div class="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-700">
			<div class="max-w-md w-full py-12 px-6" role="main">
				<img
					style="height:10rem;"
					class="mx-auto"
					src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwikimeme.it%2Fwp-content%2Fuploads%2F2020%2F03%2Fstonks-template-meme.jpg"
					alt=""
				/>
				<p class="mt-6 text-lg text-center font-bold dark:text-gray-300">Stonksclient</p>
				<p class="mt-6 text-sm text-center dark:text-gray-300">Login</p>
				<div>
					<div class="rounded-md shadow-sm">
						<div>
							<!-- svelte-ignore a11y-autofocus -->
							<input
								autofocus
								aria-label="Email"
								type="text"
								required={true}
								class="border-gray-300 dark:text-gray-300 dark:placeholder-gray-300 placeholder-gray-500 appearance-none rounded-none relative block w-full px-3 py-2 border rounded-t-md focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:text-sm dark:bg-gray-700"
								on:keydown={handleKeydown}
								placeholder="Email"
								bind:value={username}
							/>
						</div>
						<div class="-mt-px relative">
							<input
								aria-label="Password"
								type="password"
								required={true}
								bind:value={password}
								class="border-gray-300 dark:text-gray-300 dark:placeholder-gray-300 placeholder-gray-500 appearance-none rounded-none relative block w-full px-3 py-2 border rounded-b-md focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:text-sm dark:bg-gray-700"
								on:keydown={handleKeydown}
								placeholder="Password"
							/>
						</div>
					</div>

					<div class="mt-5">
						<button
							on:click={login}
							type="submit"
							class="relative block w-full py-2 px-3 border border-transparent rounded-md text-white font-semibold bg-gray-800 hover:bg-gray-700 dark:hover:bg-gray-600 focus:bg-gray-900 focus:outline-none focus:shadow-outline sm:text-sm"
						>
							<span class="absolute left-0 inset-y pl-3">
								<svg class="h-5 w-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
									<path
										fill-rule="evenodd"
										d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
										clip-rule="evenodd"
									/>
								</svg>
							</span>
							Log in
						</button>
					</div>
				</div>
				<!-- <div class="mt-2">
					<a
						href="/forgot_password"
						class="block w-full text-center py-2 px-3 border border-gray-300 rounded-md font-medium hover:border-gray-400 focus:outline-none focus:border-gray-400 sm:text-sm"
					>
						{$_('forgot_password')}
					</a>
				</div> -->
			</div>
		</div>
	</div>
</div>
