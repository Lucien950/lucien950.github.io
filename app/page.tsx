import Link from "next/link";
import { Download, EECE, IconExternalLink, ICPC, Rivian, UBCFE } from "./icons";

function HeaderLink({ href, children, order }: { href: string; children: React.ReactNode, order: number }) {
  return (
    <span>
      <span className="text-xs mr-1 top-[-5px] relative font-light text-gray-200">{order}</span>
      <Link href={href} className="underline text-lg" target="_blank">{children}</Link>
      <IconExternalLink strokeWidth={2} />
    </span>
  )
}

function ResumeExperience({ children, company, title, logo, suppress_line }:
  { children: React.ReactNode, company: string, title: string, logo?: React.ReactNode, suppress_line?: boolean }
) {
  return (
    <div className="grid gap-x-4" style={{ gridTemplateColumns: 'min-content auto' }}>
      <div className="size-15 border-6 border-(--background-start)">
        {logo}
      </div>
      <div className="flex flex-row items-center justify-between">
        <h3 className="text-xl">{company}</h3>
        <h4 className="text-sm text-white/80">
          {title}
        </h4>
      </div>
      {
        suppress_line
          ? <div></div>
          : <div className="border-l border-3 border-white/20 w-0 mx-auto"></div>
      }
      <div className="mb-4">
        {children}
      </div>
    </div>
  )
}

export default function Home() {
  return (
    <div>
      <header style={{ backgroundImage: 'radial-gradient(ellipse 122% 94% at 30% 0%, rgba(15, 15, 17, 0.5), rgba(15, 15, 17)), url(/header.png)' }}
        className="bg-no-repeat bg-cover"
      >
        <div className="h-[50vh]">
          <div className="flex flex-row gap-x-8 container mx-auto justify-end items-end h-full flex-wrap">
            <HeaderLink href="https://www.linkedin.com/in/edwin-zheng-1684a4198" order={1}>linkedin.com/in/edwin-zheng</HeaderLink>
            <HeaderLink href="https://github.com/lucien950" order={2}>github.com/lucien950</HeaderLink>
            <HeaderLink href="https://artstation.com/lucien950" order={3}>artstation.com/lucien950</HeaderLink>
          </div>
        </div>
        <h1 className="text-[13.8vw] font-bold text-center leading-none pointer-events-none">
          EDWIN ZHENG
        </h1>
      </header>

      <section className="container max-w-3xl mx-auto text-xl text-white/80">
        <div className="my-36">
          <p className="text-justify mb-4">
            i&apos;m a student at the University of British Columbia pursuing a degree in Honours Computer Science and Mathematics.
            i am passionate about computer/firmware systems, controls systems (applied in vehicle dynamics), applied mathematics in numerical methods, and design.
            i design intelligent computer controlled systems to effectively navigate real world uncertainty.
          </p>
          <p>
            looking for work after grad in May 2026.
          </p>
        </div>
      </section>

      <section className="container max-w-3xl mx-auto mb-20">
        <div className="mb-4 flex flex-row items-center gap-2">
          <h2 className="text-3xl font-medium text-gray-300">resume</h2>
          <Link href="/resume.pdf" target="_blank" title="Download PDF Resume">
            <Download className="size-6 stroke-white opacity-70 hover:opacity-100 transition-opacity" strokeWidth={2} />
          </Link>
        </div>
        <ResumeExperience
          company="Rivian" title="System HIL, Infotainment Integration | Summer 2024, 2025"
          logo={<div className="rounded-full bg-[#FFAC00] p-3 h-full w-full"> <Rivian className="h-full w-full fill-white" /> </div>}
        >
          <ul className="list-disc list-inside text-sm">
            <li> Designed and optimized software-based hardware test infrastructure, coordinating bench tools to create realistic test scenarios.  </li>
            <li> Optimized C++ based BLF logger (FDCAN/ETH/LIN), reduced dropped packets by 95%, improved logging rate by 30% </li>
            <li> Improved UX for test case development by migrating all testing to full stack React/NextJS web app for test action editing.  </li>
            <li> Led foundational architectural overhaul of test tooling by redesigning core UDS API, enabling expression of complex behaviours.  </li>
          </ul>
        </ResumeExperience>
        <ResumeExperience
          company="Controls Research @ UBC EECE" title="Student Researcher | 2025-2026"
          logo={<div className="w-full h-full"> <EECE className="h-full w-full" /> </div>}
        >
          <ul className="list-disc list-inside text-sm">
            <li></li>
          </ul>
        </ResumeExperience>
        <ResumeExperience
          company="UBC Formula Electric" title="Software Director | 2022-2026"
          logo={<div className="bg-[#001126] h-full w-full p-1 rounded-full"><UBCFE className="w-full h-full" /></div>}
        >
          <ul className="list-disc list-inside text-sm">
            <li> Led 22 Software Devs to 21st (2023), 31st (2024), 46th (2025), in FSAE Michigan, passed all inspections/events first time in school history.  </li>
            <li> Founded of autonomous driving division, designing visual feature detection, SLAM, vehicle controls algorithms.  </li>
            <li> Designed telemetry system, hosted on AWS, on Influx SQL database on Docker, NextJS Frontend, with WebSocket/REST APIs.  </li>
            <li> Implemented and enforced C/C++ code style, eliminating all memory bugs at compile time, improved mock interface.  </li>
            <li> Established validation team, no-car/HIL validation strategy with GitHub Actions + code review, reduced prod bug reports -30%.  </li>
            <li> Led the development of dashboard software in Flutter on custom embedded Linux distro in Yocto, including async dart-ffi CAN.  </li>
            <li> Developed All-Platform CMake build system/package manager, reduced generation/cross-compile times by 70%.  </li>
            <li> Implemented sensor processing in C for 9 sensors, 3 communication protocols (ADC, I2C, SPI), broadcasting over CAN bus.  </li>
          </ul>
        </ResumeExperience>
        <ResumeExperience
          company="UBC Competitive Programming Team" title="Division 1 Competitor | 2022-2026"
          logo={<div className="bg-[#E2E8F0] h-full w-full p-2 rounded-full"> <ICPC className="h-full w-full" /> </div>}
          suppress_line
        >
          <ul className="list-disc list-inside text-sm">
            <li> Member of UBC Division 1 Team (&apos;23, &apos;24), competing in weekly contests, International Collegiate Programming Contest (ICPC) </li>
            <li> 2nd place in Division 2 at ICPC Pacific Northwest (2022), completed contest using Python and C++.  </li>
            <li> Achieved top 10% in Canadian Computing Competition Senior Division from Grade 10-12.  </li>
            <li> Developed and optimized complex data structures and algorithms based on mathematical principles </li>
          </ul>
        </ResumeExperience>
      </section>

      <section>
        <h2 className="text-xl text-center">notable projects</h2>
      </section>
    </div>
  )
}
