import { getSessionStorageKey } from "./Session";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoutes = () => {
	let auth = { token: getSessionStorageKey("role") === "ADMIN" };
	return auth.token ? <Outlet /> : <Navigate to="/signin" />;
};
export default PrivateRoutes;
