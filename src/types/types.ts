import { LucideProps } from "lucide-react";

export interface navItemProps {
  href: string;
  icon: JSX.Element;
  label: string;
}

export interface RevenueCardProps {
  title: string;
  description?: string;
  currency?: boolean;
  color: string;
  info: number;
  icon: React.ComponentType<LucideProps>;
}
