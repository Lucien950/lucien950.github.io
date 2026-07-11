import Link from "next/link";
import { Download, EECE, IconExternalLink, ICPC, JHY, Rivian, UBCFE, MLH, Wrench, Tesla } from "./icons";
import { abc_diatype, albra, albra_text, neue_montreal } from "./fonts";
import ExportedImage from "next-image-export-optimizer";
import header from "~/public/header.png"

function HeaderLink({ href, children, order, new_page }: { href: string; children: React.ReactNode, order: number, new_page?: boolean }) {
  return (
    <span>
      <span className="text-xs mr-1 -top-1.25 relative font-light text-gray-200">{order}</span>
      <Link href={href} className="underline text-lg peer" target={new_page || (new_page == undefined) ? "_blank" : undefined}>{children}</Link>
      <IconExternalLink strokeWidth={2} className="size-5 inline-block mb-1 peer-hover:translate-x-1 peer-hover:-translate-y-1 transition-transform" />
    </span>
  )
}

// note that a css group is declared in here
function ResumeExperience({ children, company, title, suppress_line, link }:
  { children: Array<React.ReactNode>, company: string, title: string, suppress_line?: boolean, link?: string }
) {
  return (
    <div className="grid gap-x-4 group" style={{ gridTemplateColumns: 'min-content auto' }}>
      {/* row 1 */}
      <div className="size-16 border-6 border-(--background-start)">
        {children[0]}
      </div>
      <div className="flex flex-col justify-center mb-2 md:mb-0 md:flex-row md:items-center md:justify-between">
        {
          link
            ? <Link href={link} className="flex flex-row items-center resume-link">
              <h3 className={`text-lg md:text-xl font-medium ${neue_montreal.className} group-has-[.resume-link:hover]:underline decoration-dotted`}>{company}</h3>
              {link && <IconExternalLink className="inline size-4 ml-1 group-has-[.resume-link:hover]:translate-x-1 group-has-[.resume-link:hover]:-translate-y-1 transition-transform" strokeWidth={2} />}
            </Link>
            : <h3 className={`text-lg md:text-xl font-medium ${neue_montreal.className}`}>{company}</h3>
        }
        <h4 className={`text-xs md:text-sm text-white/80 ${neue_montreal.className}`}>
          {title}
        </h4>
      </div>
      {/* row 2 */}
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
  MLH,
  LaptopRepair,
  Tesla
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
    case CardCompany.LaptopRepair:
      return <Wrench className="size-10 dark:fill-white" />;
    case CardCompany.Tesla:
      return <Tesla className="size-10" />;
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

enum HighlightTopic {
  Lang,
  Tool,
  Controls,
}

function Highlighter({ children, selector }: { children: React.ReactNode, selector: HighlightTopic }) {
  return (
    <span
      className={`relative transition-colors
        ${selector === HighlightTopic.Lang ? "group-has-[#languages:hover]/resume:text-white group-has-[#languages:checked]/resume:text-white" : ""}
        ${selector === HighlightTopic.Tool ? "group-has-[#tools:hover]/resume:text-white group-has-[#tools:checked]/resume:text-white" : ""}
        ${selector === HighlightTopic.Controls ? "group-has-[#controls:hover]/resume:text-white group-has-[#controls:checked]/resume:text-white" : ""}
      `}
    >
      <div className={`absolute h-1/2 bottom-0 pointer-events-none animate-highlightenter hidden -z-10
        ${selector === HighlightTopic.Lang ? "bg-red-500/60 group-has-[#languages:hover]/resume:inline group-has-[#languages:checked]/resume:inline" : ""}
        ${selector === HighlightTopic.Tool ? "bg-yellow-500/60 group-has-[#tools:hover]/resume:inline group-has-[#tools:checked]/resume:inline" : ""}
        ${selector === HighlightTopic.Controls ? "bg-blue-500/60 group-has-[#controls:hover]/resume:inline group-has-[#controls:checked]/resume:inline" : ""}
      `}
      />
      {children}
    </span>
  )
}

export default function Home() {
  return (
    <div>
      <header className="relative overflow-clip">
        <div className="-z-40 absolute w-full h-full scale-110"
          style={{ backgroundImage: 'radial-gradient(ellipse 122% 94% at 30% 0%, rgba(15, 15, 17, 0.5), rgba(15, 15, 17))' }}
        />
        <ExportedImage src={header} alt="" fill className="-z-50 object-cover scale-105" loading="eager" />
        <div className="h-[50vh] flex flex-col justify-end mb-4 sm:mb-0">
          <div className={`inline-flex flex-row gap-x-8 gap-y-2 container mx-auto justify-end items-end flex-wrap ${albra_text.className}`}>
            <HeaderLink href="https://www.linkedin.com/in/edwin-zheng-1684a4198" order={1}>linkedin.com/in/edwin-zheng</HeaderLink>
            <HeaderLink href="https://github.com/lucien950" order={2}>github.com/lucien950</HeaderLink>
            <HeaderLink href="https://artstation.com/lucien950" order={3}>artstation.com/lucien950</HeaderLink>
            <HeaderLink href="#projects" order={4} new_page={false}>projects</HeaderLink>
            <HeaderLink href="#blog" order={5} new_page={false}>blog</HeaderLink>
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
            currently working on Lv @ tesla
          </p>
        </div>
      </section>

      <section className="container max-w-3xl mx-auto mb-20 pr-2 md:pr-0 group/resume">
        {/* header */}
        <div className="mb-6 flex flex-row items-end">
          <h2 className={`text-3xl font-light text-gray-300 ${albra.className} leading-none mr-4`}>resume</h2>
          <Link href="/resume.pdf" target="_blank" title="Download PDF Resume" className="mr-8">
            <Download className="size-6 stroke-white opacity-70 hover:opacity-100 transition-opacity duration-300" strokeWidth={2} />
          </Link>

          <p className="mr-1">topics</p>
          <label htmlFor="languages" className="text-sm border border-white/20 rounded-full px-2 py-1 text-white/40 mr-1 cursor-pointer has-checked:border-red-400 has-checked:text-white hover:text-white! transition-colors">
            languages
            <input type="checkbox" className="hidden" id="languages" />
          </label>
          <label htmlFor="tools" className="text-sm border border-white/20 rounded-full px-2 py-1 text-white/40 mr-1 cursor-pointer has-checked:border-yellow-400 has-checked:text-white hover:text-white! transition-colors">
            tools
            <input type="checkbox" className="hidden" id="tools" />
          </label>
          <label htmlFor="controls" className="text-sm border border-white/20 rounded-full px-2 py-1 text-white/40 mr-1 cursor-pointer has-checked:border-blue-400 has-checked:text-white hover:text-white! transition-colors">
            controls
            <input type="checkbox" className="hidden" id="controls" />
          </label>
        </div>

        <ResumeExperience company="Tesla" title="Low Voltage Power | 2026-" link="/work/tesla">
          <div className="rounded-full group-has-[.resume-link:hover]:border-0 bg-white/3 group-has-[.resume-link:hover]:bg-[#E82127] duration-500 p-3 pb-2.5 h-full w-full transition-colors">
            <Tesla className="h-full w-full fill-white transition-colors" />
          </div>
          <ul className="list-disc list-inside text-sm">
            <li>Coming soon...</li>
          </ul>
        </ResumeExperience>
        <ResumeExperience company="Rivian" title="System HIL, Infotainment Integration | Summer 2024, 2025" link="/work/rivian">
          <div className="rounded-full bg-white/3 group-has-[.resume-link:hover]:bg-[#FFAC00] p-3 h-full w-full transition-colors duration-400">
            <Rivian className="h-full w-full fill-white transition-colors" />
          </div>
          <ul className="list-disc list-inside text-sm">
            <li> Optimized software in hardware test infrastructure, coordinating bench tools to create realistic test cases.</li>
            <li> Optimized <Highlighter selector={HighlightTopic.Lang}>Python</Highlighter>/<Highlighter selector={HighlightTopic.Lang}>C++</Highlighter> based BLF logger (<Highlighter selector={HighlightTopic.Tool}>FDCAN/ETH/LIN</Highlighter>), reduced dropped packets by 95% </li>
            <li> Improved UX for test case development by migrating all testing to full stack <Highlighter selector={HighlightTopic.Lang}>React/NextJS</Highlighter> web app for test action editing.  </li>
            <li> Led foundational architectural overhaul of test tooling by redesigning core <Highlighter selector={HighlightTopic.Tool}>UDS API</Highlighter>, enabling expression of complex behaviours.</li>
          </ul>
        </ResumeExperience>
        <ResumeExperience company="Controls Research @ UBC EECE" title="Student Researcher | 2025-2026">
          <div className="w-full h-full"> <EECE className="h-full w-full" /> </div>
          <ul className="list-disc list-inside text-sm">
            <li>Wrote a bachelor&apos;s thesis under the supervision of Professor Alberto Padoan, "Hybrid Autonomous Torque Vectoring Architecture for FSAE Vehicle"</li>
            <li>Developed a <Highlighter selector={HighlightTopic.Controls}>hybrid autonomous controls framework</Highlighter> for a high performance formula-style car, incorperating elements of traction control, power limiting and torque vectoring, all in <Highlighter selector={HighlightTopic.Lang}>C++</Highlighter></li>
            <li>Developed vehicle body, tire, battery, powertrain model in <Highlighter selector={HighlightTopic.Lang}>Simulink</Highlighter> to conduct driver in loop (DIL) validation</li>
            <li>Developed autonomous driving using <Highlighter selector={HighlightTopic.Controls}>MPC</Highlighter> framework, implemented through <Highlighter selector={HighlightTopic.Controls}>quadratic programming</Highlighter> solver</li>
            <li>Developed real-time state estimation algorithms using <Highlighter selector={HighlightTopic.Controls}>Extended Kalman Filters</Highlighter>, fusing GPS, IMU, motor data</li>
          </ul>
        </ResumeExperience>
        <ResumeExperience company="UBC Formula Electric" title="Software Director | 2022-2026" link="/work/formula">
          <div className="bg-white/3 group-has-[.resume-link:hover]:bg-[#001126] h-full w-full p-1 rounded-full transition-colors">
            <UBCFE className="w-full h-full" />
          </div>
          <ul className="list-disc list-inside text-sm">
            <li> Led ~25 Software Devs to 21st (2023), 31st (2024), 46th (2025), 67th (2026), in FSAE Michigan, passed all inspections/events first time in school history.  </li>
            <li> Founded of autonomous driving division, built visual feature detection, <Highlighter selector={HighlightTopic.Controls}>SLAM</Highlighter>, <Highlighter selector={HighlightTopic.Controls}>vehicle controls algorithms</Highlighter></li>
            <li> Designed telemetry system, using <Highlighter selector={HighlightTopic.Tool}>Influx SQL</Highlighter> database on <Highlighter selector={HighlightTopic.Tool}>Docker</Highlighter>, <Highlighter selector={HighlightTopic.Lang}>NextJS</Highlighter>, <Highlighter selector={HighlightTopic.Lang}>Rust</Highlighter> <Highlighter selector={HighlightTopic.Tool}>WebSocket</Highlighter>/<Highlighter selector={HighlightTopic.Tool}>REST</Highlighter> APIs.  </li>
            <li> Implemented + enforced <Highlighter selector={HighlightTopic.Lang}>C/C++</Highlighter> code style, eliminating memory bugs at compile time, refactored mocks. </li>
            <li> Established validation team, no-car/HIL validation with <Highlighter selector={HighlightTopic.Lang}>GitHub Actions</Highlighter>, reduced prod bug reports ~70%.  </li>
            <li> Led introduction of dashboard software in <Highlighter selector={HighlightTopic.Lang}>Flutter</Highlighter> on embedded <Highlighter selector={HighlightTopic.Tool}>Linux</Highlighter> via <Highlighter selector={HighlightTopic.Lang}>Yocto</Highlighter>, with async dart-ffi CAN.</li>
            <li> Developed cross platform <Highlighter selector={HighlightTopic.Lang}>CMake</Highlighter> build/package manager, reduced generation/cross-compile times by 70%.</li>
            <li> Implemented sensor processing in <Highlighter selector={HighlightTopic.Lang}>C</Highlighter> for 9 sensors, 3 protocols (ADC, I2C, SPI), broadcasting over CAN bus.  </li>
          </ul>
        </ResumeExperience>
        <ResumeExperience company="UBC Competitive Programming Team" title="Division 1 Competitor | 2022-2026" link="/work/cp">
          <div className="h-full w-full p-2 rounded-full bg-white/3">
            <ICPC className="h-full w-full fill-white! transition-colors" override={true} />
          </div>
          <ul className="list-disc list-inside text-sm">
            <li> Member of UBC Division 1 Team (&apos;23-&apos;26), competing in International Collegiate Programming Contest (ICPC) </li>
            <li> 2nd place in Division 2 at ICPC Pacific Northwest (2022), completed contest using <Highlighter selector={HighlightTopic.Lang}>Python</Highlighter> and <Highlighter selector={HighlightTopic.Lang}>C++</Highlighter>.  </li>
            <li> Achieved top 10% in Canadian Computing Competition Senior Division from Grade 10-12.  </li>
            <li> Developed and optimized complex data structures and algorithms based on mathematical principles </li>
          </ul>
        </ResumeExperience>
        <ResumeExperience company="JHY Electrical" title="Principal Fullstack Developer | 2020-2022" suppress_line>
          <div className="h-full w-full rounded-full p-2">
            <JHY className="h-full w-full fill-white group-has-[.resume-link:hover]:fill-[#0CB3FE]" />
          </div>
          <ul className="list-disc list-inside text-sm">
            <li>Established web presence for electronics business, enabling online catalogue/orders, deployed on <Highlighter selector={HighlightTopic.Tool}>Vercel</Highlighter>.</li>
            <li>Designed UX, implemented UI built with <Highlighter selector={HighlightTopic.Lang}>NextJS</Highlighter>/<Highlighter selector={HighlightTopic.Lang}>React</Highlighter> app in <Highlighter selector={HighlightTopic.Lang}>Typescript</Highlighter>, styling with <Highlighter selector={HighlightTopic.Lang}>TailwindCSS</Highlighter>, ShadCN</li>
            <li>Developed CRUD API interfacing with <Highlighter selector={HighlightTopic.Lang}>PostgreSQL</Highlighter> database, <Highlighter selector={HighlightTopic.Tool}>PayPal</Highlighter> Orders/<Highlighter selector={HighlightTopic.Tool}>Stripe</Highlighter> Payment Intents API.</li>
            <li>Ensured confidence in functionality through tests implemented across the entire stack with <Highlighter selector={HighlightTopic.Tool}>Jest</Highlighter>, <Highlighter selector={HighlightTopic.Tool}>Playwright</Highlighter>.</li>
          </ul>
        </ResumeExperience>
      </section>

      <section className="relative" id="projects">
        <div className="sticky top-0 bg-(--background-start)/70 backdrop-blur-lg py-2">
          <h2 className={`text-2xl text-center ${albra.className}`}>notable projects</h2>
        </div>
        <div className="columns-lg *:break-inside-avoid gap-6 mt-4 mx-4">
          <Card title="Vehicle Firmware and Build System" company_logo={CardCompany.UBCFE} link="/projects/formula_firmware" image_url="/formula/fsm.png" />
          <Card title="Competitive Programming Writeups" company_logo={CardCompany.ICPC} link="/writeups" image_url="/cp/main.jpeg" />
          <Card title="Vehicle Controls" company_logo={CardCompany.UBCFE} link="/projects/controls" image_url="/formula/controls.png" />
          <Card title="PseudoECU" company_logo={CardCompany.Rivian} link="/work/rivian#pseudoecu" image_url="/rivian/pecu_docs.png" />
          <Card title="Dashboard Electronics" company_logo={CardCompany.UBCFE} link="/projects/dashboard" image_url="/formula/comp_dashboard.jpg" image_height_px={330} />
          <Card title="Vehicle Modelling" company_logo={CardCompany.UBCFE} link="/projects/sim" image_url="/formula/vehicle_model.png" />
          <Card title="Tracksight" company_logo={CardCompany.UBCFE} link="/projects/tracksight" image_url="/formula/tracksight.png" />
          <Card title="Rivsniffer" company_logo={CardCompany.Rivian} link="/work/rivian#rivsniffer" image_url="/rivian/rivsniffer.png" />
          <Card title="Netlogger" company_logo={CardCompany.Rivian} link="/work/rivian#netlogger" image_url="/rivian/netlogger.png" />
          <Card title="Nexus" company_logo={CardCompany.Rivian} link="/work/rivian#nexus" image_url="/rivian/nexus.png" />
          <Card title="Booktrail" company_logo={CardCompany.MLH} link="/projects/booktrail" image_url="/hackathon/booktrail.png" />
          <Card title="Edwin's Laptop Repair Shop" company_logo={CardCompany.LaptopRepair} link="/projects/laptop" image_url="/laptop/xps.jpeg" />
        </div>
      </section>

      <section id="blog" className="mx-auto prose dark:prose-invert my-10">
        <h2 className={`text-2xl text-center ${albra.className} font-light`}>blog</h2>
        <ul>
          <li> <Link href="/blog/ai" className="underline text-lg"> [INCOMPLETE] Thoughts on AI </Link> </li>
          <li> <Link href="/blog/mpc" className="underline text-lg"> An intuitive formulation of Model Predictive Controls </Link> </li>
        </ul>
      </section>
    </div>
  )
}
