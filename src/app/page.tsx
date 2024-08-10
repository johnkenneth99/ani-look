import Image from "next/image";

export default async function Home() {
	const idList = [1, 24, 50, 4, 5];
	// const idList = [1];

	const requests = idList.map((id) =>
		fetch(`https://api.jikan.moe/v4/anime/${id}`).then((response) => response.json())
	);

	const result = await Promise.all(requests);

	console.log(result.map((data) => data.data?.images.jpg.large_image_url).filter((pic) => pic));

	const test = result.map((data) => data.data?.images.jpg.large_image_url).filter((pic) => pic);
	return (
		<main className="flex min-h-screen flex-col items-center justify-center p-24 bg-white border-2 border-red-400">
			<h1>Currently Watching</h1>
			<div className="group flex  border-8 border-red-800 p-6 ">
				{!!test.length &&
					test.map((link, index) => {
						const temp = index ? "-ml-24" : "";
						console.log(temp);
						return (
							<div
								key={link}
								className={`${temp} relative duration-[250ms] group-hover:ml-0
								hover:z-10
								hover:scale-150 border-2 border-green-100 w-[150px] h-[200px]`}
							>
								<Image
									alt="background"
									src={link}
									fill
									// width={150}
									// height={50}
									// style={{ objectFit: "contain" }}
								/>
							</div>
						);
					})}
			</div>
		</main>
	);
}
