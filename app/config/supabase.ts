import { createBrowserClient } from "@supabase/ssr";
import { createServerClient } from "@supabase/ssr";

/**
 * Creates a Supabase client for use in the browser.
 * Use this in React components and client-side code.
 */
export function createClient() {
  return createBrowserClient(
    process.env.PUBLIC_SUPABASE_URL!,
    process.env.PUBLIC_SUPABASE_ANON_KEY!
  );
}

/**
 * Creates a Supabase client for server-side use in Remix loaders and actions.
 * This client handles cookies for session management.
 * 
 * @param request - The incoming Request object
 * @param responseHeaders - Headers object where Set-Cookie headers will be appended
 * @returns A Supabase client configured for server-side use
 * 
 * @example
 * ```ts
 * export const loader: LoaderFunction = async ({ request }) => {
 *   const response = new Response();
 *   const supabase = createServerClientHandler(request, response.headers);
 *   
 *   const { data: { session } } = await supabase.auth.getSession();
 *   // ... your logic
 *   
 *   return json({ data: "..." }, { headers: response.headers });
 * }
 * ```
 */
export function createServerClientHandler(request: Request, responseHeaders: Headers) {
  return createServerClient(
    process.env.PUBLIC_SUPABASE_URL!,
    process.env.PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          const cookies = request.headers.get("cookie");
          if (!cookies) {
            return [];
          }
          return cookies.split("; ").map((cookie) => {
            const [name, ...rest] = cookie.split("=");
            return { name, value: rest.join("=") };
          });
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            const cookieParts = [`${name}=${value}`];
            
            if (options?.maxAge) {
              cookieParts.push(`Max-Age=${options.maxAge}`);
            }
            if (options?.domain) {
              cookieParts.push(`Domain=${options.domain}`);
            }
            if (options?.path) {
              cookieParts.push(`Path=${options.path}`);
            } else {
              cookieParts.push("Path=/");
            }
            if (options?.httpOnly) {
              cookieParts.push("HttpOnly");
            }
            if (options?.secure) {
              cookieParts.push("Secure");
            }
            if (options?.sameSite) {
              cookieParts.push(`SameSite=${options.sameSite}`);
            }
            
            responseHeaders.append("Set-Cookie", cookieParts.join("; "));
          });
        },
      },
    }
  );
}
