import { useState } from "react";
import { supabase } from "../lib/supabase";

export default function NewsCard({ title, source, link }) {
  const [category, setCategory] = useState("ikincil");
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");

  async function addToList() {
    try {
      setSaving(true);
      setMsg("");
      const { error } = await supabase.from("news_list").insert([
        {
          title,
          source,
          link,
          status: "Bekliyor",
          added_by: "Burak",
          category,
        },
      ]);
      if (error) throw error;
      setMsg("Haber listeye eklendi ✅");
    } catch (e) {
      setMsg("Kaydedilemedi ❌ (bağlantı bekleniyor olabilir)");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div style={{ border: "1px solid #ddd", padding: 12, borderRadius: 8, marginBottom: 12 }}>
      <h3>{title}</h3>
      <p><a href={link} target="_blank" rel="noreferrer">{source}</a></p>

      <label>Kategori: </label>
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        style={{ marginRight: 8 }}
      >
        <option value="öncelikli">Öncelikli</option>
        <option value="ikincil">İkincil</option>
        <option value="soft">Soft</option>
        <option value="tercihen">Tercihen</option>
      </select>

      <button onClick={addToList} disabled={saving}>
        {saving ? "Ekleniyor..." : "Listeye Ekle"}
      </button>

      {msg && <div style={{ marginTop: 8 }}>{msg}</div>}
    </div>
  );
}
