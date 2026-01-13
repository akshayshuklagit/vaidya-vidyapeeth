export default function Loader({ size = 40 }) {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderWidth: size / 8,
      }}
      className="mx-auto rounded-full border-white/30 border-t-white animate-spin"
    />
  );
}

export function DotsLoader() {
  return (
    <div className="flex space-x-1">
      <span className="w-2 h-2 bg-white rounded-full animate-bounce [animation-delay:-0.3s]" />
      <span className="w-2 h-2 bg-white rounded-full animate-bounce [animation-delay:-0.15s]" />
      <span className="w-2 h-2 bg-white rounded-full animate-bounce" />
    </div>
  );
}
export function FullScreenLoader({ message = "" }) {
  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex flex-col items-center justify-center z-50">
      {/* Spinner + Logo */}
      <div className="relative w-20 h-20">
        {/* Spinner */}
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      </div>

      {/* Message */}
      <p className="mt-6 text-white text-xl font-semibold">{message}</p>
    </div>
  );
}
