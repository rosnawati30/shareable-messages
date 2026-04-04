
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import Layout from "../components/Layout";

const templates = [
    { id: 1, name: "Template1", image: "/templates/template_5.jpg" }
]

export default function Template() {
    const navigate = useNavigate()

    const [selectedTemplate, setSelectedTemplate] = useState(null)

    return (
        <Layout>
            <div className="min-h-screen flex flex-col items-center justify-center">
                <h1>Halaman template</h1>

                <div className="grid grid-cols-2 gap-4">
                    {templates.map((template) => (
                        <div
                            key={template.id}
                            onClick={() => setSelectedTemplate(template)}
                            className={`cursor-pointer border-2 rounded-lg overflow-hidden transition 
                                    ${selectedTemplate?.id === template.id
                                    ? "border-orange-500 scale-105"
                                    : "border-gray-200 hover:scale-105"
                                }`}
                        >
                            <img
                                key={template.id}
                                src={template.image}
                                alt={template.name}
                                className="w-full h-40 object-cover"
                            />
                        </div>
                    ))}
                </div>

                <button
                    onClick={() => {
                        if (!selectedTemplate) {
                            alert("Please select one template")
                            return
                        }

                        navigate('/text', { state: { template: selectedTemplate } })
                    }}
                    className="rounded-md bg-orange-700 px-3.5 py-2.5 text-sm font-semibold text-white transition duration-300 hover:scale-105 hover:bg-orange-800"
                >
                    Create Message
                </button>
            </div>
        </Layout>
    )
}