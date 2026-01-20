import Link from "next/link";
import { Download, EECE, IconExternalLink, ICPC, JHY, Rivian, UBCFE, MLH } from "./icons";
import { abc_diatype, albra, albra_text, neue_montreal } from "./fonts";

function HeaderLink({ href, children, order }: { href: string; children: React.ReactNode, order: number }) {
  return (
    <span>
      <span className="text-xs mr-1 top-[-5px] relative font-light text-gray-200">{order}</span>
      <Link href={href} className="underline text-lg" target="_blank">{children}</Link>
      <IconExternalLink strokeWidth={2} />
    </span>
  )
}

function ResumeExperience({ children, company, title, suppress_line, link }:
  { children: Array<React.ReactNode>, company: string, title: string, suppress_line?: boolean, link?: string }
) {
  return (
    <div className="grid gap-x-4" style={{ gridTemplateColumns: 'min-content auto' }}>
      <div className="size-15 border-6 border-(--background-start)">
        {children[0]}
      </div>
      <div className="flex flex-col justify-center mb-2 md:mb-0 md:flex-row md:items-center md:justify-between">
        {
          link
            ? <Link href={link} className="flex flex-row items-center hover:bg-red-400">
              <h3 className={`text-lg md:text-xl font-medium ${neue_montreal.className} hover:underline`}>{company}</h3>
              {link && <IconExternalLink className="inline size-4 ml-1" strokeWidth={2} />}
            </Link>
            : <h3 className={`text-lg md:text-xl font-medium ${neue_montreal.className}`}>{company}</h3>
        }
        <h4 className={`text-xs md:text-sm text-white/80 ${neue_montreal.className}`}>
          {title}
        </h4>
      </div>
      {
        suppress_line
          ? <div></div>
          : <div className="border-l border-3 border-white/20 w-0 mx-auto"></div>
      }
      <div className={`mb-4 text-white/70 text-justify ${abc_diatype.className}`}>
        {children[1]}
      </div>
    </div>
  )
}

enum CardCompany {
  UBCFE,
  Rivian,
  ICPC,
  MLH
}

function CompanyLogo({ company }: { company: CardCompany }) {
  switch (company) {
    case CardCompany.UBCFE:
      return <UBCFE className="size-14" />;
    case CardCompany.Rivian:
      return <Rivian className="size-10 fill-white my-2" />;
    case CardCompany.ICPC:
      return <ICPC className="size-10" />;
    case CardCompany.MLH:
      return <MLH className="size-10" />;
    default:
      return <div className="size-10 bg-white/10" />;
  }
}

function Card({ title, company_logo, link, image_url, image_height_px }:
  { title: string, company_logo: CardCompany, link: string, image_url: string, image_height_px?: number }
) {
  return (
    <div className="mb-4">
      <Link href={link}>
        <img src={image_url} alt="" className="w-full object-cover" style={{ height: image_height_px ? `${image_height_px}px` : 'auto' }} />
        <div className="flex flex-row items-center justify-between">
          <h3 className="font-medium">{title}</h3>
          <CompanyLogo company={company_logo} />
        </div>
      </Link>
    </div>
  )
}

export default function Home() {
  return (
    <div>
      <header style={{ backgroundImage: 'radial-gradient(ellipse 122% 94% at 30% 0%, rgba(15, 15, 17, 0.5), rgba(15, 15, 17)), url(/header.png)' }}
        className="bg-no-repeat bg-cover"
      >
        <div className="h-[50vh] flex flex-col justify-end mb-4 sm:mb-0">
          <div className={`inline-flex flex-row gap-x-8 gap-y-2 container mx-auto justify-end items-end flex-wrap ${albra_text.className}`}>
            <HeaderLink href="https://www.linkedin.com/in/edwin-zheng-1684a4198" order={1}>linkedin.com/in/edwin-zheng</HeaderLink>
            <HeaderLink href="https://github.com/lucien950" order={2}>github.com/lucien950</HeaderLink>
            <HeaderLink href="https://artstation.com/lucien950" order={3}>artstation.com/lucien950</HeaderLink>
          </div>
        </div>
        <h1 className={`text-[29vw] md:text-[14vw] text-center leading-none pointer-events-none ${albra.className}`}>
          EDWIN ZHENG
        </h1>
      </header>

      <section className="container max-w-3xl mx-auto text-xl text-white/80">
        <div className={`my-36 ${neue_montreal.className}`}>
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

      <section className="container max-w-3xl mx-auto mb-20 pr-2 md:pr-0">
        <div className="mb-6 flex flex-row items-end gap-4">
          <h2 className={`text-3xl font-light text-gray-300 ${albra.className} leading-none`}>resume</h2>
          <Link href="/resume.pdf" target="_blank" title="Download PDF Resume">
            <Download className="size-6 stroke-white opacity-70 hover:opacity-100 transition-opacity" strokeWidth={2} />
          </Link>
        </div>
        <ResumeExperience company="Rivian" title="System HIL, Infotainment Integration | Summer 2024, 2025" link="/work/rivian">
          <div className="rounded-full bg-[#FFAC00] p-3 h-full w-full"> <Rivian className="h-full w-full fill-white" /> </div>
          <ul className="list-disc list-inside text-sm">
            <li> Designed and optimized software-based hardware test infrastructure, coordinating bench tools to create realistic test scenarios.  </li>
            <li> Optimized C++ based BLF logger (FDCAN/ETH/LIN), reduced dropped packets by 95%, improved logging rate by 30% </li>
            <li> Improved UX for test case development by migrating all testing to full stack React/NextJS web app for test action editing.  </li>
            <li> Led foundational architectural overhaul of test tooling by redesigning core UDS API, enabling expression of complex behaviours.  </li>
          </ul>
        </ResumeExperience>
        <ResumeExperience company="Controls Research @ UBC EECE" title="Student Researcher | 2025-2026">
          <div className="w-full h-full"> <EECE className="h-full w-full" /> </div>
          <ul className="list-disc list-inside text-sm">
            <li>Conducted controls research under the supervision of Professor Alberto Padoan</li>
            <li>Developed a controls framework for a high performance formula-style car</li>
            <li>Implemented controller with data-predictive controls</li>
            <li>Developed vehicle models to drive MPC/DPC framework</li>
          </ul>
        </ResumeExperience>
        <ResumeExperience company="UBC Formula Electric" title="Software Director | 2022-2026" link="/work/formula">
          <div className="bg-[#001126] h-full w-full p-1 rounded-full"><UBCFE className="w-full h-full" /></div>
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
        <ResumeExperience company="UBC Competitive Programming Team" title="Division 1 Competitor | 2022-2026" link="/work/cp">
          <div className="bg-[#E2E8F0] h-full w-full p-2 rounded-full"> <ICPC className="h-full w-full" /> </div>
          <ul className="list-disc list-inside text-sm">
            <li> Member of UBC Division 1 Team (&apos;23, &apos;24), competing in weekly contests, International Collegiate Programming Contest (ICPC) </li>
            <li> 2nd place in Division 2 at ICPC Pacific Northwest (2022), completed contest using Python and C++.  </li>
            <li> Achieved top 10% in Canadian Computing Competition Senior Division from Grade 10-12.  </li>
            <li> Developed and optimized complex data structures and algorithms based on mathematical principles </li>
          </ul>
        </ResumeExperience>
        <ResumeExperience company="JHY Electrical" title="Principal Fullstack Developer | 2020-2022" suppress_line>
          <div className="h-full w-full rounded-full bg-white p-2">
            <JHY className="h-full w-full" />
          </div>
          <ul className="list-disc list-inside text-sm">
            <li>Established web presence for local (Ottawa) electronics business, enabling online catalogue/orders, deployed on Vercel.</li>
            <li>Designed UX, implemented UI built with NextJS/React app in Typescript, styling with TailwindCSS, ShadCN components.</li>
            <li>Developed CRUD backend API interfacing with PostgreSQL database, PayPal Orders/Stripe Payment Intents Server-Side API.</li>
            <li>Ensured confidence in functionality through tests implemented across the entire stack with Jest and Playwright.</li>
          </ul>
        </ResumeExperience>
      </section>

      <section>
        <h2 className={`text-2xl text-center ${albra.className}`}>notable projects</h2>
        <div className="columns-lg [&>*]:break-inside-avoid gap-6 mt-6 mx-4">
          <Card title="Dashboard Electronics" company_logo={CardCompany.UBCFE} link="/projects/dashboard" image_url="/formula/comp_dashboard.jpg" image_height_px={330} />
          <Card title="Vehicle Controls" company_logo={CardCompany.UBCFE} link="/projects/controls" image_url="/formula/controls.png" />
          <Card title="Vehicle Modelling" company_logo={CardCompany.UBCFE} link="/projects/sim" image_url="/formula/vehicle_model.png" />
          <Card title="Vehicle Firmware and Build System" company_logo={CardCompany.UBCFE} link="/projects/formula_firmware" image_url="/formula/fsm.png" />
          <Card title="Tracksight" company_logo={CardCompany.UBCFE} link="/projects/tracksight" image_url="/formula/tracksight.png" />
          <Card title="PseudoECU" company_logo={CardCompany.Rivian} link="/work/rivian#pseudoecu" image_url="/rivian/pecu_docs.png" />
          <Card title="Rivsniffer" company_logo={CardCompany.Rivian} link="/work/rivian#rivsniffer" image_url="/rivian/rivsniffer.png" />
          <Card title="Netlogger" company_logo={CardCompany.Rivian} link="/work/rivian#netlogger" image_url="/rivian/netlogger.png" />
          <Card title="Nexus" company_logo={CardCompany.Rivian} link="/work/rivian#nexus" image_url="/rivian/nexus.png" />
          <Card title="Competitive Programming Writeups" company_logo={CardCompany.ICPC} link="/writeups" image_url="/cp/main.jpeg" />
          <Card title="Booktrail" company_logo={CardCompany.MLH} link="/projects/booktrail" image_url="" />
        </div>
      </section>
    </div>
  )
}
