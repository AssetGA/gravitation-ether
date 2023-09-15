// import React, { createContext, useContext, useState } from "react";
// import { getDatabase, ref, child, get, push, set } from "firebase/database";
// import firebase_app from "../../firebase";

// const FirebaseStateContext = createContext();

// export const FirebaseStateContextProvider = ({ children }) => {
//   const [tokenForVoting, setTokenForVoting] = useState();
//   const db = getDatabase(firebase_app);
//   const dbRef = ref(getDatabase(firebase_app));
//   const getTokenSender = (userId) => {
//     get(child(dbRef, `users/${userId}`))
//       .then((snapshot) => {
//         if (snapshot.exists()) {
//           setTokenForVoting(snapshot.val());
//         } else {
//           setTokenForVoting(undefined);
//         }
//       })
//       .catch((error) => {
//         console.error(error);
//       });
//   };

//   function writeUserData(userId, address1, address2, quantity) {
//     const postListRef = ref(db, "users/" + userId);
//     const newPostRef = push(postListRef);
//     set(
//       newPostRef,
//       {
//         from: address1,
//         to: address2,
//         token: quantity,
//       },
//       (error) => {
//         if (error) {
//           console.log(error);
//         } else {
//           console.log("Data saved successfully!");
//         }
//       }
//     );
//   }

//   return (
//     <FirebaseStateContext.Provider
//       value={{ getTokenSender, writeUserData, tokenForVoting }}
//     >
//       {children}
//     </FirebaseStateContext.Provider>
//   );
// };

// export const useFirebaseStateContext = () => useContext(FirebaseStateContext);
