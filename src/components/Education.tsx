import { EducationInterface } from "../helpers/generalTypes";
import styles from "../styles/Education.module.css";

interface EducationHandlers {
    onChange(e: React.ChangeEvent<HTMLInputElement>): void,
    onDelete(e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void,
}

interface EducationEntryProps extends EducationInterface, EducationHandlers {}

function EducationEntry({school, degree, start_date, end_date, location, id, onChange, onDelete}: EducationEntryProps) {
    return (
        <div className={styles.educationEntry}>
            <label htmlFor={"school" + id}>School:</label>
            <input type="text" name="school" id={"school" + id} value={school} onChange={onChange} />
            <label htmlFor={"degree" + id}>Degree:</label>
            <input type="text" name="degree" id={"degree" + id} value={degree} onChange={onChange} />
            <label htmlFor={"start_date" + id}>Start Date:</label>
            <input type="date" name="start_date" id={"start_date" + id} value={start_date} onChange={onChange} />
            <label htmlFor={"end_date" + id}>End Date:</label>
            <input type="date" name="end_date" id={"end_date" + id} value={end_date} onChange={onChange} />
            <label htmlFor={"location" + id}>City:</label>
            <input type="text" name="location" id={"location" + id} value={location} onChange={onChange} />
            <button className="remove" onClick={onDelete} id={id} data-section="education">Delete degree</button>
        </div>
    )
}

export interface EducationProps extends EducationHandlers{
    education: EducationInterface[],
    onAdd(e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void,
}

function Education({education, onChange, onDelete, onAdd}: EducationProps) {
    return (
        <fieldset className="education-fieldset">
            <legend>Education</legend>
            {education.map(entry =>
                <EducationEntry key={entry.id} {...entry} onChange={onChange} onDelete={onDelete} />
            )}
            <button className="add-entry" onClick={onAdd} data-section="education">+ Add degree</button>
        </fieldset>
    )
}

export default Education;