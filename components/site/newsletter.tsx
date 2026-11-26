"use client";

import * as React from "react";
import { ArrowRight, Check } from "lucide-react";

export function Newsletter() {
  const [email, setEmail] = React.useState("");
  const [done, setDone] = React.useState(false);

  if (done) {
    return (
      <p role="status" className="flex items-center gap-3 rounded-full bg-background px-5 py-4 text-sm">
        <Check className="size-4 shrink-0" aria-hidden="true" />
        You&apos;re on the list. See you next season.
      </p>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setDone(true);
      }}
      className="flex flex-col gap-3 sm:flex-row"
    >
      <label htmlFor="newsletter-email" className="sr-only">Email address</label>
      <input
        id="newsletter-email"
        type="email"
        required
        autoComplete="email"
        placeholder="you@example.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="h-12 flex-1 rounded-full border border-input bg-background px-5 text-sm outline-none transition-shadow placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring"
      />
      <button
        type="submit"
        className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-foreground px-6 text-sm font-medium text-background outline-none transition-transform hover:-translate-y-px focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background motion-reduce:transition-none"
      >
        Subscribe <ArrowRight className="size-4" aria-hidden="true" />
      </button>
    </form>
  );
}
