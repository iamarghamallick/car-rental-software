import React from "react";

const FullPageLoader = ({ status }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
            <div className="flex flex-col items-center">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-opacity-75"></div>
                <p className="text-white font-semibold text-xl mt-4">{status}</p>
            </div>
        </div>
    );
};

export default FullPageLoader;
