import Link from "next/link";
import clsx from "clsx";

type ButtonVariant = "primary" | "secondary";

type ButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: ButtonVariant;
  className?: string;
  ariaLabel?: string;
};

export default function Button({
  href,
  children,
  variant = "primary",
  className,
  ariaLabel,
}: ButtonProps) {
  return (
    <Link
      href={href}
      aria-label={ariaLabel}
      className={clsx("button", `button--${variant}`, className)}
    >
      {children}
    </Link>
  );
}
