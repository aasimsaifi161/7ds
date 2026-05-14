"use client";

import Link from "next/link";
import UserMenu from "./UserMenu";

export default function Header() {
  return (
    <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
        <Link
          href="/"
          id="home-link"
          className="flex items-center gap-2 text-foreground hover:text-accent transition-colors"
        >
          <span className="text-lg font-semibold tracking-tight">7DS</span>
          <span className="text-xs text-muted hidden sm:inline">
            Break The Chains
          </span>
        </Link>

        <nav className="flex items-center gap-6">
          <Link
            href="/community"
            className="text-sm font-medium text-muted hover:text-foreground transition-colors"
          >
            Community
          </Link>
          <UserMenu />
        </nav>
      </div>
    </header>
  );
}
