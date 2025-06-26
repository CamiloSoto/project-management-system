import useUser from "../../hooks/useUser";

const UserTable = () => {
    const {userList, setUserSelected} = useUser();

    return (
        <>
            <div className="card">
                <div className="card-body">
                    <div className="table-reponsive">
                        <table className="table table-hover table-striped">
                            <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Correo</th>
                                <th>Rol</th>
                                <th></th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                userList?.map((user: any) => (
                                    <tr key={user?._id}>
                                        <td>{user?.name}</td>
                                        <td>{user?.email}</td>
                                        <td>{user?.role}</td>
                                        <td>
                                            <button className="btn btn-primary"
                                                    onClick={() => setUserSelected(user)}>Ver Detalle
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            }
                            </tbody>
                        </table>

                    </div>
                </div>
            </div>
        </>
    )
        ;
};

export default UserTable;
