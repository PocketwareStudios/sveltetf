<script lang="ts">
  import type * as tf from "@tensorflow/tfjs-core";
  import * as faceLandmarksDetection from '@tensorflow-models/face-landmarks-detection';
  import { onMount } from "svelte";
  import { createEventDispatcher } from "svelte";

  let model: faceLandmarksDetection.faceLandmarksDetection;

  const dispatch = createEventDispatcher();

  export let image: faceLandmarksDetection.FaceLandmarksDetectorInput;
  // export let maxFaces = 1;
  export let verbose = false;

  onMount(async () => {
    dispatch("modelLoadStarted");
    if (!model) model = await faceLandmarksDetection.createDetector(
      faceLandmarksDetection.SupportedModels.MediaPipeFaceMesh,
      {
        runtime: 'mediapipe',
        refineLandmarks: true,
        solutionPath: 'https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh',
      },
    );

    if (verbose) console.debug("model loaded", model);
    dispatch("modelLoadFinished");
  });

  async function estimateFaces(source: faceLandmarksDetection.FaceLandmarksDetectorInput) {
    const predictions = await model.estimateFaces(source);
    dispatch("meshesReceived", predictions);
  }

  function run() {
    estimateFaces(image);
    requestAnimationFrame(run);
  }

  $: if (model != null && image != null) {
    run();
  }
</script>
