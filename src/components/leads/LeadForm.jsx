import { useState } from 'react';

const STATUS_OPTIONS = ['New', 'Contacted', 'Meeting Scheduled', 'Proposal Sent', 'Won', 'Lost'];
const SOURCE_OPTIONS = ['Website', 'Referral', 'LinkedIn', 'Cold Call', 'Email Campaign', 'Other'];

const inputClass =
  'w-full p-2 border border-border rounded-lg bg-surface text-foreground focus:ring-2 focus:ring-primary outline-none';

export default function LeadForm({ initialData, onSubmit, onCancel }) {
  const [formData, setFormData] = useState(
    initialData || {
      name: '',
      company: '',
      email: '',
      phone: '',
      status: 'New',
      source: 'Website',
      value: 0,
    }
  );
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: null });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.company) newErrors.company = 'Company is required';
    if (!formData.email) newErrors.email = 'Email is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 bg-surface p-6 rounded-lg w-full max-w-md border border-border">
      <h2 className="text-xl font-bold text-foreground mb-2">
        {initialData ? 'Edit Lead' : 'Add New Lead'}
      </h2>

      <div>
        <label className="block text-sm font-medium text-muted mb-1">Name *</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} className={inputClass} />
        {errors.name && <p className="text-accent text-xs mt-1">{errors.name}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-muted mb-1">Company *</label>
        <input type="text" name="company" value={formData.company} onChange={handleChange} className={inputClass} />
        {errors.company && <p className="text-accent text-xs mt-1">{errors.company}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-muted mb-1">Email *</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} className={inputClass} />
        {errors.email && <p className="text-accent text-xs mt-1">{errors.email}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-muted mb-1">Phone</label>
        <input type="text" name="phone" value={formData.phone} onChange={handleChange} className={inputClass} />
      </div>

      <div>
        <label className="block text-sm font-medium text-muted mb-1">Deal Value (₹)</label>
        <input type="number" name="value" min="0" value={formData.value} onChange={handleChange} className={inputClass} />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-muted mb-1">Status</label>
          <select name="status" value={formData.status} onChange={handleChange} className={inputClass}>
            {STATUS_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-muted mb-1">Source</label>
          <select name="source" value={formData.source} onChange={handleChange} className={inputClass}>
            {SOURCE_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex gap-3 mt-4">
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 py-2 bg-background text-foreground rounded-lg hover:bg-surface-hover transition-colors font-medium border border-border"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="flex-1 py-2 bg-primary text-white rounded-lg hover:bg-primary-hover transition-colors font-medium"
        >
          {initialData ? 'Save Changes' : 'Create Lead'}
        </button>
      </div>
    </form>
  );
}
