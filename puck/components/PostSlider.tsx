// puck/components/PostSlider.tsx
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { PostSliderProps, Post } from '../types';

export const PostSlider = ({
  postsToShow = 3,
  autoPlay = true,
  autoPlaySpeed = 5,
  showArrows = true,
  showDots = true,
  categoryFilter = 'all',
  postsLimit = 9,
  gap = 'md',
  backgroundColor = 'transparent',
  title = 'Latest Stories',
  showTitle = true
}: PostSliderProps) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  const categories: Record<string, { label: string; color: string }> = {
    global: { label: 'Global', color: 'bg-blue-600' },
    mongolia: { label: 'Mongolia', color: 'bg-green-600' },
    vietnam: { label: 'Vietnam', color: 'bg-red-600' },
    china: { label: 'China', color: 'bg-yellow-600' }
  };

  const sliderGapMap: Record<string, string> = {
    none: 'gap-0',
    sm: 'gap-4',
    md: 'gap-6',
    lg: 'gap-8'
  };

  const bgColorMap: Record<string, string> = {
    transparent: 'bg-transparent',
    white: 'bg-white',
    'gray-50': 'bg-gray-50',
    'gray-100': 'bg-gray-100'
  };

  useEffect(() => {
    fetchPosts();
  }, [categoryFilter, postsLimit]);

  useEffect(() => {
    if (autoPlay && !isPaused && posts.length > postsToShow) {
      autoPlayRef.current = setInterval(() => {
        nextSlide();
      }, autoPlaySpeed * 1000);
    }

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [autoPlay, isPaused, currentIndex, posts.length, postsToShow, autoPlaySpeed]);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/posts?published=true');
      if (response.ok) {
        let data: Post[] = await response.json();
        
        if (categoryFilter !== 'all') {
          data = data.filter(post => post.category === categoryFilter);
        }
        
        data = data.slice(0, postsLimit);
        setPosts(data);
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => {
      const maxIndex = Math.max(0, posts.length - postsToShow);
      return prev >= maxIndex ? 0 : prev + 1;
    });
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => {
      const maxIndex = Math.max(0, posts.length - postsToShow);
      return prev <= 0 ? maxIndex : prev - 1;
    });
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getCategoryColor = (category: string) => {
    return categories[category]?.color || 'bg-gray-600';
  };

  const getCategoryLabel = (category: string) => {
    return categories[category]?.label || category;
  };

  const totalSlides = Math.max(0, posts.length - postsToShow + 1);

  if (loading) {
    return (
      <div className={`py-16 ${bgColorMap[backgroundColor]}`}>
        <div className="container mx-auto px-4">
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        </div>
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className={`py-16 ${bgColorMap[backgroundColor]}`}>
        <div className="container mx-auto px-4">
          <div className="text-center py-20">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">No posts found</h3>
            <p className="mt-1 text-sm text-gray-500">
              {categoryFilter === 'all' ? 'No published posts available yet.' : `No posts in the ${getCategoryLabel(categoryFilter)} category.`}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      className={`py-16 ${bgColorMap[backgroundColor]}`}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="container mx-auto px-4">
        {showTitle && title && (
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900">{title}</h2>
          </div>
        )}

        <div className="relative">
          {showArrows && posts.length > postsToShow && (
            <>
              <button
                onClick={prevSlide}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-12 h-12 bg-white border-2 border-gray-200 rounded-full flex items-center justify-center hover:bg-blue-600 hover:border-blue-600 hover:text-white transition-all shadow-lg"
                aria-label="Previous slide"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </button>

              <button
                onClick={nextSlide}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-12 h-12 bg-white border-2 border-gray-200 rounded-full flex items-center justify-center hover:bg-blue-600 hover:border-blue-600 hover:text-white transition-all shadow-lg"
                aria-label="Next slide"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </button>
            </>
          )}

          <div className="overflow-hidden" ref={sliderRef}>
            <div
              className={`flex ${sliderGapMap[gap]} transition-transform duration-500 ease-in-out`}
              style={{ transform: `translateX(-${currentIndex * (100 / postsToShow)}%)` }}
            >
              {posts.map((post) => (
                <Link
                  key={post.id}
                  href={`/stories/${post.slug}`}
                  className="group bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
                  style={{ flex: `0 0 calc(${100 / postsToShow}% - ${gap === 'none' ? '0px' : gap === 'sm' ? '12px' : gap === 'md' ? '18px' : '24px'})` }}
                >
                  <div className="relative h-48 bg-gray-200 overflow-hidden">
                    {post.thumbnail && post.thumbnail.trim() !== '' ? (
                      <img
                        src={post.thumbnail}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                          const parent = target.parentElement;
                          if (parent) {
                            parent.innerHTML = `
                              <div class="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
                                <svg class="w-16 h-16 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                  <path fill-rule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clip-rule="evenodd" />
                                </svg>
                              </div>
                            `;
                          }
                        }}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
                        <svg className="w-16 h-16 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                        </svg>
                      </div>
                    )}

                    <div className="absolute top-3 left-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold text-white ${getCategoryColor(post.category)}`}>
                        {getCategoryLabel(post.category)}
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                      {post.title}
                    </h3>

                    {post.excerpt && (
                      <p className="text-gray-600 text-sm mb-4 line-clamp-3">{post.excerpt}</p>
                    )}

                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                      <div className="flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                        </svg>
                        <span>{post.author.name || 'Anonymous'}</span>
                      </div>

                      <div className="flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                        </svg>
                        <span>{formatDate(post.createdAt)}</span>
                      </div>
                    </div>

                    <div className="flex items-center text-blue-600 font-medium text-sm group-hover:text-blue-700">
                      <span>Read more</span>
                      <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {showDots && posts.length > postsToShow && (
            <div className="flex justify-center gap-2 mt-6">
              {Array.from({ length: totalSlides }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`transition-all ${currentIndex === index ? 'w-6 h-2.5 bg-blue-600' : 'w-2.5 h-2.5 bg-gray-300 hover:bg-gray-400'} rounded-full`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};