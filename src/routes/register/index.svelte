<script lang="ts">
	import { ApiClient } from '$lib/ApiClient';
	import UserStore from '$lib/UserStore';
	import * as localForage from 'localforage';
	import { onMount } from 'svelte';

	$: username = '';
	$: email = '';
	$: password = '';
	$: repeat_password = '';
	$: bitpanda_api_token = '';
	$: error = '';
	$: signup_enabled =
		username != '' &&
		email != '' &&
		password != '' &&
		password == repeat_password &&
		bitpanda_api_token != '' &&
		validateEmail(email);

	UserStore.init();

	onMount(() => {
		localForage.getItem('userdata', (err, value: any) => {
			if (value) {
				if (value.token) {
					UserStore.login(value);
					location.replace('/');
				}
			}
		});
	});

	async function signup() {
		error = null;
		let signupRequest = await ApiClient.signup(email, username, password, bitpanda_api_token);
		if (signupRequest.status != 200 && signupRequest.status != 201) {
			error = signupRequest.data.message;
		} else {
			UserStore.login(signupRequest.data);
			location.replace('/');
		}
	}

	function handleKeydown(e) {
		if (e.keyCode === 13 && signup_enabled) {
			signup();
		}
	}

	function validateEmail(email): boolean {
		const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return re.test(String(email).toLowerCase());
	}
</script>

<div class="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-700">
	<div class="max-w-md w-full py-12 px-6" role="main">
		<img style="height:10rem;" class="mx-auto" src="/stonx.jpg" alt="" />
		<p class="mt-6 text-lg text-center font-bold dark:text-gray-300">Stonksclient</p>
		<p class="mt-6 text-sm text-center dark:text-gray-300">Sign up</p>
		{#if error}
			<div class="text-white px-6 py-4 border-0 rounded relative mb-4 bg-red-500">
				<span class="inline-block align-middle mr-8">
					<b>Encountered a problem while signing you up</b><br />
					{error}
				</span>
			</div>
		{/if}
		<div>
			<div class="rounded-md shadow-sm">
				<div class="-mt-px relative mb-2">
					<label for="password" class="block text-sm font-medium text-gray-700 dark:text-gray-300"
						>Username</label
					>
					<!-- svelte-ignore a11y-autofocus -->
					<input
						autofocus
						aria-label="username"
						type="text"
						required={true}
						class="border-gray-300 dark:text-gray-300 dark:placeholder-gray-300 placeholder-gray-500 appearance-none rounded relative block w-full px-3 py-2 border rounded-t-md focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:text-sm dark:bg-gray-700"
						on:keydown={handleKeydown}
						placeholder="Username"
						bind:value={username}
					/>
				</div>
				<div class="-mt-px relative mb-2">
					<label for="password" class="block text-sm font-medium text-gray-700 dark:text-gray-300"
						>Email address</label
					>
					<!-- svelte-ignore a11y-autofocus -->
					<input
						autofocus
						aria-label="Email"
						type="text"
						required={true}
						class="border-gray-300 dark:text-gray-300 dark:placeholder-gray-300 placeholder-gray-500 appearance-none rounded relative block w-full px-3 py-2 border focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:text-sm dark:bg-gray-700"
						on:keydown={handleKeydown}
						placeholder="Email"
						bind:value={email}
					/>
				</div>
				<div class="-mt-px relative">
					<label for="password" class="block text-sm font-medium text-gray-700 dark:text-gray-300"
						>Password</label
					>
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
				<div class="-mt-px mb-2 relative">
					<input
						aria-label="Repeat Password"
						type="password"
						required={true}
						bind:value={repeat_password}
						class="border-gray-300 dark:text-gray-300 dark:placeholder-gray-300 placeholder-gray-500 appearance-none rounded-none relative block w-full px-3 py-2 border rounded-t focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:text-sm dark:bg-gray-700"
						on:keydown={handleKeydown}
						placeholder="Repeat Password"
					/>
				</div>

				<div class="-mt-px mb-2 relative">
					<label for="password" class="block text-sm font-medium text-gray-700 dark:text-gray-300"
						>Bitpanda Api Token (Scope: Guthaben)</label
					>
					<!-- svelte-ignore a11y-autofocus -->
					<input
						autofocus
						aria-label="Bitpanda Api Key"
						type="password"
						required={true}
						class="border-gray-300 dark:text-gray-300 dark:placeholder-gray-300 placeholder-gray-500 appearance-none rounded relative block w-full px-3 py-2 border focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:text-sm dark:bg-gray-700"
						on:keydown={handleKeydown}
						placeholder="Bitpanda api key"
						bind:value={bitpanda_api_token}
					/>
				</div>

				{#if !signup_enabled}
					<div class="-mt-px relative">
						<label for="password" class="block text-sm font-medium text-gray-700 dark:text-gray-300"
							>Problems</label
						>
						<ul class="ml-4 list-disc dark:text-white">
							{#if username == ''}<li>Username can't be empty!</li> {/if}
							{#if !validateEmail(email)}<li>Email is invalid!</li> {/if}
							{#if password == ''}<li>Password can't be empty</li> {/if}
							{#if password != repeat_password}<li>Passwords don't match!</li> {/if}
							{#if bitpanda_api_token == ''}<li>Bitpanda api token can't be empty!</li> {/if}
						</ul>
					</div>
				{/if}
			</div>

			<div class="mt-5">
				<button
					on:click={signup}
					type="submit"
					disabled={!signup_enabled}
					class:opacity-50={!signup_enabled}
					class="relative block w-full py-2 px-3 border border-transparent rounded-b-md text-white font-semibold bg-gray-800 hover:bg-gray-700 dark:hover:bg-gray-600 focus:bg-gray-900 focus:outline-none focus:shadow-outline sm:text-sm"
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
					Sign up
				</button>
			</div>
			<div class="mt-2">
				<a
					href="/"
					class="block w-full text-center dark:text-white py-2 px-3 border border-gray-300 rounded-md font-medium hover:border-gray-400 focus:outline-none focus:border-gray-400 sm:text-sm"
				>
					Login
				</a>
			</div>
		</div>
	</div>
</div>
