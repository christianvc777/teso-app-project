import { Activity, TrendingUp, Users, Calendar, Star, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MobileCard, MobileCardContent, MobileCardHeader, MobileCardTitle } from "@/components/ui/mobile-card";
import { Badge } from "@/components/ui/badge";

export default function Home() {
  const dailyStats = [
    { label: "Pasos", value: "8,234", target: "10,000", icon: Activity, color: "text-primary" },
    { label: "Calorías", value: "320", target: "500", icon: TrendingUp, color: "text-secondary" },
    { label: "Minutos Activos", value: "45", target: "60", icon: Calendar, color: "text-accent" },
  ];

  const quickActions = [
    { title: "Nuevo Reto", subtitle: "Únete a un desafío", path: "/challenges", variant: "glow" as const },
    { title: "Entrenar Ahora", subtitle: "Rutina personalizada", path: "/workouts", variant: "elevated" as const },
    { title: "Buscar Eventos", subtitle: "Actividades cerca", path: "/events", variant: "elevated" as const },
  ];

  const recentAchievements = [
    { title: "Primera Semana Completa", description: "¡7 días consecutivos!", date: "Ayer", type: "success" },
    { title: "Meta de Pasos", description: "10,000 pasos alcanzados", date: "Hace 2 días", type: "primary" },
    { title: "Nuevo PR", description: "Personal record en sentadillas", date: "Hace 3 días", type: "accent" },
  ];

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header con saludo */}
      <div className="bg-gradient-hero p-6 text-white">
        <div className="space-y-2">
          <h1 className="text-2xl font-bold">¡Hola, María! 👋</h1>
          <p className="text-primary-glow">Sigues haciendo un gran progreso</p>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Estadísticas Diarias */}
        <section>
          <h2 className="text-xl font-bold mb-4">Progreso de Hoy</h2>
          <div className="grid grid-cols-1 gap-4">
            {dailyStats.map((stat, index) => (
              <MobileCard key={index} variant="elevated">
                <MobileCardContent className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <stat.icon className={`h-8 w-8 ${stat.color}`} />
                    <div>
                      <h3 className="font-semibold">{stat.label}</h3>
                      <p className="text-sm text-muted-foreground">{stat.value} / {stat.target}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="w-16 bg-muted rounded-full h-2">
                      <div 
                        className="h-2 bg-primary rounded-full transition-all duration-500"
                        style={{ width: `${(parseInt(stat.value.replace(',', '')) / parseInt(stat.target.replace(',', ''))) * 100}%` }}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {Math.round((parseInt(stat.value.replace(',', '')) / parseInt(stat.target.replace(',', ''))) * 100)}%
                    </p>
                  </div>
                </MobileCardContent>
              </MobileCard>
            ))}
          </div>
        </section>

        {/* Acciones Rápidas */}
        <section>
          <h2 className="text-xl font-bold mb-4">Acciones Rápidas</h2>
          <div className="grid grid-cols-1 gap-4">
            {quickActions.map((action, index) => (
              <MobileCard key={index} variant={action.variant}>
                <MobileCardContent className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold">{action.title}</h3>
                    <p className="text-sm opacity-80">{action.subtitle}</p>
                  </div>
                  <ArrowRight className="h-5 w-5" />
                </MobileCardContent>
              </MobileCard>
            ))}
          </div>
        </section>

        {/* Logros Recientes */}
        <section>
          <h2 className="text-xl font-bold mb-4">Logros Recientes</h2>
          <div className="space-y-3">
            {recentAchievements.map((achievement, index) => (
              <MobileCard key={index}>
                <MobileCardContent className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    <Star className="h-6 w-6 text-warning" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold truncate">{achievement.title}</h3>
                      <Badge variant="secondary" className="text-xs">
                        {achievement.date}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{achievement.description}</p>
                  </div>
                </MobileCardContent>
              </MobileCard>
            ))}
          </div>
        </section>

        {/* Actividad de la Comunidad */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">Comunidad Activa</h2>
            <Button variant="ghost" size="sm">
              Ver todo <ArrowRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
          <MobileCard variant="elevated">
            <MobileCardContent>
              <div className="flex items-center space-x-3 mb-4">
                <Users className="h-6 w-6 text-primary" />
                <div>
                  <h3 className="font-semibold">1,247 usuarios activos</h3>
                  <p className="text-sm text-muted-foreground">Entrenando ahora mismo</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <p className="text-2xl font-bold text-primary">532</p>
                  <p className="text-xs text-muted-foreground">Retos completados hoy</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-secondary">89</p>
                  <p className="text-xs text-muted-foreground">Eventos próximos</p>
                </div>
              </div>
            </MobileCardContent>
          </MobileCard>
        </section>
      </div>
    </div>
  );
}