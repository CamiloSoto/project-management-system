import {useSelector} from "react-redux";
import {Navigate, Outlet} from "react-router-dom";

const PrivateRoute = () => {
    const isAuth = useSelector((state: any) => state.auth.isAuth);
    return isAuth ? <Outlet/> : <Navigate to="/auth/login" replace/>;
};

export default PrivateRoute;
