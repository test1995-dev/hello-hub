import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  CalendarCheck,
  Users,
  BellRing,
  Cake,
  HeartPulse,
  RefreshCcw,
  Send,
  ArrowLeft,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  birthdays,
  followUps,
  patients,
  recalls,
  reminders,
  todayAppointments,
} from "@/lib/clinic-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "پنل مدیریت مطب | دکتر یاسمن دانشیان" },
      {
        name: "description",
        content: "نمای امروز مطب: نوبت‌ها، بیماران، یادآوری پیامکی، پیگیری پس از درمان و پیام تولد.",
      },
      { property: "og:title", content: "پنل مدیریت مطب | دکتر یاسمن دانشیان" },
      { property: "og:description", content: "مدیریت نوبت‌ها، بیماران و پیام‌های یادآوری در یک صفحه." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AdminPage,
});

const stats = [
  { label: "نوبت امروز", value: "۶", icon: CalendarCheck, tone: "bg-primary/10 text-primary" },
  { label: "بیماران فعال", value: "۲۴۸", icon: Users, tone: "bg-mint/25 text-mint-foreground" },
  { label: "یادآوری امروز", value: "۳", icon: BellRing, tone: "bg-sand text-foreground" },
  { label: "پیگیری باز", value: "۲", icon: HeartPulse, tone: "bg-secondary text-secondary-foreground" },
];

function SmsCard({
  name,
  phone,
  meta,
  text,
  cta,
}: {
  name: string;
  phone: string;
  meta: string;
  text: string;
  cta: string;
}) {
  const [sent, setSent] = useState(false);
  return (
    <div className="soft-card grid gap-3 rounded-2xl p-4 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center">
      <div className="min-w-0">
        <p className="truncate text-sm font-semibold">{name}</p>
        <p className="mt-0.5 text-xs text-muted-foreground">
          {phone} — {meta}
        </p>
        <p className="mt-2 rounded-xl bg-muted px-3 py-2 text-xs leading-6 text-muted-foreground">{text}</p>
      </div>
      <Button
        size="sm"
        variant={sent ? "secondary" : "default"}
        className="rounded-full"
        disabled={sent}
        onClick={() => {
          setSent(true);
          toast.success("پیامک نمایشی ارسال شد", { description: `${name} — ${phone}` });
        }}
      >
        <Send className="ml-1 h-4 w-4" aria-hidden />
        {sent ? "ارسال شد" : cta}
      </Button>
    </div>
  );
}

function AdminPage() {
  return (
    <div className="min-h-screen aura">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
        <header className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4">
          <div className="min-w-0">
            <Link to="/" className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground">
              <ArrowLeft className="h-3.5 w-3.5 rotate-180" aria-hidden /> بازگشت به سایت
            </Link>
            <h1 className="mt-2 truncate text-2xl font-bold sm:text-3xl">پنل مدیریت مطب</h1>
            <p className="mt-1 text-sm text-muted-foreground">جمعه ۲۱ شهریور ۱۴۰۴ — نمای کلی امروز</p>
          </div>
          <Button asChild className="rounded-full px-5">
            <Link to="/reserve">ثبت نوبت جدید</Link>
          </Button>
        </header>

        <section className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="soft-card rounded-3xl p-5">
              <span className={cn("grid h-10 w-10 place-items-center rounded-2xl", s.tone)}>
                <s.icon className="h-5 w-5" aria-hidden />
              </span>
              <p className="mt-4 text-2xl font-bold">{s.value}</p>
              <p className="text-sm text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </section>

        <Tabs defaultValue="today" className="mt-8">
          <TabsList className="flex h-auto w-full flex-wrap justify-start gap-1 rounded-2xl bg-card/70 p-1">
            <TabsTrigger value="today" className="rounded-xl">نوبت‌های امروز</TabsTrigger>
            <TabsTrigger value="patients" className="rounded-xl">بیماران</TabsTrigger>
            <TabsTrigger value="reminders" className="rounded-xl">یادآوری پیامکی</TabsTrigger>
            <TabsTrigger value="followup" className="rounded-xl">پیگیری درمان</TabsTrigger>
            <TabsTrigger value="birthday" className="rounded-xl">تولدها</TabsTrigger>
            <TabsTrigger value="recall" className="rounded-xl">معاینه دوره‌ای</TabsTrigger>
          </TabsList>

          <TabsContent value="today" className="mt-5">
            <div className="soft-card overflow-x-auto rounded-3xl">
              <table className="w-full min-w-[560px] text-right text-sm">
                <thead className="border-b border-border/70 text-xs text-muted-foreground">
                  <tr>
                    <th className="px-4 py-3 font-medium">ساعت</th>
                    <th className="px-4 py-3 font-medium">بیمار</th>
                    <th className="px-4 py-3 font-medium">خدمت</th>
                    <th className="px-4 py-3 font-medium">موبایل</th>
                    <th className="px-4 py-3 font-medium">وضعیت</th>
                  </tr>
                </thead>
                <tbody>
                  {todayAppointments.map((a) => (
                    <tr key={a.id} className="border-b border-border/50 last:border-0 hover:bg-muted/50">
                      <td className="px-4 py-3 font-medium">{a.time}</td>
                      <td className="px-4 py-3">{a.patient}</td>
                      <td className="px-4 py-3 text-muted-foreground">{a.service}</td>
                      <td className="px-4 py-3 text-muted-foreground">{a.phone}</td>
                      <td className="px-4 py-3">
                        <Badge
                          variant="secondary"
                          className={cn(
                            "rounded-full font-normal",
                            a.status === "تاییدشده" && "bg-primary/12 text-primary",
                            a.status === "انجام‌شده" && "bg-mint/25 text-mint-foreground",
                          )}
                        >
                          {a.status}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TabsContent>

          <TabsContent value="patients" className="mt-5">
            <div className="grid gap-3 sm:grid-cols-2">
              {patients.map((p) => (
                <div key={p.phone} className="soft-card grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 rounded-2xl p-4">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold">{p.name}</p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {p.phone} — آخرین مراجعه {p.last} — {p.visits} جلسه
                    </p>
                  </div>
                  <Badge variant="secondary" className="rounded-full font-normal">{p.tag}</Badge>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="reminders" className="mt-5">
            <div className="grid gap-3">
              {reminders.map((r) => (
                <SmsCard
                  key={r.phone}
                  name={r.name}
                  phone={r.phone}
                  meta={r.when}
                  text={`${r.name} عزیز، ${r.text} شما ${r.when} است. لغو یا جابه‌جایی تا ۶ ساعت قبل امکان‌پذیر است.`}
                  cta="ارسال یادآوری"
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="followup" className="mt-5">
            <div className="grid gap-3">
              {followUps.map((f) => (
                <SmsCard
                  key={f.phone}
                  name={f.name}
                  phone={f.phone}
                  meta={f.day}
                  text={`${f.name} عزیز، حال دندان‌هایتان چطور است؟ در صورت درد یا حساسیت، همین پیام را پاسخ دهید تا هماهنگی معاینه انجام شود. (${f.text})`}
                  cta="ارسال پیگیری"
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="birthday" className="mt-5">
            <div className="grid gap-3">
              {birthdays.map((b) => (
                <SmsCard
                  key={b.phone}
                  name={b.name}
                  phone={b.phone}
                  meta={`تولد ${b.date}`}
                  text={`${b.name} عزیز، تولدتان مبارک! به همین مناسبت ${b.gift} تا پایان ماه برای شما فعال است. مطب دکتر دانشیان`}
                  cta="ارسال تبریک"
                />
              ))}
              <p className="flex items-center gap-2 text-xs text-muted-foreground">
                <Cake className="h-4 w-4" aria-hidden /> پیام‌های تولد به‌صورت خودکار صبح روز تولد ارسال می‌شوند.
              </p>
            </div>
          </TabsContent>

          <TabsContent value="recall" className="mt-5">
            <div className="grid gap-3">
              {recalls.map((r) => (
                <SmsCard
                  key={r.phone}
                  name={r.name}
                  phone={r.phone}
                  meta={r.due}
                  text={`${r.name} عزیز، زمان معاینه دوره‌ای شما رسیده است. برای رزرو نوبت کافی است با مطب تماس بگیرید. (${r.text})`}
                  cta="ارسال دعوت"
                />
              ))}
              <p className="flex items-center gap-2 text-xs text-muted-foreground">
                <RefreshCcw className="h-4 w-4" aria-hidden /> بازه یادآوری دوره‌ای: هر ۶ ماه.
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
