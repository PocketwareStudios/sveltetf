<script context="module" lang="ts">
  let model: handpose.HandPose;

  const fingerLookupIndices = {
    thumb: [0, 1, 2, 3, 4],
    indexFinger: [0, 5, 6, 7, 8],
    middleFinger: [0, 9, 10, 11, 12],
    ringFinger: [0, 13, 14, 15, 16],
    pinky: [0, 17, 18, 19, 20],
  };

  function drawPoint(ctx: CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D, y: number, x: number, r: number) {
    ctx.beginPath();
    ctx.arc(x, y, r, 0, 2 * Math.PI);
    ctx.fill();
  }

  function drawPath(ctx: CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D, points: [number, number, number][], closePath: boolean) {
    const region = new Path2D();
    region.moveTo(points[0][0], points[0][1]);
    for (let i = 1; i < points.length; i++) {
      const point = points[i];
      region.lineTo(point[0], point[1]);
    }

    if (closePath) {
      region.closePath();
    }
    ctx.stroke(region);
  }

  function drawKeypoints(ctx: CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D, keypoints: [number, number, number][]) {
    const keypointsArray = keypoints;

    for (let i = 0; i < keypointsArray.length; i++) {
      const y = keypointsArray[i][0];
      const x = keypointsArray[i][1];
      drawPoint(ctx, x - 2, y - 2, 3);
    }

    const fingers = Object.keys(fingerLookupIndices) as (keyof typeof fingerLookupIndices)[];
    for (let i = 0; i < fingers.length; i++) {
      const finger = fingers[i];
      const points = fingerLookupIndices[finger].map((idx) => keypoints[idx]);
      drawPath(ctx, points, false);
    }
  }

  export function drawHandKeypoints(outputCanvas: HTMLCanvasElement | OffscreenCanvas, predictions: handpose.AnnotatedPrediction[]) {
    const ctx = outputCanvas.getContext("2d");
    if (ctx == null) return;
    for (let index = 0; index < predictions.length; index++) {
      const result = predictions[index].landmarks;
      drawKeypoints(ctx, result); // , predictions[index].annotations);
    }
  }
</script>

<script lang="ts">
  import type * as tf from "@tensorflow/tfjs-core";
  import * as handpose from "@tensorflow-models/handpose";
  import { onMount, createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  export let image: HTMLCanvasElement | tf.Tensor3D | ImageData | HTMLVideoElement | HTMLImageElement;

  onMount(async () => {
    dispatch("modelLoadStarted");
    if (!model) model = await handpose.load();
    dispatch("modelLoadFinished");
  });

  async function handlePoses(_image: HTMLCanvasElement | tf.Tensor3D | ImageData | HTMLVideoElement | HTMLImageElement) {
    const predictions = await model.estimateHands(_image);
    dispatch("hands", predictions);
  }

  $: if (model && image) {
    handlePoses(image);
  }
</script>
