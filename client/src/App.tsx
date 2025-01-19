import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import './App.css'
import Login from './pages/Login'
import Register from './pages/Register'
import GoalList from './pages/GoalList'
import GoalForm from './pages/GoalForm'
import Header from './components/Header'
import GoalCalendar from './pages/GoalCalendar'

function App() {

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Navigate to='login' />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/register' element={<Register />}></Route>
        <Route element={<Header />}>
          <Route path="/goals" element={<GoalList />} />
          <Route path="/goals/new" element={<GoalForm />} />
          <Route path="/goal-form/:id" element={<GoalForm />} />
          <Route path="/goal-calendar/:id" element={<GoalCalendar />} />
          <Route path="/goals/:id/edit" element={<GoalForm />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
