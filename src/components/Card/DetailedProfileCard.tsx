import { User } from "@/types/manajement-users-type";
import Image from "next/image";
type DetailedProfileCardProps = {
    user : User;
}
export default function DetailedProfileCard ({user} : DetailedProfileCardProps) {
    return(
        <div className="col-span-1 w-full rounded-2xl bg-white p-6 shadow-lg">
        <div className="flex flex-col items-center">
          <span className="h-25 w-25 rounded-full">
            <Image
              width={150}
              height={150}
              src={"/images/user/user-01.png"}
              style={{
                width: "auto",
                height: "auto",
              }}
              alt="User"
            />
          </span>
          <h3 className="text-center text-2xl font-semibold text-gray-800">
            {user.nama}
          </h3>
          <p className="text-center text-sm text-gray-500">
            {user.jabatan}
          </p>
        </div>

        <div className="mt-6 space-y-4">
          <div className="flex justify-between rounded-lg bg-gray-100 px-4 py-3">
            <span className="font-medium text-gray-600">Nomor HP</span>
            <span className="text-gray-800">{user.nomor_hp}</span>
          </div>
          <div className="flex justify-between rounded-lg bg-gray-100 px-4 py-3">
            <span className="font-medium text-gray-600">
              Total Biaya Pelatihan
            </span>
            <span className="font-semibold text-green-600">
              Rp {user.biaya_pelatihan_user.toLocaleString("id-ID")},00
            </span>
          </div>
          <div className="flex justify-between rounded-lg bg-gray-100 px-4 py-3">
            <span className="font-medium text-gray-600">
              Level Jabatan
            </span>
            <span className="text-indigo-600">BOD - {user.level}</span>
          </div>
          <div className="flex justify-between rounded-lg bg-gray-100 px-4 py-3">
            <span className="font-medium text-gray-600">Unit Kerja</span>
            <span className="text-gray-800">
              Bagian Perencanaan & Sustainability
            </span>
          </div>
          <div className="rounded-lg bg-red-500 px-4 py-2 text-center font-semibold text-white">
            Role: {user.role}
          </div>
        </div>
      </div>
    )
}