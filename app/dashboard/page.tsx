"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function DashboardPage() {
  const router = useRouter()

  const handleLogout = () => {
    router.push("/")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-green-400 to-blue-600 flex items-center justify-center p-4 relative overflow-hidden">
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

      <Card className="w-full max-w-lg bg-white/90 backdrop-blur-sm shadow-2xl border-0">
        <CardContent className="p-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-2">
              We Planet
            </h1>
            <p className="text-lg text-gray-600 font-medium">今日も地球のためにがんばろう！</p>
          </div>

          <div className="space-y-4">
            <Button
              onClick={() => router.push("/mission")}
              className="w-full h-20 text-lg font-bold bg-gradient-to-r from-orange-400 to-red-500 hover:from-orange-500 hover:to-red-600 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-200"
            >
              🎯 ミッション
            </Button>

            <Button
              onClick={() => router.push("/ecoboard")}
              className="w-full h-20 text-lg font-bold bg-gradient-to-r from-green-400 to-emerald-500 hover:from-green-500 hover:to-emerald-600 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-200"
            >
              📊 エコボード
            </Button>

            <Button
              onClick={() => router.push("/ecobadge")}
              className="w-full h-20 text-lg font-bold bg-gradient-to-r from-purple-400 to-pink-500 hover:from-purple-500 hover:to-pink-600 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-200"
            >
              🏆 エコバッジ
            </Button>

            <Button
              onClick={handleLogout}
              variant="outline"
              className="w-full h-20 text-lg font-bold border-2 border-gray-300 hover:border-gray-400 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-200 bg-white/80"
            >
              🚪 ログアウト
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
