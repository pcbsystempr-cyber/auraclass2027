"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DollarSign, CheckCircle2, Clock, AlertCircle, Plus, Filter, Download, Search } from "lucide-react";
import Topbar from "@/components/layout/Topbar";
import { Card, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { formatCurrency, MESES } from "@/lib/utils";

const estudiantes = [
  { id: "1", name: "Ana García", seccion: "A", cuotas: { enero: "pagado", febrero: "pagado", marzo: "pendiente", abril: "pendiente" } },
  { id: "2", name: "Carlos Mendoza", seccion: "A", cuotas: { enero: "pagado", febrero: "parcial", marzo: "pendiente", abril: "pendiente" } },
  { id: "3", name: "María López", seccion: "B", cuotas: { enero: "pagado", febrero: "pagado", marzo: "pagado", abril: "pagado" } },
  { id: "4", name: "Luis Torres", seccion: "B", cuotas: { enero: "pagado", febrero: "pendiente", marzo: "pendiente", abril: "pendiente" } },
  { id: "5", name: "Sofia Reyes", seccion: "A", cuotas: { enero: "pagado", febrero: "pagado", marzo: "pagado", abril: "pendiente" } },
  { id: "6", name: "Diego Alvarado", seccion: "C", cuotas: { enero: "pendiente", febrero: "pendiente", marzo: "pendiente", abril: "pendiente" } },
  { id: "7", name: "Valentina Cruz", seccion: "C", cuotas: { enero: "pagado", febrero: "pagado", marzo: "pagado", abril: "pagado" } },
  { id: "8", name: "Roberto Flores", seccion: "B", cuotas: { enero: "pagado", febrero: "pagado", marzo: "parcial", abril: "pendiente" } },
];

const mesesActivos = ["enero", "febrero", "marzo", "abril"];
const montoPorCuota = 250;

type EstadoCuota = "pagado" | "parcial" | "pendiente";

const estadoConfig: Record<EstadoCuota, { icon: React.ElementType; bg: string; text: string; label: string }> = {
  pagado: { icon: CheckCircle2, bg: "bg-emerald-500/20", text: "text-emerald-400", label: "Pagado" },
  parcial: { icon: Clock, bg: "bg-yellow-500/20", text: "text-yellow-400", label: "Parcial" },
  pendiente: { icon: AlertCircle, bg: "bg-red-500/20", text: "text-red-400", label: "Pendiente" },
};

export default function CuotasPage() {
  const [search, setSearch] = useState("");
  const [filtro, setFiltro] = useState("todos");
  const [selectedStudent, setSelectedStudent] = useState<string | null>(null);

  const totales = {
    recaudado: estudiantes.reduce((acc, est) => {
      return acc + mesesActivos.filter(m => est.cuotas[m as keyof typeof est.cuotas] === "pagado").length * montoPorCuota;
    }, 0),
    pendiente: estudiantes.reduce((acc, est) => {
      return acc + mesesActivos.filter(m => est.cuotas[m as keyof typeof est.cuotas] === "pendiente").length * montoPorCuota;
    }, 0),
    total: estudiantes.length * mesesActivos.length * montoPorCuota,
  };

  const filtered = estudiantes.filter(e => {
    const matchSearch = e.name.toLowerCase().includes(search.toLowerCase());
    const matchFiltro = filtro === "todos" || e.seccion === filtro;
    return matchSearch && matchFiltro;
  });

  return (
    <div className="min-h-screen">
      <Topbar title="Cuotas" subtitle="Gestión de pagos de la clase" />
      <div className="p-6 max-w-7xl mx-auto">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {[
            { label: "Total Recaudado", value: formatCurrency(totales.recaudado), icon: CheckCircle2, color: "from-emerald-600 to-green-500", perc: Math.round((totales.recaudado / totales.total) * 100) },
            { label: "Pendiente", value: formatCurrency(totales.pendiente), icon: AlertCircle, color: "from-red-600 to-rose-500", perc: Math.round((totales.pendiente / totales.total) * 100) },
            { label: "Meta Total", value: formatCurrency(totales.total), icon: DollarSign, color: "from-violet-600 to-purple-500", perc: 100 },
          ].map((stat) => (
            <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <Card glow>
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-slate-400">{stat.label}</p>
                    <p className="text-xl font-black text-white">{stat.value}</p>
                    <div className="progress-bar mt-1.5">
                      <motion.div
                        className="progress-bar-fill"
                        initial={{ width: "0%" }}
                        animate={{ width: `${stat.perc}%` }}
                        transition={{ duration: 1, delay: 0.3 }}
                      />
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Tabla */}
        <Card>
          <CardHeader>
            <CardTitle>Control de Cuotas</CardTitle>
            <div className="flex items-center gap-2 flex-wrap">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="Buscar estudiante..."
                  className="bg-[#0a0a1e] border border-[#1e1e4a] rounded-xl pl-9 pr-3 py-2 text-sm text-white placeholder-slate-500 outline-none focus:border-violet-500 w-48"
                />
              </div>
              <select
                value={filtro}
                onChange={e => setFiltro(e.target.value)}
                className="bg-[#0a0a1e] border border-[#1e1e4a] rounded-xl px-3 py-2 text-sm text-white outline-none focus:border-violet-500"
              >
                <option value="todos">Todas las secciones</option>
                <option value="A">Sección A</option>
                <option value="B">Sección B</option>
                <option value="C">Sección C</option>
              </select>
              <Button variant="secondary" size="sm">
                <Download className="w-4 h-4" /> Exportar
              </Button>
              <Button size="sm">
                <Plus className="w-4 h-4" /> Registrar Pago
              </Button>
            </div>
          </CardHeader>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#1e1e4a]">
                  <th className="text-left py-3 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Estudiante</th>
                  {mesesActivos.map(mes => (
                    <th key={mes} className="text-center py-3 px-3 text-xs font-semibold text-slate-400 uppercase tracking-wider capitalize">{mes}</th>
                  ))}
                  <th className="text-center py-3 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1e1e4a]">
                <AnimatePresence>
                  {filtered.map((est, i) => {
                    const pagados = mesesActivos.filter(m => est.cuotas[m as keyof typeof est.cuotas] === "pagado").length;
                    return (
                      <motion.tr
                        key={est.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className="hover:bg-white/2 transition-colors cursor-pointer"
                        onClick={() => setSelectedStudent(est.id === selectedStudent ? null : est.id)}
                      >
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-600 to-pink-500 flex items-center justify-center text-white text-xs font-bold">
                              {est.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                            </div>
                            <div>
                              <p className="text-sm font-medium text-white">{est.name}</p>
                              <p className="text-xs text-slate-400">Sección {est.seccion}</p>
                            </div>
                          </div>
                        </td>
                        {mesesActivos.map(mes => {
                          const estado = est.cuotas[mes as keyof typeof est.cuotas] as EstadoCuota;
                          const cfg = estadoConfig[estado];
                          return (
                            <td key={mes} className="py-3 px-3">
                              <div className="flex justify-center">
                                <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium ${cfg.bg} ${cfg.text}`}>
                                  <cfg.icon className="w-3 h-3" />
                                  <span className="hidden sm:inline">{cfg.label}</span>
                                </span>
                              </div>
                            </td>
                          );
                        })}
                        <td className="py-3 px-4 text-center">
                          <span className="text-sm font-bold text-white">{formatCurrency(pagados * montoPorCuota)}</span>
                          <p className="text-xs text-slate-400">{pagados}/{mesesActivos.length} meses</p>
                        </td>
                      </motion.tr>
                    );
                  })}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
}
