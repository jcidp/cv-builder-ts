import GeneralInfo from "./GeneralInfo";
import Experience from "./Experience";
import Education from "./Education";
import { EducationInterface, ExperienceInterface, GeneralInfoInterface } from "../helpers/generalTypes";

interface FormProps{
    generalInfo: GeneralInfoInterface,
    experience: ExperienceInterface[],
    education: EducationInterface[],
    handleGeneralInputChange(e: React.ChangeEvent<HTMLInputElement>) : void,
    handleExperienceInputChange(e: React.ChangeEvent<HTMLInputElement>): void,
    handleEducationInputChange(e: React.ChangeEvent<HTMLInputElement>): void,
    handleRemoveElement(e: React.MouseEvent<HTMLButtonElement, MouseEvent> | React.MouseEvent<SVGSVGElement, MouseEvent>): void,
    handleAddElement(e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void,
}

function Form({generalInfo, experience, education, handleGeneralInputChange, handleExperienceInputChange, 
    handleEducationInputChange, handleRemoveElement, handleAddElement}: FormProps) {
    return (
        <form>
            <GeneralInfo {...generalInfo} onChange={handleGeneralInputChange} />
            <Experience experience={experience} onChange={handleExperienceInputChange} onDelete={handleRemoveElement} onAdd={handleAddElement} />
            <Education education={education} onChange={handleEducationInputChange} onDelete={handleRemoveElement} onAdd={handleAddElement} />
        </form>
    );
}

export default Form;