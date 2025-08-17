"use client"

import React from "react"

import Header from "@/components/layout/header"

import { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

export default function PhotoUploadPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [comment, setComment] = useState("")
  const [isUploading, setIsUploading] = useState(false)
  const [uploadCompleted, setUploadCompleted] = useState(false)
  const [isCameraMode, setIsCameraMode] = useState(false)
  const [stream, setStream] = useState<MediaStream | null>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const router = useRouter()

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setSelectedFile(file)
      const url = URL.createObjectURL(file)
      setPreviewUrl(url)
      stopCamera() // ファイル選択時はカメラを停止
    }
  }

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: "environment", // 背面カメラを優先
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
      })
      setStream(mediaStream)
      setIsCameraMode(true)

      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream
        videoRef.current.play()
      }

      // 既存のプレビューをクリア
      setPreviewUrl(null)
      setSelectedFile(null)
    } catch (error) {
      console.error("カメラアクセスエラー:", error)
      alert("カメラにアクセスできませんでした。ブラウザの設定を確認してください。")
    }
  }

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop())
      setStream(null)
    }
    setIsCameraMode(false)
  }

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current
      const canvas = canvasRef.current
      const context = canvas.getContext("2d")

      if (context) {
        // キャンバスサイズをビデオサイズに合わせる
        canvas.width = video.videoWidth
        canvas.height = video.videoHeight

        // ビデオフレームをキャンバスに描画
        context.drawImage(video, 0, 0, canvas.width, canvas.height)

        // キャンバスからBlobを作成
        canvas.toBlob(
          (blob) => {
            if (blob) {
              const file = new File([blob], `photo-${Date.now()}.jpg`, { type: "image/jpeg" })
              setSelectedFile(file)

              const url = URL.createObjectURL(blob)
              setPreviewUrl(url)

              stopCamera() // 撮影後はカメラを停止
            }
          },
          "image/jpeg",
          0.9,
        )
      }
    }
  }

  const handleUpload = async () => {
    if (!selectedFile) return

    setIsUploading(true)

    // シミュレートされたアップロード処理
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // 実際の実装では、ここでファイルをサーバーにアップロードし、
    // 状態管理システム（Context、Redux、Zustandなど）に保存します

    setIsUploading(false)
    setUploadCompleted(true)
  }

  const handleSNSShare = (platform: string) => {
    const shareText = `We Planetでエコ活動にチャレンジしました！🌍✨ ${comment ? `「${comment}」` : ""} みんなで地球を守ろう！ #WePlanet #エコ活動 #地球を守ろう`
    const url = encodeURIComponent(window.location.origin)
    const encodedText = encodeURIComponent(shareText)

    let shareUrl = ""
    switch (platform) {
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${encodedText}`
        break
      case "twitter":
        shareUrl = `https://twitter.com/intent/tweet?text=${encodedText}&url=${url}`
        break
      case "instagram":
        // Instagramは直接シェアできないため、テキストをコピー
        navigator.clipboard.writeText(shareText)
        alert("投稿テキストをクリップボードにコピーしました！\nInstagramアプリを開いて投稿してください。")
        return
      case "line":
        shareUrl = `https://social-plugins.line.me/lineit/share?url=${url}&text=${encodedText}`
        break
    }

    if (shareUrl) {
      window.open(shareUrl, "_blank", "width=600,height=400")
    }
  }

  const handleSkipShare = () => {
    router.push("/ecoboard")
  }

  const handleSkip = () => {
    stopCamera() // スキップ時もカメラを停止
    router.push("/ecoboard")
  }

  // コンポーネントのアンマウント時にカメラを停止
  React.useEffect(() => {
    return () => {
      stopCamera()
    }
  }, [])

  // アップロード完了後のSNSシェア画面
  if (uploadCompleted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-400 via-green-400 to-blue-600">
        <Header currentPage="/photo-upload" />

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

          <Card className="w-full max-w-lg bg-white/90 backdrop-blur-sm shadow-2xl border-0">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                🎉 アップロード完了！
              </CardTitle>
              <p className="text-lg text-gray-600 font-medium">素晴らしいエコ活動ですね！</p>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* アップロード完了メッセージ */}
              <div className="bg-gradient-to-r from-green-100 to-emerald-100 p-6 rounded-xl border-2 border-green-200 text-center">
                <div className="text-6xl mb-4">✅</div>
                <h3 className="text-xl font-bold text-green-700 mb-2">写真のアップロードが完了しました！</h3>
                <p className="text-sm text-green-600">
                  あなたのエコ活動が記録されました。地球を守る素晴らしい取り組みです！
                </p>
              </div>

              {/* アップロードした写真のプレビュー */}
              {previewUrl && (
                <div className="text-center">
                  <img
                    src={previewUrl || "/placeholder.svg"}
                    alt="Uploaded photo"
                    className="w-full h-48 object-cover rounded-lg shadow-lg border-2 border-green-200"
                  />
                  {comment && <p className="mt-2 text-sm text-gray-600 italic">「{comment}」</p>}
                </div>
              )}

              {/* SNSシェアセクション */}
              <div className="bg-gradient-to-r from-purple-100 to-pink-100 p-6 rounded-xl border-2 border-purple-200">
                <h3 className="text-xl font-bold text-purple-700 mb-3 text-center">📱 SNSにシェアしますか？</h3>
                <p className="text-sm text-purple-600 mb-4 text-center">
                  あなたのエコ活動を友達や家族にシェアして、みんなで地球を守る輪を広げましょう！
                </p>

                <div className="grid grid-cols-2 gap-3 mb-4">
                  <Button
                    onClick={() => handleSNSShare("facebook")}
                    className="h-12 text-sm font-bold bg-blue-600 hover:bg-blue-700 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-200"
                  >
                    📘 Facebook
                  </Button>
                  <Button
                    onClick={() => handleSNSShare("twitter")}
                    className="h-12 text-sm font-bold bg-black hover:bg-gray-800 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-200"
                  >
                    🐦 X (Twitter)
                  </Button>
                  <Button
                    onClick={() => handleSNSShare("instagram")}
                    className="h-12 text-sm font-bold bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-200"
                  >
                    📷 Instagram
                  </Button>
                  <Button
                    onClick={() => handleSNSShare("line")}
                    className="h-12 text-sm font-bold bg-green-500 hover:bg-green-600 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-200"
                  >
                    💬 LINE
                  </Button>
                </div>

                <Button
                  onClick={handleSkipShare}
                  variant="outline"
                  className="w-full h-12 text-lg font-bold border-2 border-gray-300 hover:border-gray-400 rounded-lg bg-white/80 transform hover:scale-105 transition-all duration-200"
                >
                  ⏭️ シェアしないで続ける
                </Button>
              </div>

              {/* エコボードに戻るボタン */}
              <div className="pt-4 border-t-2 border-gray-200">
                <Button
                  onClick={() => router.push("/ecoboard")}
                  className="w-full h-14 text-lg font-bold bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-200"
                >
                  📊 エコボードで成果を確認
                </Button>
              </div>

              {/* 励ましメッセージ */}
              <div className="bg-gradient-to-r from-yellow-100 to-orange-100 p-4 rounded-xl border-2 border-orange-200 text-center">
                <h4 className="font-bold text-orange-700 mb-2">🌟 Keep Going!</h4>
                <p className="text-sm text-orange-600">
                  小さな行動が大きな変化を生みます。明日も一緒にエコ活動を続けましょう！
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-green-400 to-blue-600">
      <Header currentPage="/photo-upload" />

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

        <Card className="w-full max-w-lg bg-white/90 backdrop-blur-sm shadow-2xl border-0">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
              📷 写真アップロード
            </CardTitle>
            <p className="text-lg text-gray-600 font-medium">エコ活動の記録を残そう！</p>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Camera/File upload area */}
            <div className="space-y-4">
              <div className="border-2 border-dashed border-green-300 rounded-xl p-4 text-center bg-gradient-to-br from-green-50 to-blue-50">
                {isCameraMode ? (
                  /* カメラモード */
                  <div className="space-y-4">
                    <video
                      ref={videoRef}
                      className="w-full h-64 object-cover rounded-lg shadow-lg bg-black"
                      playsInline
                      muted
                    />
                    <div className="flex gap-2">
                      <Button
                        onClick={capturePhoto}
                        className="flex-1 h-12 text-lg font-bold bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-200"
                      >
                        📸 撮影
                      </Button>
                      <Button
                        onClick={stopCamera}
                        variant="outline"
                        className="h-12 px-4 border-2 border-gray-300 hover:border-gray-400 rounded-lg bg-transparent"
                      >
                        ❌ 停止
                      </Button>
                    </div>
                  </div>
                ) : previewUrl ? (
                  /* プレビューモード */
                  <div className="space-y-4">
                    <img
                      src={previewUrl || "/placeholder.svg"}
                      alt="Preview"
                      className="w-full h-48 object-cover rounded-lg shadow-lg"
                    />
                    <p className="text-sm text-gray-600">素晴らしい写真ですね！</p>
                    <Button
                      onClick={() => {
                        setPreviewUrl(null)
                        setSelectedFile(null)
                      }}
                      variant="outline"
                      className="w-full h-10 text-sm border-2 border-gray-300 hover:border-gray-400 rounded-lg"
                    >
                      🔄 別の写真を選択
                    </Button>
                  </div>
                ) : (
                  /* 初期状態 */
                  <div className="space-y-4">
                    <div className="text-6xl">📸</div>
                    <p className="text-lg font-semibold text-gray-700">写真を撮影または選択してください</p>
                    <p className="text-sm text-gray-500">エコ活動の様子を記録しましょう</p>

                    {/* カメラ起動ボタン */}
                    <div className="space-y-2">
                      <Button
                        onClick={startCamera}
                        className="w-full h-12 text-lg font-bold bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-200"
                      >
                        📱 カメラで撮影
                      </Button>

                      <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                          <span className="w-full border-t border-gray-300" />
                        </div>
                        <div className="relative flex justify-center text-xs">
                          <span className="bg-gradient-to-br from-green-50 to-blue-50 px-2 text-gray-500">または</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* ファイル選択（常に表示） */}
                {!isCameraMode && (
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={handleFileSelect}
                    className="mt-4 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
                  />
                )}
              </div>

              {/* Comment input */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">コメント（任意）</label>
                <Input
                  type="text"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="今日のエコ活動について一言..."
                  className="h-12 text-lg border-2 border-green-200 focus:border-green-400 rounded-xl"
                />
              </div>
            </div>

            {/* Action buttons */}
            <div className="space-y-3">
              <Button
                onClick={handleUpload}
                disabled={!selectedFile || isUploading}
                className="w-full h-14 text-lg font-bold bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:transform-none"
              >
                {isUploading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    アップロード中...
                  </div>
                ) : (
                  "📤 写真をアップロード"
                )}
              </Button>

              <Button
                onClick={handleSkip}
                variant="outline"
                className="w-full h-12 text-lg font-bold border-2 border-gray-300 hover:border-gray-400 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-200 bg-white/80"
              >
                ⏭️ スキップ
              </Button>
            </div>

            {/* Tips */}
            <div className="bg-gradient-to-r from-yellow-100 to-orange-100 p-4 rounded-xl border-2 border-orange-200">
              <h4 className="font-bold text-orange-700 mb-2">📝 撮影のコツ</h4>
              <ul className="text-sm text-orange-600 space-y-1">
                <li>• エコバッグを使っている様子</li>
                <li>• ゴミ分別をしている写真</li>
                <li>• 自転車で移動している姿</li>
                <li>• 節電・節水の工夫</li>
              </ul>
            </div>
          </CardContent>

          {/* 隠しキャンバス（撮影用） */}
          <canvas ref={canvasRef} style={{ display: "none" }} />
        </Card>
      </div>
    </div>
  )
}
