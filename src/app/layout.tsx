import type { Metadata } from "next";
<<<<<<< HEAD
import { Inter } from "next/font/google";
import "./globals.scss";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Hospital Universitário",
  description: "Entre morto e saia vivo",
=======
import "./globals.scss";
import Header from './components/header/Header';
import headerConfig from './config/header/headerConfig.json';

export const metadata: Metadata = {
  title: "Hospital Universitário de São Carlos",
  description: "by Gabriel Manhani e Vinicius Macena",
>>>>>>> ebc50c8fba35be2629d4b0740b35c13e5ea401d8
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
<<<<<<< HEAD
      <body className={inter.className}>
        {children}
        <ToastContainer 
            position="top-right" 
            autoClose={5000} 
            hideProgressBar={false} 
            newestOnTop={false} 
            closeOnClick rtl={false} 
            pauseOnFocusLoss 
            draggable 
            pauseOnHover 
        />
=======
      <body>
        <Header title={headerConfig.title} navItems={headerConfig.navItems} />
        {children}
>>>>>>> ebc50c8fba35be2629d4b0740b35c13e5ea401d8
      </body>
    </html>
  );
}