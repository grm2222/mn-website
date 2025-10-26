'use client'

import { useState } from 'react'
import TiptapEditor from '../../components/TiptapEditor'

export default function TestEditor() {
  const [content, setContent] = useState(`
    <h1>Welcome to the Modern Editor</h1>
    <p>This is a beautiful, production-ready rich text editor built with Tiptap. Try out the features:</p>
    <ul>
      <li><strong>Bold text</strong> and <em>italic text</em></li>
      <li>Different heading levels</li>
      <li>Lists and quotes</li>
      <li>Links and images</li>
    </ul>
    <blockquote>
      <p>"The best way to predict the future is to create it." - Peter Drucker</p>
    </blockquote>
    <p>Start editing to see the magic happen! ✨</p>
  `)

  const handleSave = () => {
    alert('Content saved! (In real app, this would save to your database)')
    console.log('Saved content:', content)
  }

  const handleReset = () => {
    setContent('<p>Start writing something amazing...</p>')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Modern Rich Text Editor
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            A beautiful, production-ready editor built with Tiptap. Perfect for blog posts, articles, and content creation.
          </p>
        </div>

        {/* Editor */}
        <div className="mb-8">
          <TiptapEditor 
            content={content}
            onChange={setContent}
            placeholder="Start writing your masterpiece..."
            showWordCount={true}
          />
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={handleSave}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-sm hover:shadow-md"
          >
            Save Article
          </button>
          <button
            onClick={handleReset}
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
          >
            Reset Content
          </button>
          <div className="flex-1"></div>
          <div className="text-sm text-gray-500">
            Auto-saving every 30 seconds
          </div>
        </div>

        {/* Preview Section */}
        <div className="border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm">
          <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
            <h3 className="font-semibold text-gray-900">HTML Preview</h3>
            <p className="text-sm text-gray-600 mt-1">This is what gets saved to your database</p>
          </div>
          <div className="p-6">
            <pre className="text-sm text-gray-700 whitespace-pre-wrap overflow-auto max-h-60 bg-gray-50 p-4 rounded-lg">
              {content}
            </pre>
          </div>
        </div>

        {/* Features List */}
        <div className="mt-12 grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">✨ Features</h3>
            <ul className="space-y-2 text-gray-600">
              <li>• Modern, clean interface</li>
              <li>• Rich formatting options</li>
              <li>• Link and image support</li>
              <li>• Keyboard shortcuts</li>
              <li>• Word and character count</li>
              <li>• Responsive design</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">⌨️ Shortcuts</h3>
            <ul className="space-y-2 text-gray-600 font-mono text-sm">
              <li>• <strong>Cmd+B</strong> - Bold</li>
              <li>• <strong>Cmd+I</strong> - Italic</li>
              <li>• <strong>Cmd+K</strong> - Add link</li>
              <li>• <strong>Cmd+Z</strong> - Undo</li>
              <li>• <strong>Cmd+Shift+Z</strong> - Redo</li>
              <li>• <strong># + Space</strong> - Heading</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}