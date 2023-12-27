import GeneralInfoView from "./GeneralInfoView";
import ExperienceView from "./ExperienceView";
import EducationView from "./EducationView";
import { EducationInterface, ExperienceInterface, GeneralInfoInterface } from "../helpers/generalTypes";

interface ViewProps {
    generalInfo: GeneralInfoInterface,
    experience: ExperienceInterface[],
    education: EducationInterface[],
}

function View({generalInfo, experience, education}: ViewProps) {
    return (
        <>
            <GeneralInfoView {...generalInfo} />
            <ExperienceView experience={experience} />
            <EducationView education={education} />
        </>
    );
}

export default View;