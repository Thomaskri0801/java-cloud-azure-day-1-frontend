import { useContext } from "react"
import { useNavigate } from "react-router-dom"
import { DataContext } from "../../App"

function PersonListItem(person) {
    const navigate = useNavigate();
    const context = useContext(DataContext)

    const removePerson = async(person) => {
        try {
            await fetch(`http://localhost:4000/people/${person.person.id}`, {
                method: 'DELETE'
            })
            context.setTrigger((prev) => prev + 1);
        } catch(error) {
            console.log(error)
        }
        navigate("/people")
    }

    return (
        <tr>
            <td>{person.person.name}</td>
            <td>{person.person.age}</td>
            <td>{person.person.description}</td>
            <td>{person.person.alive.toString()}</td>
            <td>{person.person.planet.name}</td>
            <td><button onClick={() => removePerson(person)}>X</button></td>
        </tr>
    )
}

export default PersonListItem