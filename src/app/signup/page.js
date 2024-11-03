"use client";
import SignupForm from '@/components/SignupForm'
import React from 'react'
import { motion } from 'framer-motion';

const page = () => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-gray-100 my-2 bg-opacity-70 backdrop-filter backdrop-blur-lg rounded-2xl shadow-lg overflow-hidden"
        >
            <SignupForm />
        </motion.div>
    )
}

export default page