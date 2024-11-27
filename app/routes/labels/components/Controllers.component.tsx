interface Props {
  handleAddLabel(): void;
  removeAllLabels(): void;
}

export default function Controllers({
  handleAddLabel,
  removeAllLabels,
}: Props) {
  return (
    <div className="flex gap-2 mt-4">
      <button onClick={handleAddLabel} className="btn btn-neutral">
        Agregar Etiqueta
      </button>
      <button onClick={removeAllLabels} className="btn btn-error">
        Eliminar Todas las Etiquetas
      </button>
    </div>
  );
}
