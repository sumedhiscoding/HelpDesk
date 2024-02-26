"use client";
import React, { useState, useEffect } from "react";
import { createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase/config";
import { useRouter } from "next/navigation";
import Card from "../../components/Card";

const Page = () => {
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    // Cleanup the subscription when the component is unmounted
    return () => unsubscribe();
  }, []);

  const register = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, registerEmail, registerPassword);
      const registeredUser = userCredential.user;
      console.log(registeredUser);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-md shadow-md text-center">
        {user ? (
          <div>
            <Card />
          </div>
        ) : (
          <div>
            <h3 className="text-2xl font-bold mb-4">Register User</h3>
            <input
              type="email"
              placeholder="Email..."
              onChange={(event) => {
                setRegisterEmail(event.target.value);
              }}
              className="w-full px-3 py-2 mb-4 border rounded-md"
            />
            <input
              type="password"
              placeholder="Password..."
              onChange={(event) => {
                setRegisterPassword(event.target.value);
              }}
              className="w-full px-3 py-2 mb-4 border rounded-md"
            />

            <button onClick={register} className="w-full bg-blue-500 text-white px-4 py-2 rounded-md">
              Create User
            </button>
            <div className="mt-4">
              Already have an account?{" "}
              <button onClick={() => router.push("/login")} className="text-blue-500">
                Log in
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
