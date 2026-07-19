import { useState } from 'react';
import { Plus } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import LeadTable from '../components/leads/LeadTable';
import LeadCard from '../components/leads/LeadCard';
import LeadForm from '../components/leads/LeadForm';
import SearchBar from '../components/common/SearchBar';
import FilterBar from '../components/common/FilterBar';
import EmptyState from '../components/common/EmptyState';
import { useLeads } from '../context/LeadContext';

export default function Leads() {
  const { leads, addLead, updateLead, deleteLead } = useLeads();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedLead, setSelectedLead] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');

  const filteredLeads = leads
    .filter((lead) => activeFilter === 'All' || lead.status === activeFilter)
    .filter((lead) => {
      const lowerQuery = searchQuery.toLowerCase();
      return (
        lead.name.toLowerCase().includes(lowerQuery) ||
        lead.company.toLowerCase().includes(lowerQuery) ||
        lead.email.toLowerCase().includes(lowerQuery)
      );
    });

  const handleAddClick = () => {
    setSelectedLead(null);
    setIsModalOpen(true);
  };

  const handleEditClick = (lead) => {
    setSelectedLead(lead);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    deleteLead(id);
    toast.error('Lead deleted', { icon: '🗑️' });
  };

  const handleSubmit = (formData) => {
    if (selectedLead) {
      updateLead(selectedLead.id, formData);
      toast.success('Lead updated successfully!');
    } else {
      addLead(formData);
      toast.success('New lead added!');
    }
    setIsModalOpen(false);
  };

  const handleClearFilters = () => {
    setSearchQuery('');
    setActiveFilter('All');
  };

  return (
    <div className="max-w-7xl mx-auto">
      <Toaster position="bottom-right" />

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Lead Management</h1>
          <p className="text-muted mt-1">Manage and track your potential customers.</p>
        </div>
        <button
          onClick={handleAddClick}
          className="flex items-center justify-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-hover transition-colors font-medium w-full sm:w-auto"
        >
          <Plus size={20} /> <span>Add Lead</span>
        </button>
      </div>

      <div className="mb-6">
        <SearchBar value={searchQuery} onChange={setSearchQuery} />
      </div>

      <FilterBar activeFilter={activeFilter} onFilterChange={setActiveFilter} leads={leads} />

      {filteredLeads.length === 0 ? (
        <EmptyState onClear={handleClearFilters} />
      ) : (
        <>
          <div className="block md:hidden space-y-4">
            {filteredLeads.map((lead) => (
              <LeadCard key={lead.id} lead={lead} onEdit={handleEditClick} onDelete={handleDelete} />
            ))}
          </div>

          <div className="hidden md:block">
            <LeadTable leads={filteredLeads} onEdit={handleEditClick} onDelete={handleDelete} />
          </div>
        </>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 bg-foreground/30 flex items-center justify-center p-4 z-50">
          <LeadForm
            initialData={selectedLead}
            onSubmit={handleSubmit}
            onCancel={() => setIsModalOpen(false)}
          />
        </div>
      )}
    </div>
  );
}
