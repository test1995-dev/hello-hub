import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  ShieldCheck,
  Sparkles,
  Star,
  Clock,
  MessageSquare,
  Stethoscope,
  HeartHandshake,
  Microscope,
} from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faqs, services, testimonials } from "@/lib/clinic-data";
import clinicImg from "@/assets/clinic.jpg";
import doctorImg from "@/assets/doctor.jpg";
import beforeImg from "@/assets/before.jpg";
import afterImg from "@/assets/after.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "دکتر یاسمن دانشیان | دندان‌پزشکی زیبایی و ترمیمی تهران" },
      {
        name: "description",
        content:
          "مطب دکتر یاسمن دانشیان: ایمپلنت دیجیتال، لمینت، ارتودنسی نامرئی و درمان بدون درد، با رزرو نوبت آنلاین و پیگیری پس از درمان.",
      },
      { property: "og:title", content: "دکتر یاسمن دانشیان | دندان‌پزشکی زیبایی و ترمیمی" },
      {
        property: "og:description",
        content: "طرح درمان شفاف، محیط آرام و رزرو نوبت آنلاین در کمتر از یک دقیقه.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const benefits = [
  { icon: Microscope, title: "تجهیزات دیجیتال", text: "اسکن داخل‌دهانی و رادیوگرافی دیجیتال با کمترین اشعه." },
  { icon: ShieldCheck, title: "استریلیزاسیون کلاس B", text: "پروتکل کنترل عفونت مطابق استانداردهای بین‌المللی." },
  { icon: Clock, title: "احترام به وقت شما", text: "میانگین انتظار زیر ۱۰ دقیقه با نوبت‌دهی دقیق." },
  { icon: HeartHandshake, title: "همراهی پس از درمان", text: "پیگیری پیامکی و معاینه دوره‌ای رایگان." },
];

function Section({
  id,
  eyebrow,
  title,
  desc,
  children,
}: {
  id?: string;
  eyebrow: string;
  title: string;
  desc?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="mx-auto max-w-6xl scroll-mt-24 px-4 py-16 sm:px-6">
      <p className="text-xs font-semibold tracking-widest text-primary">{eyebrow}</p>
      <h2 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">{title}</h2>
      {desc && <p className="mt-3 max-w-2xl text-sm leading-7 text-muted-foreground">{desc}</p>}
      <div className="mt-8">{children}</div>
    </section>
  );
}

function Index() {
  const [reveal, setReveal] = useState(55);

  return (
    <div id="top" className="min-h-screen">
      <Header />

      <main>
        {/* Hero */}
        <section className="aura">
          <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:py-20">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/8 px-3 py-1 text-xs text-primary">
                <Sparkles className="h-3.5 w-3.5" aria-hidden />
                پذیرش بیماران جدید — مشاوره اولیه رایگان
              </span>
              <h1 className="mt-5 text-3xl font-bold leading-[1.35] tracking-tight sm:text-5xl sm:leading-[1.3]">
                لبخندی که آرام
                <span className="text-primary"> ساخته می‌شود</span>، نه با عجله
              </h1>
              <p className="mt-5 max-w-xl text-sm leading-8 text-muted-foreground sm:text-base">
                دکتر یاسمن دانشیان، متخصص دندان‌پزشکی زیبایی و ترمیمی. هر درمان با معاینه دقیق، طرح درمان شفاف و
                زمان‌بندی مشخص شروع می‌شود؛ بدون هزینه پنهان و بدون استرس.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Button asChild size="lg" className="rounded-full px-7">
                  <Link to="/reserve">رزرو نوبت</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="rounded-full px-7">
                  <Link to="/" hash="services">مشاهده خدمات</Link>
                </Button>
              </div>
              <dl className="mt-10 grid grid-cols-3 gap-3 text-center">
                {[
                  { k: "۱۲ سال", v: "سابقه بالینی" },
                  { k: "+۴۲۰۰", v: "درمان موفق" },
                  { k: "۴.۹", v: "رضایت بیماران" },
                ].map((s) => (
                  <div key={s.v} className="glass-card rounded-2xl px-3 py-4">
                    <dt className="text-lg font-bold sm:text-xl">{s.k}</dt>
                    <dd className="mt-1 text-xs text-muted-foreground">{s.v}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="relative">
              <img
                src={clinicImg}
                alt="نمای داخلی مطب دکتر یاسمن دانشیان با نور طبیعی"
                width={1200}
                height={1408}
                className="h-[320px] w-full rounded-[2rem] object-cover shadow-[0_40px_80px_-50px_rgba(0,0,0,0.45)] sm:h-[440px] lg:h-[520px]"
              />
              <div className="glass-card absolute bottom-4 right-4 left-4 rounded-2xl p-4 sm:left-auto sm:w-64">
                <p className="flex items-center gap-2 text-xs font-semibold text-primary">
                  <MessageSquare className="h-4 w-4" aria-hidden /> یادآوری هوشمند
                </p>
                <p className="mt-2 text-xs leading-6 text-muted-foreground">
                  یک روز قبل از نوبت، پیامک یادآوری دریافت می‌کنید؛ بعد از درمان هم پیگیری می‌شوید.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Doctor */}
        <Section eyebrow="معرفی" title="دکتر یاسمن دانشیان" >
          <div className="grid gap-6 md:grid-cols-[260px_minmax(0,1fr)] md:items-start">
            <img
              src={doctorImg}
              alt="پرتره دکتر یاسمن دانشیان"
              loading="lazy"
              width={1008}
              height={1200}
              className="h-72 w-full rounded-3xl object-cover md:h-80"
            />
            <div className="soft-card rounded-3xl p-6">
              <p className="text-sm leading-8 text-muted-foreground">
                دانش‌آموخته دندان‌پزشکی دانشگاه علوم پزشکی تهران و دارای فلوشیپ ایمپلنتولوژی. تمرکز اصلی من روی
                درمان‌های کم‌تهاجم و طراحی لبخندی است که با چهره هر فرد هماهنگ باشد. باور دارم بیمار باید قبل از
                نشستن روی یونیت، دقیقاً بداند چه اتفاقی قرار است بیفتد.
              </p>
              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {[
                  "فلوشیپ ایمپلنت دیجیتال",
                  "عضو انجمن دندان‌پزشکی ترمیمی ایران",
                  "مدرس دوره‌های طراحی لبخند",
                  "۱۲ سال تجربه بالینی",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-foreground">
                    <Stethoscope className="h-4 w-4 shrink-0 text-primary" aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Section>

        {/* Services — bento */}
        <Section
          id="services"
          eyebrow="خدمات"
          title="درمان‌هایی که ارائه می‌دهیم"
          desc="هر خدمت با زمان تقریبی جلسه و بازه هزینه ارائه شده تا پیش از مراجعه، تصویر روشنی داشته باشید."
        >
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s, i) => (
              <article
                key={s.id}
                className={`soft-card rounded-3xl p-6 transition-transform duration-200 hover:-translate-y-1 ${
                  i === 0 ? "sm:col-span-2" : ""
                }`}
              >
                <h3 className="text-base font-bold">{s.title}</h3>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">{s.desc}</p>
                <div className="mt-5 flex flex-wrap items-center gap-2 text-xs">
                  <span className="rounded-full bg-secondary px-3 py-1 text-secondary-foreground">{s.duration}</span>
                  <span className="rounded-full bg-mint/25 px-3 py-1 text-mint-foreground">{s.price}</span>
                </div>
                <Link
                  to="/reserve"
                  className="mt-5 inline-block text-sm font-medium text-primary hover:underline"
                >
                  رزرو این خدمت
                </Link>
              </article>
            ))}
          </div>
        </Section>

        {/* Before / After */}
        <Section
          id="gallery"
          eyebrow="نمونه‌کار"
          title="قبل و بعد از درمان"
          desc="برای مقایسه، دستگیره را جابه‌جا کنید. تصاویر با رضایت بیماران و در شرایط نوری یکسان ثبت شده‌اند."
        >
          <div className="soft-card overflow-hidden rounded-3xl p-4 sm:p-6">
            <div className="relative overflow-hidden rounded-2xl">
              <img
                src={afterImg}
                alt="لبخند پس از درمان لمینت"
                loading="lazy"
                width={900}
                height={700}
                className="h-64 w-full object-cover sm:h-96"
              />
              <div
                className="absolute inset-y-0 right-0 overflow-hidden"
                style={{ width: `${reveal}%` }}
                aria-hidden
              >
                <img
                  src={beforeImg}
                  alt=""
                  loading="lazy"
                  width={900}
                  height={700}
                  className="h-64 w-[100vw] max-w-none object-cover sm:h-96"
                  style={{ width: `${(100 / reveal) * 100}%` }}
                />
              </div>
              <span className="absolute right-3 top-3 rounded-full bg-background/85 px-3 py-1 text-xs">قبل</span>
              <span className="absolute left-3 top-3 rounded-full bg-background/85 px-3 py-1 text-xs">بعد</span>
            </div>
            <label className="mt-4 block text-xs text-muted-foreground" htmlFor="reveal">
              مقایسه قبل و بعد
            </label>
            <input
              id="reveal"
              type="range"
              min={5}
              max={95}
              value={reveal}
              onChange={(e) => setReveal(Number(e.target.value))}
              className="mt-2 w-full accent-[var(--primary)]"
            />
          </div>
        </Section>

        {/* Benefits */}
        <Section eyebrow="مزایا" title="چرا مطب دکتر دانشیان">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map((b) => (
              <div key={b.title} className="soft-card rounded-3xl p-6">
                <span className="grid h-11 w-11 place-items-center rounded-2xl bg-primary/10 text-primary">
                  <b.icon className="h-5 w-5" aria-hidden />
                </span>
                <h3 className="mt-4 text-sm font-bold">{b.title}</h3>
                <p className="mt-2 text-sm leading-7 text-muted-foreground">{b.text}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* Testimonials */}
        <Section eyebrow="نظرات" title="تجربه بیماران">
          <div className="grid gap-4 sm:grid-cols-2">
            {testimonials.map((t) => (
              <figure key={t.name} className="soft-card rounded-3xl p-6">
                <div className="flex gap-1 text-primary" aria-label="امتیاز ۵ از ۵">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" aria-hidden />
                  ))}
                </div>
                <blockquote className="mt-4 text-sm leading-8 text-muted-foreground">«{t.text}»</blockquote>
                <figcaption className="mt-4 text-sm font-semibold">
                  {t.name}
                  <span className="mr-2 text-xs font-normal text-muted-foreground">{t.treat}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </Section>

        {/* FAQ */}
        <Section id="faq" eyebrow="سوالات متداول" title="پیش از مراجعه بدانید">
          <div className="soft-card rounded-3xl p-2 sm:p-4">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((f, i) => (
                <AccordionItem key={f.q} value={`item-${i}`} className="px-3">
                  <AccordionTrigger className="text-right text-sm font-semibold">{f.q}</AccordionTrigger>
                  <AccordionContent className="text-sm leading-8 text-muted-foreground">{f.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </Section>

        {/* CTA */}
        <section className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="aura soft-card flex flex-col items-center gap-5 rounded-[2rem] px-6 py-12 text-center">
            <h2 className="text-2xl font-bold sm:text-3xl">آماده‌اید لبخندتان را شروع کنیم؟</h2>
            <p className="max-w-xl text-sm leading-7 text-muted-foreground">
              نوبت خود را آنلاین رزرو کنید؛ پیامک تایید و یادآوری به‌صورت خودکار برایتان ارسال می‌شود.
            </p>
            <Button asChild size="lg" className="rounded-full px-8">
              <Link to="/reserve">رزرو نوبت</Link>
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
