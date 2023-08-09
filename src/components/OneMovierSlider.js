import "./OneMovieSlider.css"
import data from "../data"
import { useState, useEffect } from "react"
import { FaArrowAltCircleLeft, FaArrowAltCircleRight} from "react-icons/fa";


const OneMovieSlider = () => {
    const [index, SetIndex] = useState(0)

    // Filmy se toci stale dokola - pomoci buttons
    useEffect ( () => {
        if (index < 0){
            SetIndex(data.length - 1)
        } else if (index > data.length-1) {
            SetIndex(0)
        } else {
            SetIndex(index)
        } 
    }, [index])

    // Automaticke posouvani filmu 
    useEffect ( () => {
        let setIntervalID = setInterval( () => {
            SetIndex(index + 1)
        },3000)
        return () => clearInterval(setIntervalID)
    }, [index])

    return <section className="all-movies">
        <div className="all-movies-content">
            {data.map( (oneMovie, oneMovieIndex) => {
                const {id, image, title,age, tags,  description} = oneMovie

                let mainClass = "next-slide"

                if (oneMovieIndex === index) {
                    mainClass = "active-slide"
                }

                if (oneMovieIndex === index-1 || (index ===0 && oneMovieIndex === data.length -1)){
                    mainClass = "last-slide"
                }

                return <article key={id} className={mainClass}>
                    <img src={image} alt="" />
                    <h2>{title}</h2>
                    <p>{description}</p>
                    <p>{tags}</p>
                    <p>{age}</p>
                </article>

            })}
        </div>
        <button onClick={ () => {
            SetIndex(index - 1)
        }}> 
            <FaArrowAltCircleLeft />
        </button>
        <button onClick={ () => {
            SetIndex(index + 1)
        }}>
            <FaArrowAltCircleRight />
        </button>
    </section>
}

export default OneMovieSlider