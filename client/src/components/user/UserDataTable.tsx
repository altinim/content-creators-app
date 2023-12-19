import React, { useEffect, useState } from "react";
import { getAllUsers } from "../../services/user";
import UserModel from "./UserModel";
import { UserType as User } from "./userType";

const UserDataTable: React.FC = () => {
	const [users, setUsers] = useState<User[]>([]);
	const [filteredUsers, setFilteredUsers] = useState<User[]>(users);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const usersData = await getAllUsers();
				setUsers(usersData);
				setFilteredUsers(usersData);
			} catch (error: any) {
				console.error("Error fetching user data:", error.message);
			}
		};

		fetchData();
	}, []);

	const handleSearch = (searchTerm: string) => {
		const filtered = users.filter(
			(user) =>
				user.firstName
					.toLowerCase()
					.includes(searchTerm.toLowerCase()) ||
				user.lastName
					.toLowerCase()
					.includes(searchTerm.toLowerCase()) ||
				`${user.firstName} ${user.lastName}`
					.toLowerCase()
					.includes(searchTerm.toLowerCase()) ||
				user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
				user.city.toLowerCase().includes(searchTerm.toLowerCase())
		);
		setFilteredUsers(filtered);
	};
	const handleDeleteUser = (userId: number) => {
		setFilteredUsers((prevUsers) =>
			prevUsers.filter((filteredUser) => filteredUser.id !== userId)
		);
	};
	const handleUpdateUser = (updatedUser: User) => {
		setFilteredUsers((prevUsers) =>
			prevUsers.map((user) =>
				user.id === updatedUser.id ? updatedUser : user
			)
		);
	};

	return (
		<div className="relative overflow-x-auto shadow-md rounded-lg m-8">
			<div className="pb-4 bg-white dark:bg-gray-900 bg-opacity-70 p-8">
				<label className="sr-only">Search</label>
				<div className="relative mt-1">
					<div className="absolute inset-y-0 left-20 flex items-center pl-3 pointer-events-none">
						<svg
							className="w-4 h-4 text-gray-500 dark:text-gray-400"
							aria-hidden="true"
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 20 20"
						>
							<path
								stroke="currentColor"
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
							/>
						</svg>
					</div>
					<div className="flex align-middle">
						<h2 className="text-white px-2 font-black">
							User List
						</h2>
						<input
							type="text"
							id="table-search"
							className="block text-sm pl-8 py-1 text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
							placeholder="Filter by first name, email, city"
							onChange={(e) => handleSearch(e.target.value)}
						/>
					</div>
				</div>
			</div>
			<table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
				<thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
					<tr>
						<th scope="col" className="p-4"></th>
						<th scope="col" className="px-6 py-3">
							Full name
						</th>
						<th scope="col" className="px-6 py-3">
							email
						</th>

						<th scope="col" className="px-6 py-3">
							City
						</th>
						<th scope="col" className="px-6 py-3 text-center">
							Action
						</th>
					</tr>
				</thead>
				<tbody>
					{filteredUsers.map((user) => (
						<UserModel
							key={user.id}
							user={user}
							onDelete={handleDeleteUser}
							onUpdate={handleUpdateUser}
						/>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default UserDataTable;
