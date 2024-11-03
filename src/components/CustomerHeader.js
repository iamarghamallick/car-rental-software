import React from 'react'
import { FaCar } from 'react-icons/fa'
import { FaMapLocationDot } from 'react-icons/fa6'
import { MdOutlineAddIcCall, MdViewTimeline } from 'react-icons/md'

const CustomerHeader = () => {
    return (
        <section className='container'>
            <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-4 p-6 px-1">
                <div className='p-4 flex flex-col items-center justify-center bg-blue-200 rounded-lg font-extrabold text-blue-950 shadow-lg shadow-blue-900/50'>
                    <FaCar size={30} color='#1e3a8a' />
                    <h1>Car Rental</h1>
                    <h1>Service</h1>
                </div>
                <div className='p-4 flex flex-col items-center justify-center bg-blue-200 rounded-lg font-extrabold text-blue-950 shadow-lg shadow-blue-900/50'>
                    <FaMapLocationDot size={30} color='#1e3a8a' />
                    <h1>Location</h1>
                    <h1>Kolkata, India</h1>
                </div>
                <div className='p-4 flex flex-col items-center justify-center bg-blue-200 rounded-lg font-extrabold text-blue-950 shadow-lg shadow-blue-900/50'>
                    <MdViewTimeline size={30} color='#1e3a8a' />
                    <h1>Availability</h1>
                    <h1>24/7 Service</h1>
                </div>
                <div className='p-4 flex flex-col items-center justify-center bg-blue-200 rounded-lg font-extrabold text-blue-950 shadow-lg shadow-blue-900/50'>
                    <MdOutlineAddIcCall size={30} color='#1e3a8a' />
                    <h1>Call Us</h1>
                    <h1>7 am - 10 pm</h1>
                </div>
            </div>
        </section>
    )
}

export default CustomerHeader