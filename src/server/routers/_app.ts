import { z } from 'zod';
import { procedure, router } from '../trpc';
import { SongRouter } from './Song';
export const appRouter = router({
  song: SongRouter
});
// export type definition of API
export type AppRouter = typeof appRouter;