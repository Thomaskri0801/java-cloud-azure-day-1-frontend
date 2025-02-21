import { useContext } from "react"
import PeopleListItem from "./PeopleListItem"
import { DataContext } from "../../App.jsx"
import { Link } from "react-router-dom"

function PlanetList() {
    const context = useContext(DataContext)

    return(
        <div>
            <h1>Person List</h1>
            <button ><Link to={"/addPerson"}>Add person</Link></button>
            <table>
                <thead>
                    <th>Name</th>
                    <th>Age</th>
                    <th>Description</th>
                    <th>Alive</th>
                    <th>Home planet</th>
                    <th></th>
                </thead>
                <tbody>
                    {context.people.map((person, index) => 
                        <PeopleListItem key={index} person={person}/>
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default PlanetList