// "use client";
// import React, { useState, useEffect } from "react";
// import {
//   createUserWithEmailAndPassword,
//   signInWithEmailAndPassword,
//   onAuthStateChanged,
//   signOut,
// } from "firebase/auth";
// import { auth } from "../../firebase/config";
// import { useRouter } from 'next/navigation';
// import Card from "../../components/Card"
// const page = () => {
//   const [user, setUser] = useState(null);
//   const [loginEmail, setLoginEmail] = useState("");
//   const [loginPassword, setLoginPassword] = useState("");
//   const router = useRouter();

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
//       setUser(currentUser);
//     });

//     // Cleanup the subscription when the component is unmounted
//     return () => unsubscribe();
//   }, []);

//   const login = async () => {
//     try {
//       const userCredential = await signInWithEmailAndPassword(
//         auth,
//         loginEmail,
//         loginPassword
//       );
//       const loggedInUser = userCredential.user;
//       console.log(loggedInUser);
//     } catch (error) {
//       console.log(error.message);
//     }
//   };

//   const logout = async () => {
//     await signOut(auth);
//   };

//   // useEffect(() => {
//   //   if (user && user.email) {
//   //     router.push('/dashboard');
//   //   }
//   // }, [user, router]);

//   return (
//     <div>
//       {user?.email ? (<div><Card/></div>) :(<div>
//         <h3> Login </h3>
//         <input
//           placeholder="Email..."
//           onChange={(event) => {
//             setLoginEmail(event.target.value);
//           }}
//         />
//         <input
//           placeholder="Password..."
//           onChange={(event) => {
//             setLoginPassword(event.target.value);
//           }}
//         />

//         <button onClick={login}> Login</button>
//       </div>)}
//       <div>Havent Signed Up ? <button>Sign up</button></div>
//       <h4> User Logged In: {user ? user.email : "Not logged in"} </h4>
//     </div>
//   );
// };

// export default page;
