import Link from "next/link";

export default function FormulaPage() {
	return (
		<main>
			<img src="/formula/formula_banner.png" alt="Formula" className="w-full h-[42rem] object-cover mb-6" />

			<article className="grid grid-cols-3 w-full gap-x-4 container mx-auto px-2">
				{/* LEFT SIDE, STICKY */}
				<div>
					<h1 className="text-3xl font-bold uppercase mb-3">UBC Formula Electric</h1>
					<section className="text-white/50">
						<p>&apos;22 Sensors Firmware</p>
						<p>&apos;23 Dashboard Lead</p>
						<p>&apos;24-&apos;26 Software Director</p>
					</section>
				</div>

				{/* RIGHT SIDE */}
				<div className="grid grid-cols-2 gap-x-4 col-span-2">
					<p className="col-span-2 text-sm mb-4">
						UBC Formula Electric is a student design team based out of the University of British Columbia in Vancouver, BC. Each year, we build an electric race car and compete with students from universities across North America. Software team defines the dynamic behaviour of the vehicle through our five subteams: Vehicle Firmware, Battery Management System, Controls, Telemetry and Validation. In this pursuit, we work with members of the electrical and mechanical teams to achieve vehicle performance characteristics.
					</p>

					<a href="https://github.com/UBCFormulaElectric/Consolidated-Firmware" rel="noopener noreferrer" target="_blank" className="group">
						<div className="flex flex-row items-center gap-x-2">
							<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" className="size-6">
								<g> <path fillRule="evenodd" clipRule="evenodd" d="M8.97318 0C4.01125 0 0 4.125 0 9.22819C0 13.3074 2.57014 16.7604 6.13561 17.9826C6.58139 18.0744 6.74467 17.784 6.74467 17.5397C6.74467 17.3257 6.72998 16.5924 6.72998 15.8284C4.23386 16.3785 3.71406 14.7283 3.71406 14.7283C3.31292 13.6588 2.71855 13.3839 2.71855 13.3839C1.90157 12.8186 2.77806 12.8186 2.77806 12.8186C3.68431 12.8797 4.15984 13.7659 4.15984 13.7659C4.96194 15.1714 6.25445 14.7742 6.77443 14.5297C6.84863 13.9339 7.08649 13.5214 7.33904 13.2922C5.3482 13.0783 3.25359 12.2839 3.25359 8.73919C3.25359 7.73081 3.60992 6.90581 4.17453 6.26419C4.08545 6.03506 3.77339 5.08763 4.2638 3.81956C4.2638 3.81956 5.02145 3.57506 6.7298 4.76681C7.4612 4.56481 8.21549 4.46205 8.97318 4.46119C9.73084 4.46119 10.5032 4.56825 11.2164 4.76681C12.9249 3.57506 13.6826 3.81956 13.6826 3.81956C14.173 5.08763 13.8607 6.03506 13.7717 6.26419C14.3511 6.90581 14.6928 7.73081 14.6928 8.73919C14.6928 12.2839 12.5982 13.0629 10.5924 13.2922C10.9194 13.5825 11.2015 14.1324 11.2015 15.0034C11.2015 16.2409 11.1868 17.2341 11.1868 17.5395C11.1868 17.784 11.3503 18.0744 11.7959 17.9827C15.3613 16.7602 17.9315 13.3074 17.9315 9.22819C17.9462 4.125 13.9202 0 8.97318 0Z" fill="white" /> </g>
							</svg>
							<p className="group-hover:text-blue-500 transition-colors"> UBCFormulaElectric/Consolidated-Firmware </p>
						</div>
					</a>

					<a href="https://ubcformulaelectric.com/" rel="noopener noreferrer" target="_blank" className="group">
						<div className="flex flex-row items-center gap-x-2 group-hover:bg-blue-400/20">
							<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" className="size-6">
								<g>
									<path d="M9.89252 6.51599C10.3799 6.74868 10.8043 7.09494 11.1301 7.52567C11.4559 7.9564 11.6736 8.45903 11.7648 8.99133C11.8561 9.52363 11.8183 10.0701 11.6546 10.5847C11.4909 11.0994 11.206 11.5672 10.824 11.949L7.44902 15.324C6.81608 15.9569 5.95763 16.3125 5.06252 16.3125C4.16741 16.3125 3.30896 15.9569 2.67602 15.324C2.04308 14.691 1.6875 13.8326 1.6875 12.9375C1.6875 12.0424 2.04308 11.1839 2.67602 10.551L3.99377 9.23324M14.0063 8.76674L15.324 7.44899C15.957 6.81605 16.3125 5.9576 16.3125 5.06249C16.3125 4.16738 15.957 3.30893 15.324 2.67599C14.6911 2.04305 13.8326 1.68747 12.9375 1.68747C12.0424 1.68747 11.184 2.04305 10.551 2.67599L7.17602 6.05099C6.794 6.43274 6.50917 6.9006 6.34546 7.41526C6.18175 7.92992 6.14393 8.47635 6.2352 9.00865C6.32646 9.54095 6.54414 10.0436 6.86994 10.4743C7.19574 10.905 7.62015 11.2513 8.10752 11.484" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
								</g>
							</svg>
							<p className="group-hover:text-blue-400 transition-colors">ubcformulaelectric.com</p>
						</div>
					</a>

					<hr className="col-span-2 my-4 opacity-35" />

					<h2 className="col-span-2 font-bold text-xl">MY PROJECTS</h2>

					<h2 className="col-span-2 font-bold text-xl">SOFTWARE TEAM</h2>
					<img alt="Software Team 2022" src="/formula/software_team_22.jpg" className="mb-4" />
					<img alt="Software Team 2023" src="/formula/software_team_23.JPG" className="mb-4" />
					<img alt="Software Team 2024" src="/formula/software_team_24.png" className="mb-4" />
					<div className="w-full h-full bg-white/10 grid place-items-center">
						<p className="font-bold text-lg">&apos;26</p>
					</div>

					<h2 className="col-span-2 font-bold text-xl">COMPETITION</h2>
					<img src="/formula/comp_23.png" alt="" className="mb-4" />
					<img src="/formula/comp_24.jpg" alt="" className="mb-4" />
					<img src="/formula/comp_25.jpg" alt="" className="mb-4" />
					<div className="w-full h-full bg-white/10 grid place-items-center">
						<p className="font-bold text-lg">&apos;26</p>
					</div>
				</div>
			</article>
		</main>
	);
}