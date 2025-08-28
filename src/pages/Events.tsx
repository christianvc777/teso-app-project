import { useState } from "react";
import { Calendar, MapPin, Users, Clock, Star, Filter, Search, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MobileCard, MobileCardContent, MobileCardHeader, MobileCardTitle, MobileCardDescription } from "@/components/ui/mobile-card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

export default function Events() {
  const [activeFilter, setActiveFilter] = useState<"all" | "nearby" | "virtual" | "joined">("all");
  const [searchQuery, setSearchQuery] = useState("");

  const events = [
    {
      id: 1,
      title: "Yoga al Amanecer",
      description: "Sesión de yoga matutina en el parque con vista al lago",
      type: "Presencial",
      date: "Mañana",
      time: "06:30 AM",
      location: "Parque Simón Bolívar",
      distance: "2.3 km",
      attendees: 24,
      maxAttendees: 30,
      price: "Gratis",
      category: "Yoga",
      organizer: "Centro Wellness",
      rating: 4.8,
      isJoined: false
    },
    {
      id: 2,
      title: "Carrera 5K Solidaria",
      description: "Carrera benéfica para recaudar fondos para la fundación",
      type: "Presencial",
      date: "Sábado 15",
      time: "07:00 AM",
      location: "Plaza de Armas",
      distance: "5.7 km",
      attendees: 156,
      maxAttendees: 200,
      price: "$25.000",
      category: "Running",
      organizer: "Running Club Bogotá",
      rating: 4.9,
      isJoined: true
    },
    {
      id: 3,
      title: "Clase HIIT Virtual",
      description: "Entrenamiento de alta intensidad desde casa",
      type: "Virtual",
      date: "Hoy",
      time: "07:00 PM",
      location: "Zoom Meeting",
      distance: "Virtual",
      attendees: 89,
      maxAttendees: 100,
      price: "$15.000",
      category: "HIIT",
      organizer: "FitTrainer Pro",
      rating: 4.7,
      isJoined: false
    },
    {
      id: 4,
      title: "Taller de Nutrición",
      description: "Aprende a crear planes de alimentación balanceados",
      type: "Híbrido",
      date: "Domingo 16",
      time: "10:00 AM",
      location: "Centro Médico + Online",
      distance: "3.1 km",
      attendees: 45,
      maxAttendees: 50,
      price: "$50.000",
      category: "Nutrición",
      organizer: "Nutri Salud",
      rating: 4.6,
      isJoined: false
    },
    {
      id: 5,
      title: "Competencia CrossFit",
      description: "Torneo amateur de CrossFit con premios",
      type: "Presencial",
      date: "Viernes 21",
      time: "06:00 PM",
      location: "Box CrossFit Elite",
      distance: "8.2 km",
      attendees: 32,
      maxAttendees: 40,
      price: "$75.000",
      category: "CrossFit",
      organizer: "CrossFit Elite",
      rating: 4.8,
      isJoined: false
    }
  ];

  const filterOptions = [
    { key: "all", label: "Todos", count: events.length },
    { key: "nearby", label: "Cercanos", count: events.filter(e => parseFloat(e.distance.split(' ')[0]) < 5).length },
    { key: "virtual", label: "Virtuales", count: events.filter(e => e.type === "Virtual").length },
    { key: "joined", label: "Inscritos", count: events.filter(e => e.isJoined).length }
  ];

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Presencial": return "text-primary";
      case "Virtual": return "text-secondary";
      case "Híbrido": return "text-accent";
      default: return "text-muted-foreground";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "Presencial": return "📍";
      case "Virtual": return "💻";
      case "Híbrido": return "🔄";
      default: return "📅";
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Yoga": return "bg-accent/10 text-accent";
      case "Running": return "bg-primary/10 text-primary";
      case "HIIT": return "bg-destructive/10 text-destructive";
      case "Nutrición": return "bg-success/10 text-success";
      case "CrossFit": return "bg-warning/10 text-warning";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const filteredEvents = events.filter(event => {
    const matchesFilter = activeFilter === "all" || 
      (activeFilter === "nearby" && parseFloat(event.distance.split(' ')[0]) < 5) ||
      (activeFilter === "virtual" && event.type === "Virtual") ||
      (activeFilter === "joined" && event.isJoined);
    
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.location.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="bg-gradient-secondary p-4 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Calendar className="h-8 w-8" />
            <div>
              <h1 className="text-xl font-bold">Eventos y Actividades</h1>
              <p className="text-secondary-glow text-sm">Encuentra tu próxima aventura</p>
            </div>
          </div>
          <Button size="sm" variant="secondary" className="bg-white/20 border-white/30 text-white hover:bg-white/30">
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Búsqueda */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar eventos, ubicaciones, categorías..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Filtros */}
        <div className="flex space-x-2 overflow-x-auto pb-2">
          {filterOptions.map((filter) => (
            <Button
              key={filter.key}
              variant={activeFilter === filter.key ? "default" : "outline"}
              size="sm"
              className={`whitespace-nowrap ${
                activeFilter === filter.key ? "bg-primary text-primary-foreground" : ""
              }`}
              onClick={() => setActiveFilter(filter.key as typeof activeFilter)}
            >
              {filter.label} ({filter.count})
            </Button>
          ))}
        </div>

        {/* Estadísticas rápidas */}
        <MobileCard variant="elevated">
          <MobileCardContent>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-lg font-bold text-primary">12</p>
                <p className="text-xs text-muted-foreground">Eventos inscritos</p>
              </div>
              <div>
                <p className="text-lg font-bold text-secondary">5</p>
                <p className="text-xs text-muted-foreground">Esta semana</p>
              </div>
              <div>
                <p className="text-lg font-bold text-accent">3</p>
                <p className="text-xs text-muted-foreground">Completados</p>
              </div>
            </div>
          </MobileCardContent>
        </MobileCard>

        {/* Lista de eventos */}
        <div className="space-y-4">
          {filteredEvents.map((event) => (
            <MobileCard key={event.id} variant={event.isJoined ? "success" : "elevated"}>
              <MobileCardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="text-lg">{getTypeIcon(event.type)}</span>
                      <MobileCardTitle className="text-base">{event.title}</MobileCardTitle>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge className={getCategoryColor(event.category)}>
                        {event.category}
                      </Badge>
                      <Badge variant="outline" className={getTypeColor(event.type)}>
                        {event.type}
                      </Badge>
                      {event.isJoined && (
                        <Badge className="bg-success text-success-foreground">
                          ✓ Inscrito
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
                <MobileCardDescription className="mt-2">
                  {event.description}
                </MobileCardDescription>
              </MobileCardHeader>

              <MobileCardContent>
                <div className="space-y-3">
                  {/* Información básica */}
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span className="truncate">{event.location}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span>{event.attendees}/{event.maxAttendees}</span>
                    </div>
                  </div>

                  {/* Rating y distancia */}
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-2">
                      <Star className="h-4 w-4 text-warning fill-current" />
                      <span>{event.rating}</span>
                      <span className="text-muted-foreground">• {event.organizer}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-muted-foreground">
                      {event.distance !== "Virtual" && (
                        <>
                          <MapPin className="h-3 w-3" />
                          <span>{event.distance}</span>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Precio y acción */}
                  <div className="flex items-center justify-between pt-2 border-t border-border">
                    <div className="text-lg font-bold text-primary">
                      {event.price}
                    </div>
                    <Button 
                      size="sm" 
                      variant={event.isJoined ? "outline" : "default"}
                      className={event.isJoined ? "" : "bg-primary"}
                    >
                      {event.isJoined ? "Ver detalles" : "Inscribirse"}
                    </Button>
                  </div>
                </div>
              </MobileCardContent>
            </MobileCard>
          ))}
        </div>

        {filteredEvents.length === 0 && (
          <div className="text-center py-8">
            <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No se encontraron eventos</p>
            <p className="text-sm text-muted-foreground mt-1">
              Intenta ajustar los filtros o búsqueda
            </p>
          </div>
        )}
      </div>
    </div>
  );
}