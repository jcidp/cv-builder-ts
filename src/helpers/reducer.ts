import { EducationInterface, ExperienceInterface, State, ResponsibilityInterface } from "./generalTypes";

interface Action {
    type: "changedInput" | "addedElement" | "removedElement";
    section: string | undefined;
    target: HTMLInputElement | HTMLButtonElement | SVGSVGElement | SVGPathElement;
}

export default function reducer(state: State, action: Action): State {
    const target = action.target;

    switch (action.type) {
        case "changedInput": {
            if (!(target instanceof HTMLInputElement)) break;
            switch (action.section) {
                case "generalInfo": {
                    const field = target.id === "name" || target.id === "email" || target.id === "phone" ? target.id : undefined;
                    if (!field) break;
                    return {...state, generalInfo: {...state.generalInfo, [field]: target.value}};
                }

                case "education": {
                    const name = target.name;
                    const field = name === "school" || name === "degree" || name === "start_date" || name === "end_date" || name === "location" ? name : undefined;
                    if (!field) break;
                    const targetId = target.id.slice(field.length);
                    return {...state, education: state.education.map((entry: EducationInterface) => {
                        if (targetId !== entry.id) return entry;
                        return {...entry, [field]: target.value};
                    })};
                }

                case "experience": {
                    const name = target.name;
                    const field = name === "company" || name === "position" || name === "start_date" || name === "end_date" || name === "location" || 
                    name === "responsibility" ? name : undefined;
                    if (!field) break;
                    const sliceIndex = field.length + (field === "responsibility" ? (target.dataset.index?.length ?? 0) : 0);
                    const targetId = target.id.slice(sliceIndex);
                    return {...state, experience: state.experience.map((entry: ExperienceInterface) => {
                        if (targetId !== entry.id) return entry;
                        if (field !== "responsibility") return {...entry, [field]: target.value};
                        return {...entry, responsibilities: getNewResponsibilities(entry.responsibilities, target.dataset.id ?? "", target.value)};
                    })};
                }

            }
            break;
        }
        
        case "addedElement": {
            if (!(target instanceof HTMLButtonElement)) break;
            switch (action.section) {
              case "experience":
                return {...state, experience: [...state.experience,
                    {
                        company: "",
                        position: "",
                        start_date: "",
                        end_date: "",
                        location: "",
                        responsibilities: [
                        {id: crypto.randomUUID(), value: ""},
                        ],
                        id: crypto.randomUUID(),
                    }
                ]};
            
              case "education":
                return {...state, education: [...state.education, 
                    {
                        school: "",
                        degree: "",
                        start_date: "",
                        end_date: "",
                        location: "",
                        id: crypto.randomUUID(),
                    }
                ]};
        
              case "responsibilities":
                return {...state, experience: state.experience.map(entry => {
                  if (target.closest(".experience-entry")?.lastElementChild?.id !== entry.id) return entry;
                  return {...entry, responsibilities: [...entry.responsibilities, {
                    id: crypto.randomUUID(),
                    value: "",
                  }]};
                })};
            }
            break;
        }

        case "removedElement": {
            if (target instanceof HTMLInputElement) break;
            switch (action.section) {
              case "experience":
                return {...state, experience: state.experience.filter(entry =>
                  target.id !== entry.id
                )};
            
              case "education":
                return {...state, education: state.education.filter(entry =>
                  target.id !== entry.id
                )};
              
              case "responsibilities":
                return {...state, experience: state.experience.map(entry => {
                  if (target.closest(".experience-entry")?.lastElementChild?.id !== entry.id) return entry;
                  return {...entry, responsibilities: [...entry.responsibilities.filter(responsibility => {
                    const clickedResponsibility = target.closest(".responsibility-container")?.firstElementChild;
                    if (!(clickedResponsibility instanceof HTMLInputElement)) return true;
                    return responsibility.id !== clickedResponsibility?.dataset.id;
                  })]};
                })};
            }
        }
    }

    return state;
}

const getNewResponsibilities = (responsibilities: ResponsibilityInterface[], targetId: string, newValue: string) => {
    return responsibilities.map(responsibility => {
      if (targetId !== responsibility.id) return responsibility;
      return {...responsibility, value: newValue};
    });
  };