import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MobileCard, MobileCardContent } from "@/components/ui/mobile-card"

interface DetailDialogProps {
  isOpen: boolean
  onClose: () => void
  title: string
  type?: 'stat' | 'achievement' | 'challenge' | 'certificate' | 'community' | 'terms' | 'privacy'
  data?: any
}

export function DetailDialog({ isOpen, onClose, title, type = 'stat', data }: DetailDialogProps) {
  const renderContent = () => {
    switch (type) {
      case 'stat':
        return (
          <div className="space-y-4">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">{data?.value || '0'}</div>
              <div className="text-lg text-muted-foreground">{data?.target && `Meta: ${data.target}`}</div>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span>Progreso del día:</span>
                <span className="font-semibold">{data?.percentage || '0'}%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-3">
                <div 
                  className="h-3 bg-primary rounded-full transition-all duration-500"
                  style={{ width: `${data?.percentage || 0}%` }}
                />
              </div>
              <div className="text-sm text-muted-foreground">
                <p>• Cálculo basado en actividad detectada</p>
                <p>• Actualización automática cada hora</p>
                <p>• Promedio últimos 7 días: {data?.average || 'N/A'}</p>
              </div>
            </div>
          </div>
        )

      case 'achievement':
        return (
          <div className="space-y-4">
            <div className="text-center">
              <div className="text-6xl mb-4">🏆</div>
              <Badge className="text-lg px-4 py-2">{data?.type || 'Logro'}</Badge>
            </div>
            <div className="space-y-3">
              <p className="text-center text-lg font-semibold">{data?.description}</p>
              <div className="bg-muted rounded-lg p-4 space-y-2">
                <div className="flex justify-between">
                  <span>Fecha conseguido:</span>
                  <span className="font-semibold">{data?.date}</span>
                </div>
                <div className="flex justify-between">
                  <span>Puntos obtenidos:</span>
                  <span className="font-semibold text-primary">+{data?.points || 100} pts</span>
                </div>
                <div className="flex justify-between">
                  <span>Racha actual:</span>
                  <span className="font-semibold">{data?.streak || 7} días</span>
                </div>
              </div>
            </div>
          </div>
        )

      case 'challenge':
        return (
          <div className="space-y-4">
            <div className="text-center">
              <div className="text-4xl mb-4">{data?.emoji || '💪'}</div>
              <Badge variant="secondary">{data?.difficulty || 'Intermedio'}</Badge>
            </div>
            <div className="space-y-4">
              <p className="text-center font-medium">{data?.fullDescription}</p>
              <div className="bg-muted rounded-lg p-4 space-y-3">
                <div className="flex justify-between">
                  <span>Progreso:</span>
                  <span className="font-semibold">{data?.progress || 0}%</span>
                </div>
                <div className="w-full bg-background rounded-full h-2">
                  <div 
                    className="h-2 bg-primary rounded-full transition-all"
                    style={{ width: `${data?.progress || 0}%` }}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Días restantes:</span>
                    <div className="font-semibold">{data?.daysRemaining || 15}</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Racha actual:</span>
                    <div className="font-semibold">{data?.currentStreak || 3} días</div>
                  </div>
                </div>
              </div>
              <div className="text-sm text-muted-foreground">
                <p>• Recordatorio diario a las 8:00 AM</p>
                <p>• Comparte tu progreso con la comunidad</p>
                <p>• Gana puntos extra por racha</p>
              </div>
            </div>
          </div>
        )

      case 'certificate':
        return (
          <div className="space-y-4">
            <div className="bg-gradient-primary text-white p-6 rounded-lg text-center">
              <div className="text-4xl mb-4">🏆</div>
              <h3 className="text-xl font-bold mb-2">Certificado de Logro</h3>
              <p className="text-primary-glow">FitWell Community</p>
            </div>
            <div className="p-4 border border-primary/20 rounded-lg space-y-3">
              <div className="text-center">
                <p className="text-sm text-muted-foreground">Este certificado acredita que</p>
                <p className="text-lg font-bold">María González</p>
                <p className="text-sm text-muted-foreground">ha completado exitosamente</p>
                <p className="text-base font-semibold text-primary">{data?.challengeName}</p>
              </div>
              <div className="grid grid-cols-2 gap-4 text-xs border-t pt-3">
                <div>
                  <span className="text-muted-foreground">Fecha:</span>
                  <div className="font-semibold">{data?.completedDate}</div>
                </div>
                <div>
                  <span className="text-muted-foreground">Duración:</span>
                  <div className="font-semibold">{data?.duration} días</div>
                </div>
                <div>
                  <span className="text-muted-foreground">Puntuación:</span>
                  <div className="font-semibold">{data?.score || 95}/100</div>
                </div>
                <div>
                  <span className="text-muted-foreground">Ranking:</span>
                  <div className="font-semibold">Top {data?.rank || 5}%</div>
                </div>
              </div>
            </div>
            <Button className="w-full" variant="outline">
              Descargar Certificado
            </Button>
          </div>
        )

      case 'community':
        return (
          <div className="space-y-4">
            <div className="text-center">
              <div className="text-4xl mb-4">👥</div>
              <h3 className="text-xl font-bold">Comunidad Activa</h3>
              <p className="text-muted-foreground">Usuarios entrenando en tiempo real</p>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <MobileCard variant="elevated">
                  <MobileCardContent className="text-center p-4">
                    <div className="text-2xl font-bold text-primary">1,247</div>
                    <div className="text-sm text-muted-foreground">Activos ahora</div>
                  </MobileCardContent>
                </MobileCard>
                <MobileCard variant="elevated">
                  <MobileCardContent className="text-center p-4">
                    <div className="text-2xl font-bold text-success">89</div>
                    <div className="text-sm text-muted-foreground">Eventos hoy</div>
                  </MobileCardContent>
                </MobileCard>
              </div>
              
              <div className="space-y-3">
                <h4 className="font-semibold">Actividad Reciente</h4>
                {[
                  { name: "Carlos M.", action: "completó un reto de cardio", time: "Hace 2 min" },
                  { name: "Ana R.", action: "se unió a evento de yoga", time: "Hace 5 min" },
                  { name: "Miguel T.", action: "logró nuevo PR", time: "Hace 8 min" },
                  { name: "Sofia L.", action: "publicó en el feed", time: "Hace 12 min" }
                ].map((activity, index) => (
                  <div key={index} className="flex justify-between items-start text-sm">
                    <div className="flex-1">
                      <span className="font-medium">{activity.name}</span>
                      <span className="text-muted-foreground"> {activity.action}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">{activity.time}</span>
                  </div>
                ))}
              </div>

              <div className="bg-muted rounded-lg p-4">
                <h4 className="font-semibold mb-2">Estadísticas del Día</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="text-lg font-bold">532</div>
                    <div className="text-muted-foreground">Retos completados</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold">1.2M</div>
                    <div className="text-muted-foreground">Pasos totales</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold">45K</div>
                    <div className="text-muted-foreground">Calorías quemadas</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold">67</div>
                    <div className="text-muted-foreground">Nuevos miembros</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )

      case 'terms':
        return (
          <div className="space-y-4 max-h-96 overflow-y-auto">
            <h3 className="text-lg font-bold">Términos y Condiciones de Uso</h3>
            <div className="space-y-4 text-sm">
              <section>
                <h4 className="font-semibold mb-2">1. Aceptación de Términos</h4>
                <p className="text-muted-foreground">
                  Al acceder y utilizar FitWell, acepta estar sujeto a estos términos y condiciones de uso.
                </p>
              </section>
              
              <section>
                <h4 className="font-semibold mb-2">2. Uso de la Aplicación</h4>
                <p className="text-muted-foreground">
                  FitWell es una plataforma de fitness y bienestar. Se compromete a usar la aplicación únicamente para fines legales y de manera responsable.
                </p>
              </section>

              <section>
                <h4 className="font-semibold mb-2">3. Cuenta de Usuario</h4>
                <p className="text-muted-foreground">
                  Es responsable de mantener la confidencialidad de su cuenta y contraseña. Debe notificar inmediatamente cualquier uso no autorizado.
                </p>
              </section>

              <section>
                <h4 className="font-semibold mb-2">4. Contenido del Usuario</h4>
                <p className="text-muted-foreground">
                  El contenido que publique debe ser apropiado, veraz y no infringir derechos de terceros. Nos reservamos el derecho de moderar contenido.
                </p>
              </section>

              <section>
                <h4 className="font-semibold mb-2">5. Limitación de Responsabilidad</h4>
                <p className="text-muted-foreground">
                  FitWell no se hace responsable por lesiones o daños derivados del uso de la aplicación. Consulte a profesionales de la salud antes de iniciar cualquier programa de ejercicios.
                </p>
              </section>
            </div>
          </div>
        )

      case 'privacy':
        return (
          <div className="space-y-4 max-h-96 overflow-y-auto">
            <h3 className="text-lg font-bold">Política de Privacidad</h3>
            <div className="space-y-4 text-sm">
              <section>
                <h4 className="font-semibold mb-2">1. Información que Recopilamos</h4>
                <p className="text-muted-foreground">
                  Recopilamos información personal como nombre, email, datos de actividad física y preferencias de entrenamiento.
                </p>
              </section>
              
              <section>
                <h4 className="font-semibold mb-2">2. Uso de la Información</h4>
                <p className="text-muted-foreground">
                  Utilizamos su información para personalizar su experiencia, proporcionar recomendaciones y mejorar nuestros servicios.
                </p>
              </section>

              <section>
                <h4 className="font-semibold mb-2">3. Compartir Información</h4>
                <p className="text-muted-foreground">
                  No vendemos ni compartimos su información personal con terceros, excepto cuando sea necesario para proporcionar nuestros servicios.
                </p>
              </section>

              <section>
                <h4 className="font-semibold mb-2">4. Seguridad de Datos</h4>
                <p className="text-muted-foreground">
                  Implementamos medidas de seguridad técnicas y organizativas para proteger su información personal.
                </p>
              </section>

              <section>
                <h4 className="font-semibold mb-2">5. Sus Derechos</h4>
                <p className="text-muted-foreground">
                  Tiene derecho a acceder, corregir o eliminar su información personal. Puede ejercer estos derechos contactándonos.
                </p>
              </section>

              <section>
                <h4 className="font-semibold mb-2">6. Cookies</h4>
                <p className="text-muted-foreground">
                  Utilizamos cookies para mejorar su experiencia y analizar el uso de la aplicación.
                </p>
              </section>
            </div>
          </div>
        )

      default:
        return <div className="p-4">Información no disponible</div>
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-sm mx-auto">
        <DialogHeader>
          <DialogTitle className="text-center">{title}</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          {renderContent()}
        </div>
        <Button onClick={onClose} className="w-full">
          Cerrar
        </Button>
      </DialogContent>
    </Dialog>
  )
}