import WorkLayout from "../work_layout";
import { Github, Link as LinkIcon, UBCFE } from "../../icons";
import Link from "next/link";
import ExportedImage from "next-image-export-optimizer";
import software_team_22 from "~/public/formula/software_team_22.jpg"
import software_team_23 from "~/public/formula/software_team_23.jpg"
import software_team_24 from "~/public/formula/software_team_24.jpg"
import software_team_25 from "~/public/formula/software_team_25.jpg"
import comp_23 from "~/public/formula/comp_23.png"
import comp_24 from "~/public/formula/comp_24.jpg"
import comp_25 from "~/public/formula/comp_25.jpg"
import comp_26 from "~/public/formula/comp_26.jpg"
import group_25 from "~/public/formula/group_25.jpg"


export default function FormulaPage() {
	return (
		<WorkLayout banner_image_url="/formula/formula_banner.png">
			<div>
				<UBCFE className="size-14 mb-6" />
				<h1 className="text-3xl font-bold uppercase mb-3">UBC Formula Electric</h1>
				<div className="text-white/50">
					<p>&apos;22 Sensors Firmware</p>
					<p>&apos;23 Dashboard Lead</p>
					<p>&apos;24-&apos;26 Software Director</p>
				</div>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-2 gap-x-4">
				<p className="col-span-full text-lg mb-10 text-white/70">
					UBC Formula Electric is a student design team based out of the University of British Columbia in Vancouver, BC. Each year, we build an electric race car and compete with students from universities across North America. Software team defines the dynamic behaviour of the vehicle through our five subteams: Vehicle Firmware, Battery Management System, Controls, Telemetry and Validation. In this pursuit, we work with members of the electrical and mechanical teams to achieve vehicle performance characteristics.
				</p>

				<Link href="https://github.com/UBCFormulaElectric/Consolidated-Firmware" rel="noopener noreferrer" target="_blank" className="group">
					<div className="flex flex-row items-center gap-x-2 mb-2">
						<Github className="size-6 fill-white group-hover:fill-blue-500 transition-colors" />
						<p className="group-hover:text-blue-500 transition-colors"> UBCFormulaElectric/Consolidated-Firmware </p>
					</div>
				</Link>

				<Link href="https://github.com/UBCFormulaElectric/sim" rel="noopener noreferrer" target="_blank" className="group">
					<div className="flex flex-row items-center gap-x-2 mb-2">
						<Github className="size-6 fill-white group-hover:fill-blue-500 transition-colors" />
						<p className="group-hover:text-blue-500 transition-colors"> UBCFormulaElectric/sim </p>
					</div>
				</Link>

				<Link href="https://ubcformulaelectric.com/" rel="noopener noreferrer" target="_blank" className="group">
					<div className="flex flex-row items-center gap-x-2 mb-4">
						<LinkIcon className="size-6 stroke-white group-hover:stroke-blue-400 transition-colors" />
						<p className="group-hover:text-blue-400 transition-colors">ubcformulaelectric.com</p>
					</div>
				</Link>

				<hr className="col-span-full mb-4 opacity-35" />

				<h2 className="col-span-full font-bold text-xl">MY PROJECTS</h2>

				<h2 className="col-span-full font-bold text-xl">SOFTWARE TEAM</h2>
				<div className="relative h-76 mb-4">
					<ExportedImage fill src={software_team_22} alt="Software Team 2022" className="object-cover" />
				</div>
				<div className="relative h-76 mb-4">
					<ExportedImage fill src={software_team_23} alt="Software Team 2023" className="object-cover" />
				</div>
				<div className="relative h-76 mb-4">
					<ExportedImage fill src={software_team_24} alt="Software Team 2024" className="object-cover" />
				</div>
				<div className="relative h-76 mb-4">
					<ExportedImage fill src={software_team_25} alt="Software Team 2025" className="object-cover" />
				</div>

				<h2 className="col-span-full font-bold text-xl">COMPETITION</h2>
				<div className="relative h-85 mb-4">
					<ExportedImage fill src={comp_23} alt="" className="object-cover" />
				</div>
				<div className="relative h-85 mb-4">
					<ExportedImage fill src={comp_24} alt="" className="object-cover" />
				</div>
				<div className="relative h-85 mb-4">
					<ExportedImage fill src={comp_25} alt="" className="object-cover" />
				</div>
				<div className="relative h-85 mb-4">
					<ExportedImage fill src={comp_26} alt="" className="object-cover" />
				</div>

				<div className="col-span-full" >
					<div className="relative h-64">
						<ExportedImage fill src={group_25} alt="" className="object-cover" />
					</div>
					<p className="text-sm mt-2 italic text-white/50">
						Picture of all the teams from FSAE Michigan 2025. UBC Formula Electric pictured middle left. Joseph Thurston on suicíde watch in car 218.
					</p>
				</div>
			</div>
		</WorkLayout>
	);
}