import { useContext } from "react"
import PlanetListItem from "./PlanetListItem"
import { DataContext } from "../../App.jsx"
import { Link } from "react-router-dom"

function PlanetList() {
    const context = useContext(DataContext)

    return(
        <div>
            <h1>Planet List</h1>
            <button ><Link to={"/addPlanet"}>Add planet</Link></button>
            <table>
                <thead>
                    <th>Name</th>
                    <th>Destroyed by the death star</th>
                    <th></th>
                </thead>
                <tbody>
                    {context.planets.map((planet, index) => 
                        <PlanetListItem key={index} planet={planet}/>
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default PlanetList