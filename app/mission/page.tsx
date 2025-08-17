"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import Header from "@/components/layout/header"

const missions = [
  { text: "エコバッグを持参しよう！", points: 25, co2: 150 },
  { text: "電気をこまめに消そう！", points: 30, co2: 200 },
  { text: "水を大切に使おう！", points: 20, co2: 120 },
  { text: "ゴミを分別しよう！", points: 35, co2: 180 },
  { text: "自転車や徒歩で移動しよう！", points: 40, co2: 300 },
  { text: "リサイクルできるものを探そう！", points: 25, co2: 160 },
  { text: "食べ物を残さず食べよう！", points: 30, co2: 140 },
  { text: "エアコンの温度を調整しよう！", points: 35, co2: 250 },
  { text: "マイボトルを持参しよう！", points: 20, co2: 100 },
  { text: "LED電球に交換しよう！", points: 45, co2: 350 },
]

const badges = ["ジャイアントパンダ", "トキ", "アオウミガメ", "キンモクセイ", "ホッキョクグマ", "コアラ"]

export default function MissionPage() {
  const [showConfirmation, setShowConfirmation] = useState(true)
  const [isAnimating, setIsAnimating] = useState(false)
  const [showDecided, setShowDecided] = useState(false)
  const [currentMission, setCurrentMission] = useState<(typeof missions)[0] | null>(null)
  const [showMission, setShowMission] = useState(false)
  const [result, setResult] = useState<"success" | null>(null)
  const [showPhotoUpload, setShowPhotoUpload] = useState(false)
  const router = useRouter()

  const startMissionAnimation = () => {
    setShowConfirmation(false)
    setIsAnimating(true)

    // 派手なガチャガチャアニメーション
    const animationDuration = 4000
    const interval = 80
    let elapsed = 0

    const animationInterval = setInterval(() => {
      const randomMission = missions[Math.floor(Math.random() * missions.length)]
      setCurrentMission(randomMission)
      elapsed += interval

      if (elapsed >= animationDuration) {
        clearInterval(animationInterval)
        setIsAnimating(false)
        setShowDecided(true)

        // 2秒後にミッション表示画面に遷移
        setTimeout(() => {
          setShowDecided(false)
          setShowMission(true)
        }, 2000)
      }
    }, interval)
  }

  const changeMission = () => {
    const newMission = missions[Math.floor(Math.random() * missions.length)]
    setCurrentMission(newMission)
  }

  const handleSuccess = () => {
    setResult("success")
    setShowPhotoUpload(true)
  }

  const handlePhotoUpload = () => {
    router.push("/photo-upload")
  }

  const getRandomBadge = () => {
    return badges[Math.floor(Math.random() * badges.length)]
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-green-400 to-blue-600">
      <Header currentPage="/mission" />

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
            <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
              🎯 Today's Mission
            </h1>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Confirmation Screen */}
            {showConfirmation && (
              <div className="text-center space-y-6">
                <div className="bg-gradient-to-r from-yellow-100 to-orange-100 p-6 rounded-xl border-2 border-orange-200">
                  <h2 className="text-xl font-bold text-gray-800 mb-4">本日のミッションにチャレンジしますか？</h2>
                  <p className="text-sm text-gray-600">お子さんにボタンを押してもらいましょう！</p>
                </div>
                <Button
                  onClick={startMissionAnimation}
                  className="w-full h-16 text-xl font-bold bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-200"
                >
                  🎲 ミッションを受け取る！
                </Button>
              </div>
            )}

            {/* Enhanced Animation Screen */}
            {isAnimating && (
              <div className="text-center space-y-6">
                <div className="bg-gradient-to-r from-purple-100 via-pink-100 to-yellow-100 p-6 rounded-xl border-4 border-rainbow animate-pulse relative overflow-hidden">
                  {/* キラキラエフェクト */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-50 animate-ping"></div>
                  <div className="absolute top-2 left-2 text-yellow-400 animate-bounce">✨</div>
                  <div className="absolute top-2 right-2 text-pink-400 animate-bounce delay-200">🌟</div>
                  <div className="absolute bottom-2 left-2 text-blue-400 animate-bounce delay-400">💫</div>
                  <div className="absolute bottom-2 right-2 text-green-400 animate-bounce delay-600">⭐</div>

                  <div className="text-8xl mb-4 animate-spin transform scale-110">🎰</div>
                  <h2 className="text-3xl font-bold text-purple-800 animate-bounce transform scale-105">
                    {currentMission?.text}
                  </h2>
                  <p className="text-lg text-purple-600 mt-2 animate-pulse font-bold">🎪 ミッション抽選中... 🎪</p>
                  <div className="flex justify-center gap-2 mt-4">
                    <div className="w-3 h-3 bg-red-400 rounded-full animate-bounce"></div>
                    <div className="w-3 h-3 bg-yellow-400 rounded-full animate-bounce delay-100"></div>
                    <div className="w-3 h-3 bg-green-400 rounded-full animate-bounce delay-200"></div>
                    <div className="w-3 h-3 bg-blue-400 rounded-full animate-bounce delay-300"></div>
                  </div>
                </div>
              </div>
            )}

            {/* Mission Decided Screen */}
            {showDecided && (
              <div className="text-center space-y-6">
                <div className="bg-gradient-to-r from-green-100 to-emerald-100 p-8 rounded-xl border-4 border-green-300 relative overflow-hidden">
                  {/* 花火エフェクト */}
                  <div className="absolute inset-0">
                    <div className="absolute top-4 left-4 text-2xl animate-ping">🎉</div>
                    <div className="absolute top-4 right-4 text-2xl animate-ping delay-200">🎊</div>
                    <div className="absolute bottom-4 left-4 text-2xl animate-ping delay-400">🎈</div>
                    <div className="absolute bottom-4 right-4 text-2xl animate-ping delay-600">🎁</div>
                  </div>

                  <div className="text-6xl mb-4 animate-bounce">🎯</div>
                  <h2 className="text-3xl font-bold text-green-700 mb-4 animate-pulse">ミッションが決まりました！</h2>
                  <div className="text-6xl animate-spin">🌟</div>
                </div>
              </div>
            )}

            {/* Mission Display */}
            {showMission && !result && currentMission && (
              <div className="text-center space-y-4">
                <div className="bg-gradient-to-r from-yellow-100 to-orange-100 p-6 rounded-xl border-2 border-orange-200">
                  <h2 className="text-xl font-bold text-gray-800 mb-2">今日のミッション</h2>
                  <p className="text-2xl font-bold text-orange-700 mb-4">{currentMission.text}</p>

                  {/* 獲得予定ポイントとCO2削減量 */}
                  <div className="bg-white/80 p-4 rounded-lg border border-orange-300">
                    <div className="flex justify-between items-center text-sm font-semibold">
                      <div className="flex items-center gap-1">
                        <span className="text-orange-600">⭐</span>
                        <span>獲得ポイント: {currentMission.points}pt</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="text-green-600">🌱</span>
                        <span>CO₂削減: {currentMission.co2}g</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button
                    onClick={changeMission}
                    className="flex-1 h-12 text-lg font-bold bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-200"
                  >
                    🔄 ミッション変更
                  </Button>
                  <Button
                    onClick={handleSuccess}
                    className="flex-1 h-12 text-lg font-bold bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-200"
                  >
                    ✅ 達成できた
                  </Button>
                </div>
              </div>
            )}

            {/* Success Result */}
            {result === "success" && currentMission && (
              <div className="space-y-4 text-center">
                <div className="bg-gradient-to-r from-green-100 to-emerald-100 p-6 rounded-xl border-2 border-green-200">
                  <h3 className="text-2xl font-bold text-green-700 mb-4">🎉 おめでとうございます！</h3>
                  <div className="space-y-2 text-lg font-semibold">
                    <p className="text-orange-600">⭐ {currentMission.points}ポイントGET！</p>
                    <p className="text-blue-600">🌱 CO₂ {currentMission.co2}g 削減！</p>
                    <p className="text-purple-600">🏆 エコバッジ『{getRandomBadge()}』をGET！</p>
                  </div>
                  <div className="mt-4 text-6xl">🐼</div>
                </div>

                {/* 東京ガス機器交換・見積りリンク */}
                <div className="bg-gradient-to-r from-blue-100 to-cyan-100 p-4 rounded-xl border-2 border-blue-200">
                  <h4 className="text-lg font-bold text-blue-700 mb-3">🔧 さらなるエコ活動のために</h4>
                  <p className="text-sm text-blue-600 mb-3">省エネ機器への交換でもっとCO₂を削減しませんか？</p>
                  <div className="space-y-2">
                    <a
                      href="https://home.tokyo-gas.co.jp/living/kitchen/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full"
                    >
                      <Button className="w-full h-12 text-sm font-bold bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-200">
                        🔥 ガス機器の交換・見積り
                      </Button>
                    </a>
                    <a
                      href="https://home.tokyo-gas.co.jp/service/reform/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full"
                    >
                      <Button
                        variant="outline"
                        className="w-full h-10 text-sm font-bold border-2 border-blue-300 hover:border-blue-400 text-blue-600 hover:text-blue-700 rounded-lg transform hover:scale-105 transition-all duration-200 bg-transparent"
                      >
                        🏠 リフォーム相談
                      </Button>
                    </a>
                  </div>
                </div>

                {showPhotoUpload && (
                  <div className="space-y-3">
                    <p className="text-lg font-semibold text-gray-700">📸 エコ活動の写真をシェアしませんか？</p>
                    <Button
                      onClick={handlePhotoUpload}
                      className="w-full h-14 text-lg font-bold bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-200"
                    >
                      📷 写真をアップロード
                    </Button>
                  </div>
                )}

                {/* エコボードに戻るボタン */}
                <div className="pt-4 border-t-2 border-gray-200">
                  <Button
                    onClick={() => router.push("/ecoboard")}
                    className="w-full h-14 text-lg font-bold bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-200"
                  >
                    📊 エコボードで成果を確認
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
