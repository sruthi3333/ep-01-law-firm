export default function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className="w-12 h-12 border-4 border-gray-200 border-t-slate-800 rounded-full animate-spin" />
      <p className="text-gray-500 text-sm">Submitting your inquiry...</p>
    </div>
  )
}
