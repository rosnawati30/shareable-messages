import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

export default function Home() {
    const navigate = useNavigate()

    return (
        <section className="min-h-screen flex flex-col items-center justify-center bg-[#fff3a3]">

            <motion.header
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center my-3 py-3.5"
            >
                <h1 data-tour="title" className="momo-signature-regular text-5xl font-bold text-orange-600">
                    Luminara
                </h1>
                <p className="text-md font-light">"Where messages shine"</p>
            </motion.header>
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex gap-x-6"
            >
                <button
                    onClick={() => navigate('/voice')}
                    className="rounded-md bg-orange-700 px-3.5 py-2.5 text-sm font-semibold text-white transition duration-300 hover:scale-105 hover:bg-orange-800"
                >
                    Voice Message
                </button>
                <button
                    onClick={() => navigate('/template')}
                    className="rounded-md bg-orange-700 px-3.5 py-2.5 text-sm font-semibold text-white transition duration-300 hover:scale-105 hover:bg-orange-800"
                >
                    Text Message
                </button>
            </motion.div>
        </section>
    )
}