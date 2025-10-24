# Git Mastery Guide

[![Deploy VitePress](https://github.com/XAbirHasan/git/actions/workflows/deploy.yml/badge.svg)](https://github.com/XAbirHasan/git/actions/workflows/deploy.yml)

> **Boost your productivity with git** - A comprehensive guide for beginners and advanced users

## 🚀 Live Documentation

Visit the live documentation at: [https://xabirhasan.github.io/git/](https://xabirhasan.github.io/git/)

## 📖 About

Welcome everyone! 

When I first started using Git, I have to admit, I was a bit intimidated. I had heard so much about it and knew it was an essential tool for any developer, but I didn't know where to begin. I struggled with understanding the basic commands and couldn't seem to wrap my head around the whole concept of version control.

I started by going through online tutorials, reading documentation, and experimenting with different commands. I would spend hours trying to understand the different branches, commits, and merge conflicts, but I was determined to make it work. And eventually, with a lot of practice and patience, it clicked.

I hope that by sharing my experience, I can help others who may be struggling with Git at the beginning. I know it can be overwhelming, but trust me, it's worth it. With the right mindset, patience and resources, you too can master Git and improve your workflow.

This guide is designed for both beginners and advanced users who want to master the art of Git and improve their workflow. Whether you are a new developer just starting out with version control or an experienced professional looking to optimize your Git skills, this guide has something for everyone. We will cover essential Git commands, advanced techniques, and helpful hacks that will help you work more efficiently and effectively with Git. So let's dive in and discover the full power of Git!

## ✨ Features

- 📚 **Comprehensive Documentation** - From basic commands to advanced techniques
- 🎯 **Beginner Friendly** - Clear explanations with practical examples
- ⚡ **Quick Reference** - Complete cheatsheet for common commands
- 🚀 **Advanced Techniques** - Master rebasing, cherry-picking, bisecting, and more
- 💡 **Real-World Examples** - Learn through practical scenarios
- 🔧 **Best Practices** - Industry-standard workflows and tips


## 🛠️ Local Development

### Prerequisites

- Node.js version 18 or higher
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/XAbirHasan/git.git
cd git

# Install dependencies
npm install
```

### Development Server

```bash
# Start the dev server
npm run docs:dev
```

Visit `http://localhost:5173` to view the documentation.

### Build

```bash
# Build for production
npm run docs:build

# Preview the production build
npm run docs:preview
```

## 📂 Project Structure

```
.
├── docs/
│   ├── .vitepress/
│   │   └── config.mts          # VitePress configuration
│   ├── commands/                # Command documentation
│   ├── guide/                   # Getting started guides
│   ├── tools/                   # Tools and techniques
│   ├── cheatsheet.md           # Complete command reference
│   └── index.md                # Home page
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Pages deployment
└── package.json
```

## 🚀 Deployment to GitHub Pages

This project automatically deploys to GitHub Pages when changes are pushed to the `master` branch.

### Setup Instructions

1. **Enable GitHub Pages**:
   - Go to your repository **Settings**
   - Navigate to **Pages** section
   - Under **Source**, select **GitHub Actions**

2. **Push to master**:
   ```bash
   git add .
   git commit -m "Deploy VitePress site"
   git push origin master
   ```

3. **Access your site**:
   - Your site will be available at: `https://xabirhasan.github.io/git/`
   - The workflow will automatically build and deploy on every push to master

### Manual Build

To build locally:

```bash
npm run docs:build
```

The built files will be in `docs/.vitepress/dist`

## Git in-depth

Visit the [live documentation](https://xabirhasan.github.io/git/) for detailed guides on:

- [What is Git](https://xabirhasan.github.io/git/guide/what-is-git)
- [Getting Started](https://xabirhasan.github.io/git/guide/getting-started)
- [Git Status](https://xabirhasan.github.io/git/commands/status)
- [Git Log](https://xabirhasan.github.io/git/commands/log)
- [Git Commit](https://xabirhasan.github.io/git/commands/commit)
- [Git Cherry-Pick](https://xabirhasan.github.io/git/commands/cherry-pick)
- [Git Branch](https://xabirhasan.github.io/git/commands/branch)
- [Git Stash](https://xabirhasan.github.io/git/commands/stash)
- [Patches](https://xabirhasan.github.io/git/tools/patch)
- [Git Tag](https://xabirhasan.github.io/git/commands/tag)
- [Git Reset](https://xabirhasan.github.io/git/commands/reset)
- [Git Revert](https://xabirhasan.github.io/git/commands/revert)
- [Git Rebase](https://xabirhasan.github.io/git/commands/rebase)
- [Git Bisect](https://xabirhasan.github.io/git/commands/bisect)
- [Git Reflog](https://xabirhasan.github.io/git/commands/reflog)

## Presentation Slides
- � [Google Slides Presentation](https://docs.google.com/presentation/d/1m0p_X8EIhBhEi5-Qr8kFxBSDy3amSwcv/edit?usp=sharing&ouid=104311828414183489242&rtpof=true&sd=true)

## 🤝 Contributing

Contributions are welcome! Feel free to:

- Report bugs
- Suggest new features
- Improve documentation
- Fix typos

## 📄 License

This project is dual-licensed:

- **Code/Software**: [MIT License](./MIT-LICENSE)
- **Documentation**: [Creative Commons Attribution-ShareAlike 4.0 International License](./LICENSE)

## 👤 Author

**Abir Hasan**

- GitHub: [@XAbirHasan](https://github.com/XAbirHasan)

## 🙏 Acknowledgments

Thanks to everyone who has contributed to making this guide better!

---

**Built with [VitePress](https://vitepress.dev/)** 💚

