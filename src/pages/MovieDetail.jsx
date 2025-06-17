import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import axios from "axios";

export default function MovieDetail () {

    const { id } = useParams();

    const [movie, setMovie] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();

    const apiBaseUrl = `http://localhost:3000`;

    useEffect(() => {
        axios
            .get(`${apiBaseUrl}/movies/${id}`)
            .then(res => {
                setMovie(res.data);
                setLoading(false);
            })
            .catch(err => {
                setError(`Error Loading Movie with ID ${id}: `, err.message);
                console.error(`API error: `, err);
                setLoading(false);
            })
    }, [id]);

    console.log(movie)

    if (loading) return <div className="container mt-4">Loading Movie Details</div>;
    if (error) return <div className="container mt-4 text-danger">{error}</div>;
    if (!movie) return <div className="container mt-4">Movie Not Found</div>;

    return (
        <div className="container d-flex flex-column align-items-center my-5">
            <h1 className="text-center">{movie.title}</h1>
            <div className="row d-flex align-items-center">
                <div className="col-md-4">
                    <img className="w-100" src={`${movie.image}`} alt={movie.title}/>
                </div>
                <div className="col-md-8">
                    <div className="card-body">
                        <h4 className="card-title text-center"><strong>Abstract</strong></h4>
                        <div className="card-text text-center">{movie.abstract}</div>
                        <h4 className="card-title text-center"><strong>Director</strong></h4>
                        <div className="card-text text-center">{movie.director}</div>
                        <h4 className="card-title text-center"><strong>Genre</strong></h4>
                        <div className="card-text text-center">{movie.genre}</div>
                        <h4 className="card-title text-center"><strong>Year</strong></h4>
                        <div className="card-text text-center">{movie.year}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}