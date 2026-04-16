"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, MapPin, Users, Clock, Plus, Star, CheckCircle2, Zap, Trophy } from "lucide-react";
import Topbar from "@/components/layout/Topbar";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { formatDate } from "@/lib/utils";

type EstadoActividadType = "proxima" | "en_curso" | "completada";
type TipoActividadType = "excursion" | "cultural" | "reunion" | "social" | "deportivo";

interface Actividad {
  id: string;
  titulo: string;
  descripcion: string;
  fecha: string;
  lugar: string;
  tipo: TipoActividadType;
  estado: EstadoActividadType;
  asistentes: number;
  total: number;
  recaudacion: number;
  meta: number;
  emoji: string;
}

const actividades: Actividad[] = [
  { id: "1", titulo: "Excursión Lago de Yojoa", descripcion: "Día de campo y convivencia en el lago más hermoso de Honduras", fecha: "2026-04-20", lugar: "Lago de Yojoa, Cortés", tipo: "excursion", estado: "proxima", asistentes: 38, total: 52, recaudacion: 15000, meta: 20000, emoji: "🏖️" },
  { id: "2", titulo: "Baile de Graduanda", descripcion: "La noche más especial del año, celebremos juntos", fecha: "2026-05-15", lugar: "Salón Versailles, Tegucigalpa", tipo: "social", estado: "proxima", asistentes: 52, total: 52, recaudacion: 28000, meta: 35000, emoji: "💃" },
  { id: "3", titulo: "Kermés AURA 2026", descripcion: "Juegos, comida y diversión para recaudar fondos", fecha: "2026-03-22", lugar: "Cancha del Colegio", tipo: "cultural", estado: "completada", asistentes: 200, total: 200, recaudacion: 18500, meta: 15000, emoji: "🎪" },
  { id: "4", titulo: "Presentación de Cuadros", descripcion: "Muestra artística de los talentos de la clase", fecha: "2026-04-10", lugar: "Auditorio Central", tipo: "cultural", estado: "proxima", asistentes: 25, total: 52, recaudacion: 0, meta: 5000, emoji: "🎭" },
  { id: "5", titulo: "Torneo de Fútbol", descripcion: "Torneo interno de integración entre secciones", fecha: "2026-03-08", lugar: "Campo Deportivo", tipo: "deportivo", estado: "completada", asistentes: 45, total: 52, recaudacion: 4500, meta: 4000, emoji: "⚽" },
  { id: "6", titulo: "Reunión de Directiva", descripcion: "Planificación de actividades del segundo trimestre", fecha: "2026-04-05", lugar: "Aula 12-B", tipo: "reunion", estado: "completada", asistentes: 8, total: 10, recaudacion: 0, meta: 0, emoji: "📋" },
];

const tipoColors: Record<TipoActividadType, string> = {
  excursion: "from-cyan-600 to-teal-500",
  cultural: "from-violet-600 to-purple-500",
  reunion: "from-slate-600 to-slate-500",
  social: "from-pink-600 to-rose-500",
  deportivo: "from-orange-600 to-amber-500",
};

const estadoBadge: Record<EstadoActividadType, { text: string; cls: string }> = {
  proxima: { text: "Próxima", cls: "badge-cyan" },
  en_curso: { text: "En curso", cls: "badge-yellow" },
  completada: { text: "Completada", cls: "badge-green" },
};

export default function ActividadesPage() {
  const [vista, setVista] = useState<"grid" | "lista">("grid");
  const [filtro, setFiltro] = useState<EstadoActividadType | "todas">("todas");
  const [selected, setSelected] = useState<Actividad | null>(null);

  const filtered = filtro === "todas" ? actividades : actividades.filter(a => a.estado === filtro);
  const proximas = actividades.filter(a => a.estado === "proxima").length;
  const completadas = actividades.filter(a => a.estado === "completada").length;
  const totalRecaudado = actividades.reduce((acc, a) => acc + a.recaudacion, 0);

  return (
    <div className="min-h-screen">
      <Topbar title="Actividades" subtitle="Calendario y eventos de la clase" />
      <div className="p-6 max-w-7xl mx-auto">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          {[
            { label: "Actividades Próximas", value: proximas, icon: Clock, color: "text-cyan-400" },
            { label: "Completadas", value: completadas, icon: CheckCircle2, color: "text-emerald-400" },
            { label: "Total Recaudado", value: `L. ${(totalRecaudado / 1000).toFixed(0)}k`, icon: Trophy, color: "text-yellow-400" },
          ].map((s, i) => (
            <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
              <Card glow className="text-center py-4">
                <s.icon className={`w-7 h-7 mx-auto mb-2 ${s.color}`} />
                <p className="text-2xl font-black text-white">{s.value}</p>
                <p className="text-xs text-slate-400">{s.label}</p>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between flex-wrap gap-3 mb-6">
          <div className="flex gap-2 flex-wrap">
            {(["todas", "proxima", "completada"] as const).map(f => (
              <button
                key={f}
                onClick={() => setFiltro(f)}
                className={`px-4 py-1.5 rounded-xl text-sm font-medium transition-all ${filtro === f ? "bg-violet-600 text-white" : "bg-[#13132b] text-slate-400 border border-[#1e1e4a] hover:text-white"}`}
              >
                {f === "todas" ? "Todas" : f === "proxima" ? "Próximas" : "Completadas"}
              </button>
            ))}
          </div>
          <Button size="sm"><Plus className="w-4 h-4" /> Nueva Actividad</Button>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          <AnimatePresence>
            {filtered.map((act, i) => (
              <motion.div
                key={act.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: i * 0.07 }}
                whileHover={{ y: -4 }}
                onClick={() => setSelected(act)}
                className="cursor-pointer"
              >
                <Card glow className="overflow-hidden p-0">
                  {/* Header colorido */}
                  <div className={`h-24 bg-gradient-to-br ${tipoColors[act.tipo]} relative flex items-center justify-center`}>
                    <span className="text-5xl">{act.emoji}</span>
                    <div className="absolute top-3 right-3">
                      <span className={`badge ${estadoBadge[act.estado].cls} text-xs`}>{estadoBadge[act.estado].text}</span>
                    </div>
                    {act.estado === "completada" && act.recaudacion > act.meta && (
                      <div className="absolute top-3 left-3">
                        <span className="badge badge-yellow text-xs"><Zap className="w-3 h-3" /> ¡Meta!</span>
                      </div>
                    )}
                  </div>

                  <div className="p-5">
                    <h3 className="font-bold text-white text-base mb-1">{act.titulo}</h3>
                    <p className="text-xs text-slate-400 mb-3 line-clamp-2">{act.descripcion}</p>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-xs text-slate-300">
                        <Calendar className="w-3.5 h-3.5 text-violet-400" />
                        {formatDate(act.fecha)}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-slate-300">
                        <MapPin className="w-3.5 h-3.5 text-pink-400" />
                        {act.lugar}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-slate-300">
                        <Users className="w-3.5 h-3.5 text-cyan-400" />
                        {act.asistentes} de {act.total} confirmados
                      </div>
                    </div>

                    {/* RSVP bar */}
                    <div className="mb-3">
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-slate-400">Asistencia</span>
                        <span className="text-white font-medium">{Math.round((act.asistentes / act.total) * 100)}%</span>
                      </div>
                      <div className="h-1.5 bg-[#1e1e4a] rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-gradient-to-r from-violet-500 to-pink-500 rounded-full"
                          initial={{ width: "0%" }}
                          animate={{ width: `${(act.asistentes / act.total) * 100}%` }}
                          transition={{ duration: 0.8, delay: i * 0.1 }}
                        />
                      </div>
                    </div>

                    {act.meta > 0 && (
                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-slate-400">Recaudación</span>
                          <span className="text-white font-medium">L. {(act.recaudacion / 1000).toFixed(1)}k / {(act.meta / 1000).toFixed(0)}k</span>
                        </div>
                        <div className="h-1.5 bg-[#1e1e4a] rounded-full overflow-hidden">
                          <motion.div
                            className="h-full rounded-full"
                            style={{ background: act.recaudacion >= act.meta ? "linear-gradient(90deg,#10b981,#34d399)" : "linear-gradient(90deg,#f59e0b,#fbbf24)" }}
                            initial={{ width: "0%" }}
                            animate={{ width: `${Math.min((act.recaudacion / act.meta) * 100, 100)}%` }}
                            transition={{ duration: 0.8, delay: i * 0.1 + 0.2 }}
                          />
                        </div>
                      </div>
                    )}

                    {act.estado === "proxima" && (
                      <div className="mt-4 flex gap-2">
                        <Button size="sm" className="flex-1 justify-center text-xs">
                          <CheckCircle2 className="w-3 h-3" /> Confirmar
                        </Button>
                        <Button size="sm" variant="secondary" className="text-xs">Ver más</Button>
                      </div>
                    )}
                  </div>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
