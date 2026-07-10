import type { Metadata } from 'next'
import { albra_text, neue_montreal } from './fonts'
import './globals.css'
import Link from 'next/link'
import Nav from './nav'

export const metadata: Metadata = {
  title: 'Edwin Zheng',
  description: 'Personal website of Edwin Zheng',
}

export default function RootLayout({ children, }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className="scroll-smooth">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="stylesheet" href="https://unpkg.com/katex@0.16.0/dist/katex.min.css" />
      </head>
      <body className={neue_montreal.className}>
        <Nav />
        {children}
        <footer className="mx-auto container text-white/50">
          <hr />
          <div className={`flex flex-col md:flex-row items-center gap-y-4 justify-between py-4`}>
            <div className="flex flex-row gap-10 [&>a:hover]:text-white [&>a]:transition-colors">
              <Link href="https://github.com/Lucien950/lucien950.github.io" target="_blank">Site Source</Link>
              <Link href="https://www.linkedin.com/in/edwin-zheng-1684a4198" target="_blank">Linkedin</Link>
              <Link href="https://artstation.com/lucien950" target="_blank">Artstation</Link>
              <Link href="https://github.com/lucien950" target="_blank">Github</Link>
            </div>
            <p className={albra_text.className}>site by Edwin Zheng</p>
          </div>
        </footer>
      </body>
    </html>
  )
}
