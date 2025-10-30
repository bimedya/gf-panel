import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";

export default function Sidebar({ selected, onSelect }) {
  const [panels, setPanels] = useState([]);

  // Supabase'ten başlıkları çek
  useEffect(() => {
    loadPanels();
  }, []);

async function loadPanels() {
  const { data, error } = await supabase
    .from("panels")
    .select("*")
    .order("id");

  if (error) {
    console.error("Panel verisi alınamadı:", error.message);
    alert("Supabase bağlantı hatası: " + error.message);
  } else {
    console.log("Paneller:", data);
    setPanels(data || []);
  }
}


  // Yeni başlık ekleme
  async function addPanel() {
    const name = prompt("Yeni başlık adı:");
    const type = prompt("Tür (RSS / Sosyal Medya / Diğer):");
    if (!name || !type) return;
    const { error } = await supabase
      .from("panels")
      .insert([{ name, type }]);
    if (error) alert("Ekleme hatası: " + error.message);
    else loadPanels();
  }

  // Başlık silme
  async function deletePanel(id) {
    if (!window.confirm("Bu başlık silinsin mi?")) return;
    const { error } = await supabase.from("panels").delete().eq("id", id);
    if (error) alert("Silme hatası: " + error.message);
    else loadPanels();
  }

  return (
    <aside
      style={{
        width: 240,
        background: "#111827",
        color: "white",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        padding: "12px",
      }}
    >
      <h2 style={{ fontSize: 18, marginBottom: 20 }}>Panel Başlıkları</h2>

      {/* Başlık listesi */}
      {panels.map((p) => (
        <div
          key={p.id}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <button
            onClick={() => onSelect(p)}
            style={{
              background: selected?.id === p.id ? "#374151" : "transparent",
              border: "none",
              color: "white",
              textAlign: "left",
              padding: "8px 12px",
              borderRadius: 6,
              cursor: "pointer",
              flex: 1,
            }}
          >
            {p.name} ({p.type})
          </button>
          <button
            onClick={() => deletePanel(p.id)}
            style={{
              border: "none",
              background: "transparent",
              color: "red",
              cursor: "pointer",
            }}
          >
            ×
          </button>
        </div>
      ))}

      <hr style={{ margin: "16px 0", borderColor: "#1f2937" }} />

      <button
        onClick={addPanel}
        style={{
          background: "#2563eb",
          border: "none",
          color: "white",
          padding: "8px",
          borderRadius: 6,
          cursor: "pointer",
        }}
      >
        + Yeni Başlık
      </button>

      <hr style={{ margin: "16px 0", borderColor: "#1f2937" }} />

      <button
        onClick={() => onSelect({ id: "news", name: "Haber Listesi" })}
        style={{
          background: selected?.id === "news" ? "#374151" : "transparent",
          border: "none",
          color: "white",
          textAlign: "left",
          padding: "8px 12px",
          borderRadius: 6,
          cursor: "pointer",
        }}
      >
        📰 Haber Listesi
      </button>
    </aside>
  );
}
