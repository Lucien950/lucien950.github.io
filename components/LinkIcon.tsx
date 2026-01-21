import Link from "next/link";

export default function LinkIcon({ href, name, size = 32 }: { href: string, name: string, size?: number }) {
	return (
		<Link href={href} target="_blank">
			<span className="inline-flex flex-row items-center gap-x-1 leading-0 border border-white/20 hover:border-white transition-colors bg-red-300/10 rounded-md px-1 py-1.5 overflow-clip">
				<img src={`https://s2.googleusercontent.com/s2/favicons?domain=${href}&sz=${size}`} className="size-4 !my-0" alt="" />
				{name}
			</span>
		</Link>
	);
}