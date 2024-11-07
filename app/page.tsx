'use client'

import Image from "next/image";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

export default function Home() {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !resolvedTheme) return null;

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center relative w-full max-w-md mx-auto">
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-0 right-0 sm:-top-10 sm:-right-10"
          onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
        >
          {resolvedTheme === "dark" ? <Sun className="h-[1.2rem] w-[1.2rem]" /> : <Moon className="h-[1.2rem] w-[1.2rem]" />}
        </Button>
        <h1 className="text-4xl font-bold font-[family-name:var(--font-geist-mono)]">
        ドットと申します。
        </h1>
        <ol className="list-inside list-decimal text-sm font-[family-name:var(--font-geist-mono)]">
          <ol className="mb-2">
            End-to-End DevSecOps Engineer
          </ol>
          <ol>
            Founder of {" "}
          <a
            className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-semibold"
            href="https://github.com/314isme-tavern"
            target="_blank"
            rel="noopener noreferrer"
          >
            <code>タバーン</code></a>
            {" "} and {" "}
          <a
            className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-semibold"
            href="https://github.com/314isme-forest"
            target="_blank"
            rel="noopener noreferrer"
          >
            <code>フォレスト</code></a>
          </ol>
          <ol className="mt-7">
            Working on {" "}
          <a
            className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-semibold"
            href="https://encrypt.314is.me"
            target="_blank"
            rel="noopener noreferrer"
          >
            <code>encrypt</code></a>
          </ol>
        </ol>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="mailto:contact.referable728@passmail.net"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="https://nextjs.org/icons/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Contact
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://github.com/314isme"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="https://nextjs.org/icons/github.svg"
            alt="GitHub icon"
            width={16}
            height={16}
          />
          Projects
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://x.com/314isme"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="https://nextjs.org/icons/x.svg"
            alt="GitHub icon"
            width={16}
            height={16}
          />
          Feeds
        </a>
      </footer>
    </div>
  );
}
