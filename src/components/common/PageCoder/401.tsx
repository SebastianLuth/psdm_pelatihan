import Image from "next/image"
import Link from "next/link"

export const NotFoundPage = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <Link href="/">
                Kembali Kehalaman Awal
            </Link>
        </div>
    )
}
