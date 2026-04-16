"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, MessageCircle, Share2, Plus, Camera, Grid3X3, LayoutList, Smile } from "lucide-react";
import Topbar from "@/components/layout/Topbar";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

interface Post {
  id: string;
  autor: string;
  avatar: string;
  evento: string;
  caption: string;
  imageBg: string;
  emoji: string;
  likes: number;
  comments: number;
  liked: boolean;
  fecha: string;
  tags: string[];
}

const postsData: Post[] = [
  { id: "1", autor: "Ana García", avatar: "AG", evento: "Kermés AURA 2026", caption: "¡Qué kermés tan increíble! Nunca olvidaré este día con todos ustedes 💜", imageBg: "from-violet-600 to-pink-500", emoji: "🎪", likes: 34, comments: 12, liked: false, fecha: "hace 2 días", tags: ["kermes", "aura2026", "unforgettable"] },
  { id: "2", autor: "Carlos Mendoza", avatar: "CM", evento: "Torneo de Fútbol", caption: "La sección A nunca deja de sorprender ⚽🏆 Campeones merecidos", imageBg: "from-orange-600 to-amber-500", emoji: "⚽", likes: 47, comments: 23, liked: true, fecha: "hace 5 días", tags: ["futbol", "campeones", "seccionA"] },
  { id: "3", autor: "María López", avatar: "ML", evento: "Reunión de Directiva", caption: "Trabajando duro para que nuestra graduación sea la más especial 📋✨", imageBg: "from-cyan-600 to-teal-500", emoji: "📋", likes: 19, comments: 8, liked: false, fecha: "hace 1 semana", tags: ["directiva", "organizacion"] },
  { id: "4", autor: "Valentina Cruz", avatar: "VC", evento: "Kermés AURA 2026", caption: "Mi puesto de comida fue todo un éxito 🍕🌮 Gracias a todos por el apoyo", imageBg: "from-pink-600 to-rose-500", emoji: "🍕", likes: 61, comments: 15, liked: true, fecha: "hace 3 días", tags: ["kermes", "comida", "exito"] },
  { id: "5", autor: "Diego Alvarado", avatar: "DA", evento: "Torneo de Fútbol", caption: "Esa atajada en el último minuto 🧤 Los recuerdos que quedan para siempre", imageBg: "from-blue-600 to-indigo-500", emoji: "🧤", likes: 38, comments: 19, liked: false, fecha: "hace 5 días", tags: ["futbol", "porterazo"] },
  { id: "6", autor: "Sofia Reyes", avatar: "SR", evento: "Presentación de Cuadros", caption: "Nerviosa pero feliz. El escenario siempre ha sido mi lugar favorito 🎭", imageBg: "from-purple-600 to-violet-500", emoji: "🎭", likes: 52, comments: 27, liked: true, fecha: "hace 1 día", tags: ["teatro", "arte", "aura2026"] },
];

const albumes = [
  { titulo: "Kermés 2026", fotos: 24, emoji: "🎪", color: "from-violet-600 to-pink-500" },
  { titulo: "Torneo de Fútbol", fotos: 18, emoji: "⚽", color: "from-orange-600 to-amber-500" },
  { titulo: "Presentación de Cuadros", fotos: 31, emoji: "🎭", color: "from-purple-600 to-violet-500" },
  { titulo: "Reuniones", fotos: 9, emoji: "📋", color: "from-cyan-600 to-teal-500" },
];

export default function MemoriasPage() {
  const [posts, setPosts] = useState(postsData);
  const [vista, setVista] = useState<"feed" | "galeria" | "albumes">("feed");

  const toggleLike = (id: string) => {
    setPosts(prev => prev.map(p =>
      p.id === id ? { ...p, liked: !p.liked, likes: p.liked ? p.likes - 1 : p.likes + 1 } : p
    ));
  };

  return (
    <div className="min-h-screen">
      <Topbar title="Memorias" subtitle="Red social de la clase AURA 2026" />
      <div className="p-6 max-w-4xl mx-auto">
        {/* Tabs */}
        <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
          <div className="flex gap-2">
            {[
              { key: "feed", label: "Feed", icon: LayoutList },
              { key: "galeria", label: "Galería", icon: Grid3X3 },
              { key: "albumes", label: "Álbumes", icon: Camera },
            ].map(tab => (
              <button
                key={tab.key}
                onClick={() => setVista(tab.key as typeof vista)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium transition-all ${vista === tab.key ? "bg-violet-600 text-white" : "bg-[#13132b] text-slate-400 border border-[#1e1e4a] hover:text-white"}`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>
          <Button size="sm"><Plus className="w-4 h-4" /> Compartir</Button>
        </div>

        {/* Vista: Álbumes */}
        {vista === "albumes" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {albumes.map((album, i) => (
              <motion.div key={album.titulo} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.1 }}>
                <Card glow className="p-4 cursor-pointer hover:border-violet-500/40 transition-all text-center">
                  <div className={`w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br ${album.color} flex items-center justify-center text-3xl mb-3`}>
                    {album.emoji}
                  </div>
                  <p className="font-bold text-white text-sm">{album.titulo}</p>
                  <p className="text-xs text-slate-400 mt-1">{album.fotos} fotos</p>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Vista: Galería */}
        {vista === "galeria" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-3 gap-2">
            {posts.concat(posts).map((p, i) => (
              <motion.div
                key={`${p.id}-${i}`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.03 }}
                className={`aspect-square rounded-xl bg-gradient-to-br ${p.imageBg} flex items-center justify-center text-4xl cursor-pointer hover:opacity-80 transition-opacity relative group overflow-hidden`}
              >
                {p.emoji}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3 text-white text-sm font-semibold">
                  <span><Heart className="w-4 h-4 inline" /> {p.likes}</span>
                  <span><MessageCircle className="w-4 h-4 inline" /> {p.comments}</span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Vista: Feed */}
        {vista === "feed" && (
          <div className="space-y-5">
            <AnimatePresence>
              {posts.map((post, i) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                >
                  <Card glow className="p-0 overflow-hidden">
                    {/* Header del post */}
                    <div className="p-4 pb-3 flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-600 to-pink-500 flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                        {post.avatar}
                      </div>
                      <div className="flex-1">
                        <p className="font-bold text-white text-sm">{post.autor}</p>
                        <p className="text-xs text-slate-400">{post.evento} · {post.fecha}</p>
                      </div>
                    </div>

                    {/* Imagen */}
                    <div className={`h-56 bg-gradient-to-br ${post.imageBg} flex items-center justify-center text-7xl`}>
                      {post.emoji}
                    </div>

                    {/* Acciones */}
                    <div className="p-4">
                      <div className="flex items-center gap-4 mb-3">
                        <motion.button
                          whileTap={{ scale: 1.3 }}
                          onClick={() => toggleLike(post.id)}
                          className="flex items-center gap-1.5 text-sm transition-colors"
                        >
                          <Heart className={`w-5 h-5 transition-colors ${post.liked ? "text-pink-500 fill-pink-500" : "text-slate-400"}`} />
                          <span className={post.liked ? "text-pink-400" : "text-slate-400"}>{post.likes}</span>
                        </motion.button>
                        <button className="flex items-center gap-1.5 text-sm text-slate-400 hover:text-white transition-colors">
                          <MessageCircle className="w-5 h-5" />
                          <span>{post.comments}</span>
                        </button>
                        <button className="ml-auto text-slate-400 hover:text-white transition-colors">
                          <Share2 className="w-5 h-5" />
                        </button>
                      </div>
                      <p className="text-sm text-white leading-relaxed">{post.caption}</p>
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {post.tags.map(tag => (
                          <span key={tag} className="text-xs text-violet-400 hover:text-violet-300 cursor-pointer">#{tag}</span>
                        ))}
                      </div>

                      {/* Comentar */}
                      <div className="mt-3 flex gap-2">
                        <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-violet-600 to-pink-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">Tú</div>
                        <input
                          placeholder="Comenta algo..."
                          className="flex-1 bg-[#0a0a1e] border border-[#1e1e4a] rounded-xl px-3 py-1.5 text-xs text-white placeholder-slate-500 outline-none focus:border-violet-500 transition-colors"
                        />
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}
