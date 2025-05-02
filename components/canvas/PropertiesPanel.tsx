'use client';

import React from 'react';

interface PropertiesPanelProps {
  selectedId: string | null;
  config: any;
  onChange: (updatedConfig: any) => void;
}

export const PropertiesPanel: React.FC<PropertiesPanelProps> = ({ selectedId, config, onChange }) => {
  if (!selectedId) {
    return <div className="properties-panel">No block selected</div>;
  }
  return (
    <div className="properties-panel">
      <h3>Properties - {selectedId}</h3>
      <pre className="config-json">{JSON.stringify(config, null, 2)}</pre>
      {/* Extend this form to edit config fields dynamically */}
      <button onClick={() => onChange(config)}>Save Properties</button>
    </div>
  );
};