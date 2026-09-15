import { Outlet } from "@remix-run/react";

/**
 * Portfolio layout route
 * This file must exist for nested routes in portfolio/ folder to work
 */
export default function PortfolioLayout() {
  return <Outlet />;
}
