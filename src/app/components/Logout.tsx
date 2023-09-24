import { getAuth, signOut } from "firebase/auth";
import router from "next/router";
import * as React from "react";

export const Logout = async () => {
  const auth = getAuth();
  await signOut(auth)
    .then(() => {
      router.push("/login");
    })
    .catch((e) => {
      alert("ログアウトに失敗しました");
    });
};

export default Logout;
