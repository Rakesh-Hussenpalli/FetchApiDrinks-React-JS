import React, { useState, useEffect } from 'react'
import './index.css'
import DrinksData from '../DrinksData'

const URL = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s="
const FetchDrinks = () => {
    const [drinksData, setDrinksData] = useState([])
    const [searchDrink, setSearchDrink] = useState("")
    const [loading, setLoading] = useState(false)
    const [isError, setIsError] = useState({ status: false, msg: "" })

    const fetchDrinks = async (apiURL) => {
        setLoading(true)
        setIsError({ status: false, msg: "" })
        try {
            const response = await fetch(apiURL)
            const { drinks } = await response.json()
            setDrinksData(drinks)
            setLoading(false)
            setIsError({ status: false, msg: "" })
            if (!drinks) {
                throw new Error("Data not found")
            }
        }
        catch (error) {
            setLoading(false)
            setIsError({ status: true, msg: error.message || "Something went wrong" })
        }
    }

    useEffect(() => {
        const searchURL = `${URL}${searchDrink}`
        fetchDrinks(searchURL)
    }, [searchDrink])
    return (
        <div className="bg-container">
            <input type="text"
                className="input-text"
                placeholder="Enter drink name here..."
                value={searchDrink}
                onChange={(e) => setSearchDrink(e.target.value)} />
            <br />
            {loading && !isError.status &&
                (
                    <div className="loading-container">
                        <h2 className="loading"></h2>
                    </div>
                )}
            {isError.status &&
                (<h2 className="error">{isError.msg}</h2>)}
            {!loading && !isError.status &&
                (
                    <ul className="drinks-list-container">
                        {
                            drinksData.map((drink) => {
                                return <DrinksData key={drink.idDrink} drinksData={drink} />
                            })
                        }
                    </ul>
                )}

        </div>
    )
}

export default FetchDrinks