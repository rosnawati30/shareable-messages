import { useState, useRef } from 'react'
import axios from 'axios'
import Layout from '../components/Layout'
import Footer from '../components/Footer'

const BASE_URL = import.meta.env.VITE_APP_URL
const API_URL = import.meta.env.VITE_API_URL

export default function VoiceMessage() {
    const [isRecording, setIsRecording] = useState(false)
    const [audioUrl, setAudioUrl] = useState(null)

    const [shareLink, setShareLink] = useState(null)
    const [loading, setLoading] = useState(false)

    const mediaRecorderRef = useRef(null)
    const audioChunksRef = useRef([])

    const uploadAudio = async (audioBlob) => {
        try {
            setLoading(true)

            const formData = new FormData()
            formData.append('audio', audioBlob)

            const res = await axios.post(
                `${API_URL}/api/upload-audio`,
                formData
            )

            console.log(res.data)

            const { id, url } = res.data

            //show audio from server
            setAudioUrl(`${API_URL}/api/audio/${id}`)

            //generate shareable link
            setShareLink(`${BASE_URL}/listen/${id}`)
        }
        catch (err) {
            console.error(err)
        }
        finally {
            setLoading(false)
        }
    }

    const startRecording = async () => {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true })

        const mediaRecorder = new MediaRecorder(stream)
        mediaRecorderRef.current = mediaRecorder

        mediaRecorder.ondataavailable = (e) => {
            audioChunksRef.current.push(e.data)
        }

        mediaRecorder.onstop = () => {
            const audioBlob = new Blob(audioChunksRef.current, {
                type: 'audio/webm'
            })

            //send to backend 
            uploadAudio(audioBlob)
            audioChunksRef.current = []
        }

        mediaRecorder.start()
        setIsRecording(true)
    }

    const stopRecording = () => {
        mediaRecorderRef.current.stop()
        setIsRecording(false)
    }

    return (
        <Layout>
            <div className="min-h-screen p-6 bg-gray-100 flex flex-col items-center">
                <h1 className="text-3xl font-bold mb-4">Voice Message</h1>

                {!isRecording ? (
                    <button
                        onClick={startRecording}
                        className='bg-green-500 text-white px-4 py-2 rounded-lg'
                    >
                        Start Recording
                    </button>
                ) : (
                    <button
                        onClick={stopRecording}
                        className='bg-red-500 text-white px-4 py-2 rounded-lg'
                    >
                        Stop Recording
                    </button>
                )}

                {loading && <p className='mt-4'>Uploading...</p>}

                {audioUrl && (
                    <audio controls src={audioUrl} className='mt-4' />
                )}

                {shareLink && (
                    <div className='mt-4 text-center'>
                        <p>Share this link:</p>
                        <input
                            type='text'
                            value={shareLink}
                            readOnly
                            className='border p-2 w-full max-w-md'
                        />

                        <button
                            onClick={() => {
                                navigator.clipboard.writeText(shareLink)
                                alert('Copied!')
                            }}
                            className='mt-2 bg-blue-500 text-white px-3 py-1 rouded'
                        >
                            Copy
                        </button>
                    </div>
                )}
            </div>
            <Footer />
        </Layout>
    )
}