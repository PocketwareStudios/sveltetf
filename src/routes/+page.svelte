<script lang="ts">
  const faceMesh = {
    title: 'face-landmarks-detection',
    desc: `
      <h1>Face Landmarks Detection</h1>
      <p>This package provides models for running real-time face detection and landmark tracking.</p>
      <p>Currently, we provide 1 model option: MediaPipe.</p>
      <p>MediaPipe Facemesh can detect multiple faces, each face contains 468 keypoints.</p>
    `,
    link: '/facemesh',
  };

  let title = faceMesh.title;
  let desc = faceMesh.desc;
  let link = faceMesh.link;
</script>

<header>
	<h2>Tests</h2>
</header>

<section>
	<nav>
		<ul>
			<li><a href={link}>{title}</a></li>
			<!-- <li><a href="#">other</a></li>
      <li><a href="#">other more</a></li> -->
		</ul>
	</nav>

  <article>
    {@html desc}
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
