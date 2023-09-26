"use client";
import { getAuth, signOut } from "firebase/auth";
import { useRouter } from "next/navigation";

export const Logout = async () => {
  const router = useRouter();

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
