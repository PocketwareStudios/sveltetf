<script context="module" lang="ts">
	let net: bodyPix.BodyPix;
	export function drawMaskOnCanvas(
		outputCanvas: HTMLCanvasElement | OffscreenCanvas,
		image: HTMLImageElement | HTMLVideoElement | HTMLCanvasElement | OffscreenCanvas,
		segmentation: bodyPix.PersonSegmentation[],
		opacity = 0.7,
		flipHorizontal = false,
		maskBlurAmount = 1
	) {
		const coloredPartImage = bodyPix.toMask(segmentation);

		bodyPix.drawMask(
			outputCanvas,
			image,
			coloredPartImage,
			opacity,
			maskBlurAmount,
			flipHorizontal
		);
	}
</script>

<script lang="ts">
	import * as bodyPix from '@tensorflow-models/body-pix';
	import { createEventDispatcher } from 'svelte';
	import { onMount } from 'svelte';

	export let architecture = 'MobileNetV1'; // Can be either MobileNetV1 or ResNet50
	export let outputStride = 16;
	export let multiplier = 0.75;
	export let quantBytes = 2;

	export let image: ImageData | HTMLImageElement | HTMLCanvasElement | HTMLVideoElement;
	const dispatch = createEventDispatcher();

	onMount(async () => {
		dispatch('modelLoadStarted');
		if (!net) {
			net = await bodyPix.load({
				architecture: architecture,
				outputStride: outputStride,
				multiplier: multiplier,
				quantBytes: quantBytes
			} as any); // TODO: Use bodyPix ModelConfig
		}
		dispatch('modelLoadFinished');
	});

	async function estimateSegmentationOnImage(_image: ImageData | HTMLImageElement | HTMLCanvasElement | HTMLVideoElement) {
		const segmentation = await net.segmentMultiPerson(_image, {
			flipHorizontal: false,
			internalResolution: 'medium',
			segmentationThreshold: 0.7,
			maxDetections: 10,
			scoreThreshold: 0.2,
			nmsRadius: 20,
			minKeypointScore: 0.3,
			refineSteps: 10
		});
		dispatch('segmentation', segmentation);
	}

	$: if (net && image) {
		estimateSegmentationOnImage(image);
	}
</script>
