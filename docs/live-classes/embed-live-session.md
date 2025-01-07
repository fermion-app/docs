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

const jwtToken = jwt.sign(
	{
		liveEventSessionId: '6779080e80ec97e953a17971',
		userId: '<enter a user ID here unique to every user>',
	},
	'FERMION_API_KEY',
	{
		expiresIn: '1h',
	}
)
```

**Note:** Replace `FERMION_API_KEY` with your actual API key and provide a unique user ID for each viewer.

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
