import { IAgentCreateInput, IAgentUpdateInput, IBlackListCreateInput, IInstanceUpdateInput, IWhiteListCreateInput } from "@/types";
import { api } from "./axios";

export const fetchMyAgents = async () => {
  try {
    const response = await api.get('/agents');
    
    return response.data;
  } catch (error) {
    console.error('Error fetching agents:', error);
    throw error;
  }
}

export const getAgentById = async (id: number) => {
  try {
    const response = await api.get('/agents/' + id);
    
    return response.data;
  } catch (error) {
    console.error('Error fetching agent by id:', error);
    throw error;
  }
}

export const updateAgent = async (id: number, data: IAgentUpdateInput) => {
  try {
    const response = await api.put('/agents/' + id, data);
    
    return response.data;
  } catch (error) {
    console.error('Error updating agent:', error);
    throw error;
  }
}

export const deleteAgent = async (id: number) => {
  try {
    const response = await api.delete('/agents/' + id);
    
    return response.data;
  } catch (error) {
    console.error('Error deleting agent:', error);
    throw error;
  }
}

export const createAgent = async (payload: IAgentCreateInput) => {
  try {
    const response = await api.post('/agents', payload);
    
    return response.data;
  } catch (error) {
    console.error('Error creating agent:', error);
    throw error;
  }
}

export const createInstance = async (agent_id: number) => {
  try {
    const response = await api.post('/instances', { agent_id });
    return response.data;
  } catch (error) {
    console.error('Error creating instance:', error);
    throw error;
  }
}

export const deleteInstance = async (id: number) => {
  try {
    await api.delete('/instances/' + id);
  } catch (error) {
    console.error('Error creating instance:', error);
    throw error;
  }
}

export const updateInstance = async (id: number, data: IInstanceUpdateInput) => {
  try {
    const response = await api.put('/instances/' + id, data);
    return response.data;
  } catch (error) {
    console.error('Error creating instance:', error);
    throw error;
  }
}

export const createBlackListItem = async (data: IBlackListCreateInput) => {
  try {
    const response = await api.post('/black-list', data);
    
    return response.data;
  } catch (error) {
    console.error('Error creating blacklist item:', error);
    throw error;
  }
}

export const deleteBlackListItem = async (id: number) => {
  try {
    const response = await api.delete('/black-list/' + id);
    
    return response.data;
  } catch (error) {
    console.error('Error deleting blacklist item:', error);
    throw error;
  }
}

export const createWhiteListItem = async (data: IWhiteListCreateInput) => {
  try {
    const response = await api.post('/white-list', data);
    
    return response.data;
  } catch (error) {
    console.error('Error creating whitelist item:', error);
    throw error;
  }
}

export const deleteWhiteListItem = async (id: number) => {
  try {
    const response = await api.delete('/white-list/' + id);
    
    return response.data;
  } catch (error) {
    console.error('Error deleting whitelist item:', error);
    throw error;
  }
}

export const uploadFile = async (agent_id: number, files: FormData) => {
  try {
    const response = await api.post('/files/' + agent_id, files);
    
    return response.data;
  } catch (error) {
    console.error('Error uploading file(s):', error);
    throw error;
  }
}

export const deleteFile = async (id: number) => {
  try {
    const response = await api.delete('/files/' + id);
    
    return response.data;
  } catch (error) {
    console.error('Error uploading file(s):', error);
    throw error;
  }
}

export const getInstanceQrCode = async (instance_id: number) => {
  try {
    const response = await api.get(`/instances/${instance_id}/connect`);
    
    return response.data;
  } catch (error) {
    console.error('Error fetching instance QR code:', error);
    throw error;
  }
}

export const getInstanceConnectStatus = async (instance_id: number) => {
  try {
    const response = await api.get(`/instances/${instance_id}/status`);
    
    return response.data;
  } catch (error) {
    console.error('Error fetching instance QR code:', error);
    throw error;
  }
}