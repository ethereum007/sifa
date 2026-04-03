"use client";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-4">404 — Page Not Found</h1>
      <p className="text-muted-foreground mb-8">This page doesn't exist on SIFPrime.</p>
      <Link href="/" className="text-primary underline">Go back home</Link>
    </div>
  );
}
