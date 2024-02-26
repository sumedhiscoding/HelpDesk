"use client"
// Import necessary modules
import React, { useState, useEffect } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { auth } from "../../firebase/config";
import { useRouter } from 'next/navigation';
import Card from "../../components/Card";

const Page = () => {
  const [user, setUser] = useState(null);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [error, setError] = useState(null);
  const router = useRouter();

  const login = async () => {
    try {
      setError(null); // Reset error state
      const userCredential = await signInWithEmailAndPassword(
        auth,
        loginEmail,
        loginPassword
      );
      const loggedInUser = userCredential.user;
      console.log(loggedInUser);
    } catch (error) {
      setError(error.message); // Set error state
      console.log(error.message);
    }
  };

  const logout = async () => {
    await signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    // Cleanup the subscription when the component is unmounted
    return () => unsubscribe();
  }, []);

//   useEffect(() => {
//     if (user && user.email) {
//       router.push('/dashboard');
//     }
//   }, [user, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-md shadow-md">
        {user?.email ? (
          <div>
            <Card />
            <button onClick={logout} className="mt-4 bg-red-500 text-white px-4 py-2 rounded-md">Logout</button>
          </div>
        ) : (
          <div>
            <h3 className="text-2xl font-bold mb-4">Login</h3>
            <input
              type="email"
              placeholder="Email..."
              onChange={(event) => {
                setLoginEmail(event.target.value);
              }}
              className="w-full px-3 py-2 mb-4 border rounded-md"
            />
            <input
              type="password"
              placeholder="Password..."
              onChange={(event) => {
                setLoginPassword(event.target.value);
              }}
              className="w-full px-3 py-2 mb-4 border rounded-md"
            />

            <button onClick={login} className="w-full bg-blue-500 text-white px-4 py-2 rounded-md">
              Login
            </button>
            {error && <p className="text-red-500 mt-2">{error}</p>}
          </div>
        )}
        <div className="mt-4 text-sm">
          Haven't signed up? <button className="text-blue-500" onClick={() => router.push('/register')}>Sign up</button>
        </div>
        <h4 className="mt-4">User Logged In: {user ? user.email : "Not logged in"}</h4>
      </div>
    </div>
  );
};

export default Page;
