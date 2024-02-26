"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signOut } from 'firebase/auth';

const Card = () => {
  const [clicked, setClicked] = useState(true);
  const router = useRouter();

  const handleOnClick = () => {
    router.push("/dashboard");
    // console.log("clicked", clicked);
  };

  const handleLogout = async () => {
    try {
      // Add Firebase sign out logic here
      await signOut(auth);
      router.push("/"); // Redirect to the login page or home page after logout
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="bg-white p-6 rounded-md shadow-md">
      {clicked ? (
        <div>
          <div className="text-2xl font-bold mb-4">Facebook Integration Page</div>
          <div className="mb-4">Integrated Page: HelperDesk</div>
          <div>
            <button className="bg-red-600 text-white px-4 py-2 rounded-md">Delete Integration</button>
          </div>
          <div>
            <button onClick={handleOnClick} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md">
              Reply to Messages
            </button>
          </div>
          <div>
            <button onClick={handleLogout} className="mt-4 bg-gray-500 text-white px-4 py-2 rounded-md">
              Logout
            </button>
          </div>
        </div>
      ) : (
        <div>
          <div className="text-2xl font-bold mb-4">Facebook Page Integration</div>
          <div>
            <button onClick={handleOnClick} className="bg-green-500 text-white px-4 py-2 rounded-md">
              Connect Page
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Card;
