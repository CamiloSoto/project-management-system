import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";

import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";

import AuthLayout from "../layouts/AuthLayout.tsx";
import AppLayout from "../layouts/AppLayout.tsx";

import RegisterPage from "../pages/auth/RegisterPage.tsx";
import LoginPage from "../pages/auth/LoginPage.tsx";

import ProjectsPage from "../pages/app/ProjectsPage.tsx";
import TasksPage from "../pages/app/TasksPage.tsx";
import UsersPage from "../pages/app/UsersPage.tsx";

const AppRouter = () => {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/app" element={<PrivateRoute/>}>
                        <Route element={<AppLayout/>}>
                            <Route index element={<Navigate to="/app/projects" replace/>}/>
                            <Route path="projects" element={<ProjectsPage/>}/>
                            <Route path="tasks" element={<TasksPage/>}/>
                            <Route path="users" element={<UsersPage/>}/>
                        </Route>
                    </Route>

                    <Route path="/auth" element={<PublicRoute/>}>
                        <Route element={<AuthLayout/>}>
                            <Route index element={<Navigate to="/auth/login" replace/>}/>
                            <Route path="/auth/login" element={<LoginPage/>}/>
                            <Route path="/auth/register" element={<RegisterPage/>}/>
                        </Route>
                    </Route>

                    <Route path="*" element={<Navigate to="/app" replace/>}/>
                </Routes>
            </BrowserRouter>
        </>
    );
};

export default AppRouter;
