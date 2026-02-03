import { Github, ICPC, Link as LinkIcon } from "~/app/icons";
import WorkLayout from "../work_layout";
import Link from "next/link";

export default function CompetitiveProgramming() {
	return (
		<WorkLayout banner_image_url="/cp/wall.jpg">
			<div>
				<ICPC className="size-14 w-20 mb-6" />
				<h1 className="text-3xl font-bold uppercase mb-3">UBC ACM, Competitive Programming Team</h1>
				<div className="text-white/50">
					<p>&apos;22, Division 2, 2nd place in PacNW and in Canada</p>
					<p>&apos;23-&apos;24, Division 1 Competitor</p>
					<p>&apos;25, Division 1, 2nd place in PacNW</p>
				</div>
			</div>
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-x-4">
				<p className="lg:col-span-2 text-sm mb-4">
					The UBC ACM Competitive Programming Team is a student organization that competes in the International Collegiate Programming Contest (ICPC) and other competitive programming contests.
					The team is made up of students from various disciplines who share a passion for problem-solving and algorithmic thinking.
					As a member of the team, I have had the opportunity to participate in regional and national competitions, honing my skills in algorithms, data structures, and teamwork.
				</p>

				<Link href="https://github.com/Lucien950/Contests" rel="noopener noreferrer" target="_blank" className="group">
					<div className="flex flex-row items-center gap-x-2 mb-2">
						<Github className="size-6 fill-white group-hover:fill-blue-500 transition-colors" />
						<p className="group-hover:text-blue-500 transition-colors">Lucien950/Contests</p>
					</div>
				</Link>

				<Link href="https://icpc.cs.ubc.ca/" rel="noopener noreferrer" target="_blank" className="group">
					<div className="flex flex-row items-center gap-x-2 mb-4">
						<LinkIcon className="size-6 stroke-white group-hover:stroke-blue-400 transition-colors" />
						<p className="group-hover:text-blue-400 transition-colors">icpc.cs.ubc.ca</p>
					</div>
				</Link>

				<Link href="/writeups" className="col-span-2">
					<div className="my-4 border-2 border-gray-800 rounded-lg overflow-clip pb-4">
						<img src="/cp/main.jpeg" alt="" className="h-56 w-full object-cover" />
						<h3 className="text-lg font-semibold ml-2 mt-2">Writeups</h3>
					</div>
				</Link>


				<img src="/cp/22_medals.JPG" alt="" className="mb-4" />
				<img src="/cp/23.jpg" alt="" className="" />
				<img src="/cp/25_start.jpg" alt="" className="mb-2" />
				<img src="/cp/25_end.jpeg" alt="" />
				<p className="text-white/40 col-span-full mb-4">team YBG, regional 2nd place at ICPC PacNW</p>
				<img src="/cp/25_medals.jpeg" alt="" className="col-span-full mb-2" />
				<p className="text-white/40 col-span-full">left to right: Peter Gu, me, Charles Ran, the SFU poach, Rain Zimin Yang, and the Coach Xingyu Zhou</p>
			</div>
		</WorkLayout>
	);
}