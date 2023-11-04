//@ts-nocheck
"use client";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/firebase/client";
import { useEffect, useState } from "react";

// ドキュメントを取得する関数を作成
const getDocumentsByTeamId = async (venderTeamId: string) => {
  const q = query(
    collection(db, "customers"),
    where("venderTeamId", "==", venderTeamId)
  );
  const snapshot = await getDocs(q);
  const documents = snapshot.docs.map((doc) => doc.data());
  return documents;
};

// コンポーネント内で取得したドキュメントを表示する
const ExampleComponent = ({ venderTeamId }: { venderTeamId: string }) => {
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    const fetchDocuments = async () => {
      const result = await getDocumentsByTeamId(venderTeamId);
      setDocuments(result);
    };

    fetchDocuments();
  }, [venderTeamId]);
  // console.log(documents);

  return (
    <div>
      {documents.map((document) => (
        <div key={document.id}>
          {/* ドキュメントの情報を表示するコンポーネントを表示 */}
          <p>{document.customerName}</p>
          <p>{document.piece}</p>
          <p>{document.income}</p>

          {/* ... */}
        </div>
      ))}
    </div>
  );
};

export default ExampleComponent;
