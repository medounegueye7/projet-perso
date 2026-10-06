"use client";

import { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { logoutSeller } from "../actions/auth";

const NAV = [
  {
    name: "Accueil",
    href: "/espace",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 12L12 3l9 9" /><path d="M9 21V12h6v9" />
      </svg>
    ),
  },
  {
    name: "Produits",
    href: "/espace/produits",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 8h14l-1 12H6z" /><path d="M9 8V6a3 3 0 0 1 6 0v2" />
      </svg>
    ),
  },
  {
    name: "Commandes",
    href: "/espace/commandes",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
        <rect x="5" y="2" width="14" height="20" rx="2" /><path d="M9 7h6M9 11h6M9 15h4" />
      </svg>
    ),
  },
];

export default function EspaceLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-ink">
      {/*  Sidebar desktop  */}
      <aside className="hidden lg:flex flex-col w-64 min-h-screen fixed left-0 top-0 border-r-[2px] border-ink bg-nuit">
        {/* Logo */}
        <div className="px-5 py-6 border-b-[2px] border-ink/20">
          <Link href="/espace" className="flex items-center gap-2">
            <svg width="28" height="28" viewBox="0 0 120 120" fill="none">
              <path d="M38 4H82A34 34 0 0 1 116 38V82A34 34 0 0 1 82 116H10A6 6 0 0 1 4 110V38A34 34 0 0 1 38 4Z" fill="#FFC83D" />
              <path d="M64 46V76C64 90 57 97 44 97" stroke="#0F1E3D" strokeWidth="12" strokeLinecap="round" fill="none" />
              <circle cx="64" cy="28" r="7.5" fill="#C8265A" />
            </svg>
            <span className="font-bricolage font-black text-white text-lg">Espace vendeur</span>
          </Link>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-4 space-y-1">
          {NAV.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3.5 rounded-2xl transition-all text-sm font-bold ${isActive ? "bg-sun text-ink" : "text-ghost"}`}
              >
                {item.icon}
                {item.name}
              </Link>
            );
          })}
          <Link
            href="/espace/boutique"
            className={`flex items-center gap-3 px-4 py-3.5 rounded-2xl transition-all text-sm font-bold ${pathname === "/espace/boutique" ? "bg-sun text-ink" : "text-ghost"}`}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="3" /><path d="M19.07 4.93A10 10 0 1 0 21 12h-1" />
            </svg>
            Ma boutique
          </Link>
          <Link
            href="/espace/abonnement"
            className={`flex items-center gap-3 px-4 py-3.5 rounded-2xl transition-all text-sm font-bold ${pathname === "/espace/abonnement" ? "bg-sun text-ink" : "text-ghost"}`}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
            </svg>
            Abonnement
          </Link>
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-ink/20">
          <form action={logoutSeller}>
            <button type="submit" className="flex items-center gap-3 px-4 py-3 w-full rounded-2xl text-sm font-medium transition-colors text-muted">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" />
              </svg>
              Déconnexion
            </button>
          </form>
        </div>
      </aside>

      {/*  Topbar mobile  */}
      <header className="lg:hidden px-4 py-4 flex items-center justify-between border-b-[2px] border-white/10 bg-nuit">
        <Link href="/espace" className="flex items-center gap-2">
          <svg width="24" height="24" viewBox="0 0 120 120" fill="none">
            <path d="M38 4H82A34 34 0 0 1 116 38V82A34 34 0 0 1 82 116H10A6 6 0 0 1 4 110V38A34 34 0 0 1 38 4Z" fill="#FFC83D" />
            <path d="M64 46V76C64 90 57 97 44 97" stroke="#0F1E3D" strokeWidth="12" strokeLinecap="round" fill="none" />
            <circle cx="64" cy="28" r="7.5" fill="#C8265A" />
          </svg>
          <span className="font-bricolage font-black text-white text-base">Espace</span>
        </Link>
        <form action={logoutSeller}>
          <button type="submit" className="text-xs font-semibold px-3 py-1.5 rounded-full border-[2px] border-white/20 text-ghost">
            Quitter
          </button>
        </form>
      </header>

      {/*  Main  */}
      <main className="lg:pl-64 min-h-screen pb-24 lg:pb-8">
        {children}
      </main>

      {/*  Bottom nav mobile (design 10 style)  */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 px-4 pb-4 pt-2 pointer-events-none z-40">
        <div
          className="pointer-events-auto flex items-center justify-around py-3 px-4 rounded-full border-[2.5px] border-ink bg-sun"
          style={{ boxShadow: "0 8px 32px rgba(15,30,61,0.35)" }}
        >
          {NAV.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link key={item.name} href={item.href}>
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${isActive ? "bg-ink text-sun" : "text-ink"}`}
                >
                  {item.icon}
                </div>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
