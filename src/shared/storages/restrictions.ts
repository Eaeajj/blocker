import { createStorage, StorageType } from '@src/shared/storages/base';

export type Application = 'vk' | 'youtube';

const defaultConfig = {
  vk: true,
  youtube: true,
} as const satisfies Record<Application, boolean>;

const storage = createStorage('restrictions-storage-key', defaultConfig, {
  storageType: StorageType.Local,
  liveUpdate: true,
});

const restrictionsStorage = {
  ...storage,
  // TODO: extends your own methods
  update: async (app: Partial<typeof defaultConfig>) => {
    await storage.set({ ...storage.getSnapshot(), ...app });
  },
} as const;

export default restrictionsStorage;
