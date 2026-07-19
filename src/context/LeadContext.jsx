import { createContext, useContext, useState, useEffect } from 'react';
import * as leadService from '../services/leadService';
import { useAuth } from './AuthContext';
import toast from 'react-hot-toast';

const LeadContext = createContext();

const normalizeLead = (lead) => ({
  ...lead,
  id: lead.id || lead._id,
});

export const LeadProvider = ({ children }) => {
  const { token } = useAuth();
  const [leads, setLeads] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [pagination, setPagination] = useState({});

  const fetchLeads = async (params) => {
    setIsLoading(true);
    try {
      const response = await leadService.getLeads(params);
      setLeads((response.data || []).map(normalizeLead));
      setPagination(response.pagination || {});
    } catch (error) {
      toast.error('Failed to fetch leads');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchLeads();
    } else {
      setLeads([]);
      setPagination({});
    }
  }, [token]);

  const addLead = async (data) => {
    try {
      await leadService.createLead(data);
      toast.success('Lead created!');
      fetchLeads();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to create lead');
    }
  };

  const updateLead = async (id, data) => {
    try {
      await leadService.updateLead(id, data);
      toast.success('Lead updated');
      fetchLeads();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update lead');
    }
  };

  const deleteLead = async (id) => {
    try {
      await leadService.deleteLead(id);
      toast.success('Lead deleted');
      fetchLeads();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to delete lead');
    }
  };

  return (
    <LeadContext.Provider value={{ leads, isLoading, pagination, fetchLeads, addLead, updateLead, deleteLead }}>
      {children}
    </LeadContext.Provider>
  );
};

export const useLeads = () => useContext(LeadContext);
export const useLeadContext = useLeads;
