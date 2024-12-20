import { defineConfig } from 'vitepress'
import type { ValidRoutePathname } from '../valid-routes'

// https://vitepress.dev/reference/site-config
export default defineConfig({
	title: 'Fermion docs',
	description: 'Documentation on using Fermion platform',

	themeConfig: {
		// https://vitepress.dev/reference/default-theme-config
		siteTitle: 'Fermion Docs',
		logo: '/favicons/fermion-logo-500x500.png',

		sidebar: [
			{
				text: 'Getting Started',
				collapsed: false,
				items: [
					{
						text: 'What is Fermion?',
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
			{
				text: 'Setting up a course',
				collapsed: false,
				items: [
					{
						text: 'Pre-requisites',
						link: '/docs/setting-up-course/prerequisites',
					},
					{
						text: 'Landing page',
						link: '/docs/setting-up-course/landing-page',
					},
					{
						text: 'Syllabus',
						link: '/docs/setting-up-course/syllabus',
					},
					{
						text: 'Bulk import syllabus',
						link: '/docs/setting-up-course/bulk-import-syllabus',
					},
					{
						text: 'Attachments',
						link: '/docs/setting-up-course/attachments',
					},
					{
						text: 'Analytics',
						link: '/docs/setting-up-course/course-analytics',
					},
					{
						text: 'Common FAQs',
						link: '/docs/setting-up-course/common-faqs',
					},
				],
			},
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
			{
				text: 'Creating coding labs',
				collapsed: false,
				items: [
					{
						text: 'What are coding labs?',
						link: '/docs/creating-coding-labs/what-are-coding-labs',
					},
					{
						text: 'Using .cdmrc file',
						link: '/docs/creating-coding-labs/cdmrc-file',
					},
					{
						text: 'HTML/CSS/JS',
						link: '/docs/creating-coding-labs/technologies/html-css',
					},
					{
						text: 'React.js',
						link: '/docs/creating-coding-labs/technologies/react',
					},
					{
						text: 'Rust',
						link: '/docs/creating-coding-labs/technologies/rust',
					},
					{
						text: 'Java',
						link: '/docs/creating-coding-labs/technologies/java',
					},
					{
						text: 'Python',
						link: '/docs/creating-coding-labs/technologies/python',
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
					{ text: 'Setup OBS', link: '/docs/live-classes/setup-obs' },
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
			{
				text: 'Digital products',
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
					{ text: 'E-books', link: '/docs/digital-products/ebooks' },
				],
			},
			{
				text: 'Custom pages',
				collapsed: false,
				items: [
					{
						text: 'Introduction',
						link: '/docs/custom-landing-pages/introduction',
					},
					{
						text: 'Using WordPress',
						link: '/docs/custom-landing-pages/using-wordpress',
					},
					{
						text: 'Using source code',
						link: '/docs/custom-landing-pages/using-source-code',
					},
					{
						text: 'Custom redirects',
						link: '/docs/custom-landing-pages/custom-redirects',
					},
				],
			},
			{
				text: 'Marketing Tools',
				collapsed: false,
				items: [
					{
						text: 'Affiliate marketing',
						link: '/docs/marketing-tools/affiliate-marketing',
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
					{ text: 'Help', link: '/docs/manage-settings/help' },
				],
			},
		] satisfies {
			text: string
			collapsed: boolean
			items: { text: string; link: ValidRoutePathname }[]
		}[],

		socialLinks: [
			{ icon: 'x', link: 'https://x.com/fermionapp' },
			{
				icon: 'instagram',
				link: 'https://www.instagram.com/fermion.app/',
			},
			{
				icon: 'linkedin',
				link: 'https://www.linkedin.com/showcase/fermionapp/',
			},
		],

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
