<script context="module">
	import { passwordStrength } from 'check-password-strength';
	export function password_strong_enough(password_change) {
		let strength = passwordStrength(password_change);
		return (
			strength?.contains.includes('lowercase') &&
			strength?.contains.includes('uppercase') &&
			strength?.contains.includes('number') &&
			strength?.length > 9
		);
	}
	export function password_strong_enough_and_equal(password_change, password_confirm) {
		return password_strong_enough(password_change) && password_change === password_confirm;
	}
</script>

<script>
	import { passwordStrength as Strength } from 'check-password-strength';
	export let password_change;
	export let password_confirm;

	$: strength = Strength(password_change);
	$: passwords_match = password_confirm == password_change;
</script>

<div>
	<label for="password" class="block text-sm font-medium text-gray-700 dark:text-gray-300"
		>Problems</label
	>
	<ul class="ml-4 list-disc dark:text-white">
		{#if !strength.contains.includes('lowercase')}
			<li>Password must contain a lowercase letter!</li>
		{/if}
		{#if !strength.contains.includes('uppercase')}
			<li>Password must contain an uppercase letter!</li>
		{/if}
		{#if !strength.contains.includes('number')}
			<li>Password must contain a number!</li>
		{/if}
		{#if !(strength.length > 9)}
			<li>Password must be at least 10 characters long!</li>
		{/if}
		{#if !(passwords_match == true)}
			<li>Passwords don't match!</li>
		{/if}
	</ul>
</div>
