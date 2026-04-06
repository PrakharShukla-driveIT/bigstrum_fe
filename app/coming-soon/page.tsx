import Link from "next/link";

export default function ComingSoonPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background px-6 text-center">
      <p className="font-mono text-sm tracking-[0.25em] uppercase text-foreground/40 mb-4">Coming Soon</p>
      <h1 className="font-display text-4xl md:text-6xl font-bold text-foreground tracking-tight mb-4">
        We're working on it.
      </h1>
      <p className="text-foreground/55 text-base md:text-lg max-w-md leading-relaxed mb-10">
        This page is under construction. Check back soon.
      </p>
      <Link
        href="/"
        className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-white font-medium text-sm hover:opacity-90 transition-opacity"
      >
        ← Back to Home
      </Link>
    </div>
  );
}
