const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // Seed SalesCustomers
  const customers = await Promise.all([
    prisma.salesCustomer.upsert({
      where: { id: 1 },
      update: {},
      create: { name: 'Acme Corporation', industry: 'Technology', type: 'Enterprise', location: 'San Francisco, CA', email: 'john@acme.com', phone: '+1 (555) 123-4567', revenue: 485000, healthScore: 92, initials: 'AC', color: '#6366f1', lastContact: '2 days ago' },
    }),
    prisma.salesCustomer.upsert({
      where: { id: 2 },
      update: {},
      create: { name: 'GlobalTech Industries', industry: 'Manufacturing', type: 'Enterprise', location: 'New York, NY', email: 'sarah@globaltech.com', phone: '+1 (555) 234-5678', revenue: 320000, healthScore: 85, initials: 'GI', color: '#8b5cf6', lastContact: '1 week ago' },
    }),
    prisma.salesCustomer.upsert({
      where: { id: 3 },
      update: {},
      create: { name: 'Innovate Labs', industry: 'Healthcare', type: 'Growth', location: 'Boston, MA', email: 'michael@innovatelabs.com', phone: '+1 (555) 345-6789', revenue: 156000, healthScore: 78, initials: 'IL', color: '#10b981', lastContact: '3 days ago' },
    }),
    prisma.salesCustomer.upsert({
      where: { id: 4 },
      update: {},
      create: { name: 'DataStream Analytics', industry: 'Data Services', type: 'Growth', location: 'Austin, TX', email: 'emily@datastream.com', phone: '+1 (555) 456-7890', revenue: 98000, healthScore: 65, initials: 'DA', color: '#f59e0b', lastContact: '2 weeks ago' },
    }),
    prisma.salesCustomer.upsert({
      where: { id: 5 },
      update: {},
      create: { name: 'NextGen Solutions', industry: 'Finance', type: 'Starter', location: 'Chicago, IL', email: 'david@nextgen.com', phone: '+1 (555) 567-8901', revenue: 45000, healthScore: 88, initials: 'NS', color: '#06b6d4', lastContact: 'Yesterday' },
    }),
    prisma.salesCustomer.upsert({
      where: { id: 6 },
      update: {},
      create: { name: 'CloudFirst Inc', industry: 'Cloud Services', type: 'Enterprise', location: 'Seattle, WA', email: 'lisa@cloudfirst.com', phone: '+1 (555) 678-9012', revenue: 275000, healthScore: 95, initials: 'CI', color: '#ec4899', lastContact: 'Today' },
    }),
  ]);

  // Seed SalesDeals
  await Promise.all([
    prisma.salesDeal.upsert({ where: { id: 1 }, update: {}, create: { company: 'Acme Corporation', contact: 'John Smith', email: 'john@acme.com', value: 125000, stage: 'Negotiation', status: 'Won', rep: 'Sarah Chen', closeDate: new Date('2024-01-15'), customerId: 1 } }),
    prisma.salesDeal.upsert({ where: { id: 2 }, update: {}, create: { company: 'TechStart Inc', contact: 'Lisa Wong', email: 'lisa@techstart.io', value: 89500, stage: 'Proposal', status: 'Pending', rep: 'Mike Johnson', closeDate: new Date('2024-01-22') } }),
    prisma.salesDeal.upsert({ where: { id: 3 }, update: {}, create: { company: 'GlobalFin Partners', contact: 'Robert Davis', email: 'rdavis@globalfin.com', value: 245000, stage: 'Qualified', status: 'Pending', rep: 'Emily Davis', closeDate: new Date('2024-02-01'), customerId: 2 } }),
    prisma.salesDeal.upsert({ where: { id: 4 }, update: {}, create: { company: 'DataSync Solutions', contact: 'Emma Wilson', email: 'emma@datasync.net', value: 67800, stage: 'Lead', status: 'Lost', rep: 'James Wilson', closeDate: new Date('2024-01-10') } }),
    prisma.salesDeal.upsert({ where: { id: 5 }, update: {}, create: { company: 'CloudBase Ltd', contact: 'Michael Chen', email: 'm.chen@cloudbase.io', value: 178000, stage: 'Negotiation', status: 'Won', rep: 'Sarah Chen', closeDate: new Date('2024-01-18') } }),
    prisma.salesDeal.upsert({ where: { id: 6 }, update: {}, create: { company: 'Innovate Labs', contact: 'Jennifer Park', email: 'jpark@innovate.co', value: 156000, stage: 'Proposal', status: 'Pending', rep: 'Lisa Park', closeDate: new Date('2024-01-28'), customerId: 3 } }),
    prisma.salesDeal.upsert({ where: { id: 7 }, update: {}, create: { company: 'NextGen Systems', contact: 'David Lee', email: 'david@nextgen.tech', value: 203000, stage: 'Qualified', status: 'Pending', rep: 'Mike Johnson', closeDate: new Date('2024-02-05'), customerId: 5 } }),
    prisma.salesDeal.upsert({ where: { id: 8 }, update: {}, create: { company: 'Prime Analytics', contact: 'Sarah Johnson', email: 'sj@primeanalytics.com', value: 94500, stage: 'Lead', status: 'Pending', rep: 'Emily Davis', closeDate: new Date('2024-02-10') } }),
    prisma.salesDeal.upsert({ where: { id: 9 }, update: {}, create: { company: 'CloudFirst Inc', contact: 'Lisa Anderson', email: 'lisa@cloudfirst.com', value: 275000, stage: 'Negotiation', status: 'Pending', rep: 'Lisa Park', closeDate: new Date('2024-02-15'), customerId: 6 } }),
    prisma.salesDeal.upsert({ where: { id: 10 }, update: {}, create: { company: 'Vertex Corp', contact: 'Mark Torres', email: 'mtorres@vertex.com', value: 312000, stage: 'Proposal', status: 'Pending', rep: 'Sarah Chen', closeDate: new Date('2024-02-20') } }),
    prisma.salesDeal.upsert({ where: { id: 11 }, update: {}, create: { company: 'Apex Systems', contact: 'Carol Kim', email: 'carol@apex.io', value: 89000, stage: 'Lead', status: 'Pending', rep: 'James Wilson', closeDate: new Date('2024-03-01') } }),
    prisma.salesDeal.upsert({ where: { id: 12 }, update: {}, create: { company: 'BlueSky Tech', contact: 'Ryan Park', email: 'ryan@bluesky.io', value: 145000, stage: 'Qualified', status: 'Won', rep: 'Mike Johnson', closeDate: new Date('2024-01-30') } }),
    prisma.salesDeal.upsert({ where: { id: 13 }, update: {}, create: { company: 'DataStream Analytics', contact: 'Emily Chen', email: 'emily@datastream.com', value: 98000, stage: 'Qualified', status: 'Pending', rep: 'Emily Davis', closeDate: new Date('2024-02-25'), customerId: 4 } }),
  ]);

  // Seed SalesTeamMembers
  await Promise.all([
    prisma.salesTeamMember.upsert({ where: { id: 1 }, update: {}, create: { name: 'Sarah Chen', email: 'sarah.chen@company.com', role: 'Senior Account Executive', initials: 'SC', color: '#10b981', territory: 'West Coast', deals: 24, revenue: 487500, growth: '+15%', joinDate: new Date('2022-03-15') } }),
    prisma.salesTeamMember.upsert({ where: { id: 2 }, update: {}, create: { name: 'Mike Johnson', email: 'mike.johnson@company.com', role: 'Account Executive', initials: 'MJ', color: '#06b6d4', territory: 'Midwest', deals: 19, revenue: 356200, growth: '+8%', joinDate: new Date('2022-07-01') } }),
    prisma.salesTeamMember.upsert({ where: { id: 3 }, update: {}, create: { name: 'Emily Davis', email: 'emily.davis@company.com', role: 'Account Executive', initials: 'ED', color: '#8b5cf6', territory: 'East Coast', deals: 17, revenue: 312800, growth: '+12%', joinDate: new Date('2023-01-10') } }),
    prisma.salesTeamMember.upsert({ where: { id: 4 }, update: {}, create: { name: 'James Wilson', email: 'james.wilson@company.com', role: 'Sales Development Rep', initials: 'JW', color: '#f59e0b', territory: 'South', deals: 15, revenue: 289400, growth: '+5%', joinDate: new Date('2023-04-01') } }),
    prisma.salesTeamMember.upsert({ where: { id: 5 }, update: {}, create: { name: 'Lisa Park', email: 'lisa.park@company.com', role: 'Account Executive', initials: 'LP', color: '#ec4899', territory: 'Pacific Northwest', deals: 14, revenue: 267100, growth: '+9%', joinDate: new Date('2023-06-15') } }),
  ]);

  console.log('✅ SalesOps seed data inserted.');
}

main().catch(e => { console.error(e); process.exit(1); }).finally(() => prisma.$disconnect());
