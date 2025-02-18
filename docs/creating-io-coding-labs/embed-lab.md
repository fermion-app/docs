# How to embed IO coding lab?

This article discusses integrating an IO coding lab externally on your website.

## How to embed a coding lab from Fermion?

Before starting the embed process, you need two things:

1. A school on Fermion
2. Fermion API key

## Getting lab ID

Go to `Manage features` from your instructor dashboard and enable `Coding labs` if you haven't done that yet.

![](https://codedamn-website-assets.s3.us-east-1.amazonaws.com/uploads/18-02-2025/screenshot-001199%402x.xuretn.png)

Once done, open `Coding lab` from sidebar and create a new IO lab.

Click on the `Embed` button to obtain the ID of that lab.

## Generating JWT

On any page in which you wish to let the user attempt the lab, you need to embed an iframe as follows:

```xml
<iframe
	width="1280"
	height="720"
	src="https://acme.fermion.app/embed/io-coding-lab?token=EMBED_TOKEN_HERE"
	title="Coding Lab"
	frameborder="0"
	allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope;
	picture-in-picture; web-share"
	referrerpolicy="strict-origin-when-cross-origin"
	allowfullscreen>
</iframe>
```

Here, the `EMBED_URL` needs to be securely generated on your backend as follows:

1. The embed URL will always contain the following part: [`https://acme.fermion.app/embed/io-coding-lab?token=TOKEN_HERE`](https://acme.fermion.app/embed/io-coding-lab?token=TOKEN_HERE)
2. After this, you need to generate a JWT (JSON Web Token) containing the following claims:The JWT token must be signed with your Fermion API Key. Example JWT: [here](https://jwt.io/#debugger-io?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsYWJJZCI6ImFiY2QiLCJ1c2VySWQiOiJ4eXoiLCJpYXQiOjE1MTYyMzkwMjJ9.9SKcAU52Qad6MERnzy1kF4Y0A3SoAWuGfpmE97JDYOo)
    1. `labId` (String) – This is the unique identifier of the lab as mentioned above.
    2. `userId` (String) – This is a string that you have stored in your database that can uniquely identify a given user. You have to ensure that you store this identifier properly in your database and reuse it every time a user tries to access any lab.
3. Append this generated JWT token to the end to get the final embed URL.

Example JavaScript code to generate `EMBED_URL` securely on your backend server:

This example uses the [jsonwebtoken package](https://www.npmjs.com/package/jsonwebtoken) to generate a JWT Token.

```js
import jwt from 'jsonwebtoken'

const jwtToken = jwt.sign(
	{
		labId: '66a9202ab1458d00083ff520',
		userId: '<enter a user ID here unique to every user>',
	},
	'FERMION_API_KEY',
	{ expiresIn: '1h' }
)

const EMBED_URL =
	'https://example.fermion.app/embed/io-coding-lab?token=' +
	encodeURIComponent(jwtToken)
```

## How can I access lab results?

### Public API

We have an OpenAPI-spec compliant public API you can use, once you have access to FERMION_API_KEY. You can use this API to query multiple data points for your organization.

Please check the [API documentation here](https://api.fermion.app).

## Have a doubt?

In case something doesn’t work right, or you have any doubt, please feel free to reach out to us at [support@codedamn.com](mailto:support@codedamn.com) with your query, we’d be happy to resolve it at the earliest.
