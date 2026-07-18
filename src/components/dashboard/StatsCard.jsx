export default function StatsCard({ title, value, icon: Icon, change, colorClass }) {
const isPositive = change >= 0;

return (
<div className="bg-white dark:bg-[#1E293B] p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col transition-colors">
    <div className="flex justify-between items-start mb-4">
    <div className={`p-3 rounded-lg ${colorClass} bg-opacity-10 dark:bg-opacity-20`}>
        <Icon className={colorClass} size={24} />
    </div>
    <span className={`text-sm font-medium px-2 py-1 rounded-full ${isPositive ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'}`}>
        {isPositive ? '+' : ''}{change}%
    </span>
    </div>
    <h3 className="text-slate-500 dark:text-slate-400 text-sm font-medium">{title}</h3>
    <p className="text-3xl font-bold text-slate-900 dark:text-white mt-1">{value}</p>
</div>
);
}