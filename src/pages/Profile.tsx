import { useState } from "react";
import { User, Settings, Trophy, Calendar, Activity, Heart, Target, Zap, Edit, Share, Crown, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MobileCard, MobileCardContent, MobileCardHeader, MobileCardTitle } from "@/components/ui/mobile-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

export default function Profile() {
  const [activeTab, setActiveTab] = useState<"stats" | "achievements" | "activity">("stats");

  const userProfile = {
    name: "María González",
    username: "@maria_fitness",
    email: "maria@example.com",
    joinDate: "Marzo 2024",
    location: "Bogotá, Colombia",
    bio: "Apasionada por el fitness y la vida saludable. Entrenadora personal certificada. 💪✨",
    avatar: "",
    isVerified: true,
    level: 15,
    xp: 2340,
    nextLevelXp: 2500,
    followers: 1247,
    following: 589,
    posts: 156
  };

  const stats = [
    { label: "Entrenamientos", value: "127", period: "Este año", icon: Activity, color: "text-primary" },
    { label: "Calorías quemadas", value: "45.2K", period: "Total", icon: Zap, color: "text-warning" },
    { label: "Días activos", value: "89", period: "Racha actual: 12", icon: Calendar, color: "text-success" },
    { label: "Tiempo total", value: "156h", period: "Este año", icon: Target, color: "text-accent" }
  ];

  const achievements = [
    { 
      id: 1, 
      title: "Maratonista", 
      description: "Completó su primera maratón", 
      date: "Hace 2 semanas", 
      rarity: "Épico",
      icon: "🏃‍♀️",
      progress: 100 
    },
    { 
      id: 2, 
      title: "Guerrero de Fuerza", 
      description: "50 entrenamientos de fuerza", 
      date: "Hace 1 mes", 
      rarity: "Raro",
      icon: "💪",
      progress: 100 
    },
    { 
      id: 3, 
      title: "Yoga Master", 
      description: "100 días de yoga consecutivos", 
      date: "En progreso", 
      rarity: "Legendario",
      icon: "🧘‍♀️",
      progress: 78 
    },
    { 
      id: 4, 
      title: "Hidratación Perfecta", 
      description: "30 días bebiendo 2.5L diarios", 
      date: "Hace 3 días", 
      rarity: "Común",
      icon: "💧",
      progress: 100 
    }
  ];

  const recentActivity = [
    { type: "workout", description: "Completó rutina HIIT de 45 min", time: "Hace 2 horas", icon: "🔥" },
    { type: "achievement", description: "Desbloqueó insignia 'Constancia'", time: "Ayer", icon: "🏆" },
    { type: "social", description: "Publicó progreso en el feed", time: "Hace 2 días", icon: "📸" },
    { type: "challenge", description: "Se unió al reto '30 días cardio'", time: "Hace 3 días", icon: "🎯" },
    { type: "workout", description: "Entrenamiento de fuerza - Espalda", time: "Hace 4 días", icon: "💪" }
  ];

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "Común": return "text-muted-foreground border-muted";
      case "Raro": return "text-primary border-primary";
      case "Épico": return "text-accent border-accent";
      case "Legendario": return "text-warning border-warning";
      default: return "text-muted-foreground border-muted";
    }
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header con perfil */}
      <div className="bg-gradient-hero p-6 text-white">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <Avatar className="h-20 w-20 border-4 border-white/20">
              <AvatarImage src={userProfile.avatar} alt={userProfile.name} />
              <AvatarFallback className="text-2xl bg-primary text-primary-foreground">
                {userProfile.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center space-x-2">
                <h1 className="text-xl font-bold">{userProfile.name}</h1>
                {userProfile.isVerified && (
                  <Badge className="bg-white/20 text-white border-white/30">
                    ✓ Verificado
                  </Badge>
                )}
              </div>
              <p className="text-primary-glow">{userProfile.username}</p>
              <div className="flex items-center space-x-2 mt-1">
                <Crown className="h-4 w-4 text-warning" />
                <span className="text-sm">Nivel {userProfile.level}</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col space-y-2">
            <Button size="sm" variant="secondary" className="bg-white/20 border-white/30 text-white hover:bg-white/30">
              <Edit className="h-4 w-4" />
            </Button>
            <Button size="sm" variant="secondary" className="bg-white/20 border-white/30 text-white hover:bg-white/30">
              <Share className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Progreso de nivel */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span>Progreso al siguiente nivel</span>
            <span>{userProfile.xp}/{userProfile.nextLevelXp} XP</span>
          </div>
          <Progress 
            value={(userProfile.xp / userProfile.nextLevelXp) * 100} 
            className="h-2 bg-white/20"
          />
        </div>

        {/* Stats sociales */}
        <div className="grid grid-cols-3 gap-4 mt-4 text-center">
          <div>
            <p className="text-2xl font-bold">{userProfile.posts}</p>
            <p className="text-xs text-primary-glow">Publicaciones</p>
          </div>
          <div>
            <p className="text-2xl font-bold">{userProfile.followers.toLocaleString()}</p>
            <p className="text-xs text-primary-glow">Seguidores</p>
          </div>
          <div>
            <p className="text-2xl font-bold">{userProfile.following}</p>
            <p className="text-xs text-primary-glow">Siguiendo</p>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Bio */}
        <MobileCard variant="elevated">
          <MobileCardContent>
            <p className="text-sm leading-relaxed">{userProfile.bio}</p>
            <div className="flex items-center justify-between mt-3 text-xs text-muted-foreground">
              <span>📍 {userProfile.location}</span>
              <span>📅 Miembro desde {userProfile.joinDate}</span>
            </div>
          </MobileCardContent>
        </MobileCard>

        {/* Tabs */}
        <div className="flex p-1 bg-muted rounded-lg">
          {[
            { key: "stats", label: "Estadísticas", icon: Activity },
            { key: "achievements", label: "Logros", icon: Trophy },
            { key: "activity", label: "Actividad", icon: Calendar }
          ].map((tab) => (
            <Button
              key={tab.key}
              variant={activeTab === tab.key ? "default" : "ghost"}
              size="sm"
              className={`flex-1 flex items-center justify-center space-x-2 ${
                activeTab === tab.key ? "bg-primary text-primary-foreground shadow-soft" : ""
              }`}
              onClick={() => setActiveTab(tab.key as typeof activeTab)}
            >
              <tab.icon className="h-4 w-4" />
              <span className="text-xs font-medium hidden sm:inline">{tab.label}</span>
            </Button>
          ))}
        </div>

        {/* Contenido por tab */}
        {activeTab === "stats" && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Estadísticas de Rendimiento</h2>
            <div className="grid grid-cols-1 gap-4">
              {stats.map((stat, index) => (
                <MobileCard key={index} variant="elevated">
                  <MobileCardContent className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <stat.icon className={`h-8 w-8 ${stat.color}`} />
                      <div>
                        <h3 className="font-semibold">{stat.label}</h3>
                        <p className="text-sm text-muted-foreground">{stat.period}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-primary">{stat.value}</p>
                    </div>
                  </MobileCardContent>
                </MobileCard>
              ))}
            </div>

            {/* Gráfico placeholder */}
            <MobileCard variant="elevated">
              <MobileCardHeader>
                <MobileCardTitle>Progreso Semanal</MobileCardTitle>
              </MobileCardHeader>
              <MobileCardContent>
                <div className="h-32 bg-gradient-card rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <Activity className="h-8 w-8 text-primary mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">Gráfico de actividad semanal</p>
                  </div>
                </div>
              </MobileCardContent>
            </MobileCard>
          </div>
        )}

        {activeTab === "achievements" && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Logros y Insignias</h2>
            <div className="space-y-3">
              {achievements.map((achievement) => (
                <MobileCard key={achievement.id} variant="elevated">
                  <MobileCardContent>
                    <div className="flex items-start space-x-3">
                      <div className="text-3xl">{achievement.icon}</div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className="font-semibold">{achievement.title}</h3>
                          <Badge 
                            variant="outline" 
                            className={`text-xs ${getRarityColor(achievement.rarity)}`}
                          >
                            {achievement.rarity}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                          {achievement.description}
                        </p>
                        {achievement.progress < 100 ? (
                          <div className="space-y-1">
                            <div className="flex justify-between text-xs">
                              <span>Progreso</span>
                              <span>{achievement.progress}%</span>
                            </div>
                            <Progress value={achievement.progress} className="h-1.5" />
                          </div>
                        ) : (
                          <div className="flex items-center justify-between">
                            <Badge className="bg-success text-success-foreground">
                              ✓ Completado
                            </Badge>
                            <span className="text-xs text-muted-foreground">
                              {achievement.date}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </MobileCardContent>
                </MobileCard>
              ))}
            </div>
          </div>
        )}

        {activeTab === "activity" && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Actividad Reciente</h2>
            <div className="space-y-3">
              {recentActivity.map((activity, index) => (
                <MobileCard key={index} variant="elevated">
                  <MobileCardContent>
                    <div className="flex items-center space-x-3">
                      <div className="text-xl">{activity.icon}</div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">
                          {activity.description}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {activity.time}
                        </p>
                      </div>
                    </div>
                  </MobileCardContent>
                </MobileCard>
              ))}
            </div>
          </div>
        )}

        {/* Acciones rápidas */}
        <MobileCard variant="elevated">
          <MobileCardHeader>
            <MobileCardTitle>Acciones Rápidas</MobileCardTitle>
          </MobileCardHeader>
          <MobileCardContent>
            <div className="grid grid-cols-2 gap-3">
              <Button variant="outline" className="flex items-center space-x-2">
                <Settings className="h-4 w-4" />
                <span>Configuración</span>
              </Button>
              <Button variant="outline" className="flex items-center space-x-2">
                <Heart className="h-4 w-4" />
                <span>Favoritos</span>
              </Button>
            </div>
          </MobileCardContent>
        </MobileCard>
      </div>
    </div>
  );
}