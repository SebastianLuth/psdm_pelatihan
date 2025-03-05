"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import CardDataStats from "./CardDataStats";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";
import * as echarts from "echarts";
import { getCountBudgetPerYears } from "@/service/budget";

interface CountBudgetData {
  tahun: number;
  totalAnggaran: number;
  sisaAnggaran: number;
  penyerapanAnggaran: number;
}

const ScrollableCards: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState(false);
  const [countBudgetData, setCountBudgetData] = useState<CountBudgetData>({
    tahun: 0,
    totalAnggaran: 0,
    sisaAnggaran: 0,
    penyerapanAnggaran: 0,
  });
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const { userData } = useAuth();

  const year = new Date().getFullYear();

  const handleMouseDown = (e: React.MouseEvent) => {
    if (scrollRef.current) {
      setIsDragging(true);
      setStartX(e.pageX - scrollRef.current.offsetLeft);
      setScrollLeft(scrollRef.current.scrollLeft);
    }
  };

  const handleMouseLeaveOrUp = () => {
    setIsDragging(false);
  };

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

  const renderChart = useCallback(
    (
      container: HTMLDivElement | null,
      value: number,
      title: string,
      color: string,
    ) => {
      if (!container) return;

      const chart = echarts.init(container);
      chart.setOption({
        title: {
          text: `${Math.round((value / countBudgetData.totalAnggaran) * 100)}%`,
          left: "center",
          top: "center",
          textStyle: {
            fontSize: 20,
            fontWeight: "bold",
          },
        },
        series: [
          {
            type: "pie",
            radius: ["70%", "90%"],
            avoidLabelOverlap: false,
            label: {
              show: false,
            },
            labelLine: {
              show: false,
            },
            data: [
              { value, name: title, itemStyle: { color } },
              {
                value: countBudgetData.totalAnggaran - value,
                name: "Remaining",
                itemStyle: { color: "#e0e0e0" },
              },
            ],
          },
        ],
      });

      window.addEventListener("resize", () => {
        chart.resize();
      });
    },
    [countBudgetData.totalAnggaran],
  );

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 1.5; // Speed multiplier
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };
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

  useEffect(() => {
    renderChart(
      document.getElementById("chart-total-anggaran") as HTMLDivElement,
      countBudgetData.totalAnggaran,
      "Total Anggaran",
      "#ff6b6b",
    );
    renderChart(
      document.getElementById("chart-sisa-anggaran") as HTMLDivElement,
      countBudgetData.sisaAnggaran,
      "Sisa Anggaran",
      "#4caf50",
    );
    renderChart(
      document.getElementById("chart-penyerapan-anggaran") as HTMLDivElement,
      countBudgetData.penyerapanAnggaran,
      "Penyerapan Anggaran",
      "#2196f3",
    );
  }, [countBudgetData, renderChart]);
  return (
    <>
      {(userData?.role === "admin" || userData?.role === "super admin") && (
        <div className="flex gap-4 p-4">
          {/* Say Hay TO admin */}
          <div className=" rounded-lg bg-blue-500 p-6 pb-0 text-white shadow-lg md:col-span-3">
            <div className="flex items-center md:items-start">
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
            className=" flex cursor-grab space-x-4 overflow-x-auto active:cursor-grabbing md:col-span-4"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeaveOrUp}
            onMouseUp={handleMouseLeaveOrUp}
            style={{
              overflow: "hidden",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            <div className="flex min-w-fit space-x-2">
              <CardDataStats
                title="Total Anggaran"
                total={
                  countBudgetData.totalAnggaran
                    ? countBudgetData.totalAnggaran.toLocaleString()
                    : 0
                }
                colorClass="bg-gradient-to-br from-pink-100 to-pink-200"
              >
                <div
                  id="chart-total-anggaran"
                  style={{ width: 100, height: 100 }}
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
                <div
                  id="chart-sisa-anggaran"
                  style={{ width: 100, height: 100 }}
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
                <div
                  id="chart-penyerapan-anggaran"
                  style={{ width: 100, height: 100 }}
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
