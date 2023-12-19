import React from "react";
import UserDataTable from "../components/user/UserDataTable";
import Header from "../components/Header";
import UpdateUser from "../components/user/UpdateUser";

type Props = {};

const Dashboard = (props: Props) => {
	return (
		<>
			<Header />
			<UserDataTable />;
		</>
	);
};

export default Dashboard;
