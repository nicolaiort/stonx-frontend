<script lang="ts">
	import { ApiClient } from '$lib/ApiClient';
	import DeleteUserModal from '$lib/modals/DeleteUserModal.svelte';
	import PasswordStrength, { password_strong_enough_and_equal } from '$lib/PasswordStrength.svelte';

	$: original_data = {
		username: '',
		email: '',
		password: '',
		bitpanda_api_key: ''
	};
	$: email = '';
	$: username = '';
	$: bitpanda_api_key = '';
	$: password = '';
	$: repeat_password = '';
	$: processed_last_submit = true;
	$: error_general = '';
	$: error_providers = '';
	$: update_general_enabled =
		(username != original_data.username || email != original_data.email) &&
		email != '' &&
		username != '';
	$: update_providers_enabled = bitpanda_api_key != '';
	$: update_password_enabled = password_strong_enough_and_equal(password, repeat_password);
	$: show_delete_modal = false;

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
			ApiClient.updateMe(email, username, undefined, undefined).then((result) => {
				processed_last_submit = true;
				error_general = '';
				if (result.status != 200) {
					error_general = result.data.message;
				} else {
					email = result.data.email;
					original_data.email = result.data.email;
					username = result.data.username;
					original_data.username = result.data.email;
				}
			});
		}
	}

	function updateProviders() {
		if (processed_last_submit === true) {
			processed_last_submit = false;
			error_providers = '';
			ApiClient.updateMe(
				original_data.email,
				original_data.username,
				undefined,
				bitpanda_api_key
			).then((result) => {
				processed_last_submit = true;
				if (result.status != 200) {
					error_providers = result.data.message;
				} else {
					bitpanda_api_key = '';
				}
			});
		}
	}

	function updatePassword() {
		if (processed_last_submit === true) {
			processed_last_submit = false;
			ApiClient.updateMe(original_data.email, original_data.username, password, undefined).then(
				(result) => {
					processed_last_submit = true;
					password = '';
					repeat_password = '';
				}
			);
		}
	}

	function deleteMe() {
		show_delete_modal = true;
	}
</script>

<DeleteUserModal modal_open={show_delete_modal} />
<div>
	<div class="max-w-7xl px-4 sm:px-6 md:px-8">
		<h1 class="text-2xl font-semibold text-gray-900">Settings</h1>
	</div>
	<div class="max-w-7xl py-5 px-4 sm:px-6 lg:px-8">
		{#await promises[1]}
			<p>Loading data....</p>
		{:then}
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
				<!-- TODO: Implement a fancier way to add providers -->
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
		{/await}
	</div>
</div>
