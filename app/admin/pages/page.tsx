'use client'

import AdminLayout from '../../../components/AdminLayout'

export default function AdminPages() {
  return (
    <AdminLayout>
      <div className="p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Pages</h1>
            <p className="mt-1 text-sm text-gray-600">
              Manage your website pages
            </p>
          </div>
          <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Create New Page
          </button>
        </div>

        {/* Pages List */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-6 py-4 border-b">
            <h2 className="text-lg font-medium">All Pages</h2>
          </div>
          
          {/* Single Page Row */}
          <div className="px-6 py-4 border-b last:border-b-0">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-medium text-gray-900">Homepage</h3>
                <div className="flex items-center mt-1 text-sm text-gray-500 space-x-4">
                  <span>Path: /</span>
                  <span>•</span>
                  <span>Status: Published</span>
                  <span>•</span>
                  <span>Updated: Today</span>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <button className="text-blue-600 hover:text-blue-800 text-sm">
                  View
                </button>
                <button className="text-green-600 hover:text-green-800 text-sm">
                  Edit
                </button>
                <button className="text-red-600 hover:text-red-800 text-sm">
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}