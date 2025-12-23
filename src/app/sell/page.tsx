'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { 
  ArrowLeft,
  Upload,
  Eye,
  EyeOff,
  Shield,
  Zap,
  Users,
  AlertCircle,
  CheckCircle,
  Camera,
  Image as ImageIcon,
  Star,
  TrendingUp,
  Package,
  DollarSign,
  Instagram,
  Music,
  Gamepad2,
  Youtube,
  Twitter,
  Facebook,
  Crown,
  Swords,
  Target
} from 'lucide-react'
import { useTheme } from 'next-themes'

export default function SellPage() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [showPreview, setShowPreview] = useState(false)
  const [formData, setFormData] = useState({
    // Step 1: Basic Info
    title: '',
    category: '',
    type: '',
    price: '',
    description: '',
    
    // Step 2: Account Details
    username: '',
    email: '',
    password: '',
    followers: '',
    level: '',
    engagement: '',
    
    // Step 3: Media
    images: [] as File[],
    
    // Step 4: Additional Info
    features: [] as string[],
    terms: false
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem('isLoggedIn')
    if (!isLoggedIn) {
      router.push('/auth/login')
    }
  }, [router])

  const categories = [
    { name: 'Instagram', icon: Instagram, type: 'social' },
    { name: 'TikTok', icon: Music, type: 'social' },
    { name: 'Facebook', icon: Facebook, type: 'social' },
    { name: 'Twitter (X)', icon: Twitter, type: 'social' },
    { name: 'YouTube', icon: Youtube, type: 'social' },
    { name: 'Mobile Legends', icon: Crown, type: 'game' },
    { name: 'PUBG', icon: Target, type: 'game' },
    { name: 'Free Fire', icon: Swords, type: 'game' },
    { name: 'Genshin Impact', icon: Star, type: 'game' },
    { name: 'Valorant', icon: Target, type: 'game' },
    { name: 'Steam', icon: Gamepad2, type: 'game' },
    { name: 'Call Of Duty Mobile', icon: Target, type: 'game' },
    { name: 'Efootball Mobile', icon: Target, type: 'game' },
  ]

  const gameFeatures = [
    'Hero lengkap',
    'Skin rare',
    'Rank tinggi',
    'Item premium',
    'Akun aman',
    'No ban history',
    'Data lengkap'
  ]

  const socialFeatures = [
    'Followers aktif',
    'Engagement rate tinggi',
    'No fake followers',
    'Niche spesifik',
    'Demografis bagus',
    'Konten berkualitas',
    'Monetization ready'
  ]

  const validateStep = (step: number) => {
    const newErrors: Record<string, string> = {}

    if (step === 1) {
      if (!formData.title.trim()) newErrors.title = 'Judul wajib diisi'
      if (!formData.category) newErrors.category = 'Kategori wajib dipilih'
      if (!formData.type) newErrors.type = 'Tipe wajib dipilih'
      if (!formData.price || parseInt(formData.price) <= 0) newErrors.price = 'Harga wajib diisi'
      if (!formData.description.trim()) newErrors.description = 'Deskripsi wajib diisi'
    }

    if (step === 2) {
      if (!formData.username.trim()) newErrors.username = 'Username wajib diisi'
      if (!formData.email.trim()) newErrors.email = 'Email wajib diisi'
      if (!formData.password.trim()) newErrors.password = 'Password wajib diisi'
      if (!formData.followers.trim()) newErrors.followers = 'Jumlah followers wajib diisi'
      if (!formData.level.trim()) newErrors.level = 'Level/rank wajib diisi'
    }

    if (step === 3) {
      if (formData.images.length === 0) newErrors.images = 'Minimal 1 gambar wajib diupload'
    }

    if (step === 4) {
      if (formData.features.length === 0) newErrors.features = 'Minimal 1 fitur wajib dipilih'
      if (!formData.terms) newErrors.terms = 'Syarat dan ketentuan wajib disetujui'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    setCurrentStep(currentStep - 1)
  }

  const handleInputChange = (field: string, value: any) => {
    setFormData({
      ...formData,
      [field]: value
    })
    
    if (errors[field]) {
      setErrors({
        ...errors,
        [field]: ''
      })
    }
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    setFormData({
      ...formData,
      images: [...formData.images, ...files]
    })
    
    if (errors.images) {
      setErrors({
        ...errors,
        images: ''
      })
    }
  }

  const handleFeatureToggle = (feature: string) => {
    const newFeatures = formData.features.includes(feature)
      ? formData.features.filter(f => f !== feature)
      : [...formData.features, feature]
    
    setFormData({
      ...formData,
      features: newFeatures
    })
  }

  const handleSubmit = async () => {
    if (!validateStep(4)) return

    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      alert('Akun berhasil diupload untuk dijual!')
      router.push('/dashboard')
      setIsSubmitting(false)
    }, 2000)
  }

  const handleCategoryChange = (category: string) => {
    const selectedCategory = categories.find(c => c.name === category)
    setFormData({
      ...formData,
      category,
      type: selectedCategory?.type || ''
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
              <Link href="/dashboard">
                <Button variant="outline">Dashboard</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-4">
              Jual Akun Anda
            </h1>
            <p className="text-muted-foreground">
              Upload akun sosial media atau game Anda untuk dijual di marketplace terpercaya
            </p>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Langkah {currentStep} dari 4</span>
              <span className="text-sm text-muted-foreground">
                {currentStep === 1 && 'Informasi Dasar'}
                {currentStep === 2 && 'Detail Akun'}
                {currentStep === 3 && 'Upload Media'}
                {currentStep === 4 && 'Informasi Tambahan'}
              </span>
            </div>
            <Progress value={(currentStep / 4) * 100} className="w-full" />
          </div>

          {/* Step 1: Basic Information */}
          {currentStep === 1 && (
            <Card className="glass-effect border-border/50">
              <CardHeader>
                <CardTitle>Langkah 1: Informasi Dasar</CardTitle>
                <CardDescription>Informasi utama tentang akun yang Anda jual</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="title">Judul Listing</Label>
                    <Input
                      id="title"
                      placeholder="Contoh: Instagram Pro Account 50K Followers"
                      value={formData.title}
                      onChange={(e) => handleInputChange('title', e.target.value)}
                      className={errors.title ? 'border-destructive' : ''}
                    />
                    {errors.title && (
                      <p className="text-sm text-destructive flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.title}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="category">Kategori</Label>
                    <Select value={formData.category} onValueChange={handleCategoryChange}>
                      <SelectTrigger className={errors.category ? 'border-destructive' : ''}>
                        <SelectValue placeholder="Pilih kategori" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category.name} value={category.name}>
                            <div className="flex items-center gap-2">
                              <category.icon className="w-4 h-4" />
                              {category.name}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.category && (
                      <p className="text-sm text-destructive flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.category}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="price">Harga (Rp)</Label>
                    <Input
                      id="price"
                      type="number"
                      placeholder="2500000"
                      value={formData.price}
                      onChange={(e) => handleInputChange('price', e.target.value)}
                      className={errors.price ? 'border-destructive' : ''}
                    />
                    {errors.price && (
                      <p className="text-sm text-destructive flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.price}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="type">Tipe Akun</Label>
                    <Select value={formData.type} onValueChange={(value) => handleInputChange('type', value)}>
                      <SelectTrigger className={errors.type ? 'border-destructive' : ''}>
                        <SelectValue placeholder="Pilih tipe" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="social">Sosial Media</SelectItem>
                        <SelectItem value="game">Game</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.type && (
                      <p className="text-sm text-destructive flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.type}
                      </p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Deskripsi</Label>
                  <Textarea
                    id="description"
                    placeholder="Deskripsikan akun Anda secara detail..."
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    rows={4}
                    className={errors.description ? 'border-destructive' : ''}
                  />
                  {errors.description && (
                    <p className="text-sm text-destructive flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                        {errors.description}
                      </p>
                    )}
                </div>

                <div className="flex justify-end">
                  <Button onClick={handleNext} className="gradient-mimizo text-white">
                    Lanjutkan
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 2: Account Details */}
          {currentStep === 2 && (
            <Card className="glass-effect border-border/50">
              <CardHeader>
                <CardTitle>Langkah 2: Detail Akun</CardTitle>
                <CardDescription>Informasi spesifik tentang akun yang Anda jual</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="username">Username</Label>
                    <Input
                      id="username"
                      placeholder="@username"
                      value={formData.username}
                      onChange={(e) => handleInputChange('username', e.target.value)}
                      className={errors.username ? 'border-destructive' : ''}
                    />
                    {errors.username && (
                      <p className="text-sm text-destructive flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.username}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Akun</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="email@example.com"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className={errors.email ? 'border-destructive' : ''}
                    />
                    {errors.email && (
                      <p className="text-sm text-destructive flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Password akun"
                      value={formData.password}
                      onChange={(e) => handleInputChange('password', e.target.value)}
                      className={errors.password ? 'border-destructive' : ''}
                    />
                    {errors.password && (
                      <p className="text-sm text-destructive flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.password}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="followers">Followers/Level</Label>
                    <Input
                      id="followers"
                      placeholder="50K / Mythic Glory"
                      value={formData.followers}
                      onChange={(e) => handleInputChange('followers', e.target.value)}
                      className={errors.followers ? 'border-destructive' : ''}
                    />
                    {errors.followers && (
                      <p className="text-sm text-destructive flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.followers}
                      </p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="level">Level/Rank/Engagement</Label>
                  <Input
                    id="level"
                    placeholder="Contoh: 4.5% engagement / Rank Master"
                    value={formData.level}
                    onChange={(e) => handleInputChange('level', e.target.value)}
                    className={errors.level ? 'border-destructive' : ''}
                  />
                  {errors.level && (
                    <p className="text-sm text-destructive flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.level}
                    </p>
                  )}
                </div>

                <div className="flex justify-between">
                  <Button variant="outline" onClick={handlePrevious}>
                    Kembali
                  </Button>
                  <Button onClick={handleNext} className="gradient-mimizo text-white">
                    Lanjutkan
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 3: Media Upload */}
          {currentStep === 3 && (
            <Card className="glass-effect border-border/50">
              <CardHeader>
                <CardTitle>Langkah 3: Upload Media</CardTitle>
                <CardDescription>Upload screenshot atau bukti akun Anda</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="border-2 border-dashed border-border/50 rounded-lg p-8">
                  <div className="text-center">
                    <Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                    <h3 className="text-lg font-semibold mb-2">Upload Gambar Akun</h3>
                    <p className="text-muted-foreground mb-4">
                      Upload screenshot akun Anda sebagai bukti
                    </p>
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      id="image-upload"
                    />
                    <Button 
                      onClick={() => document.getElementById('image-upload')?.click()}
                      className="gradient-mimizo text-white"
                    >
                      <Camera className="w-4 h-4 mr-2" />
                      Pilih Gambar
                    </Button>
                  </div>
                </div>

                {formData.images.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {formData.images.map((image, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={URL.createObjectURL(image)}
                          alt={`Preview ${index + 1}`}
                          className="w-full h-32 object-cover rounded-lg border border-border/50"
                        />
                        <Button
                          variant="destructive"
                          size="icon"
                          className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={() => {
                            const newImages = formData.images.filter((_, i) => i !== index)
                            handleInputChange('images', newImages)
                          }}
                        >
                          ×
                        </Button>
                      </div>
                    ))}
                  </div>
                )}

                {errors.images && (
                  <p className="text-sm text-destructive flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.images}
                  </p>
                )}

                <div className="flex justify-between">
                  <Button variant="outline" onClick={handlePrevious}>
                    Kembali
                  </Button>
                  <Button onClick={handleNext} className="gradient-mimizo text-white">
                    Lanjutkan
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 4: Additional Information */}
          {currentStep === 4 && (
            <Card className="glass-effect border-border/50">
              <CardHeader>
                <CardTitle>Langkah 4: Informasi Tambahan</CardTitle>
                <CardDescription>Fitur dan syarat penjualan</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label className="text-base font-semibold mb-4 block">Fitur Unggulan</Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {(formData.type === 'game' ? gameFeatures : socialFeatures).map((feature) => (
                      <div key={feature} className="flex items-center space-x-2">
                        <Checkbox
                          id={feature}
                          checked={formData.features.includes(feature)}
                          onCheckedChange={() => handleFeatureToggle(feature)}
                        />
                        <Label htmlFor={feature} className="text-sm cursor-pointer">
                          {feature}
                        </Label>
                      </div>
                    ))}
                  </div>
                  {errors.features && (
                    <p className="text-sm text-destructive flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.features}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="terms"
                      checked={formData.terms}
                      onCheckedChange={(checked) => handleInputChange('terms', checked)}
                    />
                    <Label htmlFor="terms" className="text-sm">
                      Saya menyetujui{' '}
                      <Link href="/terms" className="text-primary hover:underline">
                        Syarat & Ketentuan
                      </Link>{' '}
                      dan{' '}
                      <Link href="/privacy" className="text-primary hover:underline">
                        Kebijakan Privasi
                      </Link>
                    </Label>
                  </div>
                  {errors.terms && (
                    <p className="text-sm text-destructive flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.terms}
                    </p>
                  )}
                </div>

                <div className="bg-muted/50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2 flex items-center">
                    <Shield className="w-5 h-5 mr-2 text-green-500" />
                    Keamanan Transaksi
                  </h4>
                  <div className="grid grid-cols-1 gap-2 text-sm">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>Escrow System - Pembayaran aman</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>Verifikasi akun sebelum transaksi</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>Garansi 7 hari penggantian akun</span>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between">
                  <Button variant="outline" onClick={handlePrevious}>
                    Kembali
                  </Button>
                  <Button 
                    onClick={handleSubmit} 
                    className="gradient-mimizo text-white"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Mengupload...' : 'Upload Akun'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}

// Import missing icons
import { Sun, Moon } from 'lucide-react'