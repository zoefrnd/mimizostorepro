'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { 
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
  Rocket,
  MessageSquare,
  HeadphonesIcon,
  Moon,
  Sun,
  ShoppingCart
} from 'lucide-react'
import { useTheme } from 'next-themes'

export default function HomePage() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()
  const [clickCount, setClickCount] = useState(0)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleLogoClick = () => {
    const newCount = clickCount + 1
    setClickCount(newCount)
    
    if (newCount === 5) {
      const adminEmail = prompt('Masukkan email admin:')
      const adminPassword = prompt('Masukkan password admin:')
      if (adminEmail === 'admin@mimizostore.com' && adminPassword === 'admin123') {
        localStorage.setItem('isAdmin', 'true')
        alert('Login admin berhasil!')
        window.location.href = '/admin'
      } else {
        alert('Email atau password admin salah!')
        setClickCount(0)
      }
    }
  }

  const stats = [
    { label: 'Total Transaksi', value: '12.5K+', icon: TrendingUp },
    { label: 'Akun Terjual', value: '8.2K+', icon: Users },
    { label: 'User Aktif', value: '5.8K+', icon: Crown },
    { label: 'Rating', value: '4.9/5', icon: Star },
  ]

  const features = [
    {
      icon: Shield,
      title: '100% Aman',
      description: 'Sistem escrow yang menjamin keamanan transaksi Anda'
    },
    {
      icon: Zap,
      title: 'Proses Cepat',
      description: 'Transaksi diproses dalam hitungan menit'
    },
    {
      icon: Users,
      title: 'Komunitas Terpercaya',
      description: 'Bergabung dengan ribuan pengguna aktif'
    }
  ]

  const socialCategories = [
    { name: 'Instagram', icon: Instagram, color: 'bg-gradient-to-r from-purple-500 to-pink-500' },
    { name: 'TikTok', icon: Music, color: 'bg-gradient-to-r from-black to-gray-800' },
    { name: 'Facebook', icon: Facebook, color: 'bg-gradient-to-r from-blue-600 to-blue-400' },
    { name: 'Twitter (X)', icon: Twitter, color: 'bg-gradient-to-r from-black to-gray-700' },
    { name: 'YouTube', icon: Youtube, color: 'bg-gradient-to-r from-red-600 to-red-400' },
  ]

  const gameCategories = [
    { name: 'Mobile Legends', icon: Crown, color: 'bg-gradient-to-r from-yellow-500 to-orange-500', image: '/game-icons/mobile-legends-icon.png' },
    { name: 'PUBG', icon: Target, color: 'bg-gradient-to-r from-yellow-600 to-orange-600', image: '/game-icons/pubg-icon.png' },
    { name: 'Free Fire', icon: Swords, color: 'bg-gradient-to-r from-blue-500 to-purple-500', image: '/game-icons/free-fire-icon.png' },
    { name: 'Genshin Impact', icon: Star, color: 'bg-gradient-to-r from-blue-400 to-cyan-400', image: '/game-icons/genshin-impact-icon.png' },
    { name: 'Valorant', icon: Target, color: 'bg-gradient-to-r from-red-500 to-pink-500', image: '/game-icons/valorant-icon.png' },
    { name: 'Steam', icon: Gamepad2, color: 'bg-gradient-to-r from-blue-600 to-blue-400', image: '/game-icons/steam-icon.png' },
    { name: 'Call Of Duty Mobile', icon: Target, color: 'bg-gradient-to-r from-green-600 to-green-400', image: '/game-icons/cod-icon.png' },
    { name: 'Efootball Mobile', icon: Target, color: 'bg-gradient-to-r from-blue-500 to-cyan-500', image: '/game-icons/efootball-icon.png' },
  ]

  if (!mounted) return null

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 glass-effect-dark border-b border-border/50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div 
                className="w-10 h-10 gradient-mimizo rounded-xl flex items-center justify-center cursor-pointer"
                onClick={handleLogoClick}
              >
                <img src="/mimizo-logo.png" alt="MIMIZO STORE" className="w-6 h-6 rounded-lg" />
              </div>
              <span className="text-xl font-bold text-gradient">MIMIZO STORE</span>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <a href="#beranda" className="text-foreground/80 hover:text-foreground transition-colors">Beranda</a>
              <a href="#kategori" className="text-foreground/80 hover:text-foreground transition-colors">Kategori</a>
              <a href="#fitur" className="text-foreground/80 hover:text-foreground transition-colors">Fitur</a>
              <a href="#keamanan" className="text-foreground/80 hover:text-foreground transition-colors">Keamanan</a>
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

      {/* Hero Section */}
      <section id="beranda" className="relative overflow-hidden py-20 lg:py-32">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-purple-500/20" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <Badge variant="secondary" className="mb-6 px-4 py-2">
              <Shield className="w-4 h-4 mr-2" />
              Marketplace Terpercaya #1 di Indonesia
            </Badge>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
              <span className="text-gradient">Marketplace Aman & Terpercaya</span>
              <br />
              <span className="text-foreground">untuk Akun Sosmed & Game</span>
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Jual beli akun sosial media dan game dengan sistem escrow yang menjamin 100% keamanan transaksi Anda.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link href="/categories">
                <Button size="lg" className="gradient-mimizo text-white hover:opacity-90 transition-opacity text-lg px-8 py-6">
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Beli Sekarang
                </Button>
              </Link>
              <Link href="/sell">
                <Button size="lg" variant="outline" className="text-lg px-8 py-6 border-2">
                  <Rocket className="w-5 h-5 mr-2" />
                  Jual Akun
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <Card key={index} className="glass-effect border-border/50">
                  <CardContent className="p-6 text-center">
                    <stat.icon className="w-8 h-8 mx-auto mb-2 text-primary" />
                    <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="fitur" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Mengapa Memilih <span className="text-gradient">MIMIZO STORE</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Platform dengan fitur terlengkap dan keamanan terjamin untuk transaksi akun digital Anda
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="glass-effect border-border/50 hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-16 h-16 gradient-mimizo rounded-2xl flex items-center justify-center mb-4">
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section id="kategori" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Kategori <span className="text-gradient">Populer</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Berbagai macam akun sosial media dan game tersedia
            </p>
          </div>

          <div className="space-y-12">
            {/* Social Media Categories */}
            <div>
              <h3 className="text-2xl font-semibold mb-6 flex items-center">
                <Users className="w-6 h-6 mr-2 text-primary" />
                Akun Sosial Media
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {socialCategories.map((category, index) => (
                  <Card key={index} className="glass-effect border-border/50 hover:shadow-lg transition-all hover:scale-105 cursor-pointer">
                    <CardContent className="p-6 text-center">
                      <div className={`w-12 h-12 ${category.color} rounded-xl flex items-center justify-center mx-auto mb-3`}>
                        <category.icon className="w-6 h-6 text-white" />
                      </div>
                      <p className="font-medium">{category.name}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <Separator />

            {/* Game Categories */}
            <div>
              <h3 className="text-2xl font-semibold mb-6 flex items-center">
                <Gamepad2 className="w-6 h-6 mr-2 text-primary" />
                Akun Game
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {gameCategories.map((category, index) => (
                  <Card key={index} className="glass-effect border-border/50 hover:shadow-lg transition-all hover:scale-105 cursor-pointer">
                    <CardContent className="p-6 text-center">
                      <div className={`w-12 h-12 ${category.color} rounded-xl flex items-center justify-center mx-auto mb-3`}>
                        <img src={category.image} alt={category.name} className="w-8 h-8 rounded-lg" />
                      </div>
                      <p className="font-medium">{category.name}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Security Section */}
      <section id="keamanan" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Sistem <span className="text-gradient">Keamanan</span> Kami
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Perlindungan maksimal untuk setiap transaksi
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="glass-effect border-border/50">
              <CardContent className="p-6 text-center">
                <Shield className="w-12 h-12 mx-auto mb-4 text-primary" />
                <h3 className="font-semibold mb-2">Escrow System</h3>
                <p className="text-sm text-muted-foreground">Pembayaran ditahan hingga transaksi selesai</p>
              </CardContent>
            </Card>

            <Card className="glass-effect border-border/50">
              <CardContent className="p-6 text-center">
                <CheckCircle className="w-12 h-12 mx-auto mb-4 text-primary" />
                <h3 className="font-semibold mb-2">Verifikasi Seller</h3>
                <p className="text-sm text-muted-foreground">Semua penjual diverifikasi ketat</p>
              </CardContent>
            </Card>

            <Card className="glass-effect border-border/50">
              <CardContent className="p-6 text-center">
                <MessageSquare className="w-12 h-12 mx-auto mb-4 text-primary" />
                <h3 className="font-semibold mb-2">Dispute Resolution</h3>
                <p className="text-sm text-muted-foreground">Tim support siap membantu 24/7</p>
              </CardContent>
            </Card>

            <Card className="glass-effect border-border/50">
              <CardContent className="p-6 text-center">
                <Star className="w-12 h-12 mx-auto mb-4 text-primary" />
                <h3 className="font-semibold mb-2">Rating System</h3>
                <p className="text-sm text-muted-foreground">Berdasarkan review pengguna nyata</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <Card className="gradient-mimizo border-0 text-center">
            <CardContent className="p-12 lg:p-16">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Siap Memulai Transaksi Aman?
              </h2>
              <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                Bergabunglah dengan ribuan pengguna yang telah mempercayai transaksi akun digital mereka kepada kami.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-white text-primary hover:bg-gray-100 text-lg px-8 py-6">
                  <HeadphonesIcon className="w-5 h-5 mr-2" />
                  Hubungi Support
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary text-lg px-8 py-6">
                  <Rocket className="w-5 h-5 mr-2" />
                  Mulai Sekarang
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 gradient-mimizo rounded-lg flex items-center justify-center">
                  <img src="/mimizo-logo.png" alt="MIMIZO STORE" className="w-5 h-5 rounded-md" />
                </div>
                <span className="text-lg font-bold text-gradient">MIMIZO STORE</span>
              </div>
              <p className="text-muted-foreground">
                Marketplace terpercaya untuk jual beli akun sosial media dan game.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Layanan</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">Beli Akun</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Jual Akun</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Escrow Service</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Verification</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">FAQ</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Terms & Conditions</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Privacy Policy</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                <Button variant="ghost" size="icon">
                  <Instagram className="w-5 h-5" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Twitter className="w-5 h-5" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Facebook className="w-5 h-5" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Youtube className="w-5 h-5" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Music className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>

          <Separator className="my-8" />

          <div className="text-center text-muted-foreground">
            <p>&copy; 2024 MIMIZO STORE. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}