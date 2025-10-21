import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'FRAN Full-Stack Developer & Designer',
    short_name: 'FRAN Portfolio',
    description: 'Hi! This is my Web-Portfolio, I hope you like it!',
    start_url: '/',
    display: 'standalone',
    background_color: '#1a1a1a',
    theme_color: '#e453bc',
  }
}
