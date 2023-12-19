import React from "react";
import BlurEffect from "../components/BlurEffect";
import Header from "../components/Header";
import Home from "../components/Home";
type Props = {};

const HomePage = (props: Props) => {
	return (
		<BlurEffect>
			<Header />
			<Home />
		</BlurEffect>
	);
};

export default HomePage;
