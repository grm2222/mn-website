'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import { StarterKit } from '@tiptap/starter-kit'
import { Link } from '@tiptap/extension-link'
import { Image } from '@tiptap/extension-image'
import { TextAlign } from '@tiptap/extension-text-align'
import { useCallback, useState, useEffect, useRef } from 'react'

// WordPress-style Icons
const Icons = {
  Bold: () => <span className="font-bold text-sm">B</span>,
  Italic: () => <span className="italic text-sm">I</span>,
  BulletList: () => (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 16 16">
      <path d="M2 4a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm2.5-1.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1 0-1zm0 3h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1 0-1zm0 3h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1 0-1z"/>
      <circle cx="2" cy="6" r="1"/>
      <circle cx="2" cy="9" r="1"/>
    </svg>
  ),
  NumberedList: () => (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 16 16">
      <path d="M2.003 2.5a.5.5 0 0 0-.723-.447l-1.003.5a.5.5 0 0 0 .446.895l.28-.14V6H.5a.5.5 0 0 0 0 1h2.006a.5.5 0 1 0 0-1h-.503V2.5z"/>
      <path d="M5 5.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0 3a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5z"/>
    </svg>
  ),
  Quote: () => (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 16 16">
      <path d="M12 12a1 1 0 0 0 1-1V8.558a1 1 0 0 0-1-1h-1.388c0-.351.021-.703.062-1.054.062-.372.166-.703.31-.992.145-.29.331-.517.559-.683.227-.186.516-.279.868-.279V3c-.579 0-1.085.124-1.52.372a3.322 3.322 0 0 0-1.085.992 4.92 4.92 0 0 0-.62 1.458A7.712 7.712 0 0 0 9 7.558V11a1 1 0 0 0 1 1h2Zm-6 0a1 1 0 0 0 1-1V8.558a1 1 0 0 0-1-1H4.612c0-.351.021-.703.062-1.054.062-.372.166-.703.31-.992.145-.29.331-.517.559-.683.227-.186.516-.279.868-.279V3c-.579 0-1.085.124-1.52.372a3.322 3.322 0 0 0-1.085.992 4.92 4.92 0 0 0-.62 1.458A7.712 7.712 0 0 0 3 7.558V11a1 1 0 0 0 1 1h2Z"/>
    </svg>
  ),
  AlignLeft: () => (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 16 16">
      <path d="M2 12.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z"/>
    </svg>
  ),
  AlignCenter: () => (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 16 16">
      <path d="M4 12.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm2-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z"/>
    </svg>
  ),
  AlignRight: () => (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 16 16">
      <path d="M6 12.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-4-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm4-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-4-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z"/>
    </svg>
  ),
  Link: () => (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 16 16">
      <path d="M6.354 5.5H4a3 3 0 0 0 0 6h3a3 3 0 0 0 2.83-4H9c-.086 0-.17.01-.25.031A2 2 0 0 1 7 10.5H4a2 2 0 1 1 0-4h1.535c.218-.376.495-.714.82-1z"/>
      <path d="M9 5.5a3 3 0 0 0-2.83 4h1.098A2 2 0 0 1 9 6.5h3a2 2 0 1 1 0 4h-1.535a4.02 4.02 0 0 1-.82 1H12a3 3 0 1 0 0-6H9z"/>
    </svg>
  ),
  More: () => (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 16 16">
      <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"/>
    </svg>
  ),
  ChevronDown: () => (
    <svg className="w-3 h-3 ml-1" fill="currentColor" viewBox="0 0 16 16">
      <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/>
    </svg>
  ),
  Media: () => (
    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 16 16">
      <path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>
      <path d="M2.002 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2h-12zm12 1a1 1 0 0 1 1 1v6.5l-3.777-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12V3a1 1 0 0 1 1-1h12z"/>
    </svg>
  ),
  Upload: () => (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 16 16">
      <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
      <path d="M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708l3-3z"/>
    </svg>
  ),
  Spinner: () => (
    <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
  )
}

const TiptapEditor = ({ 
  content, 
  onChange, 
  placeholder = "Start writing...",
  className = "",
  showWordCount = true 
}) => {
  const [isLinkModalOpen, setIsLinkModalOpen] = useState(false)
  const [linkUrl, setLinkUrl] = useState('')
  const [isHeadingDropdownOpen, setIsHeadingDropdownOpen] = useState(false)
  const [lastSaved, setLastSaved] = useState(null)
  const [isMediaGalleryOpen, setIsMediaGalleryOpen] = useState(false)
  const [uploadedImages, setUploadedImages] = useState([])
  const [isUploading, setIsUploading] = useState(false)
  const [uploadTab, setUploadTab] = useState('upload')
  const fileInputRef = useRef(null)

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3, 4, 5, 6],
        },
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-blue-600 hover:text-blue-800 underline',
        },
      }),
      Image.configure({
        HTMLAttributes: {
          class: 'max-w-full h-auto',
        },
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
    ],
    content: content || '',
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: 'prose max-w-none focus:outline-none p-4 min-h-[400px] [&_h1]:text-4xl [&_h1]:font-bold [&_h1]:mb-4 [&_h2]:text-3xl [&_h2]:font-bold [&_h2]:mb-3 [&_h3]:text-2xl [&_h3]:font-semibold [&_h3]:mb-2 [&_h4]:text-xl [&_h4]:font-semibold [&_h4]:mb-2 [&_h5]:text-lg [&_h5]:font-medium [&_h5]:mb-1 [&_h6]:text-base [&_h6]:font-medium [&_h6]:mb-1 [&_blockquote]:border-l-4 [&_blockquote]:border-gray-300 [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-gray-700 [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:list-decimal [&_ol]:pl-6 [&_pre]:bg-gray-100 [&_pre]:p-3 [&_pre]:rounded [&_pre]:font-mono [&_pre]:text-sm',
        placeholder: placeholder,
      },
    },
    onUpdate: ({ editor }) => {
      const html = editor.getHTML()
      onChange?.(html)
    },
  })

  // Load existing images when gallery opens
  useEffect(() => {
    if (isMediaGalleryOpen && uploadTab === 'gallery') {
      loadGalleryImages()
    }
  }, [isMediaGalleryOpen, uploadTab])

  // Auto-save simulation
  useEffect(() => {
    if (content) {
      const timer = setTimeout(() => {
        const now = new Date()
        setLastSaved(now.toLocaleTimeString())
      }, 2000)
      return () => clearTimeout(timer)
    }
  }, [content])

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

  const handleFileSelect = async (event) => {
    const file = event.target.files?.[0]
    if (!file) return

    await uploadImage(file)
  }

  const uploadImage = async (file) => {
    setIsUploading(true)
    
    try {
      const formData = new FormData()
      formData.append('file', file)

      const response = await fetch('/api/uploads', {
        method: 'POST',
        body: formData,
      })

      const data = await response.json()

      if (response.ok && data.url) {
        // Insert image into editor
        editor?.chain().focus().setImage({ src: data.url }).run()
        setIsMediaGalleryOpen(false)
        
        // Reset file input
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

  const insertImageFromGallery = (imageUrl) => {
    editor?.chain().focus().setImage({ src: imageUrl }).run()
    setIsMediaGalleryOpen(false)
  }

  const setLink = useCallback(() => {
    const previousUrl = editor?.getAttributes('link').href
    setLinkUrl(previousUrl || '')
    setIsLinkModalOpen(true)
  }, [editor])

  const handleSetLink = () => {
    if (linkUrl === '') {
      editor?.chain().focus().extendMarkRange('link').unsetLink().run()
    } else {
      editor?.chain().focus().extendMarkRange('link').setLink({ href: linkUrl }).run()
    }
    setIsLinkModalOpen(false)
    setLinkUrl('')
  }

  const addImage = useCallback(() => {
    setIsMediaGalleryOpen(true)
    setUploadTab('upload')
  }, [])

  if (!editor) {
    return (
      <div className="border border-gray-300 bg-white animate-pulse">
        <div className="h-16 bg-gray-100 border-b border-gray-300"></div>
        <div className="h-96 bg-gray-50"></div>
      </div>
    )
  }

  const ToolbarButton = ({ onClick, isActive, disabled, children, title, className: btnClassName = "" }) => (
    <button
      onClick={onClick}
      disabled={disabled}
      title={title}
      className={`
        relative inline-flex items-center justify-center px-2 py-1.5 text-sm
        border border-gray-300 bg-white hover:bg-gray-50 
        disabled:opacity-50 disabled:cursor-not-allowed
        transition-colors group
        ${isActive ? 'bg-gray-200 border-gray-400' : 'hover:bg-gray-100'}
        ${btnClassName}
      `}
    >
      {children}
      {title && (
        <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity z-10 whitespace-nowrap">
          {title}
        </span>
      )}
    </button>
  )

  const getCurrentHeading = () => {
    if (editor.isActive('heading', { level: 1 })) return 'Heading 1'
    if (editor.isActive('heading', { level: 2 })) return 'Heading 2'
    if (editor.isActive('heading', { level: 3 })) return 'Heading 3'
    if (editor.isActive('heading', { level: 4 })) return 'Heading 4'
    if (editor.isActive('heading', { level: 5 })) return 'Heading 5'
    if (editor.isActive('heading', { level: 6 })) return 'Heading 6'
    if (editor.isActive('codeBlock')) return 'Preformatted'
    return 'Paragraph'
  }

  const headingOptions = [
    { label: 'Paragraph', action: () => editor.chain().focus().setParagraph().run(), isActive: !editor.isActive('heading') && !editor.isActive('codeBlock') },
    { label: 'Heading 1', action: () => editor.chain().focus().toggleHeading({ level: 1 }).run(), isActive: editor.isActive('heading', { level: 1 }) },
    { label: 'Heading 2', action: () => editor.chain().focus().toggleHeading({ level: 2 }).run(), isActive: editor.isActive('heading', { level: 2 }) },
    { label: 'Heading 3', action: () => editor.chain().focus().toggleHeading({ level: 3 }).run(), isActive: editor.isActive('heading', { level: 3 }) },
    { label: 'Heading 4', action: () => editor.chain().focus().toggleHeading({ level: 4 }).run(), isActive: editor.isActive('heading', { level: 4 }) },
    { label: 'Heading 5', action: () => editor.chain().focus().toggleHeading({ level: 5 }).run(), isActive: editor.isActive('heading', { level: 5 }) },
    { label: 'Heading 6', action: () => editor.chain().focus().toggleHeading({ level: 6 }).run(), isActive: editor.isActive('heading', { level: 6 }) },
    { label: 'Preformatted', action: () => editor.chain().focus().toggleCodeBlock().run(), isActive: editor.isActive('codeBlock') },
  ]

  const wordCount = editor.getText().split(' ').filter(word => word.length > 0).length
  const charCount = editor.getText().length

  return (
    <div className={`border border-gray-300 bg-white ${className}`}>
      {/* Top Bar */}
      <div className="flex items-center justify-between px-4 py-2 bg-gray-50 border-b border-gray-300">
        <div className="flex items-center space-x-2">
          <button 
            onClick={addImage}
            className="inline-flex items-center px-3 py-1.5 bg-white border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
            title="Add Media"
          >
            <Icons.Media />
            Add Media
          </button>
        </div>
        <div className="flex items-center">
          <button className="px-4 py-1.5 bg-white border-l border-t border-r border-gray-300 text-sm font-medium text-gray-900 bg-gray-100">
            Visual
          </button>
        </div>
      </div>

      {/* Main Toolbar */}
      <div className="flex items-center px-2 py-2 bg-gray-100 border-b border-gray-300 flex-wrap gap-1">
        {/* Heading Dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsHeadingDropdownOpen(!isHeadingDropdownOpen)}
            className="inline-flex items-center px-3 py-1.5 bg-white border border-gray-300 text-sm hover:bg-gray-50 min-w-[120px] justify-between"
            title="Format"
          >
            <span className="truncate">{getCurrentHeading()}</span>
            <Icons.ChevronDown />
          </button>
          
          {isHeadingDropdownOpen && (
            <div className="absolute top-full left-0 mt-1 w-40 bg-white border border-gray-300 shadow-lg z-20">
              {headingOptions.map((option, index) => (
                <button
                  key={index}
                  onClick={() => {
                    option.action()
                    setIsHeadingDropdownOpen(false)
                  }}
                  className={`block w-full text-left px-3 py-2 text-sm hover:bg-gray-100 border-b border-gray-200 last:border-b-0 ${
                    option.isActive ? 'bg-blue-100 text-blue-700' : ''
                  }`}
                  style={{
                    fontSize: option.label === 'Heading 1' ? '18px' : 
                             option.label === 'Heading 2' ? '16px' :
                             option.label === 'Heading 3' ? '15px' :
                             option.label === 'Heading 4' ? '14px' :
                             option.label === 'Heading 5' ? '13px' :
                             option.label === 'Heading 6' ? '12px' :
                             option.label === 'Preformatted' ? '11px' : '14px',
                    fontWeight: option.label.includes('Heading') ? 'bold' : 
                               option.label === 'Preformatted' ? 'normal' : 'normal',
                    fontFamily: option.label === 'Preformatted' ? 'monospace' : 'inherit'
                  }}
                >
                  {option.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Text Formatting */}
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBold().run()}
          isActive={editor.isActive('bold')}
          title="Bold"
          className="border-l-0"
        >
          <Icons.Bold />
        </ToolbarButton>
        
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleItalic().run()}
          isActive={editor.isActive('italic')}
          title="Italic"
          className="border-l-0"
        >
          <Icons.Italic />
        </ToolbarButton>

        {/* Lists */}
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          isActive={editor.isActive('bulletList')}
          title="Bullet list"
          className="border-l-0"
        >
          <Icons.BulletList />
        </ToolbarButton>

        <ToolbarButton
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          isActive={editor.isActive('orderedList')}
          title="Numbered list"
          className="border-l-0"
        >
          <Icons.NumberedList />
        </ToolbarButton>

        {/* Quote */}
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          isActive={editor.isActive('blockquote')}
          title="Blockquote"
          className="border-l-0"
        >
          <Icons.Quote />
        </ToolbarButton>

        {/* Alignment */}
        <ToolbarButton
          onClick={() => editor.chain().focus().setTextAlign('left').run()}
          isActive={editor.isActive({ textAlign: 'left' })}
          title="Align left"
          className="border-l-0"
        >
          <Icons.AlignLeft />
        </ToolbarButton>

        <ToolbarButton
          onClick={() => editor.chain().focus().setTextAlign('center').run()}
          isActive={editor.isActive({ textAlign: 'center' })}
          title="Align center"
          className="border-l-0"
        >
          <Icons.AlignCenter />
        </ToolbarButton>

        <ToolbarButton
          onClick={() => editor.chain().focus().setTextAlign('right').run()}
          isActive={editor.isActive({ textAlign: 'right' })}
          title="Align right"
          className="border-l-0"
        >
          <Icons.AlignRight />
        </ToolbarButton>

        {/* Link */}
        <ToolbarButton
          onClick={setLink}
          isActive={editor.isActive('link')}
          title="Insert/edit link"
          className="border-l-0"
        >
          <Icons.Link />
        </ToolbarButton>

        {/* More */}
        <ToolbarButton
          onClick={() => {}}
          title="Toolbar Toggle"
          className="border-l-0"
        >
          <Icons.More />
        </ToolbarButton>
      </div>

      {/* Editor Content */}
      <div className="relative bg-white">
        <EditorContent 
          editor={editor}
          className="focus-within:outline-none"
        />
      </div>

      {/* Status Bar */}
      {showWordCount && (
        <div className="flex items-center justify-between px-4 py-2 bg-gray-50 border-t border-gray-300 text-sm text-gray-600">
          <div>
            Word count: {wordCount}
          </div>
          {lastSaved && (
            <div>
              Draft saved at {lastSaved}.
            </div>
          )}
        </div>
      )}

      {/* Media Gallery Modal */}
      {isMediaGalleryOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] flex flex-col shadow-xl">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold">Insert Media</h3>
              <button
                onClick={() => setIsMediaGalleryOpen(false)}
                className="text-gray-400 hover:text-gray-600 text-2xl leading-none"
              >
                ×
              </button>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-gray-200">
              <button
                onClick={() => setUploadTab('upload')}
                className={`px-6 py-3 text-sm font-medium ${
                  uploadTab === 'upload'
                    ? 'border-b-2 border-blue-600 text-blue-600'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                Upload Files
              </button>
              <button
                onClick={() => setUploadTab('gallery')}
                className={`px-6 py-3 text-sm font-medium ${
                  uploadTab === 'gallery'
                    ? 'border-b-2 border-blue-600 text-blue-600'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                Media Library
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6">
              {uploadTab === 'upload' ? (
                <div className="space-y-4">
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:border-gray-400 transition-colors">
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleFileSelect}
                      className="hidden"
                      id="image-upload"
                    />
                    <label
                      htmlFor="image-upload"
                      className="cursor-pointer flex flex-col items-center"
                    >
                      {isUploading ? (
                        <>
                          <Icons.Spinner />
                          <p className="mt-4 text-sm text-gray-600">Uploading...</p>
                        </>
                      ) : (
                        <>
                          <Icons.Upload />
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
                        onClick={() => setUploadTab('upload')}
                        className="mt-4 text-blue-600 hover:text-blue-700 font-medium"
                      >
                        Upload your first image
                      </button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                      {uploadedImages.map((image, index) => (
                        <div
                          key={index}
                          onClick={() => insertImageFromGallery(image.url)}
                          className="relative aspect-square rounded-lg overflow-hidden cursor-pointer border-2 border-transparent hover:border-blue-500 transition-all group"
                        >
                          <img
                            src={image.url}
                            alt={image.filename}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all flex items-center justify-center">
                            <span className="text-white opacity-0 group-hover:opacity-100 text-sm font-medium">
                              Insert
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

      {/* Link Modal */}
      {isLinkModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md mx-4 shadow-xl">
            <h3 className="text-lg font-medium mb-4">Insert/edit link</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  URL
                </label>
                <input
                  type="url"
                  value={linkUrl}
                  onChange={(e) => setLinkUrl(e.target.value)}
                  placeholder="https://example.com"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  autoFocus
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      handleSetLink()
                    }
                  }}
                />
              </div>
              <div className="flex items-center justify-end space-x-3">
                <button
                  onClick={() => {
                    setIsLinkModalOpen(false)
                    setLinkUrl('')
                  }}
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSetLink}
                  className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Add Link
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Click outside to close dropdown */}
      {isHeadingDropdownOpen && (
        <div 
          className="fixed inset-0 z-10" 
          onClick={() => setIsHeadingDropdownOpen(false)}
        />
      )}
    </div>
  )
}

export default TiptapEditor