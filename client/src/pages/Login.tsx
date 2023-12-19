import BlurEffect from "../components/BlurEffect";
import Header from "../components/Header";
import Login from "../components/Login";

type Props = {};

const LoginPage = (props: Props) => {
	return (
		<BlurEffect>
			<Header />
			<Login />
		</BlurEffect>
	);
};

export default LoginPage;
