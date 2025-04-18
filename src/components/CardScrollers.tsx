"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import CardDataStats from "./CardDataStats";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";
import * as echarts from "echarts";
import { getCountBudgetPerYears } from "@/service/budget";
import { PieChartRealisasiStatusEvaluasi } from "./Chart/PieChartRealisasiStatusEvaluasi";

interface CountBudgetData {
  tahun: number;
  totalAnggaran: number;
  sisaAnggaran: number;
  penyerapanAnggaran: number;
}

const ScrollableCards: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState(false);
  const [countBudgetData, setCountBudgetData] = useState<CountBudgetData>({
    tahun: 0,
    totalAnggaran: 0,
    sisaAnggaran: 0,
    penyerapanAnggaran: 0,
  });
  const { userData } = useAuth();

  const year = new Date().getFullYear();


  const fetchCountBudgetPerYears = useCallback(async () => {
    try {
      const data = await getCountBudgetPerYears(year);
      setCountBudgetData({
        tahun: data.tahun,
        totalAnggaran: data.total_anggaran,
        sisaAnggaran: data.sisa_anggaran,
        penyerapanAnggaran: data.penyerapan_anggaran,
      });
    } catch (error) {
      setError(false);
    }
  }, [year]);


  
  const formatCurrencyShort = (value: number): string => {
    if (value >= 1_000_000_000) {
      return `${(value / 1_000_000_000).toFixed()} miliar`;
    } else if (value >= 1_000_000) {
      return `${(value / 1_000_000).toFixed()} juta`;
    } else if (value >= 1_000) {
      return `${(value / 1_000).toFixed()} ribu`;
    } else {
      return `${value} rupiah`;
    }
  };

  useEffect(() => {
    fetchCountBudgetPerYears();
  }, [year, fetchCountBudgetPerYears]);

  
  return (
    <>
      {(userData?.role === "admin" || userData?.role === "super admin") && (
        <div className="flex flex-col lg:flex-row gap-4 p-4">
          {/* Say Hay TO admin */}
          <div className=" rounded-lg bg-blue-500 p-8 pb-0 text-white shadow-lg w-full lg:w-2/5">
            <div className="flex jutify-center items-center md:items-start gap-4">
              <div className="flex flex-col items-center justify-center">
                <h1 className="text-base font-bold">
                  {userData?.nama?.split(" ").slice(0, 2).join(" ")}
                </h1>{" "}
                <p className="text-xs">Selamat datang di N4TALENT</p>
                <div className="mt-3 flex flex-col justify-center space-y-4 md:flex-row md:justify-start md:space-x-6 md:space-y-0">
                  <div className="rounded-lg bg-blue-800 p-4 text-center">
                    <p className="text-base font-bold">
                      {countBudgetData.penyerapanAnggaran
                        ? formatCurrencyShort(
                            countBudgetData.penyerapanAnggaran,
                          )
                        : "0"}
                    </p>
                    <p className="text-xs">Terpakai</p>
                  </div>
                  <div className="rounded-lg bg-blue-800 p-4 text-center">
                    <p className="text-base font-bold">
                      {Math.round(
                        (countBudgetData.penyerapanAnggaran /
                          countBudgetData.totalAnggaran) *
                          100,
                      )}
                      %
                    </p>
                    <p className="text-xs">Terpakai</p>
                  </div>
                </div>
              </div>
              <Image
                width={200}
                height={50}
                src={"/images/logo/make-social-media.webp"}
                alt="Logo DASHBOARD"
              />
            </div>
          </div>

          {/* Card Scrollable */}
          <div
            ref={scrollRef}
            className=" flex cursor-grab space-x-4 overflow-x-auto active:cursor-grabbing w-full lg:w-2/3"
            style={{
              overflow: "hidden",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            <div className="flex min-w-fit space-x-4">
              <CardDataStats
                title="Total Anggaran"
                total={
                  countBudgetData.totalAnggaran
                    ? countBudgetData.totalAnggaran.toLocaleString()
                    : 0
                }
                colorClass="bg-gradient-to-br from-pink-100 to-pink-200"
              >
                <PieChartRealisasiStatusEvaluasi
                  value={countBudgetData.totalAnggaran}
                  title="Total Anggaran"
                  color="#4caf50"
                  total={countBudgetData.totalAnggaran}                
                />
              </CardDataStats>
              <CardDataStats
                title="Penyerapan Anggaran"
                total={
                  countBudgetData.penyerapanAnggaran
                    ? countBudgetData.penyerapanAnggaran.toLocaleString()
                    : 0
                }
                colorClass="bg-gradient-to-br from-green-100 to-green-200"
              >
                <PieChartRealisasiStatusEvaluasi
                  value={countBudgetData.penyerapanAnggaran}
                  title="Penyerapan Anggaran"
                  color="#ed4a4a"
                  total={countBudgetData.totalAnggaran}                
                />
              </CardDataStats>
              <CardDataStats
                title="Sisa Anggaran"
                total={
                  countBudgetData.sisaAnggaran
                    ? countBudgetData.sisaAnggaran.toLocaleString()
                    : 0
                }
                rate={`${100 - Math.round((countBudgetData.sisaAnggaran / countBudgetData.totalAnggaran) * 100)}%`}
                colorClass="bg-gradient-to-br from-blue-100 to-blue-200"
                levelDown
              >
                <PieChartRealisasiStatusEvaluasi
                  value={countBudgetData.sisaAnggaran}
                  title="Sisa Anggaran"
                  color="#ff4f00"
                  total={countBudgetData.totalAnggaran}                
                />
              </CardDataStats>
            
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ScrollableCards;
