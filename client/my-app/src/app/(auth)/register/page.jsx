// "use client";
// import React, { useState, useEffect } from "react";
// import {
//   createUserWithEmailAndPassword,
//   onAuthStateChanged,
// } from "firebase/auth";
// import { auth } from "../../firebase/config";
// import { useRouter } from "next/navigation";
// import Card from "../../components/Card";
// const Page = () => {
//   const [registerEmail, setRegisterEmail] = useState("");
//   const [registerPassword, setRegisterPassword] = useState("");
//   const [user, setUser] = useState(null);
//   const router = useRouter();

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
//       setUser(currentUser);
//     });

//     // Cleanup the subscription when the component is unmounted
//     return () => unsubscribe();
//   }, []);

//   // useEffect(() => {
//   //   if (user && user.email) {
//   //     router.push("/dashboard");
//   //   }
//   // }, [user, router]);

//   const register = async () => {
//     try {
//       const userCredential = await createUserWithEmailAndPassword(
//         auth,
//         registerEmail,
//         registerPassword
//       );
//       const registeredUser = userCredential.user;
//       console.log(registeredUser);
//     } catch (error) {
//       console.log(error.message);
//     }
//   };

//   return (
//     <div>
//       {user ? (
//         <div>
//           <Card />
//         </div>
//       ) : (
//         <div>
//           <h3> Register User </h3>
//           <input
//             placeholder="Email..."
//             onChange={(event) => {
//               setRegisterEmail(event.target.value);
//             }}
//           />
//           <input
//             placeholder="Password..."
//             onChange={(event) => {
//               setRegisterPassword(event.target.value);
//             }}
//           />

//           <button onClick={register}> Create User</button>
//           <div>{user ? user.email : ""}</div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Page;
