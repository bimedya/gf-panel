import { useState, useEffect } from "react";
import { supabase } from "./lib/supabase";
import NewsCard from "./components/NewsCard";

export default function App() {
  const [rows, setRows] = useState([]);

  async function loadData() {
    const { data } = await supabase
      .from("news_list")
      .select("*")
      .order("added_at", { ascending: false })
      .limit(20);
    setRows(data || []);
  }

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div style={{ fontFamily: "system-ui", padding: 24 }}>
      <h1>Gündem Fethiye Haber Takip Paneli</h1>

      <NewsCard
        title="Fethiye'de yağış sonrası ulaşımda aksamalar"
        source="Örnek Kaynak"
        link="https://gundemfethiye.com"
      />

      <button onClick={loadData}>Listeyi Yenile</button>

      <table style={{ width: "100%", borderCollapse: "collapse", marginTop: 20 }}>
        <thead>
          <tr>
            <th>Başlık</th>
            <th>Kaynak</th>
            <th>Kategori</th>
            <th>Durum</th>
            <th>Haberi Yapan</th>
            <th>Link</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.id}>
              <td>{r.title}</td>
              <td>{r.source}</td>
              <td>{r.category}</td>
              <td>{r.status}</td>
              <td>{r.owner}</td>
              <td>
                {r.link ? (
                  <a href={r.link} target="_blank" rel="noreferrer">
                    Aç
                  </a>
                ) : (
                  "-"
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
