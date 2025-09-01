import { Routes, Route, Navigate } from 'react-router-dom'
import Header from './components/Header'
import Home from './pages/Home'
import Search from './pages/Search'
import Details from './pages/Details'
import Favorites from './pages/Favorites'
import Footer from './components/Footer'

export default function App(){
  return (
    <>
      <Header/>
      <main style={{paddingBottom:20}}>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/buscar" element={<Search/>} />
          <Route path="/detalhes/:id" element={<Details/>} />
          <Route path="/Favoritos" element={<Favorites/>} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <div>
        <Footer /> 
      </div>

    </>
  )
}