# Uploading static website

<br>

When creating custom pages on Fermion, you have the flexibility to upload and host your own static websites. This powerful feature allows you to deploy custom-built web applications, landing pages, or any other web content you've developed using modern web technologies.

This guide will walk you through the process of uploading your static website to Fermion, explain how assets are handled, and provide best practices for successful deployment.

## What are static websites?

A static website consists of HTML, CSS, JavaScript, and other assets that are pre-built and ready to serve to users. Unlike dynamic websites that generate content on-the-fly, static websites are pre-rendered, making them fast, secure, and easy to deploy.

## Key benefits

- Simple deployment process through ZIP file upload
- Automatic CDN hosting for all your assets
- Support for modern web frameworks (React, Vue, etc.)
- Fast loading times and reliable performance
- Full control over your website's code and structure

## Asset hosting (CSS, JS, and other assets)

Fermion automatically hosts all static assets that are included in your build output, including:

- CSS files
- JavaScript files
- Images
- Fonts
- Other media files (videos, audio, etc.)

When you upload your ZIP file containing the build output, we automatically:

- Extracts all assets from the ZIP file
- Uploads them to our CDN (content delivery network)
- Makes them available through your unique CDN Prefix URL.

All assets will be served from a URL that looks like this: `https://custom-webpage-static-assets-production.fermion.app/[your-unique-id]/assets/...`

<br>

::: warning Please make sure that:

- All assets must be included in your build output folder before zipping

- Assets should be referenced using relative paths in your code

- The CDN ensures fast loading times globally

- There's no need to host assets separately - everything is handled automatically

- Make sure your assets are properly optimized before building (compressed images, minified CSS/JS)

:::

<br>

## How can you upload a custom page?

### Step 1:

From your dashboard, navigate to `Pages & redirects`.

![fljgnfkdjngkjfndgkjfn](https://codedamn-website-assets.s3.us-east-1.amazonaws.com/uploads/24-11-2024/32%402x.zmznlx.png)

### Step 2:

Click on `Custom pages` and go to the `Manage Fermion` section.

![fgfdgfgff](https://codedamn-website-assets.s3.us-east-1.amazonaws.com/uploads/24-11-2024/58%402x.pmticb.png)

### Step 3:

Choose from available technologies

![gfddfdfdffgff](https://codedamn-website-assets.s3.us-east-1.amazonaws.com/uploads/24-11-2024/33%402x.kxgjgj.png)

When building your static website on Fermion, you can choose from several modern web technologies. For simpler projects or custom implementations, you can use plain HTML/CSS/JavaScript.

::: info All these technologies will be properly hosted on Fermion with full asset support (CSS, JavaScript, images, etc.) through our CDN.
:::

For example: I'll be demonstrating the process by uploading a basic HTML website. So I will choose the `custom HTML website` option. Similarly, based on your requirements you can choose from available options of technologies.

### Step 4:

Click on custom HTML website

![custugbdbg](https://codedamn-website-assets.s3.us-east-1.amazonaws.com/uploads/24-11-2024/08%402x.wvlfvk.png)

<br>

::: warning Please note that this step is merely for demonstration purpose. It is not mandatory to choose the `custom HTML website` option. Please choose the option which suits the best for your needs.
:::

Once you have clicked on the option, you will see further instructions and details for deploying your website project. Note that these instructions are different for every technology.

![instructions](https://codedamn-website-assets.s3.us-east-1.amazonaws.com/uploads/24-11-2024/20%E2%80%AFPM.svvcxj.png)

### Step 5:

Prepare for the upload. Create a ZIP file containing your website files. All static assets (HTML, CSS, JavaScript, images) should be included in this ZIP file.

### Step 6:

Upload your website by clicking the "Upload website ZIP file" button. The system will process your ZIP file and deploy it to the CDN.

![sjkfkdjf](https://codedamn-website-assets.s3.us-east-1.amazonaws.com/uploads/24-11-2024/58%402x.eiirbe.png)

### Step 7:

Configure your static assets to use the CDN prefix URL. There are two ways to do this:

- Update your base href tag in your HTML:
  `<base href="https://custom-webpage-static-assets-production.fermion.app/66467a43e44cda2c9f7ab7a9-custom-zip-pages/">`

- Or prefix all your static asset URLs with the CDN URL:

  - Before: ./my-script.js
  - After: https://custom-webpage-static-assets-production.fermion.app/66467a43e44cda2c9f7ab7a9-custom-zip-pages/my-script.js

### Step 8:

Once uploaded and configured, your page will be published and accessible. You can verify this by checking the status which should show as "Published" in the pages list.

![dvfgfgf](https://codedamn-website-assets.s3.us-east-1.amazonaws.com/uploads/24-11-2024/59%402x.pldzlh.png)
