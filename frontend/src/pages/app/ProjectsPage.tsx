import {useEffect} from "react";


import ProjectTable from "../../components/tables/ProjectTable.tsx";
import useProject from "../../hooks/useProject";
import ProjectModal from "../../components/modals/ProjectModal.tsx";

const ProjectsPage = () => {
    const {getProjectList} = useProject();

    useEffect(() => {
        getProjectList();
    }, []);

    return (
        <>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h3>Mis proyectos</h3>
                <div className="d-flex gap-2">
                    <ProjectModal/>
                </div>
            </div>

            <ProjectTable/>
        </>
    );
};

export default ProjectsPage;
