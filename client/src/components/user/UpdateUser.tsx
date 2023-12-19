import { useState } from "react";
import { UserType as User } from "./userType";
import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import { updateUser } from "../../services/user";
import kosovoCities from "../../data/kosovoCities";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type Props = {
	user: User;
	openPopup: boolean;
	setOpenPopup: React.Dispatch<React.SetStateAction<boolean>>;
	onUpdate: (updatedUser: User) => void;
};

const UpdateUser: React.FC<Props> = (props) => {
	const { user, openPopup, setOpenPopup, onUpdate } = props;

	const [formData, setFormData] = useState({
		firstName: user.firstName,
		lastName: user.lastName,
		email: user.email,
		city: user.city,
	});
	const updatedSuccessfully = () => {
		toast.success("Successfully updated", {
			toastId: user.id,
			position: "top-center",
			autoClose: 500,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
			theme: "light",
		});
	};

	const handleChange = (
		event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => {
		setFormData({
			...formData,
			[event.target.name]: event.target.value,
		});
	};

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		await updateUser(user.id, formData);
		updatedSuccessfully();
		onUpdate({ ...user, ...formData });
		setOpenPopup(false);
	};

	return (
		<div>
			<Dialog open={openPopup} fullWidth maxWidth="md">
				<DialogTitle>
					<DialogContent>
						<div>
							<button
								className="float-right  text-2xl"
								onClick={() => setOpenPopup(false)}
							>
								&#x2716;
							</button>
						</div>
						<div className="w-full">
							<form onSubmit={handleSubmit}>
								<div>
									<div className="border-b border-gray-900/10 pb-12">
										<h1 className="font-semibold leading-7 text-2xl text-gray-900">
											User details for as {user.firstName}{" "}
											{user.lastName}
										</h1>

										<div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
											<div className="sm:col-span-3">
												<label className="block text-sm font-medium leading-6 text-gray-900">
													First name
												</label>
												<div className="mt-2">
													<input
														type="text"
														name="firstName"
														id="first-name"
														value={
															formData.firstName
														}
														onChange={handleChange}
														required
														className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
													/>
												</div>
											</div>

											<div className="sm:col-span-3">
												<label className="block text-sm font-medium leading-6 text-gray-900">
													Last name
												</label>
												<div className="mt-2">
													<input
														type="text"
														name="lastName"
														id="last-name"
														value={
															formData.lastName
														}
														onChange={handleChange}
														required
														className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
													/>
												</div>
											</div>

											<div className="sm:col-span-6 w-full">
												<label className="block text-sm font-medium leading-6 text-gray-900">
													Email address
												</label>
												<div className="mt-2">
													<input
														id="email"
														name="email"
														type="email"
														value={formData.email}
														onChange={handleChange}
														required
														className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
													/>
												</div>
											</div>
											<div className="sm:col-span-6 w-full">
												<label className="block text-sm font-medium leading-6 text-gray-900">
													City
												</label>
												<div className="mt-2 w-full">
													<select
														id="city"
														name="city"
														value={formData.city}
														onChange={handleChange}
														className="block rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 min-w-full ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
													>
														<option
															value={user.city}
														>
															{formData.city}
														</option>
														{kosovoCities.map(
															(city) => (
																<option
																	key={city}
																	value={city}
																>
																	{city}
																</option>
															)
														)}
													</select>
												</div>
											</div>
										</div>
									</div>
								</div>
								<div className="mt-6 flex items-center justify-end gap-x-6">
									<button
										type="button"
										className="text-sm font-semibold leading-6 text-gray-900"
										onClick={() => setOpenPopup(false)}
									>
										Cancel
									</button>
									<button
										type="submit"
										className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
									>
										Save
									</button>
								</div>
							</form>
						</div>{" "}
					</DialogContent>
				</DialogTitle>
			</Dialog>
		</div>
	);
};

export default UpdateUser;
