import { MetadataRoute } from 'next'

import { getCategories } from '@/lib/server-utils-public'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://franamoroso.com'

  // Static routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/home`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/about-me`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/project`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/cookies-policy`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ]

  // Dynamic project routes
  try {
    const categories = await getCategories()
    const projectRoutes: MetadataRoute.Sitemap = []

    categories.forEach(category => {
      category.projects.forEach(project => {
        projectRoutes.push({
          url: `${baseUrl}/project/${project.slug}`,
          lastModified: new Date(project.updatedAt),
          changeFrequency: 'monthly',
          priority: 0.6,
        })
      })
    })

    return [...staticRoutes, ...projectRoutes]
  } catch (error) {
    console.error('Error generating sitemap:', error)
    // Return static routes if dynamic routes fail
    return staticRoutes
  }
}
