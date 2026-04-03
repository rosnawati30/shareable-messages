import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Layout from "../components/Layout";

const API_URL = import.meta.env.VITE_API_TEXT_URL

export default function ShareText() {
    const { id } = useParams()

    const [message, setMessage] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchMessage = async () => {
            try {
                const res = await axios.get(`${API_URL}/api/messages/${id}`)
                setMessage(res.data)
            }
            catch (err) {
                setError(err.response?.data?.message || 'Error fetching message')
            }
            finally {
                setLoading(false)
            }
        }

        fetchMessage()
    }, [id])

    if (loading) {
        return <p className="text-center mt-10">Loading...</p>
    }

    if (error) {
        return <p className="text-center mt-10 text-red-500">{error}</p>
    }

    return (
        <Layout>
            <div className="min-h-screen flex flex-col items-center justify-center">
                <h1 className="text-2xl font-bold mb-4">📩 Text Message</h1>

                {message && (
                    <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md text-center">
                        <p className="text-gray-700 mb-2">
                            <strong>To:</strong> {message.to}
                        </p>
                        <p className="text-gray-700 mb-2">
                            <strong>From:</strong> {message.from}
                        </p>
                        <p className="text-gray-900 mt-4">
                            {message.message}
                        </p>
                    </div>
                )}
            </div>
        </Layout>
    )
}