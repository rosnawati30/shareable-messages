export default function Footer() {
    return (
        <footer className="bg-orange-700 text-yellow-200 py-6">
            <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex:row justify-between items-center">
                <p className="text-sm">
                    ©{new Date().getFullYear()} Luminara. All rights reserved.
                </p>
            </div>
        </footer>
    )
}