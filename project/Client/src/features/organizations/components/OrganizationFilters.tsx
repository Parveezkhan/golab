import React from 'react';
import { Search, Filter, Calendar } from 'lucide-react';
import { OrganizationFilters as FilterType } from '../types';

interface OrganizationFiltersProps {
  onFilterChange: (filters: Partial<FilterType>) => void;
}

export const OrganizationFilters: React.FC<OrganizationFiltersProps> = ({
  onFilterChange,
}) => {
  return (
    <div className="glass-panel mb-6">
      <div className="flex flex-col lg:flex-row lg:items-center gap-4">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search organizations..."
            className="w-full pl-10 pr-4 py-2 bg-dark-400/50 border border-primary-500/20 rounded-lg 
                     text-gray-300 placeholder-gray-500 focus:border-primary-500/40 focus:outline-none 
                     focus:ring-2 focus:ring-primary-500/20 transition-colors"
            onChange={(e) => onFilterChange({ search: e.target.value })}
          />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-500" />
        </div>

        <div className="flex flex-wrap gap-4">
          <select
            className="px-4 py-2 bg-dark-400/50 border border-primary-500/20 rounded-lg 
                     text-gray-300 focus:border-primary-500/40 focus:outline-none 
                     focus:ring-2 focus:ring-primary-500/20 transition-colors"
            onChange={(e) => onFilterChange({ type: e.target.value as any })}
          >
            <option value="">All Types</option>
            <option value="training">Training</option>
            <option value="enterprise">Enterprise</option>
            <option value="education">Education</option>
          </select>

          <select
            className="px-4 py-2 bg-dark-400/50 border border-primary-500/20 rounded-lg 
                     text-gray-300 focus:border-primary-500/40 focus:outline-none 
                     focus:ring-2 focus:ring-primary-500/20 transition-colors"
            onChange={(e) => onFilterChange({ status: e.target.value as any })}
          >
            <option value="">All Status</option>
            <option value="active">Active</option>
            <option value="pending">Pending</option>
            <option value="suspended">Suspended</option>
          </select>

          <select
            className="px-4 py-2 bg-dark-400/50 border border-primary-500/20 rounded-lg 
                     text-gray-300 focus:border-primary-500/40 focus:outline-none 
                     focus:ring-2 focus:ring-primary-500/20 transition-colors"
            onChange={(e) => onFilterChange({ subscriptionTier: e.target.value as any })}
          >
            <option value="">All Tiers</option>
            <option value="basic">Basic</option>
            <option value="professional">Professional</option>
            <option value="enterprise">Enterprise</option>
          </select>

          <button className="btn-secondary">
            <Calendar className="h-4 w-4 mr-2" />
            Date Range
          </button>
        </div>
      </div>
    </div>
  );
};