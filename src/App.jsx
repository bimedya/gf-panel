import { useState, useEffect } from "react";
import { supabase } from "./lib/supabase";

function App() {
  const [rows, setRows] = useState([]);

  async function addExampleRow() {
    await supabase.from("news_list").insert([
      { 
        title: "Test Haberi", 
        source: "Deneme", 
        link: "https://gundemfethiye.com", 
        status: "Bekliyor", 
        added_by: "Burak" 
      }
    ]);
    loadData();
  }

  async function loadData() {
    const { data } = await supabase
      .from("news_list")
      .select("*")
      .order("added_at", { ascending: false })
      .limit(10);
    setRows(data || []);
  }

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div style={{ fontFamily: "system-ui", padding: "30px" }}>
      <h1>Gündem Fethiye Haber Takip Paneli</h1>
      <button onClick={addExampleRow}>Örnek Haber Ekle</button>
      <table style={{ marginTop: "20px", width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={{ textAlign: "left", borderBottom: "1px solid #ddd" }}>Başlık</th>
            <th style={{ textAlign: "left", borderBottom: "1px solid #ddd" }}>Kaynak</th>
            <th style={{ textAlign: "left", borderBottom: "1px solid #ddd" }}>Durum</th>
            <th style={{ textAlign: "left", borderBottom: "1px solid #ddd" }}>Link</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.id}>
              <td>{r.title}</td>
              <td>{r.source}</td>
              <td>{r.status}</td>
              <td><a href={r.link} target="_blank" rel="noreferrer">Aç</a></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
