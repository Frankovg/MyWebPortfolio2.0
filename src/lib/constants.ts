
// LinkedIn profile images
import img1 from '/public/images/in_profile_1.webp'
import img2 from '/public/images/in_profile_2.webp'
import img3 from '/public/images/in_profile_3.webp'
import img4 from '/public/images/in_profile_4.webp'

//Social icons
import { GithubIcon, LinkedInIcon } from '@/icons/social'


// Navbar links
export const ROUTES = [
  {
    label: 'Home',
    path: 'home'
  },
  {
    label: 'Tech stack',
    path: 'tech-stack'
  },
  {
    label: 'Projects',
    path: 'projects'
  },
  {
    label: 'About me',
    path: 'about-me'
  },
]

// Navbar social links
export const SOCIAL_ICONS = [
  {
    name: "LinkedIn",
    value: "linkedIn",
    href: process.env.NEXT_PUBLIC_LINKEDIN_URL,
    alt: "LinkedIn icon",
    icon: LinkedInIcon
  },
  {
    name: "Github",
    value: "gitHub",
    href: process.env.NEXT_PUBLIC_GITHUB_URL,
    alt: "Github icon",
    icon: GithubIcon
  },
]

// LinkedIn referrals
export const REFERRALS = [
  {
    id: 1,
    img: img1,
    name: 'Jazmin Feige',
    role: 'Visual Merchandising Senior Manager at EssilorLuxottica',
    text: 'Franco is an excellent professional. We worked together as a team for several years in a very smooth and efficient manner. We always communicated quickly and effectively, and his contributions had a significant impact on the projects we worked on together. We formed a team where the priority was to achieve the best results through a very creative, organized, and high-quality approach.'
  },
  {
    id: 2,
    img: img2,
    name: 'Mariana Swidzinski',
    role: 'Creative Project Manager at EcoFold',
    text: "I worked with Franco on several occasions, the first time on the same team, with me as the designer and him in charge of prototyping. Professionally, I highlight the speed and commitment with which he handles himself during busy times and his attention to detail. He offers improvement suggestions when necessary and doesn't hesitate to share his knowledge. On a personal level, he has an excellent attitude, always positive and collaborative. I would work with him again—highly recommended!"
  },
  {
    id: 3,
    img: img3,
    name: 'Gustavo Anelli',
    role: 'Industrial Designer at Zedis',
    text: "Franco is an excellent person and designer. I had the opportunity to see him work particularly in the development area, creating technical drawings for production, where he demonstrated his ability to work very well under pressure, handling a large volume of tasks with extremely tight deadlines. He stands out for his responsibility, efficiency, and speed. His high level of commitment and dedication is evident in the details of his presentations."
  },
  {
    id: 4,
    img: img4,
    name: 'Pablo Daniel Pellizzoni',
    role: 'Head of department at Grupo Developer',
    text: "Not only a great person, but also a great colleague and designer, and he has been an excellent student. Always showing the proactivity needed and seeking new horizons! Wishing you success in this new chapter, and you're missed here in Argentina. Great designer!"
  },
]

// Footer links
export const FOOTER_LINKS = {
  sections: [
    {
      name: 'About Me',
      href: 'about-me'
    },
    {
      name: 'Admin',
      href: '/admin'
    },
    {
      name: 'Home',
      href: '/'
    },
  ],
  letsTalk: [
    {
      name: 'Contact',
      href: 'contact'
    },
    {
      name: 'LinkedIn',
      href: process.env.LINKEDIN_URL
    }
  ]
}

