import React from "react";
import { FaMusic } from "react-icons/fa";

function Home() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-indigo-600 to-purple-700 p-4">
            <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-8 text-center">
                <FaMusic className="text-indigo-600 text-5xl mb-4" />
                <h2 className="text-3xl font-bold mb-4">
                    Welcome to MelodyVerse
                </h2>
                <p className="mb-6 text-gray-700">
                    Enjoy your music streaming experience
                </p>
            </div>
        </div>
    );
}

export default Home;
