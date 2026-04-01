import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"
import Layout from "../components/Layout"
import Footer from "../components/Footer"

const API_URL = import.meta.env.VITE_API_URL

export default function Share() {
    const { id } = useParams()

    const [audioUrl, setAudioUrl] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchAudio = async () => {
            try {
                const res = await axios.get(`{API_URL}/api/audio/${id}`)
                setAudioUrl(res.request.responseURL)
            }
            catch (err) {
                setError('Audio not found or expired')
            }
            finally {
                setLoading(false)
            }
        }

        fetchAudio()
    }, [id])

    if (loading) {
        return <p className="text-center mt-10">Loading</p>
    }

    if (error) {
        return <p className="text-center mt-10 text-red-500">{error}</p>
    }

    return (
        <Layout>
            <div className="min-h-screen flex flex-col items-center justify-center">
                <h1 className="text-2xl font-bold mb-4">🎧Voice Message</h1>

                <audio controls src={audioUrl} />
            </div>
            <Footer />
        </Layout>
    )
}