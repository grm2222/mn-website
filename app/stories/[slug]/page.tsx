'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'

interface Author {
  id: string
  name: string | null
  email: string
}

interface Post {
  id: string
  title: string
  slug: string
  content: string
  excerpt: string | null
  thumbnail: string | null
  category: string
  published: boolean
  createdAt: string
  updatedAt: string
  authorId: string
  author: Author
}

interface CategoryInfo {
  label: string
  color: string
}

export default function StoryPage() {
  const params = useParams()
  const router = useRouter()
  const [post, setPost] = useState<Post | null>(null)
  const [loading, setLoading] = useState<boolean>(true)

  const categories: Record<string, CategoryInfo> = {
    global: { label: 'Global', color: 'bg-blue-600' },
    mongolia: { label: 'Mongolia', color: 'bg-green-600' },
    vietnam: { label: 'Vietnam', color: 'bg-red-600' },
    china: { label: 'China', color: 'bg-yellow-600' }
  }

  useEffect(() => {
    if (params.slug) {
      fetchPost()
    }
  }, [params.slug])

  const fetchPost = async () => {
    try {
      const response = await fetch(`/api/posts?slug=${params.slug}`)
      if (response.ok) {
        const data = await response.json()
        
        // Check if post is published
        if (!data.published) {
          router.push('/stories')
          return
        }
        
        setPost(data)
      } else {
        router.push('/stories')
      }
    } catch (error) {
      console.error('Error fetching post:', error)
      router.push('/stories')
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!post) {
    return null
  }

  const categoryInfo: CategoryInfo = categories[post.category] || { 
    label: post.category, 
    color: 'bg-gray-600' 
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link
            href="/stories"
            className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back to Stories
          </Link>
        </div>
      </div>

      {/* Article */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Featured Image */}
        {post.thumbnail && (
          <div className="mb-8 rounded-lg overflow-hidden shadow-lg">
            <img
              src={post.thumbnail}
              alt={post.title}
              className="w-full h-auto"
            />
          </div>
        )}

        {/* Meta */}
        <div className="mb-6">
          <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold text-white ${categoryInfo.color}`}>
            {categoryInfo.label}
          </span>
        </div>

        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          {post.title}
        </h1>

        {/* Excerpt */}
        {post.excerpt && (
          <p className="text-xl text-gray-600 mb-6 leading-relaxed">
            {post.excerpt}
          </p>
        )}

        {/* Author and Date */}
        <div className="flex items-center text-gray-600 pb-6 mb-8 border-b border-gray-200">
          <div className="flex items-center mr-6">
            <svg
              className="w-5 h-5 mr-2"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                clipRule="evenodd"
              />
            </svg>
            <span className="font-medium">{post.author.name || 'Anonymous'}</span>
          </div>
          
          <div className="flex items-center">
            <svg
              className="w-5 h-5 mr-2"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                clipRule="evenodd"
              />
            </svg>
            <span>{formatDate(post.createdAt)}</span>
          </div>
        </div>

        {/* Content */}
        <div 
          className="prose prose-lg max-w-none
            prose-headings:font-bold prose-headings:text-gray-900
            prose-h1:text-4xl prose-h1:mb-4
            prose-h2:text-3xl prose-h2:mb-3
            prose-h3:text-2xl prose-h3:mb-2
            prose-h4:text-xl prose-h4:mb-2
            prose-h5:text-lg prose-h5:mb-1
            prose-h6:text-base prose-h6:mb-1
            prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-4
            prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline
            prose-img:rounded-lg prose-img:shadow-md prose-img:max-w-full prose-img:h-auto
            prose-blockquote:border-l-4 prose-blockquote:border-blue-500 prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:text-gray-700
            prose-ul:list-disc prose-ul:pl-6 prose-ul:mb-4
            prose-ol:list-decimal prose-ol:pl-6 prose-ol:mb-4
            prose-li:mb-2
            prose-code:bg-gray-100 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:text-sm
            prose-pre:bg-gray-100 prose-pre:p-3 prose-pre:rounded prose-pre:overflow-x-auto"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Footer */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <Link
            href="/stories"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back to All Stories
          </Link>
        </div>
      </article>
    </div>
  )
}