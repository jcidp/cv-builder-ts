import { useState } from 'react'
import Header from './components/Header';
import Footer from './components/Footer';
import Form from './components/Form';
import View from './components/View';
import { initialEducation, initialExperience, initialGeneralInfo } from './helpers/initialValues';
import { ResponsibilityInterface } from './helpers/generalTypes';
import "./App.css";

function App() {
  const [isEditing, setIsEditing] = useState(true);
  const [generalInfo, setGeneralInfo] = useState(initialGeneralInfo);
  const [experience, setExperience] = useState(initialExperience);
  const [education, setEducation] = useState(initialEducation);

  const handleGeneralInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const field = e.target.id === "name" || e.target.id === "email" || e.target.id === "phone" ? e.target.id : undefined;
    const newInfo = {...generalInfo};
    if (field) {
      newInfo[field] = e.target.value;
      setGeneralInfo(newInfo);
    }
  };

  const handleExperienceInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const field = name === "company" || name === "position" || name === "start_date" || name === "end_date" || name === "location" || 
      name === "responsibility" ? name : undefined;
    if (!field) return;
    const sliceIndex = field.length + (field === "responsibility" ? (e.target.dataset.index?.length ?? 0) : 0);
    const targetId = e.target.id.slice(sliceIndex);
    setExperience(experience.map(entry => {
      if (targetId !== entry.id) return entry;
      const newEntry = {...entry};
      if (field !== "responsibility") newEntry[field] = e.target.value;
      else newEntry["responsibilities"] = getNewResponsibilities(entry.responsibilities, e.target.dataset.id ?? "", e.target.value);
      return newEntry;
    }));
  }

  const getNewResponsibilities = (responsibilities: ResponsibilityInterface[], targetId: string, newValue: string) => {
    return responsibilities.map(responsibility => {
      if (targetId !== responsibility.id) return responsibility;
      return {...responsibility, value: newValue};
    });
  };

  const handleEducationInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const field = name === "school" || name === "degree" || name === "start_date" || name === "end_date" || name === "location" ? name : undefined;
    if (!field) return; 
    const targetId = e.target.id.slice(field.length);
    setEducation(education.map(entry => {
      if (targetId !== entry.id) return entry;
      const newEntry = {...entry};
      newEntry[field] = e.target.value;
      return newEntry;
    }));
  };

  const handleRemoveElement = (e: React.MouseEvent<HTMLButtonElement, MouseEvent> | React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    e.preventDefault();
    if (!(e.target instanceof HTMLButtonElement || e.target instanceof SVGSVGElement)) return;
    const target = e.target as HTMLButtonElement | SVGSVGElement;
    switch (e.target.dataset.section) {
      case "experience":
        setExperience(experience.filter(entry =>
          target.id !== entry.id
        ));
        break;
    
      case "education":
        setEducation(education.filter(entry =>
          target.id !== entry.id
        ));
        break;
      
      case "responsibilities":
        setExperience(experience.map(entry => {
          if (target.closest(".experience-entry")?.lastElementChild?.id !== entry.id) return entry;
          return {...entry, responsibilities: [...entry.responsibilities.filter(responsibility => {
            const clickedResponsibility = target.closest(".responsibility-container")?.firstElementChild;
            if (!(clickedResponsibility instanceof HTMLButtonElement)) return;
            return responsibility.id !== clickedResponsibility?.dataset.id;
          })]};
        }));
    }
  };

  const handleAddElement = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (!(e.target instanceof HTMLButtonElement)) return;
    switch (e.target.dataset.section) {
      case "experience":
        setExperience([...experience,
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
        ]);
        break;
    
      case "education":
        setEducation([...education, {
          school: "",
          degree: "",
          start_date: "",
          end_date: "",
          location: "",
          id: crypto.randomUUID(),
        }]);
        break;

      case "responsibilities":
        setExperience(experience.map(entry => {
          if ((e.target as HTMLElement).closest(".experience-entry")?.lastElementChild?.id !== entry.id) return entry;
          return {...entry, responsibilities: [...entry.responsibilities, {
            id: crypto.randomUUID(),
            value: "",
          }]};
        }));
    }
  }

  const handleViewChange = () => {
    setIsEditing(isEditing ? false : true);
  };

  return (
    <>
      <Header isEditing={isEditing} onClick={handleViewChange} />
      <main>
        <div className='wrapper'>
        {isEditing ? 
          <Form 
            generalInfo={generalInfo}
            experience={experience} 
            education={education}
            handleGeneralInputChange={handleGeneralInputChange}
            handleExperienceInputChange={handleExperienceInputChange}
            handleEducationInputChange={handleEducationInputChange}
            handleRemoveElement={handleRemoveElement}
            handleAddElement={handleAddElement}
          /> :
          <View
            generalInfo={generalInfo}
            experience={experience} 
            education={education}
          />
        }
        </div>
      </main>
      <Footer />
    </>
  )
}

export default App
