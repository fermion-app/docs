# How to create interactive HTML/CSS labs?

<!--@include: ./../_components/TechnologyIntro.md-->

We'll divide this part into 5 sections:

1. Creating lab metadata
2. Setting up lab defaults
3. Setting up lab challenges
4. Setting up evaluation script
5. Setting up test file

## Introduction

This guide would assume that you already have created an interactive course from your instructor panel. If not, [go here and set it up first](https://codedamn.com/instructor/interactive-courses)

## Step 1 - Creating the Lab

<!--@include: ../../../_components/lab-metadata.md-->

## Step 2 - Lab Instructions

<!--@include: ../../../_components/lab-instructions.md-->

## Step 3 - Lab Defaults

Lab defaults section include how your lab environment boots. It is one of the most important parts because a wrong default environment might confuse your students. Therefore it is important to set it up properly.

:::info
We recommend forking this repository: [HTML playground starter](https://github.com/codedamn-classrooms/html-playground-starter).
:::

The repository also includes a `.cdmrc` file, a critical configuration file for Fermion labs. Familiarize yourself with the [.cdmrc guide](/docs/creating-coding-labs/cdmrc-file) to understand how it works before proceeding.

![](https://codedamn-website-assets.s3.us-east-1.amazonaws.com/uploads/17-11-2024/screenshot-2024-11-17-3%E2%80%AF-31-53%402x.kzdbiv.png)

## Step 4 - Evaluation Script

Evaluation script is actually what runs when the user on the playground clicks on "Run Tests" button.

![](https://codedamn-website-assets.s3.us-east-1.amazonaws.com/uploads/17-11-2024/lab-run-tests.exllxt.png)
![](https://codedamn-website-assets.s3.us-east-1.amazonaws.com/uploads/17-11-2024/screenshot-000001%402x.ywpfjc.png)

Since we have already written a pure evaluation script that runs and finally writes the JSON result to the `UNIT_TEST_OUTPUT_FILE` environment, all we have to do is trigger that script via Node.js.

The full path of the script is made available at run-time with another environment variable called `TEST_FILE_NAME`. Therefore, all we have to do is write the following in the evaluation script area:

```sh
#!/bin/bash
set -e 1

# create a folder for test
mkdir -p /home/damner/code/.labtests

# move to the folder
cd /home/damner/code/.labtests

# move test file here
mv $TEST_FILE_NAME nodecheck.spec.js

# mark this as module
cat > package.json << EOF
{
    "type": "module"
}
EOF

# write playwright config file
cat > playwright.config.ts << EOF
import { defineConfig, devices } from '@playwright/test'
import puppeteer from 'puppeteer'

export default defineConfig({
	timeout: 10_000,
	maxFailures: 0,
	testDir: '.',
	fullyParallel: false,
	forbidOnly: true,
	retries: 0,
	workers: 1,

	// Reporter to use
	reporter: [['list'], ['json', { outputFile: './report.json' }]],

	use: {
		baseURL: 'http://localhost:1337/',
		trace: 'off',
		launchOptions: {
			headless: true,
			executablePath: puppeteer.executablePath(),
			chromiumSandbox: false
		}
	},

	projects: [
		{
			name: 'chromium',
			use: { ...devices['Desktop Chrome'] }
		}
	]
})
EOF

# `puppeteer` is installed via NPM in playgrounds. Use preinstalled dependency
npm link puppeteer
bun install @playwright/test@1.40.1 playwright@1.40.1

bunx playwright test || true

# process results file
cat > process-results.js << EOF
import fs from 'fs'
const payload = JSON.parse(fs.readFileSync('./report.json', 'utf-8'))
const answers = payload.suites[0].suites[0].specs.map(spec => spec.ok === true)
fs.writeFileSync(process.env.UNIT_TEST_OUTPUT_FILE, JSON.stringify(answers))
EOF

node process-results.js

```

This will make sure we run the full Node.js script and write the results properly for the playground IDE to read. It would look like the following:

<!-- ![](/images/html-css/lab-test-command.png) -->

**Note:** You can setup a full testing environment in this block of evaluation script (installing more packages, etc. if you want). However, your test file will be timed out **after 60 seconds**. Therefore, make sure, all of your testing can happen within 60 seconds.

## Step 5 - Test file

In the same `Evaluation` tab, you'll see another section called "Custom test file". You can use this test file to add custom code for testing user work.

![](https://codedamn-website-assets.s3.us-east-1.amazonaws.com/uploads/17-11-2024/screenshot-000002%402x.mhhqir.png)

When you click on it, a new window will open. This is a test file area.

You can write anything here. Whatever script you write here, can be executed from the `Test command to run section` inside the evaluation tab we were in earlier.

The point of having a file like this to provide you with a place where you can write your evaluation script.

**For HTML/CSS labs, you can use the default test file for playwright:**

```js
import { expect, test } from '@playwright/test'

test.describe.serial('Test', () => {
	test.beforeEach(async ({ page }, testInfo) => {
		console.log(`Running ${testInfo.title}`)
		await page.goto('/')
	})

	test('Stylesheet is linked', async ({ page }) => {
		const linkElement = page.locator('link[rel="stylesheet"]')
		expect(linkElement).toBeDefined()
		expect(await linkElement.getAttribute('href')).toEqual('style.css')
	})
})
```

This completes your evaluation script for the lab. Your lab is now almost ready for users.

## Step 6 - Add challenges

Finally, in the UI below, add friendly name of challenges that must be visible to the user. Note that the order of challenges is important here and must match the boolean array you write using the bash script + test file above.

![](https://codedamn-website-assets.s3.us-east-1.amazonaws.com/uploads/17-11-2024/screenshot-000003%402x.bedrfe.png)
