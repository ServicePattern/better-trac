import browser from 'webextension-polyfill';

const KEY = 'pendingOptionsPageTask';

export type PendingOptionsPageTask = {
  page: string;
  state: string;
};

export async function flushPendingOptionsPageTask(): Promise<PendingOptionsPageTask | undefined> {
  const result = await browser.storage.local.get(KEY);
  const task = result[KEY] as PendingOptionsPageTask | undefined;
  browser.storage.local.remove(KEY);
  return task;
}

export async function setPendingOptionsPageTask(task: PendingOptionsPageTask): Promise<void> {
  await browser.storage.local.set({ [KEY]: task });
}
