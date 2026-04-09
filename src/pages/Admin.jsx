import { useState } from "react";
import { db } from "../firebase/config";
import { addDoc, collection } from "firebase/firestore";

export default function Admin() {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [content, setContent] = useState("");

  const addArticle = async () => {
    await addDoc(collection(db, "articles"), {
      title,
      image,
      content,
      createdAt: new Date().toISOString()
    });

    alert("Đã thêm bài viết");
  };

  return (
    <div>
      <input placeholder="Tiêu đề" onChange={e => setTitle(e.target.value)} />
      <input placeholder="Link ảnh" onChange={e => setImage(e.target.value)} />
      <textarea onChange={e => setContent(e.target.value)} />
      <button onClick={addArticle}>Thêm</button>
    </div>
  );
}