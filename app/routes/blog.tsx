import { Outlet } from "@remix-run/react";

/**
 * Blog layout route
 * This file must exist for nested routes in blog/ folder to work
 */
export default function BlogLayout() {
  return <Outlet />;
}

