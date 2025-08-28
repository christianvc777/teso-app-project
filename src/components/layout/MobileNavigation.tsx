import { NavLink } from "react-router-dom";
import { Home, Users, Trophy, Calendar, MapPin, User, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";

const navItems = [
  { icon: Home, label: "Inicio", path: "/" },
  { icon: Users, label: "Feed", path: "/feed" },
  { icon: Trophy, label: "Retos", path: "/challenges" },
  { icon: Calendar, label: "Eventos", path: "/events" },
  { icon: MapPin, label: "Mapa", path: "/map" },
  { icon: User, label: "Perfil", path: "/profile" },
  { icon: LogIn, label: "Iniciar Sesión", path: "/auth" },
];

export function MobileNavigation() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card/80 backdrop-blur-lg border-t border-border z-50">
      <div className="flex items-center justify-around py-2 px-1">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex flex-col items-center p-2 rounded-lg transition-all duration-300 min-w-0 ${
                isActive
                  ? "bg-primary text-primary-foreground shadow-glow"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`
            }
          >
            <item.icon className="h-5 w-5 mb-1" />
            <span className="text-xs font-medium truncate">{item.label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
}