import React from "react";
import { Link } from "react-router-dom";

type Props = {};

const Home = (props: Props) => {
	return (
		<div>
			<div className="relative isolate px-6 pt-14 lg:px-8 -z-10"></div>
			<div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
				<div className="hidden sm:mb-8 sm:flex sm:justify-center">
					<div className="relative rounded-full px-3 py-1 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
						Announcing our next round of funding.
						<Link to="/" className="font-semibold text-indigo-600">
							<span
								className="absolute inset-0"
								aria-hidden="true"
							></span>
							Read more <span aria-hidden="true">&rarr;</span>
						</Link>
					</div>
				</div>
				<div className="text-center">
					<h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
						Together with Beriflapp you can!
					</h1>
					<p className="mt-6 text-lg leading-8 text-gray-600">
						Don't let your ideas in the shower, bring them to life
						with us.
					</p>
					<div className="mt-10 flex items-center justify-center gap-x-6">
						<Link
							to="/"
							className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
						>
							Let's collaborate
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Home;
