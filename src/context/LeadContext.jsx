import { createContext, useContext } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import { sampleLeads } from '../data/sampleLeads';

const LeadContext = createContext(null);

export function LeadProvider({ children }) {
// Now using useLocalStorage. If it's empty, it falls back to sampleLeads.
const [leads, setLeads] = useLocalStorage('startup-crm-leads', sampleLeads);

const addLead = (lead) => {
const newLead = {
    ...lead,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString()
};
setLeads((prev) => [newLead, ...prev]);
};

const updateLead = (id, updatedLead) => {
setLeads((prev) => prev.map((lead) => (lead.id === id ? { ...updatedLead, id } : lead)));
};

const deleteLead = (id) => {
setLeads((prev) => prev.filter((lead) => lead.id !== id));
};

const getLeadById = (id) => {
return leads.find((lead) => lead.id === id);
};

return (
<LeadContext.Provider value={{ leads, addLead, updateLead, deleteLead, getLeadById }}>
    {children}
</LeadContext.Provider>
);
}

export function useLeads() {
const context = useContext(LeadContext);
if (!context) {
throw new Error('useLeads must be used within a LeadProvider');
}
return context;
}