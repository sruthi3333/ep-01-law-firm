'use client'

import { useState } from 'react'
import LoadingSpinner from './LoadingSpinner'
import SuccessScreen from './SuccessScreen'

interface FormData {
  client_name: string
  client_email: string
  legal_issue: string
}

interface WebhookResponse {
  success: boolean
  message: string
}

type FormStatus = 'idle' | 'loading' | 'success' | 'error'

export default function IntakeForm() {
  const [formData, setFormData] = useState<FormData>({
    client_name: '',
    client_email: '',
    legal_issue: '',
  })
  const [status, setStatus] = useState<FormStatus>('idle')
  const [responseMessage, setResponseMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    setErrorMessage('')

    try {
      const webhookUrl = process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL
      if (!webhookUrl) throw new Error('Webhook URL not configured')

      const res = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data: WebhookResponse = await res.json()

      if (data.success) {
        setResponseMessage(data.message)
        setStatus('success')
      } else {
        setErrorMessage(data.message || 'Something went wrong. Please try again.')
        setStatus('error')
      }
    } catch {
      setErrorMessage('Unable to submit. Please check your connection and try again.')
      setStatus('error')
    }
  }

  const handleReset = () => {
    setFormData({ client_name: '', client_email: '', legal_issue: '' })
    setStatus('idle')
    setResponseMessage('')
    setErrorMessage('')
  }

  if (status === 'loading') return <LoadingSpinner />
  if (status === 'success') return <SuccessScreen message={responseMessage} onReset={handleReset} />

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label htmlFor="client_name" className="block text-sm font-medium text-gray-700 mb-1">
          Full Name <span className="text-red-500">*</span>
        </label>
        <input
          id="client_name"
          name="client_name"
          type="text"
          required
          value={formData.client_name}
          onChange={handleChange}
          placeholder="e.g. Rahul Mehta"
          className="w-full px-4 py-3 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-slate-800 focus:border-transparent transition"
        />
      </div>

      <div>
        <label htmlFor="client_email" className="block text-sm font-medium text-gray-700 mb-1">
          Email Address <span className="text-red-500">*</span>
        </label>
        <input
          id="client_email"
          name="client_email"
          type="email"
          required
          value={formData.client_email}
          onChange={handleChange}
          placeholder="e.g. rahul@example.com"
          className="w-full px-4 py-3 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-slate-800 focus:border-transparent transition"
        />
      </div>

      <div>
        <label htmlFor="legal_issue" className="block text-sm font-medium text-gray-700 mb-1">
          Describe Your Legal Issue <span className="text-red-500">*</span>
        </label>
        <textarea
          id="legal_issue"
          name="legal_issue"
          required
          rows={4}
          value={formData.legal_issue}
          onChange={handleChange}
          placeholder="Briefly describe your legal matter..."
          className="w-full px-4 py-3 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-slate-800 focus:border-transparent transition resize-none"
        />
      </div>

      {status === 'error' && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-600">{errorMessage}</p>
        </div>
      )}

      <button
        type="submit"
        className="w-full py-3 px-6 bg-slate-800 text-white font-medium rounded-lg hover:bg-slate-700 active:bg-slate-900 transition-colors"
      >
        Submit Inquiry
      </button>

      <p className="text-xs text-gray-400 text-center">
        We respond within 24 hours. Your information is kept strictly confidential.
      </p>
    </form>
  )
}
