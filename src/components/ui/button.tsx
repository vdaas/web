import * as React from "react"
import Link from "next/link";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  href?: string;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ href, children, className, ...props }) => {
  const baseClasses =
    "inline-flex items-center justify-center font-semibold transition duration-200 ease-in-out text-center px-6 py-2 rounded-md";

  if (href) {
    return (
      <Link href={href} className={`${baseClasses} ${className}`}>
        {children}
      </Link>
    );
  }

  // 通常のボタン
  return (
    <button className={`${baseClasses} ${className}`} {...props}>
      {children}
    </button>
  );
};
