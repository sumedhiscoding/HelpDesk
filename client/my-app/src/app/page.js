"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

function Page() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-md shadow-md text-center">
        <h1 className="text-3xl font-bold mb-6">Welcome to Your App</h1>
        <div className="space-y-4">
          <button
            onClick={() => router.push("/login")}
            className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 transition"
          >
            Login
          </button>
          <button
            onClick={() => router.push("/register")}
            className="bg-green-500 text-white px-6 py-3 rounded-md hover:bg-green-600 transition"
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
}

export default Page;
