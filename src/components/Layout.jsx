export default function Layout({children}){
    return(
        <main className="min-h-screen flex justify-center">
            <div className="w-full">
                {children}
            </div>
        </main>
    )
}