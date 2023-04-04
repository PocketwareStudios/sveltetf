<script context="module" lang="ts">
  let model: toxicity.ToxicityClassifier;
</script>

<script lang="ts">
  import { onMount } from 'svelte';
  import * as toxicity from '@tensorflow-models/toxicity';
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();

  export let samples: { text: string; [key: string]: any }[];
  export let verbose = true;
  export let threshold = 0.9;
  export let toxicityLabels: string[] = [];

  let labels: string[], predictions: { text: string; }[];

  const classify = async (inputs: string[]) => {
    const results = await model.classify(inputs);
    return inputs.map((d, i) => {
      const obj: { text: string; [key: string]: any } = { text: d };
      results.forEach((classification) => {
        obj[classification.label] = classification.results[i].match;
      })
      return obj;
    })
  }

  async function predict(_samples: { text: string; [key: string]: any }[]) {
    labels = (model as any).model.outputNodes.map((d: string) => d.split('/')[0]); // model.model.outputNodes.map((d) => d.split('/')[0]);
    console.debug('Predicting');
    dispatch('labels', labels);

    predictions = await classify(_samples.map((d) => d.text));
    if (verbose) console.debug(labels);
    if (verbose) console.debug(predictions);

    dispatch('prediction', predictions);
  }

  onMount(async () => {
    if (!model) {
      dispatch('modelLoadStarted');
      model = await toxicity.load(threshold, toxicityLabels);
      dispatch('modelLoadFinished');
    }
  })

  $: if (model && samples && samples.length > 0) {
    predict(samples);
  }
</script>

<slot {predictions} {labels} {model} />
