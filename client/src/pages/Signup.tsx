import BlurEffect from "../components/BlurEffect";
import Header from "../components/Header";
import Signup from "../components/Signup";

type Props = {};

const SignUpPage = (props: Props) => {
	return (
		<BlurEffect>
			<Header />
			<Signup />
		</BlurEffect>
	);
};

export default SignUpPage;
