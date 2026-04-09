import { Suspense } from 'react';
import { TaskTable } from '@/components/task-table';

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <div className="mx-auto max-w-5xl px-4 py-10">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-gray-900">Task Dashboard</h1>
          <p className="mt-1 text-sm text-gray-500">Active tasks requiring attention</p>
        </div>
        <div className="rounded-lg border border-gray-200 bg-white shadow-sm">
          <Suspense
            fallback={
              <div className="p-10 text-center text-sm text-gray-500">Loading tasks…</div>
            }
          >
            <TaskTable />
          </Suspense>
        </div>
      </div>
    </main>
  );
}
