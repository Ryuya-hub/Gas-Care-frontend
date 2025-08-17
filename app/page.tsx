"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const router = useRouter()

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (email && password) {
      router.push("/dashboard")
    }
  }

  const handleGoogleLogin = () => {
    // Googleログイン処理（実際の実装では Google OAuth APIを使用）
    console.log("Google login")
    router.push("/dashboard")
  }

  const handleCreateAccount = () => {
    // アカウント作成処理（実際の実装では登録ページに遷移）
    alert("アカウント作成ページに移動します")
    // router.push("/register")
  }

  const handleForgotPassword = () => {
    // パスワードリセット処理（実際の実装ではリセットページに遷移）
    alert("パスワードリセットのメールを送信しました")
    // router.push("/forgot-password")
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

      <Card className="w-full max-w-md bg-white/90 backdrop-blur-sm shadow-2xl border-0">
        <CardHeader className="text-center pb-2">
          <CardTitle className="text-4xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-2">
            We Planet
          </CardTitle>
          <p className="text-lg text-gray-600 font-medium">みんなで地球を守ろう！</p>
        </CardHeader>
        <CardContent className="space-y-6">
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">メールアドレス</label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="h-12 text-lg border-2 border-green-200 focus:border-green-400 rounded-xl"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">パスワード</label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="パスワードを入力"
                className="h-12 text-lg border-2 border-green-200 focus:border-green-400 rounded-xl"
                required
              />
            </div>

            {/* パスワードを忘れた方はこちら */}
            <div className="text-right">
              <button
                type="button"
                onClick={handleForgotPassword}
                className="text-sm text-blue-600 hover:text-blue-800 underline font-medium"
              >
                パスワードを忘れた方はこちら
              </button>
            </div>

            <Button
              type="submit"
              className="w-full h-14 text-xl font-bold bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-200"
            >
              🌍 ログイン
            </Button>
          </form>

          {/* Google Login Button */}
          <div className="space-y-3">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-white px-2 text-gray-500">または</span>
              </div>
            </div>

            <Button
              onClick={handleGoogleLogin}
              className="w-full h-14 text-lg font-bold text-white bg-red-500 hover:bg-red-600 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-200"
            >
              🔍 Googleでログイン
            </Button>
          </div>

          {/* アカウント作成セクション */}
          <div className="space-y-3">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-white px-2 text-gray-500">初めての方</span>
              </div>
            </div>

            <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-xl border-2 border-purple-200 text-center">
              <h3 className="text-lg font-bold text-purple-700 mb-2">🌟 We Planetを始めよう！</h3>
              <p className="text-sm text-purple-600 mb-3">
                家族みんなでエコ活動を楽しみながら、地球を守る仲間になりませんか？
              </p>
              <Button
                onClick={handleCreateAccount}
                className="w-full h-12 text-lg font-bold bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-200"
              >
                ✨ アカウント作成
              </Button>
            </div>
          </div>

          {/* 利用規約・プライバシーポリシー */}
          <div className="text-center text-xs text-gray-500 space-y-1">
            <p>ログイン・アカウント作成により、以下に同意したものとみなします</p>
            <div className="flex justify-center gap-4">
              <button className="text-blue-600 hover:text-blue-800 underline">利用規約</button>
              <button className="text-blue-600 hover:text-blue-800 underline">プライバシーポリシー</button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}