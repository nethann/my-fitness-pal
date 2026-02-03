import { useState, useEffect } from 'react'
import './App.css'
import CustomModal from "./Components/Updatedgoalsmodal"
import CustomMealModal from "./Components/Addmealsmodal"
import ProgressBar from 'react-bootstrap/ProgressBar';


import 'bootstrap/dist/css/bootstrap.min.css'


interface Meal {
  id: number
  mealType: string
  mealCal: number
  mealProtein: number
  mealCarbs: number
  mealSugar: number
}

function App() {
  // Load goals from localStorage
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

  // Load meals from localStorage
  const [meals, setMeals] = useState<Meal[]>(() => {
    const saved = localStorage.getItem('meals')
    return saved ? JSON.parse(saved) : []
  });

  const [showGoalsModal, setshowGoalsModal] = useState(false);
  const [showMealModal, setShowMealModal] = useState(false)

  // Save goals to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('calGoal', calGoal.toString())
  }, [calGoal])

  useEffect(() => {
    localStorage.setItem('proteinGoal', proteinGoal.toString())
  }, [proteinGoal])

  useEffect(() => {
    localStorage.setItem('carbsGoal', carbsGoal.toString())
  }, [carbsGoal])

  // Save meals to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('meals', JSON.stringify(meals))
  }, [meals])

  const handleSave = () => {
    console.log('saving goals: ', { calGoal, proteinGoal, carbsGoal });
    setshowGoalsModal(false);
  }

  // THIS IS THE NEW FUNCTION YOU NEED!
  const handleSaveMeal = (mealData: any) => {
    const newMeal: Meal = {
      id: Date.now(), // Simple unique ID
      ...mealData
    }
    setMeals([...meals, newMeal]) // Add new meal to the array
    console.log('Meal saved:', newMeal)
  }

  // Function to delete a meal
  const handleDeleteMeal = (id: number) => {
    setMeals(meals.filter(meal => meal.id !== id))
  }

  // Calculate total calories and protein from all meals
  const totalCalories = meals.reduce((sum, meal) => sum + meal.mealCal, 0)
  const totalProtein = meals.reduce((sum, meal) => sum + meal.mealProtein, 0)
  const totalCarbs = meals.reduce((sum, meal) => sum + meal.mealCarbs, 0)

  const progressLoader = (currentCal: number, totalCal: number) => {
    console.log('DEBUG:', { currentCal, totalCal }); // ADD THIS

    if (totalCal === 0) return 0;
    const percentage = (currentCal / totalCal) * 100;

    console.log('Percentage:', percentage); // ADD THIS

    return Math.min(Math.max(percentage, 0), 100);
  }

  return (
    <div className='parent-container'>
      <div className='main-container'>
        <div className='fitness-info'>
          <h1>Fitness Info</h1>
          <p>Cal Goal: {calGoal} | Current: {totalCalories}</p>
          <ProgressBar variant="primary" now={progressLoader(totalCalories, calGoal)} />
          <p>Protein Goal: {proteinGoal}g | Current: {totalProtein}g</p>
          <ProgressBar variant="success" now={progressLoader(totalProtein, proteinGoal)} />
          <p>Carbs Goal: {carbsGoal}g | Current: {totalCarbs}g</p>
          <ProgressBar variant="warning" now={progressLoader(totalCarbs, carbsGoal)} />
          <button onClick={() => setshowGoalsModal(true)}>Edit Goals</button>
        </div>

        <div className='fitness-meals'>
          <h1>Fitness Meals</h1>
          {meals.length === 0 ? (
            <p>No meals added yet</p>
          ) : (
            <div>
              {meals.map((meal) => (
                <div key={meal.id} style={{ border: '1px solid #ccc', padding: '10px', margin: '10px 0' }}>
                  <h3>{meal.mealType}</h3>
                  <p>Calories: {meal.mealCal}</p>
                  <p>Protein: {meal.mealProtein}g</p>
                  <p>Carbs: {meal.mealCarbs}g</p>
                  <p>Sugar: {meal.mealSugar}g</p>
                  <button onClick={() => handleDeleteMeal(meal.id)}>Delete</button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className='add-meals'>
          <button onClick={() => setShowMealModal(true)}>Add Meal</button>

          <CustomMealModal
            show={showMealModal}
            onHide={() => setShowMealModal(false)}
            onSave={handleSaveMeal}
          />
        </div>

        <CustomModal
          show={showGoalsModal}
          onHide={() => setshowGoalsModal(false)}
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
    </div>

  )
}

export default App