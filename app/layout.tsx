import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Edwin Zheng',
  description: 'Personal website of Edwin Zheng',
}

export default function RootLayout({ children, }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <footer className="mx-auto container mt-10 text-white/50">
          <hr />
          <div className="flex sm:flex-col md:flex-row items-center gap-y-4 justify-between py-4">
            <div className="flex flex-row gap-10 [&>a:hover]:text-white [&>a]:transition-colors">
              <Link href="https://github.com/Lucien950/lucien950.github.io" target="_blank">Site Source</Link>
              <Link href="https://www.linkedin.com/in/edwin-zheng-1684a4198" target="_blank">Linkedin</Link>
              <Link href="https://artstation.com/lucien950" target="_blank">Artstation</Link>
              <Link href="https://github.com/lucien950" target="_blank">Github</Link>
            </div>
            <p>Copyright © 2025 Edwin Zheng. All rights reserved.</p>
          </div>
        </footer>
      </body>
    </html>
  )
}
