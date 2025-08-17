"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import Header from "@/components/layout/header"

// 取得済みバッジのアイコン（実際の実装では状態管理から取得）
const obtainedBadges = [
  { name: "ジャイアントパンダ", emoji: "🐼" },
  { name: "トキ", emoji: "🦢" },
  { name: "アオウミガメ", emoji: "🐢" },
]

export default function MyPage() {
  const [nickname, setNickname] = useState("エコファミリー")
  const [selectedIcon, setSelectedIcon] = useState("🐼")
  const [email, setEmail] = useState("eco@family.com")
  const [isEditing, setIsEditing] = useState(false)
  const [showPasswordChange, setShowPasswordChange] = useState(false)
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const router = useRouter()

  const currentPoints = 1520
  const patchoPoints = 152 // パッチョポイント（10:1の比率）

  const handleNicknameUpdate = () => {
    setIsEditing(false)
    // 実際の実装では、ここでAPIを呼び出してニックネームを更新
    console.log("Nickname updated:", nickname)
  }

  const handleIconChange = (icon: string) => {
    setSelectedIcon(icon)
    // 実際の実装では、ここでAPIを呼び出してアイコンを更新
    console.log("Icon updated:", icon)
  }

  const handlePasswordChange = () => {
    if (newPassword !== confirmPassword) {
      alert("新しいパスワードが一致しません")
      return
    }
    // 実際の実装では、ここでAPIを呼び出してパスワードを変更
    console.log("Password changed")
    setShowPasswordChange(false)
    setCurrentPassword("")
    setNewPassword("")
    setConfirmPassword("")
    alert("パスワードが変更されました")
  }

  const handlePointExchange = () => {
    // パッチョポイントとの交換処理
    alert(`${patchoPoints}パッチョポイントと交換しました！`)
  }

  const handleWithdrawal = () => {
    if (confirm("本当に退会しますか？この操作は取り消せません。")) {
      // 実際の実装では、ここでAPIを呼び出して退会処理
      alert("退会処理を開始しました。ご利用ありがとうございました。")
      router.push("/")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-green-400 to-blue-600">
      <Header currentPage="/mypage" />
      
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
            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              👤 マイページ
            </CardTitle>
            <p className="text-lg text-gray-600 font-medium">アカウント情報と設定</p>
          </CardHeader>

          <CardContent className="space-y-6 max-h-[70vh] overflow-y-auto">
            {/* Points Section */}
            <div className="bg-gradient-to-r from-yellow-100 to-orange-100 p-4 rounded-xl border-2 border-orange-200">
              <h3 className="text-lg font-bold text-orange-700 mb-3">💰 ポイント情報</h3>
              <div className="space-y-2">
                <p className="text-xl font-bold text-orange-600">
                  現在のポイント: {currentPoints.toLocaleString()}pt
                </p>
                <p className="text-sm text-gray-600">
                  パッチョポイント交換可能: {patchoPoints}pt
                </p>
                <Button
                  onClick={handlePointExchange}
                  className="w-full h-12 text-lg font-bold bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-200"
                >
                  🔄 パッチョポイントと交換
                </Button>
              </div>
            </div>

            <Separator />

            {/* User Info Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-gray-700">👤 ユーザー情報</h3>
              
              {/* Icon Selection */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">プロフィールアイコン</label>
                <div className="bg-gradient-to-r from-green-50 to-blue-50 p-4 rounded-xl border-2 border-green-200">
                  <p className="text-sm text-gray-600 mb-3">取得したバッジからアイコンを選択できます</p>
                  <div className="flex gap-3 justify-center">
                    {obtainedBadges.map((badge) => (
                      <button
                        key={badge.emoji}
                        onClick={() => handleIconChange(badge.emoji)}
                        className={`text-4xl p-3 rounded-xl border-2 transition-all duration-200 transform hover:scale-110 ${
                          selectedIcon === badge.emoji
                            ? "border-green-500 bg-green-100 shadow-lg"
                            : "border-gray-300 bg-white hover:border-green-300"
                        }`}
                        title={badge.name}
                      >
                        {badge.emoji}
                      </button>
                    ))}
                  </div>
                  <p className="text-xs text-center text-gray-500 mt-2">
                    現在選択中: {selectedIcon}
                  </p>
                </div>
              </div>

              {/* Nickname */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">ニックネーム</label>
                {isEditing ? (
                  <div className="flex gap-2">
                    <Input
                      value={nickname}
                      onChange={(e) => setNickname(e.target.value)}
                      className="flex-1 h-10 border-2 border-green-200 focus:border-green-400 rounded-lg"
                    />
                    <Button
                      onClick={handleNicknameUpdate}
                      className="h-10 px-4 bg-green-500 hover:bg-green-600 text-white rounded-lg"
                    >
                      保存
                    </Button>
                    <Button
                      onClick={() => setIsEditing(false)}
                      variant="outline"
                      className="h-10 px-4 border-gray-300 rounded-lg"
                    >
                      キャンセル
                    </Button>
                  </div>
                ) : (
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border">
                    <span className="font-medium">{nickname}</span>
                    <Button
                      onClick={() => setIsEditing(true)}
                      variant="outline"
                      size="sm"
                      className="h-8 px-3 text-sm"
                    >
                      編集
                    </Button>
                  </div>
                )}
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">メールアドレス</label>
                <div className="p-3 bg-gray-50 rounded-lg border">
                  <span className="font-medium">{email}</span>
                </div>
              </div>

              {/* Password Change */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">パスワード</label>
                {!showPasswordChange ? (
                  <Button
                    onClick={() => setShowPasswordChange(true)}
                    variant="outline"
                    className="w-full h-10 border-2 border-blue-200 hover:border-blue-400 rounded-lg"
                  >
                    🔒 パスワードを変更
                  </Button>
                ) : (
                  <div className="space-y-3 p-4 bg-blue-50 rounded-lg border-2 border-blue-200">
                    <Input
                      type="password"
                      placeholder="現在のパスワード"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      className="h-10 border-2 border-blue-200 focus:border-blue-400 rounded-lg"
                    />
                    <Input
                      type="password"
                      placeholder="新しいパスワード"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="h-10 border-2 border-blue-200 focus:border-blue-400 rounded-lg"
                    />
                    <Input
                      type="password"
                      placeholder="新しいパスワード（確認）"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="h-10 border-2 border-blue-200 focus:border-blue-400 rounded-lg"
                    />
                    <div className="flex gap-2">
                      <Button
                        onClick={handlePasswordChange}
                        className="flex-1 h-10 bg-blue-500 hover:bg-blue-600 text-white rounded-lg"
                      >
                        変更
                      </Button>
                      <Button
                        onClick={() => setShowPasswordChange(false)}
                        variant="outline"
                        className="flex-1 h-10 border-gray-300 rounded-lg"
                      >
                        キャンセル
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <Separator />

            {/* Support Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-gray-700">🛠️ サポート</h3>
              
              <Button
                onClick={() => alert("ヘルプページを開きます")}
                variant="outline"
                className="w-full h-12 justify-start border-2 border-green-200 hover:border-green-400 rounded-lg"
              >
                ❓ ヘルプ
              </Button>

              <Button
                onClick={() => alert("お知らせページを開きます")}
                variant="outline"
                className="w-full h-12 justify-start border-2 border-blue-200 hover:border-blue-400 rounded-lg"
              >
                📢 お知らせ
              </Button>
            </div>

            <Separator />

            {/* Danger Zone */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-red-700">⚠️ アカウント管理</h3>
              
              <Button
                onClick={handleWithdrawal}
                variant="outline"
                className="w-full h-12 justify-start border-2 border-red-200 hover:border-red-400 text-red-600 hover:text-red-700 rounded-lg"
              >
                🚪 退会手続き
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
