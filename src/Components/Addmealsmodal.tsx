import type { ReactNode } from 'react'
import { Modal, Button, Form } from 'react-bootstrap'
import { useState } from 'react'

interface CustomMealEntryProp {
    show: boolean
    onHide: () => void
    onSave?: (mealData: MealData) => void
}

interface MealData {
    mealType: string
    mealCal: number
    mealProtein: number
    mealCarbs: number
    mealSugar: number
}

function CustomMealModal({
    show,
    onHide,
    onSave,
}: CustomMealEntryProp) {
  
  const [mealType, setMealType] = useState('Breakfast')
  const [mealCal, setMealCal] = useState(0)
  const [mealProtein, setMealProtein] = useState(0)
  const [mealCarbs, setMealCarbs] = useState(0)
  const [mealSugar, setMealSugar] = useState(0)

  const handleSave = () => {
    if (onSave) {
      onSave({
        mealType,
        mealCal,
        mealProtein,
        mealCarbs,
        mealSugar
      })
    }
    onHide()
  }

  return (
    <Modal data-bs-theme="dark" show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Add Meal</Modal.Title>
      </Modal.Header>
      
      <Modal.Body>
        <Form>
          {/* Meal Type Dropdown */}
          <Form.Group className="mb-3">
            <Form.Label>Meal Type</Form.Label>
            <Form.Select 
              value={mealType} 
              onChange={(e) => setMealType(e.target.value)}
            >
              <option value="Breakfast">Breakfast</option>
              <option value="Lunch">Lunch</option>
              <option value="Dinner">Dinner</option>
              <option value="Snack">Snack</option>
            </Form.Select>
          </Form.Group>

          {/* Calories Input */}
          <Form.Group className="mb-3">
            <Form.Label>Calories</Form.Label>
            <Form.Control
              type="number"
              value={mealCal}
              onChange={(e) => setMealCal(Number(e.target.value))}
            />
          </Form.Group>

          {/* Protein Input */}
          <Form.Group className="mb-3">
            <Form.Label>Protein (g)</Form.Label>
            <Form.Control
              type="number"
              value={mealProtein}
              onChange={(e) => setMealProtein(Number(e.target.value))}
            />
          </Form.Group>

          {/* Carbs Input */}
          <Form.Group className="mb-3">
            <Form.Label>Carbs (g)</Form.Label>
            <Form.Control
              type="number"
              value={mealCarbs}
              onChange={(e) => setMealCarbs(Number(e.target.value))}
            />
          </Form.Group>

          {/* Sugar Input */}
          <Form.Group className="mb-3">
            <Form.Label>Sugar (g)</Form.Label>
            <Form.Control
              type="number"
              value={mealSugar}
              onChange={(e) => setMealSugar(Number(e.target.value))}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Save Meal
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default CustomMealModal