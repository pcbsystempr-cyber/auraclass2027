"use client";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import Link from "next/link";
import {
  DollarSign, Calendar, Camera, Users, BookOpen,
  Award, Star, BarChart3, TrendingUp, Clock,
  UserCheck, Zap, Trophy, Heart
} from "lucide-react";
import { Card } from "@/components/ui/Card";
import Topbar from "@/components/layout/Topbar";

const modules = [
  { href: "/cuotas", label: "Cuotas", desc: "Gestión de pagos", icon: DollarSign, color: "from-green-600 to-emerald-500", glow: "shadow-green-900/30" },
  { href: "/presupuesto", label: "Presupuesto", desc: "Infograma financiero", icon: BarChart3, color: "from-blue-600 to-cyan-500", glow: "shadow-blue-900/30" },
  { href: "/actividades", label: "Actividades", desc: "Eventos y calendario", icon: Calendar, color: "from-violet-600 to-purple-500", glow: "shadow-violet-900/30" },
  { href: "/memorias", label: "Memorias", desc: "Red social y fotos", icon: Camera, color: "from-pink-600 to-rose-500", glow: "shadow-pink-900/30" },
  { href: "/promotores", label: "Promotores", desc: "Ranking de ventas", icon: Users, color: "from-orange-600 to-amber-500", glow: "shadow-orange-900/30" },
  { href: "/anuario", label: "Anuario", desc: "Constructor digital", icon: BookOpen, color: "from-teal-600 to-cyan-500", glow: "shadow-teal-900/30" },
  { href: "/certificados", label: "Certificados", desc: "Generar y descargar", icon: Award, color: "from-yellow-600 to-amber-500", glow: "shadow-yellow-900/30" },
  { href: "/estudiante-del-mes", label: "Estudiante del Mes", desc: "Votación y honor", icon: Star, color: "from-purple-600 to-violet-500", glow: "shadow-purple-900/30" },
  { href: "/directiva", label: "Directiva", desc: "Organigrama", icon: UserCheck, color: "from-red-600 to-rose-500", glow: "shadow-red-900/30" },
];

const stats = [
  { label: "Recaudación Total", value: "L. 45,200", change: "+12%", icon: TrendingUp, color: "text-green-400" },
  { label: "Cuotas al Día", value: "78%", change: "+5%", icon: DollarSign, color: "text-violet-400" },
  { label: "Próxima Actividad", value: "3 días", change: "Excursión", icon: Clock, color: "text-cyan-400" },
  { label: "Estudiantes Activos", value: "47", change: "de 52", icon: Users, color: "text-pink-400" },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function DashboardPage() {
  const { data: session } = useSession();
  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Buenos días" : hour < 18 ? "Buenas tardes" : "Buenas noches";

  return (
    <div className="min-h-screen">
      <Topbar />
      <div className="p-6 max-w-7xl mx-auto">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 relative overflow-hidden rounded-2xl bg-gradient-to-r from-violet-900/40 via-purple-900/30 to-pink-900/30 border border-violet-500/20 p-8"
        >
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-10 -right-10 w-60 h-60 bg-violet-600/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-10 -left-10 w-60 h-60 bg-pink-600/10 rounded-full blur-3xl" />
          </div>
          <div className="relative z-10 flex items-center justify-between flex-wrap gap-4">
            <div>
              <p className="text-violet-400 text-sm font-medium mb-1">{greeting} 👋</p>
              <h1 className="text-3xl md:text-4xl font-black text-white">
                {session?.user?.name?.split(" ")[0] || "Estudiante"}
              </h1>
              <p className="text-slate-300 mt-1">Bienvenido al sistema AURA Class 2026 ✨</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 badge badge-purple">
                <Trophy className="w-3 h-3" /> Top Clase 2026
              </div>
              <div className="flex items-center gap-2 badge badge-pink">
                <Heart className="w-3 h-3" /> Aura ✨
              </div>
            </div>
          </div>
          {/* Progress hacia graduación */}
          <div className="relative z-10 mt-6">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-slate-300 flex items-center gap-1"><Zap className="w-3 h-3 text-yellow-400" /> Progreso hacia graduación</span>
              <span className="text-violet-400 font-bold">73%</span>
            </div>
            <div className="progress-bar">
              <motion.div
                className="progress-bar-fill"
                initial={{ width: "0%" }}
                animate={{ width: "73%" }}
                transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
              />
            </div>
            <div className="flex justify-between text-xs text-slate-500 mt-1">
              <span>Inicio 2026</span>
              <span>🎓 Graduación</span>
            </div>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
        >
          {stats.map((stat) => (
            <motion.div key={stat.label} variants={itemVariants}>
              <Card glow className="text-center">
                <stat.icon className={`w-6 h-6 mx-auto mb-2 ${stat.color}`} />
                <p className="text-2xl font-black text-white">{stat.value}</p>
                <p className="text-xs text-slate-400 mt-0.5">{stat.label}</p>
                <p className={`text-xs font-medium mt-1 ${stat.color}`}>{stat.change}</p>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Módulos */}
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-white">Módulos del Sistema</h2>
          <span className="text-xs text-slate-500 badge badge-purple">{modules.length} módulos</span>
        </div>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4"
        >
          {modules.map((mod) => (
            <motion.div key={mod.href} variants={itemVariants}>
              <Link href={mod.href}>
                <motion.div
                  whileHover={{ y: -6, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`bg-[#13132b] border border-[#1e1e4a] rounded-2xl p-5 cursor-pointer transition-all duration-300 hover:border-violet-500/30 hover:shadow-xl hover:${mod.glow} group`}
                >
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${mod.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300`}>
                    <mod.icon className="w-6 h-6 text-white" />
                  </div>
                  <p className="font-bold text-white text-sm leading-tight">{mod.label}</p>
                  <p className="text-xs text-slate-400 mt-1">{mod.desc}</p>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
