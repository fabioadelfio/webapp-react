import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import axios from "axios";
import ReviewForm from "../components/ReviewForm";
import Loader from "../components/Loader";

const formInitialData = {
    name: "",
    vote: 1,
    text: ""
}

export default function MovieDetail () {

    const { id } = useParams();

    const [movie, setMovie] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();
    const [formData, setFormData] = useState(formInitialData);

    const apiBaseUrl = import.meta.env.VITE_API_URL;

    const fetchMovie = () => {
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
    };

    useEffect(fetchMovie, [])

    console.log(movie)

    if (loading) return <div className="container mt-4"><Loader /></div>;
    if (error) return <div className="container mt-4 text-danger">{error}</div>;
    if (!movie) return <div className="container mt-4">Movie Not Found</div>;

    const fetchStoreReview = () => {
        axios
            .post(`${apiBaseUrl}/movies/${id}/reviews`, formData)
            .then(res => {
                fetchMovie();
            })
    }

    const handleStoreReviewFormSubmit= (e) => {
        e.preventDefault();
        setFormData(formInitialData);
        fetchStoreReview();
    }

    return (
        <div className="container d-flex flex-column align-items-center my-5">
            <h1 className="mb-4">{movie.title}</h1>
            <div className="row d-flex align-items-center bg-success p-4 rounded-5">
                <div className="col-md-4">
                    <img className="w-100 rounded-5" src={`${movie.image}`} alt={movie.title}/>
                </div>
                <div className="col-md-8">
                    <div className="card-body">
                        <h2 className="card-title text-center"><strong>Abstract</strong></h2>
                        <div className="card-text text-center fs-3">{movie.abstract}</div>
                        <h2 className="card-title text-center"><strong>Director</strong></h2>
                        <div className="card-text text-center fs-3">{movie.director}</div>
                        <h2 className="card-title text-center"><strong>Genre</strong></h2>
                        <div className="card-text text-center fs-3">{movie.genre}</div>
                        <h2 className="card-title text-center"><strong>Year</strong></h2>
                        <div className="card-text text-center fs-3">{movie.year}</div>
                    </div>
                </div>
            </div>
            <h1 className="mt-5 mb-3">Reviews</h1>
            {movie.reviews.map(review => (
                <div key={review.id} className="card bg-danger mb-3 w-100">
                    <div className="card-title text-center fs-2 fw-bold pt-3 text-warning">{review.name}</div>
                    <div className="card-text text-center pt-3 fs-4">{review.text}</div>
                    <div className="card-text p-3 fs-4 "><strong>Rating: {review.vote}</strong></div>
                </div>
            ))}
            <h1 className="mt-5 mb-3">Your Review</h1>
            <ReviewForm
                formData={formData}
                setFormData={setFormData}
                handleFormSubmit={handleStoreReviewFormSubmit}
            />
        </div>
    )
}