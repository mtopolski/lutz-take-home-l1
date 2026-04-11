'use client';

import { useState } from 'react';
import { useGetTasks } from '@/hooks/use-get-tasks';
import { CompleteButton } from './complete-button';
import { ArchiveButton } from './archive-button';
import type { Task } from '@/types/task';

type Tab = 'active' | 'completed' | 'archived';

const tabs: { id: Tab; label: string }[] = [
  { id: 'active', label: 'In Progress' },
  { id: 'completed', label: 'Completed' },
  { id: 'archived', label: 'Archived' },
];

const statusLabels: Record<string, string> = {
  'not-started': 'Not Started',
  'in-progress': 'In Progress',
  completed: 'Completed',
  archived: 'Archived',
};

const statusStyles: Record<string, string> = {
  'not-started': 'bg-gray-100 text-gray-700',
  'in-progress': 'bg-blue-100 text-blue-700',
  completed: 'bg-green-100 text-green-700',
  archived: 'bg-amber-100 text-amber-700',
};

function filterByTab(tasks: Task[], tab: Tab): Task[] {
  switch (tab) {
    case 'active':
      return tasks.filter((t) => t.status === 'not-started' || t.status === 'in-progress');
    case 'completed':
      return tasks.filter((t) => t.status === 'completed');
    case 'archived':
      return tasks.filter((t) => t.status === 'archived');
  }
}

export function TaskTable() {
  const [activeTab, setActiveTab] = useState<Tab>('active');
  const { data: tasks } = useGetTasks();

  const visibleTasks = filterByTab(tasks, activeTab);

  const getTabCount = (tab: Tab): number => {
      return filterByTab(tasks, tab).length;
  };

  return (
    <div>
      <div className="flex border-b">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-5 py-3 text-sm font-medium transition-colors ${
              activeTab === tab.id
                ? 'border-b-2 border-blue-600 text-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {tab.label}
            <span
                className="ml-1 text-gray-500">
                ({getTabCount(tab.id)})
            </span>
          </button>
        ))}
      </div>

      {visibleTasks.length === 0 ? (
        <p className="p-10 text-center text-sm text-gray-500">No tasks.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b bg-gray-50">
                <th className="px-4 py-3 text-left font-medium text-gray-600">Title</th>
                <th className="px-4 py-3 text-left font-medium text-gray-600">Client</th>
                <th className="px-4 py-3 text-left font-medium text-gray-600">Status</th>
                <th className="px-4 py-3 text-left font-medium text-gray-600">Due Date</th>
                {activeTab === 'active' && (
                  <th className="px-4 py-3 text-left font-medium text-gray-600">Actions</th>
                )}
              </tr>
            </thead>
            <tbody>
              {visibleTasks.map((task) => (
                <tr key={task.id} className="border-b last:border-0 hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium text-gray-900">{task.title}</td>
                  <td className="px-4 py-3 text-gray-600">{task.clientName}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${statusStyles[task.status] ?? 'bg-gray-100 text-gray-700'}`}
                    >
                      {statusLabels[task.status] ?? task.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-600">{task.dueDate}</td>
                  {activeTab === 'active' && (
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-4">
                        <div className="w-24">
                        <CompleteButton taskId={task.id} />
                        </div>
                        <ArchiveButton taskId={task.id} />
                      </div>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
