"use client";

import type { ReactNode, MouseEvent } from "react";
import Link from "next/link";
import { usePageTransition } from "./TransitionContext";

type Props = {
  href: string;
  children: ReactNode;
  label?: string;
  subtitle?: string;
  className?: string;
  onClick?: () => void;
};

export function TransitionLink({ href, children, label, subtitle, className, onClick }: Props) {
  const { navigate } = usePageTransition();

  function handleClick(e: MouseEvent<HTMLAnchorElement>) {
    if (href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("http")) return;
    e.preventDefault();
    onClick?.();
    navigate(href, label || "", subtitle || "");
  }

  return (
    <Link href={href} onClick={handleClick} className={className}>
      {children}
    </Link>
  );
}
