<script context="module" lang="ts">
  let model: mobilenet.MobileNet;
</script>

<script lang="ts">
  import type * as automl from "@tensorflow/tfjs-automl";
  import * as mobilenet from "@tensorflow-models/mobilenet";
  import { createEventDispatcher, onMount } from "svelte";
  const dispatch = createEventDispatcher();

  const version = 2;
  const alpha = 0.5;

  export let mobileNetConfig: mobilenet.ModelConfig = { version, alpha };
  export let verbose = false;
  export let image: automl.ImageInput;

  let predictions: { className: string; probability: number; }[] = [];

  onMount(async () => {
    if (!model) {
      dispatch("modelLoadStarted");
      model = await mobilenet.load(mobileNetConfig);
      dispatch("modelLoadFinished");
    }
    // in case there is only one image and not a stream.
    classify(image);
  });

  async function classify(_image: automl.ImageInput) {
    if (_image) {
      // should be a valid image on the dom and model loaded.
      predictions = await model.classify(_image);
      dispatch("predict", predictions);

      const logits = model.infer(_image);
      dispatch("logits", logits);
      logits.print(true);

      // Get the embedding.
      const embedding = model.infer(_image, true);
      if (verbose) embedding.print(true);
      dispatch("embeddings", embedding);
    }
  }

  $: if (model && image) {
    classify(image);
  }
</script>

<slot {predictions} />
