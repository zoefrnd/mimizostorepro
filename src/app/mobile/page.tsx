'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { 
  ArrowLeft,
  Search,
  Filter,
  Home,
  ShoppingBag,
  User,
  Package,
  Heart,
  Settings,
  Bell,
  Menu,
  X,
  ChevronRight,
  Star,
  TrendingUp,
  Shield,
  Crown,
  Instagram,
  Music,
  Gamepad2,
  Zap,
  MapPin,
  Clock,
  Eye
} from 'lucide-react'
import { useTheme } from 'next-themes'

// Mock data
const mockCategories = [
  { name: 'Instagram', icon: Instagram, color: 'bg-gradient-to-r from-purple-500 to-pink-500', count: 234 },
  { name: 'TikTok', icon: Music, color: 'bg-gradient-to-r from-black to-gray-800', count: 189 },
  { name: 'Facebook', icon: User, color: 'bg-gradient-to-r from-blue-600 to-blue-400', count: 156 },
  { name: 'YouTube', icon: User, color: 'bg-gradient-to-r from-red-600 to-red-400', count: 98 },
  { name: 'Mobile Legends', icon: Crown, color: 'bg-gradient-to-r from-yellow-500 to-orange-500', count: 445 },
  { name: 'PUBG', icon: Shield, color: 'bg-gradient-to-r from-yellow-600 to-orange-600', count: 312 },
  { name: 'Free Fire', icon: Zap, color: 'bg-gradient-to-r from-blue-500 to-purple-500', count: 278 },
  { name: 'Genshin Impact', icon: Star, color: 'bg-gradient-to-r from-blue-400 to-cyan-400', count: 167 },
  { name: 'Valorant', icon: Shield, color: 'bg-gradient-to-r from-red-500 to-pink-500', count: 234 },
  { name: 'Steam', icon: Gamepad2, color: 'bg-gradient-to-r from-blue-600 to-blue-400', count: 189 },
]

const mockFeaturedProducts = [
  {
    id: 1,
    title: 'Instagram Pro Account 50K',
    price: 2500000,
    rating: 4.8,
    reviews: 127,
    image: '/mobile-legends-icon.png',
    category: 'Instagram',
    featured: true
  },
  {
    id: 2,
    title: 'Mobile Legends Mythic',
    price: 850000,
    rating: 4.9,
    reviews: 89,
    image: '/pubg-icon.png',
    category: 'Mobile Legends',
    featured: true
  },
  {
    id: 3,
    title: 'TikTok 100K Followers',
    price: 5000000,
    rating: 4.7,
    reviews: 203,
    image: '/free-fire-icon.png',
    category: 'TikTok',
    featured: true
  },
  {
    id: 4,
    title: 'Genshin Impact AR 60',
    price: 2500000,
    rating: 5.0,
    reviews: 41,
    image: '/genshin-icon.png',
    category: 'Genshin Impact',
    featured: true
  }
]

export default function MobilePage() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('home')
  const [searchQuery, setSearchQuery] = useState('')
  const [showMobileMenu, setShowMobileMenu] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleBack = () => {
    router.push('/')
  }

  if (!mounted) return null

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile Header */}
      <div className="sticky top-0 z-50 glass-effect-dark border-b border-border/50">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Button variant="ghost" size="icon" onClick={handleBack}>
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 gradient-mimizo rounded-lg flex items-center justify-center">
                  <img src="/mimizo-logo.png" alt="MIMIZO" className="w-5 h-5 rounded-md" />
                </div>
                <span className="text-lg font-bold text-gradient">MIMIZO</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="icon">
                <Bell className="w-5 h-5" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => setShowMobileMenu(!showMobileMenu)}
              >
                {showMobileMenu ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {showMobileMenu && (
        <div className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm">
          <div className="absolute top-16 right-4 bg-card border border-border/50 rounded-lg shadow-lg p-2 w-48 z-[60]">
            <div className="space-y-2">
              <Link href="/mobile" onClick={() => setShowMobileMenu(false)}>
                <Button variant="ghost" className="w-full justify-start">
                  <Home className="w-4 h-4 mr-2" />
                  Beranda
                </Button>
              </Link>
              <Link href="/categories" onClick={() => setShowMobileMenu(false)}>
                <Button variant="ghost" className="w-full justify-start">
                  <ShoppingBag className="w-4 h-4 mr-2" />
                  Kategori
                </Button>
              </Link>
              <Link href="/sell" onClick={() => setShowMobileMenu(false)}>
                <Button variant="ghost" className="w-full justify-start">
                  <Package className="w-4 h-4 mr-2" />
                  Jual
                </Button>
              </Link>
              <Link href="/dashboard" onClick={() => setShowMobileMenu(false)}>
                <Button variant="ghost" className="w-full justify-start">
                  <User className="w-4 h-4 mr-2" />
                  Profil
                </Button>
              </Link>
              <Link href="/dashboard/settings" onClick={() => setShowMobileMenu(false)}>
                <Button variant="ghost" className="w-full justify-start">
                  <Settings className="w-4 h-4 mr-2" />
                  Pengaturan
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Content */}
      <div className="pb-20">
        {/* Search Bar */}
        <div className="px-4 py-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <Input
              placeholder="Cari akun..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 h-12 text-lg"
            />
            <Button variant="outline" size="icon" className="absolute right-2 top-1/2 transform -translate-y-1/2">
              <Filter className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="px-4 py-2">
          <div className="grid grid-cols-4 gap-3">
            <Button variant="outline" className="h-16 flex flex-col">
              <ShoppingBag className="w-6 h-6 mb-1" />
              <span className="text-xs">Beli</span>
            </Button>
            <Button variant="outline" className="h-16 flex flex-col">
              <Package className="w-6 h-6 mb-1" />
              <span className="text-xs">Jual</span>
            </Button>
            <Button variant="outline" className="h-16 flex flex-col">
              <Heart className="w-6 h-6 mb-1" />
              <span className="text-xs">Wishlist</span>
            </Button>
            <Button variant="outline" className="h-16 flex flex-col">
              <User className="w-6 h-6 mb-1" />
              <span className="text-xs">Profil</span>
            </Button>
          </div>
        </div>

        {/* Categories Grid */}
        <div className="px-4 py-4">
          <h2 className="text-xl font-bold mb-4">Kategori Populer</h2>
          <div className="grid grid-cols-2 gap-4">
            {mockCategories.map((category, index) => (
              <Card key={index} className="glass-effect border-border/50">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className={`w-12 h-12 ${category.color} rounded-xl flex items-center justify-center`}>
                      <category.icon className="w-6 h-6 text-white" />
                    </div>
                    <Badge variant="secondary">{category.count}</Badge>
                  </div>
                  <h3 className="font-semibold text-sm">{category.name}</h3>
                  <Button variant="outline" size="sm" className="w-full mt-2">
                    Lihat Semua
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Featured Products */}
        <div className="px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">Produk Unggulan</h2>
            <Button variant="outline" size="sm">
              Lihat Semua
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
          
          <div className="space-y-4">
            {mockFeaturedProducts.map((product) => (
              <Card key={product.id} className="glass-effect border-border/50">
                <CardContent className="p-4">
                  <div className="flex gap-4">
                    <div className="w-20 h-20 bg-gradient-to-br from-primary/20 to-purple-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Gamepad2 className="w-10 h-10 text-primary/50" />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-semibold text-sm line-clamp-2">{product.title}</h3>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="secondary" className="text-xs">
                              {product.category}
                            </Badge>
                            <div className="flex items-center">
                              <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                              <span className="text-xs ml-1">{product.rating}</span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold text-primary">
                            Rp {product.price.toLocaleString('id-ID')}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Eye className="w-3 h-3" />
                          <span>{(Math.random() * 1000 + 500).toFixed(0)} views</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="w-3 h-3" />
                          <span>{product.reviews} reviews</span>
                        </div>
                      </div>
                      
                      <div className="flex gap-2 mt-3">
                        <Button size="sm" className="flex-1 gradient-mimizo text-white">
                          Beli
                        </Button>
                        <Button variant="outline" size="sm" className="w-10 h-10 p-0">
                          <Heart className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Bottom Navigation */}
        <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border/50 z-40">
          <div className="grid grid-cols-5 py-2 px-2 max-w-md mx-auto">
            <Button 
              variant={activeTab === 'home' ? 'default' : 'ghost'}
              className="h-14 flex flex-col text-xs"
              onClick={() => setActiveTab('home')}
            >
              <Home className="w-5 h-5 mb-1" />
              <span>Beranda</span>
            </Button>
            <Button 
              variant={activeTab === 'categories' ? 'default' : 'ghost'}
              className="h-14 flex flex-col text-xs"
              onClick={() => setActiveTab('categories')}
            >
              <ShoppingBag className="w-5 h-5 mb-1" />
              <span>Kategori</span>
            </Button>
            <Button 
              variant={activeTab === 'sell' ? 'default' : 'ghost'}
              className="h-14 flex flex-col text-xs"
              onClick={() => setActiveTab('sell')}
            >
              <Package className="w-5 h-5 mb-1" />
              <span>Jual</span>
            </Button>
            <Button 
              variant={activeTab === 'profile' ? 'default' : 'ghost'}
              className="h-14 flex flex-col text-xs"
              onClick={() => setActiveTab('profile')}
            >
              <User className="w-5 h-5 mb-1" />
              <span>Profil</span>
            </Button>
            <Button 
              variant={activeTab === 'settings' ? 'default' : 'ghost'}
              className="h-14 flex flex-col text-xs"
              onClick={() => setActiveTab('settings')}
            >
              <Settings className="w-5 h-5 mb-1" />
              <span>Pengaturan</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

// Import missing icons
import { Sun, Moon } from 'lucide-react'