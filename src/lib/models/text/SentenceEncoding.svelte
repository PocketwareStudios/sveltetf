<!-- <script context="module" lang="ts">
  let model;
</script> -->

<script lang="ts">
  import type * as tf from "@tensorflow/tfjs-core";
  import * as use from "@tensorflow-models/universal-sentence-encoder";
  import { onMount, createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  export let sentences: string[];

  let embeddings: tf.Tensor2D, model: use.UniversalSentenceEncoder, verbose = false;

  async function init(_sentences: string[]) {
    if (_sentences && _sentences.length > 0) {
      embeddings = await model.embed(_sentences);
      dispatch("embeddings", embeddings);
    } else {
      dispatch("error", "No sentences submitted");
    }
  }

  onMount(async () => {
    dispatch("modelLoadStarted");
    if (!model) model = await use.load();
    dispatch("modelLoadFinished");
  });

  $: if (model && sentences) {
    init(sentences);
  }
</script>

<slot {embeddings} />
