import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Home from './pages/Home/home'
import Register from './pages/Register/index'
import Admin from './pages/admin'
import Private from './private'
export default function Rotas(){
        return(
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Home/>}/>
                    <Route path='/register' element={<Register/>}/>
                    <Route path='/admin' element={<Private><Admin/></Private>}/>
                </Routes>
            </BrowserRouter>

        )
}