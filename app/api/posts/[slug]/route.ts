import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma' // Adjust path as needed

// GET - Fetch a single post by slug
export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const post = await prisma.post.findUnique({
      where: {
        slug: params.slug,
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    })

    if (!post) {
      return NextResponse.json(
        { error: 'Post not found' },
        { status: 404 }
      )
    }

    // Only return published posts for public access
    // Remove this check if you want to preview drafts
    if (!post.published) {
      return NextResponse.json(
        { error: 'Post not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(post)
  } catch (error) {
    console.error('Error fetching post:', error)
    return NextResponse.json(
      { error: 'Failed to fetch post' },
      { status: 500 }
    )
  }
}

// PUT - Update a post
export async function PUT(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const body = await request.json()
    const { title, slug, content, excerpt, thumbnail, category, published } = body

    // Validate category if provided
    if (category) {
      const validCategories = ['global', 'mongolia', 'vietnam', 'china']
      if (!validCategories.includes(category)) {
        return NextResponse.json(
          { error: 'Invalid category' },
          { status: 400 }
        )
      }
    }

    const post = await prisma.post.update({
      where: {
        slug: params.slug,
      },
      data: {
        ...(title && { title }),
        ...(slug && { slug }),
        ...(content && { content }),
        ...(excerpt !== undefined && { excerpt }),
        ...(thumbnail !== undefined && { thumbnail }),
        ...(category && { category }),
        ...(published !== undefined && { published }),
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    })

    return NextResponse.json(post)
  } catch (error: any) {
    console.error('Error updating post:', error)
    
    if (error.code === 'P2002') {
      return NextResponse.json(
        { error: 'A post with this slug already exists' },
        { status: 409 }
      )
    }
    
    if (error.code === 'P2025') {
      return NextResponse.json(
        { error: 'Post not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json(
      { error: 'Failed to update post' },
      { status: 500 }
    )
  }
}

// DELETE - Delete a post
export async function DELETE(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    await prisma.post.delete({
      where: {
        slug: params.slug,
      },
    })

    return NextResponse.json({ message: 'Post deleted successfully' })
  } catch (error: any) {
    console.error('Error deleting post:', error)
    
    if (error.code === 'P2025') {
      return NextResponse.json(
        { error: 'Post not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json(
      { error: 'Failed to delete post' },
      { status: 500 }
    )
  }
}