import {useNavigate} from "react-router-dom";
import {useEffect} from "react";

import UserTable from "../../components/tables/UserTable";
import UserModal from "../../components/modals/UserModal";
import useUser from "../../hooks/useUser";
import useAuth from "../../hooks/useAuth";

const UsersPage = () => {
    const {getUserList} = useUser();
    const {user} = useAuth();
    const navigate = useNavigate();


    useEffect(() => {
        if (user && user.role !== "admin") {
            navigate("/app/projects");
        }
    }, [user, navigate]);

    useEffect(() => getUserList, []);
    return (
        <>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h3>Usuarios</h3>
                <div className="d-flex gap-2">
                    <UserModal/>
                </div>
            </div>

            <UserTable/>
        </>
    );
};

export default UsersPage;
