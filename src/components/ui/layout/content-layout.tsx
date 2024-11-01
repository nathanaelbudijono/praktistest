"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

type contentLayoutProps = {
  children: React.ReactNode;
} & React.ComponentPropsWithoutRef<"div">;

const ContentLayout = ({
  children,
  className,
  ...rest
}: contentLayoutProps) => {
  return (
    <div
      className={cn(
        `flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 rounded-xl`,
        className
      )}
      {...rest}
    >
      {children}
    </div>
  );
};

export default ContentLayout;
