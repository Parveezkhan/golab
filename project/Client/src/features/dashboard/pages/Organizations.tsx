import React, { useState } from 'react';
import { GradientText } from '../../../components/ui/GradientText';
import { OrganizationList } from '../../organizations/components/OrganizationList';
import { OrganizationFilters } from '../../organizations/components/OrganizationFilters';
import { OrganizationStats } from '../../organizations/components/OrganizationStats';
import { Organization } from '../../organizations/types';

// Mock data - Replace with API calls
const mockOrganizations: Organization[] = [
  {
    id: '1',
    name: 'TechCorp Solutions',
    type: 'enterprise',
    status: 'active',
    contactEmail: 'admin@techcorp.com',
    usersCount: 250,
    labsCount: 45,
    subscriptionTier: 'enterprise',
    createdAt: new Date('2023-01-15'),
    lastActive: new Date('2024-03-10')
  },
  {
    id: '2',
    name: 'EduTech Institute',
    type: 'education',
    status: 'active',
    contactEmail: 'info@edutech.edu',
    usersCount: 1500,
    labsCount: 120,
    subscriptionTier: 'professional',
    createdAt: new Date('2023-03-20'),
    lastActive: new Date('2024-03-11')
  },
  {
    id: '3',
    name: 'CloudSkills Academy',
    type: 'training',
    status: 'pending',
    contactEmail: 'support@cloudskills.io',
    usersCount: 800,
    labsCount: 75,
    subscriptionTier: 'professional',
    createdAt: new Date('2023-06-10'),
    lastActive: new Date('2024-03-09')
  }
];

const mockStats = {
  totalOrganizations: 24,
  activeUsers: 2500,
  totalLabs: 450,
  monthlyRevenue: 128500
};

export const Organizations: React.FC = () => {
  const [organizations, setOrganizations] = useState(mockOrganizations);

  const handleFilterChange = (filters: any) => {
    console.log('Applying filters:', filters);
    // TODO: Implement filtering logic
  };

  const handleViewDetails = (org: Organization) => {
    console.log('Viewing details for:', org);
    // TODO: Implement organization details view
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-display font-bold">
          <GradientText>Organizations</GradientText>
        </h1>
        <button className="btn-primary">
          Add Organization
        </button>
      </div>

      <OrganizationStats stats={mockStats} />
      
      <OrganizationFilters onFilterChange={handleFilterChange} />
      
      <OrganizationList 
        organizations={organizations}
        onViewDetails={handleViewDetails}
      />
    </div>
  );
};