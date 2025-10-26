import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '../../../lib/prisma'

// Helper function to generate slug from title
function generateSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .trim()
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const slug = searchParams.get('slug')
    const published = searchParams.get('published')
    const category = searchParams.get('category')
    
    if (slug) {
      // Get specific post by slug
      const post = await prisma.post.findUnique({
        where: { slug },
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
      
      if (!post) {
        return NextResponse.json({ error: 'Post not found' }, { status: 404 })
      }
      
      return NextResponse.json(post)
    } else {
      // Get all posts with filtering
      const where = {}
      
      if (published !== null) {
        where.published = published === 'true'
      }
      
      if (category && category !== 'all') {
        where.category = category
      }
      
      const posts = await prisma.post.findMany({
        where,
        include: { 
          author: { 
            select: { 
              id: true,
              email: true, 
              name: true 
            } 
          } 
        },
        orderBy: { createdAt: 'desc' }
      })
      
      return NextResponse.json(posts)
    }
  } catch (error) {
    console.error('Error fetching posts:', error)
    return NextResponse.json({ error: 'Error fetching posts' }, { status: 500 })
  }
}

export async function POST(request) {
  try {
    const { 
      title, 
      slug: customSlug,
      content, 
      excerpt, 
      thumbnail,
      category,
      authorId, 
      published = false 
    } = await request.json()
    
    if (!title || !content) {
      return NextResponse.json({ error: 'Title and content are required' }, { status: 400 })
    }
    
    // Validate category
    const validCategories = ['global', 'mongolia', 'vietnam', 'china']
    if (category && !validCategories.includes(category)) {
      return NextResponse.json({ error: 'Invalid category' }, { status: 400 })
    }
    
    // Use custom slug or generate from title
    let slug = customSlug || generateSlug(title)
    
    // Check if slug already exists and make it unique
    const existingPost = await prisma.post.findUnique({
      where: { slug }
    })
    
    if (existingPost) {
      slug = `${slug}-${Date.now()}`
    }
    
    const post = await prisma.post.create({
      data: {
        title,
        slug,
        content,
        excerpt: excerpt || null,
        thumbnail: thumbnail || null,
        category: category || 'global',
        published,
        authorId: authorId || 'temp-user-id', // We'll fix this with auth later
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
    
    return NextResponse.json(post, { status: 201 })
  } catch (error) {
    console.error('Error creating post:', error)
    if (error.code === 'P2002') {
      return NextResponse.json({ error: 'Post with this slug already exists' }, { status: 400 })
    }
    return NextResponse.json({ error: 'Error creating post' }, { status: 500 })
  }
}

export async function PUT(request) {
  try {
    const { 
      id, 
      title, 
      content, 
      excerpt, 
      thumbnail,
      category,
      published, 
      slug 
    } = await request.json()
    
    if (!id) {
      return NextResponse.json({ error: 'Post ID required' }, { status: 400 })
    }
    
    // Validate category if provided
    if (category) {
      const validCategories = ['global', 'mongolia', 'vietnam', 'china']
      if (!validCategories.includes(category)) {
        return NextResponse.json({ error: 'Invalid category' }, { status: 400 })
      }
    }
    
    const updateData = {}
    if (title) updateData.title = title
    if (content) updateData.content = content
    if (excerpt !== undefined) updateData.excerpt = excerpt
    if (thumbnail !== undefined) updateData.thumbnail = thumbnail
    if (category) updateData.category = category
    if (published !== undefined) updateData.published = published
    if (slug) updateData.slug = slug
    
    const post = await prisma.post.update({
      where: { id },
      data: updateData,
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
    
    return NextResponse.json(post)
  } catch (error) {
    console.error('Error updating post:', error)
    if (error.code === 'P2002') {
      return NextResponse.json({ error: 'Post with this slug already exists' }, { status: 400 })
    } else {
      return NextResponse.json({ error: 'Error updating post' }, { status: 500 })
    }
  }
}

export async function DELETE(request) {
  try {
    const { id } = await request.json()
    
    if (!id) {
      return NextResponse.json({ error: 'Post ID required' }, { status: 400 })
    }
    
    await prisma.post.delete({
      where: { id }
    })
    
    return NextResponse.json({ message: 'Post deleted successfully' })
  } catch (error) {
    console.error('Error deleting post:', error)
    return NextResponse.json({ error: 'Error deleting post' }, { status: 500 })
  }
}