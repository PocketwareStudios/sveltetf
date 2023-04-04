<script context="module" lang="ts">
  let net: bodyPix.BodyPix;
</script>

<script lang="ts">
  import * as bodyPix from "@tensorflow-models/body-pix";
  import { createEventDispatcher } from "svelte";
  import { onMount } from "svelte";

  export let backgroundBlurAmount = 3;
  export let edgeBlurAmount = 3;
  export let flipHorizontal = false;
  export let outputCanvas: HTMLCanvasElement | OffscreenCanvas;
  export let image: HTMLImageElement | HTMLVideoElement | HTMLCanvasElement | OffscreenCanvas;
  export let verbose = false;
  const dispatch = createEventDispatcher();

  onMount(async () => {
    dispatch("modelLoadStarted");
    if (!net) {
      net = await bodyPix.load();
    }
    if (verbose) console.debug("model loaded", net);
    dispatch("modelLoadFinished");
  });

  async function estimateSegmentationOnImage(_image: HTMLImageElement | HTMLVideoElement | HTMLCanvasElement | OffscreenCanvas) {
    const segmentation = await net.segmentPerson(_image);
    dispatch("segmentation", segmentation);

    if (outputCanvas && outputCanvas instanceof HTMLCanvasElement) {
      bodyPix.drawBokehEffect(
        outputCanvas,
        _image,
        segmentation,
        backgroundBlurAmount,
        edgeBlurAmount,
        flipHorizontal
      );
      dispatch("complete", segmentation);
      if (verbose) console.debug("segmentation complete", segmentation);
    }
  }

  $: if (net && image) {
    estimateSegmentationOnImage(image);
  }
</script>
