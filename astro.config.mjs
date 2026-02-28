import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import starlightBlog from 'starlight-blog';
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
			plugins: [starlightBlog({ title: 'Articles' })],
			customCss: ['./src/styles/theme.css'],
			components: {
				Sidebar: './src/components/SidebarHeader.astro',
			},
			social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/tdhatcher' }],
			lastUpdated: true,
			tableOfContents: { minHeadingLevel: 2, maxHeadingLevel: 3 },
			sidebar: [
				{ label: 'About Me', slug: 'index' },
				{ label: 'Articles', link: '/blog/' },
				{
					label: 'Guides',
					autogenerate: { directory: 'guides' },
				},
				{
					label: 'References',
					autogenerate: { directory: 'references' },
				},
			],
		}),
	],
});
