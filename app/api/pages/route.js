import { NextResponse } from 'next/server'
import { prisma } from '../../../lib/prisma'

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const path = searchParams.get('path')
    
    if (path) {
      // Get specific page by path
      const page = await prisma.page.findUnique({
        where: { path: decodeURIComponent(path) },
        include: { 
          author: { 
            select: { 
              id: true,
              email: true, 
              name: true 
            } 
          } 
        }
      })
      
      if (!page) {
        return NextResponse.json({ error: 'Page not found' }, { status: 404 })
      }
      
      // Parse puckData back to object
      const pageData = {
        ...page,
        puckData: JSON.parse(page.puckData)
      }
      
      return NextResponse.json(pageData)
    } else {
      // Get all pages
      const pages = await prisma.page.findMany({
        include: { 
          author: { 
            select: { 
              id: true,
              email: true, 
              name: true 
            } 
          } 
        },
        orderBy: { updatedAt: 'desc' }
      })
      
      const pagesData = pages.map(page => ({
        ...page,
        puckData: JSON.parse(page.puckData)
      }))
      
      return NextResponse.json(pagesData)
    }
  } catch (error) {
    console.error('Error fetching pages:', error)
    return NextResponse.json({ error: 'Error fetching pages' }, { status: 500 })
  }
}

export async function POST(request) {
  try {
    const { path, title, puckData, authorId } = await request.json()
    
    if (!path || !title || !puckData) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }
    
    const page = await prisma.page.create({
      data: {
        path,
        title,
        puckData: JSON.stringify(puckData),
        authorId: authorId || 'cmg26d6210000o57j96qmvgot', // Use admin user ID for now
      },
      include: {
        author: {
          select: {
            id: true,
            email: true,
            name: true
          }
        }
      }
    })
    
    const pageData = {
      ...page,
      puckData: JSON.parse(page.puckData)
    }
    
    return NextResponse.json(pageData, { status: 201 })
  } catch (error) {
    console.error('Error creating page:', error)
    if (error.code === 'P2002') {
      return NextResponse.json({ error: 'Page with this path already exists' }, { status: 400 })
    } else {
      return NextResponse.json({ error: 'Error creating page' }, { status: 500 })
    }
  }
}
