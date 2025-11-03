import { json } from "@remix-run/node";
import type { LoaderFunctionArgs, MetaFunction, ErrorResponse, ActionFunctionArgs } from "@remix-run/node";
import { useLoaderData, Link, useRouteError, isRouteErrorResponse, useFetcher } from "@remix-run/react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
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
  banner_image: string | null;
  published_at: string | null;
  view_count: number;
  like_count: number;
  is_liked: boolean;
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

  const imageUrl = data.post.banner_image || data.post.featured_image;
  const description = data.post.excerpt || `Read ${data.post.title} on Kevon Cadogan's blog.`;

  return [
    { title: `${data.post.title} - Kevon Cadogan | Blog` },
    {
      name: "description",
      content: description,
    },
    {
      name: "keywords",
      content: data.post.category ? `${data.post.category.name}, blog, web development` : "blog, web development",
    },
    // Open Graph tags
    { property: "og:type", content: "article" },
    { property: "og:title", content: `${data.post.title} - Kevon Cadogan | Blog` },
    { property: "og:description", content: description },
    ...(imageUrl ? [{ property: "og:image", content: imageUrl }] : []),
    // Twitter Card tags
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: `${data.post.title} - Kevon Cadogan | Blog` },
    { name: "twitter:description", content: description },
    ...(imageUrl ? [{ name: "twitter:image", content: imageUrl }] : []),
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

    // Get current user session
    const { data: { session } } = await supabase.auth.getSession();
    const userId = session?.user?.id || null;

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
        banner_image,
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

    // Fetch like count
    const { count: likeCount } = await supabase
      .from("likes")
      .select("*", { count: "exact", head: true })
      .eq("post_id", posts.id);

    // Check if current user or guest has liked the post
    let isLiked = false;
    if (userId) {
      const { data: userLike } = await supabase
        .from("likes")
        .select("id")
        .eq("post_id", posts.id)
        .eq("user_id", userId)
        .single();
      isLiked = !!userLike;
    } else {
      // Check for guest session
      const cookies = request.headers.get("cookie") || "";
      const guestSessionId = cookies
        .split("; ")
        .find((c) => c.startsWith("guest_session_id="))
        ?.split("=")[1];
      
      if (guestSessionId) {
        const { data: guestLike } = await supabase
          .from("likes")
          .select("id")
          .eq("post_id", posts.id)
          .eq("guest_session_id", guestSessionId)
          .single();
        isLiked = !!guestLike;
      }
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
      banner_image: posts.banner_image,
      published_at: posts.published_at,
      view_count: posts.view_count || 0,
      like_count: likeCount || 0,
      is_liked: isLiked,
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

export const action = async ({ request, params }: ActionFunctionArgs) => {
  const response = new Response();
  const supabase = createServerClientHandler(request, response.headers);

  // Get current user session
  const { data: { session } } = await supabase.auth.getSession();
  const userId = session?.user?.id || null;

  const { slug } = params;
  if (!slug) {
    return json({ error: "Slug is required" }, { status: 400, headers: response.headers });
  }

  // Get the post ID
  const { data: post } = await supabase
    .from("posts")
    .select("id")
    .eq("slug", slug)
    .single();

  if (!post) {
    return json({ error: "Post not found" }, { status: 404, headers: response.headers });
  }

  const formData = await request.formData();
  const intent = formData.get("intent");
  
  // Get or create guest session ID for unauthenticated users
  let guestSessionId: string | null = null;
  if (!userId) {
    const cookies = request.headers.get("cookie") || "";
    guestSessionId = cookies
      .split("; ")
      .find((c) => c.startsWith("guest_session_id="))
      ?.split("=")[1] || null;

    // If no guest session exists, get it from form data (generated client-side)
    if (!guestSessionId) {
      guestSessionId = formData.get("guest_session_id") as string | null;
      if (guestSessionId) {
        // Set cookie for future requests
        response.headers.append(
          "Set-Cookie",
          `guest_session_id=${guestSessionId}; Path=/; Max-Age=31536000; SameSite=Lax`
        );
      }
    }
  }

  if (intent === "like") {
    // Check if already liked
    let existingLike;
    if (userId) {
      const result = await supabase
        .from("likes")
        .select("id")
        .eq("post_id", post.id)
        .eq("user_id", userId)
        .single();
      existingLike = result.data;
    } else if (guestSessionId) {
      const result = await supabase
        .from("likes")
        .select("id")
        .eq("post_id", post.id)
        .eq("guest_session_id", guestSessionId)
        .single();
      existingLike = result.data;
    } else {
      return json({ error: "Unable to identify user" }, { status: 400, headers: response.headers });
    }

    if (existingLike) {
      return json({ error: "Post already liked" }, { status: 400, headers: response.headers });
    }

    // Add like
    const likeData: any = { post_id: post.id };
    if (userId) {
      likeData.user_id = userId;
    } else if (guestSessionId) {
      likeData.guest_session_id = guestSessionId;
    } else {
      return json({ error: "Unable to identify user" }, { status: 400, headers: response.headers });
    }

    const { error } = await supabase.from("likes").insert(likeData);

    if (error) {
      console.error("Error liking post:", error);
      return json({ error: error.message }, { status: 500, headers: response.headers });
    }

    // Get updated like count
    const { count: likeCount } = await supabase
      .from("likes")
      .select("*", { count: "exact", head: true })
      .eq("post_id", post.id);

    return json({ success: true, like_count: likeCount || 0, is_liked: true }, { headers: response.headers });
  }

  if (intent === "unlike") {
    // Remove like
    let deleteQuery = supabase.from("likes").delete().eq("post_id", post.id);
    
    if (userId) {
      deleteQuery = deleteQuery.eq("user_id", userId);
    } else if (guestSessionId) {
      deleteQuery = deleteQuery.eq("guest_session_id", guestSessionId);
    } else {
      return json({ error: "Unable to identify user" }, { status: 400, headers: response.headers });
    }

    const { error } = await deleteQuery;

    if (error) {
      console.error("Error unliking post:", error);
      return json({ error: error.message }, { status: 500, headers: response.headers });
    }

    // Get updated like count
    const { count: likeCount } = await supabase
      .from("likes")
      .select("*", { count: "exact", head: true })
      .eq("post_id", post.id);

    return json({ success: true, like_count: likeCount || 0, is_liked: false }, { headers: response.headers });
  }

  return json({ error: "Invalid intent" }, { status: 400, headers: response.headers });
};

// Helper to get or create guest session ID
function getGuestSessionId(): string {
  if (typeof window === "undefined") return "";
  
  let guestId = localStorage.getItem("guest_session_id");
  if (!guestId) {
    // Generate a simple UUID-like string
    guestId = `${Date.now()}-${Math.random().toString(36).substring(2, 15)}`;
    localStorage.setItem("guest_session_id", guestId);
  }
  return guestId;
}

export default function BlogPost() {
  const data = useLoaderData<typeof loader>();
  const { post, error } = data;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const fetcher = useFetcher<typeof action>();
  const [likeError, setLikeError] = useState<string | null>(null);
  const [guestSessionId] = useState(() => getGuestSessionId());
  
  // Optimistic UI state
  const isLiked = fetcher.formData 
    ? fetcher.formData.get("intent") === "like" 
    : ((fetcher.data as any)?.is_liked ?? post?.is_liked ?? false);
  const likeCount = ((fetcher.data as any)?.like_count ?? post?.like_count ?? 0) as number;

  // Handle fetcher errors
  useEffect(() => {
    if (fetcher.data && "error" in fetcher.data) {
      setLikeError((fetcher.data as any).error);
      setTimeout(() => setLikeError(null), 5000);
    }
  }, [fetcher.data]);

  // Set guest session cookie if not already set
  useEffect(() => {
    if (guestSessionId && typeof document !== "undefined") {
      const cookies = document.cookie.split("; ");
      const hasGuestCookie = cookies.some((c) => c.startsWith("guest_session_id="));
      if (!hasGuestCookie) {
        document.cookie = `guest_session_id=${guestSessionId}; Path=/; Max-Age=31536000; SameSite=Lax`;
      }
    }
  }, [guestSessionId]);

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

              {/* Like Button */}
              <div className="mt-6">
                <fetcher.Form method="post">
                  <input type="hidden" name="intent" value={isLiked ? "unlike" : "like"} />
                  {guestSessionId && (
                    <input type="hidden" name="guest_session_id" value={guestSessionId} />
                  )}
                  <button
                    type="submit"
                    disabled={fetcher.state !== "idle"}
                    className={`inline-flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                      isLiked
                        ? "bg-white text-primary hover:bg-white/90"
                        : "bg-white/20 text-white hover:bg-white/30"
                    } disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    <svg
                      className={`w-5 h-5 ${isLiked ? "fill-current" : ""}`}
                      fill={isLiked ? "currentColor" : "none"}
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      />
                    </svg>
                    <span className="font-medium">
                      {likeCount} {likeCount === 1 ? "like" : "likes"}
                    </span>
                  </button>
                </fetcher.Form>
                {likeError && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-2 text-sm text-white/80"
                  >
                    {likeError}
                  </motion.p>
                )}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Article Content */}
        <article className="py-12 px-4 flex-1">
          <div className="container mx-auto max-w-4xl">
            {/* Banner Image or Featured Image */}
            {(post.banner_image || post.featured_image) && (
              <motion.div
                className="mb-8 rounded-lg overflow-hidden"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <img
                  src={post.banner_image || post.featured_image || ""}
                  alt={post.title}
                  className="w-full h-auto max-h-96 object-cover"
                  loading="eager"
                />
              </motion.div>
            )}

            {/* Markdown Content */}
            <motion.div
              className="prose prose-lg max-w-none prose-headings:font-raleway prose-headings:text-gray-800 prose-p:text-gray-700 prose-p:leading-relaxed prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-strong:text-gray-800 prose-code:text-gray-100 prose-code:bg-gray-800 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:font-mono prose-code:text-sm prose-pre:bg-gray-900 prose-pre:text-gray-100 prose-pre:border prose-pre:border-gray-700 prose-pre:rounded-lg prose-pre:overflow-x-auto"
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
