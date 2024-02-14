import './index.css'

const DrinksData=({drinksData})=>{
    const {strDrink,strDrinkThumb}=drinksData
    return(
        <li className="drinks-list">
            <div>
            <img src={strDrinkThumb} alt={strDrink}/>
            </div>
            <p>{strDrink}</p>
        </li>
    )
}

export default DrinksData