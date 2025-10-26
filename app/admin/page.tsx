'use client'

import AdminLayout from '../../components/AdminLayout'

export default function AdminDashboard() {
  return (
    <AdminLayout>
      <div className="p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="mt-1 text-sm text-gray-600">
            Welcome to your admin dashboard
          </p>
        </div>

        {/* Simple Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-medium text-gray-900">Pages</h3>
            <p className="text-3xl font-bold text-blue-600">1</p>
            <p className="text-sm text-gray-500">Homepage created</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-medium text-gray-900">Posts</h3>
            <p className="text-3xl font-bold text-green-600">2</p>
            <p className="text-sm text-gray-500">Total blog posts</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-medium text-gray-900">Published</h3>
            <p className="text-3xl font-bold text-green-600">1</p>
            <p className="text-sm text-gray-500">Live posts</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-medium text-gray-900">Drafts</h3>
            <p className="text-3xl font-bold text-yellow-600">1</p>
            <p className="text-sm text-gray-500">Pending posts</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-medium text-gray-900 mb-2">Create New Page</h3>
            <p className="text-gray-600 mb-4">Add a new page with Puck editor</p>
            <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              Create Page
            </button>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-medium text-gray-900 mb-2">Write New Post</h3>
            <p className="text-gray-600 mb-4">Create a new blog post</p>
            <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
              Write Post
            </button>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b">
            <h2 className="text-lg font-medium text-gray-900">Recent Activity</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Homepage</p>
                  <p className="text-sm text-gray-500">Page • Published</p>
                </div>
                <span className="text-sm text-gray-400">Today</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Welcome to Our Blog</p>
                  <p className="text-sm text-gray-500">Post • Published</p>
                </div>
                <span className="text-sm text-gray-400">Today</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Getting Started Guide</p>
                  <p className="text-sm text-gray-500">Post • Draft</p>
                </div>
                <span className="text-sm text-gray-400">Today</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}