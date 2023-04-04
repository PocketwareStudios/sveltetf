<script lang="ts">
  import * as automl from "@tensorflow/tfjs-automl";
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  export let modelUrl: string;
  export let score = 0.5;
  export let iou = 0.5;
  export let topk = 20;
  export let src: automl.ImageInput;
  export let verbose = false;
  let model: automl.ObjectDetectionModel;

  async function loadModel(modelUrlToLoad: string) {
    if (!model) {
      if (verbose) console.time("AutoML model loading");
      dispatch("modelLoadStarted", modelUrlToLoad);
      model = await automl.loadObjectDetection(modelUrlToLoad);
      dispatch("modelLoadFinished", modelUrlToLoad);
      if (verbose) console.timeEnd("AutoML model loading");
    }

    if (verbose) console.time("Prediction Started");
    dispatch("predictionStarted", modelUrlToLoad);
    const predictions = await model.detect(src, {
      score: score,
      iou: iou,
      topk: topk,
    });
    dispatch("predict", predictions);
    if (verbose) console.timeEnd("Prediction Started");
  }

  $: loadModel(modelUrl);
</script>
