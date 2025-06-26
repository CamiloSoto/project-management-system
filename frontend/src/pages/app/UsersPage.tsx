import useUser from "../../hooks/useUser";
import {useEffect} from "react";

import UserTable from "../../components/tables/UserTable";
import UserModal from "../../components/modals/UserModal.tsx";

const UsersPage = () => {

    const {getUserList} = useUser();

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
