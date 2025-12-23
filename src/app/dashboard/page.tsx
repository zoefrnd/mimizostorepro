'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Progress } from '@/components/ui/progress'
import { Separator } from '@/components/ui/separator'
import { 
  ArrowLeft,
  User,
  ShoppingBag,
  TrendingUp,
  Star,
  MessageSquare,
  Heart,
  Settings,
  LogOut,
  Eye,
  Clock,
  CheckCircle,
  AlertCircle,
  Package,
  DollarSign,
  Shield,
  Zap,
  Users,
  Gamepad2,
  Instagram,
  Crown
} from 'lucide-react'
import { useTheme } from 'next-themes'

// Mock data
const mockUser = {
  name: 'John Doe',
  email: 'john.doe@example.com',
  role: 'buyer',
  joinedDate: '2024-01-15',
  avatar: '/api/placeholder/100/100'
}

const mockTransactions = [
  {
    id: 1,
    title: 'Instagram Pro Account 50K Followers',
    type: 'purchase',
    status: 'completed',
    price: 2500000,
    date: '2024-01-20',
    seller: 'ProSeller123'
  },
  {
    id: 2,
    title: 'Mobile Legends Mythic Glory',
    type: 'purchase',
    status: 'pending',
    price: 850000,
    date: '2024-01-22',
    seller: 'GameMaster99'
  },
  {
    id: 3,
    title: 'TikTok Account 100K Followers',
    type: 'wishlist',
    status: 'saved',
    price: 5000000,
    date: '2024-01-18',
    seller: 'TikTokExpert'
  }
]

const mockStats = {
  totalTransactions: 12,
  completedPurchases: 8,
  totalSpent: 15000000,
  savedItems: 5,
  averageRating: 4.8
}

export default function DashboardPage() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('overview')

  useEffect(() => {
    setMounted(true)
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem('isLoggedIn')
    if (!isLoggedIn) {
      router.push('/auth/login')
    }
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn')
    localStorage.removeItem('user')
    router.push('/')
  }

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
                  <Gamepad2 className="w-6 h-6 text-white" />
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
              <Button variant="outline" onClick={handleLogout}>
                <LogOut className="w-4 h-4 mr-2" />
                Keluar
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        {/* User Header */}
        <div className="mb-8">
          <Card className="glass-effect border-border/50">
            <CardContent className="p-6">
              <div className="flex items-center gap-6">
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center">
                  <User className="w-10 h-10 text-primary" />
                </div>
                <div className="flex-1">
                  <h1 className="text-2xl font-bold mb-2">{mockUser.name}</h1>
                  <p className="text-muted-foreground mb-2">{mockUser.email}</p>
                  <div className="flex items-center gap-4">
                    <Badge variant="secondary">
                      {mockUser.role === 'buyer' ? 'Pembeli' : 'Penjual'}
                    </Badge>
                    <span className="text-sm text-muted-foreground">
                      Bergabung sejak {new Date(mockUser.joinedDate).toLocaleDateString('id-ID')}
                    </span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Settings className="w-4 h-4 mr-2" />
                    Pengaturan
                  </Button>
                  <Link href="/categories">
                    <Button size="sm" className="gradient-mimizo text-white">
                      <ShoppingBag className="w-4 h-4 mr-2" />
                      Belanja
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="glass-effect border-border/50">
            <CardContent className="p-4 text-center">
              <ShoppingBag className="w-8 h-8 mx-auto mb-2 text-primary" />
              <p className="text-2xl font-bold">{mockStats.totalTransactions}</p>
              <p className="text-sm text-muted-foreground">Total Transaksi</p>
            </CardContent>
          </Card>
          <Card className="glass-effect border-border/50">
            <CardContent className="p-4 text-center">
              <CheckCircle className="w-8 h-8 mx-auto mb-2 text-green-500" />
              <p className="text-2xl font-bold">{mockStats.completedPurchases}</p>
              <p className="text-sm text-muted-foreground">Pembelian Selesai</p>
            </CardContent>
          </Card>
          <Card className="glass-effect border-border/50">
            <CardContent className="p-4 text-center">
              <DollarSign className="w-8 h-8 mx-auto mb-2 text-primary" />
              <p className="text-2xl font-bold">Rp {mockStats.totalSpent.toLocaleString('id-ID')}</p>
              <p className="text-sm text-muted-foreground">Total Pengeluaran</p>
            </CardContent>
          </Card>
          <Card className="glass-effect border-border/50">
            <CardContent className="p-4 text-center">
              <Heart className="w-8 h-8 mx-auto mb-2 text-red-500" />
              <p className="text-2xl font-bold">{mockStats.savedItems}</p>
              <p className="text-sm text-muted-foreground">Wishlist</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Ringkasan</TabsTrigger>
            <TabsTrigger value="transactions">Transaksi</TabsTrigger>
            <TabsTrigger value="wishlist">Wishlist</TabsTrigger>
            <TabsTrigger value="settings">Pengaturan</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="mt-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Recent Transactions */}
              <Card className="glass-effect border-border/50">
                <CardHeader>
                  <CardTitle>Transaksi Terbaru</CardTitle>
                  <CardDescription>5 transaksi terakhir Anda</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockTransactions.slice(0, 3).map((transaction) => (
                      <div key={transaction.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                            {transaction.type === 'purchase' ? (
                              <ShoppingBag className="w-5 h-5 text-primary" />
                            ) : (
                              <Heart className="w-5 h-5 text-red-500" />
                            )}
                          </div>
                          <div>
                            <p className="font-medium text-sm">{transaction.title}</p>
                            <p className="text-xs text-muted-foreground">{transaction.date}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">Rp {transaction.price.toLocaleString('id-ID')}</p>
                          <Badge 
                            variant={transaction.status === 'completed' ? 'default' : 
                                   transaction.status === 'pending' ? 'secondary' : 'outline'}
                            className="text-xs"
                          >
                            {transaction.status === 'completed' ? 'Selesai' : 
                             transaction.status === 'pending' ? 'Pending' : 'Disimpan'}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Link href="/dashboard/transactions">
                    <Button variant="outline" className="w-full mt-4">
                      Lihat Semua Transaksi
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card className="glass-effect border-border/50">
                <CardHeader>
                  <CardTitle>Aksi Cepat</CardTitle>
                  <CardDescription>Akses cepat ke fitur favorit Anda</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <Link href="/categories">
                      <Button variant="outline" className="w-full h-20 flex flex-col gap-2">
                        <ShoppingBag className="w-6 h-6" />
                        <span className="text-sm">Jelajahi Produk</span>
                      </Button>
                    </Link>
                    <Link href="/sell">
                      <Button variant="outline" className="w-full h-20 flex flex-col gap-2">
                        <Package className="w-6 h-6" />
                        <span className="text-sm">Jual Akun</span>
                      </Button>
                    </Link>
                    <Link href="/dashboard/wishlist">
                      <Button variant="outline" className="w-full h-20 flex flex-col gap-2">
                        <Heart className="w-6 h-6" />
                        <span className="text-sm">Wishlist Saya</span>
                      </Button>
                    </Link>
                    <Link href="/dashboard/profile">
                      <Button variant="outline" className="w-full h-20 flex flex-col gap-2">
                        <Users className="w-6 h-6" />
                        <span className="text-sm">Edit Profil</span>
                      </Button>
                    </Link>
                    <Link href="/dashboard/settings">
                      <Button variant="outline" className="w-full h-20 flex flex-col gap-2">
                        <Settings className="w-6 h-6" />
                        <span className="text-sm">Pengaturan</span>
                      </Button>
                    </Link>
                    <Button 
                      variant="outline" 
                      className="w-full h-20 flex flex-col gap-2 border-green-500 hover:bg-green-500 hover:text-white"
                      onClick={() => window.open('https://wa.me/628123456789?text=Halo%20Admin%20MIMIZO%20STORE', '_blank')}
                    >
                      <MessageSquare className="w-6 h-6" />
                      <span className="text-sm">WhatsApp Admin</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="transactions" className="mt-6">
            <Card className="glass-effect border-border/50">
              <CardHeader>
                <CardTitle>Riwayat Transaksi</CardTitle>
                <CardDescription>Semua transaksi pembelian dan penjualan Anda</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockTransactions.map((transaction) => (
                    <div key={transaction.id} className="flex items-center justify-between p-4 border border-border/50 rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                          {transaction.type === 'purchase' ? (
                            <ShoppingBag className="w-6 h-6 text-primary" />
                          ) : (
                            <Heart className="w-6 h-6 text-red-500" />
                          )}
                        </div>
                        <div>
                          <h3 className="font-semibold">{transaction.title}</h3>
                          <p className="text-sm text-muted-foreground">
                            {transaction.type === 'purchase' ? 'Dibeli dari' : 'Disimpan dari'} {transaction.seller}
                          </p>
                          <p className="text-xs text-muted-foreground">{transaction.date}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold">Rp {transaction.price.toLocaleString('id-ID')}</p>
                        <Badge 
                          variant={transaction.status === 'completed' ? 'default' : 
                                 transaction.status === 'pending' ? 'secondary' : 'outline'}
                        >
                          {transaction.status === 'completed' ? 'Selesai' : 
                           transaction.status === 'pending' ? 'Pending' : 'Disimpan'}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="wishlist" className="mt-6">
            <Card className="glass-effect border-border/50">
              <CardHeader>
                <CardTitle>Wishlist Saya</CardTitle>
                <CardDescription>Produk yang Anda simpan untuk dibeli nanti</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {mockTransactions.filter(t => t.type === 'wishlist').map((item) => (
                    <Card key={item.id} className="glass-effect border-border/50">
                      <div className="aspect-video bg-gradient-to-br from-primary/20 to-purple-500/20 rounded-t-lg flex items-center justify-center">
                        <Instagram className="w-12 h-12 text-primary/50" />
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-semibold mb-2 line-clamp-2">{item.title}</h3>
                        <p className="text-2xl font-bold text-primary mb-2">
                          Rp {item.price.toLocaleString('id-ID')}
                        </p>
                        <div className="flex gap-2">
                          <Button size="sm" className="flex-1 gradient-mimizo text-white">
                            Beli Sekarang
                          </Button>
                          <Button size="sm" variant="outline">
                            <Heart className="w-4 h-4 fill-current text-red-500" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="settings" className="mt-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="glass-effect border-border/50">
                <CardHeader>
                  <CardTitle>Informasi Profil</CardTitle>
                  <CardDescription>Kelola informasi pribadi Anda</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Nama Lengkap</label>
                    <div className="mt-1 p-2 bg-muted/50 rounded">{mockUser.name}</div>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Email</label>
                    <div className="mt-1 p-2 bg-muted/50 rounded">{mockUser.email}</div>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Peran</label>
                    <div className="mt-1 p-2 bg-muted/50 rounded">
                      {mockUser.role === 'buyer' ? 'Pembeli' : 'Penjual'}
                    </div>
                  </div>
                  <Button className="w-full">
                    <Settings className="w-4 h-4 mr-2" />
                    Edit Profil
                  </Button>
                </CardContent>
              </Card>

              <Card className="glass-effect border-border/50">
                <CardHeader>
                  <CardTitle>Keamanan</CardTitle>
                  <CardDescription>Kelola keamanan akun Anda</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button variant="outline" className="w-full justify-start">
                    <Shield className="w-4 h-4 mr-2" />
                    Ubah Password
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Zap className="w-4 h-4 mr-2" />
                    Two-Factor Authentication
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Users className="w-4 h-4 mr-2" />
                    Login Activity
                  </Button>
                  <Separator />
                  <Button variant="destructive" className="w-full" onClick={handleLogout}>
                    <LogOut className="w-4 h-4 mr-2" />
                    Keluar dari Akun
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

// Import missing icons
import { Sun, Moon } from 'lucide-react'