"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

type contentProps = {
  children: React.ReactNode;
} & React.ComponentPropsWithoutRef<"div">;

const Content = ({ children, className, ...rest }: contentProps) => {
  return (
    <div className={cn(`rounded-lg`, className)} {...rest}>
      {children}
    </div>
  );
};

export default Content;
