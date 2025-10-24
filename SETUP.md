# VitePress Site Setup Instructions

This document explains how to set up and deploy your Git documentation VitePress site.

## ✅ What Has Been Created

### Project Structure
```
git/
├── docs/                           # VitePress documentation folder
│   ├── .vitepress/
│   │   └── config.mts             # VitePress configuration
│   ├── public/
│   │   └── logo.svg               # Site logo
│   ├── commands/                   # Command documentation
│   │   ├── status.md
│   │   ├── commit.md
│   │   ├── log.md
│   │   ├── branch.md
│   │   ├── stash.md
│   │   ├── cherry-pick.md
│   │   ├── rebase.md
│   │   ├── reset.md
│   │   ├── revert.md
│   │   ├── tag.md
│   │   ├── reflog.md
│   │   └── bisect.md
│   ├── guide/                      # Getting started guides
│   │   ├── what-is-git.md
│   │   └── getting-started.md
│   ├── tools/
│   │   └── patch.md
│   ├── index.md                    # Home page with hero layout
│   └── cheatsheet.md              # Complete command reference
├── .github/
│   └── workflows/
│       └── deploy.yml             # GitHub Pages deployment workflow
├── package.json                    # Node.js dependencies
├── .gitignore                      # Git ignore file
├── MIT-LICENSE                     # MIT License (code)
├── LICENSE                         # CC BY-SA 4.0 (documentation)
└── README.md                       # Updated README

```

## 🚀 Getting Started

### Step 1: Install Dependencies

```bash
npm install
```

This will install VitePress and all required dependencies.

### Step 2: Run Development Server

```bash
npm run docs:dev
```

Visit `http://localhost:5173` in your browser to see your site.

### Step 3: Build for Production

```bash
npm run docs:build
```

This creates optimized production files in `docs/.vitepress/dist`.

### Step 4: Preview Production Build

```bash
npm run docs:preview
```

## 📦 Deploying to GitHub Pages

### Automatic Deployment (Recommended)

The project is already configured for automatic deployment. Just follow these steps:

1. **Enable GitHub Pages**:
   - Go to your repository on GitHub
   - Click **Settings**
   - Scroll to **Pages** section (left sidebar)
   - Under **Source**, select **GitHub Actions**

2. **Push your changes**:
   ```bash
   git add .
   git commit -m "Set up VitePress site"
   git push origin master
   ```

3. **Wait for deployment**:
   - Go to the **Actions** tab in your repository
   - Watch the deployment workflow run
   - Once complete, your site will be live at: `https://xabirhasan.github.io/git/`

### Manual Deployment

If you prefer manual deployment:

1. Build the site:
   ```bash
   npm run docs:build
   ```

2. The built files will be in `docs/.vitepress/dist`

3. You can deploy these files to any static hosting service

## 🎨 Customization

### Update Base URL

If your repository name is different from "git", update the base URL in `docs/.vitepress/config.mts`:

```typescript
export default defineConfig({
  base: '/your-repo-name/',  // Change this
  // ...
})
```

### Change Theme Colors

Edit `docs/.vitepress/config.mts` to customize colors:

```typescript
themeConfig: {
  // ... existing config
}
```

### Add More Pages

1. Create a new `.md` file in the appropriate folder
2. Add it to the sidebar in `docs/.vitepress/config.mts`

Example:
```typescript
sidebar: [
  {
    text: 'Your Section',
    items: [
      { text: 'New Page', link: '/path/to/page' }
    ]
  }
]
```

## 📝 Content Guidelines

### Writing Documentation

- Use clear, concise language
- Include code examples with syntax highlighting
- Add practical examples
- Use proper markdown formatting

### Code Blocks

Use triple backticks with language identifier:

\`\`\`bash
git status
\`\`\`

### Callouts

VitePress supports special callouts:

```markdown
::: tip
This is a tip
:::

::: warning
This is a warning
:::

::: danger
This is a danger message
:::
```

## 🔧 Troubleshooting

### Build Errors

If you encounter build errors:

1. Delete `node_modules` and reinstall:
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

2. Clear VitePress cache:
   ```bash
   rm -rf docs/.vitepress/cache
   ```

### GitHub Pages Not Working

1. Ensure GitHub Pages is enabled in repository settings
2. Check that the workflow has **write** permissions:
   - Go to Settings > Actions > General
   - Set "Workflow permissions" to "Read and write permissions"

3. Verify the base URL in config matches your repository name

### Port Already in Use

If port 5173 is in use:

```bash
npm run docs:dev -- --port 3000
```

## 📚 Features

### Search

Local search is enabled by default. Users can press `/` or `Ctrl+K` to search.

### Dark Mode

Dark mode toggle is automatically available in the navigation.

### Mobile Responsive

The site is fully responsive and works on all devices.

### Edit on GitHub

Each page has an "Edit this page on GitHub" link at the bottom.

## 🔄 Workflow

### Development Workflow

1. Create/edit content in `docs/` folder
2. Run `npm run docs:dev` to preview
3. Commit and push changes
4. GitHub Actions automatically deploys

### Content Organization

- **Commands**: Detailed command documentation
- **Guide**: Getting started and conceptual guides  
- **Tools**: Additional tools and techniques
- **Cheatsheet**: Quick reference

## 📄 Licenses

This project uses dual licensing:

- **MIT License** (`MIT-LICENSE`): For code, configuration, and software components
- **CC BY-SA 4.0** (`LICENSE`): For documentation content

## 🎉 What's Next?

1. Install dependencies: `npm install`
2. Start dev server: `npm run docs:dev`
3. Enable GitHub Pages in repository settings
4. Push to master branch
5. Your site will be live! 🚀

## 💡 Tips

- Keep commits focused and descriptive
- Test locally before pushing
- Use the cheatsheet for quick reference
- Update documentation as Git evolves
- Encourage community contributions

## 🤝 Need Help?

- VitePress Documentation: https://vitepress.dev/
- GitHub Pages Help: https://docs.github.com/pages
- Issues: Open an issue in the repository

---

**Enjoy your new VitePress documentation site!** 🎊
