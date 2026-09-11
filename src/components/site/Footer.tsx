import { Link } from "@tanstack/react-router";
import { Phone, MapPin, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { socials } from "@/lib/clinic-data";

export function Footer() {
  return (
    <footer id="contact" className="mt-20 border-t border-border/60 bg-card/60">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <h2 className="text-lg font-bold">مطب دکتر یاسمن دانشیان</h2>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">
              دندان‌پزشکی آرام، شفاف و بدون عجله. هر طرح درمان پیش از شروع، با هزینه و زمان‌بندی مشخص ارائه می‌شود.
            </p>
            <Button asChild className="mt-5 rounded-full px-6">
              <Link to="/reserve">رزرو نوبت</Link>
            </Button>
          </div>

          <div className="space-y-3 text-sm text-muted-foreground">
            <p className="flex items-start gap-2">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />
              تهران، خیابان ولیعصر، بالاتر از پارک‌وی، برج نگین، طبقه ۶، واحد ۶۰۳
            </p>
            <p className="flex items-center gap-2">
              <Phone className="h-4 w-4 shrink-0 text-primary" aria-hidden />
              <a href="tel:+982191002030" className="hover:text-foreground">۰۲۱-۹۱۰۰۲۰۳۰</a>
            </p>
            <p className="flex items-center gap-2">
              <Clock className="h-4 w-4 shrink-0 text-primary" aria-hidden />
              شنبه تا چهارشنبه ۹ تا ۲۰ — پنجشنبه ۹ تا ۱۴
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold">راه‌های ارتباطی</h3>
            <ul className="mt-3 space-y-2 text-sm">
              {socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-between rounded-xl border border-border/70 px-3 py-2 text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
                  >
                    <span>{s.label}</span>
                    <span className="text-xs">{s.handle}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="mt-10 border-t border-border/60 pt-6 text-center text-xs text-muted-foreground">
          © ۱۴۰۴ مطب دکتر یاسمن دانشیان — تمامی حقوق محفوظ است.
        </p>
      </div>
    </footer>
  );
}
