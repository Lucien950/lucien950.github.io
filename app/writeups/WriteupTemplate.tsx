import LinkIcon from "~/components/LinkIcon";

export default function WriteupTemplate(
	{ children, title, tags, href, href_name }: { children: React.ReactNode, title: string, tags: string[], href?: string, href_name?: string }
) {
	return (
		<div>
			<div
				className="w-full mb-14"
				// TODO randomized gradients
				style={{ background: "linear-gradient(115deg,#3c7161 7%, #243e38 40%, rgba(28, 28, 30, 1) 66%)" }}
			>
				<div className="max-w-[65ch] mx-auto pt-14 pb-8">
					<h1 className="font-medium text-6xl mb-6">{title}</h1>
					<div className="flex flex-row items-center gap-x-4">
						{
							href && href_name && <LinkIcon href={href} name={href_name} />
						}
						{
							tags.map((tag) => (
								<span className="inline-block rounded-full px-3 py-2 bg-white/20 text-sm border border-white" key={tag}>
									{tag}
								</span>
							))
						}
					</div>
				</div>
			</div>
			{children}
		</div>
	);
}