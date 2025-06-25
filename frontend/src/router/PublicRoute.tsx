import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const PublicRoute = () => {
    const isAuth = useSelector((state: any) => state.auth.isAuth);
    return isAuth ? <Navigate to="/app" replace /> : <Outlet />;
};

export default PublicRoute;
