import React from 'react';
import { action } from '@storybook/addon-actions';

import PujaCard from './PujaCard';

export default {
  component: PujaCard,
  title: 'PujaCard',
  // Our exports that end in "Data" are not stories.
  excludeStories: /.*Data$/,
};

export const taskData = {
  id: 1,
  name: 'Test Task',
  state: 'TASK_INBOX',
  updatedAt: new Date(2018, 0, 1, 9, 0),
};

export const actionsData = {
  onPinTask: action('onPinTask'),
  onArchiveTask: action('onArchiveTask'),
};

export const Default = () => <PujaCard puja={{ ...taskData }} {...actionsData} />;

export const Pinned = () => (
  <PujaCard puja={{ ...taskData, state: 'TASK_PINNED' }} {...actionsData} />
);

export const Archived = () => <PujaCard puja={{ ...taskData, state: 'TASK_ARCHIVED' }} {...actionsData} />;

