"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Crown, Heart, Award, Plus, Sparkles, ChevronRight, Trophy } from "lucide-react";
import Topbar from "@/components/layout/Topbar";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

interface Candidato {
  id: string;
  nombre: string;
  avatar: string;
  seccion: string;
  razon: string;
  votos: number;
  voted: boolean;
  logros: string[];
  gradiente: string;
}

const candidatos: Candidato[] = [
  { id: "1", nombre: "Valentina Cruz", avatar: "VC", seccion: "C", razon: "Siempre dispuesta a ayudar a sus compañeros y líder nata en todos los proyectos", votos: 18, voted: false, logros: ["🎭 Mejor Actriz", "📚 Tutora de Español", "💃 Bailarina"], gradiente: "from-violet-600 to-pink-500" },
  { id: "2", nombre: "Carlos Mendoza", avatar: "CM", seccion: "A", razon: "Representa el espíritu de equipo, campeón de fútbol y siempre con una sonrisa", votos: 14, voted: false, logros: ["⚽ MVP Torneo", "🏆 Top Promotor", "😄 El Animador"], gradiente: "from-blue-600 to-cyan-500" },
  { id: "3", nombre: "Ana García", avatar: "AG", seccion: "A", razon: "Inteligente, creativa y el motor de la directiva. Su organización no tiene igual", votos: 11, voted: false, logros: ["📋 Secretaria", "🎨 Arte Digital", "✨ Organizadora"], gradiente: "from-orange-600 to-amber-500" },
  { id: "4", nombre: "María López", avatar: "ML", seccion: "B", razon: "Primera en llegar y última en irse. La más dedicada de toda la clase", votos: 9, voted: false, logros: ["📚 Mejor Promedio", "🔬 Ciencias", "🌟 Puntualidad"], gradiente: "from-emerald-600 to-teal-500" },
];

const ganadoresPasados = [
  { mes: "Enero 2026", nombre: "Sofia Reyes", avatar: "SR", gradiente: "from-pink-600 to-rose-500" },
  { mes: "Febrero 2026", nombre: "Diego Alvarado", avatar: "DA", gradiente: "from-purple-600 to-violet-500" },
  { mes: "Marzo 2026", nombre: "Luis Torres", avatar: "LT", gradiente: "from-cyan-600 to-blue-500" },
];

export default function EstudianteMesPage() {
  const [candidatosList, setCandidatosList] = useState(candidatos);
  const [hasVoted, setHasVoted] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const totalVotos = candidatosList.reduce((a, c) => a + c.votos, 0);
  const lider = [...candidatosList].sort((a, b) => b.votos - a.votos)[0];

  const votar = (id: string) => {
    if (hasVoted) return;
    setCandidatosList(prev => prev.map(c =>
      c.id === id ? { ...c, votos: c.votos + 1, voted: true } : c
    ));
    setHasVoted(true);
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 3000);
  };

  return (
    <div className="min-h-screen">
      <Topbar title="Estudiante del Mes" subtitle="Nominaciones y votación de Abril 2026" />
      <div className="p-6 max-w-5xl mx-auto space-y-6">
        {/* Confetti effect */}
        <AnimatePresence>
          {showConfetti && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                className="bg-[#13132b] border border-violet-500 rounded-2xl p-8 text-center shadow-2xl shadow-violet-900/50"
              >
                <p className="text-5xl mb-3">🎉</p>
                <p className="text-2xl font-black gradient-text">¡Voto registrado!</p>
                <p className="text-slate-400 mt-1">Tu voz cuenta para la clase</p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Líder actual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-violet-900/40 via-purple-900/30 to-pink-900/30 border border-violet-500/30 p-6"
        >
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-violet-600/10 rounded-full blur-3xl" />
          </div>
          <div className="relative z-10 flex items-center gap-6 flex-wrap">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Crown className="w-5 h-5 text-yellow-400" />
                <span className="text-yellow-400 font-semibold text-sm">Candidato líder - Abril 2026</span>
              </div>
              <div className="flex items-center gap-4">
                <motion.div
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${lider.gradiente} flex items-center justify-center text-white text-xl font-black`}
                >
                  {lider.avatar}
                </motion.div>
                <div>
                  <h2 className="text-2xl font-black text-white">{lider.nombre}</h2>
                  <p className="text-slate-300 text-sm">{lider.votos} votos · Sección {lider.seccion}</p>
                  <div className="flex gap-1 mt-1 flex-wrap">
                    {lider.logros.map(l => <span key={l} className="text-xs">{l}</span>)}
                  </div>
                </div>
              </div>
            </div>
            <div className="ml-auto flex flex-col items-end">
              <p className="text-4xl font-black gradient-text">{Math.round((lider.votos / totalVotos) * 100)}%</p>
              <p className="text-xs text-slate-400">de los votos</p>
            </div>
          </div>
        </motion.div>

        {/* Candidatos */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-white">Candidatos del Mes</h2>
            {!hasVoted && (
              <span className="badge badge-purple text-xs"><Sparkles className="w-3 h-3" /> ¡Tu voto cuenta!</span>
            )}
            {hasVoted && (
              <span className="badge badge-green text-xs">✓ Ya votaste</span>
            )}
          </div>

          <div className="space-y-3">
            {[...candidatosList].sort((a, b) => b.votos - a.votos).map((c, i) => {
              const perc = totalVotos > 0 ? Math.round((c.votos / totalVotos) * 100) : 0;
              return (
                <motion.div
                  key={c.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className={`p-4 rounded-2xl border ${c.voted ? "border-violet-500/50 bg-violet-500/10" : "border-[#1e1e4a] bg-[#13132b]"} transition-all`}
                >
                  <div className="flex items-center gap-4">
                    <div className="text-xl font-black text-slate-600 w-6">#{i + 1}</div>
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${c.gradiente} flex items-center justify-center text-white text-sm font-bold flex-shrink-0`}>
                      {c.avatar}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="font-bold text-white">{c.nombre}</p>
                        {i === 0 && <Crown className="w-4 h-4 text-yellow-400" />}
                        {c.voted && <span className="badge badge-purple text-xs">Tu voto ✓</span>}
                      </div>
                      <p className="text-xs text-slate-400 line-clamp-1 mt-0.5">{c.razon}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <div className="flex-1 h-2 bg-[#0a0a1e] rounded-full overflow-hidden">
                          <motion.div
                            className={`h-full rounded-full bg-gradient-to-r ${c.gradiente}`}
                            initial={{ width: "0%" }}
                            animate={{ width: `${perc}%` }}
                            transition={{ duration: 0.8, delay: i * 0.1 }}
                          />
                        </div>
                        <span className="text-xs text-slate-300 font-medium w-12 text-right">{c.votos} votos</span>
                        <span className="text-xs text-slate-400 w-10 text-right">{perc}%</span>
                      </div>
                    </div>
                    <motion.button
                      whileTap={{ scale: 0.9 }}
                      onClick={() => votar(c.id)}
                      disabled={hasVoted}
                      className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all flex-shrink-0 ${
                        hasVoted
                          ? c.voted ? "bg-violet-600 text-white" : "bg-[#0a0a1e] text-slate-600"
                          : "bg-[#0a0a1e] border border-[#1e1e4a] text-slate-400 hover:text-pink-400 hover:border-pink-500/40 cursor-pointer"
                      }`}
                    >
                      <Star className={`w-5 h-5 ${c.voted ? "fill-white" : ""}`} />
                    </motion.button>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <div className="mt-4 flex justify-center">
            <Button variant="secondary" size="sm"><Plus className="w-4 h-4" /> Nominar Estudiante</Button>
          </div>
        </div>

        {/* Galería de honor */}
        <Card glow>
          <CardHeader>
            <CardTitle><Trophy className="w-5 h-5 text-yellow-400 inline mr-2" />Galería de Honor</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4 flex-wrap">
              {ganadoresPasados.map((g, i) => (
                <motion.div
                  key={g.mes}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.1, type: "spring" }}
                  className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-[#0a0a1e] border border-[#1e1e4a] hover:border-yellow-500/30 transition-all cursor-pointer"
                >
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${g.gradiente} flex items-center justify-center text-white text-lg font-black relative`}>
                    {g.avatar}
                    <Crown className="absolute -top-2 -right-2 w-5 h-5 text-yellow-400" />
                  </div>
                  <p className="font-bold text-white text-sm text-center">{g.nombre}</p>
                  <p className="text-xs text-slate-400">{g.mes}</p>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
