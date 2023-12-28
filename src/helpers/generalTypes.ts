interface GeneralInfoInterface {
    name: string,
    email: string,
    phone: string,
}

interface EducationInterface {
    school: string,
    degree: string,
    start_date: string,
    end_date: string,
    location: string,
    id: string,
}

interface ResponsibilityInterface {
    id: string,
    value: string,
}

interface ExperienceInterface {
    company: string,
    position: string,
    start_date: string,
    end_date: string,
    location: string,
    responsibilities: ResponsibilityInterface[],
    id: string,
}

interface State {
    generalInfo: GeneralInfoInterface;
    education: EducationInterface[];
    experience: ExperienceInterface[];
}

export type {GeneralInfoInterface, EducationInterface, ExperienceInterface, ResponsibilityInterface, State};
