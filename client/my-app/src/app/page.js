"use client"
import { useState ,useContext, useEffect} from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { auth } from "./firebase/config";
import {useRouter} from "next/navigation"

function Page() {
  const router=useRouter();
  
  useEffect(()=>{
    router.push('/login');
  },[])


  return (
    <>
    
    
    
    </>
      
  );
}

export default Page;