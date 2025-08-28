import { useState } from "react";
import { Eye, EyeOff, Mail, Lock, User, Smartphone, Shield, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MobileCard, MobileCardContent, MobileCardHeader, MobileCardTitle, MobileCardDescription } from "@/components/ui/mobile-card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";

export default function Auth() {
  const [activeTab, setActiveTab] = useState<"login" | "register">("login");
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    fullName: "",
    acceptTerms: false,
    acceptPrivacy: false
  });

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const socialAuthOptions = [
    { name: "Google", icon: "🔍", color: "border-red-200 hover:bg-red-50" },
    { name: "Apple", icon: "🍎", color: "border-gray-200 hover:bg-gray-50" },
    { name: "Facebook", icon: "📘", color: "border-blue-200 hover:bg-blue-50" }
  ];

  const securityFeatures = [
    { icon: Shield, title: "Datos Encriptados", description: "Tu información está protegida con cifrado de extremo a extremo" },
    { icon: Lock, title: "Privacidad Garantizada", description: "Cumplimos con GDPR y normativas de protección de datos" },
    { icon: Smartphone, title: "Autenticación 2FA", description: "Verificación en dos pasos para mayor seguridad" }
  ];

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="bg-gradient-hero p-6 text-white text-center">
        <div className="space-y-2">
          <h1 className="text-2xl font-bold">Únete a la Comunidad</h1>
          <p className="text-primary-glow">Tu viaje hacia una vida más saludable comienza aquí</p>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Tabs */}
        <div className="flex p-1 bg-muted rounded-lg">
          <Button
            variant={activeTab === "login" ? "default" : "ghost"}
            size="sm"
            className={`flex-1 ${
              activeTab === "login" ? "bg-primary text-primary-foreground shadow-soft" : ""
            }`}
            onClick={() => setActiveTab("login")}
          >
            Iniciar Sesión
          </Button>
          <Button
            variant={activeTab === "register" ? "default" : "ghost"}
            size="sm"
            className={`flex-1 ${
              activeTab === "register" ? "bg-primary text-primary-foreground shadow-soft" : ""
            }`}
            onClick={() => setActiveTab("register")}
          >
            Registrarse
          </Button>
        </div>

        {/* Formularios */}
        <MobileCard variant="elevated">
          <MobileCardHeader>
            <MobileCardTitle>
              {activeTab === "login" ? "Bienvenido de nuevo" : "Crear cuenta nueva"}
            </MobileCardTitle>
            <MobileCardDescription>
              {activeTab === "login" 
                ? "Ingresa tus credenciales para continuar" 
                : "Completa la información para unirte a nosotros"
              }
            </MobileCardDescription>
          </MobileCardHeader>

          <MobileCardContent>
            <div className="space-y-4">
              {/* Campos del formulario */}
              {activeTab === "register" && (
                <div className="space-y-2">
                  <Label htmlFor="fullName" className="flex items-center space-x-2">
                    <User className="h-4 w-4" />
                    <span>Nombre completo</span>
                  </Label>
                  <Input
                    id="fullName"
                    placeholder="Ingresa tu nombre completo"
                    value={formData.fullName}
                    onChange={(e) => handleInputChange("fullName", e.target.value)}
                  />
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center space-x-2">
                  <Mail className="h-4 w-4" />
                  <span>Correo electrónico</span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="ejemplo@correo.com"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="flex items-center space-x-2">
                  <Lock className="h-4 w-4" />
                  <span>Contraseña</span>
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Contraseña segura"
                    value={formData.password}
                    onChange={(e) => handleInputChange("password", e.target.value)}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              {activeTab === "register" && (
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirmar contraseña</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="Repite tu contraseña"
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                  />
                </div>
              )}

              {/* Términos y condiciones para registro */}
              {activeTab === "register" && (
                <div className="space-y-3">
                  <div className="flex items-start space-x-2">
                    <Checkbox 
                      id="acceptTerms"
                      checked={formData.acceptTerms}
                      onCheckedChange={(checked) => handleInputChange("acceptTerms", checked)}
                    />
                    <Label htmlFor="acceptTerms" className="text-sm leading-relaxed">
                      Acepto los <span className="text-primary underline">términos y condiciones</span> del servicio
                    </Label>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Checkbox 
                      id="acceptPrivacy"
                      checked={formData.acceptPrivacy}
                      onCheckedChange={(checked) => handleInputChange("acceptPrivacy", checked)}
                    />
                    <Label htmlFor="acceptPrivacy" className="text-sm leading-relaxed">
                      Acepto la <span className="text-primary underline">política de privacidad</span> y el tratamiento de mis datos
                    </Label>
                  </div>
                </div>
              )}

              {/* Botón principal */}
              <Button className="w-full bg-primary text-primary-foreground" size="lg">
                {activeTab === "login" ? "Iniciar Sesión" : "Crear Cuenta"}
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>

              {/* Separador */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card px-2 text-muted-foreground">O continúa con</span>
                </div>
              </div>

              {/* Opciones de autenticación social */}
              <div className="grid grid-cols-3 gap-3">
                {socialAuthOptions.map((option) => (
                  <Button
                    key={option.name}
                    variant="outline"
                    className={`flex flex-col items-center p-4 h-auto ${option.color}`}
                  >
                    <span className="text-2xl mb-1">{option.icon}</span>
                    <span className="text-xs">{option.name}</span>
                  </Button>
                ))}
              </div>

              {/* Enlaces adicionales */}
              {activeTab === "login" && (
                <div className="text-center">
                  <Button variant="link" className="text-sm text-primary">
                    ¿Olvidaste tu contraseña?
                  </Button>
                </div>
              )}
            </div>
          </MobileCardContent>
        </MobileCard>

        {/* Características de seguridad */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-center">Seguridad y Privacidad</h2>
          <div className="space-y-3">
            {securityFeatures.map((feature, index) => (
              <MobileCard key={index} variant="elevated">
                <MobileCardContent className="flex items-start space-x-3">
                  <feature.icon className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-sm">{feature.title}</h3>
                    <p className="text-xs text-muted-foreground mt-1">{feature.description}</p>
                  </div>
                </MobileCardContent>
              </MobileCard>
            ))}
          </div>
        </div>

        {/* Estadísticas de la comunidad */}
        <MobileCard variant="glow">
          <MobileCardHeader>
            <MobileCardTitle className="text-center text-white">
              Únete a nuestra comunidad activa
            </MobileCardTitle>
          </MobileCardHeader>
          <MobileCardContent>
            <div className="grid grid-cols-3 gap-4 text-center text-white">
              <div>
                <p className="text-2xl font-bold">50K+</p>
                <p className="text-xs opacity-90">Miembros activos</p>
              </div>
              <div>
                <p className="text-2xl font-bold">1M+</p>
                <p className="text-xs opacity-90">Entrenamientos</p>
              </div>
              <div>
                <p className="text-2xl font-bold">95%</p>
                <p className="text-xs opacity-90">Satisfacción</p>
              </div>
            </div>
          </MobileCardContent>
        </MobileCard>

        {/* Nota sobre funcionalidad */}
        <MobileCard variant="warning">
          <MobileCardContent className="text-center">
            <h3 className="font-semibold mb-2">🚧 Funcionalidad en Desarrollo</h3>
            <p className="text-sm text-muted-foreground mb-3">
              Para habilitar el registro y autenticación completos, necesitas conectar tu proyecto a Supabase.
            </p>
            <Button variant="outline" size="sm">
              Configurar Supabase
            </Button>
          </MobileCardContent>
        </MobileCard>
      </div>
    </div>
  );
}