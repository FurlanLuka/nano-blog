# Nano Blog: A markdown powered blog platform

A simple nano inspired blog platform, that builds from markdown and includes friendly CLI tool for managing your blog.

## Features

- Markdown managed blog content
- Friendly CLI tool for generating content
- Minimalistic, nano text editor inspired design
- Two different blog layouts

![Nano Blog](https://raw.githubusercontent.com/FurlanLuka/nano-blog/main/resources/index.png)

## Installation

### 1. Clone the repository

```bash
git clone git@github.com:FurlanLuka/nano-blog.git

cd nano-blog/blog
```

### 2. Install dependencies

```
npm install
```

### 3. Install the CLI tool

#### Use NPM package

```
npm i -g nano-blog-cli
```

#### Build CLI tool yourself

```
cd ../cli
npm install
npm run build
npm link
```

### 4. Start the blog

```
cd ../blog
npm run dev
```

Blog will be available at [http://localhost:3000](http://localhost:3000)

### 5. Build the blog

```
npm run build
```

The static build should be available in the `./out` directory. Uploading this build to a static hosting service will make your blog available online.

## CLI Usage

```
nano-blog-cli 
```
