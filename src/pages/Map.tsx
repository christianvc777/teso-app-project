import { useState } from "react";
import { MapPin, Filter, Navigation, Star, Clock, Phone, Globe, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MobileCard, MobileCardContent, MobileCardHeader, MobileCardTitle } from "@/components/ui/mobile-card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

export default function Map() {
  const [activeFilter, setActiveFilter] = useState<"all" | "gyms" | "parks" | "studios" | "pools">("all");
  const [searchQuery, setSearchQuery] = useState("");

  const wellnessSpaces = [
    {
      id: 1,
      name: "FitLife Gym Centro",
      type: "Gimnasio",
      category: "gym",
      address: "Calle 72 #10-34",
      distance: "0.8 km",
      rating: 4.7,
      reviews: 245,
      phone: "+57 1 234-5678",
      website: "www.fitlife.com",
      hours: "05:00 - 23:00",
      price: "Desde $80.000/mes",
      amenities: ["Pesas", "Cardio", "Clases grupales", "Sauna"],
      image: null,
      isOpen: true,
      isFavorite: false
    },
    {
      id: 2,
      name: "Parque Simón Bolívar",
      type: "Parque",
      category: "park",
      address: "Calle 63 con Carrera 60",
      distance: "1.2 km",
      rating: 4.8,
      reviews: 1250,
      phone: "N/A",
      website: "N/A",
      hours: "24 horas",
      price: "Gratis",
      amenities: ["Senderos", "Ciclovía", "Campos deportivos", "Lago"],
      image: null,
      isOpen: true,
      isFavorite: true
    },
    {
      id: 3,
      name: "Yoga & Pilates Studio",
      type: "Estudio",
      category: "studio",
      address: "Carrera 15 #85-20",
      distance: "2.1 km",
      rating: 4.9,
      reviews: 156,
      phone: "+57 1 345-6789",
      website: "www.yogastudio.com",
      hours: "06:00 - 21:00",
      price: "Desde $120.000/mes",
      amenities: ["Yoga", "Pilates", "Meditación", "Reformer"],
      image: null,
      isOpen: true,
      isFavorite: false
    },
    {
      id: 4,
      name: "Aqua Center",
      type: "Piscina",
      category: "pool",
      address: "Avenida 68 #45-30",
      distance: "3.5 km",
      rating: 4.5,
      reviews: 89,
      phone: "+57 1 456-7890",
      website: "www.aquacenter.com",
      hours: "06:00 - 22:00",
      price: "Desde $60.000/mes",
      amenities: ["Piscina olímpica", "Aqua aeróbicos", "Jacuzzi", "Sauna"],
      image: null,
      isOpen: false,
      isFavorite: false
    },
    {
      id: 5,
      name: "CrossFit Elite Box",
      type: "Box CrossFit",
      category: "gym",
      address: "Calle 100 #15-25",
      distance: "4.2 km",
      rating: 4.6,
      reviews: 78,
      phone: "+57 1 567-8901",
      website: "www.crossfitelite.com",
      hours: "05:30 - 22:00",
      price: "Desde $150.000/mes",
      amenities: ["CrossFit", "Powerlifting", "Competencias", "Coaching"],
      image: null,
      isOpen: true,
      isFavorite: false
    },
    {
      id: 6,
      name: "Ciclovía de la 7ma",
      type: "Ciclovía",
      category: "park",
      address: "Carrera 7ma - Zona Rosa",
      distance: "0.5 km",
      rating: 4.4,
      reviews: 890,
      phone: "N/A",
      website: "N/A",
      hours: "Domingos 07:00 - 14:00",
      price: "Gratis",
      amenities: ["Ciclismo", "Running", "Caminata", "Food trucks"],
      image: null,
      isOpen: false,
      isFavorite: true
    }
  ];

  const filterOptions = [
    { key: "all", label: "Todos", icon: MapPin, count: wellnessSpaces.length },
    { key: "gyms", label: "Gimnasios", icon: "🏋️", count: wellnessSpaces.filter(s => s.category === "gym").length },
    { key: "parks", label: "Parques", icon: "🌳", count: wellnessSpaces.filter(s => s.category === "park").length },
    { key: "studios", label: "Estudios", icon: "🧘", count: wellnessSpaces.filter(s => s.category === "studio").length },
    { key: "pools", label: "Piscinas", icon: "🏊", count: wellnessSpaces.filter(s => s.category === "pool").length }
  ];

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Gimnasio":
      case "Box CrossFit":
        return "text-primary";
      case "Parque":
      case "Ciclovía":
        return "text-success";
      case "Estudio":
        return "text-accent";
      case "Piscina":
        return "text-secondary";
      default:
        return "text-muted-foreground";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "Gimnasio":
      case "Box CrossFit":
        return "🏋️";
      case "Parque":
      case "Ciclovía":
        return "🌳";
      case "Estudio":
        return "🧘";
      case "Piscina":
        return "🏊";
      default:
        return "📍";
    }
  };

  const filteredSpaces = wellnessSpaces.filter(space => {
    const matchesFilter = activeFilter === "all" || space.category === activeFilter.slice(0, -1);
    const matchesSearch = space.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      space.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      space.address.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesFilter && matchesSearch;
  });

  const toggleFavorite = (spaceId: number) => {
    // En una app real, esto se sincronizaría con el backend
    console.log(`Toggle favorite for space ${spaceId}`);
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="bg-gradient-primary p-4 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <MapPin className="h-8 w-8" />
            <div>
              <h1 className="text-xl font-bold">Mapa Wellness</h1>
              <p className="text-primary-glow text-sm">Espacios cerca de ti</p>
            </div>
          </div>
          <Button size="sm" variant="secondary" className="bg-white/20 border-white/30 text-white hover:bg-white/30">
            <Navigation className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Búsqueda */}
        <Input
          placeholder="Buscar gimnasios, parques, estudios..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full"
        />

        {/* Filtros */}
        <div className="flex space-x-2 overflow-x-auto pb-2">
          {filterOptions.map((filter) => (
            <Button
              key={filter.key}
              variant={activeFilter === filter.key ? "default" : "outline"}
              size="sm"
              className={`whitespace-nowrap flex items-center space-x-1 ${
                activeFilter === filter.key ? "bg-primary text-primary-foreground" : ""
              }`}
              onClick={() => setActiveFilter(filter.key as typeof activeFilter)}
            >
              <span>{typeof filter.icon === "string" ? filter.icon : <filter.icon className="h-4 w-4" />}</span>
              <span>{filter.label} ({filter.count})</span>
            </Button>
          ))}
        </div>

        {/* Mapa placeholder */}
        <MobileCard variant="elevated">
          <MobileCardContent className="h-48 flex items-center justify-center bg-gradient-card rounded-lg">
            <div className="text-center">
              <MapPin className="h-12 w-12 text-primary mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">Vista del mapa interactivo</p>
              <p className="text-xs text-muted-foreground mt-1">
                {filteredSpaces.length} ubicaciones encontradas
              </p>
            </div>
          </MobileCardContent>
        </MobileCard>

        {/* Estadísticas de ubicación */}
        <MobileCard variant="elevated">
          <MobileCardContent>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-lg font-bold text-primary">15</p>
                <p className="text-xs text-muted-foreground">Favoritos</p>
              </div>
              <div>
                <p className="text-lg font-bold text-secondary">0.8 km</p>
                <p className="text-xs text-muted-foreground">Más cercano</p>
              </div>
              <div>
                <p className="text-lg font-bold text-accent">12</p>
                <p className="text-xs text-muted-foreground">Visitados</p>
              </div>
            </div>
          </MobileCardContent>
        </MobileCard>

        {/* Lista de espacios */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Espacios Disponibles</h2>
          {filteredSpaces.map((space) => (
            <MobileCard key={space.id} variant="elevated">
              <MobileCardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3 flex-1">
                    <div className="text-2xl">
                      {getTypeIcon(space.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <MobileCardTitle className="text-base truncate">{space.name}</MobileCardTitle>
                      <div className="flex items-center space-x-2 mt-1">
                        <Badge variant="outline" className={getTypeColor(space.type)}>
                          {space.type}
                        </Badge>
                        <Badge variant={space.isOpen ? "default" : "secondary"} className="text-xs">
                          {space.isOpen ? "Abierto" : "Cerrado"}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0"
                    onClick={() => toggleFavorite(space.id)}
                  >
                    <Heart className={`h-4 w-4 ${space.isFavorite ? 'fill-current text-red-500' : 'text-muted-foreground'}`} />
                  </Button>
                </div>
              </MobileCardHeader>

              <MobileCardContent>
                <div className="space-y-3">
                  {/* Información básica */}
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span className="truncate">{space.address}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Navigation className="h-4 w-4 text-muted-foreground" />
                      <span>{space.distance}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="truncate">{space.hours}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Star className="h-4 w-4 text-warning fill-current" />
                      <span>{space.rating} ({space.reviews})</span>
                    </div>
                  </div>

                  {/* Precio */}
                  <div className="text-sm">
                    <span className="font-semibold text-primary">{space.price}</span>
                  </div>

                  {/* Amenidades */}
                  <div className="flex flex-wrap gap-1">
                    {space.amenities.slice(0, 4).map((amenity, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {amenity}
                      </Badge>
                    ))}
                    {space.amenities.length > 4 && (
                      <Badge variant="secondary" className="text-xs">
                        +{space.amenities.length - 4} más
                      </Badge>
                    )}
                  </div>

                  {/* Acciones */}
                  <div className="flex items-center justify-between pt-2 border-t border-border">
                    <div className="flex space-x-2">
                      {space.phone !== "N/A" && (
                        <Button variant="outline" size="sm" className="flex items-center space-x-1">
                          <Phone className="h-3 w-3" />
                          <span className="text-xs">Llamar</span>
                        </Button>
                      )}
                      {space.website !== "N/A" && (
                        <Button variant="outline" size="sm" className="flex items-center space-x-1">
                          <Globe className="h-3 w-3" />
                          <span className="text-xs">Web</span>
                        </Button>
                      )}
                    </div>
                    <Button size="sm" className="bg-primary">
                      <Navigation className="h-3 w-3 mr-1" />
                      Ir
                    </Button>
                  </div>
                </div>
              </MobileCardContent>
            </MobileCard>
          ))}
        </div>

        {filteredSpaces.length === 0 && (
          <div className="text-center py-8">
            <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No se encontraron espacios</p>
            <p className="text-sm text-muted-foreground mt-1">
              Intenta ajustar los filtros o búsqueda
            </p>
          </div>
        )}
      </div>
    </div>
  );
}