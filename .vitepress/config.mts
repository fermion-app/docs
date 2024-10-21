import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Fermion Docs",
  description: "Documentation on using Fermion platform",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config

    sidebar: [
      // docs/getting-started/
      {
        text: 'Getting Started',
        items: [
          { text: 'What is Fermion? ', link: 'docs/getting-started/what-is-fermion' },
          { text: 'Fermion v/s Other Platforms', link: '/docs/getting-started/fermion-vs-other-platforms' },
          { text: 'What can you do on Fermion', link: 'docs/getting-started/what-can-you-do-on-fermion' }
        ]
      },
      // docs/create-your-first-course/
      {
        text: 'Creating your first course',
        items: [
          { text: 'Prerequisites', link: 'docs/create-your-first-course/prerequisites' },
          { text: 'Setting up course landing page', link: 'docs/create-your-first-course/setting-up-course-landing-page' },
          { text: 'Managing the Syllabus', link: 'docs/create-your-first-course/managing-the-syllabus' },
          { text: 'Creating a live class', link: 'docs/create-your-first-course/creating-a-live-class' }
        ]
      },
      // docs/creating-coding-labs/
      {
        text: 'Creating Coding Labs',
        items: [
          { text: 'What are coding labs?', link: 'docs/creating-coding-labs/what-are-coding-labs' },
          { text: 'Creating a coding lab from scratch', link: 'docs/creating-coding-labs/creating-a-coding-lab-from-scratch' },
          { text: 'Using the content library', link: 'docs/creating-coding-labs/using-the-content-library' }
        ]
      },
      // docs/community/
      {
        text: 'Community',
        items: [
          { text: 'What are Communities', link: 'docs/community/what-are-communities' },
        ]
      },
      // docs/marketing-tools/
      {
        text: 'Marketing Tools',
        items: [
          { text: 'Create a custom landing page', link: 'docs/marketing-tools/create-a-custom-landing-page' },
          { text: 'Using Webhooks', link: 'docs/marketing-tools/using-webhooks' },
          { text: 'Email Automation', link: 'docs/marketing-tools/email-automation' }

        ]
      },
      // docs/miscellaneous-details/
      {
        text: 'Miscellaneous Details',
        items: [
          { text: 'Change School Settings', link: 'docs/miscellaneous-details/change-school-settings' },
          { text: 'Change Instructor Details', link: 'docs/miscellaneous-details/change-instructor-details' },
          { text: 'How do you get paid?', link: 'docs/miscellaneous-details/how-do-you-get-paid' },
          { text: 'How can you resolve your doubts?', link: 'docs/miscellaneous-details/how-can-you-resolve-your-doubts' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'x', link: 'https://x.com/fermionapp' },
      { icon: 'instagram', link: 'https://www.instagram.com/fermion.app/' },
      { icon: 'linkedin', link: 'https://www.linkedin.com/showcase/fermionapp/' }
    ]
  }
})
