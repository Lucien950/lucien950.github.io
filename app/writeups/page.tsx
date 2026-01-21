import Link from "next/link";
import { ReactNode } from "react";

function WriteupLink({ children, link }: { children: ReactNode, link: string }) {
	return <Link href={`/writeups/${link}`}>{children}</Link>
}

export default function Writeups() {
	return (
		<div>
			<h1>Codeforces</h1>
			<ul className="list-disc list-inside">
				<li></li>
			</ul>
			<h1>LeetCode</h1>
			<ul className="list-disc list-inside">
				<li><WriteupLink link="/lc/312">312- Burst Balloons</WriteupLink></li>
			</ul>
		</div>
	);
}