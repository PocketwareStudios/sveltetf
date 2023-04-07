<script lang="ts">
	import { FaceMesh, drawFaceMeshOnCanvas } from '$lib';

	let supported = navigator != null;
	let camRef: HTMLVideoElement | null = null;
	let drawCanvas: HTMLCanvasElement | null = null;
	let loading = false;
	let loadingModel = false;
	let camReady = false;
  let wf = 1;
  let hf = 1;
	const tryVideoCamara = async () => {
		try {
			loading = true;
			const stream = await navigator.mediaDevices.getUserMedia({ video: true });
			if (camRef != null) {
				camRef.srcObject = stream;
				camRef.play();
				camRef.onloadeddata = (evt) => {
					camReady = true;
				};
			}
			loading = false;
		} catch (error) {
			console.log('>-> Webcam error:', error);
		}
	};

	// optional logic to draw the mesh on a canvas
	function onMesh(mesh: any) {
		if (drawCanvas == null) return;
		// redraw the current state on the the test canvas
		const dstCxt = drawCanvas.getContext('2d');
		if (dstCxt == null) return;
    dstCxt.clearRect(0, 0, drawCanvas.width, drawCanvas.height);

		// draw mesh over the test canvas
		drawFaceMeshOnCanvas(mesh.detail, drawCanvas, wf, hf);
	}

	function modelLoadStarted(event: any) {
		loadingModel = true;
	}

	function modelLoadFinished(event: any) {
		loadingModel = false;
	}

  $: {
		if (camReady && camRef != null && drawCanvas != null) {
      wf = drawCanvas.width / camRef.videoWidth;
      hf = drawCanvas.height / camRef.videoHeight;
    }
  }
</script>

<div style="display: flex; flex-direction: column; width: 100%; justify-content: center; align-items: center;">
  {#if supported && camRef?.srcObject === null && !loading}
    <button style="width: 200px" on:click={tryVideoCamara}>START WEBCAM</button>
  {/if}
  <div style="position: relative; display: flex; justify-content: center;">
    <!-- svelte-ignore a11y-media-has-caption -->
    <video height={600} style="max-height: 600px" bind:this={camRef} />
    <canvas style="position: absolute; width: 100%; height: 100%" bind:this={drawCanvas} />
    {#if camReady}
      <FaceMesh
        image={camRef}
        on:meshesReceived={onMesh}
        on:modelLoadStarted={modelLoadStarted}
        on:modelLoadFinished={modelLoadFinished}
      />
    {/if}
    {#if loading}
      <div style="position: absolute">
        <h1>loading...</h1>
      </div>
    {/if}
    {#if loadingModel}
      <div style="position: absolute">
        <h1>loading model...</h1>
      </div>
    {/if}
    {#if !supported}
      <div style="position: absolute">
        <h1>unsupported.</h1>
      </div>
    {/if}
  </div>
</div>