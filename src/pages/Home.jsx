import { useEffect, useState } from "react"
import axios from "axios";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";


export default function Home() {

    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();

    const apiBaseUrl = import.meta.env.VITE_API_URL;

    useEffect(() => {
        axios
            .get(`${apiBaseUrl}/movies`)
            .then(res => {
                setMovies(res.data);
                setLoading(false);
            })
            .catch(err => {
                setError(`Error Loading Movies: `, err.message);
                console.error(`API error: `, err);
                setLoading(false);
            })
    }, []);

    if (loading) return <div className="container"><Loader /></div>;
    if (error) return <div className="container mt-4 text-danger">{error}</div>;
    if (movies.length === 0) return <div className="container mt-4">No Movies Found!</div>;

    return (
        <main>
            <div className="container">
                <h1>Movies List</h1>
                <div className="row d-flex flex-wrap">
                    {movies.map(movie => (
                        <div key={movie.id} className="col-md-3 mt-4">
                            <Link className="text-decoration-none" to={`/movies/${movie.id}`}>
                                <div className="card h-100">
                                    <img className="card-img-top" src={`/images/${movie.image}`} alt="" />
                                    <div className="card-body">
                                        <h5 className="card-title">{movie.title}</h5>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    )
}