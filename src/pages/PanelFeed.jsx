export default function PanelFeed({ panel }) {
  return (
    <div>
      <h1>{panel.name}</h1>
      <p>Tür: {panel.type}</p>
      <p>Bu panelin RSS veya sosyal medya kaynakları burada görünecek.</p>
    </div>
  );
}
