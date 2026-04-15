interface SuccessScreenProps {
  message: string
  onReset: () => void
}

export default function SuccessScreen({ message, onReset }: SuccessScreenProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-6 py-8 text-center">
      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
        <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold text-gray-900">Inquiry Received</h2>
        <p className="text-gray-500 max-w-sm">{message}</p>
      </div>
      <button
        onClick={onReset}
        className="mt-2 text-sm text-slate-600 underline underline-offset-4 hover:text-slate-900 transition-colors"
      >
        Submit another inquiry
      </button>
    </div>
  )
}
