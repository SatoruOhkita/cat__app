import { GetServerSideProps } from "next";
import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import styles from "../styles/Home.module.css";
import "semantic-ui-css/semantic.min.css"; //セマンティックUIをインポート

// 受け取るデータの型を決めていく
interface SearchCatImage {
  id: string;
  url: string;
  width: number;
  height: number;
}

interface IndexPageProps {
  initialCatImageUrl: string;
}

// APIをたたくための関数(非同期処理)
const fetchCatImage = async (): Promise<SearchCatImage> => {
  const res = await fetch("https://api.thecatapi.com/v1/images/search");
  const result = await res.json();
  // console.log(result[0]);
  return result[0];
};

export default function Home() {
  // 状態変数で，クリックした時のURLを保持
  const [catImageUrl, setCatImageUrl] = useState("");

  // handleClick関数の中で，『fetchCatImage』を呼び出す。
  const handleClick = async () => {
    const catImage = await fetchCatImage();
    console.log(catImage);
    setCatImageUrl(catImage.url);
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
      <img src={catImageUrl} width={500} height="auto" />
      <button style={{ marginTop: 18 }} onClick={handleClick}>
        今日の猫さん
      </button>
    </div>
  );
}

// SSRを実装
export const getServerSideProps: GetServerSideProps<
  IndexPageProps
> = async () => {
  const catImageUrl = await fetchCatImage();
  return {
    props: {
      initialCatImageUrl: catImageUrl.url,
    },
  };
};
