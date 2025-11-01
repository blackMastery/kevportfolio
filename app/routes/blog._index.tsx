import { json } from "@remix-run/node";
import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { useLoaderData, Link } from "@remix-run/react";
import { motion } from "framer-motion";
import { useState } from "react";
import Header from "~/components/Header";
import Footer from "~/components/Footer";
import { createServerClientHandler } from "~/config/supabase";

// Type definitions for blog posts
interface Profile {
  id: string;
  username: string;
  full_name: string | null;
  avatar_url: string | null;
}

interface Category {
  id: string;
  name: string;
  slug: string;
}

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string | null;
  featured_image: string | null;
  published_at: string | null;
  view_count: number;
  created_at: string;
  author: Profile | null;
  category: Category | null;
}

export const meta: MetaFunction = () => {
  return [
    { title: "Blog - Kevon Cadogan | Full-Stack Developer" },
    {
      name: "description",
      content:
        "Read my latest blog posts about web development, React, Node.js, mobile development, and technology insights.",
    },
    { name: "keywords", content: "blog, web development, React, Node.js, programming, tech blog" },
  ];
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const response = new Response();
  const supabase = createServerClientHandler(request, response.headers);

  // Fetch published posts with author and category information
  const { data: posts, error } = await supabase
    .from("posts")
    .select(
      `
      id,
      title,
      slug,
      content,
      excerpt,
      featured_image,
      published_at,
      view_count,
      created_at,
      author:profiles(id, username, full_name, avatar_url),
      category:categories(id, name, slug)
    `
    )
    .eq("published", true)
    .order("published_at", { ascending: false })
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching posts:", error);
    return json({ posts: [] as BlogPost[], error: error.message }, { headers: response.headers });
  }

  // Transform the data to ensure correct typing
  // Supabase returns relations as arrays, but we need single objects
  const transformedPosts: BlogPost[] = (posts || []).map((post: any) => ({
    id: post.id,
    title: post.title,
    slug: post.slug,
    content: post.content,
    excerpt: post.excerpt,
    featured_image: post.featured_image,
    published_at: post.published_at,
    view_count: post.view_count || 0,
    created_at: post.created_at,
    author: Array.isArray(post.author) ? post.author[0] || null : post.author || null,
    category: Array.isArray(post.category) ? post.category[0] || null : post.category || null,
  }));

  return json({ posts: transformedPosts, error: null }, { headers: response.headers });
};

export default function Blog() {
  const data = useLoaderData<typeof loader>();
  const { posts, error } = data;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  console.log("Blog component render - data:", data, "posts:", posts, "posts length:", posts?.length, "error:", error);

  // Safety check - ensure we have valid data
  if (!data) {
    console.error("No data returned from loader");
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Loading...</h1>
          <p className="text-gray-600">Please wait while we load the blog posts.</p>
        </div>
      </div>
    );
  }

  const safePosts = posts || [];
  const hasError = !!error;
  const hasPosts = safePosts.length > 0;

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Strip markdown syntax from text for excerpts
  const stripMarkdown = (markdown: string): string => {
    if (!markdown) return "";
    return markdown
      // Remove headers
      .replace(/^#{1,6}\s+/gm, "")
      // Remove bold/italic
      .replace(/\*\*([^*]+)\*\*/g, "$1")
      .replace(/\*([^*]+)\*/g, "$1")
      .replace(/__([^_]+)__/g, "$1")
      .replace(/_([^_]+)_/g, "$1")
      // Remove links but keep text
      .replace(/\[([^\]]+)\]\([^\)]+\)/g, "$1")
      // Remove images
      .replace(/!\[([^\]]*)\]\([^\)]+\)/g, "")
      // Remove code blocks
      .replace(/```[\s\S]*?```/g, "")
      .replace(/`([^`]+)`/g, "$1")
      // Remove lists markers
      .replace(/^\s*[-*+]\s+/gm, "")
      .replace(/^\s*\d+\.\s+/gm, "")
      // Remove blockquotes
      .replace(/^\s*>+\s+/gm, "")
      // Remove horizontal rules
      .replace(/^---$/gm, "")
      // Remove HTML tags
      .replace(/<[^>]+>/g, "")
      // Clean up extra whitespace
      .replace(/\n\s*\n/g, "\n")
      .trim();
  };

  const getExcerpt = (post: BlogPost, maxLength: number = 150): string => {
    if (post.excerpt) {
      const stripped = stripMarkdown(post.excerpt);
      if (stripped.length <= maxLength) return stripped;
      return stripped.substring(0, maxLength).trim() + "...";
    }
    if (post.content) {
      const stripped = stripMarkdown(post.content);
      if (stripped.length <= maxLength) return stripped;
      return stripped.substring(0, maxLength).trim() + "...";
    }
    return "";
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <div className="relative min-h-screen">
      {/* Mobile nav toggle */}
      <button
        type="button"
        className="fixed top-4 right-4 z-50 xl:hidden w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-white"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>

      {/* Header/Sidebar */}
      <Header isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />

      {/* Main content */}
      <main className="xl:ml-80 min-h-screen flex flex-col bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-primary to-primary-hover text-white py-20 px-4">
          <div className="container mx-auto">
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 font-raleway">
                Blog
              </h1>
              <p className="text-lg md:text-xl max-w-2xl mx-auto opacity-90">
                Insights, tutorials, and thoughts on web development and technology
              </p>
            </motion.div>
          </div>
        </section>

        {/* Blog Posts Section */}
        <section className="py-12 px-4 flex-1">
          <div className="container mx-auto max-w-6xl">
            {hasError && (
              <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded mb-8">
                <p className="font-semibold">Error loading posts</p>
                <p className="text-sm">{error}</p>
              </div>
            )}

            {!hasPosts && !hasError ? (
              <motion.div
                className="text-center py-16"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <svg
                  className="w-24 h-24 mx-auto text-gray-400 mb-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                  />
                </svg>
                <h2 className="text-2xl font-semibold text-gray-700 mb-2 font-raleway">
                  No posts yet
                </h2>
                <p className="text-gray-500">Check back soon for new blog posts!</p>
              </motion.div>
            ) : (
              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {safePosts.map((post) => (
                  <motion.article
                    key={post.id}
                    className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col"
                    variants={itemVariants}
                  >
                    {/* Featured Image */}
                    {post.featured_image && (
                      <div className="w-full h-48 overflow-hidden bg-gray-200">
                        <img
                          src={post.featured_image}
                          alt={post.title}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                          loading="lazy"
                        />
                      </div>
                    )}

                    {/* Content */}
                    <div className="p-6 flex-1 flex flex-col">
                      {/* Category Badge */}
                      {post.category && (
                        <span className="inline-block mb-3 px-3 py-1 text-xs font-semibold text-primary bg-primary/10 rounded-full">
                          {post.category.name}
                        </span>
                      )}

                      {/* Title */}
                      <h2 className="text-xl font-semibold mb-3 text-gray-800 font-raleway line-clamp-2">
                        <Link
                          to={`/blog/${post.slug}`}
                          className="hover:text-primary transition-colors"
                        >
                          {post.title}
                        </Link>
                      </h2>

                      {/* Excerpt */}
                      {getExcerpt(post) && (
                        <p className="text-gray-600 mb-4 flex-1 line-clamp-3 text-sm leading-relaxed">
                          {getExcerpt(post)}
                        </p>
                      )}

                      {/* Meta Information */}
                      <div className="mt-auto pt-4 border-t border-gray-200">
                        <div className="flex items-center justify-between text-sm text-gray-500">
                          <div className="flex items-center space-x-2">
                            {post.author && (
                              <>
                                {post.author.avatar_url ? (
                                  <img
                                    src={post.author.avatar_url}
                                    alt={post.author.full_name || post.author.username}
                                    className="w-6 h-6 rounded-full"
                                  />
                                ) : (
                                  <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center text-white text-xs font-semibold">
                                    {(post.author.full_name || post.author.username)[0].toUpperCase()}
                                  </div>
                                )}
                                <span className="font-medium">
                                  {post.author.full_name || post.author.username}
                                </span>
                              </>
                            )}
                          </div>
                          <span>{formatDate(post.published_at || post.created_at)}</span>
                        </div>
                        <div className="flex items-center justify-between mt-2 text-xs text-gray-400">
                          <span>{post.view_count} views</span>
                          <Link
                            to={`/blog/${post.slug}`}
                            className="text-primary hover:text-primary-hover font-medium flex items-center space-x-1"
                          >
                            <span>Read more</span>
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 5l7 7-7 7"
                              />
                            </svg>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </motion.article>
                ))}
              </motion.div>
            )}
          </div>
        </section>

        <Footer />
      </main>
    </div>
  );
}

