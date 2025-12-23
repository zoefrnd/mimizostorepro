'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'
import { 
  ArrowLeft,
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  Shield,
  Zap,
  Users,
  AlertCircle,
  CheckCircle,
  Sun,
  Moon
} from 'lucide-react'
import { useTheme } from 'next-themes'

export default function LoginPage() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    // Simulate API call
    setTimeout(() => {
      // Mock successful login
      localStorage.setItem('isLoggedIn', 'true')
      localStorage.setItem('user', JSON.stringify({
        id: 1,
        name: 'John Doe',
        email: formData.email,
        role: 'buyer'
      }))
      router.push('/dashboard')
      setIsLoading(false)
    }, 1500)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
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
                  <Shield className="w-6 h-6 text-white" />
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
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-4">
              Selamat Datang Kembali
            </h1>
            <p className="text-muted-foreground">
              Masuk ke akun MIMIZO STORE Anda
            </p>
          </div>

          <Card className="glass-effect border-border/50">
            <CardHeader>
              <CardTitle className="text-center">Login</CardTitle>
              <CardDescription className="text-center">
                Masuk dengan email dan password Anda
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                  <div className="flex items-center gap-2 p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
                    <AlertCircle className="w-4 h-4 text-destructive" />
                    <span className="text-sm text-destructive">{error}</span>
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="nama@email.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={handleInputChange}
                      className="pl-10 pr-10"
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-0 top-0 h-full px-3"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </Button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="remember" className="rounded" />
                    <Label htmlFor="remember" className="text-sm">Ingat saya</Label>
                  </div>
                  <Link href="/auth/forgot-password" className="text-sm text-primary hover:underline">
                    Lupa password?
                  </Link>
                </div>

                <Button 
                  type="submit" 
                  className="w-full gradient-mimizo text-white hover:opacity-90 transition-opacity"
                  disabled={isLoading}
                >
                  {isLoading ? 'Memproses...' : 'Masuk'}
                </Button>
              </form>

              <Separator className="my-6" />

              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-4">
                  Belum punya akun?
                </p>
                <Link href="/auth/register">
                  <Button variant="outline" className="w-full">
                    <User className="w-4 h-4 mr-2" />
                    Daftar Sekarang
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Features */}
          <div className="mt-8 grid grid-cols-1 gap-4">
            <Card className="glass-effect border-border/50">
              <CardContent className="p-4 flex items-center gap-3">
                <Shield className="w-8 h-8 text-green-500 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold">100% Aman</h4>
                  <p className="text-sm text-muted-foreground">Data Anda terenkripsi dan aman</p>
                </div>
              </CardContent>
            </Card>
            <Card className="glass-effect border-border/50">
              <CardContent className="p-4 flex items-center gap-3">
                <Zap className="w-8 h-8 text-primary flex-shrink-0" />
                <div>
                  <h4 className="font-semibold">Proses Cepat</h4>
                  <p className="text-sm text-muted-foreground">Login dalam hitungan detik</p>
                </div>
              </CardContent>
            </Card>
            <Card className="glass-effect border-border/50">
              <CardContent className="p-4 flex items-center gap-3">
                <Users className="w-8 h-8 text-primary flex-shrink-0" />
                <div>
                  <h4 className="font-semibold">Support 24/7</h4>
                  <p className="text-sm text-muted-foreground">Bantuan kapan saja Anda butuhkan</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

// Import missing icons
// import { Sun, Moon } from 'lucide-react'