import "./Movie.css";
import { useParams } from "react-router-dom";

function Movie(){
    
    const {id} = useParams();

    return(
        <div>
            Current id is + {id}
        </div>
    )
}

export default Movie;