"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, Star, Heart, Camera, Smile, Sparkles, ChevronRight, Download, Edit3, Grid, User } from "lucide-react";
import Topbar from "@/components/layout/Topbar";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

interface Perfil {
  nombre: string;
  seccion: string;
  avatar: string;
  frase: string;
  logro: string;
  color: string;
  apodo: string;
  destino: string;
}

const perfiles: Perfil[] = [
  { nombre: "Ana García López", seccion: "A", avatar: "AG", frase: "El futuro pertenece a quienes creen en la belleza de sus sueños", logro: "Mejor Secretaria", color: "from-orange-600 to-amber-500", apodo: "La Organizadora", destino: "Medicina UNAH" },
  { nombre: "Carlos Mendoza Paz", seccion: "A", avatar: "CM", frase: "El éxito no llega solo, se trabaja con pasión cada día", logro: "MVP Deportivo", color: "from-blue-600 to-cyan-500", apodo: "El Goleador", destino: "Ingeniería Civil" },
  { nombre: "María López Soto", seccion: "B", avatar: "ML", frase: "La constancia es el secreto del triunfo", logro: "Mejor Promedio", color: "from-emerald-600 to-teal-500", apodo: "La Cerebrito", destino: "Química y Farmacia" },
  { nombre: "Luis Torres García", seccion: "B", avatar: "LT", frase: "Cada día es una nueva oportunidad de brillar", logro: "El Más Gracioso", color: "from-yellow-600 to-amber-500", apodo: "El Comediante", destino: "Comunicación Social" },
  { nombre: "Sofia Reyes Matute", seccion: "A", avatar: "SR", frase: "El arte es mi voz cuando las palabras no alcanzan", logro: "Mejor Actriz", color: "from-pink-600 to-rose-500", apodo: "La Artista", destino: "Bellas Artes" },
  { nombre: "Diego Alvarado Cruz", seccion: "C", avatar: "DA", frase: "La vida es corta, hazla memorable", logro: "Vocal de Deportes", color: "from-red-600 to-rose-500", apodo: "El Deportista", destino: "Educación Física" },
  { nombre: "Valentina Cruz López", seccion: "C", avatar: "VC", frase: "Liderar es servir, servir es grandeza", logro: "Presidenta de Clase", color: "from-violet-600 to-purple-500", apodo: "La Presidenta", destino: "Derecho y Ciencias Políticas" },
  { nombre: "Roberto Flores Paz", seccion: "B", avatar: "RF", frase: "En redes sociales, en la vida real y siempre conectado", logro: "Social Media Manager", color: "from-cyan-600 to-blue-500", apodo: "El Influencer", destino: "Marketing Digital" },
];

const plantillas = [
  { id: "clasico", nombre: "Clásico Elegante", color: "from-slate-800 to-slate-700", preview: "📖" },
  { id: "moderno", nombre: "Moderno Vibrante", color: "from-violet-800 to-pink-700", preview: "✨" },
  { id: "minimalista", nombre: "Minimalista Dark", color: "from-zinc-900 to-zinc-800", preview: "◆" },
  { id: "tropical", nombre: "Tropical Festivo", color: "from-teal-700 to-cyan-600", preview: "🌴" },
];

export default function AnuarioPage() {
  const [vistaActiva, setVistaActiva] = useState<"perfiles" | "portada" | "plantillas">("perfiles");
  const [plantillaSeleccionada, setPlantillaSeleccionada] = useState("moderno");
  const [perfilEditando, setPerfilEditando] = useState<Perfil | null>(null);

  return (
    <div className="min-h-screen">
      <Topbar title="Anuario Digital" subtitle="Constructor del anuario AURA Class 2026" />
      <div className="p-6 max-w-7xl mx-auto space-y-6">
        {/* Tabs */}
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div className="flex gap-2">
            {[
              { key: "perfiles", label: "Perfiles", icon: User },
              { key: "portada", label: "Portada", icon: BookOpen },
              { key: "plantillas", label: "Plantillas", icon: Grid },
            ].map(tab => (
              <button
                key={tab.key}
                onClick={() => setVistaActiva(tab.key as typeof vistaActiva)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium transition-all ${vistaActiva === tab.key ? "bg-violet-600 text-white" : "bg-[#13132b] text-slate-400 border border-[#1e1e4a] hover:text-white"}`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>
          <div className="flex gap-2">
            <Button variant="secondary" size="sm"><Camera className="w-4 h-4" /> Agregar Foto</Button>
            <Button size="sm"><Download className="w-4 h-4" /> Exportar PDF</Button>
          </div>
        </div>

        {/* Vista: Plantillas */}
        {vistaActiva === "plantillas" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {plantillas.map((p, i) => (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  onClick={() => setPlantillaSeleccionada(p.id)}
                  className={`cursor-pointer rounded-2xl border-2 transition-all ${plantillaSeleccionada === p.id ? "border-violet-500 shadow-lg shadow-violet-900/30" : "border-[#1e1e4a]"}`}
                >
                  <div className={`h-40 rounded-xl bg-gradient-to-br ${p.color} flex items-center justify-center text-5xl`}>{p.preview}</div>
                  <div className="p-3">
                    <p className="font-semibold text-white text-sm">{p.nombre}</p>
                    {plantillaSeleccionada === p.id && <span className="badge badge-purple text-xs mt-1">✓ Seleccionada</span>}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Vista: Portada */}
        {vistaActiva === "portada" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-2xl mx-auto">
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-violet-900 via-purple-900 to-pink-900 border border-violet-500/30 p-12 text-center">
              <div className="absolute inset-0">
                <div className="absolute top-10 left-10 w-32 h-32 bg-violet-600/20 rounded-full blur-2xl" />
                <div className="absolute bottom-10 right-10 w-32 h-32 bg-pink-600/20 rounded-full blur-2xl" />
              </div>
              <div className="relative z-10">
                <motion.div animate={{ rotate: [0, 5, -5, 0] }} transition={{ repeat: Infinity, duration: 4 }} className="text-7xl mb-6">🎓</motion.div>
                <h1 className="text-5xl font-black gradient-text mb-2">AURA</h1>
                <h2 className="text-3xl font-bold text-white mb-1">Class 2026</h2>
                <p className="text-violet-300 text-lg mb-4">Anuario Digital de Graduanda</p>
                <div className="flex items-center justify-center gap-2 text-slate-400 text-sm">
                  <Heart className="w-4 h-4 text-pink-400" />
                  <span>52 estudiantes · 3 secciones · Una familia</span>
                  <Heart className="w-4 h-4 text-pink-400" />
                </div>
                <div className="mt-8 flex gap-3 justify-center flex-wrap">
                  <div className="badge badge-purple">📚 Cursillo 2026</div>
                  <div className="badge badge-pink">💃 Baile de Graduanda</div>
                  <div className="badge badge-cyan">✈️ Excursión Final</div>
                </div>
              </div>
            </div>
            <Button className="w-full justify-center mt-4" size="lg">
              <Edit3 className="w-5 h-5" /> Personalizar Portada
            </Button>
          </motion.div>
        )}

        {/* Vista: Perfiles */}
        {vistaActiva === "perfiles" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
              {perfiles.map((p, i) => (
                <motion.div
                  key={p.nombre}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.07 }}
                  whileHover={{ y: -4 }}
                >
                  <Card glow className="overflow-hidden p-0 cursor-pointer" onClick={() => setPerfilEditando(p)}>
                    {/* Header */}
                    <div className={`h-20 bg-gradient-to-r ${p.color} relative`}>
                      <div className="absolute bottom-0 left-6 translate-y-1/2">
                        <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${p.color} border-4 border-[#13132b] flex items-center justify-center text-white text-xl font-black`}>
                          {p.avatar}
                        </div>
                      </div>
                      <div className="absolute top-3 right-3">
                        <span className="badge badge-purple text-xs">Sección {p.seccion}</span>
                      </div>
                    </div>

                    <div className="p-5 pt-10">
                      <div className="mb-3">
                        <h3 className="font-black text-white">{p.nombre}</h3>
                        <p className="text-xs text-violet-400 font-semibold">{p.apodo}</p>
                      </div>

                      <p className="text-xs text-slate-300 italic leading-relaxed mb-3">"{p.frase}"</p>

                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-xs">
                          <Star className="w-3 h-3 text-yellow-400" />
                          <span className="text-slate-400">Logro:</span>
                          <span className="text-white font-medium">{p.logro}</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs">
                          <Sparkles className="w-3 h-3 text-cyan-400" />
                          <span className="text-slate-400">Sueño:</span>
                          <span className="text-white font-medium">{p.destino}</span>
                        </div>
                      </div>

                      <button className="mt-4 w-full py-2 rounded-xl bg-[#0a0a1e] border border-[#1e1e4a] text-xs text-slate-400 hover:text-violet-400 hover:border-violet-500/40 transition-all flex items-center justify-center gap-1">
                        <Edit3 className="w-3 h-3" /> Editar perfil
                      </button>
                    </div>
                  </Card>
                </motion.div>
              ))}

              {/* Add card */}
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}>
                <Card className="border-dashed border-2 flex items-center justify-center min-h-64 cursor-pointer hover:border-violet-500/40 hover:bg-violet-500/5 transition-all">
                  <div className="text-center">
                    <div className="w-12 h-12 rounded-xl bg-[#0a0a1e] border border-[#1e1e4a] flex items-center justify-center mx-auto mb-3">
                      <Star className="w-6 h-6 text-violet-400" />
                    </div>
                    <p className="text-sm font-medium text-slate-400">Agregar Perfil</p>
                  </div>
                </Card>
              </motion.div>
            </div>
          </motion.div>
        )}

        {/* Modal edición */}
        <AnimatePresence>
          {perfilEditando && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
              onClick={() => setPerfilEditando(null)}
            >
              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9 }}
                onClick={e => e.stopPropagation()}
                className="bg-[#13132b] border border-[#1e1e4a] rounded-2xl p-6 max-w-md w-full"
              >
                <h2 className="text-lg font-bold text-white mb-4">Editar Perfil</h2>
                <div className="space-y-3">
                  {[
                    { label: "Frase memorable", value: perfilEditando.frase, field: "frase" },
                    { label: "Logro principal", value: perfilEditando.logro, field: "logro" },
                    { label: "Apodo", value: perfilEditando.apodo, field: "apodo" },
                    { label: "Carrera soñada", value: perfilEditando.destino, field: "destino" },
                  ].map(f => (
                    <div key={f.field}>
                      <label className="text-xs text-slate-400 mb-1 block">{f.label}</label>
                      <input
                        defaultValue={f.value}
                        className="w-full bg-[#0a0a1e] border border-[#1e1e4a] rounded-xl px-3 py-2 text-sm text-white outline-none focus:border-violet-500"
                      />
                    </div>
                  ))}
                </div>
                <div className="flex gap-2 mt-4">
                  <Button className="flex-1 justify-center">Guardar Cambios</Button>
                  <Button variant="secondary" onClick={() => setPerfilEditando(null)}>Cancelar</Button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
