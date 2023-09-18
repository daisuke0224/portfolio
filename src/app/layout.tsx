"use client";
import "./globals.css";
import { useEffect } from "react";
import { getAuth } from "firebase/auth";
import { useRouter } from 'next/navigation'
import { Inter } from "next/font/google";
import { FirebaseAuthProvider } from "@/firebase/auth";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const auth = getAuth()
  const router = useRouter()
  useEffect(() => {
    const unsubscribed = auth.onAuthStateChanged(async (user) => {
      console.log({ user })

      if (user === null) {
        router.push('/login')
      }
      unsubscribed()
    })
  }, [auth])
  return (
    // <html lang="en">
    //   <body className={inter.className}>{children}</body>
    // </html>ここから上3行は念の為残す（初期で設定されていたlayout.tsxの部分
    <FirebaseAuthProvider>
      <html lang="ja">
        <head />
        <body>{children}</body>
      </html>
    </FirebaseAuthProvider>
  );
}
