"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Header from "@/components/layout/header"

// Sample data for different time periods
const sampleData = {
  day: [
    { label: "12/12", value: 180, unit: "g" },
    { label: "12/13", value: 220, unit: "g" },
    { label: "12/14", value: 150, unit: "g" },
    { label: "12/15", value: 280, unit: "g" },
    { label: "12/16", value: 200, unit: "g" },
    { label: "12/17", value: 320, unit: "g" },
    { label: "12/18", value: 190, unit: "g" },
    { label: "12/19", value: 250, unit: "g" },
    { label: "12/20", value: 300, unit: "g" },
    { label: "今日", value: 250, unit: "g" },
  ],
  month: [
    { label: "7月", value: 4.2, unit: "kg" },
    { label: "8月", value: 5.8, unit: "kg" },
    { label: "9月", value: 6.1, unit: "kg" },
    { label: "10月", value: 7.3, unit: "kg" },
    { label: "11月", value: 8.5, unit: "kg" },
    { label: "今月", value: 7.5, unit: "kg" },
  ],
  year: [
    { label: "2020", value: 65, unit: "kg" },
    { label: "2021", value: 78, unit: "kg" },
    { label: "2022", value: 85, unit: "kg" },
    { label: "2023", value: 92, unit: "kg" },
    { label: "今年", value: 90, unit: "kg" },
  ],
}

const nationalAverageData = {
  day: { value: 200, unit: "g" },
  month: { value: 6.0, unit: "kg" },
  year: { value: 72, unit: "kg" },
}

const getEnvironmentalImpact = (totalValue: number, unit: string) => {
  let trees = 0
  let message = ""

  if (unit === "g") {
    trees = Math.floor(totalValue / 2000)
    if (trees >= 1) {
      message = `🌳 木が${trees}本守れました！`
    } else {
      message = `🌱 小さな芽を${Math.floor(totalValue / 200)}個育てました！`
    }
  } else if (unit === "kg") {
    trees = Math.floor(totalValue / 2)
    if (trees >= 1) {
      message = `🌳 木が${trees}本守れました！`
    } else {
      message = `🌱 小さな芽を${Math.floor(totalValue * 5)}個育てました！`
    }
  }

  return message
}

export default function EcoboardPage() {
  const [timeUnit, setTimeUnit] = useState<"day" | "month" | "year">("day")
  const router = useRouter()

  const currentData = sampleData[timeUnit]
  const maxValue = Math.max(...currentData.map((item) => item.value))
  const totalValue = currentData.reduce((sum, item) => sum + item.value, 0)

  const getTimeUnitLabel = () => {
    switch (timeUnit) {
      case "day":
        return "過去10日間"
      case "month":
        return "過去半年間"
      case "year":
        return "過去5年間"
      default:
        return ""
    }
  }

  const shareText = `We Planetで${getTimeUnitLabel()}のCO₂削減量は合計${totalValue.toFixed(1)}${currentData[0].unit}でした！みんなで地球を守ろう！ #WePlanet #エコ活動`

  const handleShare = (platform: string) => {
    const encodedText = encodeURIComponent(shareText)
    const url = encodeURIComponent(window.location.origin)

    let shareUrl = ""
    switch (platform) {
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${encodedText}`
        break
      case "twitter":
        shareUrl = `https://twitter.com/intent/tweet?text=${encodedText}&url=${url}`
        break
      case "instagram":
        navigator.clipboard.writeText(shareText)
        alert("テキストをクリップボードにコピーしました！Instagramアプリで投稿してください。")
        return
    }

    if (shareUrl) {
      window.open(shareUrl, "_blank", "width=600,height=400")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-green-400 to-blue-600">
      <Header currentPage="/ecoboard" />

      <div className="flex items-center justify-center p-4 relative overflow-hidden">
        {/* Space background elements */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-10 w-2 h-2 bg-white rounded-full animate-pulse"></div>
          <div className="absolute top-20 right-20 w-1 h-1 bg-white rounded-full animate-pulse delay-300"></div>
          <div className="absolute bottom-20 left-20 w-1.5 h-1.5 bg-white rounded-full animate-pulse delay-700"></div>
          <div className="absolute bottom-10 right-10 w-2 h-2 bg-white rounded-full animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/4 w-1 h-1 bg-white rounded-full animate-pulse delay-500"></div>
          <div className="absolute top-1/3 right-1/3 w-1.5 h-1.5 bg-white rounded-full animate-pulse delay-200"></div>
        </div>

        {/* Earth illustration */}
        <div className="absolute bottom-0 right-0 w-64 h-64 opacity-30">
          <div className="w-full h-full bg-gradient-to-br from-green-300 to-blue-400 rounded-full relative">
            <div className="absolute top-4 left-8 w-12 h-8 bg-green-500 rounded-full opacity-70"></div>
            <div className="absolute top-12 right-6 w-8 h-6 bg-green-500 rounded-full opacity-70"></div>
            <div className="absolute bottom-8 left-12 w-16 h-10 bg-green-500 rounded-full opacity-70"></div>
          </div>
        </div>

        <Card className="w-full max-w-lg bg-white/90 backdrop-blur-sm shadow-2xl border-0 mt-4">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              📊 エコボード
            </CardTitle>
            <p className="text-lg text-gray-600 font-medium">CO₂削減量をチェック！</p>
            <div className="bg-gradient-to-r from-green-50 to-blue-50 p-4 rounded-xl border-2 border-green-200 text-center">
              <p className="text-lg font-bold text-green-700">
                {getEnvironmentalImpact(totalValue, currentData[0].unit)}
              </p>
              <p className="text-sm text-gray-600 mt-1">
                全国平均より
                {totalValue > nationalAverageData[timeUnit].value
                  ? `${(totalValue - nationalAverageData[timeUnit].value).toFixed(1)}${currentData[0].unit}多く`
                  : `${(nationalAverageData[timeUnit].value - totalValue).toFixed(1)}${currentData[0].unit}少なく`}
                削減
              </p>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Mission Challenge Section */}
            <div className="bg-gradient-to-r from-orange-100 to-red-100 p-4 rounded-xl border-2 border-orange-200 text-center">
              <h3 className="text-lg font-bold text-orange-700 mb-2">🎯 今日のエコ活動</h3>
              <p className="text-sm text-orange-600 mb-3">新しいミッションにチャレンジして、さらにCO₂を削減しよう！</p>
              <Button
                onClick={() => router.push("/mission")}
                className="w-full h-12 text-lg font-bold bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-200"
              >
                🚀 今日のミッションにチャレンジする
              </Button>
            </div>

            {/* Time unit selector */}
            <div className="flex gap-2">
              {(["day", "month", "year"] as const).map((unit) => (
                <Button
                  key={unit}
                  onClick={() => setTimeUnit(unit)}
                  variant={timeUnit === unit ? "default" : "outline"}
                  className={`flex-1 h-10 font-bold rounded-lg transition-all duration-200 ${
                    timeUnit === unit
                      ? "bg-gradient-to-r from-green-500 to-blue-500 text-white"
                      : "border-2 border-green-200 hover:border-green-400"
                  }`}
                >
                  {unit === "day" ? "日" : unit === "month" ? "月" : "年"}
                </Button>
              ))}
            </div>

            {/* Chart title and total */}
            <div className="text-center space-y-2">
              <h3 className="text-lg font-bold text-gray-700">{getTimeUnitLabel()}のCO₂削減量</h3>
              <p className="text-2xl font-bold text-green-600">
                合計: {totalValue.toFixed(1)}
                {currentData[0].unit}
              </p>
            </div>

            {/* Bar Chart */}
            <div className="bg-white p-4 rounded-xl border-2 border-green-100 relative">
              <div className="flex items-end justify-between h-48 gap-1">
                {currentData.map((item, index) => {
                  const height = (item.value / maxValue) * 100
                  const isToday = item.label.includes("今") || item.label.includes("今日")

                  return (
                    <div key={index} className="flex-1 flex flex-col items-center gap-2">
                      <div className="flex flex-col items-center justify-end h-40">
                        <div className="text-xs font-semibold text-gray-600 mb-1">
                          {item.value}
                          {item.unit}
                        </div>
                        <div
                          className={`w-full rounded-t-md transition-all duration-1000 ease-out ${
                            isToday
                              ? "bg-gradient-to-t from-orange-400 to-red-500"
                              : "bg-gradient-to-t from-green-400 to-emerald-500"
                          }`}
                          style={{
                            height: `${height}%`,
                            minHeight: "8px",
                          }}
                        />
                      </div>
                      <div
                        className={`text-xs font-semibold text-center px-1 ${
                          isToday ? "text-orange-600" : "text-gray-600"
                        }`}
                      >
                        {item.label}
                      </div>
                    </div>
                  )
                })}
              </div>
              <div className="absolute inset-0 flex items-end">
                <div
                  className="w-full border-t-2 border-dashed border-red-400 relative"
                  style={{
                    bottom: `${(nationalAverageData[timeUnit].value / maxValue) * 100}%`,
                  }}
                >
                  <span className="absolute -top-6 right-0 text-xs font-bold text-red-500 bg-white px-2 rounded">
                    全国平均: {nationalAverageData[timeUnit].value}
                    {nationalAverageData[timeUnit].unit}
                  </span>
                </div>
              </div>
            </div>

            {/* Share buttons */}
            <div className="space-y-3">
              <h4 className="text-lg font-bold text-gray-700 text-center">成果をシェアしよう！</h4>
              <div className="grid grid-cols-3 gap-2">
                <Button
                  onClick={() => handleShare("facebook")}
                  className="h-12 text-sm font-bold bg-blue-600 hover:bg-blue-700 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-200"
                >
                  📘 Facebook
                </Button>
                <Button
                  onClick={() => handleShare("twitter")}
                  className="h-12 text-sm font-bold bg-black hover:bg-gray-800 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-200"
                >
                  🐦 X
                </Button>
                <Button
                  onClick={() => handleShare("instagram")}
                  className="h-12 text-sm font-bold bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-200"
                >
                  📷 Instagram
                </Button>
              </div>
            </div>

            {/* 写真ギャラリー */}
            <div className="space-y-3">
              <h4 className="text-lg font-bold text-gray-700 text-center">📸 エコ活動の記録</h4>
              <div className="grid grid-cols-3 gap-2 max-h-32 overflow-y-auto">
                <div className="aspect-square bg-gradient-to-br from-green-100 to-blue-100 rounded-lg border-2 border-green-200 flex items-center justify-center">
                  <span className="text-2xl">🌱</span>
                </div>
                <div className="aspect-square bg-gradient-to-br from-orange-100 to-yellow-100 rounded-lg border-2 border-orange-200 flex items-center justify-center">
                  <span className="text-2xl">♻️</span>
                </div>
                <div className="aspect-square bg-gradient-to-br from-purple-100 to-pink-100 rounded-lg border-2 border-purple-200 flex items-center justify-center">
                  <span className="text-2xl">🚲</span>
                </div>
              </div>
              <p className="text-sm text-gray-600 text-center">ミッション達成時の写真が表示されます</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
