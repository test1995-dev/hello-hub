import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { CheckCircle2, MessageSquare, CalendarDays, Clock, ArrowLeft } from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { services, timeSlots, weekDays } from "@/lib/clinic-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/reserve")({
  head: () => ({
    meta: [
      { title: "رزرو نوبت آنلاین | دکتر یاسمن دانشیان" },
      {
        name: "description",
        content: "در چند ثانیه نوبت دندان‌پزشکی خود را رزرو کنید: انتخاب خدمت، روز و ساعت، سپس تایید با پیامک یادآوری.",
      },
      { property: "og:title", content: "رزرو نوبت آنلاین | دکتر یاسمن دانشیان" },
      {
        property: "og:description",
        content: "انتخاب خدمت، روز و ساعت و ثبت نوبت در کمتر از یک دقیقه.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ReservePage,
});

function ReservePage() {
  const [service, setService] = useState(services[0]!.id);
  const [day, setDay] = useState(weekDays[0]!.id);
  const [slot, setSlot] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  const selectedService = services.find((s) => s.id === service)!;
  const selectedDay = weekDays.find((d) => d.id === day)!;

  function toEnDigits(v: string) {
    return v.replace(/[۰-۹]/g, (d) => String("۰۱۲۳۴۵۶۷۸۹".indexOf(d)));
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!slot) return setError("لطفاً یک ساعت را انتخاب کنید.");
    if (name.trim().length < 3) return setError("نام و نام خانوادگی را کامل وارد کنید.");
    if (!/^09\d{9}$/.test(toEnDigits(phone.trim()))) return setError("شماره موبایل باید ۱۱ رقم و با ۰۹ شروع شود.");
    setError("");
    setDone(true);
  }

  return (
    <div className="min-h-screen">
      <Header />
      <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6 sm:py-14">
        {done ? (
          <section className="soft-card rounded-3xl p-6 text-center sm:p-10">
            <span className="mx-auto grid h-16 w-16 place-items-center rounded-3xl bg-mint/25 text-mint-foreground">
              <CheckCircle2 className="h-8 w-8" aria-hidden />
            </span>
            <h1 className="mt-5 text-2xl font-bold">نوبت شما ثبت شد</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              {name} عزیز، نوبت «{selectedService.title}» برای {selectedDay.label} {selectedDay.day} ساعت {slot} رزرو شد.
            </p>
            <div className="mx-auto mt-6 max-w-md rounded-2xl border border-dashed border-primary/40 bg-primary/5 p-4 text-right text-sm">
              <p className="flex items-center gap-2 font-medium text-primary">
                <MessageSquare className="h-4 w-4" aria-hidden /> پیامک تایید (نمایشی)
              </p>
              <p className="mt-2 leading-7 text-muted-foreground">
                «{name} عزیز، نوبت شما برای {selectedService.title} در {selectedDay.label} {selectedDay.day} ساعت {slot} ثبت شد.
                یک روز قبل، پیامک یادآوری برای شما ارسال می‌شود. مطب دکتر دانشیان»
              </p>
              <p className="mt-2 text-xs text-muted-foreground">ارسال به {phone} — حالت دمو، پیامکی واقعاً ارسال نشد.</p>
            </div>
            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <Button asChild variant="outline" className="rounded-full px-6">
                <Link to="/">بازگشت به صفحه اصلی</Link>
              </Button>
              <Button
                className="rounded-full px-6"
                onClick={() => {
                  setDone(false);
                  setSlot("");
                  setName("");
                  setPhone("");
                }}
              >
                رزرو نوبت دیگر
              </Button>
            </div>
          </section>
        ) : (
          <>
            <Link to="/" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
              <ArrowLeft className="h-4 w-4 rotate-180" aria-hidden /> بازگشت
            </Link>
            <h1 className="mt-4 text-3xl font-bold tracking-tight">رزرو نوبت</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              سه مرحله ساده: خدمت، زمان و مشخصات تماس. تایید نهایی از طریق پیامک انجام می‌شود.
            </p>

            <form onSubmit={submit} className="mt-8 grid gap-6">
              <section className="soft-card rounded-3xl p-5 sm:p-6">
                <h2 className="text-base font-semibold">۱. انتخاب خدمت</h2>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {services.map((s) => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => setService(s.id)}
                      aria-pressed={service === s.id}
                      className={cn(
                        "rounded-2xl border p-4 text-right transition-all hover:-translate-y-0.5",
                        service === s.id
                          ? "border-primary bg-primary/8 shadow-sm"
                          : "border-border bg-background hover:border-primary/40",
                      )}
                    >
                      <span className="block text-sm font-semibold">{s.title}</span>
                      <span className="mt-1 block text-xs text-muted-foreground">
                        {s.duration} — {s.price}
                      </span>
                    </button>
                  ))}
                </div>
              </section>

              <section className="soft-card rounded-3xl p-5 sm:p-6">
                <h2 className="flex items-center gap-2 text-base font-semibold">
                  <CalendarDays className="h-4 w-4 text-primary" aria-hidden /> ۲. انتخاب روز و ساعت
                </h2>
                <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
                  {weekDays.map((d) => (
                    <button
                      key={d.id}
                      type="button"
                      onClick={() => setDay(d.id)}
                      aria-pressed={day === d.id}
                      className={cn(
                        "min-w-24 shrink-0 rounded-2xl border px-4 py-3 text-center transition-colors",
                        day === d.id ? "border-primary bg-primary/8" : "border-border hover:border-primary/40",
                      )}
                    >
                      <span className="block text-sm font-medium">{d.label}</span>
                      <span className="mt-1 block text-xs text-muted-foreground">{d.day}</span>
                    </button>
                  ))}
                </div>
                <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
                  {timeSlots.map((t, i) => {
                    const disabled = i === 2 || i === 5;
                    return (
                      <button
                        key={t}
                        type="button"
                        disabled={disabled}
                        onClick={() => setSlot(t)}
                        aria-pressed={slot === t}
                        className={cn(
                          "flex items-center justify-center gap-1 rounded-xl border py-2.5 text-sm transition-colors",
                          disabled && "cursor-not-allowed border-dashed text-muted-foreground/50",
                          !disabled && slot === t && "border-primary bg-primary text-primary-foreground",
                          !disabled && slot !== t && "border-border hover:border-primary/50",
                        )}
                      >
                        <Clock className="h-3.5 w-3.5" aria-hidden />
                        {t}
                      </button>
                    );
                  })}
                </div>
                <p className="mt-3 text-xs text-muted-foreground">ساعت‌های کم‌رنگ قبلاً رزرو شده‌اند.</p>
              </section>

              <section className="soft-card rounded-3xl p-5 sm:p-6">
                <h2 className="text-base font-semibold">۳. مشخصات شما</h2>
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  <div className="grid gap-2">
                    <Label htmlFor="name">نام و نام خانوادگی</Label>
                    <Input
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="مثلاً نگار مرادی"
                      autoComplete="name"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="phone">شماره موبایل</Label>
                    <Input
                      id="phone"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="۰۹۱۲۳۴۵۶۷۸۹"
                      inputMode="numeric"
                      dir="ltr"
                      className="text-left"
                      autoComplete="tel"
                    />
                  </div>
                </div>
                {error && (
                  <p role="alert" className="mt-4 rounded-xl bg-destructive/10 px-3 py-2 text-sm text-destructive">
                    {error}
                  </p>
                )}
                <Button type="submit" size="lg" className="mt-6 w-full rounded-full">
                  ثبت نهایی نوبت
                </Button>
              </section>
            </form>
          </>
        )}
      </main>
      <Footer />
    </div>
  );
}
