import type { Metadata } from "next";
import type React from "react";

export const metadata: Metadata = {
  title: "Mood Journal - Login",
  description: "Login and track your daily moods and see trends over time",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div>{children}</div>;
}
