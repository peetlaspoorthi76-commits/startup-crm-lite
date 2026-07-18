import { useState } from 'react';

const STATUS_OPTIONS = ['New', 'Contacted', 'Meeting Scheduled', 'Proposal Sent', 'Won', 'Lost'];
const SOURCE_OPTIONS = ['Website', 'Referral', 'LinkedIn', 'Cold Call', 'Email Campaign', 'Other'];

export default function LeadForm({ initialData, onSubmit, onCancel }) {
const [formData, setFormData] = useState(initialData || {
name: '', company: '', email: '', phone: '', status: 'New', source: 'Website'
});
const [errors, setErrors] = useState({});

const handleChange = (e) => {
setFormData({ ...formData, [e.target.name]: e.target.value });
// Clear error when typing
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
<form onSubmit={handleSubmit} className="flex flex-col gap-4 bg-white p-6 rounded-lg w-full max-w-md">
    <h2 className="text-xl font-bold text-slate-900 mb-2">
    {initialData ? 'Edit Lead' : 'Add New Lead'}
    </h2>

    <div>
    <label className="block text-sm font-medium text-slate-700 mb-1">Name *</label>
    <input
        type="text" name="name" value={formData.name} onChange={handleChange}
        className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
    />
    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
    </div>

    <div>
    <label className="block text-sm font-medium text-slate-700 mb-1">Company *</label>
    <input
        type="text" name="company" value={formData.company} onChange={handleChange}
        className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
    />
    {errors.company && <p className="text-red-500 text-xs mt-1">{errors.company}</p>}
    </div>

    <div>
    <label className="block text-sm font-medium text-slate-700 mb-1">Email *</label>
    <input
        type="email" name="email" value={formData.email} onChange={handleChange}
        className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
    />
    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
    </div>

    <div>
    <label className="block text-sm font-medium text-slate-700 mb-1">Phone</label>
    <input
        type="text" name="phone" value={formData.phone} onChange={handleChange}
        className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
    />
    </div>

    <div className="grid grid-cols-2 gap-4">
    <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Status</label>
        <select
        name="status" value={formData.status} onChange={handleChange}
        className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
        >
        {STATUS_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
        </select>
    </div>
    <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Source</label>
        <select
        name="source" value={formData.source} onChange={handleChange}
        className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
        >
        {SOURCE_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
        </select>
    </div>
    </div>

    <div className="flex gap-3 mt-4">
    <button type="button" onClick={onCancel} className="flex-1 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors font-medium">
        Cancel
    </button>
    <button type="submit" className="flex-1 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
        {initialData ? 'Save Changes' : 'Create Lead'}
    </button>
    </div>
</form>
);
}