import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import axios from 'axios'
import Layout from '../components/Layout'
import Footer from '../components/Footer'

const BASE_URL = import.meta.env.VITE_APP_URL
const API_URL = import.meta.env.VITE_API_TEXT_URL

export default function TextMessage() {

  const location = useLocation()
  const selectedTemplate = location.state?.template

  const [form, setForm] = useState({
    to: "",
    from: "",
    message: ""
  })

  const [shareLink, setShareLink] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!form.message.trim()) {
      alert('Message is required')
      return
    }

    try {
      setLoading(true)

      const res = await axios.post(`${API_URL}/api/messages`, {
        to: form.to,
        from: form.from,
        message: form.message,
        template: selectedTemplate?.image
      })

      const data = res.data

      const id = data.id

      //generate shareable link
      setShareLink(`${BASE_URL}/read/${id}`)

      //reset form
      setForm({
        to: '',
        from: '',
        message: ''
      })
    }
    catch (err) {
      console.error(err)
    }
    finally {
      setLoading(false)
    }
  }

  return (
    <Layout>
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold">Text Message</h1>
        {!shareLink ? (
          <form onSubmit={handleSubmit}>
            <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="col-span-full">
                <label htmlFor="to" className="block text-sm/6 font-medium text-gray-900">To</label>
                <div className="mt-2">
                  <input
                    id="to"
                    name="to"
                    type="text"
                    value={form.to}
                    onChange={handleChange}
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                </div>
              </div>

              <div className="col-span-full">
                <label htmlFor="from" className="block text-sm/6 font-medium text-gray-900">From</label>
                <div className="mt-2">
                  <input
                    id="from"
                    name="from"
                    type="text"
                    value={form.from}
                    onChange={handleChange}
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                </div>
              </div>

              <div className="col-span-full">
                <label htmlFor="message" className="block text-sm/6 font-medium text-gray-900">
                  Message
                </label>
                <div className="mt-2">
                  <textarea
                    id="message"
                    name="message"
                    rows={3}
                    value={form.message}
                    onChange={handleChange}
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </div>
                <p className="mt-3 text-sm/6 text-gray-600">Write a few sentences about yourself.</p>
              </div>
            </div>
            <div className="mt-6 flex items-center justify-end gap-x-6">
              <button type="button" className="text-sm/6 font-semibold text-gray-900">
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                {loading ? "Sending..." : "Save"}
              </button>
            </div>
          </form>
        ) : (
          <div className="mt-4 text-center" >
            <p>Share this link:</p>
            <input
              type="text"
              value={shareLink}
              readOnly
              className="border p-2 w-full max-w-md"
            />

            <button
              type="button"
              onClick={() => {
                navigator.clipboard.writeText(shareLink)
                alert('Copied!')
              }}
              className="mt-2 bg-blue-500 text-white px-3 py-1 rounded"
            >
              Copy
            </button>

            <button
              type="button"
              onClick={() => setShareLink(null)}
              className="mt-4 text-sm text-gray-500 underline"
            >
              Create New Message
            </button>
          </div>
        )}
      </div>
      <Footer />
    </Layout>
  )
}