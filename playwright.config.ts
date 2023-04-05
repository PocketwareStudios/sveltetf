import type { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
	webServer: {
		command: 'npm run build:test',
		port: 4173,
	},
	use: {
		trace: 'on-first-retry',
	},
	testDir: 'tests',
};

export default config;
