<script lang="ts">
  import type * as tf from "@tensorflow/tfjs-core";
  import * as facemesh from "@tensorflow-models/facemesh";
  import { onMount } from "svelte";
  import { createEventDispatcher } from "svelte";

  let model: facemesh.FaceMesh;

  const dispatch = createEventDispatcher();

  export let image: HTMLCanvasElement | tf.Tensor3D | ImageData | HTMLVideoElement | HTMLImageElement;
  // export let maxFaces = 1;
  export let verbose = false;

  onMount(async () => {
    dispatch("modelLoadStarted");
    if (!model) model = await facemesh.load();

    if (verbose) console.debug("model loaded", model);
    dispatch("modelLoadFinished");
  });

  async function estimateFaces(_image: HTMLCanvasElement | tf.Tensor3D | ImageData | HTMLVideoElement | HTMLImageElement) {
    const predictions = await model.estimateFaces(_image);
console.log('>>> FACE ESTIMATED:', predictions)
    dispatch("meshesReceived", predictions);
  }

  $: if (model != null && image != null) {
console.log('>>> FACE ESTIMATE...')
    estimateFaces(image);
  }
</script>
