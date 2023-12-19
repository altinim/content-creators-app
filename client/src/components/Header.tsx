import { Link } from "react-router-dom";
import {
	clearSession,
	getSessionStorageKey,
	checkSessionStorageKey,
} from "../utils/Session";
import Badge, { BadgeProps } from "@mui/material/Badge";

import IconButton from "@mui/material/IconButton";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { getUsersCartCount } from "../services/user";

const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
	"& .MuiBadge-badge": {
		right: -3,
		top: 13,
		border: `2px solid `,
		padding: "0 4px",
	},
}));

type Props = {};

const Header = (props: Props) => {
	const [cartCount, setCartCount] = useState<number>(0);

	useEffect(() => {
		const fetchCartCount = async () => {
			try {
				const userId = Number(getSessionStorageKey("id"));
				if (userId === 0) return;
				const count = await getUsersCartCount(userId);
				setCartCount(count);
			} catch (error) {
				console.error("Error fetching cart count:", error);
			}
		};

		fetchCartCount();
	}, []);

	const handleLogOut = () => {
		clearSession();
	};

	const isAdmin = () => {
		return sessionStorage.getItem("role") === "ADMIN";
	};
	return (
		<header className="inset-x-0 top-0 z-50">
			<nav
				className="flex items-center justify-between p-6 lg:px-8"
				aria-label="Global"
			>
				{" "}
				<div className="flex lg:flex-1">
					<Link to={"/"}>
						{" "}
						<span className="self-center text-2xl font-bold whitespace-nowrap text-gray-800">
							Beriflapp{" "}
						</span>
					</Link>
				</div>
				<div className="flex lg:hidden">
					<button
						type="button"
						className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
					>
						<span className="sr-only">Open main menu</span>
						<svg
							className="h-6 w-6"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							stroke="currentColor"
							aria-hidden="true"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
							/>
						</svg>
					</button>
				</div>
				<div className="hidden lg:flex lg:flex-1 lg:justify-end">
					{isAdmin() && (
						<Link
							to={"/dashboard"}
							className="text-base font-bold leading-6 px-4 text-gray-900 cursor-pointer"
						>
							{" "}
							<span aria-hidden="true">Dashboard</span>
						</Link>
					)}
					{getSessionStorageKey("role") === "USER" && (
						<Link to={"/cart"} className="-mt-2 mx-2">
							<IconButton>
								<StyledBadge
									badgeContent={cartCount}
									color="primary"
								>
									<ShoppingCartIcon />
								</StyledBadge>
							</IconButton>
						</Link>
					)}
					{getSessionStorageKey("email") && (
						<Link
							to={"/products"}
							className="text-base font-bold leading-6 px-4 text-gray-900 cursor-pointer"
						>
							{" "}
							<span aria-hidden="true">Products</span>
						</Link>
					)}

					{!checkSessionStorageKey("email") && (
						<Link
							to={"/signin"}
							className="text-base font-bold leading-6 px-4 text-gray-900 cursor-pointer"
						>
							{" "}
							<span aria-hidden="true">Sign in</span>
						</Link>
					)}
					{!checkSessionStorageKey("email") && (
						<Link
							to={"/signup"}
							className="text-base font-bold leading-6 px-4 text-gray-900 cursor-pointer"
						>
							{" "}
							<span aria-hidden="true">Sign up</span>
						</Link>
					)}
					{checkSessionStorageKey("email") && (
						<Link
							to={"/signin"}
							className="text-base font-bold leading-6 px-4 text-gray-900 cursor-pointer"
							onClick={handleLogOut}
						>
							{" "}
							<span aria-hidden="true">Log out</span>
						</Link>
					)}
				</div>
			</nav>
			<div className="lg:hidden" role="dialog" aria-modal="true">
				<div className="fixed inset-0 z-50"></div>
				<div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
					<div className="flex items-center justify-between">
						<a href="/" className="-m-1.5 p-1.5">
							<span className="sr-only">Your Company</span>
							<img
								className="h-8 w-auto"
								src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
								alt=""
							/>
						</a>
						<button
							type="button"
							className="-m-2.5 rounded-md p-2.5 text-gray-700"
						>
							<span className="sr-only">Close menu</span>
							<svg
								className="h-6 w-6"
								fill="none"
								viewBox="0 0 24 24"
								stroke-width="1.5"
								stroke="currentColor"
								aria-hidden="true"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									d="M6 18L18 6M6 6l12 12"
								/>
							</svg>
						</button>
					</div>
					<div className="mt-6 flow-root">
						<div className="-my-6 divide-y divide-gray-500/10">
							<div className="space-y-2 py-6">
								<a
									href="/"
									className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
								>
									Dashboard
								</a>
							</div>
							<div className="py-6">
								<a
									href="/"
									className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
								>
									Sign in
								</a>
								<a
									href="/"
									className="-mx-3 block rounded-lg px-3 py-2.5 text-xl font-semibold leading-7 text-gray-900 hover:bg-gray-50"
								>
									Sign up
								</a>
								<a
									href="/"
									className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
								>
									Sign out <span aria-hidden="true"></span>
								</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		</header>
	);
};

export default Header;
