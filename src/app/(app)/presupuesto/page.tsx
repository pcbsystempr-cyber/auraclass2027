"use client";
import { motion } from "framer-motion";
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from "recharts";
import { TrendingUp, TrendingDown, Target, Zap, DollarSign, Plus } from "lucide-react";
import Topbar from "@/components/layout/Topbar";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { formatCurrency } from "@/lib/utils";

const ingresos = [
  { mes: "Ene", cuotas: 9800, actividades: 3200, otros: 800 },
  { mes: "Feb", cuotas: 10200, actividades: 5100, otros: 1200 },
  { mes: "Mar", cuotas: 9500, actividades: 4200, otros: 600 },
  { mes: "Abr", cuotas: 8900, actividades: 6800, otros: 1500 },
  { mes: "May", cuotas: 11000, actividades: 3900, otros: 900 },
  { mes: "Jun", cuotas: 10500, actividades: 7200, otros: 2100 },
];

const egresos = [
  { categoria: "Decoración", monto: 12500, color: "#7c3aed" },
  { categoria: "Transporte", monto: 8900, color: "#ec4899" },
  { categoria: "Comida", monto: 6700, color: "#06b6d4" },
  { categoria: "Foto/Video", monto: 5400, color: "#f59e0b" },
  { categoria: "Extras", monto: 3200, color: "#10b981" },
];

const metas = [
  { label: "Recaudación Total", actual: 45200, meta: 80000, color: "#7c3aed" },
  { label: "Fondo Graduación", actual: 22000, meta: 35000, color: "#ec4899" },
  { label: "Excursión Final", actual: 15000, meta: 20000, color: "#06b6d4" },
  { label: "Anuario Digital", actual: 8200, meta: 12000, color: "#f59e0b" },
];

const transacciones = [
  { tipo: "ingreso", concepto: "Cuotas Febrero", monto: 10200, fecha: "28 Feb", cat: "cuotas" },
  { tipo: "egreso", concepto: "Alquiler local baile", monto: -3500, fecha: "25 Feb", cat: "actividades" },
  { tipo: "ingreso", concepto: "Venta tickets kermés", monto: 5100, fecha: "20 Feb", cat: "actividades" },
  { tipo: "egreso", concepto: "Materiales decoración", monto: -1800, fecha: "15 Feb", cat: "decoracion" },
  { tipo: "ingreso", concepto: "Cuotas Marzo", monto: 9500, fecha: "1 Mar", cat: "cuotas" },
  { tipo: "egreso", concepto: "Transporte excursión", monto: -4200, fecha: "10 Mar", cat: "transporte" },
];

const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: { name: string; value: number; color: string }[]; label?: string }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#13132b] border border-[#1e1e4a] rounded-xl p-3 shadow-xl">
        <p className="text-xs text-slate-400 mb-2">{label}</p>
        {payload.map((p, i) => (
          <p key={i} className="text-sm font-semibold" style={{ color: p.color }}>
            {p.name}: {formatCurrency(p.value)}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function PresupuestoPage() {
  const totalIngresos = 45200;
  const totalEgresos = 36700;
  const saldo = totalIngresos - totalEgresos;

  return (
    <div className="min-h-screen">
      <Topbar title="Presupuesto" subtitle="Infograma financiero de la clase" />
      <div className="p-6 max-w-7xl mx-auto space-y-6">
        {/* KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { label: "Total Ingresos", value: totalIngresos, icon: TrendingUp, color: "from-emerald-600 to-green-500", sign: "+" },
            { label: "Total Egresos", value: totalEgresos, icon: TrendingDown, color: "from-red-600 to-rose-500", sign: "-" },
            { label: "Saldo Actual", value: saldo, icon: DollarSign, color: "from-violet-600 to-purple-500", sign: "" },
          ].map((kpi, i) => (
            <motion.div key={kpi.label} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.1 }}>
              <Card glow>
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${kpi.color} flex items-center justify-center`}>
                    <kpi.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400">{kpi.label}</p>
                    <p className="text-2xl font-black text-white">{kpi.sign}{formatCurrency(kpi.value)}</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Gráfica de área */}
          <Card glow className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Ingresos por Mes</CardTitle>
              <Button size="sm" variant="secondary"><Plus className="w-3 h-3" /> Registrar</Button>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={220}>
                <AreaChart data={ingresos}>
                  <defs>
                    <linearGradient id="cuotasGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#7c3aed" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#7c3aed" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="actGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ec4899" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#ec4899" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e1e4a" />
                  <XAxis dataKey="mes" tick={{ fill: "#64748b", fontSize: 12 }} />
                  <YAxis tick={{ fill: "#64748b", fontSize: 11 }} tickFormatter={(v) => `L.${(v / 1000).toFixed(0)}k`} />
                  <Tooltip content={<CustomTooltip />} />
                  <Area type="monotone" dataKey="cuotas" name="Cuotas" stroke="#7c3aed" fill="url(#cuotasGrad)" strokeWidth={2} />
                  <Area type="monotone" dataKey="actividades" name="Actividades" stroke="#ec4899" fill="url(#actGrad)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Pie de egresos */}
          <Card glow>
            <CardHeader><CardTitle>Egresos</CardTitle></CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={180}>
                <PieChart>
                  <Pie data={egresos} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="monto" nameKey="categoria">
                    {egresos.map((entry, i) => (
                      <Cell key={i} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(v) => formatCurrency(v as number)} contentStyle={{ background: "#13132b", border: "1px solid #1e1e4a", borderRadius: "12px" }} />
                </PieChart>
              </ResponsiveContainer>
              <div className="space-y-2 mt-2">
                {egresos.map((e) => (
                  <div key={e.categoria} className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full" style={{ background: e.color }} />
                      <span className="text-slate-300">{e.categoria}</span>
                    </div>
                    <span className="text-white font-medium">{formatCurrency(e.monto)}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Metas con barras animadas */}
        <Card glow>
          <CardHeader>
            <CardTitle><Target className="w-5 h-5 text-violet-400 inline mr-2" />Metas de Recaudación</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {metas.map((meta, i) => {
                const perc = Math.round((meta.actual / meta.meta) * 100);
                return (
                  <motion.div key={meta.label} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}>
                    <div className="flex justify-between items-end mb-2">
                      <div>
                        <p className="text-sm font-semibold text-white">{meta.label}</p>
                        <p className="text-xs text-slate-400">{formatCurrency(meta.actual)} de {formatCurrency(meta.meta)}</p>
                      </div>
                      <span className="text-lg font-black" style={{ color: meta.color }}>{perc}%</span>
                    </div>
                    <div className="h-3 bg-[#1e1e4a] rounded-full overflow-hidden">
                      <motion.div
                        className="h-full rounded-full"
                        style={{ background: `linear-gradient(90deg, ${meta.color}99, ${meta.color})` }}
                        initial={{ width: "0%" }}
                        animate={{ width: `${perc}%` }}
                        transition={{ duration: 1.2, delay: 0.3 + i * 0.15, ease: "easeOut" }}
                      />
                    </div>
                    {perc >= 100 && (
                      <p className="text-xs text-emerald-400 mt-1 flex items-center gap-1">
                        <Zap className="w-3 h-3" /> ¡Meta alcanzada!
                      </p>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Últimas transacciones */}
        <Card glow>
          <CardHeader>
            <CardTitle>Últimas Transacciones</CardTitle>
            <Button size="sm"><Plus className="w-3 h-3" /> Nueva</Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {transacciones.map((t, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-center justify-between p-3 rounded-xl bg-[#0a0a1e] border border-[#1e1e4a] hover:border-violet-500/30 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${t.tipo === "ingreso" ? "bg-emerald-500/20" : "bg-red-500/20"}`}>
                      {t.tipo === "ingreso" ? <TrendingUp className="w-4 h-4 text-emerald-400" /> : <TrendingDown className="w-4 h-4 text-red-400" />}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">{t.concepto}</p>
                      <p className="text-xs text-slate-400">{t.fecha}</p>
                    </div>
                  </div>
                  <span className={`text-sm font-bold ${t.tipo === "ingreso" ? "text-emerald-400" : "text-red-400"}`}>
                    {t.tipo === "ingreso" ? "+" : ""}{formatCurrency(Math.abs(t.monto))}
                  </span>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
