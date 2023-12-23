import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import Users from './Users'
import UpdateUser from './UpdateUser'
import CreateUser from './CreateUser'
function App() {
    const [count, setCount] = useState(0)

    return (
        <div>

            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Users />} />
                    <Route path="/create" element={<CreateUser />} />
                    <Route path="/update/:id" element={<UpdateUser />} />

                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default App
