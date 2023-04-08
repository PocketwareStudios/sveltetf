import { describe, it, expect } from 'vitest';
// https://testing-library.com/docs/svelte-testing-library/intro
import { render } from '@testing-library/svelte';

import FaceLandmarksDetection from '$lib/models/segmentation/FaceLandmarksDetection.svelte';

describe("Pokemon Details", () => {

  it('Test Face Landmarks Detection', () => {
		// let camRef: HTMLVideoElement | null = null;
    const { getByText } = render(FaceLandmarksDetection);

    expect(() => getByText(/Loading.../i)).not.toThrow();
  });

});
