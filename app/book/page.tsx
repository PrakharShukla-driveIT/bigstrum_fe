"use client";

import { useState } from "react";
import {
  getDaysInMonth,
  getDay,
  format,
  addDays,
  isWeekend,
  isSameDay,
  startOfToday,
  isBefore,
} from "date-fns";
import {
  CalendarProvider,
  CalendarDate,
  CalendarDatePicker,
  CalendarMonthPicker,
  CalendarDatePagination,
  CalendarHeader,
  useCalendarMonth,
  useCalendarYear,
} from "@/components/kibo-ui/calendar";
import { ArrowLeft, Clock, Calendar, CheckCircle2, ArrowRight, MapPin, Video } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const timeSlots = [
  "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM",
  "11:00 AM", "11:30 AM", "12:00 PM",
  "02:00 PM", "02:30 PM", "03:00 PM", "03:30 PM",
  "04:00 PM", "04:30 PM", "05:00 PM",
];

const bookedSlots: Record<string, string[]> = {
  [format(addDays(new Date(), 1), "yyyy-MM-dd")]: ["10:00 AM", "11:00 AM", "03:00 PM"],
  [format(addDays(new Date(), 3), "yyyy-MM-dd")]: ["09:00 AM", "02:00 PM", "04:00 PM"],
};

type Step = "datetime" | "details" | "confirmed";

// Inner component that uses the kibo-ui atoms
function BookingCalendar({
  selectedDate,
  onSelect,
}: {
  selectedDate: Date | undefined;
  onSelect: (date: Date) => void;
}) {
  const [month] = useCalendarMonth();
  const [year] = useCalendarYear();
  const today = startOfToday();

  const firstDay = getDay(new Date(year, month, 1)); // 0=Sun
  const daysInMonth = getDaysInMonth(new Date(year, month, 1));
  const prevMonthDays = getDaysInMonth(new Date(year, month === 0 ? 11 : month - 1, 1));

  const cells: { day: number; current: boolean }[] = [];

  // Prev month overflow
  for (let i = 0; i < firstDay; i++) {
    cells.push({ day: prevMonthDays - firstDay + 1 + i, current: false });
  }
  // Current month
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push({ day: d, current: true });
  }
  // Next month overflow
  const remaining = 7 - (cells.length % 7);
  if (remaining < 7) {
    for (let d = 1; d <= remaining; d++) {
      cells.push({ day: d, current: false });
    }
  }

  return (
    <>
      <CalendarHeader className="mb-1" />
      <div className="grid grid-cols-7">
        {cells.map((cell, i) => {
          if (!cell.current) {
            return (
              <div key={i} className="aspect-square flex items-center justify-center text-sm text-foreground/15">
                {cell.day}
              </div>
            );
          }

          const date = new Date(year, month, cell.day);
          const isDisabled = isBefore(date, addDays(today, 1)) || isWeekend(date);
          const isSelected = selectedDate ? isSameDay(date, selectedDate) : false;
          const isToday = isSameDay(date, today);

          return (
            <div key={i} className="aspect-square p-0.5">
              <button
                disabled={isDisabled}
                onClick={() => onSelect(date)}
                className={`w-full h-full rounded-xl text-sm font-medium transition-all duration-150 flex items-center justify-center
                  ${isSelected
                    ? "bg-primary text-white shadow-md"
                    : isDisabled
                    ? "text-foreground/20 cursor-not-allowed"
                    : isToday
                    ? "text-primary font-bold border border-primary/30 hover:bg-primary/10"
                    : "text-foreground/70 hover:bg-primary/8 hover:text-primary"
                  }`}
              >
                {cell.day}
              </button>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default function BookPage() {
  const [step, setStep] = useState<Step>("datetime");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [selectedTime, setSelectedTime] = useState<string | undefined>();
  const [meetingType, setMeetingType] = useState<"video" | "call">("video");
  const [form, setForm] = useState({ name: "", email: "", company: "", topic: "" });
  const [submitting, setSubmitting] = useState(false);

  const bookedForDay = selectedDate
    ? bookedSlots[format(selectedDate, "yyyy-MM-dd")] ?? []
    : [];

  function handleDaySelect(day: Date) {
    setSelectedDate(day);
    setSelectedTime(undefined);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setStep("confirmed");
    }, 1400);
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">

      {/* Nav */}
      <header className="sticky top-0 z-50 border-b border-foreground/8 bg-background/95 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 h-16 flex items-center justify-between">
          <Link href="/" className="inline-flex items-center">
            <Image src="/bigstrum.svg" width={100} height={26} alt="Bigstrum"
              style={{ filter: "brightness(0) invert(20%) sepia(96%) saturate(730%) hue-rotate(322deg) brightness(88%)" }}
            />
          </Link>
          <Link href="/" className="inline-flex items-center gap-2 font-mono text-xs text-foreground/50 hover:text-foreground transition-colors duration-200">
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to site
          </Link>
        </div>
      </header>

      <div className="flex-1 max-w-7xl mx-auto px-6 lg:px-10 w-full py-12 lg:py-16">

        {step === "confirmed" ? (

          /* ── Confirmed ── */
          <div className="max-w-lg mx-auto text-center py-20">
            <div className="w-16 h-16 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-7 h-7 text-primary" />
            </div>
            <h1 className="font-display text-3xl md:text-4xl text-foreground mb-3">You're booked!</h1>
            <p className="text-foreground/55 mb-8 leading-relaxed">
              Your consultation is confirmed for{" "}
              <span className="font-semibold text-foreground">
                {selectedDate && format(selectedDate, "EEEE, MMMM d")}
              </span>{" "}
              at <span className="font-semibold text-foreground">{selectedTime}</span>.
              A calendar invite and Zoom link will be sent to{" "}
              <span className="font-semibold text-foreground">{form.email}</span>.
            </p>
            <div className="rounded-2xl border border-foreground/10 bg-foreground/[0.02] p-6 text-left mb-8 space-y-4">
              {[
                { label: "Date", value: selectedDate ? format(selectedDate, "EEEE, MMMM d, yyyy") : "" },
                { label: "Time", value: `${selectedTime} IST` },
                { label: "Duration", value: "30 minutes" },
                { label: "Format", value: meetingType === "video" ? "Google Meet / Zoom" : "Phone call" },
              ].map(({ label, value }) => (
                <div key={label} className="flex justify-between items-center text-sm border-b border-foreground/6 pb-3 last:border-0 last:pb-0">
                  <span className="font-mono text-[10px] tracking-widest text-foreground/40 uppercase">{label}</span>
                  <span className="text-foreground/75 font-medium">{value}</span>
                </div>
              ))}
            </div>
            <Link href="/" className="inline-flex items-center gap-2 bg-primary text-white font-medium text-sm h-11 px-8 rounded-full hover:bg-primary/90 transition-colors duration-200">
              Back to Bigstrum
            </Link>
          </div>

        ) : (

          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">

            {/* ── Left sidebar ── */}
            <div className="lg:col-span-4 flex flex-col gap-8">
              <div>
                <span className="font-mono text-[10px] tracking-[0.2em] text-foreground/45 uppercase block mb-3">Bigstrum</span>
                <h1 className="font-display text-3xl md:text-4xl text-foreground leading-tight mb-3">
                  Free Consultation
                </h1>
                <p className="text-foreground/55 leading-relaxed text-sm">
                  Book a 30-minute discovery call with our engineering team. No sales pitch — just a focused conversation about your project.
                </p>
              </div>

              <div className="space-y-3.5">
                {[
                  { icon: Clock, text: "30 minutes" },
                  { icon: Video, text: "Google Meet or Zoom" },
                  { icon: MapPin, text: "India (IST) · available globally" },
                ].map(({ icon: Icon, text }) => (
                  <div key={text} className="flex items-center gap-3 text-sm text-foreground/60">
                    <Icon className="w-4 h-4 text-foreground/35 shrink-0" />
                    {text}
                  </div>
                ))}
              </div>

              {/* What to expect */}
              <div className="rounded-2xl bg-primary p-6 flex flex-col gap-4">
                <p className="font-mono text-[10px] tracking-widest text-white/50 uppercase">What we'll cover</p>
                <ul className="space-y-2.5">
                  {[
                    "Your project goals and timeline",
                    "Technical requirements and constraints",
                    "Recommended architecture approach",
                    "Rough scope and next steps",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm text-white/75">
                      <span className="w-1.5 h-1.5 rounded-full bg-white/40 mt-1.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Progress steps */}
              <div className="flex items-center gap-3">
                {(["datetime", "details"] as Step[]).map((s, i) => (
                  <div key={s} className="flex items-center gap-3">
                    <div className={`flex items-center gap-2 text-xs font-mono transition-colors duration-200 ${step === s ? "text-primary" : "text-foreground/30"}`}>
                      <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold border transition-all duration-200 ${
                        step === s ? "bg-primary border-primary text-white"
                        : s === "datetime" && step === "details" ? "bg-foreground/10 border-foreground/15 text-foreground/40"
                        : "border-foreground/15 text-foreground/25"
                      }`}>
                        {s === "datetime" && step === "details" ? "✓" : i + 1}
                      </span>
                      {s === "datetime" ? "Date & Time" : "Your Details"}
                    </div>
                    {i === 0 && <div className="w-8 h-px bg-foreground/15" />}
                  </div>
                ))}
              </div>
            </div>

            {/* ── Right panel ── */}
            <div className="lg:col-span-8">

              {step === "datetime" && (
                <div className="flex flex-col gap-8">

                  {/* Meeting type toggle */}
                  <div>
                    <p className="font-mono text-[10px] tracking-widest text-foreground/45 uppercase mb-3">Meeting format</p>
                    <div className="inline-flex rounded-xl border border-foreground/10 bg-foreground/[0.02] p-1 gap-1">
                      {(["video", "call"] as const).map((type) => (
                        <button
                          key={type}
                          onClick={() => setMeetingType(type)}
                          className={`px-5 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${meetingType === type ? "bg-primary text-white shadow-sm" : "text-foreground/55 hover:text-foreground"}`}
                        >
                          {type === "video" ? "Video call" : "Phone call"}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-8">

                    {/* Kibo-UI Calendar */}
                    <div>
                      <p className="font-mono text-[10px] tracking-widest text-foreground/45 uppercase mb-4">Select a date</p>
                      <CalendarProvider className="rounded-2xl border border-foreground/10 bg-foreground/[0.02] overflow-hidden">
                        <CalendarDate>
                          <CalendarDatePicker>
                            <CalendarMonthPicker className="border-foreground/10 text-foreground/70 text-sm h-8" />
                          </CalendarDatePicker>
                          <CalendarDatePagination />
                        </CalendarDate>
                        <div className="px-3 pb-3">
                          <BookingCalendar selectedDate={selectedDate} onSelect={handleDaySelect} />
                        </div>
                      </CalendarProvider>
                    </div>

                    {/* Time slots */}
                    <div>
                      <p className="font-mono text-[10px] tracking-widest text-foreground/45 uppercase mb-4">
                        {selectedDate ? `Times — ${format(selectedDate, "MMM d")}` : "Select a date first"}
                      </p>

                      {selectedDate ? (
                        <div className="grid grid-cols-2 gap-2 max-h-[340px] overflow-y-auto pr-1">
                          {timeSlots.map((slot) => {
                            const isBooked = bookedForDay.includes(slot);
                            const isSelected = selectedTime === slot;
                            return (
                              <button
                                key={slot}
                                disabled={isBooked}
                                onClick={() => setSelectedTime(slot)}
                                className={`h-10 rounded-xl border text-sm font-medium transition-all duration-150 ${
                                  isSelected
                                    ? "bg-primary border-primary text-white shadow-sm"
                                    : isBooked
                                    ? "border-foreground/6 text-foreground/20 bg-foreground/[0.02] cursor-not-allowed line-through"
                                    : "border-foreground/10 text-foreground/65 hover:border-primary/40 hover:text-primary hover:bg-primary/5"
                                }`}
                              >
                                {slot}
                              </button>
                            );
                          })}
                        </div>
                      ) : (
                        <div className="rounded-2xl border border-foreground/8 bg-foreground/[0.02] h-[340px] flex items-center justify-center">
                          <div className="text-center">
                            <Calendar className="w-8 h-8 text-foreground/15 mx-auto mb-3" />
                            <p className="text-sm text-foreground/30 font-mono">Pick a date to see slots</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex justify-end pt-2 border-t border-foreground/8">
                    <button
                      disabled={!selectedDate || !selectedTime}
                      onClick={() => setStep("details")}
                      className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 disabled:opacity-40 disabled:cursor-not-allowed text-white font-medium text-sm h-12 px-8 rounded-full transition-all duration-200"
                    >
                      Continue
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {step === "details" && (
                <form onSubmit={handleSubmit} className="flex flex-col gap-6">

                  {/* Selected slot summary */}
                  <div className="rounded-2xl border border-primary/20 bg-primary/6 p-5 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-primary/15 flex items-center justify-center">
                        <Calendar className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-foreground">
                          {selectedDate && format(selectedDate, "EEEE, MMMM d, yyyy")}
                        </p>
                        <p className="text-xs text-foreground/50 font-mono">{selectedTime} · 30 min · {meetingType === "video" ? "Video call" : "Phone call"}</p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setStep("datetime")}
                      className="text-xs font-mono text-primary hover:text-primary/70 transition-colors duration-150 underline underline-offset-2"
                    >
                      Change
                    </button>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-5">
                    <div className="flex flex-col gap-2">
                      <label className="font-mono text-[10px] tracking-widest text-foreground/50 uppercase">Full name <span className="text-foreground/70">*</span></label>
                      <input type="text" required value={form.name}
                        onChange={(e) => setForm(p => ({ ...p, name: e.target.value }))}
                        placeholder="Jane Smith"
                        className="h-11 px-4 rounded-xl border border-foreground/15 bg-background text-sm text-foreground placeholder:text-foreground/30 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all duration-200"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="font-mono text-[10px] tracking-widest text-foreground/50 uppercase">Work email <span className="text-foreground/70">*</span></label>
                      <input type="email" required value={form.email}
                        onChange={(e) => setForm(p => ({ ...p, email: e.target.value }))}
                        placeholder="jane@company.com"
                        className="h-11 px-4 rounded-xl border border-foreground/15 bg-background text-sm text-foreground placeholder:text-foreground/30 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all duration-200"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="font-mono text-[10px] tracking-widest text-foreground/50 uppercase">Company / Organisation</label>
                    <input type="text" value={form.company}
                      onChange={(e) => setForm(p => ({ ...p, company: e.target.value }))}
                      placeholder="Acme Corp, Ministry of Finance…"
                      className="h-11 px-4 rounded-xl border border-foreground/15 bg-background text-sm text-foreground placeholder:text-foreground/30 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all duration-200"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="font-mono text-[10px] tracking-widest text-foreground/50 uppercase">What would you like to discuss? <span className="text-foreground/70">*</span></label>
                    <textarea required rows={4} value={form.topic}
                      onChange={(e) => setForm(p => ({ ...p, topic: e.target.value }))}
                      placeholder="Briefly describe your project, the problem you're solving, and any relevant technical context…"
                      className="px-4 py-3 rounded-xl border border-foreground/15 bg-background text-sm text-foreground placeholder:text-foreground/30 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all duration-200 resize-none"
                    />
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-foreground/8">
                    <button type="button" onClick={() => setStep("datetime")}
                      className="inline-flex items-center gap-2 text-sm text-foreground/50 hover:text-foreground transition-colors duration-200"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      Back
                    </button>
                    <button type="submit" disabled={submitting}
                      className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 disabled:opacity-60 text-white font-medium text-sm h-12 px-8 rounded-full transition-all duration-200"
                    >
                      {submitting ? (
                        <>
                          <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Confirming…
                        </>
                      ) : (
                        <>Confirm booking <CheckCircle2 className="w-4 h-4" /></>
                      )}
                    </button>
                  </div>
                </form>
              )}

            </div>
          </div>
        )}
      </div>
    </div>
  );
}
