'use client'

import React, { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import AdminLayout from '../../../../components/AdminLayout'
import TiptapEditor from '../../../../components/TiptapEditor'

interface UploadedImage {
  filename: string
  url: string
  timestamp: number
}

export default function CreateNewPost() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '<p>Start writing your post...</p>',
    thumbnail: '',
    category: 'global',
    published: false
  })
  const [saving, setSaving] = useState(false)
  const [autoSlug, setAutoSlug] = useState(true)
  const [isThumbnailGalleryOpen, setIsThumbnailGalleryOpen] = useState(false)
  const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([])
  const [isUploading, setIsUploading] = useState(false)
  const [thumbnailTab, setThumbnailTab] = useState<'upload' | 'gallery'>('upload')
  const fileInputRef = useRef<HTMLInputElement>(null)

  const categories: Array<{ value: string; label: string }> = [
    { value: 'global', label: 'Global' },
    { value: 'mongolia', label: 'Mongolia' },
    { value: 'vietnam', label: 'Vietnam' },
    { value: 'china', label: 'China' }
  ]

  // Auto-generate slug from title
  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .trim()
  }

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value
    setFormData(prev => ({
      ...prev,
      title,
      slug: autoSlug ? generateSlug(title) : prev.slug
    }))
  }

  const handleSlugChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const slug = e.target.value.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-')
    setFormData(prev => ({ ...prev, slug }))
    setAutoSlug(false)
  }

  const loadGalleryImages = async () => {
    try {
      const response = await fetch('/api/uploads')
      if (response.ok) {
        const data = await response.json()
        setUploadedImages(data.images || [])
      }
    } catch (error) {
      console.error('Error loading images:', error)
    }
  }

  const handleThumbnailSelect = () => {
    setIsThumbnailGalleryOpen(true)
    setThumbnailTab('upload')
    loadGalleryImages()
  }

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    await uploadThumbnail(file)
  }

  const uploadThumbnail = async (file: File) => {
    setIsUploading(true)
    
    try {
      const formDataUpload = new FormData()
      formDataUpload.append('file', file)

      const response = await fetch('/api/uploads', {
        method: 'POST',
        body: formDataUpload,
      })

      const data = await response.json()

      if (response.ok && data.url) {
        setFormData(prev => ({ ...prev, thumbnail: data.url }))
        setIsThumbnailGalleryOpen(false)
        
        if (fileInputRef.current) {
          fileInputRef.current.value = ''
        }
      } else {
        alert(data.error || 'Failed to upload image')
      }
    } catch (error) {
      console.error('Upload error:', error)
      alert('Failed to upload image')
    } finally {
      setIsUploading(false)
    }
  }

  const selectThumbnailFromGallery = (imageUrl: string) => {
    setFormData(prev => ({ ...prev, thumbnail: imageUrl }))
    setIsThumbnailGalleryOpen(false)
  }

  const removeThumbnail = () => {
    setFormData(prev => ({ ...prev, thumbnail: '' }))
  }

  const handleSave = async (shouldPublish: boolean = false) => {
    if (!formData.title.trim()) {
      alert('Please enter a title')
      return
    }

    if (!formData.slug.trim()) {
      alert('Please enter a URL slug')
      return
    }

    setSaving(true)

    try {
      // First, get a valid user ID
      const usersResponse = await fetch('/api/users')
      let authorId = null
      
      if (usersResponse.ok) {
        const users = await usersResponse.json()
        if (users.length > 0) {
          authorId = users[0].id
        }
      }

      if (!authorId) {
        alert('No users found. Please run the seed script first.')
        setSaving(false)
        return
      }

      console.log('Sending data:', {
        title: formData.title,
        slug: formData.slug,
        content: formData.content,
        excerpt: formData.excerpt || null,
        thumbnail: formData.thumbnail || null,
        category: formData.category,
        published: shouldPublish,
        authorId
      })

      const response = await fetch('/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: formData.title,
          slug: formData.slug,
          content: formData.content,
          excerpt: formData.excerpt || null,
          thumbnail: formData.thumbnail || null,
          category: formData.category,
          published: shouldPublish,
          authorId
        }),
      })

      console.log('Response status:', response.status)
      const responseData = await response.json()
      console.log('Response data:', responseData)

      if (response.ok) {
        alert(`Post ${shouldPublish ? 'published' : 'saved as draft'} successfully!`)
        router.push('/admin/posts')
      } else {
        alert(`Error: ${responseData.error || 'Unknown error'}`)
      }
    } catch (error) {
      console.error('Error saving post:', error)
      alert(`Network error: ${error instanceof Error ? error.message : 'Unknown error'}`)
    } finally {
      setSaving(false)
    }
  }

  return (
    <AdminLayout>
      <div className="p-6 max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Create New Post</h1>
            <p className="mt-1 text-sm text-gray-600">
              Write and publish a new blog post
            </p>
          </div>
          <button
            onClick={() => router.back()}
            className="text-gray-600 hover:text-gray-800"
          >
            ← Back to Posts
          </button>
        </div>

        <div className="space-y-6">
          {/* Title */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
              Post Title *
            </label>
            <input
              type="text"
              id="title"
              value={formData.title}
              onChange={handleTitleChange}
              placeholder="Enter your post title..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg"
            />
          </div>

          {/* URL Slug */}
          <div>
            <label htmlFor="slug" className="block text-sm font-medium text-gray-700 mb-2">
              URL Slug *
            </label>
            <div className="flex items-center">
              <span className="text-gray-500 text-sm mr-2">yoursite.com/blog/</span>
              <input
                type="text"
                id="slug"
                value={formData.slug}
                onChange={handleSlugChange}
                placeholder="url-slug"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">
              This will be the URL of your post. {autoSlug && 'Auto-generated from title.'}
            </p>
          </div>

          {/* Category */}
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
              Category *
            </label>
            <select
              id="category"
              value={formData.category}
              onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {categories.map(cat => (
                <option key={cat.value} value={cat.value}>
                  {cat.label}
                </option>
              ))}
            </select>
            <p className="text-xs text-gray-500 mt-1">
              Select the region or category for this post.
            </p>
          </div>

          {/* Featured Image / Thumbnail */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Featured Image
            </label>
            
            {formData.thumbnail ? (
              <div className="relative inline-block">
                <img 
                  src={formData.thumbnail} 
                  alt="Thumbnail preview" 
                  className="max-w-sm w-full h-auto rounded-lg border border-gray-300"
                />
                <div className="mt-2 flex space-x-2">
                  <button
                    onClick={handleThumbnailSelect}
                    className="px-4 py-2 bg-white border border-gray-300 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-50"
                  >
                    Change Image
                  </button>
                  <button
                    onClick={removeThumbnail}
                    className="px-4 py-2 bg-red-50 border border-red-300 text-sm font-medium text-red-700 rounded-md hover:bg-red-100"
                  >
                    Remove Image
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={handleThumbnailSelect}
                className="w-full px-4 py-8 border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-400 transition-colors text-center"
              >
                <svg className="mx-auto h-12 w-12 text-gray-400" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>
                  <path d="M2.002 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2h-12zm12 1a1 1 0 0 1 1 1v6.5l-3.777-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12V3a1 1 0 0 1 1-1h12z"/>
                </svg>
                <p className="mt-2 text-sm text-gray-600">
                  Click to select a featured image
                </p>
              </button>
            )}
            <p className="text-xs text-gray-500 mt-1">
              This image will be displayed as the post thumbnail.
            </p>
          </div>

          {/* Excerpt */}
          <div>
            <label htmlFor="excerpt" className="block text-sm font-medium text-gray-700 mb-2">
              Excerpt (Optional)
            </label>
            <textarea
              id="excerpt"
              value={formData.excerpt}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setFormData(prev => ({ ...prev, excerpt: e.target.value }))}
              placeholder="Brief description of your post..."
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <p className="text-xs text-gray-500 mt-1">
              This will be shown in post previews and meta descriptions.
            </p>
          </div>

          {/* Content Editor */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Content *
            </label>
            <TiptapEditor
              content={formData.content}
              onChange={(content: string) => setFormData(prev => ({ ...prev, content }))}
              placeholder="Start writing your amazing post..."
              showWordCount={true}
            />
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-between pt-6 border-t border-gray-200">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => handleSave(false)}
                disabled={saving}
                className="inline-flex items-center px-6 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
              >
                {saving ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Saving...
                  </>
                ) : (
                  'Save as Draft'
                )}
              </button>

              <button
                onClick={() => handleSave(true)}
                disabled={saving}
                className="inline-flex items-center px-6 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
              >
                {saving ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Publishing...
                  </>
                ) : (
                  'Publish Post'
                )}
              </button>
            </div>

            {/* Preview Link */}
            <div className="text-sm text-gray-500">
              {formData.slug && (
                <span>Preview URL: /blog/{formData.slug}</span>
              )}
            </div>
          </div>

          {/* Help Text */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="text-sm font-medium text-blue-900 mb-2">Publishing Tips:</h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• <strong>Save as Draft:</strong> Saves your post privately for later editing</li>
              <li>• <strong>Publish Post:</strong> Makes your post live on the website immediately</li>
              <li>• <strong>Featured Image:</strong> Choose an eye-catching thumbnail for your post</li>
              <li>• <strong>Category:</strong> Select the appropriate region or topic</li>
              <li>• <strong>URL Slug:</strong> Keep it short, descriptive, and SEO-friendly</li>
              <li>• <strong>Excerpt:</strong> Helps with SEO and social media sharing</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Thumbnail Gallery Modal */}
      {isThumbnailGalleryOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] flex flex-col shadow-xl">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold">Select Featured Image</h3>
              <button
                onClick={() => setIsThumbnailGalleryOpen(false)}
                className="text-gray-400 hover:text-gray-600 text-2xl leading-none"
              >
                ×
              </button>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-gray-200">
              <button
                onClick={() => setThumbnailTab('upload')}
                className={`px-6 py-3 text-sm font-medium ${
                  thumbnailTab === 'upload'
                    ? 'border-b-2 border-blue-600 text-blue-600'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                Upload Files
              </button>
              <button
                onClick={() => {
                  setThumbnailTab('gallery')
                  loadGalleryImages()
                }}
                className={`px-6 py-3 text-sm font-medium ${
                  thumbnailTab === 'gallery'
                    ? 'border-b-2 border-blue-600 text-blue-600'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                Media Library
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6">
              {thumbnailTab === 'upload' ? (
                <div className="space-y-4">
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:border-gray-400 transition-colors">
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleFileSelect}
                      className="hidden"
                      id="thumbnail-upload"
                    />
                    <label
                      htmlFor="thumbnail-upload"
                      className="cursor-pointer flex flex-col items-center"
                    >
                      {isUploading ? (
                        <>
                          <svg className="animate-spin h-8 w-8 text-gray-600" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          <p className="mt-4 text-sm text-gray-600">Uploading...</p>
                        </>
                      ) : (
                        <>
                          <svg className="h-12 w-12 text-gray-400" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
                            <path d="M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708l3-3z"/>
                          </svg>
                          <p className="mt-4 text-sm text-gray-600">
                            Drop files here or click to select
                          </p>
                          <p className="mt-2 text-xs text-gray-500">
                            Maximum file size: 10MB
                          </p>
                        </>
                      )}
                    </label>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h4 className="text-sm font-medium text-blue-900 mb-2">Supported formats:</h4>
                    <p className="text-sm text-blue-800">JPEG, PNG, GIF, WebP</p>
                  </div>
                </div>
              ) : (
                <div>
                  {uploadedImages.length === 0 ? (
                    <div className="text-center py-12">
                      <p className="text-gray-500">No images in library</p>
                      <button
                        onClick={() => setThumbnailTab('upload')}
                        className="mt-4 text-blue-600 hover:text-blue-700 font-medium"
                      >
                        Upload your first image
                      </button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                      {uploadedImages.map((image: any, index: number) => (
                        <div
                          key={index}
                          onClick={() => selectThumbnailFromGallery(image.url)}
                          className="relative aspect-square rounded-lg overflow-hidden cursor-pointer border-2 border-transparent hover:border-blue-500 transition-all group"
                        >
                          <img
                            src={image.url}
                            alt={image.filename}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all flex items-center justify-center">
                            <span className="text-white opacity-0 group-hover:opacity-100 text-sm font-medium">
                              Select
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  )
}