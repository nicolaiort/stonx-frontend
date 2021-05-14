<script lang="ts">
	import { ApiClient } from '$lib/ApiClient';
	import ExchangeCard from '$lib/ExchangeCard.svelte';
	import AddExchangeModal from '$lib/modals/AddExchangeModal.svelte';
	import DeleteUserModal from '$lib/modals/DeleteUserModal.svelte';
	import PasswordStrength, { password_strong_enough_and_equal } from '$lib/PasswordStrength.svelte';

	$: original_data = {
		username: '',
		email: '',
		password: '',
		exchanges: []
	};
	$: email = '';
	$: username = '';
	$: password = '';
	$: repeat_password = '';
	$: processed_last_submit = true;
	$: error_general = '';
	$: update_general_enabled =
		(username != original_data.username || email != original_data.email) &&
		email != '' &&
		username != '';
	$: update_password_enabled = password_strong_enough_and_equal(password, repeat_password);
	$: show_delete_modal = false;
	$: show_add_exchange_modal = false;

	let promises: Promise<any>[] = new Array<Promise<any>>();

	promises.push(
		ApiClient.getMe().then((res) => {
			original_data = res;
			username = original_data.username;
			email = original_data.email;
		})
	);

	function validateEmail(email): boolean {
		const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return re.test(String(email).toLowerCase());
	}

	function updateGeneral() {
		if (processed_last_submit === true) {
			processed_last_submit = false;
			ApiClient.updateMe(email, username, undefined).then((result) => {
				processed_last_submit = true;
				error_general = '';
				if (result.status != 200) {
					error_general = result.data.message;
				} else {
					email = result.data.email;
					original_data.email = result.data.email;
					username = result.data.username;
					original_data.username = result.data.username;
				}
			});
		}
	}

	function updatePassword() {
		if (processed_last_submit === true) {
			processed_last_submit = false;
			ApiClient.updateMe(original_data.email, original_data.username, password).then((result) => {
				processed_last_submit = true;
				password = '';
				repeat_password = '';
			});
		}
	}

	function deleteMe() {
		show_delete_modal = true;
	}
</script>

{#await Promise.all(promises)}
	<p>Loading data....</p>
{:then}
	<DeleteUserModal modal_open={show_delete_modal} />
	<AddExchangeModal
		add_exchange_modal_open={show_add_exchange_modal}
		current_exchanges={original_data.exchanges}
	/>
	<div>
		<div class="max-w-7xl px-4 sm:px-6 md:px-8">
			<h1 class="text-2xl font-semibold text-gray-900">Settings</h1>
		</div>
		<div class="max-w-7xl py-5 px-4 sm:px-6 lg:px-8">
			<div class="mt-5 md:mt-0 md:col-span-2">
				<div class="max-w-3xl mb-4">
					<div class="bg-white shadow sm:rounded-lg">
						<div class="px-4 py-5 sm:p-6">
							<h3 class="text-lg leading-6 font-medium text-gray-900">Profile data</h3>
							<div class="mt-2 max-w-xl text-sm text-gray-500">
								<p>Change the username or email you want associated with your account.</p>
							</div>
							{#if error_general}
								<div class="text-white px-6 py-4 border-0 rounded relative mb-4 bg-red-500">
									<span class="inline-block align-middle mr-8">
										<b>Encountered a problem while updating your profile</b><br />
										{error_general}
									</span>
								</div>
							{/if}
							<div class="mt-5 sm:items-center">
								<div class="max-w-xs w-full">
									<label for="email">Username</label>
									<input
										autocomplete="off"
										placeholder="Username"
										type="text"
										bind:value={username}
										name="username"
										class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-lg border border-gray-600 rounded-md"
									/>
								</div>
								<div class="max-w-xs w-full">
									<label for="email">Email</label>
									<input
										autocomplete="off"
										placeholder="Email"
										type="email"
										bind:value={email}
										name="email"
										class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-lg border border-gray-600 rounded-md"
									/>
								</div>
								{#if !validateEmail(email)}
									<span
										class="flex items-center font-medium tracking-wide text-red-500 text-sm mt-1"
										>Email is not valid</span
									>
								{/if}
							</div>
							<div class="text-right">
								<button
									type="submit"
									disabled={!update_general_enabled}
									class:opacity-50={!update_general_enabled}
									on:click={updateGeneral}
									class="mt-3 w-full inline-flex items-center justify-center px-4 py-2 border border-transparent shadow-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
								>
									Save
								</button>
							</div>
						</div>
					</div>
				</div>
				<div class="max-w-3xl mb-4">
					<div class="bg-white shadow sm:rounded-lg">
						<div class="px-4 py-5 sm:p-6">
							<h3 class="text-lg leading-6 font-medium text-gray-900">Exchanges</h3>
							<div class="mt-2 max-w-xl text-sm text-gray-500">
								<p>Connect to a new exchange or remove an existing connection.</p>
							</div>
							<dl
								class="grid grid-cols-1 gap-5 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 text-black"
							>
								{#if original_data.exchanges.includes('BITPANDA')}
									<ExchangeCard title="BitPanda">
										<svg
											class="h-12 mx-auto fill-current"
											xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 887.77 1338.35"
										>
											<path
												d="M447.18 3.35a318.06 318.06 0 00-40.77 10.26c-11.57 3.68-27.62 8.68-35.51 11.05s-18.68 5.79-23.67 7.63-21.57 7.37-36.83 11.84c-15.26 4.73-38.14 12.1-51.29 16.31-12.89 4-30.25 9.47-38.14 11.57-7.89 2.37-18.68 5.79-23.67 7.63s-16.31 5.52-25 7.89c-8.68 2.63-20 6-25 7.89s-16.31 5.52-25 7.89c-8.68 2.63-20 6-25 7.89s-16.31 5.52-25 7.89c-8.68 2.63-20 6-25 8.15A132.18 132.18 0 0131.05 132c-4.21 1.05-7.37 3.16-7.37 5.26 0 3.16 93.38 75.5 106.8 82.6 5 2.63 21-.26 37.88-6.84 3.68-1.32 13.68-4.47 22.36-7.1 8.68-2.37 20-6 25-7.89s16.31-5.26 25-7.89c8.68-2.37 20-6.05 25-7.89s16.31-5.52 25-7.89c8.68-2.63 20-6.05 25-7.89s15.78-5.26 23.67-7.63c7.89-2.1 25.25-7.63 38.14-11.57 29.46-9.47 71.29-22.62 103.9-32.88 13.68-4.21 29.2-9.21 34.2-11s16.31-5.26 25-7.89c8.68-2.37 18.68-5.52 22.1-7.1 9.73-3.68 49.45-10.26 68.66-11.31 22.36-1.05 21.57-1.05 20.52-4-1.84-5.52-51-39.46-71.29-49.19-28.41-13.68-35.77-16-62.34-20.52-26.38-4.5-44.28-4.5-71.1-.03zM582.65 112.78c-10 2.63-21.31 6-25 7.37s-18.94 6-34.2 10.79-31.83 10-36.83 11.84-15.77 5.22-23.62 7.63c-7.89 2.1-25.78 7.63-39.46 12.1s-31.57 10-39.46 12.1c-7.89 2.37-18.68 5.79-23.67 7.63s-21.57 7.37-36.83 11.84c-15.26 4.73-37.62 11.84-50 15.78s-34.2 10.79-48.66 15.26c-57.61 18.15-67.08 21.31-72.34 24.2s-5.26 3.42-5.26 388v385.37h9.21a51.56 51.56 0 0017.62-3.68c4.73-1.84 15.78-5.52 24.46-8.15 8.68-2.37 20-6.05 25-7.89 5-1.58 15.78-5.26 23.67-7.89 7.89-2.37 15.26-6.05 16.31-7.63s2.1-43.93 2.1-93.91c0-69.71.79-91.8 3.42-93.91 3.16-2.63 22.36-9.21 51.82-17.89 7.89-2.37 18.68-5.79 23.67-7.63s16.31-5.52 25-7.89c8.68-2.63 20-6.05 25-7.89s16.31-5.52 25-7.89c8.68-2.63 20-6.05 25-7.89s16.31-5.52 25-7.89c8.68-2.63 20-6 25-7.89s16.31-5.52 25-7.89c8.68-2.63 20-6 25-7.89s16.31-5.26 25-7.89c8.68-2.37 20-6.05 25-7.89s16.31-5.26 25-7.89 20.25-6.31 25.78-8.15c13.68-5.26 42.88-4.73 58.66 1.05 27.09 9.47 47.88 29.46 60.24 58.4 4.73 10.52 5.26 17.89 5.26 77.6 0 60.5-.53 67.08-5.79 83.12-13.15 40-35 75.23-66 107.06-31.57 32.09-69.45 54.45-115 67.6-8.68 2.63-20 6-25 7.89s-16.31 5.52-25 7.89c-8.68 2.63-20 6-25 7.89s-16.31 5.52-25 7.89c-8.68 2.63-20 6-25 7.89s-16.31 5.52-25 7.89c-8.68 2.63-20 6.05-25 7.89s-15.78 5.26-23.67 7.63c-25.25 7.37-66.81 20.52-76.28 23.94-5 1.84-16.31 5.52-25 7.89-8.68 2.63-20 6-25 7.89s-16.31 5.52-25 7.89c-8.68 2.63-20 6-25 7.89s-16.31 5.26-25 7.89c-8.68 2.37-20 6-25 7.89s-15.78 5.26-23.67 7.63c-7.89 2.1-25.78 7.63-39.46 12.1-13.67 4.21-30.77 9.73-38.13 12.13-24.2 7.63-35.51 12.1-35.51 13.94 0 2.89 111.8 84.44 116 84.44 1.58 0 12.89-3.42 25.52-7.63 12.63-4 35.25-11.31 50.51-16s38.41-12.1 51.29-16.31c13.15-3.95 30.25-9.47 38.14-11.57 7.89-2.37 18.68-5.79 23.67-7.63s16.31-5.52 25-7.89c8.68-2.63 20-6 25-7.89s16.31-5.52 25-7.89c8.68-2.63 20-6 25-7.89s16.31-5.52 25-7.89c8.68-2.63 20-6 25-7.89s16.31-5.52 25-7.89c8.68-2.63 20-6 25-7.89s16.31-5.52 25-7.89c8.68-2.63 20-6.05 25-7.89s16.31-5.26 25-7.89c8.68-2.37 20-6 25-7.89 5-1.58 15.78-5.26 23.67-7.63 28.15-8.68 49.45-17.89 79.18-33.93 67.6-36.3 120.21-102.59 144.15-182 13.94-46 14.73-52.87 14.73-144.68 0-81.81-.26-87.86-5.79-104.17-6.31-19.73-18.41-43.14-31.57-60.76-10.52-14.47-42.35-44.72-56.56-53.66-5.52-3.68-10-8.15-10-10.52 0-2.1 5-10.78 11.31-18.94 13.68-18.68 15.52-21.57 25.52-42.09 13.94-28.41 24.46-65.24 29.2-101.8 4.47-32.09 4.21-122 0-140.73-13-54.56-45.63-104.28-89.56-136.65-24.73-18.15-41.3-26-74.18-35.51-21.26-6.07-78.88-5.55-103.61 1.29zm81.55 118.37c33.67 11.31 60 40.25 68.39 75.5 8.15 33.14 2.63 110.48-10.26 147-5 13.68-18.41 38.67-27.36 50.77-20.25 27.88-57.34 53.14-93.91 64.18-8.68 2.63-20 6.31-25 8.15s-16.31 5.52-25 7.89c-8.68 2.63-20 6.05-25 7.89s-16.31 5.52-25 7.89c-8.68 2.63-20 6-25 7.89s-16.31 5.52-25 7.89c-8.68 2.63-20 6-25 7.89s-16.31 5.52-25 7.89c-8.68 2.63-20 6.05-25 7.89s-16.31 5.26-25 7.89c-8.68 2.37-20 6.05-25 7.89s-16.31 5.26-25 7.89c-8.68 2.37-18.41 5.52-21.83 6.84-14.47 5.79-13.68 16.31-13.68-164.67v-167l11.31-5c6-2.63 17.62-6.84 25.52-9.21 13.42-3.95 33.41-10 89.44-27.88 12.36-3.95 34.72-11.05 50-15.78 15.26-4.47 31.83-10 36.83-11.84s15.78-5.26 23.67-7.63c15.78-4.47 50.77-15.52 88.12-27.62 29.56-9.7 51.14-10.22 73.76-2.6z"
											/><path
												d="M612.91 256.93a88.41 88.41 0 00-17.62 6.31l-8.42 4.47-1 53.4c-.79 58.66-1.58 62.61-18.41 85.23-9.73 13.42-34.46 32.36-42.35 32.36-2.1 0-7.89 1.58-12.63 3.68a218.58 218.58 0 01-24.48 8.15c-8.68 2.63-20 6.05-25 7.89s-16.31 5.26-25 7.89c-8.68 2.37-20 6.05-25 7.89s-15.78 5.26-23.67 7.63c-26.57 7.63-67.08 20.52-76.28 23.94-5 1.84-11.31 4.21-13.68 5-4.21 1.32-4.73 6.58-4.73 62.08 0 49.45.53 60.5 3.68 60.5 1.84 0 12.89-2.89 24.2-6.58 11.57-3.68 27.36-8.42 35.25-10.79s18.68-5.79 23.67-7.63 16.31-5.52 25-7.89c8.68-2.63 20-6.05 25-7.89s21.57-7.37 36.83-11.84c15.26-4.73 38.41-12.1 51.29-16.31 13.15-3.95 30.25-9.47 38.14-11.57 7.89-2.37 18.41-6.05 23.15-7.89 4.73-2.1 10.52-3.68 12.63-3.68s11-3.42 19.47-7.63C660.28 510 684.74 480 700.79 425.27c6.31-21.57 6.05-114.69-.26-126.79-7.63-14.73-14.73-22.89-28.67-32.09-11.31-7.63-16.57-9.21-31.57-10.26-10.02-.77-22.39-.25-27.38.8z"
											/><path
												d="M1.84 167C.79 167.76 0 405.82 0 695.7c0 468.75.53 527.15 4 528.47 2.37 1 7.37.53 11.31-1.05 4-1.32 19.47-6.31 34.72-11s38.41-12.1 51.29-16.31c13.15-4 30.25-9.47 38.14-11.57 7.89-2.37 18.41-6 23.15-7.89 4.73-2.1 10.26-3.68 12.36-3.68s7.63-1.58 12.36-3.68c4.73-1.84 15.26-5.52 23.15-7.89 7.89-2.1 25.25-7.63 38.14-11.57 13.15-4.21 36-11.57 51.29-16.31s38.41-12.1 51.29-16.31c13.15-3.95 30.25-9.47 38.14-11.57 7.89-2.37 18.68-5.79 23.67-7.63s16.31-5.52 25-7.89c8.68-2.63 20-6 25-7.89s21.57-7.37 36.83-11.84c27.09-8.42 61.82-19.47 88.12-27.88 62.87-20.25 117.58-72.08 142.57-135.21 10-25.52 11.84-36.56 13.15-84.7 1-42.35.79-51.29-3.42-64.45-5.26-17.89-18.41-35-33.67-45-9.21-6.05-13.68-6.84-31.83-7.1-14.47 0-25.25 1.58-34.72 5L626 716v55.24c0 45-1 59.19-5 75.23-6.31 26.3-16.84 43.93-36.83 62.61-8.68 8.15-43.93 26.83-50.51 26.83-2.89 0-20.25 5.26-39.19 11.84-5 1.84-16.31 5.26-25 7.89-8.68 2.37-20 6-25 7.89s-15.78 5.26-23.67 7.63c-7.89 2.1-25 7.63-38.14 11.57-12.89 4.21-36 11.57-51.29 16.31-15.26 4.47-31.83 10-36.83 11.84s-16.31 5.26-25 7.89c-8.68 2.37-20 6-25 7.89s-15.78 5.26-23.67 7.63c-13.94 4-51 15.78-81.55 25.52-10.26 3.16-15.26 3.68-17.62 1.84-2.63-2.1-3.42-84.7-3.42-406.94 0-319.6-.79-405.1-3.16-408.52-1.84-2.1-22.36-18.15-45.51-35.25-23.15-16.84-46.56-34.2-51.82-38.41-9.9-7.66-13.05-8.72-15.95-5.53z"
											/></svg
										>
									</ExchangeCard>
								{/if}
								{#if original_data.exchanges.includes('BINANCE')}
									<ExchangeCard title="Binance">
										<svg
											class="h-12 mx-auto fill-current"
											xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 2500.01 2500"
										>
											<path
												class="cls-1"
												d="M764.48 1050.52L1250 565l485.75 485.73 282.5-282.5L1250 0 482 768l282.49 282.5M0 1250l282.51-282.55L565 1249.94l-282.51 282.51zm764.48 199.51L1250 1935l485.74-485.72 282.65 282.35-.14.15L1250 2500l-768-768-.4-.4 282.91-282.12M1935 1250.12l282.51-282.51L2500 1250.1l-282.5 282.51z"
											/><path
												class="cls-1"
												d="M1536.52 1249.85h.12L1250 963.19 1038.13 1175l-24.34 24.35-50.2 50.21-.4.39.4.41L1250 1536.81l286.66-286.66.14-.16-.26-.14"
											/></svg
										>
									</ExchangeCard>
								{/if}
								{#if !original_data.exchanges.includes('BINANCE') || !original_data.exchanges.includes('BITPANDA')}
									<button
										on:click={() => {
											show_add_exchange_modal = true;
										}}
									>
										<ExchangeCard title="Add">
											<svg
												class="h-12 mx-auto fill-current"
												xmlns="http://www.w3.org/2000/svg"
												viewBox="0 0 24 24"
												><path fill="none" d="M0 0h24v24H0z" /><path
													d="M11 11V5h2v6h6v2h-6v6h-2v-6H5v-2z"
												/></svg
											>
										</ExchangeCard>
									</button>
								{/if}
							</dl>
						</div>
					</div>
				</div>
				<div class="max-w-3xl mb-4">
					<div class="bg-white shadow sm:rounded-lg">
						<div class="px-4 py-5 sm:p-6">
							<h3 class="text-lg leading-6 font-medium text-gray-900">Security</h3>
							<div class="mt-2 max-w-xl text-sm text-gray-500">
								<p>Change your password.</p>
							</div>
							<div class="mt-5 sm:items-center">
								<div class="max-w-xs w-full">
									<label for="email">Password</label>
									<input
										aria-label="Passoword"
										type="password"
										bind:value={password}
										placeholder="Password"
										class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-lg border border-gray-600 rounded-md"
									/>
								</div>
								<div class="max-w-xs w-full">
									<label for="email">Confirm your password</label>
									<input
										aria-label="Repeat password"
										type="password"
										bind:value={repeat_password}
										placeholder="Repeat password"
										class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-lg border border-gray-600 rounded-md"
									/>
								</div>
								<PasswordStrength
									bind:password_change={password}
									bind:password_confirm={repeat_password}
								/>
							</div>
							<div class="text-right">
								<button
									type="button"
									disabled={!update_password_enabled}
									class:opacity-50={!update_password_enabled}
									on:click={updatePassword}
									class="mt-3 w-full inline-flex items-center justify-center px-4 py-2 border border-transparent shadow-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
								>
									Save
								</button>
							</div>
						</div>
					</div>
				</div>
				<div class="max-w-3xl mb-4">
					<div class="bg-white shadow sm:rounded-lg">
						<div class="px-4 py-5 sm:p-6">
							<h3 class="text-lg leading-6 font-medium text-gray-900">Danger Zone</h3>
							<div class="mt-2 max-w-xl text-sm text-gray-500">
								<p>Please be carfull - changes here can break your profile</p>
							</div>
							<div class="mt-5 text-right">
								<button
									type="button"
									on:click={deleteMe}
									class="inline-flex items-center justify-center px-4 py-2 border border-transparent font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:text-sm"
								>
									Delete account
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
{/await}
