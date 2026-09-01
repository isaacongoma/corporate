import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  const [deals, customers, teamMembers] = await Promise.all([
    prisma.salesDeal.findMany(),
    prisma.salesCustomer.findMany(),
    prisma.salesTeamMember.findMany({ orderBy: { revenue: 'desc' }, take: 5 }),
  ]);

  const wonDeals = deals.filter(d => d.status === 'Won');
  const totalRevenue = wonDeals.reduce((s, d) => s + d.value, 0);
  const totalDeals = deals.length;
  const conversionRate = totalDeals > 0 ? ((wonDeals.length / totalDeals) * 100).toFixed(1) : 0;
  const activeDeals = deals.filter(d => d.status === 'Pending').length;
  const newLeads = deals.filter(d => d.stage === 'Lead').length;

  // Pipeline distribution
  const stages = ['Lead', 'Qualified', 'Proposal', 'Negotiation'];
  const stageColors = { Lead: '#06b6d4', Qualified: '#10b981', Proposal: '#f59e0b', Negotiation: '#10b981' };
  const stageCounts = stages.map(stage => ({
    label: stage,
    count: deals.filter(d => d.stage === stage).length,
    color: stageColors[stage],
  }));
  const totalPipelineCount = stageCounts.reduce((s, st) => s + st.count, 0);
  const pipelineStages = stageCounts.map(s => ({
    ...s,
    pct: totalPipelineCount > 0 ? Math.round((s.count / totalPipelineCount) * 100) : 0,
  }));
  const totalPipelineValue = deals.filter(d => d.status === 'Pending').reduce((s, d) => s + d.value, 0);

  // Recent deals (last 5 updated)
  const recentDeals = deals
    .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
    .slice(0, 5)
    .map(d => ({
      company: d.company,
      rep: d.rep,
      value: d.value,
      status: d.status,
      ago: timeAgo(d.updatedAt),
      initial: d.company[0].toUpperCase(),
    }));

  return NextResponse.json({
    kpis: {
      totalRevenue,
      conversionRate: Number(conversionRate),
      activeDeals,
      newLeads,
      totalCustomers: customers.length,
      avgHealthScore: customers.length
        ? Math.round(customers.reduce((s, c) => s + c.healthScore, 0) / customers.length)
        : 0,
    },
    pipelineStages,
    totalPipelineValue,
    recentDeals,
    topPerformers: teamMembers,
  });
}

function timeAgo(date) {
  const diff = Date.now() - new Date(date).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins} min${mins !== 1 ? 's' : ''} ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs} hour${hrs !== 1 ? 's' : ''} ago`;
  const days = Math.floor(hrs / 24);
  if (days < 7) return `${days} day${days !== 1 ? 's' : ''} ago`;
  return new Date(date).toLocaleDateString();
}
