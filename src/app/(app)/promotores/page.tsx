"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Heart, Star, Crown, Award, Shield, Zap, Phone, AtSign, Globe,
  DollarSign, Gift, ChevronRight, MessageCircle, Users, TrendingUp
} from "lucide-react";
import Topbar from "@/components/layout/Topbar";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { formatCurrency } from "@/lib/utils";

interface Patrocinador {
  id: string; nombre: string; empresa?: string; tipo: string;
  nivel: string; monto: number; descripcion?: string;
  instagram?: string; telefono?: string; website?: string; visible: boolean;
}

const NIVELES = {
  platino: {
    label: "Platino 💎", min: 5000, color: "from-cyan-500 to-blue-500",
    border: "border-cyan-500/50", bg: "bg-cyan-500/10", text: "text-cyan-300",
    icon: Crown, emoji: "💎",
    beneficios: [
      "Mención en la ceremonia de graduación",
      "Logo en todos los banners y decoraciones",
      "Certificado enmarcado de Patrocinador Principal",
      "Perfil destacado en el Anuario Digital",
      "2 invitaciones VIP a la graduación",
      "Publicación especial en redes sociales",
    ],
  },
  oro: {
    label: "Oro 🥇", min: 2500, color: "from-yellow-500 to-amber-500",
    border: "border-yellow-500/40", bg: "bg-yellow-500/10", text: "text-yellow-300",
    icon: Star, emoji: "🥇",
    beneficios: [
      "Nombre en banner principal de actividades",
      "Certificado de agradecimiento oficial",
      "Mención en redes sociales de la clase",
      "Listado en el Anuario Digital",
      "1 invitación al baile de graduanda",
    ],
  },
  plata: {
    label: "Plata 🥈", min: 1000, color: "from-slate-400 to-slate-300",
    border: "border-slate-400/40", bg: "bg-slate-400/10", text: "text-slate-300",
    icon: Award, emoji: "🥈",
    beneficios: [
      "Certificado digital de agradecimiento",
      "Mención en publicaciones de la clase",
      "Listado en la página de patrocinadores",
    ],
  },
  bronce: {
    label: "Bronce 🥉", min: 500, color: "from-orange-500 to-amber-600",
    border: "border-orange-500/30", bg: "bg-orange-500/10", text: "text-orange-300",
    icon: Shield, emoji: "🥉",
    beneficios: [
      "Agradecimiento público en redes sociales",
      "Listado en la página de patrocinadores",
      "Certificado digital de apoyo",
    ],
  },
};

const TIPO_LABEL: Record<string, string> = {
  empresa: "🏪 Empresa", particular: "👤 Particular",
  institucion: "🏛️ Institución", padre: "👨‍👩‍👧 Padre de familia",
};


export default function PatrocinadoresPage() {
  const [patrocinadores, setPatrocinadores] = useState<Patrocinador[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/patrocinadores")
      .then(r => r.json())
      .then(d => { setPatrocinadores(Array.isArray(d) ? d.filter(p => p.visible) : []); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const totalAuspiciado = patrocinadores.reduce((a, p) => a + p.monto, 0);
  const META_AUSPICIO = 50000;
  const porcentaje = Math.min((totalAuspiciado / META_AUSPICIO) * 100, 100);
  const porNivel = (nivel: string) => patrocinadores.filter(p => p.nivel === nivel);

  return (
    <div className="min-h-screen">
      <Topbar title="Patrocinadores" subtitle="Apoya a la Clase AURA 2026 · Juntos lo logramos" />
      <div className="p-6 max-w-6xl mx-auto space-y-8">

        {/* Hero */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-violet-900/60 via-purple-900/40 to-pink-900/50 border border-violet-500/30 p-8 text-center">
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute -top-10 -right-10 w-48 h-48 bg-violet-600/15 rounded-full blur-3xl" />
            <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-pink-600/15 rounded-full blur-3xl" />
          </div>
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 badge badge-purple mb-4 text-sm px-4 py-2">
              <Heart className="w-4 h-4 text-pink-400" /> Programa de Patrocinadores AURA 2026
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-white mb-3">
              Sé parte de algo <span className="gradient-text">histórico</span>
            </h1>
            <p className="text-lg text-slate-300 max-w-2xl mx-auto mb-6">
              La Clase AURA 2026 busca patrocinadores que quieran apoyar su graduación.
              Tu aporte <strong className="text-violet-300">reduce el costo para los padres</strong> y hace posible una celebración inolvidable para 52 estudiantes.
            </p>

            <div className="grid grid-cols-3 gap-4 max-w-xl mx-auto mb-6">
              {[
                { label: "Patrocinadores", value: loading ? "..." : patrocinadores.length, icon: Users },
                { label: "Total Auspiciado", value: loading ? "..." : formatCurrency(totalAuspiciado), icon: DollarSign },
                { label: "Estudiantes beneficiados", value: "52", icon: Gift },
              ].map(s => (
                <div key={s.label} className="bg-white/5 rounded-2xl p-3 border border-white/10">
                  <s.icon className="w-5 h-5 text-violet-400 mx-auto mb-1" />
                  <p className="text-xl font-black text-white">{s.value}</p>
                  <p className="text-xs text-slate-400">{s.label}</p>
                </div>
              ))}
            </div>

            {/* Barra de progreso */}
            <div className="max-w-xl mx-auto">
              <div className="flex justify-between text-xs text-slate-400 mb-2">
                <span>Meta de auspicio: {formatCurrency(META_AUSPICIO)}</span>
                <span className="text-violet-400 font-bold">{porcentaje.toFixed(0)}% alcanzado</span>
              </div>
              <div className="h-3 bg-[#1e1e4a] rounded-full overflow-hidden">
                <motion.div className="h-full rounded-full bg-gradient-to-r from-violet-500 via-pink-500 to-cyan-400"
                  initial={{ width: "0%" }} animate={{ width: `${porcentaje}%` }}
                  transition={{ duration: 1.5, ease: "easeOut" }} />
              </div>
            </div>

            <div className="flex gap-3 justify-center mt-6 flex-wrap">
              <a href="https://wa.me/50499990001?text=Quiero%20ser%20patrocinador%20de%20AURA%202026" target="_blank">
                <Button size="lg"><MessageCircle className="w-5 h-5" /> Quiero Auspiciar por WhatsApp</Button>
              </a>
              <Button variant="secondary" size="lg" onClick={() => document.getElementById("niveles")?.scrollIntoView({ behavior: "smooth" })}>
                Ver Beneficios <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </motion.div>

        {/* ¿Por qué patrocinar? */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { icon: Heart, titulo: "Apoya a la comunidad", desc: "Al patrocinar a AURA 2026 reduces el costo de graduación para 52 familias hondureñas.", color: "from-pink-600 to-rose-500" },
            { icon: TrendingUp, titulo: "Publicidad real", desc: "Tu empresa o nombre será visto por cientos de personas en eventos, redes sociales y la ceremonia.", color: "from-violet-600 to-purple-500" },
            { icon: Gift, titulo: "Reconocimiento oficial", desc: "Recibes certificado, mención y tu nombre quedará grabado en el Anuario Digital 2026 para siempre.", color: "from-cyan-600 to-teal-500" },
          ].map((item, i) => (
            <motion.div key={item.titulo} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
              <Card glow className="text-center p-6">
                <div className={`w-12 h-12 mx-auto rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-3`}>
                  <item.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-bold text-white mb-2">{item.titulo}</h3>
                <p className="text-sm text-slate-400">{item.desc}</p>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Niveles de Patrocinio */}
        <div id="niveles">
          <h2 className="text-2xl font-black text-white mb-6 text-center">🎯 Elige tu nivel de patrocinio</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
            {Object.entries(NIVELES).map(([key, nivel], i) => (
              <motion.div key={key} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }} whileHover={{ y: -6 }}>
                <Card glow className={`border-2 ${nivel.border} ${nivel.bg} h-full flex flex-col`}>
                  <div className="p-5 flex-1">
                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${nivel.color} flex items-center justify-center mb-3`}>
                      <nivel.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className={`text-lg font-black mb-1 ${nivel.text}`}>{nivel.label}</h3>
                    <p className="text-2xl font-black text-white mb-1">{formatCurrency(nivel.min)}+</p>
                    <p className="text-xs text-slate-400 mb-4">aporte mínimo</p>
                    <ul className="space-y-2">
                      {nivel.beneficios.map((b, bi) => (
                        <li key={bi} className="flex items-start gap-2 text-sm text-slate-300">
                          <Zap className={`w-3.5 h-3.5 mt-0.5 flex-shrink-0 ${nivel.text}`} />
                          {b}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="p-5 pt-0">
                    <a href={`https://wa.me/50499990001?text=Hola!%20Quiero%20ser%20patrocinador%20nivel%20${encodeURIComponent(nivel.label)}%20de%20AURA%202026`} target="_blank">
                      <Button className="w-full justify-center" variant={key === "platino" ? "primary" : "secondary"} size="sm">
                        <MessageCircle className="w-4 h-4" /> Quiero este nivel
                      </Button>
                    </a>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Info de pago */}
        <Card glow className="border-violet-500/30">
          <CardHeader><CardTitle>💳 Cómo hacer tu aporte</CardTitle></CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { icon: "📱", titulo: "Tigo Money", detalle: "+504 9999-0001", sub: "A nombre de: Clase AURA 2026" },
                { icon: "🏦", titulo: "Transferencia Bancaria", detalle: "Cuenta: 1234-5678-9012", sub: "Banco Atlántida · Ahorro" },
                { icon: "💵", titulo: "Efectivo / Personal", detalle: "Entregar a la Tesorera", sub: "María López · Sección B" },
              ].map(m => (
                <div key={m.titulo} className="text-center p-4 rounded-2xl bg-[#0a0a1e] border border-[#1e1e4a]">
                  <span className="text-3xl">{m.icon}</span>
                  <p className="font-bold text-white mt-2">{m.titulo}</p>
                  <p className="text-sm text-violet-400 font-mono mt-1">{m.detalle}</p>
                  <p className="text-xs text-slate-400 mt-1">{m.sub}</p>
                </div>
              ))}
            </div>
            <div className="mt-4 p-4 rounded-xl bg-violet-500/10 border border-violet-500/20 text-sm text-slate-300">
              <strong className="text-violet-400">Importante:</strong> Al realizar tu aporte, envía el comprobante por WhatsApp al{" "}
              <strong className="text-white">+504 9999-0001</strong> con tu nombre y el nivel de patrocinio deseado. Recibirás confirmación en menos de 24 horas.
            </div>
          </CardContent>
        </Card>

        {/* Lista de Patrocinadores */}
        {!loading && patrocinadores.length > 0 && (
          <div>
            <h2 className="text-2xl font-black text-white mb-6 text-center">🌟 Nuestros Patrocinadores</h2>
            {Object.entries(NIVELES).map(([key, cfg]) => {
              const grupo = porNivel(key);
              if (grupo.length === 0) return null;
              return (
                <div key={key} className="mb-6">
                  <h3 className={`text-lg font-bold mb-3 ${cfg.text}`}>{cfg.emoji} {cfg.label}</h3>
                  <div className={`grid gap-4 ${key === "platino" ? "grid-cols-1 md:grid-cols-2" : "grid-cols-2 md:grid-cols-3 lg:grid-cols-4"}`}>
                    {grupo.map((p, i) => (
                      <motion.div key={p.id} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.08 }} whileHover={{ y: -3 }}>
                        <Card glow className={`border ${cfg.border} ${cfg.bg} p-4 ${key === "platino" ? "flex items-center gap-4" : "text-center"}`}>
                          <div className={`${key === "platino" ? "w-16 h-16 flex-shrink-0" : "w-12 h-12 mx-auto mb-3"} rounded-2xl bg-gradient-to-br ${cfg.color} flex items-center justify-center`}>
                            <span className="text-white text-xl font-black">{(p.empresa ?? p.nombre).charAt(0)}</span>
                          </div>
                          <div className={key !== "platino" ? "" : "flex-1 min-w-0"}>
                            <p className="font-black text-white">{p.empresa ?? p.nombre}</p>
                            {p.empresa && <p className="text-xs text-slate-400">{p.nombre}</p>}
                            <p className="text-xs text-slate-500 mt-0.5">{TIPO_LABEL[p.tipo] ?? p.tipo}</p>
                            {p.descripcion && key === "platino" && <p className="text-sm text-slate-300 mt-1 line-clamp-2">{p.descripcion}</p>}
                            <p className={`text-sm font-bold mt-1 ${cfg.text}`}>{formatCurrency(p.monto)}</p>
                            <div className="flex gap-2 mt-2 flex-wrap justify-center">
                              {p.instagram && <a href={`https://instagram.com/${p.instagram.replace("@","")}`} target="_blank" className="flex items-center gap-1 text-xs text-pink-400 hover:text-pink-300"><AtSign className="w-3 h-3" />{p.instagram}</a>}
                              {p.website && <a href={p.website} target="_blank" className="flex items-center gap-1 text-xs text-cyan-400 hover:text-cyan-300"><Globe className="w-3 h-3" />Sitio web</a>}
                            </div>
                          </div>
                          {key === "platino" && <Crown className="w-8 h-8 text-yellow-400 flex-shrink-0" />}
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {!loading && patrocinadores.length === 0 && (
          <Card glow className="text-center py-12">
            <Heart className="w-12 h-12 text-pink-400 mx-auto mb-3" />
            <h3 className="text-xl font-bold text-white mb-2">¡Sé el primero en patrocinar!</h3>
            <p className="text-slate-400 max-w-md mx-auto mb-4">
              Aún no tenemos patrocinadores registrados. Tu apoyo marcaría la diferencia para los 52 estudiantes de AURA 2026.
            </p>
            <a href="https://wa.me/50499990001?text=Quiero%20ser%20el%20primer%20patrocinador%20de%20AURA%202026" target="_blank">
              <Button size="lg"><MessageCircle className="w-5 h-5" /> Ser el Primer Patrocinador</Button>
            </a>
          </Card>
        )}

        {/* CTA final */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
          className="text-center p-8 rounded-3xl bg-gradient-to-r from-violet-900/40 to-pink-900/30 border border-violet-500/30">
          <p className="text-3xl font-black text-white mb-2">¿Tienes preguntas? 💬</p>
          <p className="text-slate-300 mb-4">Contáctanos directamente y con gusto te explicamos cómo tu apoyo ayuda a la clase.</p>
          <div className="flex gap-3 justify-center flex-wrap">
            <a href="https://wa.me/50499990001" target="_blank">
              <Button size="lg"><Phone className="w-5 h-5" /> +504 9999-0001</Button>
            </a>
            <a href="https://instagram.com/auraclass2026" target="_blank">
              <Button variant="secondary" size="lg"><AtSign className="w-5 h-5" /> @auraclass2026</Button>
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
