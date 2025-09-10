import { useState } from "react";
import { Trophy, Users, Clock, Target, Star, Play, CheckCircle, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MobileCard, MobileCardContent, MobileCardHeader, MobileCardTitle, MobileCardDescription } from "@/components/ui/mobile-card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { DetailDialog } from "@/components/ui/detail-dialog";

export default function Challenges() {
  const [joinedChallenges, setJoinedChallenges] = useState<Set<number>>(new Set([2])); // User already joined challenge 2
  const [dialogData, setDialogData] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<"trending" | "myProgress" | "completed">("trending");

  const trendingChallenges = [
    {
      id: 1,
      title: "30 Días de Cardio",
      description: "Completa 30 minutos de cardio durante 30 días consecutivos",
      participants: 1547,
      duration: "30 días",
      difficulty: "Intermedio",
      reward: "Medalla de Resistencia",
      category: "Cardio",
      progress: 0,
      isJoined: false,
      completionRate: 73
    },
    {
      id: 2,
      title: "Desafío 10K Pasos",
      description: "Camina 10,000 pasos diarios por 2 semanas",
      participants: 3241,
      duration: "14 días",
      difficulty: "Principiante",
      reward: "Insignia Caminante",
      category: "Actividad",
      progress: 0,
      isJoined: false,
      completionRate: 85
    },
    {
      id: 3,
      title: "Fuerza Total",
      description: "Rutina de fuerza 4 veces por semana durante 6 semanas",
      participants: 892,
      duration: "6 semanas",
      difficulty: "Avanzado",
      reward: "Trofeo de Fuerza",
      category: "Fuerza",
      progress: 0,
      isJoined: false,
      completionRate: 67
    }
  ];

  const myProgressChallenges = [
    {
      id: 4,
      title: "Rutina Matutina",
      description: "Ejercítate cada mañana por 21 días",
      participants: 2156,
      duration: "21 días",
      difficulty: "Intermedio",
      reward: "Insignia Madrugador",
      category: "Hábitos",
      progress: 75,
      isJoined: true,
      daysCompleted: 16,
      totalDays: 21,
      streak: 5
    },
    {
      id: 5,
      title: "Hidratación Diaria",
      description: "Bebe 2.5L de agua diariamente por 30 días",
      participants: 4523,
      duration: "30 días",
      difficulty: "Principiante",
      reward: "Medalla Hidratación",
      category: "Bienestar",
      progress: 60,
      isJoined: true,
      daysCompleted: 18,
      totalDays: 30,
      streak: 3
    }
  ];

  const completedChallenges = [
    {
      id: 6,
      title: "Primera Semana Activa",
      description: "Ejercítate 7 días consecutivos",
      participants: 8745,
      duration: "7 días",
      difficulty: "Principiante",
      reward: "Medalla Compromiso",
      category: "Introducción",
      progress: 100,
      isJoined: true,
      completedDate: "Hace 5 días",
      challengeName: "Primera Semana Activa",
      score: 95,
      rank: 8
    },
    {
      id: 7,
      title: "Cardio Intenso 21 Días",
      description: "Ejercicio cardiovascular diario",
      participants: 2156,
      duration: "21 días", 
      difficulty: "Intermedio",
      reward: "Trofeo de Resistencia",
      category: "Cardio",
      progress: 100,
      isJoined: true,
      completedDate: "Hace 12 días",
      challengeName: "Cardio Intenso 21 Días",
      score: 88,
      rank: 15
    },
    {
      id: 8,
      title: "Flexibilidad Total",
      description: "Rutinas de stretching y yoga",
      participants: 1547,
      duration: "14 días",
      difficulty: "Principiante", 
      reward: "Insignia Flexibilidad",
      category: "Bienestar",
      progress: 100,
      isJoined: true,
      completedDate: "Hace 20 días",
      challengeName: "Flexibilidad Total",
      score: 92,
      rank: 12
    },
    {
      id: 9,
      title: "Nutrición Saludable",
      description: "Hábitos alimenticios por 30 días",
      participants: 3241,
      duration: "30 días",
      difficulty: "Intermedio",
      reward: "Medalla Nutrición",
      category: "Nutrición",
      progress: 100,
      isJoined: true,
      completedDate: "Hace 35 días",
      challengeName: "Nutrición Saludable",
      score: 97,
      rank: 5
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Principiante": return "text-success";
      case "Intermedio": return "text-warning";
      case "Avanzado": return "text-destructive";
      default: return "text-muted-foreground";
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Cardio": return "❤️";
      case "Fuerza": return "💪";
      case "Actividad": return "🚶‍♂️";
      case "Hábitos": return "🌅";
      case "Bienestar": return "💧";
      case "Introducción": return "🌟";
      default: return "🎯";
    }
  };

  const handleJoinToggle = (challengeId: number) => {
    setJoinedChallenges(prev => {
      const newSet = new Set(prev);
      if (newSet.has(challengeId)) {
        newSet.delete(challengeId);
      } else {
        newSet.add(challengeId);
      }
      return newSet;
    });
  };

  const handleViewDetails = (challenge: any) => {
    setDialogData({
      title: challenge.title,
      type: 'challenge',
      data: {
        ...challenge,
        emoji: challenge.category === 'Cardio' ? '🏃' : 
              challenge.category === 'Fuerza' ? '💪' :
              challenge.category === 'Actividad' ? '🚶‍♂️' :
              challenge.category === 'Hábitos' ? '🌅' :
              challenge.category === 'Bienestar' ? '💧' : '🎯',
        fullDescription: `${challenge.description}. Este reto está diseñado para ayudarte a mejorar tu condición física y bienestar general.`,
        daysRemaining: challenge.totalDays - challenge.daysCompleted || 15,
        currentStreak: challenge.streak || 3,
        progress: challenge.progress
      },
      isOpen: true
    });
  };

  const handleViewCertificate = (challenge: any) => {
    setDialogData({
      title: "Certificado de Logro",
      type: 'certificate',
      data: {
        challengeName: challenge.challengeName || challenge.title,
        completedDate: challenge.completedDate,
        duration: challenge.duration,
        score: challenge.score || 95,
        rank: challenge.rank || 10
      },
      isOpen: true
    });
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="bg-gradient-accent p-4 text-white">
        <div className="flex items-center space-x-3">
          <Trophy className="h-8 w-8" />
          <div>
            <h1 className="text-xl font-bold">Retos y Desafíos</h1>
            <p className="text-accent-glow text-sm">Supérate cada día</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="sticky top-0 bg-background border-b border-border z-40">
        <div className="flex p-1 m-4 bg-muted rounded-lg">
          {[
            { key: "trending", label: "Populares", icon: Star },
            { key: "myProgress", label: "Mi Progreso", icon: Target },
            { key: "completed", label: "Completados", icon: CheckCircle }
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
              <span className="text-xs font-medium">{tab.label}</span>
            </Button>
          ))}
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Estadísticas generales */}
        <MobileCard variant="elevated">
          <MobileCardContent>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-xl font-bold text-primary">12</p>
                <p className="text-xs text-muted-foreground">Retos unidos</p>
              </div>
              <div>
                <p className="text-xl font-bold text-success">8</p>
                <p className="text-xs text-muted-foreground">Completados</p>
              </div>
              <div>
                <p className="text-xl font-bold text-accent">340</p>
                <p className="text-xs text-muted-foreground">Puntos ganados</p>
              </div>
            </div>
          </MobileCardContent>
        </MobileCard>

        {/* Contenido por tab */}
        {activeTab === "trending" && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Retos Populares</h2>
            {trendingChallenges.map((challenge) => (
              <MobileCard key={challenge.id} variant="elevated">
                <MobileCardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="text-2xl">
                        {getCategoryIcon(challenge.category)}
                      </div>
                      <div className="flex-1">
                        <MobileCardTitle className="text-base">{challenge.title}</MobileCardTitle>
                        <div className="flex items-center space-x-2 mt-1">
                          <Badge variant="outline" className={getDifficultyColor(challenge.difficulty)}>
                            {challenge.difficulty}
                          </Badge>
                          <Badge variant="secondary" className="text-xs">
                            {challenge.category}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                  <MobileCardDescription className="mt-2">
                    {challenge.description}
                  </MobileCardDescription>
                </MobileCardHeader>

                <MobileCardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center space-x-2">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span>{challenge.participants.toLocaleString()} participantes</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span>{challenge.duration}</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>Tasa de finalización</span>
                        <span className="font-medium">{challenge.completionRate}%</span>
                      </div>
                      <Progress value={challenge.completionRate} className="h-2" />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <Trophy className="h-4 w-4" />
                        <span>{challenge.reward}</span>
                      </div>
                      <Button 
                        size="sm" 
                        className={joinedChallenges.has(challenge.id) ? "bg-destructive hover:bg-destructive/90" : "bg-primary"}
                        onClick={() => handleJoinToggle(challenge.id)}
                      >
                        <Play className="h-4 w-4 mr-1" />
                        {joinedChallenges.has(challenge.id) ? "Abandonar" : "Unirse"}
                      </Button>
                    </div>
                  </div>
                </MobileCardContent>
              </MobileCard>
            ))}
          </div>
        )}

        {activeTab === "myProgress" && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Mi Progreso Actual</h2>
            {myProgressChallenges.map((challenge) => (
              <MobileCard key={challenge.id} variant="success">
                <MobileCardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="text-2xl">
                        {getCategoryIcon(challenge.category)}
                      </div>
                      <div className="flex-1">
                        <MobileCardTitle className="text-base">{challenge.title}</MobileCardTitle>
                        <div className="flex items-center space-x-2 mt-1">
                          <Badge variant="outline" className="text-success">
                            En progreso
                          </Badge>
                          <Badge variant="secondary" className="text-xs">
                            Racha: {challenge.streak} días
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                </MobileCardHeader>

                <MobileCardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>Progreso</span>
                        <span className="font-medium">
                          {challenge.daysCompleted}/{challenge.totalDays} días
                        </span>
                      </div>
                      <Progress value={challenge.progress} className="h-3" />
                      <p className="text-xs text-muted-foreground">
                        {challenge.progress}% completado
                      </p>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        <span>{challenge.totalDays - challenge.daysCompleted} días restantes</span>
                      </div>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleViewDetails(challenge)}
                      >
                        Ver detalles
                      </Button>
                    </div>
                  </div>
                </MobileCardContent>
              </MobileCard>
            ))}
          </div>
        )}

        {activeTab === "completed" && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Retos Completados</h2>
            {completedChallenges.map((challenge) => (
              <MobileCard key={challenge.id} variant="elevated">
                <MobileCardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="text-2xl">
                        {getCategoryIcon(challenge.category)}
                      </div>
                      <div className="flex-1">
                        <MobileCardTitle className="text-base">{challenge.title}</MobileCardTitle>
                        <div className="flex items-center space-x-2 mt-1">
                          <Badge className="bg-success text-success-foreground">
                            ✓ Completado
                          </Badge>
                          <Badge variant="secondary" className="text-xs">
                            {challenge.completedDate}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                </MobileCardHeader>

                <MobileCardContent>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <Trophy className="h-4 w-4 text-warning" />
                      <span>{challenge.reward}</span>
                    </div>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleViewCertificate(challenge)}
                    >
                      Ver certificado
                    </Button>
                  </div>
                </MobileCardContent>
              </MobileCard>
            ))}
          </div>
        )}

        {/* Detail Dialog */}
        {dialogData && (
          <DetailDialog
            isOpen={dialogData.isOpen}
            onClose={() => setDialogData(null)}
            title={dialogData.title}
            type={dialogData.type}
            data={dialogData.data}
          />
        )}
      </div>
    </div>
  );
}