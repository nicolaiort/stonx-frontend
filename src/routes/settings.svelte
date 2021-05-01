<script lang="ts">
	import { ApiClient } from '$lib/ApiClient';

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
	$: error = '';
	$: update_general_enabled =
		(username != original_data.username || email != original_data.email) &&
		email != '' &&
		username != '';
	$: update_password_enabled = password == repeat_password && password != '';

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
				if (result.status != 200) {
					error = result.data.message;
				} else {
					email = result.data.email;
					username = result.data.username;
				}
			});
		}
	}

	function updatePassword() {
		if (processed_last_submit === true) {
			processed_last_submit = false;
			error = '';
			ApiClient.updateMe(original_data.email, original_data.username, password, undefined).then(
				(result) => {
					processed_last_submit = true;
					password = '';
					repeat_password = '';
					console.log('Password updated!');
				}
			);
		}
	}
</script>

<div class="mx-10 my-2">
	<h2 class="my-4 text-4xl font-semibold dark:text-gray-400">User Settings</h2>

	<div
		class="pb-2 flex items-center justify-between text-gray-600
				dark:text-gray-400 border-b dark:border-gray-600"
	>
		<!-- Header -->
	</div>
	<div class="mt-4">
		{#await promises[1]}
			<p>Loading data....</p>
		{:then}
			<div class="mt-5 md:mt-0 md:col-span-2">
				<div class="shadow sm:rounded-md sm:overflow-hidden bg-gray-600 w-1/2">
					<div class="px-4 py-5 space-y-6 sm:p-6">
						<!-- <div>
							svelte-ignore a11y-label-has-associated-control
							<label class="block text-sm font-medium text-gray-700">
								{$_('profile-picture')}
							</label>
							<div class="mt-2 flex items-center">
								<span class="inline-block h-20 w-20 rounded-full overflow-hidden bg-gray-100">
									<img
										alt={$_('profile-picture')}
										class="h-20 w-20 rounded-full overflow-hidden bg-gray-100"
										src={editable.profilePic || 'https://lauf-fuer-kaya.de/lfk-logo.png'}
									/>
								</span>
								<button
									type="button"
									class="ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
								>
									Change
								</button>
							</div>
						</div> -->
						{#if error}
							<div class="text-white px-6 py-4 border-0 rounded relative mb-4 bg-red-500">
								<span class="inline-block align-middle mr-8">
									<b>Encountered a problem while updating your profile</b><br />
									{error}
								</span>
							</div>
						{/if}
						<div class="text-sm w-full">
							<label for="username" class="font-medium text-gray-700 dark:text-gray-100"
								>Username</label
							>
							<input
								autocomplete="off"
								placeholder="Username"
								type="text"
								bind:value={username}
								name="username"
								class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm rounded-l-md sm:text-sm border-gray-300 border bg-gray-50 text-gray-500 dark:bg-gray-900 dark:text-gray-100 rounded-md p-2"
							/>
						</div>
						<div class="text-sm w-full">
							<label for="email" class="font-medium text-gray-700 dark:text-gray-100">Email</label>
							<input
								autocomplete="off"
								placeholder="Email"
								type="email"
								bind:value={email}
								name="email"
								class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm rounded-l-md sm:text-sm border-gray-300 border bg-gray-50 text-gray-500 dark:bg-gray-900 dark:text-gray-100 rounded-md p-2"
							/>
						</div>
						{#if !validateEmail(email)}
							<span
								class="flex items-center font-medium tracking-wide text-red-500 dark:text-gray-50 text-xs mt-1 ml-1"
								>Email is not valid</span
							>
						{/if}
					</div>
					<div class="px-4 py-3 text-right sm:px-6">
						<button
							type="submit"
							disabled={!update_general_enabled}
							class:opacity-50={!update_general_enabled}
							on:click={updateGeneral}
							class="w-full justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
						>
							Save changes
						</button>
					</div>
				</div>
			</div>
			<br />
			<div class="mt-5 md:mt-0 md:col-span-2">
				<div class="shadow sm:rounded-md sm:overflow-hidden bg-gray-600 w-1/2">
					<div class="px-4 py-3 text-left sm:px-6">
						<label for="new_password" class="font-medium text-gray-700 dark:text-gray-100"
							>New password</label
						>
						<div class="-mt-px relative">
							<input
								aria-label="Passoword"
								type="password"
								bind:value={password}
								class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm rounded-l-md sm:text-sm border-gray-300 border bg-gray-50 text-gray-500 dark:bg-gray-900 dark:text-gray-100 rounded-md p-2"
								placeholder="Password"
							/>
						</div>
						<label for="new_password" class="font-medium text-gray-700 dark:text-gray-100"
							>Confirm the new password</label
						>
						<div class="-mt-px relative">
							<input
								aria-label="Repeat password"
								type="password"
								bind:value={repeat_password}
								class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm rounded-l-md sm:text-sm border-gray-300 border bg-gray-50 text-gray-500 dark:bg-gray-900 dark:text-gray-100 rounded-md p-2"
								placeholder="Repeat password"
							/>
						</div>
					</div>
					<div class="px-4 py-3 text-right sm:px-6">
						<button
							type="submit"
							disabled={!update_password_enabled}
							class:opacity-50={!update_password_enabled}
							on:click={updatePassword}
							class="w-full justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
						>
							Update password
						</button>
					</div>
				</div>
			</div>
		{/await}
	</div>
</div>
