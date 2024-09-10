import React from 'react'

const FindCarForm = () => {
    return (
        <section className='bg-yellow-100'>
            <h1 className='text-2xl font-bold text-center mt-4'>Find Your Best Car Here</h1>
            <div className='grid grid-cols-4 gap-4 px-8 pt-8 pb-16'>
                <div>
                    <img src="/assets/all-images/cars-img/offer-toyota.png" alt="car image" />
                </div>
                <div className='flex flex-col justify-center gap-8'>
                    <input className='px-4 py-2 w-full border-2 border-blue-400 rounded-lg h-11' placeholder='Address (origin)' type="text" name="from_add" id="form_add" />
                    <input className='px-4 py-2 w-full border-2 border-blue-400 rounded-lg h-11' placeholder='Address (destination)' type="text" name="to_add" id="to_add" />
                </div>
                <div className='flex flex-col justify-center gap-8'>
                    <input className='px-4 py-2 w-full border-2 border-blue-400 rounded-lg h-11' placeholder='Address' type="date" name="date" id="date" />
                    <input className='px-4 py-2 w-full border-2 border-blue-400 rounded-lg h-11' placeholder='Address' type="time" name="time" id="time" />
                </div>
                <div className='flex flex-col justify-center gap-8'>
                    <select className='px-4 py-2 w-full border-2 border-blue-400 rounded-lg h-11' name="car_type" id="car_type">
                        <option value="ac" defaultChecked>Car Type</option>
                        <option value="ac">AC Car</option>
                        <option value="nonac">Non AC Car</option>
                    </select>
                    <button className='px-4 py-2 w-full border-2 border-blue-400 rounded-lg h-11 bg-blue-900 text-white font-semibold'>Search</button>
                </div>
            </div>
        </section>
    )
}

export default FindCarForm