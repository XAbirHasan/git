import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Git Mastery Guide",
  description: "Boost your productivity with git - A comprehensive guide for beginners and advanced users",
  base: '/git/',
  
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: '/logo.svg',
    
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Getting Started', link: '/guide/what-is-git' },
      { text: 'Commands', link: '/commands/status' },
      { text: 'Cheatsheet', link: '/cheatsheet' }
    ],

    sidebar: [
      {
        text: 'Introduction',
        items: [
          { text: 'What is Git?', link: '/guide/what-is-git' },
          { text: 'Getting Started', link: '/guide/getting-started' }
        ]
      },
      {
        text: 'Basic Commands',
        collapsed: false,
        items: [
          { text: 'Git Status', link: '/commands/status' },
          { text: 'Git Commit', link: '/commands/commit' },
          { text: 'Git Log', link: '/commands/log' },
          { text: 'Git Branch', link: '/commands/branch' }
        ]
      },
      {
        text: 'Advanced Commands',
        collapsed: false,
        items: [
          { text: 'Git Stash', link: '/commands/stash' },
          { text: 'Git Cherry-Pick', link: '/commands/cherry-pick' },
          { text: 'Git Rebase', link: '/commands/rebase' },
          { text: 'Git Reset', link: '/commands/reset' },
          { text: 'Git Revert', link: '/commands/revert' },
          { text: 'Git Tag', link: '/commands/tag' },
          { text: 'Git Reflog', link: '/commands/reflog' },
          { text: 'Git Bisect', link: '/commands/bisect' }
        ]
      },
      {
        text: 'Tools & Techniques',
        items: [
          { text: 'Working with Patches', link: '/tools/patch' }
        ]
      },
      {
        text: 'Resources',
        items: [
          { text: 'Cheatsheet', link: '/cheatsheet' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/XAbirHasan/git' }
    ],

    search: {
      provider: 'local'
    },

    footer: {
      message: 'Released under the MIT License and CC BY-SA 4.0.',
      copyright: 'Copyright © 2025 Abir Hasan'
    },

    editLink: {
      pattern: 'https://github.com/XAbirHasan/git/edit/master/docs/:path',
      text: 'Edit this page on GitHub'
    }
  },

  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/logo.svg' }],
    ['meta', { name: 'theme-color', content: '#5f67ee' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:locale', content: 'en' }],
    ['meta', { property: 'og:title', content: 'Git Mastery Guide | Boost Your Productivity' }],
    ['meta', { property: 'og:site_name', content: 'Git Mastery Guide' }],
    ['meta', { property: 'og:url', content: 'https://xabirhasan.github.io/git/' }],
  ]
})
