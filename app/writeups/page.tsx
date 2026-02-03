import Link from "next/link";
import { ReactNode } from "react";
import { albra, albra_text } from "../fonts";

function WriteupLink({ children, link }: { children: ReactNode, link: string }) {
	return <Link href={`/writeups/${link}`} className="border border-white/30 hover:border-blue-400 transition-colors p-2 grow shrink-0">
		{children}
	</Link>
}

export default function Writeups() {
	return (
		<main>
			<img src="/cp/main.jpeg" className="w-full h-150 object-cover" alt="" />

			<section className="mx-4 my-4">
				<div className="flex flex-wrap items-end flex-row">
					<h1 className={`text-8xl uppercase font-medium leading-[0.8] mr-4 ${albra.className}`}>Codeforces</h1>
					<WriteupLink link="/cf/1071">Round #1071</WriteupLink>
					<div className="grow-999"></div>
				</div>

				<div className="flex flex-wrap items-end flex-row-reverse">
					<h1 className={`text-8xl uppercase font-medium leading-[0.8] ml-4 ${albra.className}`}>LeetCode</h1>
					<WriteupLink link="/lc/312">
						[312] Burst Balloons
					</WriteupLink>
					<div className="grow-999"></div>
				</div>
			</section>
		</main>
	);
}