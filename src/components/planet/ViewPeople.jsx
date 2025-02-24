import { useContext, useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { DataContext } from "../../App"

function ViewPeople() {
    const [planet, setPlanet] = useState()
    const { id } = useParams()
    const navigate = useNavigate()
    const context = useContext(DataContext)

    console.log(id)
    console.log(context.planets)

    useEffect(() => {
        console.log("hei")
        if (context.planets && id) {
            setPlanet(context.planets.find((planet) => planet.id == id));
        }
    }, [planet, id])


    return(
        <div>
            <h1>{planet.name}</h1>
        </div>
    )
}

export default ViewPeople