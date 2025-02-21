import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { DataContext } from '../../App';

function PlanetListItem(planet) {
    const navigate = useNavigate();
    const context = useContext(DataContext)

    const removePlanet = async(planet) => {
        try {
            await fetch(`http://localhost:4000/planets/${planet.planet.id}`, {
                method: 'DELETE'
            })
            context.setTrigger((prev) => prev + 1);
        } catch(error) {
            console.log(error)
        }
        navigate("/planets")
    }

    return (
        <tr>
            <td>{planet.planet.name}</td>
            <td>{planet.planet.destroydByTheDeathStar.toString()}</td>
            <td><button onClick={() => removePlanet(planet)}>X</button></td>
        </tr>
    )
}

export default PlanetListItem