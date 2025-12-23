'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Shield, 
  Users, 
  Star, 
  CheckCircle,
  ArrowLeft,
  Heart,
  Share2,
  MessageSquare,
  Eye,
  Clock,
  TrendingUp,
  Instagram,
  Gamepad2,
  Crown,
  Target,
  Zap,
  AlertCircle,
  Check,
  Sun,
  Moon
} from 'lucide-react'
import { useTheme } from 'next-themes'
import Link from 'next/link'

// Mock product data
const mockProduct = {
  id: 1,
  title: 'Instagram Pro Account 50K Followers',
  category: 'Instagram',
  type: 'social',
  price: 2500000,
  level: 'Professional',
  followers: 50000,
  engagement: '4.5%',
  verified: true,
  seller: {
    name: 'ProSeller123',
    rating: 4.8,
    reviews: 127,
    joinedSince: '2023-01-15',
    responseTime: '2 jam',
    successRate: '98%'
  },
  description: 'Akun Instagram premium dengan 50K followers aktif dan engagement rate tinggi. Perfect untuk influencer, digital marketer, atau business owner yang ingin boost presence online.',
  features: [
    '50K+ Followers aktif dan real',
    'Engagement rate 4.5% (di atas rata-rata)',
    'Niche lifestyle & travel',
    'Demografis audience 18-35 tahun',
    'Tidak pernah suspend',
    'Email dan password lengkap',
    'Data recovery tersedia'
  ],
  stats: {
    posts: 342,
    following: 1289,
    averageLikes: 2250,
    averageComments: 180,
    reach: '125K',
    impressions: '500K'
  },
  images: [
    '/api/placeholder/400/300',
    '/api/placeholder/400/300',
    '/api/placeholder/400/300'
  ],
  reviews: [
    {
      id: 1,
      user: 'Buyer123',
      rating: 5,
      comment: 'Akun sesuai deskripsi, followers real dan aktif. Seller sangat responsif!',
      date: '2024-01-15'
    },
    {
      id: 2,
      user: 'InfluencerBaru',
      rating: 4,
      comment: 'Good quality account, engagement rate memang tinggi. Recommended seller!',
      date: '2024-01-10'
    }
  ]
}

export default function ProductDetailPage() {
  const router = useRouter()
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()
  const params = useParams()
  const [selectedImage, setSelectedImage] = useState(0)
  const [isWishlisted, setIsWishlisted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleBuyNow = () => {
    const isLoggedIn = localStorage.getItem('isLoggedIn')
    if (!isLoggedIn) {
      alert('Silakan login terlebih dahulu untuk membeli produk ini.')
      router.push('/auth/login')
      return
    }
    
    // TODO: Implement checkout flow
    alert('Fitur checkout sedang dalam pengembangan.')
  }

  if (!mounted) return null

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 glass-effect-dark border-b border-border/50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/categories">
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
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Product Images */}
          <div>
            <Card className="glass-effect border-border/50 overflow-hidden">
              <div className="aspect-video bg-gradient-to-br from-primary/20 to-purple-500/20 flex items-center justify-center">
                <Instagram className="w-24 h-24 text-primary/50" />
              </div>
            </Card>
            
            {/* Thumbnail Gallery */}
            <div className="grid grid-cols-3 gap-2 mt-4">
              {mockProduct.images.map((_, index) => (
                <Card 
                  key={index}
                  className={`glass-effect border-border/50 cursor-pointer transition-all ${
                    selectedImage === index ? 'ring-2 ring-primary' : ''
                  }`}
                  onClick={() => setSelectedImage(index)}
                >
                  <div className="aspect-video bg-gradient-to-br from-primary/10 to-purple-500/10 flex items-center justify-center">
                    <Instagram className="w-8 h-8 text-primary/30" />
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div>
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-4">
                <Badge variant="secondary">
                  {mockProduct.type === 'social' ? 'Sosial Media' : 'Game'}
                </Badge>
                <Badge className="bg-green-500 text-white">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  Terverifikasi
                </Badge>
              </div>
              
              <h1 className="text-3xl font-bold mb-4">{mockProduct.title}</h1>
              
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-1">
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold">{mockProduct.seller.rating}</span>
                  <span className="text-muted-foreground">({mockProduct.seller.reviews} reviews)</span>
                </div>
                <Separator orientation="vertical" className="h-5" />
                <span className="text-muted-foreground">{mockProduct.category}</span>
              </div>

              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="text-3xl font-bold text-primary">
                    Rp {mockProduct.price.toLocaleString('id-ID')}
                  </p>
                  <p className="text-sm text-muted-foreground">Harga fixed, tidak ada biaya tambahan</p>
                </div>
                
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setIsWishlisted(!isWishlisted)}
                    className={isWishlisted ? 'text-red-500' : ''}
                  >
                    <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
                  </Button>
                  <Button variant="outline" size="icon">
                    <Share2 className="w-5 h-5" />
                  </Button>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <Card className="glass-effect border-border/50">
                  <CardContent className="p-4 text-center">
                    <Users className="w-6 h-6 mx-auto mb-2 text-primary" />
                    <p className="text-2xl font-bold">{mockProduct.followers.toLocaleString()}</p>
                    <p className="text-sm text-muted-foreground">Followers</p>
                  </CardContent>
                </Card>
                <Card className="glass-effect border-border/50">
                  <CardContent className="p-4 text-center">
                    <TrendingUp className="w-6 h-6 mx-auto mb-2 text-primary" />
                    <p className="text-2xl font-bold">{mockProduct.engagement}</p>
                    <p className="text-sm text-muted-foreground">Engagement</p>
                  </CardContent>
                </Card>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 mb-6">
                <Button 
                  size="lg" 
                  className="gradient-mimizo text-white hover:opacity-90 transition-opacity flex-1"
                  onClick={handleBuyNow}
                >
                  <Shield className="w-5 h-5 mr-2" />
                  Beli Sekarang
                </Button>
                <Button size="lg" variant="outline" className="flex-1">
                  <MessageSquare className="w-5 h-5 mr-2" />
                  Chat Seller
                </Button>
              </div>

              {/* Security Badges */}
              <Card className="glass-effect border-border/50">
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-3 flex items-center">
                    <Shield className="w-5 h-5 mr-2 text-green-500" />
                    Garansi Keamanan
                  </h3>
                  <div className="grid grid-cols-1 gap-2 text-sm">
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-green-500" />
                      <span>Escrow System - Pembayaran aman</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-green-500" />
                      <span>Garansi 7 hari penggantian akun</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-green-500" />
                      <span>Support 24/7 jika ada masalah</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Detailed Information Tabs */}
        <div className="mt-12">
          <Tabs defaultValue="description" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="description">Deskripsi</TabsTrigger>
              <TabsTrigger value="features">Fitur</TabsTrigger>
              <TabsTrigger value="stats">Statistik</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>
            
            <TabsContent value="description" className="mt-6">
              <Card className="glass-effect border-border/50">
                <CardHeader>
                  <CardTitle>Deskripsi Produk</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    {mockProduct.description}
                  </p>
                  
                  <div className="mt-6 grid md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold mb-2">Informasi Akun</h4>
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        <li>• Username: @lifestyle_influencer_id</li>
                        <li>• Email: Included (Gmail)</li>
                        <li>• Password: Included</li>
                        <li>• Recovery: Available</li>
                        <li>• 2FA: Disabled (ready to setup)</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Audience Demographics</h4>
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        <li>• Age: 18-35 years (75%)</li>
                        <li>• Gender: 60% Female, 40% Male</li>
                        <li>• Location: Indonesia (85%), SEA (15%)</li>
                        <li>• Interests: Lifestyle, Travel, Fashion</li>
                        <li>• Language: Indonesian, English</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="features" className="mt-6">
              <Card className="glass-effect border-border/50">
                <CardHeader>
                  <CardTitle>Fitur Unggulan</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    {mockProduct.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="stats" className="mt-6">
              <Card className="glass-effect border-border/50">
                <CardHeader>
                  <CardTitle>Statistik Akun</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <p className="text-3xl font-bold text-primary">{mockProduct.stats.posts}</p>
                      <p className="text-muted-foreground">Total Posts</p>
                    </div>
                    <div className="text-center">
                      <p className="text-3xl font-bold text-primary">{mockProduct.stats.averageLikes.toLocaleString()}</p>
                      <p className="text-muted-foreground">Avg. Likes</p>
                    </div>
                    <div className="text-center">
                      <p className="text-3xl font-bold text-primary">{mockProduct.stats.averageComments}</p>
                      <p className="text-muted-foreground">Avg. Comments</p>
                    </div>
                    <div className="text-center">
                      <p className="text-3xl font-bold text-primary">{mockProduct.stats.following.toLocaleString()}</p>
                      <p className="text-muted-foreground">Following</p>
                    </div>
                    <div className="text-center">
                      <p className="text-3xl font-bold text-primary">{mockProduct.stats.reach}</p>
                      <p className="text-muted-foreground">Monthly Reach</p>
                    </div>
                    <div className="text-center">
                      <p className="text-3xl font-bold text-primary">{mockProduct.stats.impressions}</p>
                      <p className="text-muted-foreground">Monthly Impressions</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="reviews" className="mt-6">
              <Card className="glass-effect border-border/50">
                <CardHeader>
                  <CardTitle>Customer Reviews</CardTitle>
                  <CardDescription>
                    Pengalaman pembeli lain dengan produk ini
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockProduct.reviews.map((review) => (
                      <div key={review.id} className="border-b border-border/50 pb-4 last:border-0">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                              <Users className="w-4 h-4 text-primary" />
                            </div>
                            <div>
                              <p className="font-medium">{review.user}</p>
                              <div className="flex items-center gap-1">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`w-3 h-3 ${
                                      i < review.rating
                                        ? 'fill-yellow-400 text-yellow-400'
                                        : 'text-gray-300'
                                    }`}
                                  />
                                ))}
                              </div>
                            </div>
                          </div>
                          <span className="text-sm text-muted-foreground">{review.date}</span>
                        </div>
                        <p className="text-sm text-muted-foreground">{review.comment}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Seller Information */}
        <div className="mt-12">
          <Card className="glass-effect border-border/50">
            <CardHeader>
              <CardTitle>Informasi Seller</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                  <Users className="w-8 h-8 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold">{mockProduct.seller.name}</h3>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span>{mockProduct.seller.rating} ({mockProduct.seller.reviews} reviews)</span>
                    </div>
                    <Separator orientation="vertical" className="h-4" />
                    <span>Bergabung sejak {new Date(mockProduct.seller.joinedSince).toLocaleDateString('id-ID')}</span>
                  </div>
                </div>
                <Button>
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Chat Seller
                </Button>
              </div>
              
              <div className="grid md:grid-cols-3 gap-4">
                <Card className="glass-effect border-border/50">
                  <CardContent className="p-4 text-center">
                    <Clock className="w-6 h-6 mx-auto mb-2 text-primary" />
                    <p className="font-semibold">{mockProduct.seller.responseTime}</p>
                    <p className="text-sm text-muted-foreground">Response Time</p>
                  </CardContent>
                </Card>
                <Card className="glass-effect border-border/50">
                  <CardContent className="p-4 text-center">
                    <CheckCircle className="w-6 h-6 mx-auto mb-2 text-green-500" />
                    <p className="font-semibold">{mockProduct.seller.successRate}</p>
                    <p className="text-sm text-muted-foreground">Success Rate</p>
                  </CardContent>
                </Card>
                <Card className="glass-effect border-border/50">
                  <CardContent className="p-4 text-center">
                    <Shield className="w-6 h-6 mx-auto mb-2 text-primary" />
                    <p className="font-semibold">Verified</p>
                    <p className="text-sm text-muted-foreground">Seller Status</p>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}