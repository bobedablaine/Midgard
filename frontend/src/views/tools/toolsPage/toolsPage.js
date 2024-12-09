import React from 'react';
import { Link } from 'react-router-dom';
import NavBar from '../../../components/NavBar.js';

const ToolsPage = () => {
    return (
        <>
            <NavBar />
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-2xl font-bold mb-6 text-white">Security Tools</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <Link
                        to="/tools/url-scanner"
                        className="block p-6 bg-white rounded-lg shadow hover:shadow-lg transition-shadow"
                    >
                        <h2 className="text-xl font-semibold mb-2">URL Scanner</h2>
                        <p className="text-gray-600">
                            Check URLs for potential security threats using VirusTotal and Google Safe Browsing APIs.
                        </p>
                    </Link>
                    {/* Add more tools here as needed */}
                </div>
            </div>
        </>
    );
};

export default ToolsPage;