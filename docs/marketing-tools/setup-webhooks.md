# Using Webhooks

Webhooks are an essential feature for integrating external services with Fermion. They enable real-time notifications and actions based on specific events that occur within your course platform. This article will guide you through setting up and using webhooks effectively. 

## When and Why Webhooks are Needed

Webhooks are needed when you want to automate tasks or notifications based on events that happen in your Fermion course. For example, you might want to:

- Notify your CRM system when a new user enrolls in a course.
- Update your accounting software when a payment is completed.
- Provide a third-party solution to a user. That's exclusively available. 

By setting up webhooks, you can ensure that your external systems are always up-to-date with the latest events from your Fermion courses and provide any external features to the students when they enroll. 

## Setting Up Your Webhook URL

To start using webhooks, you need to configure a webhook URL where Fermion will send notifications about specific events. Follow these steps:

1. **Navigate to the Webhooks Settings**: Go to your Fermion dashboard and find the Webhooks page on the sidebar. 
2. **Enter Your Webhook URL**: In the Webhook URL field, enter the URL of your server endpoint that will handle the webhook events.
3. **Set the Webhook Secret**: Ensure the integrity of your webhook events by setting a secret. This secret will be sent in every webhook event in a header named `X-Fermion-Webhook-Secret`. Your server must validate all incoming requests and check if this header is present with the correct value.

![zgAraTSoeLhzT6cj_L3w_](https://creator-assets.codedamn.com/fermion-instructor/06-08-2024/instructor_66467ae8ada1f52e23942268/zgAraTSoeLhzT6cj_L3w_)

Webhooks are an essential feature for integrating external services with Fermion. They enable real-time notifications and actions based on specific events that occur within your course platform. This article will guide you through setting up and using webhooks effectively. 

## When and Why Webhooks are Needed

Webhooks are needed when you want to automate tasks or notifications based on events that happen in your Fermion course. For example, you might want to:

- Notify your CRM system when a new user enrolls in a course.
- Update your accounting software when a payment is completed.
- Trigger marketing automation workflows based on user actions.

By setting up webhooks, you can ensure that your external systems are always up-to-date with the latest events from your Fermion courses and provide any external features to the students when they enroll. 

## Setting Up Your Webhook URL

To start using webhooks, you need to configure a webhook URL where Fermion will send notifications about specific events. Follow these steps:

1. **Navigate to the Webhooks Settings**: Go to your Fermion dashboard and find the Webhooks page on the sidebar. 
2. **Enter Your Webhook URL**: In the Webhook URL field, enter the URL of your server endpoint that will handle the webhook events.
3. **Set the Webhook Secret**: Ensure the integrity of your webhook events by setting a secret. This secret will be sent in every webhook event in a header named `X-Fermion-Webhook-Secret`. Your server must validate all incoming requests and check if this header is present with the correct value.

As this is a publicly available endpoint on your end, it's critical to ensure that the data you're reading is coming from the rightful place. 

![UNybrTLfTVJutlgZaATe9](https://creator-assets.codedamn.com/fermion-instructor/06-08-2024/instructor_66467ae8ada1f52e23942268/UNybrTLfTVJutlgZaATe9)

## Webhook Events

Currently, Fermion supports webhooks for four specific events, you can choose to turn on/off each specific event based on your requirements. 

1. **Free Course Enrollment**: Triggered when a user enrolls in a free course.
2. **Paid Course Sale**: Triggered when a user purchases a paid course.
3. **Payment Failed**: Triggered when a user's payment fails for any reason.
4. **Payment Initiated But Never Completed**: Triggered when a user initiates a purchase but does not complete it within 60 minutes.

![dqhY_vebLjJ6yUoFgasJu](https://creator-assets.codedamn.com/fermion-instructor/06-08-2024/instructor_66467ae8ada1f52e23942268/dqhY_vebLjJ6yUoFgasJu)


## Webhooks Schema

Here is a sample TypeScript type to understand the data format of the Free Course Enrollment event that will be sent for each webhook. You can click on the "copy" icon to see the schema of each webhook event and configure your endpoint for getting the data from the event. 

```typescript
type FermionWebhookEventFreeCourseEnrollmentType = {
  eventUniqueId: string;
  timestampIsoString: string;
  isTestEvent: boolean;
  payload: {
    eventType: 'free-course-enrollment';
    userId: string;
    userFullname: string;
    userEmail: string;
    userPhoneNumber: string | null;
    courseSlug: string;
    courseName: string;
  };
};
```

![FfrSicNqeZyKvBnAMcAie](https://creator-assets.codedamn.com/fermion-instructor/06-08-2024/instructor_66467ae8ada1f52e23942268/FfrSicNqeZyKvBnAMcAie)

## Testing Webhooks

Fermion provides a test button to help you ensure that your webhooks are working correctly. You can use this feature to send test events to your webhook URL and verify that your server is handling them as expected. You can manually trigger a test event by clicking on the `flask` icon. 

![Z1-Tr-1JW7d3pUqqMQxhr](https://creator-assets.codedamn.com/fermion-instructor/06-08-2024/instructor_66467ae8ada1f52e23942268/Z1-Tr-1JW7d3pUqqMQxhr)


## Accessing Webhook Event Logs

All webhook events are logged and available on the Webhook Event Logs page. You can view the logs, copy the data, or re-trigger the webhook if your endpoint failed to capture it.

You can manually copy the contents of the event or directly re-trigger the event from the Event Logs table. 

![dThgfmUfMZreIOgqLmvz2](https://creator-assets.codedamn.com/fermion-instructor/06-08-2024/instructor_66467ae8ada1f52e23942268/dThgfmUfMZreIOgqLmvz2)

## Exporting Event Logs 

If you need the entire data of the events in one go for running a script or for housekeeping. You can click on the "export data" button to the right of the heading. You can select the time range and the events that you want. The data would be exported to a CSV file and downloaded immediately on your computer. 

![Ctaqe53b1dtu6WibEHvSv](https://creator-assets.codedamn.com/fermion-instructor/06-08-2024/instructor_66467ae8ada1f52e23942268/Ctaqe53b1dtu6WibEHvSv)
