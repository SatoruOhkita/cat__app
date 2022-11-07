import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

// 受け取るデータの型を決めていく
interface SearchCatImage {
  id: string;
  url: string;
  width: number;
  height: number;
}

export default function Home() {
  // APIをたたくための関数(非同期処理)
  const fetchCatImage = async (): Promise<SearchCatImage> => {
    const res = await fetch("https://api.thecatapi.com/v1/images/search");
    const result = await res.json();
    // console.log(result[0]);
    return result[0];
  };

  // handleClick関数の中で，『fetchCatImage』を呼び出す。
  const handleClick = async () => {
    const catImage = await fetchCatImage();
    console.log(catImage);
  };

  return (
    <div
      style={{
        // 直接スタイルを適用
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <h1>猫画像アプリ</h1>
      <img
        src="https://cdn2.thecatapi.com/images/MTgzMzAyOA.jpg"
        width={500}
        height="auto"
      />
      <button style={{ marginTop: "36" }} onClick={handleClick}>
        今日の猫さん
      </button>
    </div>
  );
}
