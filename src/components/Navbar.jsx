import { useState, useEffect } from "react"

const navigation = [
    { name: 'Home' },
    { name: 'About' }
]

export default function Navbar({ activeMenu, scrollTo }) {
    const [show, setShow] = useState(true)
    const [lastScrollY, setLastScrollY] = useState(0)

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY

            if (currentScrollY > lastScrollY) {
                setShow(false)
            } else {
                setShow(true)
            }

            setLastScrollY(currentScrollY)
        }

        window.addEventListener('scroll', handleScroll)

        return () => window.removeEventListener('scroll', handleScroll)
    }, [lastScrollY])

    return (
        <div
            className={`fixed top-0 w-full z-50 bg-orange-700 py-5 text-white font-bold shadow-md transition-opacity duration-300
                ${show ? "opacity-100" : "opacity-0"} hover:opacity-100`}
        >
            <div className="flex items-center justify-center gap-4 mt-3 md:mt-0">
                {navigation.map((item) => (
                    <button
                        key={item.name}
                        onClick={() => scrollTo && scrollTo(item.name)}
                        className={`transition-colors duration-200 ${activeMenu === item.name
                                ? "text-yellow-200"
                                : "text-white hover:text-yellow-200"
                            }`}
                    >
                        {item.name}
                    </button>
                ))}

            </div>
        </div>
    )
}