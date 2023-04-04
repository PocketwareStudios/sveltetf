<script context="module" lang="ts">
  let model: automl.ImageClassificationModel;
</script>

<script lang="ts">
  import * as automl from "@tensorflow/tfjs-automl";
  import { createEventDispatcher, onMount } from "svelte";
  const dispatch = createEventDispatcher();

  export let modelUrl = "https://storage.googleapis.com/tfjs-testing/tfjs-automl/img_classification/model.json";
  export let centerCrop = true;
  export let src: automl.ImageInput;

  async function classify(_model: automl.ImageClassificationModel, _src: automl.ImageInput) {
    const predictions = await _model.classify(_src, { centerCrop: centerCrop });
    dispatch("predict", predictions);
  }

  onMount(async () => {
    dispatch("modelLoadStarted");
    if (!model) model = await automl.loadImageClassification(modelUrl);
    dispatch("modelLoadFinished");

    if (model && src) {
      classify(model, src);
    }
  });

  $: if (model && src) {
    classify(model, src);
  }
</script>
