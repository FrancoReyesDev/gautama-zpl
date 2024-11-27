export default function UploadCsv() {
  return (
    <div>
      <header className="prose">
        <h3>Cargar desde CSV</h3>
      </header>
      <input
        type="file"
        className="file-input file-input-bordered w-full mt-2"
        accept=".csv"
      />
    </div>
  );
}
