import { ExperienceInterface } from "../helpers/generalTypes";

function ExperienceEntryView({company, position, start_date, end_date, location, responsibilities}: ExperienceInterface) {
    const responsibilityList = responsibilities.map(responsibility => 
        <li key={responsibility.id}>{responsibility.value}</li>
    );
    
    return (<div className="experience">
        <p className="bold">{company}</p>
        <p className="text-right">{start_date} - {end_date || "present"}</p>
        <p className="italics">{position}</p>
        <p className="text-right">{location}</p>
        <ul className="responsibility">
            {responsibilityList}
        </ul>
    </div>)
}

interface ExperienceViewProps {
    experience: ExperienceInterface[],
}

function ExperienceView({experience}: ExperienceViewProps) {
    return (<section>
        <h2 className="section-heading">Experience</h2>
        {experience.map(entry => 
            <ExperienceEntryView key={entry.id} {...entry} />
        )}
    </section>);
}

export default ExperienceView;