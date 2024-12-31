import React from 'react';
import { VMFilters } from '../components/vm/VMFilters';
import { VMInstanceList } from '../components/vm/VMInstanceList';
import { VMProvisionForm } from '../components/vm/VMProvisionForm';
import { GradientText } from '../../../components/ui/GradientText';
import { Plus } from 'lucide-react';

export const CloudVMPage: React.FC = () => {
  const [isProvisioning, setIsProvisioning] = React.useState(false);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-display font-bold">
            <GradientText>Cloud Virtual Machines</GradientText>
          </h1>
          <p className="mt-2 text-gray-400">
            Access cloud-hosted virtual machines for hands-on practice
          </p>
        </div>
        <button 
          className="btn-primary"
          onClick={() => setIsProvisioning(true)}
        >
          <Plus className="h-4 w-4 mr-2" />
          New Instance
        </button>
      </div>

      <VMFilters />
      <VMInstanceList />

      {isProvisioning && (
        <VMProvisionForm onClose={() => setIsProvisioning(false)} />
      )}
    </div>
  );
};