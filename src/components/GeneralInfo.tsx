import { GeneralInfoInterface } from "../helpers/generalTypes";
import styles from "../styles/GeneralInfo.module.css";

export interface GeneralInfoProps extends GeneralInfoInterface {
    onChange(e: React.ChangeEvent<HTMLInputElement>): void,
}

function GeneralInfo({name, email, phone, onChange}: GeneralInfoProps) {
    return (
        <fieldset className={styles.personalInfo}>
            <legend>Personal Info</legend>
            <label htmlFor="name">Name:</label>
            <input type="text" name="name" id="name" value={name} onChange={onChange} />
            <label htmlFor="email">Email:</label>
            <input type="email" name="email" id="email" value={email} onChange={onChange} />
            <label htmlFor="phone">Phone:</label>
            <input type="tel" name="phone" id="phone" value={phone} onChange={onChange} />
        </fieldset>
    );
}

export default GeneralInfo;