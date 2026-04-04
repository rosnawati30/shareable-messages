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
            <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
                <div className="bg-white shadow-xl rounded-2xl overflow-hidden max-w-3xl w-full grid grid-cols-1 md:grid-cols-2">
                    <div className="aspect-[4/3] overflow-hidden">
                        <img
                            src={message.template}
                            alt="Postcard Template"
                            className="w-full h-full object-cover"
                        />
                    </div>

                    <div className="p-6 flex flex-col justify-center text-center">
                        {message && (
                            <>
                                <p className="text-gray-700 mb-2">
                                    <strong>To:</strong> {message.to}
                                </p>

                                <p className="text-gray-700 mb-2">
                                    <strong>From:</strong> {message.from}
                                </p>

                                <div className="mt-4 bg-gray-50 p-4 rounded-lg">
                                    <p className="text-gray-900 italic">
                                        "{message.message}"
                                    </p>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </Layout>
    )
}