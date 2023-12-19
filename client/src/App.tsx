import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import LoginPage from "./pages/Login";
import SignUpPage from "./pages/Signup";
import PrivateRoutes from "./utils/PrivateRoutes";
import Home from "./pages/Home";
import Products from "./pages/Products";
import CartPage from "./pages/CartPage";
function App() {
	return (
		<Routes>
			<Route element={<PrivateRoutes />}>
				<Route path="/dashboard" element={<Dashboard />} />
			</Route>
			<Route path="/" element={<Home />} />
			<Route path="/cart" element={<CartPage />} />
			<Route path="/products" element={<Products />} />
			<Route path="/signin" element={<LoginPage />} />
			<Route path="signup" element={<SignUpPage />} />
			<Route path="*" element={<p>Theres nothing here.</p>} />
		</Routes>
	);
}
export default App;
