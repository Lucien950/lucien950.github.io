import ExportedImage from "next-image-export-optimizer";

export default function WorkLayout({ children, banner_image_url }:
	{ children: Array<React.ReactNode>, banner_image_url?: string }
) {
	return (
		<main>
			<section>
				<div className="w-full h-168 object-cover mb-6 relative">
					{
						banner_image_url && <ExportedImage fill src={banner_image_url} alt="Page Banner" className="object-cover" />
					}
				</div>
			</section>

			<article className="grid grid-cols-1 lg:grid-cols-3 w-full gap-x-4 container mx-auto px-2">
				{/* LEFT SIDE, STICKY */}
				<div>
					{children[0]}
				</div>

				{/* RIGHT SIDE */}
				<div className="col-span-2">
					{children[1]}
				</div>
			</article>
		</main>
	);
}