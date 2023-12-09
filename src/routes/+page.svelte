<script lang="ts">
  const products = [
		{
			title: 'mediapipe',
			desc: `
				<h1>MediaPipe 2023</h1>
				<p>MediaPipe Solutions allows you to apply machine learning (ML) solutions to your apps, with a framework that lets you configure pre-built processing pipelines to get immediate, engaging, and useful output for your users. You can even customize these solutions using Model Maker to update the default models.</p>
				<p>Currently, we provide 1 model option: face_landmarker.</p>
				<p>The MediaPipe Face Landmarker task lets you detect face landmarks and facial expressions in images and videos.</p>
			`,
			link: '/mediapipe',
		},
	];

	let prodIdx = 0;
</script>

<header>
	<h2>Tests</h2>
</header>

<section>
	<nav>
		<ul>
			{#each products as prod, idx}
				<li><button style="margin-Bottom: 12px;" on:click={() => prodIdx = idx}>{prod.title}</button></li>
			{/each}
		</ul>
	</nav>

  <article>
    {@html products[prodIdx].desc}
		<a href={products[prodIdx].link}>try</a>
  </article>
</section>

<footer>
	<p>SvelteTF</p>
</footer>

<style>
	* {
		box-sizing: border-box;
	}

	/* Style the header */
	header {
		background-color: #666;
		padding: 30px;
		text-align: center;
		font-size: 35px;
		color: white;
	}

	/* Container for flexboxes */
	section {
		display: -webkit-flex;
		display: flex;
	}

	/* Style the navigation menu */
	nav {
		-webkit-flex: 1;
		-ms-flex: 1;
		flex: 1;
		background: #ccc;
		padding: 20px;
    max-width: 20%;
	}

	/* Style the list inside the menu */
	nav ul {
		list-style-type: none;
		padding: 0;
	}

	/* Style the content */
	article {
		-webkit-flex: 3;
		-ms-flex: 3;
		flex: 3;
		background-color: #f1f1f1;
		padding: 10px;
	}

	/* Style the footer */
	footer {
		background-color: #777;
		padding: 10px;
		text-align: center;
		color: white;
	}

	/* Responsive layout - makes the menu and the content (inside the section) sit on top of each other instead of next to each other */
	@media (max-width: 600px) {
		section {
			-webkit-flex-direction: column;
			flex-direction: column;
		}
	}
</style>
