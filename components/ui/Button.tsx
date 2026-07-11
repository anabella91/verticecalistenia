import Link from "next/link";
import clsx from "clsx";
import type { AnchorHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary";

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: ButtonVariant;
  className?: string;
  ariaLabel?: string;
} & Omit<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  "href" | "children" | "className" | "aria-label"
>;

export default function Button({
  href,
  children,
  variant = "primary",
  className,
  ariaLabel,
  target,
  rel,
  ...anchorProps
}: ButtonProps) {
  const buttonClassName = clsx("button", `button--${variant}`, className);

  const isExternal =
    href.startsWith("http://") ||
    href.startsWith("https://") ||
    href.startsWith("mailto:") ||
    href.startsWith("tel:");

  const safeRel = target === "_blank" ? clsx("noopener noreferrer", rel) : rel;

  if (isExternal) {
    return (
      <a
        href={href}
        aria-label={ariaLabel}
        className={buttonClassName}
        target={target}
        rel={safeRel}
        {...anchorProps}
      >
        {children}
      </a>
    );
  }

  return (
    <Link
      href={href}
      aria-label={ariaLabel}
      className={buttonClassName}
      target={target}
      rel={safeRel}
      {...anchorProps}
    >
      {children}
    </Link>
  );
}
