"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

const TypographyVariant = [
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "label",
  "p",
  "xs",
  "blockquote",
  "code",
  "lead",
] as const;

const TypographyColor = [
  "white",
  "default",
  "muted",
  "danger",
  "ready",
  "highlight",
] as const;

type TypographyProps<T extends React.ElementType> = {
  as?: T;
  className?: string;
  color?: (typeof TypographyColor)[number];
  variant?: (typeof TypographyVariant)[number];
  children: React.ReactNode;
} & React.ComponentPropsWithoutRef<T>;

type TypographyComponent = <T extends React.ElementType = "p">(
  props: TypographyProps<T>
) => React.ReactElement | null;

// @ts-ignore
const Typography: TypographyComponent = React.forwardRef(
  // @ts-ignore
  <T extends React.ElementType = "p">(
    {
      as,
      children,
      className,
      color = "default",
      variant = "p",
      ...rest
    }: TypographyProps<T>,
    ref?: React.ComponentPropsWithRef<T>["ref"]
  ) => {
    const Component = as || "p";
    return (
      <Component
        ref={ref}
        className={cn(
          [
            variant === "h1" && [
              "scroll-m-20 text-4xl font-semibold tracking-wide lg:text-5xl max-md:text-3xl max-sm:text-2xl",
            ],
            variant === "h2" && [
              "scroll-m-20 text-3xl font-semibold tracking-tight first:mt-0 max-md:text-2xl max-sm:text-xl",
            ],
            variant === "h3" && [
              "scroll-m-20 text-2xl font-semibold tracking-tight max-md:text-xl max-sm:text-lg",
            ],
            variant === "h4" && [
              "scroll-m-20 text-xl tracking-tight max-md:text-lg max-sm:text-md",
            ],
            variant === "h5" && [
              "scroll-m-20 text-lg tracking-tight max-md:text-md max-sm:text-sm",
            ],
            variant === "label" && ["font-semibold leading-none tracking-tigh"],
            variant === "p" && ["leading-1 text-sm max-md:text-xs"],
            variant === "xs" && ["leading-1 text-xs"],
            variant === "blockquote" && ["mt-6 border-l-2 pl-6 italic"],
            variant === "code" && [
              "relative w-fit rounded bg-brand-200 px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold",
            ],
          ],
          [
            color === "white" && ["text-gray-200"],
            color === "default" && ["text-black dark:text-gray-100"],
            color === "muted" && ["text-gray-500 dark:text-gray-300"],
            color === "danger" && ["text-red-600"],
            color === "ready" && ["text-green-600"],
            color === "highlight" && ["text-orange-500"],
          ],

          "transition-colors duration-200",
          className
        )}
        {...rest}
      >
        {children}
      </Component>
    );
  }
);

export default Typography;
