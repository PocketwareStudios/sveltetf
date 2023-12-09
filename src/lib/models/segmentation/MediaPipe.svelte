<script lang='ts'>
  import { FilesetResolver, FaceLandmarker, type ImageSource } from '@mediapipe/tasks-vision';
  import { onMount } from 'svelte';
  import { createEventDispatcher } from 'svelte';

  export let image: ImageSource;
  export let verbose = false;
  export let runningMode: 'IMAGE' | 'VIDEO' = 'VIDEO';

  let faceLandmarker: FaceLandmarker;
  let startTimeMs;
  const dispatch = createEventDispatcher();

  // Ref: https://codepen.io/mediapipe-preview/pen/OJBVQJm
  async function createFaceLandmarker() {
    const filesetResolver = await FilesetResolver.forVisionTasks(
      'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.3/wasm'
    );
    faceLandmarker = await FaceLandmarker.createFromOptions(filesetResolver, {
      baseOptions: {
        modelAssetPath: `https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task`,
        delegate: 'GPU',
      },
      outputFaceBlendshapes: true,
      runningMode,
      numFaces: 1
    });
    if (verbose) console.debug('model loaded', faceLandmarker);
    dispatch('modelLoadFinished');
  }

  onMount(async () => {
    dispatch('modelLoadStarted');
    createFaceLandmarker();
  });

  function estimateFaces(source: ImageSource) {
    startTimeMs = performance.now();
    const predictions = faceLandmarker.detectForVideo(source, startTimeMs);
    dispatch('meshesReceived', predictions);
  }

  function run() {
    estimateFaces(image);
    requestAnimationFrame(run);
  }

  $: if (faceLandmarker != null && image != null) {
    run();
  }
</script>
