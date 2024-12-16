# How to bulk import syllabus?

Fermion supports bulk importing syllabus into your course. This can be handy if you have a lot of content and you want to quickly import it into your course.

## Dashboard UI

![](https://codedamn-website-assets.s3.us-east-1.amazonaws.com/uploads/07-12-2024/screenshot-000264%402x.tksjan.png)

Open any course for which you'd want to bulk import items.

1. Click on `Bulk import syllabus` from left
2. Write a valid JSON schema
3. Check with preview to make sure everything looks okay
4. Click on the `Import` button to import the items.

:::warning
Please note that once imported, you can only edit the items via Syllabus manager. Bulk importer will only allow you to import items, not edit them.
:::

## JSON Schema

In order to bulk import your curriculum, you must create a JSON object. This object can then directly be imported in our backend creating all relevant course items.

Here's the schema you have to follow:

### Recorded course

If you're importing course items in a recorded course, you have to follow the following schema:

```ts
type RecordedCourseItems = RecordedCourseItem[]
// ^ this is the type your final JSON should conform to

type RecordedCourseItem =
	| {
			type: 'Article'
			title: string
			sectionName: string
			contentMarkdown: string
	  }
	| {
			type: 'Coding Lab'
			title: string
			sectionName: string
			descriptionInMarkdown?: string
	  }
	| {
			type: 'Quiz'
			title: string
			sectionName: string
			descriptionInMarkdown?: string
			questions: {
				question: string
				answerExplanation?: string
				options: {
					option: string
					isCorrect?: boolean
				}[]
			}[]
	  }
```

Here's an example of valid JSON that conforms to the schema above:

```json
[
	{
		"type": "Article",
		"sectionName": "Welcome to my course!",
		"title": "Introduction to Programming",
		"contentMarkdown": "I'll have some intro to programming data here"
	},
	{
		"type": "Coding Lab",
		"sectionName": "Welcome to my course!",
		"title": "Hello to HTML",
		"descriptionInMarkdown": "Create an h1 tag in this lab and write your name."
	},
	{
		"type": "Coding Lab",
		"sectionName": "Welcome to my course!",
		"title": "Building a Simple React Component",
		"descriptionInMarkdown": "Hands-on practice creating your first React component from scratch."
	},
	{
		"type": "Quiz",
		"sectionName": "Welcome to my course!",
		"title": "JavaScript Fundamentals Quiz",
		"descriptionInMarkdown": "Test your knowledge of core JavaScript concepts",
		"questions": [
			{
				"question": "What is the difference between let and var in JavaScript?",
				"answerExplanation": "Let is block-scoped, while var is function-scoped.",
				"options": [
					{
						"option": "Let is block-scoped, var is function-scoped",
						"isCorrect": true
					},
					{
						"option": "They are exactly the same",
						"isCorrect": false
					},
					{
						"option": "Let is function-scoped, var is block-scoped",
						"isCorrect": false
					},
					{
						"option": "Neither has any meaningful difference",
						"isCorrect": false
					}
				]
			},
			{
				"question": "What does the spread operator do in JavaScript?",
				"answerExplanation": "The spread operator allows an iterable to expand in places where 0+ arguments are expected.",
				"options": [
					{
						"option": "Combines two arrays",
						"isCorrect": false
					},
					{
						"option": "Spreads elements of an array or object",
						"isCorrect": true
					},
					{
						"option": "Creates a deep copy of an object",
						"isCorrect": false
					},
					{
						"option": "Merges object properties",
						"isCorrect": false
					}
				]
			}
		]
	}
]
```

### Cohort-based course

If you're importing course items in a cohort course, you have to follow the following schema. The reason it is different from above course is because a cohort-based-course can also have live classes:

```ts
type CohortBasedCourseItems = CohortBasedCourseItem[]
// ^ this is the type your final JSON should conform to

type CohortBasedCourseItem =
	| {
			type: 'Live Class'
			liveClassStartAt: string
			title: string
			descriptionInMarkdown?: string
			liveClassDurationInMinutes: number
	  }
	| {
			type: 'Article'
			title: string
			itemScheduledDate?: string
			descriptionInMarkdown?: string
			contentMarkdown: string
	  }
	| {
			type: 'Coding Lab'
			title: string
			itemScheduledDate?: string
			descriptionInMarkdown?: string
	  }
	| {
			type: 'Quiz'
			title: string
			descriptionInMarkdown?: string
			itemScheduledDate?: string
			questions: {
				question: string
				answerExplanation?: string
				options: {
					option: string
					isCorrect?: boolean
				}[]
			}[]
	  }
```

Here's an example of valid JSON that conforms to the schema above:

```json
[
	{
		"type": "Live Class",
		"title": "Introduction to Web Development",
		"descriptionInMarkdown": "A comprehensive overview of modern web development techniques.",
		"liveClassStartAt": "2024-07-15T14:30:00Z",
		"liveClassDurationInMinutes": 60
	},
	{
		"type": "Article",
		"title": "Understanding JavaScript Closures",
		"itemScheduledDate": "2024-07-16T00:00:00Z",
		"descriptionInMarkdown": "A deep dive into one of JavaScript's most powerful features.",
		"contentMarkdown": "# JavaScript Closures\n\nClosures are a fundamental concept in JavaScript that allows functions to access variables from their outer (enclosing) scope even after the outer function has returned."
	},
	{
		"type": "Coding Lab",
		"title": "Building a Simple React Component",
		"itemScheduledDate": "2024-07-16T00:00:00Z",
		"descriptionInMarkdown": "Hands-on practice creating your first React component from scratch."
	},
	{
		"type": "Quiz",
		"title": "JavaScript Fundamentals Quiz",
		"itemScheduledDate": "2024-07-16T00:00:00Z",
		"descriptionInMarkdown": "Test your knowledge of core JavaScript concepts",
		"questions": [
			{
				"question": "What is the difference between let and var in JavaScript?",
				"answerExplanation": "Let is block-scoped, while var is function-scoped.",
				"options": [
					{
						"option": "Let is block-scoped, var is function-scoped",
						"isCorrect": true
					},
					{
						"option": "They are exactly the same",
						"isCorrect": false
					},
					{
						"option": "Let is function-scoped, var is block-scoped",
						"isCorrect": false
					},
					{
						"option": "Neither has any meaningful difference",
						"isCorrect": false
					}
				]
			},
			{
				"question": "What does the spread operator do in JavaScript?",
				"answerExplanation": "The spread operator allows an iterable to expand in places where 0+ arguments are expected.",
				"options": [
					{
						"option": "Combines two arrays",
						"isCorrect": false
					},
					{
						"option": "Spreads elements of an array or object",
						"isCorrect": true
					},
					{
						"option": "Creates a deep copy of an object",
						"isCorrect": false
					},
					{
						"option": "Merges object properties",
						"isCorrect": false
					}
				]
			}
		]
	}
]
```

Any errors in your JSON schema will be reported to you directly on the UI.
