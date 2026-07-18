export default function FormField({ id, label, error, children }) {
  return (
    <div>
      <label htmlFor={id} className="block font-mono text-[10px] uppercase tracking-wider text-muted">
        {label}
      </label>
      <div className="mt-2">{children}</div>
      {error && (
        <p className="mt-2 text-xs text-red-500" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
