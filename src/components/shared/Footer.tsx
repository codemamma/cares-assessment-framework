import { useLocation } from "react-router-dom";

const HIDDEN_ROUTES = ["/assessment"];

export function Footer() {
  const { pathname } = useLocation();

  if (HIDDEN_ROUTES.some((route) => pathname.startsWith(route))) {
    return null;
  }

  return (
    <footer className="mt-12 py-6 border-t border-gray-200/10">
      <p className="text-center text-sm text-gray-400">
        <span className="font-medium text-gray-500">Powered by StarStack</span>
        {" "}— Interactive Reader Engagement Platform
      </p>
    </footer>
  );
}
