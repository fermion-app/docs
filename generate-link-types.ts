import fs from 'fs-extra'
import { glob } from 'glob'
import path from 'path'

async function run() {
	const routes = await glob(path.resolve(__dirname, 'docs/**/*.md'))

	const validPathnames: string[] = []
	for (const route of routes) {
		const validPathname = route.replace(__dirname, '').replace('.md', '')

		validPathnames.push(JSON.stringify(validPathname))
	}

	const typeString = `export type ValidRoutePathname = ${validPathnames.join(
		' | '
	)}`

	await fs.writeFile(path.resolve(__dirname, 'valid-routes.ts'), typeString)
}

void run()
