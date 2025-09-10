import { useState } from "react";
import { Heart, MessageCircle, Share, MoreHorizontal, Plus, Zap, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MobileCard, MobileCardContent, MobileCardHeader, MobileCardTitle } from "@/components/ui/mobile-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { CreatePostDialog } from "@/components/CreatePostDialog";

export default function Feed() {
  const [likedPosts, setLikedPosts] = useState<Set<number>>(new Set());
  const [showCreatePost, setShowCreatePost] = useState(false);

  const feedPosts = [
    {
      id: 1,
      user: { name: "Carlos Mendoza", avatar: "", handle: "@carlos_fit", verified: true },
      timestamp: "Hace 2 horas",
      content: "¡Completé mi primera maratón! 42.2km en 3:45:30. Un año de entrenamiento constante vale la pena. 💪🏃‍♂️",
      image: null,
      stats: { likes: 124, comments: 18, shares: 7 },
      type: "achievement"
    },
    {
      id: 2,
      user: { name: "Ana Rodríguez", avatar: "", handle: "@ana_wellness", verified: false },
      timestamp: "Hace 4 horas",
      content: "Rutina matutina de yoga completada ✨ 20 minutos de mindfulness para empezar el día con energía positiva.",
      image: null,
      stats: { likes: 89, comments: 12, shares: 4 },
      type: "workout"
    },
    {
      id: 3,
      user: { name: "FitGym Centro", avatar: "", handle: "@fitgym_centro", verified: true },
      timestamp: "Hace 6 horas",
      content: "🔥 Nuevo programa de HIIT disponible. Sesiones de 30 minutos, máxima intensidad. ¡Reserva tu cupo para esta semana!",
      image: null,
      stats: { likes: 67, comments: 25, shares: 15 },
      type: "promotion"
    },
    {
      id: 4,
      user: { name: "Miguel Torres", avatar: "", handle: "@miguel_strength", verified: false },
      timestamp: "Hace 8 horas",
      content: "Nuevo PR en deadlift: 180kg 🏋️‍♂️ La consistencia y la técnica correcta son clave. ¡Gracias a mi coach por la guía!",
      image: null,
      stats: { likes: 156, comments: 31, shares: 9 },
      type: "achievement"
    },
    {
      id: 5,
      user: { name: "Nutrición Pro", avatar: "", handle: "@nutricion_pro", verified: true },
      timestamp: "Hace 10 horas",
      content: "💡 Tip del día: La hidratación es fundamental para el rendimiento. 2-3 litros de agua diarios, más si entrenas intenso.",
      image: null,
      stats: { likes: 203, comments: 45, shares: 67 },
      type: "tip"
    }
  ];

  const [posts, setPosts] = useState(feedPosts);

  const handleLike = (postId: number) => {
    setLikedPosts(prev => {
      const newSet = new Set(prev);
      if (newSet.has(postId)) {
        newSet.delete(postId);
      } else {
        newSet.add(postId);
      }
      return newSet;
    });
  };

  const getPostTypeColor = (type: string) => {
    switch (type) {
      case "achievement": return "text-success";
      case "workout": return "text-primary";
      case "promotion": return "text-warning";
      case "tip": return "text-accent";
      default: return "text-muted-foreground";
    }
  };

  const getPostTypeIcon = (type: string) => {
    switch (type) {
      case "achievement": return "🏆";
      case "workout": return "💪";
      case "promotion": return "🔥";
      case "tip": return "💡";
      default: return "📝";
    }
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="bg-gradient-primary p-4 text-white sticky top-0 z-40">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold">Feed de la Comunidad</h1>
            <p className="text-primary-glow text-sm">Conecta, inspira y crece</p>
          </div>
          <Button 
            size="sm" 
            variant="secondary" 
            className="bg-white/20 border-white/30 text-white hover:bg-white/30"
            onClick={() => setShowCreatePost(true)}
          >
            <Plus className="h-4 w-4 mr-1" />
            Publicar
          </Button>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Estadísticas de la comunidad */}
        <MobileCard variant="elevated">
          <MobileCardContent>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="flex items-center justify-center mb-2">
                  <Users className="h-5 w-5 text-primary" />
                </div>
                <p className="text-lg font-bold">2.4K</p>
                <p className="text-xs text-muted-foreground">Miembros activos</p>
              </div>
              <div>
                <div className="flex items-center justify-center mb-2">
                  <Zap className="h-5 w-5 text-success" />
                </div>
                <p className="text-lg font-bold">847</p>
                <p className="text-xs text-muted-foreground">Posts hoy</p>
              </div>
              <div>
                <div className="flex items-center justify-center mb-2">
                  <Heart className="h-5 w-5 text-accent" />
                </div>
                <p className="text-lg font-bold">15.2K</p>
                <p className="text-xs text-muted-foreground">Interacciones</p>
              </div>
            </div>
          </MobileCardContent>
        </MobileCard>

        {/* Posts del feed */}
        {feedPosts.map((post) => (
          <MobileCard key={post.id} variant="elevated">
            <MobileCardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={post.user.avatar} alt={post.user.name} />
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {post.user.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2">
                      <h3 className="font-semibold text-sm truncate">{post.user.name}</h3>
                      {post.user.verified && (
                        <Badge variant="secondary" className="text-xs px-1.5 py-0.5">✓</Badge>
                      )}
                    </div>
                    <div className="flex items-center space-x-2">
                      <p className="text-xs text-muted-foreground">{post.user.handle}</p>
                      <span className="text-xs text-muted-foreground">•</span>
                      <p className="text-xs text-muted-foreground">{post.timestamp}</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-lg" title={post.type}>
                    {getPostTypeIcon(post.type)}
                  </span>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </MobileCardHeader>

            <MobileCardContent>
              <p className="text-sm mb-4 leading-relaxed">{post.content}</p>
              
              {/* Acciones del post */}
              <div className="flex items-center justify-between pt-3 border-t border-border">
                <div className="flex items-center space-x-6">
                  <Button
                    variant="ghost"
                    size="sm"
                    className={`flex items-center space-x-1 h-8 ${
                      likedPosts.has(post.id) ? 'text-red-500' : 'text-muted-foreground'
                    }`}
                    onClick={() => handleLike(post.id)}
                  >
                    <Heart className={`h-4 w-4 ${likedPosts.has(post.id) ? 'fill-current' : ''}`} />
                    <span className="text-xs">
                      {likedPosts.has(post.id) ? post.stats.likes + 1 : post.stats.likes}
                    </span>
                  </Button>
                  
                  <Button variant="ghost" size="sm" className="flex items-center space-x-1 h-8 text-muted-foreground">
                    <MessageCircle className="h-4 w-4" />
                    <span className="text-xs">{post.stats.comments}</span>
                  </Button>
                  
                  <Button variant="ghost" size="sm" className="flex items-center space-x-1 h-8 text-muted-foreground">
                    <Share className="h-4 w-4" />
                    <span className="text-xs">{post.stats.shares}</span>
                  </Button>
                </div>
              </div>
            </MobileCardContent>
          </MobileCard>
        ))}

        {/* Mensaje de carga */}
        <div className="text-center py-8">
          <p className="text-muted-foreground">¡Estás al día! 🎉</p>
          <p className="text-sm text-muted-foreground mt-1">No hay más publicaciones nuevas</p>
        </div>

        {/* Create Post Dialog */}
        <CreatePostDialog
          isOpen={showCreatePost}
          onClose={() => setShowCreatePost(false)}
          onSubmit={(newPost) => setPosts(prev => [newPost, ...prev])}
        />
      </div>
    </div>
  );
}