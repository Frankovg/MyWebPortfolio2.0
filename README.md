<div align="center">
  <img src="public/logo.svg" alt="Franco Amoroso Logo" width="200"/>
  
  # Franco Amoroso - Portfolio & Web Development Showcase
  
  [![Next.js](https://img.shields.io/badge/Next.js-15.5.4-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
  [![React](https://img.shields.io/badge/React-19.1.1-61DAFB?style=for-the-badge&logo=react)](https://reactjs.org/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.9.2-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1.13-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
  [![Prisma](https://img.shields.io/badge/Prisma-6.16.2-2D3748?style=for-the-badge&logo=prisma)](https://www.prisma.io/)
  
  **A modern, full-stack portfolio application showcasing web development, industrial design, and UX/UI projects**
  
  [View Live Demo](https://www.franamoroso.com/app/home) • [Request Demo Account](https://www.franamoroso.com/app/contact) • [Report Bug](https://github.com/Frankovg/MyWebPortfolio2.0/issues)
</div>

---

## 📋 Table of Contents

- [About The Project](#-about-the-project)
- [Key Features](#-key-features)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Setup](#environment-setup)
  - [Database Setup](#database-setup)
  - [Running the Application](#running-the-application)
- [Admin CMS Mode](#-admin-cms-mode)
- [Request Demo Account](#-request-demo-account)
- [Contact](#-contact)
- [Changelog](#-changelog)
- [License](#-license)

---

## 🎯 About The Project

This is a comprehensive portfolio web application built with modern technologies, showcasing my professional journey as a **Full-Stack Developer** with a background in **Industrial Design** and **UX/UI Design**. The platform features a custom-built CMS (Content Management System) that allows dynamic content management without requiring code deployments.

### What Makes This Project Special

- **🎨 Multi-Disciplinary Portfolio**: Showcases projects across Web Development, Industrial Design, and UX/UI Design
- **🔐 Secure Authentication**: Built with NextAuth.js v5 for robust user management
- **📱 Fully Responsive**: Mobile-first design approach ensuring perfect display on all devices
- **⚡ Performance Optimized**: Server-side rendering, image optimization, and efficient data fetching
- **🎭 Admin CMS**: Complete content management system for non-technical content updates
- **♿ Accessible**: WCAG compliant with semantic HTML and ARIA labels
  <!-- - **📊 Analytics Ready**: Built-in tracking and monitoring capabilities -->
  <!-- - **🌐 Internationalization**: Multi-language support (English/Spanish) -->

---

## ✨ Key Features

### Public Features

- **Dynamic Project Portfolio**: Browse projects filtered by category (Web Development, Industrial Design, UX/UI)
- **Tech Stack Showcase**: Interactive display of technologies and skills
- **About Me Section**: Professional background, experience, and LinkedIn referrals
- **Contact Form**: Integrated email system with nodemailer
- **Downloadable Resources**: CV and portfolio documents in multiple languages
- **SEO Optimized**: Dynamic sitemap, robots.txt, and meta tags

### Admin Features (CMS)

- **Project Management**: Create, edit, delete, and publish/unpublish projects
- **Media Gallery**: Upload and manage project images via Google Drive integration
- **User Management**: Control user access and permissions
- **Download Management**: Manage downloadable resources (CV, portfolios)
- **Content Customization**: Update all portfolio content without code changes
- **Role-Based Access**: Admin and regular user roles with different permissions
- **Real-time Preview**: See changes before publishing

---

## 🛠 Tech Stack

### Frontend

- **Framework**: [Next.js 15.5.4](https://nextjs.org/) (App Router)
- **UI Library**: [React 19.1.1](https://reactjs.org/)
- **Language**: [TypeScript 5.9.2](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS 4.1.13](https://tailwindcss.com/)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/) + [Radix UI](https://www.radix-ui.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Forms**: [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/)

### Backend

- **Runtime**: [Node.js](https://nodejs.org/)
- **Authentication**: [NextAuth.js v5](https://next-auth.js.org/)
- **Database ORM**: [Prisma 6.16.2](https://www.prisma.io/)
- **Database**: PostgreSQL (Production) / SQLite (Development)
- **Email**: [Nodemailer](https://nodemailer.com/)
- **Password Hashing**: [bcrypt](https://www.npmjs.com/package/bcrypt)

### Development & Testing

- **Testing Framework**: [Jest 30.2.0](https://jestjs.io/)
- **Testing Library**: [@testing-library/react](https://testing-library.com/react)
- **Linting**: [ESLint](https://eslint.org/) with TypeScript support

### Deployment

- **Platform**: [Vercel](https://vercel.com/)
- **Database**: Vercel Postgres (Production)

---

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18.0.0 or higher)
- **npm** (v9.0.0 or higher), **yarn** (v1.22.0 or higher), or **pnpm** (v8.0.0 or higher)
- **Git**
- **PostgreSQL** (for production) or **SQLite** (for development)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/fran-web.git
   cd fran-web
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

### Environment Setup

1. **Copy the example environment file**

   ```bash
   cp example.env .env
   ```

2. **Configure your environment variables** in `.env`:

3. **Important Notes**:
   - **AUTH_SECRET**: Generate using `openssl rand -base64 32` in your terminal
   - **SMTP Configuration**: For Gmail, you need to create an [App Password](https://support.google.com/accounts/answer/185833)
   - **Database**: The project uses SQLite for development and PostgreSQL for production
   - **Super Admin**: This account is created automatically on first database seed

### Database Setup

1. **Switch to SQLite for development** (if not already set):

   In [`prisma/schema.prisma`](prisma/schema.prisma), uncomment the SQLite datasource and comment out PostgreSQL:

   ```prisma
   // For development, use sqlite
   datasource db {
     provider = "sqlite"
     url      = env("DATABASE_URL")
   }

   // For production, use postgres
   // datasource db {
   //   provider  = "postgresql"
   //   url       = env("POSTGRES_PRISMA_URL")
   //   directUrl = env("POSTGRES_URL_NON_POOLING")
   // }
   ```

2. **Generate Prisma Client**

   ```bash
   npx prisma generate
   ```

3. **Run database migrations**

   ```bash
   npx prisma migrate dev --name init
   ```

4. **Seed the database with sample data**

   ```bash
   npx prisma db seed
   ```

   This will create:

   - Super admin user (from your `.env` credentials)
   - Sample projects across all categories
   - Tech stack data
   - Categories and roles
   - Sample downloadable resources

5. **View your database** (optional)
   ```bash
   npx prisma studio
   ```
   This opens a visual database editor at `http://localhost:5555`

### Running the Application

1. **Start the development server**

   ```bash
   npm run dev
   ```

2. **Open your browser** and navigate to:

   ```
   http://localhost:3000
   ```

3. **Login to Admin Panel**:
   - Navigate to `/admin`
   - Use the credentials from your `SUPERUSER_ACCOUNT_EMAIL` and `SUPERUSER_ACCOUNT_PASSWORD`

### Additional Commands

```bash
# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint

# Fix linting issues
npm run lint:fix

# Run tests
npm test

# Run tests in watch mode
npm test:watch

# Generate coverage report
npm run test:coverage

# Open coverage report in browser (macOS)
npm run test:coverage:open
```

---

## 🔐 Admin CMS Mode

The application includes a powerful Content Management System accessible at `/admin` for authenticated admin users.

### Admin Features

#### 📁 Project Management

- **Create Projects**: Add new portfolio projects with rich details
- **Edit Projects**: Update project information, images, and metadata
- **Delete Projects**: Remove projects with confirmation dialogs
- **Publish/Unpublish**: Control project visibility without deletion
- **Gallery Management**: Upload and organize project images
- **Tech Stack Assignment**: Tag projects with relevant technologies
- **Role Definition**: Define your role and contribution percentage

#### 👥 User Management

- **Manage Permissions**: Grant or revoke admin privileges
- **Activate/Deactivate**: Control user access without deletion
- **View User Activity**: Track user creation and update dates

#### 📥 Download Management

- **Upload Resources**: Manage CV and portfolio documents
- **Multi-language Support**: Provide documents in different languages
- **Visibility Control**: Show/hide downloads from public view

#### 🎨 Content Customization

- **Dynamic Content**: Update all text content without code changes
- **Image Management**: Upload and manage all portfolio images
- **SEO Control**: Manage meta descriptions and titles
- **Social Links**: Update social media URLs

### Admin Access Levels

1. **Super Admin** (Created via environment variables)

   - Full access to all features
   - Cannot be deleted or deactivated
   - User management privileges

2. **Sample User** (Demo account for showcasing)

   - View-only access to admin panel
   - Cannot edit or create data
   - Can explore all CMS features without making changes

3. **Guest Users**
   - View-only access to public content
   - No admin panel access

### Security Features

- **Password Hashing**: bcrypt with salt rounds
- **Session Management**: Secure JWT tokens via NextAuth.js
- **CSRF Protection**: Built-in Next.js security
- **Server-Only Actions**: Critical operations restricted to server
- **Role-Based Access Control**: Granular permission system

---

## 🎫 Request Demo Account

Interested in exploring the admin panel and CMS features? I'd be happy to provide you with a demo account!

### How to Request Access

1. **Via Contact Form**: Visit the [Contact page](https://www.franamoroso.com/app/contact) and use this template:

   ```
   Subject: Demo Account Request

   Hello,

   I would like to request access to a demo account to explore
   the platform and its features.

   Thank you,
   Best regards
   ```

2. **Via Email**: Send an email to `di.francoamoroso@gmail.com` with the subject "Demo Account Request"

3. **Via LinkedIn**: Connect with me on [LinkedIn](https://www.linkedin.com/in/francoamoroso/) and send a message

### What You'll Get

- **Sample Account**: View-only access to the admin panel
- **Production Data**: Explore the live portfolio content and CMS interface
<!-- - **Guided Tour**: Documentation on how to use the CMS -->

**Note**: Sample accounts are read-only for evaluation purposes and cannot modify the database.

---

## 📧 Contact

**Franco Amoroso** - Full-Stack Developer

- 🌐 **Portfolio**: [www.franamoroso.com](https://www.franamoroso.com/)
- 💼 **LinkedIn**: [francoamoroso](https://www.linkedin.com/in/francoamoroso/)
- 📧 **Email**: di.francoamoroso@gmail.com
- 📍 **Location**: Málaga, Spain

### Professional Background

- **Full-Stack Developer** with expertise in React, Next.js, and TypeScript
- **Industrial Designer** with experience in product development and prototyping
- **UX/UI Designer** focused on user-centered design and accessibility
- **10+ years** of professional experience across design and development

---

<details>
<summary><h2>📝 Changelog</h2></summary>

### [1.2.4] - 09-01-2026

#### New Features

**Migration**

- Migrated state management from React Context to Zustand for improved performance and simpler API.
- Migrated NextAuth to BetterAuth since NextAuth is deprecated.

**Added**

- Added images config for Cloudinary.
- Started migration of the images from Google Drive to Cloudinary.

**Update**

- Prisma updated to version 7.
- Nextjs updated to version 16.

**Fixes**

- Fixed the tech stack input in the project form page where some techs were missed.

### [1.1.7] - 04-12-2025

#### New Features

**Added**

- Updated React and Next.js to fix a React vulnerability.
- Unit tests have been added.
- Added a hover to the project card links.
- Categories are sorted by name.

**Fixes**

- Fixed YouTube external links.
- Fixed links: external links as normal anchor tags.
- Fixed the auto scrolling when navigating between pages.

### [1.1.0] - 28-11-2025

#### New Features

**Added**

- The image carousel allows wheel, touch and keyboard scrolling.
- Projects table has a sorting by name.
- Added direct links in the project card when hovering.
- Customized video player.
- Added colors to the toast component.

**Fixes**

- Fixed the vertical shift when opens an accordion item in /about-me.
- Fixed a weird animation in the sidebar when it's open and close.
- Adjusted styles of the mobile menu.
- General issues has been fixed.

### [1.0.1] - 14-01-2025

#### 🎉 Initial Release

**Added**

- Complete portfolio website with multi-category project showcase
- Admin CMS for content management without code deployments
- User authentication and authorization system with NextAuth.js v5
- Project management system with CRUD operations
- Downloadable resources management (CV, portfolios)
- Contact form with email integration via Nodemailer
<!-- - Multi-language support (English/Spanish) -->
- Responsive design for all device sizes
- SEO optimization with dynamic sitemap and meta tags
- LinkedIn referrals section
- Tech stack showcase with interactive cards
- About me section with professional background
- Footer with social links and legal pages
- 404 error page with custom design

**Technical Features**

- Next.js 15.5.4 with App Router
- React 19.1.1 with Server Components
- TypeScript 5.9.2 with strict mode
- Tailwind CSS 4.1.13 for styling
- Prisma 6.16.2 ORM with PostgreSQL/SQLite
- Jest testing framework with 80% coverage requirement
- ESLint with TypeScript and import sorting
- Server-only actions for security
- Optimized images with Next.js Image component
- Framer Motion animations
- shadcn/ui component library

**Database**

- User management with roles and permissions
- Project management with categories and tech stack
- Gallery system for project images
- Download management for resources
- Seed data for development and testing

**Security**

- Password hashing with bcrypt
- JWT session management
- CSRF protection
- Server-only critical operations
- Role-based access control
- Environment variable validation

</details>

---

### Permissions

If you're interested in using this project as a template or reference for your own portfolio:

1. **Contact me** for permission at di.francoamoros@gmail.com
2. **Attribution** is required if permission is graonted

### Third-Party Licenses

This project uses various open-source packages. See [`package.json`](package.json) for a complete list of dependencies and their respective licenses.

---

<div align="center">
  
  **Built with ❤️ by Franco Amoroso**
  
  ⭐ Star this repo if you find it helpful!
  
  [Back to Top](#franco-amoroso---portfolio--web-development-showcase)
  
</div>
