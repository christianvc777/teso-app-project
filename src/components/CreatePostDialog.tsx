import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Camera, X } from "lucide-react"

interface CreatePostDialogProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (post: any) => void
}

export function CreatePostDialog({ isOpen, onClose, onSubmit }: CreatePostDialogProps) {
  const [formData, setFormData] = useState({
    content: '',
    type: 'workout',
    productName: '',
    price: '',
    images: [] as string[]
  })

  const postTypes = [
    { value: 'achievement', label: 'Logro', emoji: '🏆' },
    { value: 'workout', label: 'Ejercicio', emoji: '💪' },
    { value: 'promotion', label: 'Promoción', emoji: '🔥' },
    { value: 'tip', label: 'Consejo', emoji: '💡' },
    { value: 'product', label: 'Producto', emoji: '🛍️' }
  ]

  const sampleImages = [
    'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400',
    'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=400',
    'https://images.unsplash.com/photo-1594737625785-a6cbdabd333c?w=400',
    'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=400',
    'https://images.unsplash.com/photo-1566241440091-ec10de8db2e1?w=400'
  ]

  const handleSubmit = () => {
    if (!formData.content.trim()) return

    const newPost = {
      id: Date.now(),
      user: { 
        name: "María González", 
        avatar: "", 
        handle: "@maria_fit", 
        verified: false 
      },
      timestamp: "Ahora",
      content: formData.content,
      type: formData.type,
      images: formData.images.length > 0 ? formData.images : [sampleImages[Math.floor(Math.random() * sampleImages.length)]],
      stats: { likes: 0, comments: 0, shares: 0 },
      ...(formData.type === 'product' && {
        productName: formData.productName,
        price: parseFloat(formData.price) || 0
      })
    }

    onSubmit(newPost)
    setFormData({ content: '', type: 'workout', productName: '', price: '', images: [] })
    onClose()
  }

  const addSampleImage = () => {
    const randomImage = sampleImages[Math.floor(Math.random() * sampleImages.length)]
    if (!formData.images.includes(randomImage)) {
      setFormData(prev => ({
        ...prev,
        images: [...prev.images, randomImage]
      }))
    }
  }

  const removeImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }))
  }

  const selectedType = postTypes.find(type => type.value === formData.type)

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-sm mx-auto max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-center">Crear Publicación</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="type">Tipo de publicación</Label>
            <Select value={formData.type} onValueChange={(value) => setFormData(prev => ({ ...prev, type: value }))}>
              <SelectTrigger>
                <SelectValue placeholder="Selecciona el tipo" />
              </SelectTrigger>
              <SelectContent>
                {postTypes.map(type => (
                  <SelectItem key={type.value} value={type.value}>
                    <span className="flex items-center space-x-2">
                      <span>{type.emoji}</span>
                      <span>{type.label}</span>
                    </span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {selectedType && (
              <Badge variant="secondary" className="w-fit">
                {selectedType.emoji} {selectedType.label}
              </Badge>
            )}
          </div>

          {formData.type === 'product' && (
            <>
              <div className="space-y-2">
                <Label htmlFor="productName">Nombre del producto</Label>
                <Input
                  id="productName"
                  placeholder="Ej: Proteína Whey 5lbs"
                  value={formData.productName}
                  onChange={(e) => setFormData(prev => ({ ...prev, productName: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="price">Precio (COP)</Label>
                <Input
                  id="price"
                  type="number"
                  placeholder="150000"
                  value={formData.price}
                  onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                />
              </div>
            </>
          )}

          <div className="space-y-2">
            <Label htmlFor="content">Contenido</Label>
            <Textarea
              id="content"
              placeholder="¿Qué quieres compartir con la comunidad?"
              value={formData.content}
              onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
              rows={4}
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>Imágenes</Label>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addSampleImage}
              >
                <Camera className="h-4 w-4 mr-1" />
                Agregar imagen
              </Button>
            </div>
            
            {formData.images.length > 0 && (
              <div className="grid grid-cols-2 gap-2">
                {formData.images.map((image, index) => (
                  <div key={index} className="relative">
                    <img 
                      src={image} 
                      alt={`Imagen ${index + 1}`}
                      className="w-full h-20 object-cover rounded-lg"
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      className="absolute -top-2 -right-2 h-6 w-6 p-0"
                      onClick={() => removeImage(index)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="flex gap-2">
          <Button variant="outline" onClick={onClose} className="flex-1">
            Cancelar
          </Button>
          <Button 
            onClick={handleSubmit} 
            disabled={!formData.content.trim()}
            className="flex-1"
          >
            Publicar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}