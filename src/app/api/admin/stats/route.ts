import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const [
      totalEstudiantes,
      cuotas,
      actividades,
      presupuesto,
      patrocinadores,
      avisos,
      certificados,
    ] = await Promise.all([
      prisma.user.count({ where: { role: "estudiante" } }),
      prisma.cuota.findMany(),
      prisma.actividad.findMany({ orderBy: { fecha: "asc" } }),
      prisma.presupuesto.findMany(),
      prisma.patrocinador.findMany({ where: { visible: true } }),
      prisma.aviso.count({ where: { visible: true } }),
      prisma.certificado.count(),
    ]);

    const totalRecaudadoCuotas = cuotas.reduce((a, c) => a + c.pagado, 0);
    const totalPendienteCuotas = cuotas.reduce((a, c) => a + (c.monto - c.pagado), 0);
    const cuotasPagadas = cuotas.filter(c => c.estado === "pagado").length;
    const cuotasPendientes = cuotas.filter(c => c.estado === "pendiente").length;

    const totalIngresos = presupuesto.filter(p => p.tipo === "ingreso").reduce((a, p) => a + p.monto, 0);
    const totalEgresos = presupuesto.filter(p => p.tipo === "egreso").reduce((a, p) => a + p.monto, 0);

    const proximasActividades = actividades.filter(a => a.estado === "proxima");
    const actividadesCompletadas = actividades.filter(a => a.estado === "completada").length;

    // Cuotas por mes (para chart)
    const cuotasPorMes: Record<string, number> = {};
    for (const c of cuotas) {
      const key = `${c.mes} ${c.anio}`;
      cuotasPorMes[key] = (cuotasPorMes[key] ?? 0) + c.pagado;
    }

    // Ingresos vs egresos por categoria
    const ingresosPorCat: Record<string, number> = {};
    const egresosPorCat: Record<string, number> = {};
    for (const p of presupuesto) {
      if (p.tipo === "ingreso") ingresosPorCat[p.categoria] = (ingresosPorCat[p.categoria] ?? 0) + p.monto;
      else egresosPorCat[p.categoria] = (egresosPorCat[p.categoria] ?? 0) + p.monto;
    }

    return NextResponse.json({
      totalEstudiantes,
      totalRecaudadoCuotas,
      totalPendienteCuotas,
      cuotasPagadas,
      cuotasPendientes,
      totalIngresos,
      totalEgresos,
      saldo: totalIngresos - totalEgresos,
      proximasActividades: proximasActividades.length,
      actividadesCompletadas,
      totalPatrocinadores: patrocinadores.length,
      totalAuspiciado: patrocinadores.reduce((a, p) => a + p.monto, 0),
      totalAvisos: avisos,
      totalCertificados: certificados,
      cuotasPorMes: Object.entries(cuotasPorMes).map(([mes, total]) => ({ mes, total })),
      ingresosPorCat: Object.entries(ingresosPorCat).map(([cat, total]) => ({ cat, total })),
      egresosPorCat: Object.entries(egresosPorCat).map(([cat, total]) => ({ cat, total })),
      proximaActividad: proximasActividades[0] ?? null,
      topPatrocinador: patrocinadores.sort((a, b) => b.monto - a.monto)[0] ?? null,
    });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
