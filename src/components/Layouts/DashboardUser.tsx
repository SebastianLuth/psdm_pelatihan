import { FaRegTimesCircle } from "react-icons/fa";
import { FaThumbsUp } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import MyCalendar from "../calendar/page";
import { TrainingType } from "@/types/training-types";
import { useEffect, useState } from "react";
import { getAllTrainingEvaluation1 } from "@/service/evaluation1";
import { useAuth } from "@/context/AuthContext";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

export const DashboardUser = () => {
    const userData = useAuth().userData;
    const [error, setError] = useState(false);
    const [trainingData, setTrainingData] = useState<TrainingType[]>([]);

    const router = useRouter();

    const fetchAllTraining = async () => {
    try {
        const result = await getAllTrainingEvaluation1();
        setTrainingData(result);
    } catch (error) {
        setError(true);
    }
    };

     const userTraining = trainingData.filter(
        (training) => {
          return training.user_id == userData?.id
        } 
      );
    
      useEffect(() => {
        if (userData?.role === "user") fetchAllTraining();
      }, [userData?.role]);

       const handleEvaluationClick = (
          tglSelesai: string,
          trainingId: number | undefined
        ) => {
          const trainingEndDate = new Date(tglSelesai);
          const currentDate = new Date();
        
          if (currentDate < trainingEndDate) {
            Swal.fire({
              icon: "warning",
              title: "Evaluasi Belum Dapat Dilakukan",
              text: "Pelatihan belum selesai, silakan coba lagi nanti.",
              confirmButtonColor: "#f39c12",
            });
          } else {
            Swal.fire({
              icon: "success",
              title: "Evaluasi Tersedia",
              text: "Evaluasi sudah dapat dilakukan.",
              confirmButtonText: "Mulai Evaluasi",
              confirmButtonColor: "#28a745",
            }).then((result) => {
              if (result.isConfirmed) {
                router.push(`/training/evaluation_training1/${trainingId}/answer_evaluation`);
              }
            });
          }
        };

  return (
    <>
      <div className="my-4 flex flex-col items-center justify-center">
        {/* Carousel Section */}
        <div className="w-full max-w-6xl px-4">
          <Swiper
            slidesPerView={1} // Default untuk layar kecil
            spaceBetween={16} // Jarak antar card
            pagination={{ clickable: true }} // Pagination
            breakpoints={{
              480: {
                slidesPerView: 2, // Pada layar kecil (mobile), tampilkan 2 card
              },
              768: {
                slidesPerView: 3, // Pada layar tablet, tampilkan 3 card
              },
              1024: {
                slidesPerView: 4, // Pada layar desktop, tampilkan 4 card
              },
            }}
            modules={[Pagination]}
            className="mySwiper"
          >
            {
                userTraining.map((training) => {
                    return(
                        <SwiperSlide
                    key={training.id}
                    >
                    <div className="w-full rounded-2xl border border-gray-200 bg-white p-4 shadow-xl transition-all duration-300 hover:shadow-2xl dark:border-gray-700 dark:bg-gray-800">
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm font-bold text-gray-800 dark:text-white sm:text-base">
                          Evaluation Level 1
                        </h3>
                      </div>
                      <p className="mt-1 text-xs font-medium text-gray-600 dark:text-gray-300 sm:text-sm">
                        {training.telah_evaluasi ? "Anda Sudah Evaluasi" : "Anda Belum Evaluasi"}
                      </p>
                      <div className="mt-2 w-full rounded-xl bg-gray-50 px-3 py-2 shadow-md transition-all duration-300 hover:scale-105 hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600">
                        <div className="flex items-center justify-between">
                          <h3 className="text-sm font-bold text-gray-800 dark:text-white">
                            {training.judul}
                          </h3>
                          <p className="text-[10px] text-gray-500 dark:text-gray-300">
                            {training.kompetensi}
                          </p>
                        </div>
                        <p className="mt-1 text-xs text-gray-600 dark:text-gray-200">
                          {training.telah_evaluasi ? "Terimakasih Telah Melakukan Evaluasi, Mudah-Mudahan Pelatihan Anda Menjadi Lebih Baik" : "Anda Belum Melakukan Evaluasi, Mohon segera dilakukan"}
                        </p>
                      </div>
                      <button 
                      onClick={() =>
                        handleEvaluationClick(
                          training.tgl_selesai,
                          training.id,
                        )
                      }
                      className={`mt-2 flex w-full transform items-center justify-center rounded-lg border px-3 py-1 text-xs font-medium shadow-md transition-all duration-300 hover:-translate-y-1 hover:scale-105 focus:outline-none active:scale-95 
                        ${training.telah_evaluasi 
                          ? "border-green-500 bg-green-50 text-green-600 hover:bg-green-500 hover:text-white dark:hover:bg-green-600" 
                          : "border-red-500 bg-red-50 text-red-600 hover:bg-red-500 hover:text-white dark:hover:bg-red-600"} 
                        dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:hover:text-white`}
                    //   disabled={training.telah_evaluasi}
                      >
                        {
                            training.telah_evaluasi ? (
                                <>
                                    <FaThumbsUp className="mr-1 h-4 w-4 sm:mr-2" />
                                     Evaluasi Telah Dilakukan
                                </>
                            ) : (
                                <>
                                <FaRegTimesCircle className="mr-1 h-4 w-4 sm:mr-2" />
                                Evaluasi Sekarang
                                </>
                            )
                        }
                        
                      </button>
                    </div>
                  </SwiperSlide>
                    )
                })
            }
          </Swiper>
        </div>

        {/* Calendar Section */}
        <div className="mt-8 w-full max-w-6xl px-4">
          <MyCalendar />
        </div>
      </div>
    </>
  );
};