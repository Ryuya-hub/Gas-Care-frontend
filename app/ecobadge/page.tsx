"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Header from "@/components/layout/header"

const badges = [
  // 絶滅危惧種の動物
  {
    name: "ジャイアントパンダ",
    emoji: "🐼",
    obtained: true,
    description: "竹を大切にしよう",
    category: "動物",
    detail:
      "中国の山地に生息する愛らしいパンダ。竹林の減少により絶滅の危機に瀕しています。現在野生では約1,864頭しか残っていません。",
  },
  {
    name: "トキ",
    emoji: "🦢",
    obtained: true,
    description: "空をきれいに保とう",
    category: "鳥類",
    detail:
      "美しい羽色を持つ日本の象徴的な鳥。農薬の使用や生息地の破壊により一度は絶滅しましたが、現在は保護活動により復活を目指しています。",
  },
  {
    name: "アオウミガメ",
    emoji: "🐢",
    obtained: true,
    description: "海を守ろう",
    category: "海洋生物",
    detail:
      "世界中の温帯・熱帯の海に生息するウミガメ。プラスチック汚染や漁業による混獲、産卵地の開発により個体数が減少しています。",
  },
  {
    name: "ホッキョクグマ",
    emoji: "🐻‍❄️",
    obtained: false,
    description: "地球温暖化を防ごう",
    category: "動物",
    detail:
      "北極圏に生息する世界最大の陸上肉食動物。地球温暖化による海氷の減少で狩りができなくなり、生存が脅かされています。",
  },
  {
    name: "コアラ",
    emoji: "🐨",
    obtained: false,
    description: "森林を守ろう",
    category: "動物",
    detail:
      "オーストラリア固有の有袋類。ユーカリの森林伐採や山火事、病気により個体数が激減。現在約10万頭まで減少しています。",
  },
  {
    name: "オランウータン",
    emoji: "🦧",
    obtained: false,
    description: "熱帯雨林を保護しよう",
    category: "動物",
    detail:
      "東南アジアの熱帯雨林に生息する類人猿。パーム油プランテーションの拡大により生息地が破壊され、野生では約10万頭しか残っていません。",
  },
  {
    name: "サイ",
    emoji: "🦏",
    obtained: false,
    description: "野生動物を守ろう",
    category: "動物",
    detail:
      "アフリカとアジアに生息する大型哺乳類。角を狙った密猟により個体数が激減。特にクロサイは約5,500頭まで減少しています。",
  },
  {
    name: "トラ",
    emoji: "🐅",
    obtained: false,
    description: "生態系を守ろう",
    category: "動物",
    detail: "アジアの森林に生息する最大の猫科動物。生息地の破壊と密猟により、野生では約3,900頭まで減少しています。",
  },
  {
    name: "ゾウ",
    emoji: "🐘",
    obtained: false,
    description: "密猟を防ごう",
    category: "動物",
    detail:
      "アフリカとアジアに生息する地球最大の陸上動物。象牙を狙った密猟により個体数が減少。アフリカゾウは約41万頭まで減っています。",
  },
  {
    name: "ペンギン",
    emoji: "🐧",
    obtained: false,
    description: "南極を守ろう",
    category: "鳥類",
    detail:
      "南極や南半球の海岸に生息する飛べない鳥。地球温暖化による海氷の減少と海洋汚染により、多くの種が絶滅の危機にあります。",
  },
  // 絶滅危惧種の魚類
  {
    name: "マグロ",
    emoji: "🐟",
    obtained: false,
    description: "海洋資源を守ろう",
    category: "魚類",
    detail:
      "太平洋、大西洋、インド洋に生息する大型魚類。過度な漁獲により個体数が激減。特にクロマグロは絶滅危惧種に指定されています。",
  },
  {
    name: "サメ",
    emoji: "🦈",
    obtained: false,
    description: "海の生態系を保護しよう",
    category: "魚類",
    detail:
      "世界中の海に生息する軟骨魚類。フカヒレ漁や混獲により多くの種が絶滅の危機。海の生態系の頂点捕食者として重要な役割を果たしています。",
  },
  {
    name: "クジラ",
    emoji: "🐋",
    obtained: false,
    description: "海洋汚染を防ごう",
    category: "海洋生物",
    detail:
      "世界最大の哺乳類。商業捕鯨や海洋汚染、船舶との衝突により多くの種が絶滅の危機。シロナガスクジラは約2,500頭まで減少しています。",
  },
  {
    name: "イルカ",
    emoji: "🐬",
    obtained: false,
    description: "海をきれいにしよう",
    category: "海洋生物",
    detail:
      "高い知能を持つ海洋哺乳類。漁業による混獲や海洋汚染により個体数が減少。特にマウイイルカは約50頭まで減っています。",
  },
  // 絶滅危惧種の植物
  {
    name: "キンモクセイ",
    emoji: "🌸",
    obtained: false,
    description: "植物を大切にしよう",
    category: "植物",
    detail:
      "中国原産の常緑小高木。都市開発や環境変化により野生個体が減少。香り高い花で親しまれていますが、原生地では保護が必要です。",
  },
  {
    name: "サクラ",
    emoji: "🌺",
    obtained: false,
    description: "季節を大切にしよう",
    category: "植物",
    detail:
      "日本の象徴的な花木。気候変動や都市開発により野生種が減少。特に固有種のヤマザクラやオオシマザクラの保護が重要です。",
  },
  {
    name: "バオバブの木",
    emoji: "🌳",
    obtained: false,
    description: "古い木を守ろう",
    category: "植物",
    detail:
      "アフリカやマダガスカルに生息する巨大な木。数千年生きる「生命の木」として知られますが、気候変動により多くの個体が枯死しています。",
  },
  {
    name: "ラン",
    emoji: "🌷",
    obtained: false,
    description: "希少植物を保護しよう",
    category: "植物",
    detail:
      "世界中に分布する美しい花を咲かせる植物。生息地の破壊や違法採取により多くの種が絶滅の危機。特に野生ランの保護が急務です。",
  },
  {
    name: "サボテン",
    emoji: "🌵",
    obtained: false,
    description: "砂漠化を防ごう",
    category: "植物",
    detail:
      "乾燥地帯に適応した多肉植物。砂漠化の進行や違法採取により希少種が減少。生態系の重要な構成要素として保護が必要です。",
  },
  {
    name: "コケ",
    emoji: "🍀",
    obtained: false,
    description: "小さな生命を大切に",
    category: "植物",
    detail:
      "湿潤な環境に生育する小さな植物。大気汚染や環境変化に敏感で、多くの種が絶滅の危機。森林生態系の基盤として重要な役割を果たしています。",
  },
]

export default function EcobadgePage() {
  const [hoveredBadge, setHoveredBadge] = useState<number | null>(null)
  const router = useRouter()

  // 取得済みバッジのみを表示（最大20個）
  const obtainedBadges = badges.filter((badge) => badge.obtained).slice(0, 20)
  const totalBadges = Math.min(badges.length, 20)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-green-400 to-blue-600">
      <Header currentPage="/ecobadge" />

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
            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              🏆 エコバッジ
            </CardTitle>
            <p className="text-lg text-gray-600 font-medium">絶滅危惧種を守ろう！</p>

            {/* カーソル説明文 */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-3 rounded-lg border border-blue-200 mt-4">
              <p className="text-sm text-blue-700 font-medium">💡 カーソルを合わせるとバッジの説明が表示されます</p>
            </div>
          </CardHeader>

          <CardContent className="space-y-6 max-h-[70vh] overflow-y-auto">
            {/* Badge collection */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-gray-700 text-center">バッジコレクション</h3>
              <div className="grid grid-cols-2 gap-3">
                {obtainedBadges.map((badge, index) => (
                  <div
                    key={index}
                    className="p-4 rounded-xl border-2 text-center bg-gradient-to-br from-green-100 to-emerald-100 border-green-300 shadow-lg relative cursor-pointer transform hover:scale-105 transition-all duration-200"
                    onMouseEnter={() => setHoveredBadge(index)}
                    onMouseLeave={() => setHoveredBadge(null)}
                  >
                    <div className="text-4xl mb-2">{badge.emoji}</div>
                    <h4 className="font-bold text-sm mb-1 text-green-700">{badge.name}</h4>
                    <p className="text-xs text-green-600 mb-1">{badge.description}</p>
                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">{badge.category}</span>
                    <div className="mt-2">
                      <span className="inline-block bg-green-500 text-white text-xs px-2 py-1 rounded-full font-bold">
                        GET!
                      </span>
                    </div>

                    {/* Hover Popup */}
                    {hoveredBadge === index && (
                      <div className="absolute z-10 bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-64 p-3 bg-white rounded-lg shadow-xl border-2 border-green-300">
                        <div className="text-sm text-gray-700 leading-relaxed">
                          <div className="font-bold text-green-700 mb-1">{badge.name}</div>
                          {badge.detail}
                        </div>
                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-white"></div>
                      </div>
                    )}
                  </div>
                ))}

                {/* 未取得バッジの数だけミステリーバッジを表示 */}
                {Array.from({ length: totalBadges - obtainedBadges.length }).map((_, index) => (
                  <div
                    key={`mystery-${index}`}
                    className="p-4 rounded-xl border-2 text-center bg-gradient-to-br from-purple-100 to-pink-100 border-purple-300 shadow-lg relative overflow-hidden cursor-pointer transform hover:scale-105 transition-all duration-200"
                    onMouseEnter={() => setHoveredBadge(obtainedBadges.length + index)}
                    onMouseLeave={() => setHoveredBadge(null)}
                  >
                    <div className="text-4xl mb-2">❓</div>
                    <h4 className="font-bold text-sm mb-1 text-purple-700">？？？</h4>
                    <p className="text-xs text-purple-600 mb-1">ミッションをクリアして解放しよう！</p>
                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">未知</span>
                    <div className="mt-2">
                      <span className="inline-block bg-purple-500 text-white text-xs px-2 py-1 rounded-full font-bold">
                        MYSTERY
                      </span>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30 animate-pulse"></div>

                    {/* Mystery Hover Popup */}
                    {hoveredBadge === obtainedBadges.length + index && (
                      <div className="absolute z-10 bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-48 p-3 bg-purple-100 rounded-lg shadow-xl border-2 border-purple-300">
                        <div className="text-sm text-purple-700 text-center">
                          <div className="font-bold mb-1">ミステリーバッジ</div>
                          このバッジを解放するには、もっとミッションをクリアしよう！
                        </div>
                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-purple-100"></div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Stats */}
            <div className="bg-gradient-to-r from-purple-100 to-pink-100 p-4 rounded-xl border-2 border-purple-200 text-center">
              <p className="text-lg font-bold text-purple-700">
                取得済み: {obtainedBadges.length} / {totalBadges} バッジ
              </p>
              <p className="text-sm text-purple-600 mb-2">
                残り{totalBadges - obtainedBadges.length}個のミステリーバッジが待っています！
              </p>
              <div className="bg-gray-200 rounded-full h-3 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-purple-400 to-pink-500 rounded-full transition-all duration-1000"
                  style={{ width: `${(obtainedBadges.length / totalBadges) * 100}%` }}
                ></div>
              </div>
            </div>

            {/* Categories info */}
            <div className="bg-gradient-to-r from-blue-100 to-green-100 p-4 rounded-xl border-2 border-blue-200">
              <h4 className="font-bold text-blue-700 mb-2">🌍 バッジの種類</h4>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="text-blue-600">🐾 絶滅危惧動物</div>
                <div className="text-blue-600">🐟 海洋生物・魚類</div>
                <div className="text-blue-600">🌸 希少植物</div>
                <div className="text-blue-600">🦅 鳥類</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
