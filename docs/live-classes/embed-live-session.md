# How to Embed a Live Session Externally

This guide explains how to embed Fermion live sessions into external websites, including both the main session view and chat functionality.

## Getting Started

### Prerequisites

-   A Fermion live session ID
-   Fermion API key
-   Access to your website's codebase

## Step 1: Obtain the Live Session ID

Each live session has a unique identifier. For example `6779080e80ec97e953a17971`. You will be able to create a Live session from your dashboard.

First, create a new live event.

:::tip
If you cannot see `Live events` tab in your dashboard, go to `Manage features` tab at the top and enable live events.
:::

![](https://codedamn-website-assets.s3.us-east-1.amazonaws.com/uploads/04-01-2025/screenshot-000662%402x.bbidar.png)

After that, go to `Manage sessions` to create a new session inside a live event:

![](https://codedamn-website-assets.s3.us-east-1.amazonaws.com/uploads/04-01-2025/screenshot-000663%402x.yakscf.png)

:::tip
A single live event can contain multiple live sessions.
:::

## Step 2: Generate an Embed Token

You'll need to generate a JWT (JSON Web Token) to authenticate the embed. Here's how to create one using the `jsonwebtoken` package:

```javascript
import jwt from 'jsonwebtoken'

const payloadObject = {
	/* ... see the valid schema of the object below ... */
}

const jwtToken = jwt.sign(payloadObject, 'FERMION_API_KEY', {
	expiresIn: '1h',
})
```

The `payloadObject` must conform to the following zod schema:

```js
z.object({
	liveEventSessionId: z.string(),
	userId: z.string(),

	playbackOptions: z
		.object({
			// If you pass this as true, system would enforce only 1080p and 720p modes of playback. Note: Passing this as true might result in buffering on user side if their internet is not fast (as this disables low quality playback versions)
			shouldPreferOnlyHighDefinitionPlayback: z.boolean().default(false),

			// If you pass this as true, it will hide the seek controls (seekbar and jump forward/backward buttons) from the UI
			shouldHideSeekControls: z.boolean().default(false),

			// If you pass this as true, once the livestream ends, the same JWT that is used to embed the stream would not be able to playback the recorded version of the video
			shouldDisallowRecordedPlaybackIfNotLive: z.boolean().default(false),
		})
		.default({
			shouldDisallowRecordedPlaybackIfNotLive: false,
			shouldPreferOnlyHighDefinitionPlayback: false,
			shouldHideSeekControls: false,
		}),
})
```

Important notes:

-   Replace `FERMION_API_KEY` with your actual API key and provide a unique user ID for each viewer.
-   `shouldPreferOnlyHighDefinitionPlayback` if `true`, will disable low quality playbacks (any playback other than 1080p/720p)
-   `shouldHideSeekControls` if `true`, will disable the ability to seek back and forward. The user will not be able to go back in livestream
-   `shouldDisallowRecordedPlaybackIfNotLive` if `true`, will not allow user to watch recording again when the livestream ends with the same JWT. You must create a new JWT with `shouldDisallowRecordedPlaybackIfNotLive` set as `false` if you want user to be able to play video recording.
-   `playbackOptions` is optional. If you do not pass this object we will use the defaults as mentioned above.

:::info
Fermion uses the same zod schema as above internally to validate your JWT payload.
:::

## Step 3: Embed the Live Session

### Main Session View

Add this iframe to your website where you want to embed the live session:

```html
<iframe
	width="1280"
	height="720"
	src="https://acme.fermion.app/embed/live-session?token=your_token_here"
	title="Live event session"
	frameborder="0"
	allow="allow-same-origin; camera *;microphone *;display-capture *;"
	referrerpolicy="strict-origin-when-cross-origin"
	allowfullscreen
>
</iframe>
```

### Chat Integration

To embed the live session chat, use this iframe:

```html
<iframe
	width="1280"
	height="720"
	src="https://acme.fermion.app/embed/live-session-chat?token=your_token_here"
	title="Live event session"
	frameborder="0"
	allow="allow-same-origin; camera *;microphone *;display-capture *;"
	referrerpolicy="strict-origin-when-cross-origin"
	allowfullscreen
>
</iframe>
```

## Lifecycle

You must also begin and end the streaming session via API calls. Inactive sessions with no instructor participants going on for more than 2 hours will be automatically terminated.

Please refer to fermion API here to learn more about these endpoints: https://api.fermion.app

![](https://codedamn-website-assets.s3.us-east-1.amazonaws.com/uploads/07-01-2025/screenshot-000686%402x.dvsmpq.png)

## Important Notes

1. **Viewing Modes:**

    - By default, the live event starts in HLS mode (view-only)
    - For instructors who need WebRTC (meeting mode), call the `modify-user-state-in-live-event-session` private API endpoint. Check the documentation for it.
    - The same embed code and token work for both viewers and instructors

2. **Security:**
    - Always generate unique tokens for each user
    - Set appropriate token expiration times
    - Keep your Fermion API key secure

## Additional Resources

For more information about modifying user states and other API endpoints, please refer to our API documentation.
