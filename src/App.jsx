import { useState } from "react";
import Sidebar from "./components/Sidebar";
import NewsList from "./pages/NewsList";
import PanelFeed from "./pages/PanelFeed";

export default function App() {
  const [selected, setSelected] = useState(null);

  return (
    <div style={{ display: "flex" }}>
      <Sidebar selected={selected} onSelect={setSelected} />
      <main style={{ flex: 1, padding: 24 }}>
        {!selected && <p>Soldan bir panel seçiniz.</p>}
        {selected?.id === "news" && <NewsList />}
        {selected && selected.id !== "news" && <PanelFeed panel={selected} />}
      </main>
    </div>
  );
}
