export default function Link(domain: string, name: string, size: number = 64) {
	return (
		<span>
			<img src={`https://s2.googleusercontent.com/s2/favicons?domain=${domain}&sz=${size}`} alt="" />
			{name}
		</span>
	);
}