// https://www.redbitdev.com/post/automated-testing-with-playwright

// import { describe, it, beforeAll } from 'vitest';
import { expect, test } from '@playwright/test';

// describe('testing face-landmarks-detection', () => {
// 	it('test basic function', () => {
		test('index page has expected h1', async ({ page }) => {
			await page.goto('/');
			expect(await page.textContent('h1')).toBe('Face Mesh');
		});

		test('facemesh page has expected button', async ({ page }) => {
			await page.goto('/facemesh');
			expect(await page.textContent('button')).toBe('START WEBCAM');
		});
// 	});
// });