"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

interface HeaderProps {
  currentPage?: string
}

export default function Header({ currentPage }: HeaderProps) {
  const router = useRouter()

  const navItems = [
    { href: "/dashboard", label: "ダッシュボード" },
    { href: "/ecobadge", label: "エコバッジ" },
    { href: "/ecoboard", label: "エコボード" },
    { href: "/mission", label: "ミッション" },
    { href: "/photo-upload", label: "写真アップロード" },
    { href: "/mypage", label: "マイページ" },
  ]

  return (
    <header className="bg-green-600 text-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <h1 
          className="text-xl font-bold cursor-pointer"
          onClick={() => router.push("/dashboard")}
        >
          🌍 We Planet
        </h1>
        
        {/* デスクトップナビゲーション */}
        <nav className="hidden md:flex space-x-4">
          {navItems.map((item) => (
            <Button
              key={item.href}
              variant={currentPage === item.href ? "secondary" : "ghost"}
              onClick={() => router.push(item.href)}
              className="text-white hover:text-green-100"
            >
              {item.label}
            </Button>
          ))}
        </nav>

        {/* モバイルメニュー */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="sm" className="md:hidden">
              ☰
            </Button>
          </SheetTrigger>
          <SheetContent>
            <div className="flex flex-col space-y-4 mt-6">
              {navItems.map((item) => (
                <Button
                  key={item.href}
                  variant={currentPage === item.href ? "secondary" : "ghost"}
                  onClick={() => router.push(item.href)}
                  className="justify-start"
                >
                  {item.label}
                </Button>
              ))}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}