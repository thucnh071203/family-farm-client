import React from "react";
import { Link } from "react-router-dom";

const SidebarDash = () => {
  return (
    <div className="w-64 h-screen bg-white shadow-md p-4 flex flex-col justify-between">
      <div>
        <div className="text-2xl font-bold mb-6 text-blue-600">Dashboard</div>
        <nav className="space-y-4 text-sm">
          <div className="font-semibold text-gray-500">HOME</div>
          <div className="font-semibold text-gray-500">Censor</div>
          <ul className="ml-4 text-gray-700">
            <li>AI Checker</li>
            <li>Account Censor</li>
          </ul>
          <div className="font-semibold text-gray-500">Management</div>
          <ul className="ml-4 text-gray-700">
            <li>Account Management</li>
            <li>Report Management</li>
            <li>Post Management</li>
            <li>Payment</li>
          </ul>
          <div className="font-semibold text-gray-500">System Management</div>
          <ul className="ml-4 text-blue-600 font-semibold">
            <li>Chatbot</li>
            <li>Category Service</li>
            <li>Category Post</li>
            <li className="text-gray-700 font-normal">Reaction</li>
          </ul>
        </nav>
      </div>
      <div className="text-center">
        <div className="mb-2 text-sm">Profile Setting</div>
        <button className="bg-red-100 text-red-600 px-4 py-1 rounded hover:bg-red-200 text-sm">
          Log out
        </button>
      </div>
    </div>
  );
};

export default SidebarDash;
