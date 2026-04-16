"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard, Users, DollarSign, Bell, Calendar, TrendingUp,
  UserCheck, BookOpen, Award, Star, BarChart3, Sparkles, ChevronRight,
  Menu, X, Shield,
} from "lucide-react";
import Topbar from "@/components/layout/Topbar";
import EstudiantesAdmin from "@/components/admin/EstudiantesAdmin";
import CuotasAdmin from "@/components/admin/CuotasAdmin";
import AvisosAdmin from "@/components/admin/AvisosAdmin";
import ActividadesAdmin from "@/components/admin/ActividadesAdmin";
import PresupuestoAdmin from "@/components/admin/PresupuestoAdmin";
import EstadisticasAdmin from "@/components/admin/EstadisticasAdmin";
import RecomendacionesAdmin from "@/components/admin/RecomendacionesAdmin";
import { AnuarioAdmin, DirectivaAdmin, CertificadosAdmin, EstudianteMesAdmin } from "@/components/admin/ModulosAdmin";
import PatrocinadoresAdmin from "@/components/admin/PatrocinadoresAdmin";

const SECCIONES = [
  { id: "estadisticas", label: "Estadísticas",       icon: BarChart3,       grupo: "Análisis",    emoji: "📊" },
  { id: "recomendaciones", label: "Recomendaciones", icon: Sparkles,        grupo: "Análisis",    emoji: "🤖" },
  { id: "estudiantes",  label: "Estudiantes",         icon: Users,           grupo: "Gestión",     emoji: "👥" },
  { id: "cuotas",       label: "Cuotas y Pagos",      icon: DollarSign,      grupo: "Gestión",     emoji: "💰" },
  { id: "avisos",       label: "Avisos",               icon: Bell,            grupo: "Gestión",     emoji: "📢" },
  { id: "actividades",  label: "Actividades",          icon: Calendar,        grupo: "Gestión",     emoji: "📅" },
  { id: "presupuesto",  label: "Presupuesto",          icon: TrendingUp,      grupo: "Gestión",     emoji: "💵" },
  { id: "patrocinadores", label: "Patrocinadores",      icon: Users,           grupo: "Módulos",     emoji: "🤝" },
  { id: "anuario",      label: "Anuario",              icon: BookOpen,        grupo: "Módulos",     emoji: "📖" },
  { id: "certificados", label: "Certificados",         icon: Award,           grupo: "Módulos",     emoji: "🏆" },
  { id: "estmes",       label: "Estudiante del Mes",   icon: Star,            grupo: "Módulos",     emoji: "⭐" },
  { id: "directiva",    label: "Directiva",            icon: UserCheck,       grupo: "Módulos",     emoji: "👤" },
];

const GRUPOS = ["Análisis", "Gestión", "Módulos"];

export default function AdminPage() {
  const [activa, setActiva] = useState("estadisticas");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const seccionActual = SECCIONES.find(s => s.id === activa)!;

  const renderContenido = () => {
    switch (activa) {
      case "estadisticas":    return <EstadisticasAdmin />;
      case "recomendaciones": return <RecomendacionesAdmin />;
      case "estudiantes":     return <EstudiantesAdmin />;
      case "cuotas":          return <CuotasAdmin />;
      case "avisos":          return <AvisosAdmin />;
      case "actividades":     return <ActividadesAdmin />;
      case "presupuesto":     return <PresupuestoAdmin />;
      case "patrocinadores":  return <PatrocinadoresAdmin />;
      case "anuario":         return <AnuarioAdmin />;
      case "certificados":    return <CertificadosAdmin />;
      case "estmes":          return <EstudianteMesAdmin />;
      case "directiva":       return <DirectivaAdmin />;
      default:                return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Topbar title="Panel Admin" subtitle="Control total del sistema AURA 2026" />

      <div className="flex flex-1 overflow-hidden">
        {/* ─── Sidebar Admin ─── */}
        <motion.aside
          animate={{ width: sidebarOpen ? 256 : 56 }}
          className="bg-[#0d0d26] border-r border-[#1e1e4a] flex-shrink-0 overflow-hidden flex flex-col"
          style={{ minHeight: "100%" }}
        >
          {/* Toggle */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="flex items-center gap-2 p-4 text-slate-400 hover:text-white transition-colors border-b border-[#1e1e4a] w-full"
          >
            {sidebarOpen ? <X className="w-4 h-4 flex-shrink-0" /> : <Menu className="w-4 h-4 flex-shrink-0" />}
            {sidebarOpen && <span className="text-xs font-semibold text-slate-400 uppercase tracking-widest">Admin Panel</span>}
          </button>

          {/* Grupos de secciones */}
          <div className="flex-1 overflow-y-auto py-2 scrollbar-hide">
            {GRUPOS.map(grupo => (
              <div key={grupo}>
                {sidebarOpen && (
                  <p className="text-xs font-semibold text-slate-600 uppercase tracking-widest px-4 py-2 mt-2">{grupo}</p>
                )}
                {SECCIONES.filter(s => s.grupo === grupo).map(sec => (
                  <button
                    key={sec.id}
                    onClick={() => setActiva(sec.id)}
                    className={`w-full flex items-center gap-3 px-4 py-2.5 transition-all text-sm font-medium relative
                      ${activa === sec.id
                        ? "text-white bg-violet-600/20 border-r-2 border-violet-500"
                        : "text-slate-400 hover:text-white hover:bg-white/3"
                      }`}
                    title={!sidebarOpen ? sec.label : undefined}
                  >
                    <span className="text-base flex-shrink-0">{sec.emoji}</span>
                    {sidebarOpen && (
                      <>
                        <span className="flex-1 text-left truncate">{sec.label}</span>
                        {activa === sec.id && <ChevronRight className="w-3 h-3 text-violet-400 flex-shrink-0" />}
                      </>
                    )}
                  </button>
                ))}
              </div>
            ))}
          </div>

          {/* Admin badge */}
          {sidebarOpen && (
            <div className="p-4 border-t border-[#1e1e4a]">
              <div className="flex items-center gap-2 badge badge-purple w-full justify-center py-2">
                <Shield className="w-3 h-3" /> Admin AURA 2026
              </div>
            </div>
          )}
        </motion.aside>

        {/* ─── Contenido principal ─── */}
        <main className="flex-1 overflow-auto bg-[#08082b]">
          {/* Breadcrumb header */}
          <div className="sticky top-0 z-10 bg-[#08082b]/80 backdrop-blur border-b border-[#1e1e4a] px-6 py-3 flex items-center gap-3">
            <span className="text-2xl">{seccionActual.emoji}</span>
            <div>
              <h2 className="font-black text-white text-lg leading-none">{seccionActual.label}</h2>
              <p className="text-xs text-slate-400">{seccionActual.grupo}</p>
            </div>
          </div>

          {/* Sección activa */}
          <div className="p-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={activa}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
              >
                {renderContenido()}
              </motion.div>
            </AnimatePresence>
          </div>
        </main>
      </div>
    </div>
  );
}
