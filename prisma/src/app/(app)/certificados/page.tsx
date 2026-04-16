"use client";
import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Award, Download, Plus, Star, Shield, Zap, Trophy, Printer } from "lucide-react";
import Topbar from "@/components/layout/Topbar";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

const plantillas = [
  { id: "participacion", titulo: "Participación", desc: "Para actividades y eventos", icon: Star, color: "from-blue-600 to-cyan-500", bg: "bg-blue-500/10", border: "border-blue-500/30" },
  { id: "logro", titulo: "Logro Académico", desc: "Reconocimiento al mérito", icon: Trophy, color: "from-yellow-600 to-amber-500", bg: "bg-yellow-500/10", border: "border-yellow-500/30" },
  { id: "deportivo", titulo: "Deportivo", desc: "Competencias y torneos", icon: Shield, color: "from-orange-600 to-red-500", bg: "bg-orange-500/10", border: "border-orange-500/30" },
  { id: "cultural", titulo: "Cultural/Artístico", desc: "Actividades culturales", icon: Zap, color: "from-purple-600 to-violet-500", bg: "bg-purple-500/10", border: "border-purple-500/30" },
];

const certificadosEmitidos = [
  { id: "1", estudiante: "Valentina Cruz", tipo: "logro", titulo: "Mejor Actriz - Cuadros 2026", fecha: "2026-03-22" },
  { id: "2", estudiante: "Carlos Mendoza", tipo: "deportivo", titulo: "MVP Torneo de Fútbol AURA 2026", fecha: "2026-03-08" },
  { id: "3", estudiante: "Ana García", tipo: "participacion", titulo: "Organizadora Principal - Kermés 2026", fecha: "2026-03-22" },
  { id: "4", estudiante: "Toda la Clase", tipo: "participacion", titulo: "Participación en Kermés AURA 2026", fecha: "2026-03-22" },
];

interface CertData {
  nombreEstudiante: string;
  titulo: string;
  descripcion: string;
  firmante: string;
  cargo: string;
  plantilla: string;
}

export default function CertificadosPage() {
  const [selected, setSelected] = useState("participacion");
  const [data, setData] = useState<CertData>({
    nombreEstudiante: "",
    titulo: "",
    descripcion: "",
    firmante: "Prof. Roberto Martínez",
    cargo: "Director Académico",
    plantilla: "participacion",
  });
  const certRef = useRef<HTMLDivElement>(null);

  const plantilla = plantillas.find(p => p.id === selected)!;

  const handleChange = (field: keyof CertData, value: string) => {
    setData(prev => ({ ...prev, [field]: value }));
  };

  const handlePrint = () => {
    const content = certRef.current?.innerHTML;
    if (!content) return;
    const win = window.open("", "_blank");
    if (!win) return;
    win.document.write(`
      <html><head><title>Certificado AURA 2026</title>
      <style>
        body { margin: 0; font-family: Georgia, serif; }
        * { box-sizing: border-box; }
      </style></head>
      <body>${content}</body></html>
    `);
    win.document.close();
    win.print();
  };

  const colorMap: Record<string, { border: string; accent: string; grad: string }> = {
    participacion: { border: "#0ea5e9", accent: "#0284c7", grad: "linear-gradient(135deg, #0c4a6e, #164e63)" },
    logro: { border: "#d97706", accent: "#b45309", grad: "linear-gradient(135deg, #451a03, #78350f)" },
    deportivo: { border: "#ea580c", accent: "#c2410c", grad: "linear-gradient(135deg, #431407, #7c2d12)" },
    cultural: { border: "#7c3aed", accent: "#6d28d9", grad: "linear-gradient(135deg, #2e1065, #4c1d95)" },
  };

  const cm = colorMap[selected];

  return (
    <div className="min-h-screen">
      <Topbar title="Certificados" subtitle="Generar y gestionar certificados" />
      <div className="p-6 max-w-7xl mx-auto space-y-6">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {/* Editor */}
          <div className="space-y-4">
            {/* Plantillas */}
            <Card glow>
              <CardHeader><CardTitle>Tipo de Certificado</CardTitle></CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  {plantillas.map(p => (
                    <motion.button
                      key={p.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => { setSelected(p.id); setData(d => ({ ...d, plantilla: p.id })); }}
                      className={`p-3 rounded-xl border text-left transition-all ${selected === p.id ? `${p.border} ${p.bg}` : "border-[#1e1e4a] bg-[#0a0a1e] hover:border-violet-500/30"}`}
                    >
                      <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${p.color} flex items-center justify-center mb-2`}>
                        <p.icon className="w-4 h-4 text-white" />
                      </div>
                      <p className="font-semibold text-white text-sm">{p.titulo}</p>
                      <p className="text-xs text-slate-400">{p.desc}</p>
                    </motion.button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Formulario */}
            <Card glow>
              <CardHeader><CardTitle>Datos del Certificado</CardTitle></CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { label: "Nombre del Estudiante", field: "nombreEstudiante" as keyof CertData, placeholder: "Ej: Ana García López" },
                    { label: "Título del Certificado", field: "titulo" as keyof CertData, placeholder: "Ej: Participación en Kermés 2026" },
                    { label: "Descripción", field: "descripcion" as keyof CertData, placeholder: "Por su destacada participación..." },
                    { label: "Nombre del Firmante", field: "firmante" as keyof CertData, placeholder: "Prof. ..." },
                    { label: "Cargo del Firmante", field: "cargo" as keyof CertData, placeholder: "Director Académico" },
                  ].map(f => (
                    <div key={f.field}>
                      <label className="text-xs text-slate-400 block mb-1">{f.label}</label>
                      <input
                        value={data[f.field]}
                        onChange={e => handleChange(f.field, e.target.value)}
                        placeholder={f.placeholder}
                        className="w-full bg-[#0a0a1e] border border-[#1e1e4a] rounded-xl px-3 py-2.5 text-sm text-white placeholder-slate-500 outline-none focus:border-violet-500 transition-colors"
                      />
                    </div>
                  ))}
                </div>
                <div className="flex gap-2 mt-4">
                  <Button className="flex-1 justify-center" onClick={handlePrint}>
                    <Printer className="w-4 h-4" /> Imprimir / PDF
                  </Button>
                  <Button variant="secondary" size="md">
                    <Download className="w-4 h-4" /> Guardar
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Preview del certificado */}
          <div>
            <Card glow>
              <CardHeader><CardTitle>Vista Previa</CardTitle></CardHeader>
              <CardContent>
                <div
                  ref={certRef}
                  style={{
                    background: cm.grad,
                    border: `3px solid ${cm.border}`,
                    borderRadius: "16px",
                    padding: "40px",
                    textAlign: "center",
                    fontFamily: "Georgia, serif",
                    minHeight: "400px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "16px",
                    color: "white",
                  }}
                >
                  {/* Logo/Sello */}
                  <div style={{ width: "80px", height: "80px", borderRadius: "50%", border: `3px solid ${cm.border}`, background: "rgba(255,255,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "32px" }}>
                    🎓
                  </div>

                  <div>
                    <p style={{ fontSize: "11px", letterSpacing: "4px", color: cm.border, textTransform: "uppercase", marginBottom: "4px" }}>Certificado de</p>
                    <h2 style={{ fontSize: "24px", fontWeight: "bold", margin: 0 }}>{plantilla.titulo}</h2>
                  </div>

                  <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.6)", margin: 0 }}>Se le otorga el presente certificado a:</p>

                  <div style={{ padding: "8px 32px", borderTop: `1px solid ${cm.border}`, borderBottom: `1px solid ${cm.border}` }}>
                    <h1 style={{ fontSize: "28px", fontWeight: "bold", margin: 0, color: cm.border }}>
                      {data.nombreEstudiante || "Nombre del Estudiante"}
                    </h1>
                  </div>

                  <div>
                    <p style={{ fontSize: "13px", fontWeight: "bold", margin: 0 }}>
                      {data.titulo || "Título del certificado"}
                    </p>
                    {data.descripcion && (
                      <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.6)", marginTop: "8px", maxWidth: "300px" }}>
                        {data.descripcion}
                      </p>
                    )}
                  </div>

                  <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.5)" }}>Tegucigalpa, M.D.C., {new Date().toLocaleDateString("es-HN", { day: "numeric", month: "long", year: "numeric" })}</p>

                  <div style={{ borderTop: `1px solid rgba(255,255,255,0.2)`, paddingTop: "12px", width: "200px" }}>
                    <p style={{ fontWeight: "bold", fontSize: "13px", margin: 0 }}>{data.firmante || "Nombre del Firmante"}</p>
                    <p style={{ fontSize: "10px", color: "rgba(255,255,255,0.5)", margin: 0 }}>{data.cargo}</p>
                  </div>

                  <p style={{ fontSize: "10px", color: "rgba(255,255,255,0.3)", letterSpacing: "2px" }}>AURA CLASS 2026 · SISTEMA DE GESTIÓN</p>
                </div>
              </CardContent>
            </Card>

            {/* Historial */}
            <Card glow className="mt-4">
              <CardHeader><CardTitle>Certificados Emitidos</CardTitle></CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {certificadosEmitidos.map((c, i) => (
                    <motion.div
                      key={c.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.07 }}
                      className="flex items-center gap-3 p-3 rounded-xl bg-[#0a0a1e] border border-[#1e1e4a] hover:border-violet-500/30 transition-all"
                    >
                      <Award className="w-8 h-8 text-violet-400 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-white truncate">{c.estudiante}</p>
                        <p className="text-xs text-slate-400 truncate">{c.titulo}</p>
                      </div>
                      <button className="text-slate-500 hover:text-violet-400 transition-colors flex-shrink-0">
                        <Download className="w-4 h-4" />
                      </button>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
