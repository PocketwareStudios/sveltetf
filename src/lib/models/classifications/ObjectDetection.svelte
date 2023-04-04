<script context="module" lang="ts">
  let model: cocoSsd.ObjectDetection;
</script>

<script lang="ts">
  import { createEventDispatcher, onMount, onDestroy } from "svelte";

  import type * as automl from "@tensorflow/tfjs-automl";
  import * as cocoSsd from "@tensorflow-models/coco-ssd";
  import type { DetectedObject, ObjectDetectionBaseModel } from "@tensorflow-models/coco-ssd";

  const dispatch = createEventDispatcher();
  export let image: automl.ImageInput;
  export let base: ObjectDetectionBaseModel = "lite_mobilenet_v2"; // 'mobilenet_v1' | 'mobilenet_v2' | 'lite_mobilenet_v2'
  export let modelUrl = "";
  export let maxNumBoxes = 20; // Defaults to 20.
  export let verbose = false;
  // export let debug = false
  let predictions: DetectedObject[];

  onMount(async () => {
    if (!model) {
      if (modelUrl && modelUrl.length > 0) {
        dispatch("modelLoadStarted");
        model = await cocoSsd.load({
          base: base,
          modelUrl: modelUrl,
        });
        dispatch("modelLoadFinished");
      } else {
        dispatch("modelLoadStarted");
        model = await cocoSsd.load({
          base: base,
        });
        dispatch("modelLoadFinished");
      }
      if (verbose) console.debug("creating model", model);
    }
  });

  async function makePredictions(_image: automl.ImageInput) {
    // check if model is in the store, otherwise create a new model.

    if (verbose) console.debug("reading model", model, _image);
    if (_image) {
      predictions = await model.detect(_image, maxNumBoxes);
      dispatch("predict", predictions);
      if (verbose) console.debug(predictions);
    }
  }

  $: if (model) {
    makePredictions(image);
  }
</script>

<slot {predictions} />
