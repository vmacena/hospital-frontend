import type { Metadata } from "next";
import "./globals.scss";
import Header from './components/header/Header';
import headerConfig from './config/header/headerConfig.json';

export const metadata: Metadata = {
  title: "Hospital Universitário de São Carlos",
  description: "by Gabriel Manhani e Vinicius Macena",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Header title={headerConfig.title} navItems={headerConfig.navItems} />
        {children}
      </body>
    </html>
  );
}