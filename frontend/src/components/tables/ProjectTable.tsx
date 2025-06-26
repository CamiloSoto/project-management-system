import {Link} from "react-router-dom";

import useProject from "../../hooks/useProject.ts";

const ProjectTable = () => {

    const {projectList} = useProject();

    return (
        <>
            <div className="card">
                <div className="card-body">
                    <div className="table-reponsive">
                        <table className="table table-hover table-striped">
                            <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Descripcion</th>
                                <th>Manager</th>
                                <th>Estado</th>
                                <th>Prioridad</th>
                                <th></th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                projectList?.map((project: any) => (
                                    <tr key={project?._id}>
                                        <td>{project?.name}</td>
                                        <td>{project?.description}</td>
                                        <td>{project?.managerId?.name}</td>
                                        <td>{project?.status}</td>
                                        <td>{project?.priority}</td>
                                        <td>
                                            <Link className="btn btn-primary"
                                                  to={`/app/tasks?projectId=${project?._id}`}>Ver detalle</Link>
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
    );
};

export default ProjectTable;
