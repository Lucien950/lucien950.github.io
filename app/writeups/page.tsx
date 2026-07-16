import Link from "next/link";
import { ReactNode } from "react";
import { albra, albra_text } from "../fonts";

function WriteupLink({ children, link }: { children: ReactNode, link: string }) {
	return <Link href={`/writeups/${link}`} className="border border-white/30 hover:border-blue-400 transition-colors p-2 grow shrink-0">
		{children}
	</Link>
}

function LeetcodeLink({ children, number }: { children: ReactNode, number: number }) {
	return <WriteupLink link={`/lc/${number}`}>
		<span className="text-white/40">{number} /</span> {children}
	</WriteupLink>
}

export default function Writeups() {
	return (
		<main>
			<img src="/cp/main.jpeg" className="w-full h-150 object-cover" alt="" />

			<section className="mx-4 my-4">
				<div className="flex flex-wrap items-end flex-row">
					<h1 className={`text-8xl uppercase font-medium leading-[0.8] mr-4 ${albra.className}`}>Codeforces</h1>
					<WriteupLink link="/cf/1062">Round #1062</WriteupLink>
					<WriteupLink link="/cf/1071">Round #1071</WriteupLink>
					<WriteupLink link="/cf/1109">Round #1109</WriteupLink>
					<WriteupLink link="/cf/edu187">Educational #187</WriteupLink>
					<div className="grow-999"></div>
				</div>

				<div className="flex flex-wrap items-end flex-row-reverse">
					<h1 className={`text-8xl uppercase font-medium leading-[0.8] ml-4 ${albra.className}`}>LeetCode</h1>
					<LeetcodeLink number={312}>Burst Balloons</LeetcodeLink>
					<LeetcodeLink number={1411}>Number of Ways to Paint N x 3 Grid</LeetcodeLink>
					<div className="grow-999"></div>
				</div>
			</section>
		</main>
	);
}