import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cookie Policy",
};

export default function CookieLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
