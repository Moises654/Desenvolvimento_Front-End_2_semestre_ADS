// Dados simulados para desenvolvimento e testes

// Técnicos
export const technicians = [
  {
    id: 1,
    name: 'João Silva',
    email: 'joao.silva@empresa.com',
    phone: '(11) 99999-1111',
    specialty: 'Mecânica Industrial',
    level: 'Sênior',
    active: true,
    avatar: null
  },
  {
    id: 2,
    name: 'Maria Santos',
    email: 'maria.santos@empresa.com',
    phone: '(11) 99999-2222',
    specialty: 'Sistemas Hidráulicos',
    level: 'Pleno',
    active: true,
    avatar: null
  },
  {
    id: 3,
    name: 'Carlos Oliveira',
    email: 'carlos.oliveira@empresa.com',
    phone: '(11) 99999-3333',
    specialty: 'Eletrônica Industrial',
    level: 'Júnior',
    active: true,
    avatar: null
  },
  {
    id: 4,
    name: 'Ana Costa',
    email: 'ana.costa@empresa.com',
    phone: '(11) 99999-4444',
    specialty: 'Pneumática',
    level: 'Sênior',
    active: true,
    avatar: null
  }
]

// Máquinas
export const machines = [
  {
    id: 1,
    code: 'TNC-001',
    name: 'Torno CNC-001',
    type: 'Torno',
    manufacturer: 'Romi',
    model: 'GL240M',
    serialNumber: 'TNC240001',
    acquisitionDate: '2020-03-15',
    location: 'Setor A - Linha 1',
    status: 'Operacional',
    lastMaintenance: '2025-08-15',
    nextMaintenance: '2025-09-15',
    maintenanceInterval: 30, // dias
    specifications: {
      power: '15 kW',
      weight: '3500 kg',
      dimensions: '4.2m x 2.1m x 2.3m'
    }
  },
  {
    id: 2,
    code: 'PRS-003',
    name: 'Prensa P-003',
    type: 'Prensa',
    manufacturer: 'Schuler',
    model: 'MSP-630',
    serialNumber: 'MSP630003',
    acquisitionDate: '2019-07-20',
    location: 'Setor B - Linha 2',
    status: 'Manutenção',
    lastMaintenance: '2025-08-10',
    nextMaintenance: '2025-09-10',
    maintenanceInterval: 45,
    specifications: {
      power: '25 kW',
      weight: '8500 kg',
      dimensions: '5.5m x 3.2m x 4.1m'
    }
  },
  {
    id: 3,
    code: 'FRS-002',
    name: 'Fresadora F-002',
    type: 'Fresadora',
    manufacturer: 'DMG Mori',
    model: 'NVX5000',
    serialNumber: 'NVX5000002',
    acquisitionDate: '2021-11-10',
    location: 'Setor A - Linha 3',
    status: 'Operacional',
    lastMaintenance: '2025-08-12',
    nextMaintenance: '2025-09-12',
    maintenanceInterval: 30,
    specifications: {
      power: '18 kW',
      weight: '4200 kg',
      dimensions: '4.8m x 2.5m x 2.8m'
    }
  },
  {
    id: 4,
    code: 'CMP-001',
    name: 'Compressor C-001',
    type: 'Compressor',
    manufacturer: 'Atlas Copco',
    model: 'GA22',
    serialNumber: 'GA22001',
    acquisitionDate: '2018-05-25',
    location: 'Casa de Máquinas',
    status: 'Operacional',
    lastMaintenance: '2025-07-28',
    nextMaintenance: '2025-08-28',
    maintenanceInterval: 15,
    specifications: {
      power: '22 kW',
      weight: '850 kg',
      dimensions: '2.1m x 1.2m x 1.8m'
    }
  }
]

// Manutenções
export const maintenances = [
  {
    id: 1,
    machine: machines[0],
    machineId: 1,
    type: 'Preventiva',
    status: 'Concluída',
    priority: 'Média',
    scheduledDate: '2025-08-20',
    startDate: '2025-08-20',
    endDate: '2025-08-20',
    technician: technicians[0],
    technicianId: 1,
    description: 'Lubrificação geral e verificação de componentes',
    activities: [
      'Lubrificação dos mancais',
      'Verificação do sistema de refrigeração',
      'Inspeção visual dos componentes',
      'Teste de funcionamento'
    ],
    materials: [
      { name: 'Óleo lubrificante SAE 20W', quantity: 2, unit: 'litros' },
      { name: 'Filtro de óleo', quantity: 1, unit: 'unidade' }
    ],
    cost: 150.50,
    duration: 240, // minutos
    notes: 'Máquina em perfeito estado de funcionamento',
    attachments: []
  },
  {
    id: 2,
    machine: machines[1],
    machineId: 2,
    type: 'Corretiva',
    status: 'Pendente',
    priority: 'Alta',
    scheduledDate: '2025-08-25',
    startDate: null,
    endDate: null,
    technician: technicians[1],
    technicianId: 2,
    description: 'Troca de vedações hidráulicas',
    activities: [
      'Desmontagem do cilindro hidráulico',
      'Substituição das vedações',
      'Teste de pressão',
      'Remontagem e calibração'
    ],
    materials: [
      { name: 'Kit de vedações hidráulicas', quantity: 1, unit: 'kit' },
      { name: 'Óleo hidráulico ISO 32', quantity: 5, unit: 'litros' }
    ],
    cost: 450.75,
    duration: 480,
    notes: 'Vazamento detectado no cilindro principal',
    attachments: []
  },
  {
    id: 3,
    machine: machines[2],
    machineId: 3,
    type: 'Preventiva',
    status: 'Em Andamento',
    priority: 'Baixa',
    scheduledDate: '2025-08-22',
    startDate: '2025-08-22',
    endDate: null,
    technician: technicians[2],
    technicianId: 3,
    description: 'Calibração e ajustes de precisão',
    activities: [
      'Calibração dos eixos X, Y, Z',
      'Verificação da precisão dimensional',
      'Ajuste dos sensores de posição',
      'Atualização de software'
    ],
    materials: [
      { name: 'Padrão de calibração', quantity: 1, unit: 'unidade' }
    ],
    cost: 200.00,
    duration: 360,
    notes: 'Calibração em andamento, 60% concluída',
    attachments: []
  },
  {
    id: 4,
    machine: machines[3],
    machineId: 4,
    type: 'Preventiva',
    status: 'Agendada',
    priority: 'Média',
    scheduledDate: '2025-08-28',
    startDate: null,
    endDate: null,
    technician: technicians[3],
    technicianId: 4,
    description: 'Troca de filtros e verificação de pressão',
    activities: [
      'Substituição do filtro de ar',
      'Troca do filtro de óleo',
      'Verificação da pressão de trabalho',
      'Limpeza do sistema de refrigeração'
    ],
    materials: [
      { name: 'Filtro de ar', quantity: 1, unit: 'unidade' },
      { name: 'Filtro de óleo', quantity: 1, unit: 'unidade' },
      { name: 'Fluido refrigerante', quantity: 3, unit: 'litros' }
    ],
    cost: 180.30,
    duration: 180,
    notes: 'Manutenção preventiva programada',
    attachments: []
  },
  {
    id: 5,
    machine: machines[0],
    machineId: 1,
    type: 'Corretiva',
    status: 'Concluída',
    priority: 'Alta',
    scheduledDate: '2025-08-18',
    startDate: '2025-08-18',
    endDate: '2025-08-18',
    technician: technicians[0],
    technicianId: 1,
    description: 'Reparo do sistema de refrigeração',
    activities: [
      'Diagnóstico da falha',
      'Substituição da bomba de refrigeração',
      'Teste do sistema',
      'Verificação de temperatura'
    ],
    materials: [
      { name: 'Bomba de refrigeração', quantity: 1, unit: 'unidade' },
      { name: 'Fluido refrigerante', quantity: 5, unit: 'litros' }
    ],
    cost: 750.00,
    duration: 300,
    notes: 'Sistema de refrigeração totalmente restaurado',
    attachments: []
  }
]

// Estatísticas
export const statistics = {
  totalMachines: machines.length,
  activeMachines: machines.filter(m => m.status === 'Operacional').length,
  maintenancesThisMonth: maintenances.filter(m => {
    const date = new Date(m.scheduledDate)
    const now = new Date()
    return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear()
  }).length,
  completedMaintenances: maintenances.filter(m => m.status === 'Concluída').length,
  pendingMaintenances: maintenances.filter(m => m.status === 'Pendente').length,
  inProgressMaintenances: maintenances.filter(m => m.status === 'Em Andamento').length,
  scheduledMaintenances: maintenances.filter(m => m.status === 'Agendada').length,
  totalCost: maintenances.reduce((sum, m) => sum + m.cost, 0),
  averageMaintenanceTime: Math.round(
    maintenances.reduce((sum, m) => sum + m.duration, 0) / maintenances.length
  ),
  efficiency: 94.5
}

// Status de máquinas por categoria
export const machineStatusStats = {
  'Operacional': machines.filter(m => m.status === 'Operacional').length,
  'Manutenção': machines.filter(m => m.status === 'Manutenção').length,
  'Parada': machines.filter(m => m.status === 'Parada').length,
  'Inativo': machines.filter(m => m.status === 'Inativo').length
}

// Manutenções por tipo
export const maintenanceTypeStats = {
  'Preventiva': maintenances.filter(m => m.type === 'Preventiva').length,
  'Corretiva': maintenances.filter(m => m.type === 'Corretiva').length,
  'Preditiva': maintenances.filter(m => m.type === 'Preditiva').length
}

// Manutenções por prioridade
export const maintenancePriorityStats = {
  'Alta': maintenances.filter(m => m.priority === 'Alta').length,
  'Média': maintenances.filter(m => m.priority === 'Média').length,
  'Baixa': maintenances.filter(m => m.priority === 'Baixa').length
}

// Gráfico de manutenções por mês (últimos 6 meses)
export const maintenanceChartData = [
  { month: 'Mar', preventiva: 8, corretiva: 3 },
  { month: 'Abr', preventiva: 12, corretiva: 2 },
  { month: 'Mai', preventiva: 10, corretiva: 4 },
  { month: 'Jun', preventiva: 15, corretiva: 1 },
  { month: 'Jul', preventiva: 11, corretiva: 5 },
  { month: 'Ago', preventiva: 9, corretiva: 2 }
]

// Notificações
export const notifications = [
  {
    id: 1,
    type: 'warning',
    title: 'Manutenção Atrasada',
    message: 'Torno CNC-001 tem manutenção pendente há 2 dias',
    date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    read: false,
    priority: 'high'
  },
  {
    id: 2,
    type: 'info',
    title: 'Peça Chegou',
    message: 'Kit de vedações para Prensa P-003 chegou ao estoque',
    date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    read: false,
    priority: 'medium'
  },
  {
    id: 3,
    type: 'success',
    title: 'Manutenção Concluída',
    message: 'Fresadora F-002 teve calibração concluída com sucesso',
    date: new Date(Date.now() - 3 * 60 * 60 * 1000),
    read: true,
    priority: 'low'
  },
  {
    id: 4,
    type: 'warning',
    title: 'Agendamento',
    message: 'Compressor C-001 tem manutenção agendada para hoje',
    date: new Date(),
    read: false,
    priority: 'medium'
  }
]

// Configurações do sistema
export const systemSettings = {
  company: {
    name: 'Indústria SMPM Ltda.',
    address: 'Rua Industrial, 123 - Distrito Industrial',
    city: 'São Paulo',
    state: 'SP',
    zipCode: '01234-567',
    phone: '(11) 3333-4444',
    email: 'contato@smpm.com.br'
  },
  maintenance: {
    defaultInterval: 30, // dias
    alertDaysBefore: 7, // dias antes do vencimento
    workingHoursStart: '08:00',
    workingHoursEnd: '17:00',
    workingDays: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday']
  },
  notifications: {
    email: true,
    sms: false,
    push: true,
    maintenance: true,
    alerts: true
  }
}

// Dados para relatórios
export const reportData = {
  maintenancesByMonth: maintenanceChartData,
  costsByMonth: [
    { month: 'Mar', cost: 2150.75 },
    { month: 'Abr', cost: 1890.30 },
    { month: 'Mai', cost: 2450.50 },
    { month: 'Jun', cost: 1750.25 },
    { month: 'Jul', cost: 2890.80 },
    { month: 'Ago', cost: 1580.55 }
  ],
  efficiencyByMonth: [
    { month: 'Mar', efficiency: 92.5 },
    { month: 'Abr', efficiency: 94.2 },
    { month: 'Mai', efficiency: 91.8 },
    { month: 'Jun', efficiency: 96.1 },
    { month: 'Jul', efficiency: 93.7 },
    { month: 'Ago', efficiency: 94.5 }
  ]
}