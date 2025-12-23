'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { 
  Search, 
  Filter, 
  SlidersHorizontal,
  Shield, 
  Zap, 
  Users, 
  TrendingUp, 
  Star, 
  CheckCircle,
  Instagram,
  Music,
  Gamepad2,
  Youtube,
  Twitter,
  Facebook,
  Crown,
  Swords,
  Target,
  ArrowLeft,
  Heart,
  Eye,
  MessageSquare,
  Sun,
  Moon
} from 'lucide-react'
import { useTheme } from 'next-themes'

// Mock data for products
const mockProducts = [
  {
    id: 1,
    title: 'Instagram Pro Account 50K Followers',
    category: 'Instagram',
    type: 'social',
    price: 2500000,
    level: 'Professional',
    followers: 50000,
    engagement: '4.5%',
    verified: true,
    seller: 'ProSeller123',
    rating: 4.8,
    reviews: 127,
    image: '/api/placeholder/300/200',
    description: 'Akun Instagram dengan 50K followers aktif, engagement rate tinggi, niche lifestyle'
  },
  {
    id: 2,
    title: 'Mobile Legends Mythic Glory',
    category: 'Mobile Legends',
    type: 'game',
    price: 850000,
    level: 'Mythic Glory',
    heroes: 120,
    skins: 85,
    verified: true,
    seller: 'GameMaster99',
    rating: 4.9,
    reviews: 89,
    image: '/api/placeholder/300/200',
    description: 'Akun MLBB Mythic Glory dengan 120+ hero dan 85+ skin rare'
  },
  {
    id: 3,
    title: 'TikTok Account 100K Followers',
    category: 'TikTok',
    type: 'social',
    price: 5000000,
    level: 'Influencer',
    followers: 100000,
    engagement: '6.2%',
    verified: true,
    seller: 'TikTokExpert',
    rating: 4.7,
    reviews: 203,
    image: '/api/placeholder/300/200',
    description: 'Akun TikTok dengan 100K followers, viral content creator'
  },
  {
    id: 4,
    title: 'PUBG Mobile Ace Level',
    category: 'PUBG',
    type: 'game',
    price: 1200000,
    level: 'Ace',
    kd: '4.2',
    winRate: '18%',
    verified: false,
    seller: 'PUBGPro',
    rating: 4.6,
    reviews: 56,
    image: '/api/placeholder/300/200',
    description: 'Akun PUBG Mobile Ace tier dengan KD 4.2 dan win rate 18%'
  },
  {
    id: 5,
    title: 'YouTube Channel 10K Subscribers',
    category: 'YouTube',
    type: 'social',
    price: 8000000,
    level: 'Partner',
    subscribers: 10000,
    views: '500K',
    verified: true,
    seller: 'YouTubeGuru',
    rating: 4.9,
    reviews: 67,
    image: '/api/placeholder/300/200',
    description: 'Channel YouTube dengan 10K subscribers dan monetization enabled'
  },
  {
    id: 6,
    title: 'Genshin Impact AR 60',
    category: 'Genshin Impact',
    type: 'game',
    price: 2500000,
    level: 'AR 60',
    characters: 35,
    weapons: 50,
    verified: true,
    seller: 'GenshinMaster',
    rating: 5.0,
    reviews: 41,
    image: '/api/placeholder/300/200',
    description: 'Akun Genshin Impact AR 60 dengan 5-star characters lengkap'
  }
]

const categories = [
  { name: 'Instagram', icon: Instagram, color: 'bg-gradient-to-r from-purple-500 to-pink-500' },
  { name: 'TikTok', icon: Music, color: 'bg-gradient-to-r from-black to-gray-800' },
  { name: 'Facebook', icon: Facebook, color: 'bg-gradient-to-r from-blue-600 to-blue-400' },
  { name: 'Twitter (X)', icon: Twitter, color: 'bg-gradient-to-r from-black to-gray-700' },
  { name: 'YouTube', icon: Youtube, color: 'bg-gradient-to-r from-red-600 to-red-400' },
  { name: 'Mobile Legends', icon: Crown, color: 'bg-gradient-to-r from-yellow-500 to-orange-500', image: '/game-icons/mobile-legends-icon.png' },
  { name: 'PUBG', icon: Target, color: 'bg-gradient-to-r from-yellow-600 to-orange-600', image: '/game-icons/pubg-icon.png' },
  { name: 'Free Fire', icon: Swords, color: 'bg-gradient-to-r from-blue-500 to-purple-500', image: '/game-icons/free-fire-icon.png' },
  { name: 'Genshin Impact', icon: Star, color: 'bg-gradient-to-r from-blue-400 to-cyan-400', image: '/game-icons/genshin-impact-icon.png' },
  { name: 'Valorant', icon: Target, color: 'bg-gradient-to-r from-red-500 to-pink-500', image: '/game-icons/valorant-icon.png' },
  { name: 'Steam', icon: Gamepad2, color: 'bg-gradient-to-r from-blue-600 to-blue-400', image: '/game-icons/steam-icon.png' },
  { name: 'Call Of Duty Mobile', icon: Target, color: 'bg-gradient-to-r from-green-600 to-green-400', image: '/game-icons/cod-icon.png' },
  { name: 'Efootball Mobile', icon: Target, color: 'bg-gradient-to-r from-blue-500 to-cyan-500', image: '/game-icons/efootball-icon.png' },
]

export default function CategoriesPage() {
  const router = useRouter()
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState('popular')
  const [priceRange, setPriceRange] = useState({ min: '', max: '' })
  const [showFilters, setShowFilters] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Auto-logout logic when user tries to shop
    const isLoggedIn = localStorage.getItem('isLoggedIn')
    const userRole = JSON.parse(localStorage.getItem('user') || '{}').role
    
    // If user is not a buyer, auto-logout when accessing shopping
    if (isLoggedIn && userRole !== 'buyer') {
      localStorage.removeItem('isLoggedIn')
      localStorage.removeItem('user')
      router.push('/auth/login')
      alert('Anda tidak memiliki izin untuk berbelanja. Silakan login sebagai pembeli.')
    }
  }, [])

  const filteredProducts = mockProducts.filter(product => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory
    const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesPriceMin = priceRange.min === '' || product.price >= parseInt(priceRange.min)
    const matchesPriceMax = priceRange.max === '' || product.price <= parseInt(priceRange.max)
    
    return matchesCategory && matchesSearch && matchesPriceMin && matchesPriceMax
  })

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price
      case 'price-high':
        return b.price - a.price
      case 'rating':
        return b.rating - a.rating
      case 'newest':
        return b.id - a.id
      default:
        return b.reviews - a.reviews
    }
  })

  if (!mounted) return null

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 glass-effect-dark border-b border-border/50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/">
                <Button variant="ghost" size="icon">
                  <ArrowLeft className="w-5 h-5" />
                </Button>
              </Link>
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 gradient-mimizo rounded-xl flex items-center justify-center">
                  <img src="/mimizo-logo.png" alt="MIMIZO STORE" className="w-6 h-6 rounded-lg" />
                </div>
                <span className="text-xl font-bold text-gradient">MIMIZO STORE</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="rounded-full"
              >
                {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </Button>
              <Link href="/auth/login">
                <Button variant="outline" className="hidden md:block">
                  Masuk
                </Button>
              </Link>
              <Link href="/auth/register">
                <Button className="gradient-mimizo text-white hover:opacity-90 transition-opacity">
                  Daftar
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Jelajahi <span className="text-gradient">Kategori</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Temukan akun sosial media dan game yang sesuai dengan kebutuhan Anda
          </p>
        </div>

        {/* Category Filter */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-3 justify-center">
            <Button
              variant={selectedCategory === 'all' ? 'default' : 'outline'}
              onClick={() => setSelectedCategory('all')}
              className="rounded-full"
            >
              Semua Kategori
            </Button>
            {categories.map((category) => (
              <Button
                key={category.name}
                variant={selectedCategory === category.name ? 'default' : 'outline'}
                onClick={() => setSelectedCategory(category.name)}
                className="rounded-full"
              >
                <category.icon className="w-4 h-4 mr-2" />
                {category.name}
              </Button>
            ))}
          </div>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col lg:flex-row gap-4 mb-8">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <Input
                placeholder="Cari akun..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          
          <div className="flex gap-4">
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Urutkan" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="popular">Terpopuler</SelectItem>
                <SelectItem value="price-low">Harga Terendah</SelectItem>
                <SelectItem value="price-high">Harga Tertinggi</SelectItem>
                <SelectItem value="rating">Rating Tertinggi</SelectItem>
                <SelectItem value="newest">Terbaru</SelectItem>
              </SelectContent>
            </Select>
            
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden"
            >
              <SlidersHorizontal className="w-5 h-5 mr-2" />
              Filter
            </Button>
          </div>
        </div>

        {/* Advanced Filters */}
        <div className={`${showFilters ? 'block' : 'hidden'} lg:block mb-8`}>
          <Card className="glass-effect border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center text-lg">
                <Filter className="w-5 h-5 mr-2" />
                Filter Lanjutan
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Harga Minimum</label>
                  <Input
                    type="number"
                    placeholder="Rp 0"
                    value={priceRange.min}
                    onChange={(e) => setPriceRange({ ...priceRange, min: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Harga Maksimum</label>
                  <Input
                    type="number"
                    placeholder="Rp 10.000.000"
                    value={priceRange.max}
                    onChange={(e) => setPriceRange({ ...priceRange, max: e.target.value })}
                  />
                </div>
                <div className="flex items-end">
                  <Button 
                    variant="outline" 
                    onClick={() => setPriceRange({ min: '', max: '' })}
                    className="w-full"
                  >
                    Reset Filter
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Results Count */}
        <div className="flex justify-between items-center mb-6">
          <p className="text-muted-foreground">
            Menampilkan <span className="font-semibold text-foreground">{sortedProducts.length}</span> produk
          </p>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Heart className="w-4 h-4 mr-1" />
              Wishlist
            </Button>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedProducts.map((product) => (
            <Card key={product.id} className="glass-effect border-border/50 hover:shadow-lg transition-all hover:scale-105 group cursor-pointer">
              <div className="relative">
                <div className="aspect-video bg-gradient-to-br from-primary/20 to-purple-500/20 rounded-t-lg flex items-center justify-center">
                  <Gamepad2 className="w-16 h-16 text-primary/50" />
                </div>
                <div className="absolute top-3 right-3 flex gap-2">
                  {product.verified && (
                    <Badge className="bg-green-500 text-white">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Terverifikasi
                    </Badge>
                  )}
                  <Button variant="ghost" size="icon" className="bg-background/80 backdrop-blur-sm">
                    <Heart className="w-4 h-4" />
                  </Button>
                </div>
                <div className="absolute top-3 left-3">
                  <Badge variant="secondary">
                    {product.type === 'social' ? 'Sosmed' : 'Game'}
                  </Badge>
                </div>
              </div>
              
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <CardTitle className="text-lg line-clamp-2">{product.title}</CardTitle>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span>{product.category}</span>
                  <Separator orientation="vertical" className="h-4" />
                  <span>{product.level}</span>
                </div>
              </CardHeader>
              
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  {product.description}
                </p>
                
                {/* Product Details */}
                <div className="grid grid-cols-2 gap-2 mb-4 text-sm">
                  {product.type === 'social' ? (
                    <>
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4 text-primary" />
                        <span>{product.followers?.toLocaleString()} followers</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <TrendingUp className="w-4 h-4 text-primary" />
                        <span>{product.engagement} engagement</span>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex items-center gap-1">
                        <Target className="w-4 h-4 text-primary" />
                        <span>{product.level}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-primary" />
                        <span>{product.heroes || product.characters || product.kd}+ items</span>
                      </div>
                    </>
                  )}
                </div>
                
                {/* Seller Info */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                      <Users className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">{product.seller}</p>
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                        <span className="text-xs text-muted-foreground">{product.rating}</span>
                        <span className="text-xs text-muted-foreground">({product.reviews})</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Price and Actions */}
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold text-primary">
                      Rp {product.price.toLocaleString('id-ID')}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Link href={`/product/${product.id}`}>
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4 mr-1" />
                        Detail
                      </Button>
                    </Link>
                    <Link href={`/product/${product.id}`}>
                      <Button size="sm" className="gradient-mimizo text-white">
                        Beli
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {sortedProducts.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-12 h-12 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Tidak ada produk ditemukan</h3>
            <p className="text-muted-foreground mb-4">
              Coba ubah filter atau kata kunci pencarian Anda
            </p>
            <Button onClick={() => {
              setSearchTerm('')
              setSelectedCategory('all')
              setPriceRange({ min: '', max: '' })
            }}>
              Reset Filter
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}