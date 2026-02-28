// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	site: 'https://tdhatcher.github.io',
	integrations: [
		starlight({
			title: 'Todd Hatcher',
			description: 'Blog & documentation on AI tooling and software development',
			logo: {
				src: './src/assets/logo.svg',
				alt: 'Todd Hatcher',
			},
			customCss: ['./src/styles/monokai.css'],
			components: {
				Sidebar: './src/components/SidebarHeader.astro',
			},
			social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/tdhatcher' }],
			lastUpdated: true,
			tableOfContents: { minHeadingLevel: 2, maxHeadingLevel: 3 },
			sidebar: [
				{ label: 'About Me', slug: 'index' },
				{
					label: 'AI Tooling Journey',
					autogenerate: { directory: 'ai-tooling' },
				},
				{
					label: 'Articles',
					items: [
						{ label: 'Overview', slug: 'articles/overview' },
						{ label: 'Comparing Static Site Generators', slug: 'articles/static-site-generator-exploration' },
					],
				},
			],
		}),
	],
});
