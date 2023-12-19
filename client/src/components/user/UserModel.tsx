import React from "react";
import { deleteUser } from "../../services/user";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import UpdateUser from "./UpdateUser";
import { UserType as User } from "./userType";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

type UserProps = {
	user: User;
	onDelete: (userId: number) => void;
	onUpdate: (updatedUser: User) => void;
};

const UserModel: React.FC<UserProps> = ({ user, onDelete, onUpdate }) => {
	const [openPopup, setOpenPopup] = useState<boolean>(false);
	const [open, setOpen] = React.useState(false);

	const handleUpdate = () => {
		setOpenPopup(true);
	};

	const handleClose = (
		event?: React.SyntheticEvent | Event,
		reason?: string
	) => {
		if (reason === "clickaway") {
			return;
		}

		setOpen(false);
	};

	const deletedSuccessfully = () =>
		toast.success("Successfully deleted", {
			position: "top-center",
			autoClose: 500,
			hideProgressBar: true,
			closeOnClick: true,
			pauseOnHover: true,
			progress: undefined,
			theme: "light",
		});

	const handleDelete = async () => {
		try {
			const confirmDlete = window.confirm(
				`Are you sure you want to delete ${user.firstName} ${user.lastName}`
			);
			if (confirmDlete) {
				await deleteUser(user.id);
				deletedSuccessfully();
				setOpen(true);
				onDelete(user.id);
			}
		} catch (error) {
			console.error("Error deleting user:", error);
		}
	};
	const handleUpdateUser = (updatedUser: User) => {
		onUpdate(updatedUser);
	};

	return (
		<>
			<tr
				key={user.id}
				className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
			>
				<td className="w-4 p-4"></td>
				<th
					scope="row"
					className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
				>
					{user.firstName} {user.lastName}
				</th>
				<td className="px-6 py-4">{user.email}</td>
				<td className="px-6 py-4">{user.city}</td>
				<td className="px-6 py-4 text-center">
					<button
						className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-6 mx-4 rounded-lg"
						onClick={handleUpdate}
					>
						Update
					</button>

					<button
						className="bg-red-700 hover:bg-red-800 text-white font-bold py-2 px-6 mx-4 rounded-lg"
						onClick={handleDelete}
					>
						Delete
					</button>
				</td>
				<ToastContainer />
				<ToastContainer />
				<UpdateUser
					user={user}
					openPopup={openPopup}
					setOpenPopup={setOpenPopup}
					onUpdate={handleUpdateUser}
				/>
			</tr>
		</>
	);
};
export default UserModel;
