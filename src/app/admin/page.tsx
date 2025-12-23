'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { 
  ArrowLeft,
  Users,
  ShoppingBag,
  TrendingUp,
  DollarSign,
  Eye,
  Star,
  AlertCircle,
  CheckCircle,
  XCircle,
  Shield,
  Zap,
  Settings,
  LogOut,
  Package,
  MessageSquare,
  Crown,
  Instagram,
  Gamepad2,
  BarChart3,
  Filter,
  Search,
  Download,
  Trash2,
  Edit,
  Ban,
  UserCheck,
  Clock
} from 'lucide-react'
import { useTheme } from 'next-themes'

// Mock data
const mockStats = {
  totalUsers: 5847,
  activeUsers: 1234,
  totalProducts: 892,
  activeProducts: 456,
  totalTransactions: 3421,
  pendingTransactions: 89,
  completedTransactions: 3332,
  totalRevenue: 45678000,
  todayRevenue: 2340000,
  pendingReviews: 23,
  reportedUsers: 12
}

const mockUsers = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    role: 'buyer',
    status: 'active',
    joinedDate: '2024-01-15',
    lastActive: '2024-01-22',
    totalSpent: 2500000,
    totalTransactions: 12
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane@example.com',
    role: 'seller',
    status: 'active',
    joinedDate: '2024-01-10',
    lastActive: '2024-01-22',
    totalSold: 8500000,
    totalTransactions: 28
  },
  {
    id: 3,
    name: 'Bob Wilson',
    email: 'bob@example.com',
    role: 'buyer',
    status: 'suspended',
    joinedDate: '2024-01-05',
    lastActive: '2024-01-18',
    totalSpent: 1200000,
    totalTransactions: 6
  }
]

const mockProducts = [
  {
    id: 1,
    title: 'Instagram Pro Account 50K Followers',
    category: 'Instagram',
    type: 'social',
    price: 2500000,
    seller: 'ProSeller123',
    status: 'active',
    views: 1234,
    likes: 89,
    date: '2024-01-20'
  },
  {
    id: 2,
    title: 'Mobile Legends Mythic Glory',
    category: 'Mobile Legends',
    type: 'game',
    price: 850000,
    seller: 'GameMaster99',
    status: 'pending',
    views: 567,
    likes: 45,
    date: '2024-01-22'
  },
  {
    id: 3,
    title: 'TikTok Account 100K Followers',
    category: 'TikTok',
    type: 'social',
    price: 5000000,
    seller: 'TikTokExpert',
    status: 'reported',
    views: 2341,
    likes: 156,
    date: '2024-01-18'
  }
]

const mockTransactions = [
  {
    id: 1,
    product: 'Instagram Pro Account 50K',
    buyer: 'John Doe',
    seller: 'ProSeller123',
    amount: 2500000,
    status: 'completed',
    date: '2024-01-20',
    paymentMethod: 'Transfer Bank'
  },
  {
    id: 2,
    product: 'Mobile Legends Mythic',
    buyer: 'Jane Smith',
    seller: 'GameMaster99',
    amount: 850000,
    status: 'pending',
    date: '2024-01-22',
    paymentMethod: 'E-Wallet'
  },
  {
    id: 3,
    product: 'TikTok Account 100K',
    buyer: 'Bob Wilson',
    seller: 'TikTokExpert',
    amount: 5000000,
    status: 'disputed',
    date: '2024-01-21',
    paymentMethod: 'Credit Card'
  }
]

export default function AdminDashboard() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('overview')
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')

  useEffect(() => {
    setMounted(true)
    // Check if user is admin
    const isAdmin = localStorage.getItem('isAdmin')
    if (!isAdmin) {
      router.push('/')
    }
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem('isAdmin')
    router.push('/')
  }

  const filteredUsers = mockUsers.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const filteredProducts = mockProducts.filter(product => {
    const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.seller.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === 'all' || product.status === filterStatus
    return matchesSearch && matchesStatus
  })

  const filteredTransactions = mockTransactions.filter(transaction => 
    transaction.product.toLowerCase().includes(searchTerm.toLowerCase()) ||
    transaction.buyer.toLowerCase().includes(searchTerm.toLowerCase()) ||
    transaction.seller.toLowerCase().includes(searchTerm.toLowerCase())
  )

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
                <Badge className="bg-red-500 text-white ml-2">ADMIN</Badge>
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
              <Button variant="destructive" onClick={handleLogout}>
                <LogOut className="w-4 h-4 mr-2" />
                Keluar
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        {/* Admin Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-muted-foreground">
            Kelola seluruh aspek marketplace MIMIZO STORE
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="glass-effect border-border/50">
            <CardContent className="p-4 text-center">
              <Users className="w-8 h-8 mx-auto mb-2 text-primary" />
              <p className="text-2xl font-bold">{mockStats.totalUsers.toLocaleString('id-ID')}</p>
              <p className="text-sm text-muted-foreground">Total Users</p>
            </CardContent>
          </Card>
          <Card className="glass-effect border-border/50">
            <CardContent className="p-4 text-center">
              <ShoppingBag className="w-8 h-8 mx-auto mb-2 text-primary" />
              <p className="text-2xl font-bold">{mockStats.totalProducts.toLocaleString('id-ID')}</p>
              <p className="text-sm text-muted-foreground">Total Products</p>
            </CardContent>
          </Card>
          <Card className="glass-effect border-border/50">
            <CardContent className="p-4 text-center">
              <TrendingUp className="w-8 h-8 mx-auto mb-2 text-primary" />
              <p className="text-2xl font-bold">{mockStats.totalTransactions.toLocaleString('id-ID')}</p>
              <p className="text-sm text-muted-foreground">Total Transaksi</p>
            </CardContent>
          </Card>
          <Card className="glass-effect border-border/50">
            <CardContent className="p-4 text-center">
              <DollarSign className="w-8 h-8 mx-auto mb-2 text-green-500" />
              <p className="text-2xl font-bold">Rp {mockStats.totalRevenue.toLocaleString('id-ID')}</p>
              <p className="text-sm text-muted-foreground">Total Revenue</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Ringkasan</TabsTrigger>
            <TabsTrigger value="users">Pengguna</TabsTrigger>
            <TabsTrigger value="products">Produk</TabsTrigger>
            <TabsTrigger value="transactions">Transaksi</TabsTrigger>
            <TabsTrigger value="reports">Laporan</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="mt-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="glass-effect border-border/50">
                <CardHeader>
                  <CardTitle>Statistik Hari Ini</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span>User Aktif</span>
                      <span className="font-bold">{mockStats.activeUsers}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Produk Aktif</span>
                      <span className="font-bold">{mockStats.activeProducts}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Revenue Hari Ini</span>
                      <span className="font-bold text-green-500">Rp {mockStats.todayRevenue.toLocaleString('id-ID')}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Transaksi Pending</span>
                      <span className="font-bold text-yellow-500">{mockStats.pendingTransactions}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-effect border-border/50">
                <CardHeader>
                  <CardTitle>Alerts</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                      <AlertCircle className="w-5 h-5 text-yellow-500" />
                      <div>
                        <p className="font-medium">Review Pending: {mockStats.pendingReviews}</p>
                        <p className="text-sm text-muted-foreground">Perlu moderasi review produk</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                      <XCircle className="w-5 h-5 text-red-500" />
                      <div>
                        <p className="font-medium">User Reported: {mockStats.reportedUsers}</p>
                        <p className="text-sm text-muted-foreground">Perlu investigasi user</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="users" className="mt-6">
            <Card className="glass-effect border-border/50">
              <CardHeader>
                <CardTitle>Manajemen Pengguna</CardTitle>
                <CardDescription>Kelola semua pengguna terdaftar</CardDescription>
              </CardHeader>
              <CardContent>
                {/* Search and Filter */}
                <div className="flex gap-4 mb-6">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input
                      placeholder="Cari pengguna..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Select value={filterStatus} onValueChange={setFilterStatus}>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="Filter status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Semua Status</SelectItem>
                      <SelectItem value="active">Aktif</SelectItem>
                      <SelectItem value="suspended">Suspended</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Users Table */}
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border/50">
                        <th className="text-left p-3">Nama</th>
                        <th className="text-left p-3">Email</th>
                        <th className="text-left p-3">Role</th>
                        <th className="text-left p-3">Status</th>
                        <th className="text-left p-3">Total Transaksi</th>
                        <th className="text-left p-3">Total Pengeluaran</th>
                        <th className="text-left p-3">Aksi</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredUsers.map((user) => (
                        <tr key={user.id} className="border-b border-border/30">
                          <td className="p-3">
                            <div>
                              <p className="font-medium">{user.name}</p>
                              <p className="text-sm text-muted-foreground">Bergabung: {new Date(user.joinedDate).toLocaleDateString('id-ID')}</p>
                            </div>
                          </td>
                          <td className="p-3">{user.email}</td>
                          <td className="p-3">
                            <Badge variant={user.role === 'admin' ? 'default' : 'secondary'}>
                              {user.role === 'admin' ? 'Admin' : user.role === 'seller' ? 'Penjual' : 'Pembeli'}
                            </Badge>
                          </td>
                          <td className="p-3">
                            <Badge 
                              variant={user.status === 'active' ? 'default' : 'destructive'}
                            >
                              {user.status === 'active' ? 'Aktif' : 'Suspended'}
                            </Badge>
                          </td>
                          <td className="p-3">{user.totalTransactions}</td>
                          <td className="p-3">Rp {user.totalSpent.toLocaleString('id-ID')}</td>
                          <td className="p-3">
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm">
                                <Eye className="w-4 h-4" />
                              </Button>
                              {user.status === 'active' ? (
                                <Button variant="destructive" size="sm">
                                  <Ban className="w-4 h-4" />
                                </Button>
                              ) : (
                                <Button variant="default" size="sm">
                                  <UserCheck className="w-4 h-4" />
                                </Button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="products" className="mt-6">
            <Card className="glass-effect border-border/50">
              <CardHeader>
                <CardTitle>Manajemen Produk</CardTitle>
                <CardDescription>Kelola semua produk yang dijual</CardDescription>
              </CardHeader>
              <CardContent>
                {/* Search and Filter */}
                <div className="flex gap-4 mb-6">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input
                      placeholder="Cari produk..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Select value={filterStatus} onValueChange={setFilterStatus}>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="Filter status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Semua Status</SelectItem>
                      <SelectItem value="active">Aktif</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="reported">Reported</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Products Table */}
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border/50">
                        <th className="text-left p-3">Produk</th>
                        <th className="text-left p-3">Kategori</th>
                        <th className="text-left p-3">Penjual</th>
                        <th className="text-left p-3">Harga</th>
                        <th className="text-left p-3">Status</th>
                        <th className="text-left p-3">Views/Likes</th>
                        <th className="text-left p-3">Aksi</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredProducts.map((product) => (
                        <tr key={product.id} className="border-b border-border/30">
                          <td className="p-3">
                            <div>
                              <p className="font-medium">{product.title}</p>
                              <p className="text-sm text-muted-foreground">{new Date(product.date).toLocaleDateString('id-ID')}</p>
                            </div>
                          </td>
                          <td className="p-3">
                            <Badge variant="secondary">{product.category}</Badge>
                          </td>
                          <td className="p-3">{product.seller}</td>
                          <td className="p-3">Rp {product.price.toLocaleString('id-ID')}</td>
                          <td className="p-3">
                            <Badge 
                              variant={
                                product.status === 'active' ? 'default' : 
                                product.status === 'pending' ? 'secondary' : 'destructive'
                              }
                            >
                              {product.status === 'active' ? 'Aktif' : 
                               product.status === 'pending' ? 'Pending' : 'Reported'}
                            </Badge>
                          </td>
                          <td className="p-3">
                            <div className="flex gap-2 text-sm">
                              <Eye className="w-4 h-4" />
                              {product.views}
                              <Star className="w-4 h-4" />
                              {product.likes}
                            </div>
                          </td>
                          <td className="p-3">
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm">
                                <Eye className="w-4 h-4" />
                              </Button>
                              <Button variant="outline" size="sm">
                                <Edit className="w-4 h-4" />
                              </Button>
                              {product.status === 'reported' && (
                                <Button variant="destructive" size="sm">
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="transactions" className="mt-6">
            <Card className="glass-effect border-border/50">
              <CardHeader>
                <CardTitle>Manajemen Transaksi</CardTitle>
                <CardDescription>Monitor semua transaksi yang terjadi</CardDescription>
              </CardHeader>
              <CardContent>
                {/* Search */}
                <div className="relative mb-6">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="Cari transaksi..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>

                {/* Transactions Table */}
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border/50">
                        <th className="text-left p-3">Produk</th>
                        <th className="text-left p-3">Pembeli</th>
                        <th className="text-left p-3">Penjual</th>
                        <th className="text-left p-3">Jumlah</th>
                        <th className="text-left p-3">Status</th>
                        <th className="text-left p-3">Metode</th>
                        <th className="text-left p-3">Tanggal</th>
                        <th className="text-left p-3">Aksi</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredTransactions.map((transaction) => (
                        <tr key={transaction.id} className="border-b border-border/30">
                          <td className="p-3">
                            <p className="font-medium">{transaction.product}</p>
                          </td>
                          <td className="p-3">{transaction.buyer}</td>
                          <td className="p-3">{transaction.seller}</td>
                          <td className="p-3">Rp {transaction.amount.toLocaleString('id-ID')}</td>
                          <td className="p-3">
                            <Badge 
                              variant={
                                transaction.status === 'completed' ? 'default' : 
                                transaction.status === 'pending' ? 'secondary' : 'destructive'
                              }
                            >
                              {transaction.status === 'completed' ? 'Selesai' : 
                               transaction.status === 'pending' ? 'Pending' : 'Disputed'}
                            </Badge>
                          </td>
                          <td className="p-3">{transaction.paymentMethod}</td>
                          <td className="p-3">{new Date(transaction.date).toLocaleDateString('id-ID')}</td>
                          <td className="p-3">
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm">
                                <Eye className="w-4 h-4" />
                              </Button>
                              {transaction.status === 'disputed' && (
                                <Button variant="default" size="sm">
                                  <MessageSquare className="w-4 h-4" />
                                </Button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="reports" className="mt-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="glass-effect border-border/50">
                <CardHeader>
                  <CardTitle>Export Data</CardTitle>
                  <CardDescription>Download data dalam format CSV</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button className="w-full justify-start">
                    <Download className="w-4 h-4 mr-2" />
                    Export Users
                  </Button>
                  <Button className="w-full justify-start">
                    <Download className="w-4 h-4 mr-2" />
                    Export Products
                  </Button>
                  <Button className="w-full justify-start">
                    <Download className="w-4 h-4 mr-2" />
                    Export Transactions
                  </Button>
                  <Button className="w-full justify-start">
                    <Download className="w-4 h-4 mr-2" />
                    Export Revenue Report
                  </Button>
                </CardContent>
              </Card>

              <Card className="glass-effect border-border/50">
                <CardHeader>
                  <CardTitle>System Settings</CardTitle>
                  <CardDescription>Pengaturan sistem dan konfigurasi</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button className="w-full justify-start">
                    <Settings className="w-4 h-4 mr-2" />
                    General Settings
                  </Button>
                  <Button className="w-full justify-start">
                    <Shield className="w-4 h-4 mr-2" />
                    Security Settings
                  </Button>
                  <Button className="w-full justify-start">
                    <BarChart3 className="w-4 h-4 mr-2" />
                    Analytics Settings
                  </Button>
                  <Button className="w-full justify-start">
                    <Zap className="w-4 h-4 mr-2" />
                    Performance Settings
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