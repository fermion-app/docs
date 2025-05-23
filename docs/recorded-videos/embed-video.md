# How to embed a video externally

This guide explains how to embed recorded videos into external websites.

## Embed with Fermion video player

Fermion video player is a built-in player that can automatically support DRM protected playback, HLS clearkey playback, refreshing access keys and playing your video in the most secure manner. This is a recommended approach. Further in this document, you'll also find how to get m3u8 playlist directly to be used with any player.

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

## Embed without Fermion video player

It is possible to embed videos you have uploaded on Fermion without Fermion video player as well. However, this is only for advanced use cases (and not recommended by us).

-   Fermion encodes all videos by default with clearkey encryption. This means the playback requires you to decrypt the video using a signing key.
-   Fermion also processes videos into multiple resolutions and keep m3u8 files separate for each resolution. In the default Fermion player, the files are combined together to support ABR, but for this implementation you need to do it manually to support ABR.
-   Fermion storage for videos is private/WAF protected by default and requires presigned URLs (even for video segments). This is a security measure to prevent scraping/downloading of videos. If you are implementing your own player, you must modify your requests to support presigned URL signature append mechanism (more details below).

Here is how it needs to work:

-   Call `get-signed-url-data-for-recorded-video-playback` API from your server with proper Fermion API key. This will return you data for HLS playback.
-   The API will return you playback sources with m3u8 file pathnames, CDN origin, decryption key, and signed URL search parameters.
-   Imagine an example payload response like this:

```json
{
	"quality": "Quality1080",
	"origin": "https://cdn-storage.fermion.app",
	"m3u8Pathname": "/path/to/your/playlist.m3u8",
	"decryptionKey": "6815d8748df5297181862d32",
	"signedUrlSearchParams": "?verify=signature_here"
}
```

-   Construct your player to use the final m3u8 URL to playback: `https://cdn-storage.fermion.app/path/to/your/playlist.m3u8?verify=signature_here`
-   Imagine the m3u8 content returns you the following:

```json
#EXTM3U
#EXT-X-VERSION:7
#EXT-X-TARGETDURATION:10
#EXT-X-MEDIA-SEQUENCE:0

#EXT-X-KEY:METHOD=AES-128,URI="https://video-decoder-service.com/decryption.key",IV=0x00000000000000000000000000000001,KEYFORMAT="identity",KEYFORMATVERSIONS="1"

#EXTINF:10.0,
segment0.ts
#EXTINF:10.0,
segment1.ts
#EXTINF:10.0,
segment2.ts

#EXT-X-ENDLIST
```

-   Next, you must intercept requests to the segment files to append `signedUrlSearchParams`
-   For example, after reading the manifest file, the browser will try to request `https://cdn-storage.fermion.app/path/to/your/segment0.ts` but the actual request URL must be `https://cdn-storage.fermion.app/path/to/your/segment0.ts?verify=signature_here`
-   Furthermore, you must discard `URI` present in the manifest file to get the decryption key, and use `decryptionKey` returned by the API. This key is base64 encoded so you must decode it (see the example below).

The decoder service URL is used by Fermion video player (#1) service worker to intercept the request to put rate limits on it as a security feature.

Once you have configured the decryption key, signed URL search params and a custom player, your video playback should start.

## Example code for embedding video without Fermion player

The code snippet below is pseudo code but it is functional implementation. You must however replace it with appropirate API/backend calls yourself.

```js

const processM3u8 = (m3u8Content: string, options: M3U8Options) => {
	const { segmentBaseUrl, keyUri, signedUrlSearchParams } = options

	const lines = m3u8Content.split('\n')
	const processedLines: string[] = []
	let keyInserted = false

	for (let i = 0; i < lines.length; i++) {
		const line = lines[i].trim()

		if (line === '#EXTM3U') {
			processedLines.push(line)
		} else if (line.startsWith('#EXT-X-KEY')) {
			const ivMatch = line.match(/IV=([^,]+)/)
			const iv = ivMatch ? ivMatch[1] : undefined

			if (!iv) {
				throw new Error('IV not found in #EXT-X-KEY line')
			}

			if (!keyInserted) {
				processedLines.push(`#EXT-X-KEY:METHOD=AES-128,URI="${keyUri}",IV=${iv}`)
			} else {
				processedLines.push(line)
			}

			keyInserted = true
		} else  if (line !== '' && !line.startsWith('#')) {
			const fullUrl = `${segmentBaseUrl}/${line}${signedUrlSearchParams}`
			processedLines.push(fullUrl)
		} else {
			processedLines.push(line)
		}
	}

	return processedLines.join('\n')
}

const getPlayableM3u8Url = async () => {
	interface M3U8Options {
		segmentBaseUrl: string
		signedUrlSearchParams: string
		keyUri: string
	}

	// this call must be made on your backend server
	// this is the call to `get-signed-url-data-for-recorded-video-playback`
	const response = await getSignedUrlDataForRecordedVideoPlayback({
		data: {
			videoId: '<ID of the video>'
		}
	})

	// get just first source for now
	// you may optionally choose to construct a new m3u8 playlist altogether including all sources
	const sourceToPlay = response.data.playbackSources[0]

	// construct base URL
	const m3u8Url = `${sourceToPlay.origin}${sourceToPlay.m3u8Pathname}${sourceToPlay.signedUrlSearchParams}`

	// download original file for further patching
	const m3u8Content = await fetch(m3u8Url).then(t => t.text())

	// construct the decryption key for HLS
	const decryptionKey = new Uint8Array(sourceToPlay.decryptionKey.length / 2)

	for (let i = 0; i < sourceToPlay.decryptionKey.length; i += 2) {
		decryptionKey[i / 2] = parseInt(sourceToPlay.decryptionKey.substring(i, i + 2), 16)
	}

	// construct the final m3u8 playable URL
	const finalM3U8 = processM3u8(m3u8Content, {
		segmentBaseUrl: `${sourceToPlay.origin}${sourceToPlay.m3u8Pathname
			.split('/')
			.slice(0, -1)
			.join('/')}`,
		signedUrlSearchParams: sourceToPlay.signedUrlSearchParams,
		keyUri: `data:text/plain;base64,${window.btoa(
			String.fromCharCode.apply(null, decryptionKey)
		)}`
	})

	// pass this m3u8BlobUrl to your HLS player, it should playback the video
	const m3u8BlobUrl = URL.createObjectURL(new Blob([finalM3U8], { type: 'text/plain' }))

	console.log(m3u8BlobUrl)
}
```
