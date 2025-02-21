import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DataContext } from '../../App';

function AddNewPerson() {
    const navigate = useNavigate();
    const context = useContext(DataContext)
    const [planets, setPlanets] = useState([])
    const [errorMessage, setErrorMessage] = useState()
    const [person, setPerson] = useState({
        name: "",
        age: "", 
        description: "",
        alive: null,
        planet: ""
    })

    useEffect(() => {
        fetch(`http://localhost:4000/planets`)
                .then(res => res.json())
                .then(data => setPlanets(data))
    }, [])

    const handleInputChange = (event) => {
        const name = event.name
        const inputValue = event.value
        
        if(name == "name") {
            setPerson({...person, name: inputValue})
        }  else if(name == "age") {
            setPerson({...person, age: inputValue})
        } else if(name == "description") {
            setPerson({...person, description: inputValue})
        } else if(name == "alive") {
            if (inputValue == "true") {
                setPerson({...person, alive: true})     
            } else {
                setPerson({...person, alive: false})
            }
        } else if(name == "planet") {
            const planet = planets.find(planet => planet.name == inputValue);
            setPerson({...person, planet: planet})
        }
    }

    const handleSubmit = async(event) => {
        event.preventDefault()
        if (Object.values(person).some(value => value === "" || value === null || value === undefined)) {
            setErrorMessage("All fields must be filled out before submitting.");
        } else {
            try {
                await fetch("http://localhost:4000/people", {
                    method:'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(person)
                });
                context.setTrigger((prev) => prev + 1);
            } catch (error) {
                console.log(error)
            }
            navigate("/people")
        }

    }

    console.log(person)
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="name">Name:</label><br/>
                <input type="text" id="name" name="name" onChange={(e) => handleInputChange(e.target)}/>
            </div>
            <div>
                <label htmlFor="age">Age:</label><br/>
                <input type="text" id="age" name="age" onChange={(e) => handleInputChange(e.target)}/>
            </div>
            <div>
                <label htmlFor="description">Description:</label><br/>
                <input type="text" id="description" name="description" onChange={(e) => handleInputChange(e.target)}/>
            </div>
            <div>
                <label htmlFor="alive">Alive:</label><br/>
                <ul className='form-radio-group' onChange={(e) => handleInputChange(e.target)}>
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
                <label htmlFor="planet">Home planet:</label><br/>
                <select name="planet" id="planet" onChange={(e) => handleInputChange(e.target)}>
                    <option value="">Select an option</option>
                    {context.planets.map((planet) => (
                        <option key={planet.id}>{planet.name}</option>
                    ))}
                </select>
            </div>
            <div>
                <button type="submit">Create</button>
                {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
            </div>
        </form>
    )
}

export default AddNewPerson