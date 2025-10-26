const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  console.log('Starting database seed...')

  // Create test users
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@test.com' },
    update: {},
    create: {
      email: 'admin@test.com',
      name: 'Admin User',
      password: 'password123', // In real app, this should be hashed
      role: 'admin',
    },
  })

  const editorUser = await prisma.user.upsert({
    where: { email: 'editor@test.com' },
    update: {},
    create: {
      email: 'editor@test.com',
      name: 'Editor User',
      password: 'password123', // In real app, this should be hashed
      role: 'editor',
    },
  })

  console.log('Created users:', { adminUser, editorUser })

  // Create test pages
  const homepage = await prisma.page.upsert({
    where: { path: '/' },
    update: {},
    create: {
      path: '/',
      title: 'Homepage',
      puckData: JSON.stringify({
        content: [
          {
            type: 'Hero',
            props: {
              title: 'Welcome to Our Website',
              description: 'This is a sample homepage created with Puck editor'
            }
          }
        ],
        root: {
          props: {
            title: 'Homepage'
          }
        }
      }),
      authorId: adminUser.id,
      published: true,
    },
  })

  const aboutPage = await prisma.page.upsert({
    where: { path: '/about' },
    update: {},
    create: {
      path: '/about',
      title: 'About Us',
      puckData: JSON.stringify({
        content: [
          {
            type: 'TextBlock',
            props: {
              text: 'Learn more about our company and mission.'
            }
          }
        ],
        root: {
          props: {
            title: 'About Us'
          }
        }
      }),
      authorId: adminUser.id,
      published: true,
    },
  })

  console.log('Created pages:', { homepage, aboutPage })

  // Create test posts
  const samplePost1 = await prisma.post.upsert({
    where: { slug: 'welcome-to-our-blog' },
    update: {},
    create: {
      title: 'Welcome to Our Blog',
      slug: 'welcome-to-our-blog',
      content: '<h1>Welcome!</h1><p>This is our first blog post. We\'re excited to share our thoughts with you.</p>',
      excerpt: 'Our first blog post welcoming readers to our new website.',
      published: true,
      authorId: adminUser.id,
    },
  })

  const samplePost2 = await prisma.post.upsert({
    where: { slug: 'getting-started-with-our-platform' },
    update: {},
    create: {
      title: 'Getting Started with Our Platform',
      slug: 'getting-started-with-our-platform',
      content: '<h1>Getting Started</h1><p>Here\'s how to make the most of our platform...</p><ul><li>Step 1: Sign up</li><li>Step 2: Explore features</li><li>Step 3: Start creating</li></ul>',
      excerpt: 'A comprehensive guide to getting started with our platform.',
      published: false, // Draft post
      authorId: editorUser.id,
    },
  })

  console.log('Created posts:', { samplePost1, samplePost2 })

  console.log('Database seed completed successfully!')
}

main()
  .catch((e) => {
    console.error('Error during seed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
  