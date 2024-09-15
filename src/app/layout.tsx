import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.scss";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Hospital Universitário",
  description: "Entre morto e saia vivo",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
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
      </body>
    </html>
  );
}