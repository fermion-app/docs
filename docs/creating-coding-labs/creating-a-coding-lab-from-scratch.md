# Crash course on setting up interactive labs

When you're starting off, it is better to learn a lot about coding labs Fermion since it has a slight learning curve. Once you have setup your first few labs and courses, you'll be able to do more in no time.

Here is a 1-hour crash course (broken down by chapter) to get you familiar with the full architecture. The recommended way to watch it is at 1.5x-2x speed, with pausing and going back at parts that seems confusing.

<iframe width="560" height="315" src="https://www.youtube.com/embed/FAHI-wOj6lQ?si=-idU5MIxulS9pCIn" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

## Getting started

-   Step 1:
    Click on the '+' icon to expand the options tray.
    ![4Xu2J885Y2KduG9omJEJG](https://creator-assets.codedamn.com/fermion-instructor/05-08-2024/instructor_66467ae8ada1f52e23942268/4Xu2J885Y2KduG9omJEJG)

-   Step 2:
    Click on "Coding Lab" to add a coding lab.
    ![xAwS9Q3LyvM4E7zFagKI1](https://creator-assets.codedamn.com/fermion-instructor/05-08-2024/instructor_66467ae8ada1f52e23942268/xAwS9Q3LyvM4E7zFagKI1)

-   Step 3:
    A new course item named "Untitled course item" will be created now, click on the three dots and select "Edit".
    ![qsZOmLxVbZNhn-P-2qWsc](https://creator-assets.codedamn.com/fermion-instructor/05-08-2024/instructor_66467ae8ada1f52e23942268/qsZOmLxVbZNhn-P-2qWsc)

-   Step 4:
    A new pop up will now appear on your screen, here, you can create your lab and give it a new name and click on "Create Interactive Lab" to create an interactive lab.
    ![rqsu2fn8BgMTw3wIAaIKZ](https://creator-assets.codedamn.com/fermion-instructor/05-08-2024/instructor_66467ae8ada1f52e23942268/rqsu2fn8BgMTw3wIAaIKZ)

-   Step 5:
    For example, I've created a new interactive coding lab named "Demo Interactive Lab" below. Click on "Attach to Course Item" to attach this lab to your course item you created in step 3.
    ![lTLdKlFIjLh85c616iJk_](https://creator-assets.codedamn.com/fermion-instructor/05-08-2024/instructor_66467ae8ada1f52e23942268/lTLdKlFIjLh85c616iJk_)

-   Step 6:
    Publish this lab, and click on the three dots next to the lab to "Edit".
    ![i8-ZKDU0omMm1XWsBagws](https://creator-assets.codedamn.com/fermion-instructor/05-08-2024/instructor_66467ae8ada1f52e23942268/i8-ZKDU0omMm1XWsBagws)

-   Step 7:
    You will now be greeted with a new screen from where you can edit and control your coding labs.

## Setting up your lab metadata

-   Step 1:
    Give your lab a good title, and add lab instructions in the large input field provided. Your description is completely customisable with proper markdown support.
    ![Y-69yjgbKACxnhPLTgBd8](https://creator-assets.codedamn.com/fermion-instructor/05-08-2024/instructor_66467ae8ada1f52e23942268/Y-69yjgbKACxnhPLTgBd8)

The lab title and the lab instructions will be visible to the students like shown in the image below.
![JpEDvP99bXxsUVzKoFyEx](https://creator-assets.codedamn.com/fermion-instructor/05-08-2024/instructor_66467ae8ada1f52e23942268/JpEDvP99bXxsUVzKoFyEx)

-   Step 2:
    Once you have filled the metadata, click on "Save and Next" to save your progress and move to the next step.
    ![DgTpvyJHfz-FDRCDBAtIN](https://creator-assets.codedamn.com/fermion-instructor/05-08-2024/instructor_66467ae8ada1f52e23942268/DgTpvyJHfz-FDRCDBAtIN)

## Setting up lab defaults

Lab defaults section include how your lab environment boots. It is one of the most important parts because a wrong default environment might confuse your students. Therefore it is important to set it up properly.

When a Fermion playground boots, it can setup a filesystem for user by default. You can specify what the starting files could be, by specifying a git repository and a branch name:
![AJ9oq-4mtRDy1NnYkP6dB](https://creator-assets.codedamn.com/fermion-instructor/05-08-2024/instructor_66467ae8ada1f52e23942268/AJ9oq-4mtRDy1NnYkP6dB)

You will find a .cdmrc file in the repository given to you above. It is highly recommend, at this point, that you go through the .cdmrc guide and how to use .cdmrc in playgrounds to understand what .cdmrc file exactly is. Once you understand how to work with .cdmrc come back to this area.

Click on "Save and Next" to save your progress and move to the next step.
![rjOC70fGTnYeXZInOdnt-](https://creator-assets.codedamn.com/fermion-instructor/05-08-2024/instructor_66467ae8ada1f52e23942268/rjOC70fGTnYeXZInOdnt-)

## Setting up lab challenges

Next step is to add challenges for your lab. This is the part where your learners can learn the most because they will have to pass certain challenges.

This is the biggest advantage of using Fermion for hosting your course too - to make them truly interactive and hands on for your users.

![NRBge4NpBM0HrErYpIfUb](https://creator-assets.codedamn.com/fermion-instructor/07-08-2024/instructor_66467ae8ada1f52e23942268/NRBge4NpBM0HrErYpIfUb)

The interface above can be used to add challenges to your lab. You can also add hints to every single challenge you put here.

## Add test file

Once you save the lab, you will see a button named `Test File` in the Evaluation tab. Click on it.

![4YveXFCMbFpt5NRDqdbJm](https://creator-assets.codedamn.com/fermion-instructor/07-08-2024/instructor_66467ae8ada1f52e23942268/4YveXFCMbFpt5NRDqdbJm)

When you click on it, a new window will open. This is a test file area.

You can write anything here. Whatever script you write here, can be executed from the Test command to run section inside the evaluation tab we were in earlier.

The point of having a file like this to provide you with a place where you can write your evaluation script.

## Evaluation script

Evaluation script is actually what runs when the user on the playground clicks on "Run Tests" button.
![_3YGegAps9tBHuFvlZ5sW](https://creator-assets.codedamn.com/fermion-instructor/07-08-2024/instructor_66467ae8ada1f52e23942268/_3YGegAps9tBHuFvlZ5sW)

Please note that there are different evaluation scripts for different technologies, the documentation given above covers in detail about the evaluation script on each technology.
![MYNKO-svHI3WYYsHDkQjS](https://creator-assets.codedamn.com/fermion-instructor/07-08-2024/instructor_66467ae8ada1f52e23942268/MYNKO-svHI3WYYsHDkQjS)

If you have a different use case or in case you use a technology that we do not support, please reach out to us at [support@codedamn.com](mailto:support@codedamn.com) and we can have a discussion upon it.

## Setup verified solution (Recommended)

Verified solution is highly recommended. To setup a verified solution for your lab, once your lab is ready, all you have to do is click on "Test lab", write code that passes your lab, and run that code once.
![uYwOCzIlDteOuaI5_221M](https://creator-assets.codedamn.com/fermion-instructor/07-08-2024/instructor_66467ae8ada1f52e23942268/uYwOCzIlDteOuaI5_221M)

Once you do that, your lab would be marked a lab having verified solution.

At this point, your lab is complete. You can now test this lab and link it in your course, ready to be served to thousands of students!
