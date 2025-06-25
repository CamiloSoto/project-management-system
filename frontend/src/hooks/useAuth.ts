import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from 'react-router-dom';
import {loadLogin, loadLogout} from "../slices/authSlice";

const useAuth = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {user, isAuth} = useSelector((state:any) => state.auth);

    const login = (accessToken: string, refreshToken: string, user: any) => {
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        sessionStorage.setItem("login", JSON.stringify(user));

        dispatch(loadLogin(user));
        navigate('/app/projects');
    };

    const logout = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        sessionStorage.removeItem('login');
        dispatch(loadLogout());
        navigate('/auth/login');
    };

    const getAccessToken = () => localStorage.getItem('accessToken');

    const getRefreshToken = () => localStorage.getItem('refreshToken');

    return {
        user,
        isAuth,
        login,
        logout,
        getAccessToken,
        getRefreshToken
    };
};

export default useAuth;