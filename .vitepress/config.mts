import { defineConfig } from 'vitepress'
import type { ValidRoutePathname } from '../valid-routes'

// https://vitepress.dev/reference/site-config
export default defineConfig({
	title: 'Fermion docs',
	description: 'Documentation on using Fermion platform',

	themeConfig: {
		// https://vitepress.dev/reference/default-theme-config

		sidebar: [
			// /docs/getting-started/
			{
				text: 'Getting Started',
				collapsed: false,
				items: [
					{
						text: 'What is Fermion? ',
						link: '/docs/getting-started/what-is-fermion',
					},
					{
						text: 'Fermion v/s other platforms',
						link: '/docs/getting-started/fermion-vs-other-platforms',
					},
					{
						text: 'What can you do on Fermion?',
						link: '/docs/getting-started/what-can-you-do-on-fermion',
					},
				],
	
			},
			// /docs/create-your-first-course/
			{
				text: 'Create your first course',
				collapsed: false,
				items: [
					{
						text: 'Pre-requisites',
						link: '/docs/create-your-first-course/prerequisites',
					},
					{
						text: 'Course landing page',
						link: '/docs/create-your-first-course/course-landing-page',
					},
					{
						text: 'Manage syllabus',
						link: '/docs/create-your-first-course/manage-syllabus',
					},
					{
						text: 'Monitor course analytics',
						link: '/docs/create-your-first-course/monitor-course-analytics',
					},
					{
						text: 'Common FAQs',
						link: '/docs/create-your-first-course/common-faqs',
					},
				],
			},

			// /docs/setup-pricing/
			{
				text: 'Setup pricing',
				collapsed: false,
				items: [
					{
						text: 'Fixed pricing plan',
						link: '/docs/setup-pricing/fixed-pricing-plan',
					},
					{
						text: 'Setup EMIs',
						link: '/docs/setup-pricing/setup-emi',
					},
					{
						text: 'Add coupon codes',
						link: '/docs/setup-pricing/add-coupon-codes',
					},
					{
						text: 'Common FAQs',
						link: '/docs/setup-pricing/common-faqs',
					},
				],
			},

			// /docs/creating-coding-labs/
			{
				text: 'Creating coding labs',
				collapsed: false,
				items: [
					{
						text: 'What are coding labs?',
						link: '/docs/creating-coding-labs/what-are-coding-labs',
					},

					{
						text: 'React.js',
						link: '/docs/creating-coding-labs/technologies/react',
					},
					{
						text: 'Python',
						link: '/docs/creating-coding-labs/technologies/python',
					},

					{
						text: 'Using .cdmrc file',
						link: '/docs/creating-coding-labs/cdmrc-file',
					},

					{
						text: 'Using the content library',
						link: '/docs/creating-coding-labs/using-the-content-library',
					},
					{
						text: 'Common FAQs',
						link: '/docs/creating-coding-labs/common-faqs',
					},
				],
			},
			// /docs/live-classes/
			{
				text: 'Setup live classes',
				collapsed: false,
				items: [
					{
						text: 'What are live classes?',
						link: '/docs/live-classes/what-are-live-classes',
					},
					{
						text: 'Setup live class',
						link: '/docs/live-classes/setup-live-class',
					},
					{
						text: 'Setup OBS',
						link: '/docs/live-classes/setup-obs',
					},
					{
						text: 'Monitor live analytics',
						link: '/docs/live-classes/monitor-live-analytics',
					},
					{
						text: 'Common FAQs',
						link: '/docs/live-classes/common-faqs',
					},
				],
			},
			
			// /docs/community/
			{
				text: 'Community',
				collapsed: false,
				items: [
					{
						text: 'What are communities?',
						link: '/docs/community/what-are-communities',
					},
					{
						text: 'Setup community',
						link: '/docs/community/setup-community',
					},
					{
						text: 'Common FAQs',
						link: '/docs/community/common-faqs',
					},

				],
			},
			// /docs/digital-products/
			{
				text: 'Digital Products',
				collapsed: false,
				items: [
					{
						text: 'What are digital products?',
						link: '/docs/digital-products/what-are-digital-products',
					},
					{
						text: 'Course bundles',
						link: '/docs/digital-products/course-bundles',
					},
					{
						text: 'All platform access',
						link: '/docs/digital-products/all-platform-access',
					},
					{
						text: 'E-books',
						link: '/docs/digital-products/ebooks',
					},

				],
			},
			// /docs/marketing-tools/
			{
				text: 'Marketing Tools',
				collapsed: false,
				items: [
					{
						text: 'Affiliate marketing',
						link: '/docs/marketing-tools/affiliate',
					},
					{
						text: 'Custom landing pages',
						link: '/docs/marketing-tools/custom-landing-pages',
					},
					{
						text: 'Add forms',
						link: '/docs/marketing-tools/add-forms',
					},
					{
						text: 'Gamification features',
						link: '/docs/marketing-tools/gamification-features',
					},
					{
						text: 'Setup webhooks',
						link: '/docs/marketing-tools/setup-webhooks',
					},
					{
						text: 'Email automation',
						link: '/docs/marketing-tools/email-automation',
					},
				],
			},
			// /docs/manage-settings/
			{
				text: 'Manage Settings',
				collapsed: false,
				items: [
					{
						text: 'Change school settings',
						link: '/docs/manage-settings/change-school-settings',
					},
					{
						text: 'Change instructor details',
						link: '/docs/manage-settings/change-instructor-details',
					},
					{
						text: 'Manage payouts',
						link: '/docs/manage-settings/manage-payouts',
					},
					{
						text: 'Help',
						link: '/docs/manage-settings/help',
					},
				],
			},
		

		] satisfies {
			text: string
			collapsed: boolean
			items: { text: string; link: ValidRoutePathname }[]
		}[],

		socialLinks: [
			{
				icon: 'x',
				link: 'https://x.com/fermionapp',
			},
			{
				icon: 'instagram',
				link: 'https://www.instagram.com/fermion.app/',
			},
			{
				icon: 'linkedin',
				link: 'https://www.linkedin.com/showcase/fermionapp/',
			},
		],

		siteTitle: 'Fermion Docs',
		logo: '/favicons/fermion-logo-500x500.png',

		footer: {
			copyright: `Copyright © Fermion ${new Date().getFullYear()}. All rights reserved.`,
		},

		search: {
			provider: 'local',
		},
	},

	markdown: {
		lineNumbers: true,
	},

	cleanUrls: true,

	lastUpdated: true,

	head: [['link', { rel: 'shortcut icon', href: '/favicons/favicon.ico' }]],
})
