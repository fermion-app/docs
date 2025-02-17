# How to embed a Video externally

This guide explains how to embed recorded videos into external websites.

## Getting started

-   Video ID
-   Fermion API key (only if you disable public embeds)
-   Access to your website's codebase

## Step 1: Obtain the video ID

Each video on fermion has a unique identifier. For example `6779080e80ec97e953a17971`. First, go to `Manage features` tab on your instructor dashboard and enable `Video library`

![](https://codedamn-website-assets.s3.us-east-1.amazonaws.com/uploads/16-02-2025/screenshot-001155.joduvu.png)

After that, go to `Video library` and upload a video if you haven't.

![](https://codedamn-website-assets.s3.us-east-1.amazonaws.com/uploads/16-02-2025/screenshot-001156.reocnd.png)

## Step 2: Open embed video page

Once your video is ready, you would be able to see `Embed video` as an option in `Actions` column on this page. Click on that. It will open a view like this:

![](https://codedamn-website-assets.s3.us-east-1.amazonaws.com/uploads/17-02-2025/screenshot-001158.fktawa.png)

You can make the video publicly embeddable here. If you do that, you do not need to generate JWT embed token (in the step below)

## Step 3: Generate an Embed Token

You'll need to generate a JWT (JSON Web Token) to authenticate the embed, this is only required if your video is not public. Here's how to create one using the `jsonwebtoken` package:

```javascript
import jwt from 'jsonwebtoken'

const payloadObject = {
	/* ... see the valid schema of the object below ... */
}

const jwtToken = jwt.sign(payloadObject, 'FERMION_API_KEY', {
	expiresIn: '10h',
})
```

The `payloadObject` must conform to the following zod schema:

```js
z.object({
	type: z.literal('external-embed'),
	videoId: z.string(),
	userId: z.string(),
})
```

Important notes:

-   Replace `FERMION_API_KEY` with your actual API key and provide a unique user ID for each viewer.
-   Make sure to set a validity on JWT token (recommended validity is 10h-20h)

:::info
Fermion uses the same zod schema as above internally to validate your JWT payload.
:::

## Step 4: Embed the video

Add this iframe to your website where you want to embed the video:

```html
<iframe
	width="1280"
	height="720"
	src="https://acme.fermion.app/embed/recorded-video?video-id=video_id_here&token=your_token_here"
	title="Video"
	frameborder="0"
	allow="allow-same-origin; camera *;microphone *;display-capture *;encrypted-media;"
	referrerpolicy="strict-origin-when-cross-origin"
	allowfullscreen
>
</iframe>
```

:::tip
You do not need to pass `token` parameter in case you have made the video public
:::

This should embed your video and start playback
