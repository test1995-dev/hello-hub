import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X, CalendarCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

const nav = [
  { to: "/", label: "خانه", hash: undefined },
  { to: "/", label: "خدمات", hash: "services" },
  { to: "/", label: "نمونه‌کار", hash: "gallery" },
  { to: "/", label: "سوالات", hash: "faq" },
  { to: "/", label: "تماس", hash: "contact" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto grid max-w-6xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-4 py-3 sm:px-6">
        <Link to="/" className="flex min-w-0 items-center gap-3">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-primary/12 text-primary">
            <CalendarCheck className="h-5 w-5" aria-hidden />
          </span>
          <span className="min-w-0">
            <span className="block truncate text-sm font-bold sm:text-base">دکتر یاسمن دانشیان</span>
            <span className="block truncate text-xs text-muted-foreground">دندان‌پزشکی زیبایی و ترمیمی</span>
          </span>
        </Link>

        <div className="flex items-center gap-2">
          <nav className="hidden items-center gap-1 lg:flex">
            {nav.map((item) => (
              <Link
                key={item.label}
                to={item.to}
                hash={item.hash}
                className="rounded-full px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              >
                {item.label}
              </Link>
            ))}
            <Link
              to="/admin"
              className="rounded-full px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            >
              پنل مدیریت
            </Link>
          </nav>

          <Button asChild size="sm" className="rounded-full px-5">
            <Link to="/reserve">رزرو نوبت</Link>
          </Button>

          <button
            type="button"
            aria-label={open ? "بستن منو" : "باز کردن منو"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl border border-border text-foreground lg:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-border/60 bg-background px-4 pb-4 pt-2 lg:hidden">
          <ul className="grid gap-1">
            {nav.map((item) => (
              <li key={item.label}>
                <Link
                  to={item.to}
                  hash={item.hash}
                  onClick={() => setOpen(false)}
                  className="block rounded-xl px-3 py-2 text-sm text-muted-foreground hover:bg-secondary hover:text-foreground"
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                to="/admin"
                onClick={() => setOpen(false)}
                className="block rounded-xl px-3 py-2 text-sm text-muted-foreground hover:bg-secondary hover:text-foreground"
              >
                پنل مدیریت
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
