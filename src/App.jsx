import { useEffect, useState, createContext } from 'react'
import { Link, Route, Routes } from 'react-router-dom'
import './App.css'
import PeopleList from './components/people/PeopleList'
import PlanetList from './components/planet/PlanetList'
import AddNewPerson from './components/people/AddNewPerson'
import AddNewPlanet from './components/planet/AddNewPlanet'

const DataContext = createContext()

function App() {
  const [planets, setPlanets] = useState([])
  const [people, setPeople] = useState([])
  const [trigger, setTrigger] = useState()

  useEffect(() => {
    fetch("http://localhost:4000/planets")
      .then(res => res.json())
      .then(data => setPlanets(data))

    fetch("http://localhost:4000/people")
      .then(res => res.json())
      .then(data => setPeople(data))
  }, [trigger])

  return (
    <>
      <header>
          <h1>Menu</h1>
          <nav>
              <ul>
                  <li><Link to="/people">Pepple List</Link></li>
                  <li><Link to="/planets">Planet List</Link></li>
              </ul>
          </nav>
      </header>
      <main>
        <DataContext.Provider value={ {planets, people, setTrigger, trigger} }>
          <Routes>
              <Route path='/people' element={<PeopleList/>}/>
              <Route path='/planets' element={<PlanetList/>}/>
              <Route path='/addPerson' element={<AddNewPerson/>}/>
              <Route path='/addPlanet' element={<AddNewPlanet/>}/>
          </Routes>
        </DataContext.Provider>
      </main>
    </>
  )
}

export {App, DataContext};
