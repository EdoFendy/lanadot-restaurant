"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Plus, Edit, Trash2, LogOut, Eye, Upload, X } from "lucide-react"

interface MenuImage {
  id: number
  image_path: string
  image_alt: string
  display_order: number
}

interface MenuItem {
  id: number
  title: string
  description: string
  price: number | null
  display_order: number
  is_available: boolean
  category_name: string
  category_id: number
  images: MenuImage[]
}

interface Category {
  id: number
  name: string
  display_order: number
}

export default function AdminMenuPage() {
  const [authenticated, setAuthenticated] = useState<boolean | null>(null)
  const [menuItems, setMenuItems] = useState<MenuItem[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  
  // Form state
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    category_id: "",
    is_available: true
  })
  const [selectedImages, setSelectedImages] = useState<File[]>([])
  
  const router = useRouter()

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    try {
      const response = await fetch('/api/admin/auth')
      const data = await response.json()
      setAuthenticated(data.authenticated)
      
      if (data.authenticated) {
        await fetchData()
      }
    } catch (err) {
      setAuthenticated(false)
    }
  }

  const fetchData = async () => {
    try {
      const [itemsResponse, categoriesResponse] = await Promise.all([
        fetch('/api/admin/menu-items'),
        fetch('/api/admin/categories')
      ])

      if (itemsResponse.ok && categoriesResponse.ok) {
        const itemsData = await itemsResponse.json()
        const categoriesData = await categoriesResponse.json()
        setMenuItems(itemsData)
        setCategories(categoriesData)
      }
    } catch (err) {
      setError('Errore nel caricamento dei dati')
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/auth', { method: 'DELETE' })
      router.push('/admin/login')
    } catch (err) {
      console.error('Logout error:', err)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess("")

    try {
      const method = editingItem ? 'PUT' : 'POST'
      const url = editingItem ? `/api/admin/menu-items/${editingItem.id}` : '/api/admin/menu-items'
      
      const formDataToSend = new FormData()
      formDataToSend.append('title', formData.title)
      formDataToSend.append('description', formData.description)
      formDataToSend.append('price', formData.price)
      formDataToSend.append('category_id', formData.category_id)
      formDataToSend.append('is_available', formData.is_available.toString())
      
      // Add images
      selectedImages.forEach((image, index) => {
        formDataToSend.append(`images`, image)
      })

      const response = await fetch(url, {
        method,
        body: formDataToSend
      })

      if (response.ok) {
        setSuccess(editingItem ? 'Piatto aggiornato con successo!' : 'Piatto aggiunto con successo!')
        setIsDialogOpen(false)
        resetForm()
        await fetchData()
      } else {
        const errorData = await response.json()
        setError(errorData.error || 'Errore durante il salvataggio')
      }
    } catch (err) {
      setError('Errore di connessione')
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Sei sicuro di voler eliminare questo piatto?')) return

    try {
      const response = await fetch(`/api/admin/menu-items/${id}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        setSuccess('Piatto eliminato con successo!')
        await fetchData()
      } else {
        setError('Errore durante l\'eliminazione')
      }
    } catch (err) {
      setError('Errore di connessione')
    }
  }

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      price: "",
      category_id: "",
      is_available: true
    })
    setSelectedImages([])
    setEditingItem(null)
  }

  const handleEdit = (item: MenuItem) => {
    setEditingItem(item)
    setFormData({
      title: item.title,
      description: item.description,
      price: item.price?.toString() || "",
      category_id: item.category_id.toString(),
      is_available: item.is_available
    })
    setIsDialogOpen(true)
  }

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedImages(Array.from(e.target.files))
    }
  }

  if (authenticated === null || loading) {
    return (
      <div className="min-h-screen bg-[#04241f] flex items-center justify-center">
        <div className="text-white text-xl">Caricamento...</div>
      </div>
    )
  }

  if (!authenticated) {
    router.push('/admin/login')
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#04241f] via-[#0c3930] to-[#04241f]">
      {/* Header */}
      <header className="bg-[#f5f1e8] border-b border-[#c6976c]/20 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-light text-[#04241f] font-georgia">
                Admin Panel - <span className="text-[#c6976c]">L'Anadot</span>
              </h1>
              <p className="text-[#0c3930]/70 text-sm">Gestione Menu del Ristorante</p>
            </div>
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                className="border-[#04241f] text-[#04241f] hover:bg-[#04241f] hover:text-white"
                onClick={() => window.open('/menu', '_blank')}
              >
                <Eye className="w-4 h-4 mr-2" />
                Visualizza Menu
              </Button>
              <Button
                variant="outline"
                className="border-red-600 text-red-600 hover:bg-red-600 hover:text-white"
                onClick={handleLogout}
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Alerts */}
        {error && (
          <Alert className="mb-6 bg-red-500/20 border-red-500/50">
            <AlertDescription className="text-red-200">{error}</AlertDescription>
          </Alert>
        )}
        
        {success && (
          <Alert className="mb-6 bg-green-500/20 border-green-500/50">
            <AlertDescription className="text-green-200">{success}</AlertDescription>
          </Alert>
        )}

        {/* Add New Item Button */}
        <div className="mb-8">
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button 
                className="bg-[#c6976c] hover:bg-[#f0c243] text-[#04241f] font-medium"
                onClick={resetForm}
              >
                <Plus className="w-4 h-4 mr-2" />
                Aggiungi Nuovo Piatto
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-white max-w-2xl max-h-[90vh] overflow-y-auto border-2 border-[#c6976c]/20">
              <DialogHeader>
                <DialogTitle className="text-[#04241f] font-georgia text-2xl">
                  {editingItem ? 'Modifica Piatto' : 'Aggiungi Nuovo Piatto'}
                </DialogTitle>
                <DialogDescription className="text-[#0c3930] font-medium">
                  Compila tutti i campi per aggiungere un nuovo piatto al menu.
                </DialogDescription>
              </DialogHeader>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-3">
                  <Label htmlFor="title" className="text-[#04241f] font-semibold text-base">Titolo</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    className="bg-white border-2 border-[#c6976c]/40 focus:border-[#c6976c] text-[#04241f] placeholder:text-[#0c3930]/60 font-medium"
                    placeholder="Es: Risotto ai Porcini"
                    required
                  />
                </div>

                <div className="space-y-3">
                  <Label htmlFor="description" className="text-[#04241f] font-semibold text-base">Descrizione</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    className="bg-white border-2 border-[#c6976c]/40 focus:border-[#c6976c] text-[#04241f] placeholder:text-[#0c3930]/60 font-medium min-h-[120px]"
                    placeholder="Descrivi il piatto, gli ingredienti principali, la preparazione..."
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <Label htmlFor="category" className="text-[#04241f] font-semibold text-base">Categoria</Label>
                    <Select value={formData.category_id} onValueChange={(value) => setFormData({...formData, category_id: value})}>
                      <SelectTrigger className="bg-white border-2 border-[#c6976c]/40 focus:border-[#c6976c] text-[#04241f] font-medium">
                        <SelectValue placeholder="Seleziona categoria" />
                      </SelectTrigger>
                      <SelectContent className="bg-white border-2 border-[#c6976c]/20">
                        {categories.map((category) => (
                          <SelectItem 
                            key={category.id} 
                            value={category.id.toString()}
                            className="text-[#04241f] hover:bg-[#c6976c]/10 focus:bg-[#c6976c]/20"
                          >
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="price" className="text-[#04241f] font-semibold text-base">Prezzo (€)</Label>
                    <Input
                      id="price"
                      type="number"
                      step="0.01"
                      min="0"
                      value={formData.price}
                      onChange={(e) => setFormData({...formData, price: e.target.value})}
                      className="bg-white border-2 border-[#c6976c]/40 focus:border-[#c6976c] text-[#04241f] placeholder:text-[#0c3930]/60 font-medium"
                      placeholder="0.00"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <Label htmlFor="images" className="text-[#04241f] font-semibold text-base">Immagini</Label>
                  <Input
                    id="images"
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageSelect}
                    className="bg-white border-2 border-[#c6976c]/40 focus:border-[#c6976c] text-[#04241f] file:bg-[#c6976c] file:text-white file:border-0 file:rounded-md file:px-4 file:py-2 file:mr-4 file:hover:bg-[#f0c243] file:transition-colors"
                  />
                  {selectedImages.length > 0 && (
                    <div className="text-sm text-[#0c3930] font-medium bg-[#c6976c]/10 p-3 rounded-lg">
                      ✅ {selectedImages.length} immagin{selectedImages.length === 1 ? 'e' : 'i'} selezionat{selectedImages.length === 1 ? 'a' : 'e'}
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between pt-6 border-t border-[#c6976c]/20">
                  <div className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      id="available"
                      checked={formData.is_available}
                      onChange={(e) => setFormData({...formData, is_available: e.target.checked})}
                      className="w-5 h-5 rounded border-2 border-[#c6976c] text-[#c6976c] focus:ring-[#c6976c] focus:ring-2"
                    />
                    <Label htmlFor="available" className="text-[#04241f] font-semibold text-base cursor-pointer">
                      Disponibile nel menu
                    </Label>
                  </div>
                  
                  <div className="flex gap-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setIsDialogOpen(false)}
                      className="border-2 border-[#0c3930] text-[#0c3930] hover:bg-[#0c3930] hover:text-white font-medium px-6 py-2"
                    >
                      Annulla
                    </Button>
                    <Button
                      type="submit"
                      className="bg-[#c6976c] hover:bg-[#f0c243] text-[#04241f] font-semibold px-8 py-2"
                    >
                      {editingItem ? 'Aggiorna Piatto' : 'Aggiungi Piatto'}
                    </Button>
                  </div>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Menu Items List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {menuItems.map((item) => (
            <Card key={item.id} className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 transition-all duration-300">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-white font-georgia text-lg">{item.title}</CardTitle>
                    <CardDescription className="text-[#f5f1e8]/70">
                      {item.category_name}
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    {item.price && (
                      <Badge variant="outline" className="border-[#c6976c] text-[#c6976c]">
                        €{item.price.toFixed(2)}
                      </Badge>
                    )}
                    <Badge variant={item.is_available ? "default" : "secondary"}>
                      {item.is_available ? "Disponibile" : "Non disponibile"}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {item.images && item.images.length > 0 && (
                  <div className="relative mb-4 overflow-hidden rounded-lg">
                    <Image
                      src={item.images[0].image_path}
                      alt={item.images[0].image_alt || item.title}
                      width={300}
                      height={200}
                      className="w-full h-40 object-cover"
                    />
                    {item.images.length > 1 && (
                      <Badge className="absolute top-2 right-2 bg-[#c6976c] text-white">
                        +{item.images.length - 1}
                      </Badge>
                    )}
                  </div>
                )}
                <p className="text-[#f5f1e8]/90 text-sm mb-4 line-clamp-3">
                  {item.description}
                </p>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-[#c6976c] text-[#c6976c] hover:bg-[#c6976c] hover:text-white"
                    onClick={() => handleEdit(item)}
                  >
                    <Edit className="w-3 h-3 mr-1" />
                    Modifica
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
                    onClick={() => handleDelete(item.id)}
                  >
                    <Trash2 className="w-3 h-3 mr-1" />
                    Elimina
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {menuItems.length === 0 && !loading && (
          <div className="text-center text-white py-12">
            <h3 className="text-xl font-light mb-4">Nessun piatto nel menu</h3>
            <p className="text-[#f5f1e8]/70">Inizia aggiungendo il primo piatto al tuo menu.</p>
          </div>
        )}
      </main>
    </div>
  )
} 