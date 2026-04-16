"use client";
import { motion } from "framer-motion";
import { Phone, AtSign, Mail, Crown, Shield, Star, Users, Zap, ChevronRight } from "lucide-react";
import Topbar from "@/components/layout/Topbar";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";

interface Miembro {
  nombre: string;
  cargo: string;
  seccion: string;
  avatar: string;
  telefono: string;
  instagram: string;
  descripcion: string;
  gradiente: string;
  icon: React.ElementType;
  nivel: "presidente" | "vicepresidente" | "ejecutivo";
}

const directiva: Miembro[] = [
  { nombre: "Valentina Cruz", cargo: "Presidenta", seccion: "C", avatar: "VC", telefono: "+504 9999-0001", instagram: "@vale.cruz26", descripcion: "Líder nata, organizadora de todos los eventos principales y voz de la clase ante la institución", gradiente: "from-violet-600 to-pink-500", icon: Crown, nivel: "presidente" },
  { nombre: "Carlos Mendoza", cargo: "Vicepresidente", seccion: "A", avatar: "CM", telefono: "+504 9999-0002", instagram: "@carlos.m26", descripcion: "Apoyo incondicional a la presidenta, encargado de logística y comunicación con maestros", gradiente: "from-blue-600 to-cyan-500", icon: Shield, nivel: "vicepresidente" },
  { nombre: "Ana García", cargo: "Secretaria", seccion: "A", avatar: "AG", telefono: "+504 9999-0003", instagram: "@ana.garcia26", descripcion: "Registro de todas las actas, minutas y documentos importantes de la clase graduanda", gradiente: "from-orange-600 to-amber-500", icon: Star, nivel: "ejecutivo" },
  { nombre: "María López", cargo: "Tesorera", seccion: "B", avatar: "ML", telefono: "+504 9999-0004", instagram: "@mari.lopez26", descripcion: "Gestión del presupuesto, registro de ingresos y egresos con total transparencia", gradiente: "from-emerald-600 to-teal-500", icon: Zap, nivel: "ejecutivo" },
  { nombre: "Diego Alvarado", cargo: "Vocal 1 - Deportes", seccion: "C", avatar: "DA", telefono: "+504 9999-0005", instagram: "@diego.alv26", descripcion: "Organizador de actividades deportivas, torneo de fútbol y campeonatos internos", gradiente: "from-red-600 to-rose-500", icon: Users, nivel: "ejecutivo" },
  { nombre: "Sofia Reyes", cargo: "Vocal 2 - Cultural", seccion: "A", avatar: "SR", telefono: "+504 9999-0006", instagram: "@sofi.reyes26", descripcion: "Encargada de las actividades culturales, cuadros y expresiones artísticas de la clase", gradiente: "from-purple-600 to-violet-500", icon: Star, nivel: "ejecutivo" },
  { nombre: "Roberto Flores", cargo: "Vocal 3 - Social Media", seccion: "B", avatar: "RF", telefono: "+504 9999-0007", instagram: "@rober.flores26", descripcion: "Manejo de redes sociales, contenido digital y comunicación con la comunidad estudiantil", gradiente: "from-pink-600 to-rose-500", icon: Zap, nivel: "ejecutivo" },
];

const levelConfig = {
  presidente: { size: "lg", order: 1 },
  vicepresidente: { size: "md", order: 2 },
  ejecutivo: { size: "sm", order: 3 },
};

export default function DirectivaPage() {
  const presidente = directiva.find(m => m.nivel === "presidente")!;
  const vice = directiva.find(m => m.nivel === "vicepresidente")!;
  const ejecutivos = directiva.filter(m => m.nivel === "ejecutivo");

  return (
    <div className="min-h-screen">
      <Topbar title="Directiva" subtitle="Organigrama de la clase AURA 2026" />
      <div className="p-6 max-w-5xl mx-auto space-y-6">
        {/* Organigrama visual */}
        <Card glow className="overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-violet-900/10 to-pink-900/5 pointer-events-none" />
          <CardHeader><CardTitle>🏛️ Organigrama Oficial</CardTitle></CardHeader>
          <CardContent>
            {/* Nivel 1: Presidenta */}
            <div className="flex justify-center mb-6">
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.02 }}
                className="relative"
              >
                <div className="p-5 rounded-2xl bg-gradient-to-br from-violet-900/30 to-pink-900/20 border-2 border-violet-500/50 text-center w-56">
                  <motion.div
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ repeat: Infinity, duration: 3 }}
                    className={`w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br ${presidente.gradiente} flex items-center justify-center text-white text-xl font-black mb-3 relative`}
                  >
                    {presidente.avatar}
                    <Crown className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 text-yellow-400" />
                  </motion.div>
                  <p className="font-black text-white">{presidente.nombre}</p>
                  <p className="text-xs text-violet-400 font-semibold mt-0.5">{presidente.cargo}</p>
                  <p className="text-xs text-slate-400 mt-1">Sección {presidente.seccion}</p>
                </div>
                {/* Línea hacia abajo */}
                <div className="absolute left-1/2 -translate-x-1/2 bottom-0 translate-y-full h-6 w-0.5 bg-violet-500/40" />
              </motion.div>
            </div>

            {/* Línea horizontal */}
            <div className="flex justify-center mb-6">
              <div className="h-0.5 w-64 bg-gradient-to-r from-transparent via-violet-500/40 to-transparent" />
            </div>

            {/* Nivel 2: Vicepresidente */}
            <div className="flex justify-center mb-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="p-4 rounded-2xl bg-gradient-to-br from-blue-900/30 to-cyan-900/20 border border-blue-500/40 text-center w-48">
                  <div className={`w-12 h-12 mx-auto rounded-xl bg-gradient-to-br ${vice.gradiente} flex items-center justify-center text-white text-sm font-black mb-2`}>
                    {vice.avatar}
                  </div>
                  <p className="font-bold text-white text-sm">{vice.nombre}</p>
                  <p className="text-xs text-cyan-400 font-semibold mt-0.5">{vice.cargo}</p>
                </div>
              </motion.div>
            </div>

            {/* Línea horizontal */}
            <div className="flex justify-center mb-4">
              <div className="h-0.5 w-full max-w-2xl bg-gradient-to-r from-transparent via-violet-500/30 to-transparent" />
            </div>

            {/* Nivel 3: Vocales */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {ejecutivos.map((m, i) => (
                <motion.div
                  key={m.nombre}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  whileHover={{ y: -4 }}
                  className="p-3 rounded-xl bg-[#0a0a1e] border border-[#1e1e4a] hover:border-violet-500/30 transition-all text-center cursor-pointer"
                >
                  <div className={`w-10 h-10 mx-auto rounded-xl bg-gradient-to-br ${m.gradiente} flex items-center justify-center text-white text-xs font-black mb-2`}>
                    {m.avatar}
                  </div>
                  <p className="font-semibold text-white text-xs leading-tight">{m.nombre.split(" ")[0]}</p>
                  <p className="text-xs text-slate-400 mt-0.5 leading-tight">{m.cargo.split(" - ")[0]}</p>
                  <span className="badge badge-purple text-xs mt-1">{m.cargo.split(" - ")[1] || "Vocal"}</span>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Tarjetas detalle */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {directiva.map((m, i) => (
            <motion.div
              key={m.nombre}
              initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.07 }}
              whileHover={{ y: -2 }}
            >
              <Card glow className="p-4">
                <div className="flex gap-4">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${m.gradiente} flex items-center justify-center text-white font-black text-base flex-shrink-0 relative`}>
                    {m.avatar}
                    {m.nivel === "presidente" && <Crown className="absolute -top-2 -right-2 w-5 h-5 text-yellow-400" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="font-bold text-white">{m.nombre}</p>
                        <p className="text-xs font-semibold text-violet-400">{m.cargo}</p>
                      </div>
                      <span className="text-xs text-slate-400 flex-shrink-0">Sec. {m.seccion}</span>
                    </div>
                    <p className="text-xs text-slate-400 mt-1 leading-relaxed line-clamp-2">{m.descripcion}</p>
                    <div className="flex gap-3 mt-2">
                      <a href={`tel:${m.telefono}`} className="text-xs text-cyan-400 hover:text-cyan-300 flex items-center gap-1">
                        <Phone className="w-3 h-3" /> Llamar
                      </a>
                      <a href={`https://instagram.com/${m.instagram.replace("@", "")}`} target="_blank" className="text-xs text-pink-400 hover:text-pink-300 flex items-center gap-1">
                        <AtSign className="w-3 h-3" /> {m.instagram}
                      </a>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
