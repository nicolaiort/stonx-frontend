<script lang="ts">
	export let index_name: string = 'Crypto69';
	export let index_amount: number = 420.69;

	function getIndexLogo(index) {
		switch (index) {
			case 'BCI5':
				return 'data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgdmlld0JveD0iMCAwIDM2IDM2Ij48c3R5bGU+PC9zdHlsZT48ZyBpZD0iaWNvbnNfeDJGX2Fzc2V0c194MkZfYXNzZXQtYmNpNSI+PHBhdGggaWQ9IlNoYXBlIiBkPSJNNS4xIDE5LjljLS4xLS41LS4xLTEtLjEtMS41bC4xIDEuNXpNMTggMGM5LjkgMCAxOCA4LjEgMTggMThzLTguMSAxOC0xOCAxOFMwIDI3LjkgMCAxOCA4LjEgMCAxOCAwem0uMiAxOC4xVjMxYy41IDAgMS0uMSAxLjUtLjEgMy44LS41IDcuMS0yLjYgOS4xLTUuNy4zLS40LjUtLjkuOC0xLjNsLTExLjQtNS44em0tMS4xLjNMNS4zIDIxLjFjLjEuNS4zIDEgLjUgMS41IDEuNiA0LjIgNS4zIDcuNCA5LjggOC4yLjUuMSAxIC4yIDEuNS4yVjE4LjR6bTIuNiAyLjJsNy44IDMuOWMtLjQuNi0uOCAxLjEtMS4zIDEuNi0xLjggMS44LTQgMi45LTYuNSAzLjN2LTguOHptLTQuMS0uM3Y5Yy0yLjEtLjUtNC4xLTEuNS01LjctMy4xLTEuMS0xLjEtMi0yLjUtMi42LTMuOWw4LjMtMnpNMjcuNCA5bC04LjMgOC4zIDExIDUuNWMuMi0uNS4zLTEgLjUtMS41LjMtMS4xLjUtMi4zLjUtMy40IDAtMi45LTEtNS42LTIuNi03LjhMMjcuNCA5em0tLjEgMi4yYzEuNCAxLjkgMi4yIDQuMyAyLjIgNi43IDAgLjktLjEgMS44LS4zIDIuN2wtNy41LTMuOCA1LjYtNS42ek0xNyA1Yy0uNSAwLTEgLjEtMS41LjJDOS41IDYuNCA0LjkgMTEuNyA0LjkgMTh2LjNjMCAuNS4xIDEgLjEgMS41bDEyLTIuN1Y1em0tMS41IDEuN3Y5LjJsLTkgMmMwLTUuNCAzLjktMTAgOS0xMS4yem0yLjYtMS44djExLjdsOC40LTguNWMtLjQtLjMtLjgtLjctMS4yLTEtMS43LTEuMS0zLjYtMS45LTUuNy0yLjItLjQuMS0uOSAwLTEuNSAwem0xLjYgMS43YzEuNi4yIDMuMi44IDQuNiAxLjdMMTkuNyAxM1Y2LjZ6bS0xMy45IDE2Yy0uMi0uNS0uMy0xLS41LTEuNWwuNSAxLjV6IiBmaWxsPSIjMWI3Njk4Ii8+PC9nPjwvc3ZnPg==';
			case 'BCI10':
				return 'data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyJ2aWV3Qm94PSIwIDAgMzYgMzYiPjxzdHlsZT48L3N0eWxlPjxnIGlkPSJpY29uc194MkZfYXNzZXRzX3gyRl9hc3NldC1iY2kxMCI+PGcgaWQ9ImluZGV4Ij48cGF0aCBpZD0iU2hhcGVfMV8iIGQ9Ik01LjIgMTkuOGMtLjEtLjUtLjEtMS0uMS0xLjVsLjEgMS41ek0xOC4xLS4xYzkuOSAwIDE4IDguMSAxOCAxOHMtOC4xIDE4LTE4IDE4LTE4LTguMS0xOC0xOCA4LjEtMTggMTgtMTh6bS4yIDE4LjJWMzFjLjUgMCAxLS4xIDEuNS0uMSAzLjgtLjUgNy4xLTIuNiA5LjEtNS43LjMtLjQuNS0uOS44LTEuM2wtMTEuNC01Ljh6bS0xLjEuMkw1LjUgMjEuMWMuMS41LjMgMSAuNSAxLjUgMS42IDQuMiA1LjMgNy40IDkuOCA4LjIuNS4xIDEgLjIgMS41LjJ2LTEuNWwtLjEtMTEuMnptMi43IDIuM2w3LjggMy45Yy0uNC42LS44IDEuMS0xLjMgMS42LTEuOCAxLjgtNCAyLjktNi41IDMuM3YtOC44em0tNC4yLS40djljLTIuMS0uNS00LjEtMS41LTUuNy0zLjEtMS4xLTEuMS0yLTIuNS0yLjYtMy45bDguMy0yek0yNy42IDguOWwtOC4zIDguMyAxMSA1LjVjLjItLjUuMy0xIC41LTEuNS4zLTEuMS41LTIuMy41LTMuNCAwLTIuOS0xLTUuNi0yLjYtNy44LS41LS4zLS44LS43LTEuMS0xLjF6bS0uMSAyLjNjMS40IDEuOSAyLjIgNC4zIDIuMiA2LjcgMCAuOS0uMSAxLjgtLjMgMi43bC03LjUtMy44IDUuNi01LjZ6TTE3LjIgNC45Yy0uNSAwLTEgLjEtMS41LjJDOS42IDYuMyA1IDExLjYgNS4xIDE4di4zYzAgLjUuMSAxIC4xIDEuNWwxMi0yLjdWNC45em0tMS41IDEuOHY5LjJsLTkgMmMtLjEtNS41IDMuOC0xMC4xIDktMTEuMnptMi42LTEuOHYxMS43bDguNC04LjVjLS40LS4zLS44LS43LTEuMi0xQzIzLjggNiAyMS45IDUuMyAxOS44IDVjLS41LS4xLTEtLjEtMS41LS4xem0xLjUgMS43YzEuNi4yIDMuMi44IDQuNiAxLjdsLTQuNiA0LjZWNi42ek01LjkgMjIuNWMtLjItLjUtLjMtMS0uNS0xLjVsLjUgMS41eiIgZmlsbD0iIzI0NDU4YSIvPjwvZz48L2c+PC9zdmc+';
			case 'BCI25':
				return 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzNiAzNiI+PHN0eWxlPjwvc3R5bGU+PHBhdGggaWQ9IlNoYXBlIiBkPSJNNS4yIDE5LjhjLS4xLS41LS4xLTEtLjEtMS41bC4xIDEuNXpNMTguMS0uMWM5LjkgMCAxOCA4LjEgMTggMThzLTguMSAxOC0xOCAxOC0xOC04LjEtMTgtMTggOC4xLTE4IDE4LTE4em0uMiAxOC4yVjMxYy41IDAgMS0uMSAxLjUtLjEgMy44LS41IDcuMS0yLjYgOS4xLTUuNy4zLS40LjUtLjkuOC0xLjNsLTExLjQtNS44em0tMS4xLjJMNS41IDIxLjFjLjEuNS4zIDEgLjUgMS41IDEuNiA0LjIgNS4zIDcuNCA5LjggOC4yLjUuMSAxIC4yIDEuNS4ydi0xLjVsLS4xLTExLjJ6bTIuNyAyLjNsNy44IDMuOWMtLjQuNi0uOCAxLjEtMS4zIDEuNi0xLjggMS44LTQgMi45LTYuNSAzLjN2LTguOHptLTQuMi0uNHY5Yy0yLjEtLjUtNC4xLTEuNS01LjctMy4xLTEuMS0xLjEtMi0yLjUtMi42LTMuOWw4LjMtMnpNMjcuNiA4LjlsLTguMyA4LjMgMTEgNS41Yy4yLS41LjMtMSAuNS0xLjUuMy0xLjEuNS0yLjMuNS0zLjQgMC0yLjktMS01LjYtMi42LTcuOC0uNS0uMy0uOC0uNy0xLjEtMS4xem0tLjEgMi4zYzEuNCAxLjkgMi4yIDQuMyAyLjIgNi43IDAgLjktLjEgMS44LS4zIDIuN2wtNy41LTMuOCA1LjYtNS42ek0xNy4yIDQuOWMtLjUgMC0xIC4xLTEuNS4yQzkuNiA2LjMgNSAxMS42IDUuMSAxOHYuM2MwIC41LjEgMSAuMSAxLjVsMTItMi43VjQuOXptLTEuNSAxLjh2OS4ybC05IDJjLS4xLTUuNSAzLjgtMTAuMSA5LTExLjJ6bTIuNi0xLjh2MTEuN2w4LjQtOC41Yy0uNC0uMy0uOC0uNy0xLjItMUMyMy44IDYgMjEuOSA1LjMgMTkuOCA1Yy0uNS0uMS0xLS4xLTEuNS0uMXptMS41IDEuN2MxLjYuMiAzLjIuOCA0LjYgMS43bC00LjYgNC42VjYuNnpNNS45IDIyLjVjLS4yLS41LS4zLTEtLjUtMS41bC41IDEuNXoiIGZpbGw9IiMwOTY3YWEiLz48L3N2Zz4=';
			default:
				return '';
				break;
		}
	}
</script>

<div class="mt-4 flex px-4 py-4 justify-between bg-white dark:bg-gray-600 shadow-xl rounded-lg">
	<!-- Card -->

	<div class="flex justify-between">
		<!-- Left side -->

		<span class="mt-2 h-12 w-12 rounded-full object-cover"
			><img class="h-12 w-12" alt={index_name} src={getIndexLogo(index_name)} /></span
		>

		<div class="ml-4 flex flex-col capitalize text-gray-600 dark:text-gray-400">
			<span>Index name</span>
			<span class="mt-2 text-black dark:text-gray-200"> {index_name} </span>
		</div>

		<div class="ml-12 flex flex-col capitalize text-gray-600 dark:text-gray-400">
			<span>Current Value (Fiat)</span>
			<span class="mt-2 text-black dark:text-gray-200"> {index_amount.toFixed(2)} €</span>
		</div>
	</div>

	<div class="flex">
		<!-- Rigt side -->

		<!-- <div class="mr-16 flex flex-col capitalize text-gray-600 dark:text-gray-400">
			<span>project</span>
			<span class="mt-2 text-black dark:text-gray-200"> Aero treck </span>
		</div>

		<div class="mr-16 flex flex-col capitalize text-gray-600 dark:text-gray-400">
			<span>role</span>
			<span class="mt-2 text-black dark:text-gray-200"> Front-End </span>
		</div>

		<div class="mr-16 flex flex-col capitalize text-gray-600 dark:text-gray-400">
			<span>status</span>
			<span class="mt-2 text-yellow-600 dark:text-yellow-400"> in work </span>
		</div>

		<div class="mr-8 flex flex-col capitalize text-gray-600 dark:text-gray-400">
			<span>final date</span>
			<span class="mt-2 text-green-400 dark:text-green-200"> 20.02.2020 11:00 </span>
		</div> -->
	</div>
</div>
