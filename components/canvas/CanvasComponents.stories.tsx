import React from 'react';
import { Meta, Story } from '@storybook/react';
import { CanvasWrapper } from './CanvasWrapper';
import { Toolbar } from './Toolbar';
import { NodeBase } from './NodeBase';
import { ConnectionPath } from './ConnectionPath';
import { PropertiesPanel } from './PropertiesPanel';
import { BlockDef, Point } from './types';
import { Zap } from 'lucide-react';

const meta: Meta = {
  title: 'Canvas/Components',
};
export default meta;

export const Wrapper: Story = () => (
  <div style={{ width: 400, height: 300, border: '1px solid #ddd' }}>
    <CanvasWrapper onDrop={() => {}} onDragOver={() => {}} onClickCanvas={() => {}}>
      <div style={{ width: 100, height: 50, background: '#eee' }}>Child</div>
    </CanvasWrapper>
  </div>
);

export const ToolbarStory: Story = () => {
  const blocks: BlockDef[] = [
    { id: 'trigger', type: 'trigger', label: 'Trigger', icon: <Zap /> },
  ];
  return <Toolbar blocks={blocks} onDragStart={() => {}} />;
};

export const NodeStory: Story = () => (
  <NodeBase
    node={{ id: '1', type: 'trigger', x: 50, y: 50 }}
    selected
    onDrag={() => {}}
    onSelect={() => {}}
  >
    <div>Node Content</div>
  </NodeBase>
);

export const ConnectionStory: Story = () => (
  <svg width={200} height={100}>
    <ConnectionPath start={{ x: 10, y: 50 }} end={{ x: 190, y: 50 }} />
  </svg>
);

export const PropertiesStory: Story = () => (
  <PropertiesPanel selectedId="1" config={{ foo: 'bar' }} onChange={() => {}} />
);
