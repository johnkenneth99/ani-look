import { cn } from "@/utils";
import Image from "next/image";

export default async function Home() {
	const idList = [1, 24, 50, 5];
	// const idList = [1];

	const requests = idList.map((id) =>
		fetch(`https://api.jikan.moe/v4/anime/${id}`).then((response) => response.json()),
	);

	const result = await Promise.all(requests);
	console.log(result.at(3));

	const modifiedResult = result.map(({ data }) => {
		console.log(data);
		const { title } = data;

		return {
			img: data?.images.jpg.large_image_url,
			title,
		};
	});

	console.log(modifiedResult);

	const test = result.map((data) => data.data?.images.jpg.large_image_url).filter((pic) => pic);
	return (
		<main className="mx-auto min-h-screen max-w-[1280px] border-2 border-red-400 bg-white p-24">
			<div className="h-56 bg-slate-500 p-3">
				<div className="h-[200px] w-[200px] rounded-full bg-slate-300"></div>
			</div>
			<div className="py-3">
				<fieldset className="border-t-2 border-slate-500">
					<legend className="font-medium uppercase tracking-tighter">Completed Anime&nbsp;&nbsp;</legend>
				</fieldset>
			</div>

			<div className="group/card-list flex border-8 border-red-800 p-6">
				{!!modifiedResult.length &&
					modifiedResult.map(({ title, img }, index) => {
						return (
							<div
								key={title}
								className={cn(
									"group/card relative h-[200px] w-[150px] overflow-hidden border-2 border-green-400 duration-100 hover:z-10 hover:scale-150 group-hover/card-list:ml-0",
									{ "-ml-24": !!index },
								)}
							>
								<h1 className="relative z-10 text-[8px] uppercase opacity-0 delay-200 duration-200 group-hover/card:opacity-100">
									{title}
								</h1>
								<Image
									className="opacity-100 delay-200 duration-300 group-hover/card:-mt-10 group-hover/card:opacity-0"
									alt="background"
									src={img}
									fill
								/>
							</div>
						);
					})}
			</div>

			<h1>Currently Watching</h1>

			<div className="group flex border-8 border-red-800 p-6">
				{!!test.length &&
					test.map((link, index) => {
						return (
							<div
								key={link}
								className={cn(
									"relative h-[200px] w-[150px] border-2 border-green-100 duration-[250ms] hover:z-10 hover:scale-150 group-hover:ml-0",
									{ "-ml-24": !!index },
								)}
							>
								<Image alt="background" src={link} fill />
							</div>
						);
					})}
			</div>

			<h1>Currently Watching</h1>

			<div className="group flex border-8 border-red-800 p-6">
				{!!test.length &&
					test.map((link, index) => {
						return (
							<div
								key={link}
								className={cn(
									"relative h-[200px] w-[150px] border-2 border-green-100 duration-[250ms] hover:z-10 hover:scale-150 group-hover:ml-0",
									{ "-ml-24": !!index },
								)}
							>
								<Image alt="background" src={link} fill />
							</div>
						);
					})}
			</div>
		</main>
	);
}
