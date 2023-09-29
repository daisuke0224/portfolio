"use client";
import React from "react";
import { getAuth, signOut } from "firebase/auth";

export const logout = async () => {
  const auth = getAuth();
  await signOut(auth)
    .then(() => {
      console.log("Sign-out successful.");
    })
    .catch((e) => {
      alert("ログアウトに失敗しました");
    });
};

//以下最初にログアウトとして導入したもの
// "use client";
// import { getAuth, signOut } from "firebase/auth";
// import { useRouter } from "next/navigation";

// export const Logout = async () => {
//   const router = useRouter();

//   const auth = getAuth();
//   await signOut(auth)
//     .then(() => {
//       router.push("/login");
//     })
//     .catch((e) => {
//       alert("ログアウトに失敗しました");
//     });
// };

// export default Logout;
