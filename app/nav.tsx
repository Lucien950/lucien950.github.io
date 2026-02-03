"use client"
import Link from "next/link";
import { albra_text } from "./fonts";
import { useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";

export default function Nav() {
	const pathname = usePathname();

	const show = useMemo(() => {
		if (pathname == "/") return false;
		return true;
	}, [pathname])


	const [bgAlpha, setBgAlpha] = useState(false);
	useEffect(() => {
		const h = (e: Event) => {
			setBgAlpha(window.scrollY > 10);
		};
		window.addEventListener('scroll', h);
		return () => window.removeEventListener('scroll', h);
	}, [])

	return (
		<nav
			className="border border-white/10 py-2 fixed w-full backdrop-blur-md z-10 transition-all duration-700"
			style={{
				top: show ? '0' : '-100%',
				backgroundColor: bgAlpha ? 'rgba(0, 0, 0, 0.7)' : 'rgba(0, 0, 0, 1)',
			}}
		>
			<div className="mx-auto container">
				<Link href="/" className={`${albra_text.className}`}>
					Edwin
				</Link>
			</div>
		</nav>
	);
}