import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import { DataContext } from "../../App"

function AddNewPlanet() {
    const navigate = useNavigate()
    const context = useContext(DataContext)
    const [errorMessage, setErrorMessage] = useState()
    const [planet, setPlanet] = useState({
        name: "",
        destroydByTheDeathStar: false
    })

    const handleInputChange = (event) => {
        const name = event.name
        const inputValue = event.value
        
        if(name == "name") {
            setPlanet({...planet, name: inputValue})
        }  else if(name == "alive") {
            if (inputValue == "true") {
                setPlanet({...planet, destroydByTheDeathStar: true})     
            } else {
                setPlanet({...planet, destroydByTheDeathStar: false})
            }
        }
    }

    const handleSubmit = async(event) => {
        event.preventDefault()
        if (Object.values(planet).some(value => value === "" || value === null || value === undefined)) {
            setErrorMessage("All fields must be filled out before submitting.");
        } else {
            try {
                await fetch("http://localhost:4000/planets", {
                    method:'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(planet)
                });
                context.setTrigger((prev) => prev + 1);
            } catch (error) {
                console.log(error)
            }
            navigate("/planets")
        }
    }

    return(
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="name">Name:</label><br/>
                <input type="text" id="name" name="name" onChange={(e) => handleInputChange(e.target)}/>
            </div>
            <div>
                <label htmlFor="alive">Destroyd by the death star:</label><br/>
                <ul className="form-radio-group"  onChange={(e) => handleInputChange(e.target)}>
                <li>
                  <input id="alive-one" type="radio" name="alive" value="true" /><label
                    htmlFor="alive-one"
                    >True</label>
                </li>
                <li>
                  <input id="alive-two" type="radio" name="alive" value="false" /><label
                    htmlFor="alive-two"
                    >False</label>
                </li>
              </ul>
            </div>
            <div>
                <button type="submit">Create</button>
                {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
            </div>
        </form>
    )
}

export default AddNewPlanet