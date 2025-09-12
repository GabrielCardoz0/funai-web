export type DataStatus = "loading" | "success" | "error" | "idle";

// export interface IAgent {
//   id: number;
//   created_at: Date;
//   updated_at: Date | null;
//   name: string;
//   description: string;
//   agent_name: string;
//   agent_behavior: string;
//   is_active: boolean;
//   user_id: number;
//   files: [];
//   instances?: Instance[];

//   is_telegram_connected: boolean;
//   is_instagram_connected: boolean;
// }

// export type Timestamp = string; // ou `Date` se preferir trabalhar com objetos Date

// export interface IUser {
//   id: number;
//   created_at: Date;
//   updated_at: Date | null;
//   email: string;
//   name: string;
//   password: string;
//   agents_limit: number;
//   is_first_access: boolean;
//   is_deleted: boolean;
//   is_blocked: boolean;
// }
// export interface Instance {
//   id: number;
//   created_at: Timestamp;
//   updated_at?: Timestamp;
//   agent_id: number;
//   integration_id?: string;
//   is_connected: boolean;
//   is_disable: boolean;
//   agent?: IAgent;
// }


// ===================== ENTIDADES PRINCIPAIS =====================

export interface ISubscription {
  id: number;
  created_at: Date;
  updated_at?: Date | null;
  plan_id: number;
  stripe_id: string;
  status: string;
  canceled_at?: Date | null;
  plan?: IPlan;
  invoices?: IInvoice[];
  user: IUser;
}

export interface IPlan {
  id: number;
  created_at: Date;       
  updated_at: Date | null;
  stripe_id: string;     
  name: string;
  description: string;                  
  price: number;
  agents_limit: number;
  dashboard_type: string;
  instances_limit: number;
}

export interface IInvoice {
  id: number;
  created_at: Date;
  updated_at?: Date | null;
  stripe_id: string;
  amount: number;
  status: string;
  plan_name: string;
  subscription_id: number;
}






export interface IUser {
  id: number;
  created_at: Date;
  updated_at?: Date | null;
  email: string;
  name: string;
  password: string;
  agents_limit: number;
  is_first_access: boolean;
  is_deleted: boolean;
  is_blocked: boolean;
  agents?: IAgent[];
}

export interface IUserRequest {
  id: number;
  created_at: Date;
  updated_at?: Date | null;
  email: string;
  name: string;
  password: string;
  agents_limit: number;
  is_first_access: boolean;
  is_deleted: boolean;
  is_blocked: boolean;
}

export interface IAgent {
  id: number;
  created_at: Date;
  updated_at?: Date | null;
  name: string;
  image: string;
  description: string;
  agent_name: string;
  agent_behavior: string;
  business_description: string;
  user_id: number;
  is_active: boolean;
  user?: IUser;
  black_list?: IBlackList[];
  files?: IFile[];
  instances?: IInstance[];
  knowledge_chunks?: IKnowledgeChunk[];
  white_list?: IWhiteList[];
}

export interface IInstance {
  id: number;
  created_at: Date;
  updated_at?: Date | null;
  agent_id: number;
  integration_id?: string | null;
  name?: string | null;
  type: string;
  is_connected: boolean;
  is_disable: boolean;
  agent?: IAgent;
}

export interface IFile {
  id: number;
  created_at: Date;
  updated_at?: Date | null;
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  destination: string;
  filename: string;
  path: string;
  size: number;
  agent_id: number;
  agent?: IAgent;
  knowledge_chunks?: IKnowledgeChunk[];
}

export interface IBlackList {
  id: number;
  created_at: Date;
  updated_at?: Date | null;
  type: string;
  contact: string;
  agent_id: number;
  agent?: IAgent;
}

export interface IWhiteList {
  id: number;
  created_at: Date;
  updated_at?: Date | null;
  type: string;
  contact: string;
  agent_id: number;
  agent?: IAgent;
}

export interface IKnowledgeChunk {
  id: number;
  source_file?: string | null;
  chunk_index?: number | null;
  content?: string | null;
  agent_id?: number | null;
  file_id?: number | null;
  embedding?: unknown | null; // Vector não suportado
  agent?: IAgent | null;
  file?: IFile | null;
}

// ===================== CREATE INPUTS =====================

export interface IUserCreateInput {
  email: string;
  name: string;
  password: string;
  agents_limit: number;
  is_first_access?: boolean;
  is_deleted?: boolean;
  is_blocked?: boolean;
  agents?: IAgentCreateInput[];
}

export interface IAgentCreateInput {
  name: string;
  description: string;
  image: string;
  agent_name: string;
  agent_behavior: string;
  business_description: string;
  // user_id: number;
}

export interface IInstanceCreateInput {
  agent_id: number;
  name?: string | null;
  type: string;
}

export interface IFileCreateInput {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  destination: string;
  filename: string;
  path: string;
  size: number;
  agent_id: number;
}

export interface IBlackListCreateInput {
  contact: string;
  agent_id: number;
}

export interface IWhiteListCreateInput {
  contact: string;
  agent_id: number;
}

export interface IKnowledgeChunkCreateInput {
  source_file?: string | null;
  chunk_index?: number | null;
  content?: string | null;
  agent_id?: number | null;
  file_id?: number | null;
  embedding?: unknown | null;
}

// ===================== UPDATE INPUTS =====================

export interface IUserUpdateInput {
  email?: string;
  name?: string;
  // password?: string;
  // agents_limit?: number;
  is_first_access?: boolean;
  // is_deleted?: boolean;
  // is_blocked?: boolean;
  // agents?: IAgentUpdateInput[];
}

export interface IUserUpdatePasswordInput {
  currentPassword: string;
  newPassword: string;
}

export interface IAgentUpdateInput {
  name?: string;
  description?: string;
  image?: string;
  agent_name?: string;
  agent_behavior?: string;
  business_description?: string;
  is_active?: boolean;
}

export interface IInstanceUpdateInput {
  integration_id?: string | null;
  name?: string | null;
  type?: string;
  is_connected?: boolean;
  is_disable?: boolean;
}

export interface IFileUpdateInput {
  fieldname?: string;
  originalname?: string;
  encoding?: string;
  mimetype?: string;
  destination?: string;
  filename?: string;
  path?: string;
  size?: number;
}

// export interface IBlackListUpdateInput {
//   type?: string;
//   contact?: string;
//   agent_id?: number;
// }

// export interface IWhiteListUpdateInput {
//   type?: string;
//   contact?: string;
//   agent_id?: number;
// }




//DASHBOARD TYPES

export interface AgentPerformance {
  agentId: number;
  agentName: string;
  chatsCount: number;
  messagesCount: number;
  avgResponseTime: number;
  automatedResolutionRate: number;
  customerServedCount: number;
}

export interface DashboardInfo {

  customerServedCount: number;
  prevCustomerServedCount: number;

  usage: {
    chatsCount: number;
    messagesCount: number;
    avgResponseTime: number;
    automatedResolutionRate: number;
    activeAgents: number;
    instancesActiveCount: number;
    planAgentsUsagePercent: number;
  };
  prevUsage: {
    chatsCount: number;
    messagesCount: number;
    avgResponseTime: number;
    automatedResolutionRate: number;
    activeAgents: number;
    instancesActiveCount: number;
    planAgentsUsagePercent: number;
  };

  impact: {
    hoursSaved: number;
    estimatedSavingsBRL: number;
  };
  prevImpact: {
    hoursSaved: number;
    estimatedSavingsBRL: number;
  };

  insights: {
    topQuestions: { question: string; count: number }[];
    trendingTopics: { topic: string; growthPercent: number }[];
  };
  history: {
    labels: string[];
    messages: number[];
    clients: number[];
  };
  agentsPerformance: AgentPerformance[];
}
