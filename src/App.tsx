import { useState, useEffect } from 'react'
import './App.css'
import Dropdown from 'react-bootstrap/Dropdown'
import 'bootstrap/dist/css/bootstrap.min.css'
import CustomModal from "./Updatedgoalsmodal"

function App() {
  // Load from localStorage or use default 0
  const [calGoal, setcalGoal] = useState(() => {
    const saved = localStorage.getItem('calGoal')
    return saved ? Number(saved) : 0
  });
  
  const [proteinGoal, setproteinGoal] = useState(() => {
    const saved = localStorage.getItem('proteinGoal')
    return saved ? Number(saved) : 0
  });
  
  const [carbsGoal, setcarbsGoal] = useState(() => {
    const saved = localStorage.getItem('carbsGoal')
    return saved ? Number(saved) : 0
  });
  
  const [showModal, setshowModal] = useState(false);

  // Save to localStorage whenever goals change
  useEffect(() => {
    localStorage.setItem('calGoal', calGoal.toString())
  }, [calGoal])

  useEffect(() => {
    localStorage.setItem('proteinGoal', proteinGoal.toString())
  }, [proteinGoal])

  useEffect(() => {
    localStorage.setItem('carbsGoal', carbsGoal.toString())
  }, [carbsGoal])

  const handleSave = () => {
    console.log('saving goals: ', {calGoal, proteinGoal, carbsGoal});
    setshowModal(false);
  }

  return (
    <div className='main-container'>
      <div className='fitness-info'>
        <h1>Fitness Info</h1>
        <p>Cal Goal: {calGoal}</p>
        <p>Protein Goal: {proteinGoal}</p>
        <p>Carbs Goal: {carbsGoal}</p>
        <button onClick={() => setshowModal(true)}>Edit Goals</button>
      </div>

      <div className='fitness-meals'>
        <h1>Fitness Meals</h1>
      </div>

      <div className='add-meals'>
        <Dropdown data-bs-theme="dark">
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            Add Meal
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item href="#/action-1">Breakfast</Dropdown.Item>
            <Dropdown.Item href="#/action-2">Lunch</Dropdown.Item>
            <Dropdown.Item href="#/action-3">Dinner</Dropdown.Item>
            <Dropdown.Item href="#/action-3">Snack</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>

      <CustomModal
        show={showModal}
        onHide={() => setshowModal(false)}
        title="Edit Fitness Goals"
        onSave={handleSave}
      >
        <div>
          <label>Calorie Goal:</label>
          <input
            type="number"
            className="form-control mb-2"
            value={calGoal}
            onChange={(e) => setcalGoal(Number(e.target.value))}
          />
          
          <label>Protein Goal (g):</label>
          <input
            type="number"
            className="form-control mb-2"
            value={proteinGoal}
            onChange={(e) => setproteinGoal(Number(e.target.value))}
          />
          
          <label>Carbs Goal (g):</label>
          <input
            type="number"
            className="form-control"
            value={carbsGoal}
            onChange={(e) => setcarbsGoal(Number(e.target.value))}
          />
        </div>
      </CustomModal>
    </div>
  )
}

export default App