import { ExperienceInterface } from "../helpers/generalTypes";
import styles from "../styles/Experience.module.css";

interface ExperienceHandlers {
    onChange(e: React.ChangeEvent<HTMLInputElement>): void,
    onDelete(e: React.MouseEvent<HTMLButtonElement, MouseEvent> | React.MouseEvent<SVGSVGElement, MouseEvent>): void,
    onAdd(e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void,
}

interface ExperienceEntryProps extends ExperienceInterface, ExperienceHandlers {}

function ExperienceEntry({company, position, start_date, end_date, location, responsibilities, id, onChange, onDelete, onAdd}: ExperienceEntryProps) {
    const responsibilitiesList = responsibilities.map((responsibility, i) =>
        <div className={`${styles.responsibilityContainer} responsibility-container`} key={responsibility.id}>
            <input type="text" name="responsibility" id={"responsibility" + i + id} value={responsibility.value} onChange={onChange} data-index={i} data-id={responsibility.id} />
            <svg onClick={onDelete} data-section="responsibilities" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>delete</title><path data-section="responsibilities" d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z" /></svg>
        </div>
    );

    return (
        <div className={`${styles.experienceEntry} experience-entry`}>
            <label htmlFor={"company" + id}>Company:</label>
            <input type="text" name="company" id={"company" + id} value={company} onChange={onChange} />
            <label htmlFor={"position" + id}>Position:</label>
            <input type="text" name="position" id={"position" + id} value={position} onChange={onChange} />
            <label htmlFor={"start_date" + id}>Start Date:</label>
            <input type="date" name="start_date" id={"start_date" + id} value={start_date} onChange={onChange} />
            <label htmlFor={"end_date" + id}>End Date:</label>
            <input type="date" name="end_date" id={"end_date" + id} value={end_date} onChange={onChange} />
            <label htmlFor={"location" + id}>City:</label>
            <input type="text" name="location" id={"location" + id} value={location} onChange={onChange} />
            <div className={styles.responsibilities}>
                <p>Responsibilities:</p>
                {responsibilitiesList}
                <div className={styles.btnContainer}>
                    <button className={styles.addResponsibility} onClick={onAdd} data-section="responsibilities">+</button>
                </div>
            </div>
            <button className="remove" id={id} onClick={onDelete} data-section="experience">Delete position</button>
        </div>
    )
}

export interface ExperienceProps extends ExperienceHandlers {
    experience: ExperienceInterface[],
}

function Experience({experience, onChange, onDelete, onAdd}: ExperienceProps) {
    return (
        <fieldset className="experience-fieldset">
            <legend>Experience</legend>
            {experience.map(entry =>
                <ExperienceEntry key={entry.id} {...entry} onChange={onChange} onDelete={onDelete} onAdd={onAdd} />
            )}
            <button className="add-entry" onClick={onAdd} data-section="experience">+ Add position</button>
        </fieldset>
    );
}

export default Experience;