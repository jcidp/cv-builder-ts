import { useReducer, useState } from 'react'
import Header from './components/Header';
import Footer from './components/Footer';
import Form from './components/Form';
import View from './components/View';
import initialState from './helpers/initialValues';
import "./App.css";
import reducer from './helpers/reducer';

function App() {
  const [isEditing, setIsEditing] = useState(true);
  const [data, dispatch] = useReducer(reducer, initialState);

  const handleGeneralInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: "changedInput",
      section: "generalInfo",
      target: e.target,
    });
  };

  const handleExperienceInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: "changedInput",
      section: "experience",
      target: e.target,
    });
  }

  const handleEducationInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: "changedInput",
      section: "education",
      target: e.target,
    });
  };

  const handleRemoveElement = (e: React.MouseEvent<HTMLButtonElement, MouseEvent> | React.MouseEvent<SVGSVGElement, MouseEvent> | React.MouseEvent<SVGPathElement, MouseEvent>) => {
    e.preventDefault();
    const target = e.target;
    if (!(target instanceof HTMLButtonElement || target instanceof SVGSVGElement ||
      target instanceof SVGPathElement)) return;
    dispatch({
      type: "removedElement",
      section: target.dataset.section,
      target: target,
    });
  };

  const handleAddElement = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    const target = e.target;
    if (!(target instanceof HTMLButtonElement)) return;
    dispatch({
      type: 'addedElement',
      section: target.dataset.section,
      target: target,
    });
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
            generalInfo={data.generalInfo}
            experience={data.experience} 
            education={data.education}
            handleGeneralInputChange={handleGeneralInputChange}
            handleExperienceInputChange={handleExperienceInputChange}
            handleEducationInputChange={handleEducationInputChange}
            handleRemoveElement={handleRemoveElement}
            handleAddElement={handleAddElement}
          /> :
          <View
            generalInfo={data.generalInfo}
            experience={data.experience} 
            education={data.education}
          />
        }
        </div>
      </main>
      <Footer />
    </>
  )
}

export default App
