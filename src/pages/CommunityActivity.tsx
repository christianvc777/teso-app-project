import { ArrowLeft, Users, TrendingUp, Activity, Star, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { MobileCard, MobileCardContent, MobileCardHeader, MobileCardTitle } from "@/components/ui/mobile-card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useNavigate } from "react-router-dom"

export default function CommunityActivity() {
  const navigate = useNavigate()

  const topUsers = [
    { name: "Carlos Mendoza", handle: "@carlos_fit", points: 2847, rank: 1, avatar: "" },
    { name: "Ana Rodríguez", handle: "@ana_wellness", points: 2654, rank: 2, avatar: "" },
    { name: "Miguel Torres", handle: "@miguel_strength", points: 2441, rank: 3, avatar: "" },
    { name: "Sofia López", handle: "@sofia_run", points: 2198, rank: 4, avatar: "" },
    { name: "Diego Castro", handle: "@diego_fitness", points: 2087, rank: 5, avatar: "" }
  ]

  const recentActivities = [
    {
      user: "Carlos M.",
      action: "completó el reto 'Cardio Intenso'",
      points: 250,
      time: "Hace 2 min",
      type: "challenge"
    },
    {
      user: "Ana R.",
      action: "se unió al evento 'Yoga Matutino'",
      points: 50,
      time: "Hace 5 min",
      type: "event"
    },
    {
      user: "Miguel T.",
      action: "logró nuevo PR en deadlift: 180kg",
      points: 300,
      time: "Hace 8 min",
      type: "achievement"
    },
    {
      user: "Sofia L.",
      action: "publicó tips de nutrición",
      points: 75,
      time: "Hace 12 min",
      type: "post"
    },
    {
      user: "Diego C.",
      action: "completó 10,000 pasos",
      points: 100,
      time: "Hace 15 min",
      type: "goal"
    }
  ]

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'challenge': return '🏆'
      case 'event': return '📅'
      case 'achievement': return '💪'
      case 'post': return '📝'
      case 'goal': return '🎯'
      default: return '⭐'
    }
  }

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'challenge': return 'text-warning'
      case 'event': return 'text-primary'
      case 'achievement': return 'text-success'
      case 'post': return 'text-accent'
      case 'goal': return 'text-secondary'
      default: return 'text-muted-foreground'
    }
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="bg-gradient-primary p-4 text-white sticky top-0 z-40">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            className="text-white hover:bg-white/20 p-2"
            onClick={() => navigate('/')}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-xl font-bold">Comunidad Activa</h1>
            <p className="text-primary-glow text-sm">Actividad en tiempo real</p>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Estadísticas generales */}
        <MobileCard variant="elevated">
          <MobileCardHeader>
            <MobileCardTitle className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-primary" />
              <span>Estadísticas del Día</span>
            </MobileCardTitle>
          </MobileCardHeader>
          <MobileCardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">1,247</div>
                <div className="text-sm text-muted-foreground">Usuarios activos</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-success">532</div>
                <div className="text-sm text-muted-foreground">Retos completados</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-warning">89</div>
                <div className="text-sm text-muted-foreground">Eventos próximos</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-accent">15.2K</div>
                <div className="text-sm text-muted-foreground">Interacciones</div>
              </div>
            </div>
          </MobileCardContent>
        </MobileCard>

        {/* Ranking de usuarios */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">Top Usuarios</h2>
            <Badge variant="secondary" className="flex items-center space-x-1">
              <TrendingUp className="h-3 w-3" />
              <span>Semanal</span>
            </Badge>
          </div>
          <div className="space-y-3">
            {topUsers.map((user, index) => (
              <MobileCard key={index} variant="elevated">
                <MobileCardContent className="flex items-center space-x-3">
                  <div className="flex-shrink-0">
                    <Badge 
                      variant={index === 0 ? "default" : "secondary"}
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        index === 0 ? 'bg-warning text-warning-foreground' :
                        index === 1 ? 'bg-muted-foreground text-white' :
                        index === 2 ? 'bg-orange-500 text-white' : 'bg-muted text-muted-foreground'
                      }`}
                    >
                      #{user.rank}
                    </Badge>
                  </div>
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {user.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold truncate">{user.name}</h3>
                    <p className="text-sm text-muted-foreground">{user.handle}</p>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-primary">{user.points.toLocaleString()}</div>
                    <div className="text-xs text-muted-foreground">puntos</div>
                  </div>
                </MobileCardContent>
              </MobileCard>
            ))}
          </div>
        </section>

        {/* Actividad reciente */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">Actividad Reciente</h2>
            <Badge variant="outline" className="flex items-center space-x-1">
              <Activity className="h-3 w-3" />
              <span>En vivo</span>
            </Badge>
          </div>
          <div className="space-y-3">
            {recentActivities.map((activity, index) => (
              <MobileCard key={index}>
                <MobileCardContent className="flex items-start space-x-3">
                  <div className="flex-shrink-0 text-2xl">
                    {getActivityIcon(activity.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm">
                      <span className="font-medium">{activity.user}</span>
                      <span className="text-muted-foreground"> {activity.action}</span>
                    </p>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-xs text-muted-foreground">{activity.time}</span>
                      <Badge variant="secondary" className="text-xs">
                        +{activity.points} pts
                      </Badge>
                    </div>
                  </div>
                </MobileCardContent>
              </MobileCard>
            ))}
          </div>
        </section>

        {/* Datos adicionales */}
        <MobileCard variant="elevated">
          <MobileCardHeader>
            <MobileCardTitle>Métricas Globales</MobileCardTitle>
          </MobileCardHeader>
          <MobileCardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm">Pasos totales hoy:</span>
                <span className="font-bold">1.2M</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Calorías quemadas:</span>
                <span className="font-bold">45.2K</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Nuevos miembros:</span>
                <span className="font-bold">67</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Posts publicados:</span>
                <span className="font-bold">847</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Comentarios:</span>
                <span className="font-bold">2.1K</span>
              </div>
            </div>
          </MobileCardContent>
        </MobileCard>
      </div>
    </div>
  )
}