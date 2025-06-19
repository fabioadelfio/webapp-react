export default function ReviewForm({ formData, setFormData, handleFormSubmit }) {

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }
    
    return (
        <form className="row w-100" onSubmit={handleFormSubmit}>

            <div className="col-6">
                <label htmlFor="name" className="form-label">
                    Name
                </label>
                <input 
                    type="text" 
                    value={formData.name}
                    onChange={handleInputChange}
                    className="form-control"
                    id="name"
                    name="name"
                />
            </div>

            <div className="col-6">

                <label htmlFor="vote" className="form-label">
                    Rating
                </label>
                <input 
                    type="number" 
                    value={formData.vote}
                    onChange={handleInputChange}
                    className="form-control"
                    id="vote"
                    name="vote"
                    min="1"
                    max="5"
                />
            </div>

            <div className="col-12">
                <label htmlFor="text" className="form-label">
                    Text
                </label>
                <textarea
                    type="text"
                    onChange={handleInputChange}
                    className="form-control"
                    id="text"
                    name="text"
                    value={formData.text}
                />
            </div>

            <div className="col-4 mt-4">
                <button type="submit" className="btn btn-success">Send Review</button>
            </div>
        </form>
    )
}