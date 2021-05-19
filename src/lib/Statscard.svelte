<script lang="ts">
	export let title: string = 'Title';
	export let value: string = 'Value';
	export let link: string = undefined;
	export let link_text: string = 'Linktext';
	export let change_percent: number = undefined;
</script>

<div class="flex flex-col bg-white shadow rounded-lg">
	<div class="flex-grow px-4 py-5 sm:p-6">
		<div class="flex items-center">
			<div class="flex-shrink-0 bg-indigo-500 rounded-md p-3">
				<slot />
			</div>
			<div class="ml-5 w-0 flex-1">
				<dt class="text-sm font-medium text-gray-500 truncate">
					{title}
				</dt>
				<dd class="flex items-baseline">
					<div class="text-2xl font-semibold text-gray-900">
						{value}
					</div>

					{#if change_percent}
						<div
							class:text-green-600={change_percent > 0}
							class:text-red-600={change_percent < 0}
							class="ml-2 flex items-baseline text-sm font-semibold"
						>
							<svg
								class:text-green-500={change_percent > 0}
								class:text-red-500={change_percent < 0}
								class="self-center flex-shrink-0 h-5 w-5"
								fill="currentColor"
								viewBox="0 0 20 20"
								aria-hidden="true"
							>
								{#if change_percent > 0}
									<path
										fill-rule="evenodd"
										d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z"
										clip-rule="evenodd"
									/>
								{:else if change_percent < 0}
									<path
										fill-rule="evenodd"
										d="M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z"
										clip-rule="evenodd"
									/>
								{/if}
							</svg>
							<span class="sr-only">
								{#if change_percent > 0}Increased by{:else if change_percent < 0}Decreased by{/if}
							</span>
							{change_percent}%
						</div>
					{/if}
				</dd>
			</div>
		</div>
	</div>
	{#if link}
		<div class="bg-gray-50 px-4 py-4 sm:px-6 rounded-b-lg">
			<div class="text-sm">
				<a href={link} class="font-medium text-indigo-600 hover:text-indigo-500">
					View all {link_text}</a
				>
			</div>
		</div>
	{/if}
</div>
