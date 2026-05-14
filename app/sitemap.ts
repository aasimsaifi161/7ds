import { MetadataRoute } from 'next'
import { sins } from '@/lib/sins-data'
 
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://7ds-challenge.vercel.app' // Update to your production URL
 
  // Main pages
  const routes = ['', '/login', '/community'].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 1,
  }))
 
  // Sin pages
  const sinRoutes = sins.map((sin) => ({
    url: `${baseUrl}/sin/${sin.id}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))
 
  return [...routes, ...sinRoutes]
}
