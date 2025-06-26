import {Outlet} from "react-router-dom";

const AuthLayout = () => {
    return (
        <>
            <div className="container mt-5">
                <div className="row">
                    <div className="col-md-8 mx-auto">
                        <div className="card">
                            <div className="card-body">
                                <Outlet/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AuthLayout;
