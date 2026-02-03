import { useState } from 'react'
import './App.css'

function App() {
  const [calGoal, setcalGoal] = useState(0)
  const [proteinGoal, setproteinGoal] = useState(0)

  return (
    <div className='main-container'>
      <div className='fitness-info'>
        <h1>Fitness Info</h1>
        <p>Cal Goal: 0</p>
        <p>Protein Goal: 0</p>
        <p>Carbs Goal: 0</p>
        <button>Edit Goals</button>
      </div>


      <div className='fitness-meals'>
        <h1>Fitness Meals</h1>
      </div>

      
      <div className='add-meals'>
        <button>Add meal</button>
      </div>
    </div>
  )
}

export default App
