import React, { useState } from 'react'

const AddCarForm = () => {
    const [newCar, setNewCar] = useState({ title: '', imageUrl: '', fuel: '', mileage: '', space: '', year: '', price: '' });
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState("");

    const handleAddCar = async (e) => {
        e.preventDefault();
        console.log(newCar);
        setLoading(true);

        try {
            const res = await fetch('/api/cars', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newCar),
            });
            const data = await res.json();
            if (res.ok) {
                setStatus(data.message);
                setNewCar({ title: '', imageUrl: '', fuel: '', mileage: '', space: '', year: '', price: '' });
                console.log(data);
            } else {
                console.log("Some Error Occured!");
                setStatus("Something went wrong!");
            }
        } catch (error) {
            console.log("Error:", error);
            setStatus("Something went wrong!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleAddCar} className="mb-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <input
                    type="text"
                    placeholder="Car Title"
                    value={newCar.title}
                    onChange={(e) => setNewCar({ ...newCar, title: e.target.value })}
                    className="border rounded-md px-3 py-2"
                    required
                />
                <input
                    type="text"
                    placeholder="Car Image URL"
                    value={newCar.imageUrl}
                    onChange={(e) => setNewCar({ ...newCar, imageUrl: e.target.value })}
                    className="border rounded-md px-3 py-2"
                    required
                />
                <input
                    type="text"
                    placeholder="Fuel Type"
                    value={newCar.fuel}
                    onChange={(e) => setNewCar({ ...newCar, fuel: e.target.value })}
                    className="border rounded-md px-3 py-2"
                    required
                />
                <input
                    type="number"
                    placeholder="Mileage (kmpl)"
                    value={newCar.mileage}
                    onChange={(e) => setNewCar({ ...newCar, mileage: e.target.value })}
                    className="border rounded-md px-3 py-2"
                    required
                />
                <input
                    type="number"
                    placeholder="Boot Space (liters)"
                    value={newCar.space}
                    onChange={(e) => setNewCar({ ...newCar, space: e.target.value })}
                    className="border rounded-md px-3 py-2"
                    required
                />
                <input
                    type="number"
                    placeholder="Year"
                    value={newCar.year}
                    onChange={(e) => setNewCar({ ...newCar, year: e.target.value })}
                    className="border rounded-md px-3 py-2"
                    required
                />
                <input
                    type="number"
                    placeholder="Price per Hour"
                    value={newCar.price}
                    onChange={(e) => setNewCar({ ...newCar, price: e.target.value })}
                    className="border rounded-md px-3 py-2"
                    required
                />
            </div>
            <div className='flex justify-between items-center'>
                <button type="submit" className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                    {loading ? "Adding..." : "Add Car"}
                </button>
                {status && <h1>Car Added Succesfully!</h1>}
            </div>

        </form>
    )
}

export default AddCarForm