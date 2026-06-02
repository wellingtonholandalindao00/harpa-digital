import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NavBar from '@/components/NavBar'

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Harpa Digital",
  description: "Harpa Cristã completa — letra, busca e favoritos",
  other: { 'color-scheme': 'light dark' },
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`} suppressHydrationWarning>
      <body className="min-h-full flex flex-col bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100">
        <script dangerouslySetInnerHTML={{ __html: `
          (function() {
            var t = localStorage.getItem('harpa-digital-tema');
            if (!t) { t = matchMedia('(prefers-color-scheme:dark)').matches ? 'escuro' : 'claro'; }
            if (t === 'escuro') document.documentElement.classList.add('dark');
            document.querySelector('meta[name="color-scheme"]').setAttribute('content', t === 'escuro' ? 'dark' : 'light');
          })();
        ` }} />
        <NavBar />
        <main className="flex-1">
          {children}
        </main>
      </body>
    </html>
  );
}
