import { describe, it, expect } from 'vitest';
// https://testing-library.com/docs/svelte-testing-library/intro
import { render } from '@testing-library/svelte';

import FaceMesh from '$lib/models/segmentation/FaceMesh.svelte';

describe("Pokemon Details", () => {

  it('Test Face Mesh', () => {
		// let camRef: HTMLVideoElement | null = null;
    const { getByText } = render(FaceMesh);

    expect(() => getByText(/Loading.../i)).not.toThrow();
  });

});
