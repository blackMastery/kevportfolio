import { json } from "@remix-run/node";
import type { LoaderFunctionArgs, MetaFunction, ErrorResponse } from "@remix-run/node";
import { useLoaderData, Link, useRouteError, isRouteErrorResponse } from "@remix-run/react";
import { motion } from "framer-motion";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
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

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  if (!data?.post) {
    return [
      { title: "Post Not Found - Kevon Cadogan" },
      { name: "description", content: "The requested blog post could not be found." },
    ];
  }

  return [
    { title: `${data.post.title} - Kevon Cadogan | Blog` },
    {
      name: "description",
      content: data.post.excerpt || `Read ${data.post.title} on Kevon Cadogan's blog.`,
    },
    {
      name: "keywords",
      content: data.post.category ? `${data.post.category.name}, blog, web development` : "blog, web development",
    },
  ];
};

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  try {
    const response = new Response();
    const supabase = createServerClientHandler(request, response.headers);

    const { slug } = params;
    console.log("Blog post loader - slug:", slug);

    if (!slug) {
      console.log("Blog post loader - no slug provided");
      return json({ post: null, error: "Slug is required" }, { status: 400, headers: response.headers });
    }

    // Fetch the post with author and category information
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
      .eq("slug", slug)
      .eq("published", true)
      .single();

    console.log("Blog post loader - Supabase response:", { error, hasData: !!posts });

    if (error) {
      console.error("Supabase error fetching post:", error);
      return json(
        { post: null, error: error.message || "Post not found" },
        { headers: response.headers }
      );
    }

    if (!posts) {
      console.log("Blog post loader - no post found for slug:", slug);
      return json(
        { post: null, error: "Post not found" },
        { headers: response.headers }
      );
    }

    // Transform the data to ensure correct typing (same as blog.tsx)
    // Handle both array and object responses from Supabase relations
    let author: Profile | null = null;
    if (posts.author) {
      if (Array.isArray(posts.author)) {
        author = posts.author[0] || null;
      } else {
        author = posts.author as Profile;
      }
    }

    let category: Category | null = null;
    if (posts.category) {
      if (Array.isArray(posts.category)) {
        category = posts.category[0] || null;
      } else {
        category = posts.category as Category;
      }
    }

    const transformedPost: BlogPost = {
      id: posts.id,
      title: posts.title,
      slug: posts.slug,
      content: posts.content,
      excerpt: posts.excerpt,
      featured_image: posts.featured_image,
      published_at: posts.published_at,
      view_count: posts.view_count || 0,
      created_at: posts.created_at,
      author,
      category,
    };

    console.log("Blog post loader - transformed post:", transformedPost.title);

    // Increment view count (fire and forget - don't wait for it)
    void Promise.resolve(supabase.rpc("increment_post_views", { post_id: posts.id })).catch(
      () => {}
    );

    return json({ post: transformedPost, error: null }, { headers: response.headers });
  } catch (err) {
    console.error("Blog post loader - unexpected error:", err);
    return json(
      { post: null, error: err instanceof Error ? err.message : "An unexpected error occurred" },
      { status: 500 }
    );
  }
};

export default function BlogPost() {
  const data = useLoaderData<typeof loader>();
  const { post, error } = data;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  console.log("BlogPost component render - post:", post ? post.title : "null", "error:", error);

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (error || !post) {
    return (
      <div className="relative min-h-screen">
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

        <Header isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />

        <main className="xl:ml-80 min-h-screen flex flex-col bg-gray-50">
          <section className="py-20 px-4">
            <div className="container mx-auto max-w-4xl text-center">
              <h1 className="text-4xl font-bold mb-4 text-gray-800 font-raleway">Post Not Found</h1>
              <p className="text-gray-600 mb-8">{error || "The requested blog post could not be found."}</p>
              <Link
                to="/blog"
                className="inline-block px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-hover transition-colors"
              >
                Back to Blog
              </Link>
            </div>
          </section>
          <Footer />
        </main>
      </div>
    );
  }

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
        <section className="bg-gradient-to-r from-primary to-primary-hover text-white py-16 px-4">
          <div className="container mx-auto max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Link
                to="/blog"
                className="inline-flex items-center text-white/80 hover:text-white mb-6 transition-colors text-sm"
              >
                <svg
                  className="w-4 h-4 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
                Back to Blog
              </Link>

              {post.category && (
                <span className="inline-block mb-4 px-4 py-1 text-sm font-semibold text-primary bg-white rounded-full">
                  {post.category.name}
                </span>
              )}

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 font-raleway">
                {post.title}
              </h1>

              <div className="flex flex-wrap items-center gap-4 text-white/90 text-sm">
                {post.author && (
                  <div className="flex items-center space-x-2">
                    {post.author.avatar_url ? (
                      <img
                        src={post.author.avatar_url}
                        alt={post.author.full_name || post.author.username}
                        className="w-8 h-8 rounded-full"
                      />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white text-xs font-semibold">
                        {(post.author.full_name || post.author.username)[0].toUpperCase()}
                      </div>
                    )}
                    <span className="font-medium">
                      {post.author.full_name || post.author.username}
                    </span>
                  </div>
                )}
                <span>•</span>
                <span>{formatDate(post.published_at || post.created_at)}</span>
                <span>•</span>
                <span>{post.view_count} views</span>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Article Content */}
        <article className="py-12 px-4 flex-1">
          <div className="container mx-auto max-w-4xl">
            {/* Featured Image */}
            {post.featured_image && (
              <motion.div
                className="mb-8 rounded-lg overflow-hidden"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <img
                  src={post.featured_image}
                  alt={post.title}
                  className="w-full h-auto max-h-96 object-cover"
                  loading="eager"
                />
              </motion.div>
            )}

            {/* Markdown Content */}
            <motion.div
              className="prose prose-lg max-w-none prose-headings:font-raleway prose-headings:text-gray-800 prose-p:text-gray-700 prose-p:leading-relaxed prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-strong:text-gray-800 prose-code:text-primary prose-code:bg-gray-100 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-pre:bg-gray-900 prose-pre:text-gray-100"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.content}</ReactMarkdown>
            </motion.div>

            {/* Article Footer */}
            <motion.div
              className="mt-12 pt-8 border-t border-gray-200"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Link
                to="/blog"
                className="inline-flex items-center px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-hover transition-colors"
              >
                <svg
                  className="w-4 h-4 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
                Back to Blog
              </Link>
            </motion.div>
          </div>
        </article>

        <Footer />
      </main>
    </div>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  let errorMessage = "An unexpected error occurred";
  let errorStatus = 500;

  if (isRouteErrorResponse(error)) {
    errorMessage = error.data?.error || error.statusText || "Not Found";
    errorStatus = error.status;
  } else if (error instanceof Error) {
    errorMessage = error.message;
  }

  console.error("Blog post error boundary - error:", error);

  return (
    <div className="relative min-h-screen">
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

      <Header isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />

      <main className="xl:ml-80 min-h-screen flex flex-col bg-gray-50">
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-4xl text-center">
            <h1 className="text-4xl font-bold mb-4 text-gray-800 font-raleway">
              {errorStatus === 404 ? "Post Not Found" : "Error"}
            </h1>
            <p className="text-gray-600 mb-8">{errorMessage}</p>
            <div className="space-x-4">
              <Link
                to="/blog"
                className="inline-block px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-hover transition-colors"
              >
                Back to Blog
              </Link>
              <button
                onClick={() => window.location.reload()}
                className="inline-block px-6 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Retry
              </button>
            </div>
          </div>
        </section>
        <Footer />
      </main>
    </div>
  );
}
