import { adventure } from "~/app/fonts";
import WorkLayout from "../work_layout";
import { Rivian, Link as LinkIcon } from "../../icons";
import Link from "next/link";
import syshil from "~/public/rivian/system_hil.png"
import interns25 from "~/public/rivian/25-interns.jpg"
import interns25_rj from "~/public/rivian/IMG_3096.png"
import antonio from "~/public/rivian/antonio.jpg"
import pecu_docs from "~/public/rivian/pecu_docs.png"
import ExportedImage from "next-image-export-optimizer";

export default function RivianPage() {
	return (
		<WorkLayout banner_image_url="/rivian/banner.jpg">
			<div>
				<Rivian className="size-14 mb-6 fill-[#FFAC00]" />
				<h1 className={`${adventure.className} font-bold text-5xl mb-6`}>RIVIAN</h1>
				<div className="text-white/50">
					<p>System HIL | Summer 2024</p>
					<p>Infotainment Integration | Summer 2025</p>
				</div>
			</div>

			<div className={`${adventure.className} grid grid-cols-1 lg:grid-cols-2 gap-x-4`}>
				<p className="col-span-full text-justify mb-4">
					Rivian is an American electric vehicle manufacturer and automotive technology company.
					In my first summer internship in 2024, I worked on the System HIL team to develop a software-based hardware-in-the-loop testing framework.
					I developed Nexus, a tool used internally to dispatch HIL teset cases to test benches, and integrated it with existing tools to create realistic test scenarios.

					In my second summer internship in 2025, I worked on the Infotainment Integration team to develop and maintain the software that powers the in-car user experience.
					I developed PseudoEcu, a software tool that allows the user to configure and simulate the behaviour of electronic control units (ECUs) in the vehicle through the ethernet interface to the XMM.
				</p>

				<div>
					<Link href="https://rivian.com/" target="_blank" className="group">
						<div className="flex flex-row items-center gap-x-2 mb-4">
							<LinkIcon className="size-6 stroke-white group-hover:stroke-blue-400 transition-colors" />
							<p className="group-hover:text-blue-400 transition-colors">rivian.com</p>
						</div>
					</Link>
				</div>


				<hr className="col-span-full my-4 border-[1.5px] border-white/20 rounded-full" />

				<h2 className="text-4xl font-bold col-span-full mb-4">System HIL</h2>
				<div className="col-span-full w-full mb-2" >
					<ExportedImage src={syshil} alt="System HIL Team, Summer 2024" />
				</div>
				<p className="italic text-white/70 col-span-full text-sm">pictured above: ricardo, sam, kate (another intern), myself, chris, john, diego. i worked closely with my mentor chris, and sam who gave me the netlogger project</p>
				<p className="col-span-full">Three major projects I worked on during my internship with this team</p>

				<h3 className="col-span-full font-semibold text-2xl" id="rivsniffer">Rivsniffer</h3>
				<p>PowCon was a python utility used to control power supplies in the HIL testing loop</p>

				<h3 className="col-span-full font-semibold text-2xl" id="nexus">Nexus</h3>
				<p className="col-span-full">
					Nexus was a tool used internally to dispatch HIL test cases to test benches, and integrated it with existing tools to create realistic test scenarios.
				</p>

				<h3 className="col-span-full font-semibold text-2xl" id="netlogger">Netlogger</h3>
				<p className="col-span-full">
					Netlogger was a tool used to collect and analyze logs from the HIL testing loop, providing insights into system performance and behavior.
				</p>

				<h2 className="text-4xl font-bold col-span-full mb-4">Infotainment Integration</h2>

				<ExportedImage src={interns25} alt="Interns at a SF Giants Game" className="" />
				<ExportedImage src={interns25_rj} alt="Interns meeting with RJ" className="" />

				<p className="col-span-full mt-4">
					During my second internship, I decided to switch to the infotainment organization.
					I was drawn to this team because I was interested in working on embedded operating systems as a continuation of my work on infotainment systems in UBC Formula Electric.
				</p>

				<ExportedImage src={antonio} alt="Antonio and I" className="mt-4 h-120 object-cover" />
				<p className="italic text-white/70 text-sm mt-4">my manager antonio rodriguez. he inspired the pseudoecu project, and gave me guidance to navigate working in the infotainment team.</p>

				<h3 className="col-span-full font-semibold text-2xl" id="pseudoecu">PseudoECU</h3>
				<ExportedImage src={pecu_docs} className="col-span-full mt-4" alt="Pseudo ECU Block Diagram" />
			</div>
		</WorkLayout>
	);
}