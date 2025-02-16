import Link from "next/link";

export const NotFoundComponent = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4"
        style={{ 
          backgroundImage: 'url("/images/404.png")', 
          backgroundSize: 'cover', 
          backgroundPosition: 'center', 
          backgroundPositionY : '-100px'
        }}
    >
      {/* Konten utama */}
      <div className="flex flex-col items-center text-center space-y-2 mt-70">
        <h2 className="text-xl md:text-3xl font-bold mt-2">Halaman Ini Tidak Ditemukan</h2>
        <p className="text-base md:text-lg text-gray-600">
          Maaf, halaman yang Anda cari tidak tersedia.
        </p>
        <Link
          href="/"
          className="bg-blue-600 hover:bg-blue-800 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 shadow-lg mt-10"
        >
          Kembali ke Dashboard
        </Link>
      </div>
    </div>
  );
};
