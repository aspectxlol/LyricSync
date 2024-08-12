import { relations } from "drizzle-orm";
import {
  integer,
  text,
  sqliteTable,
} from "drizzle-orm/sqlite-core";
import { z } from "zod";

export const songs = sqliteTable('songs', {
  id: integer('id').primaryKey(),
  title: text('title'),
  author: text('author'),
});

export const songRelations = relations(songs, ({ many }) => ({
  lyrics: many(lyrics),
}));

export const lyrics = sqliteTable('lyrics', {
  id: integer('id').primaryKey(),
  content: text('content'),
  songId: integer('song_id'),
});

export const lyricsRelations = relations(lyrics, ({ one }) => ({
  song: one(songs, {
    fields: [lyrics.songId],
    references: [songs.id],
  }),
}))

// export const users = sqliteTable('users', {
//   id: integer('id').primaryKey(),
//   name: text('name'),
// });

// export const usersRelations = relations(users, ({ many }) => ({
//   posts: many(posts),
// }));

// export const posts = sqliteTable('posts', {
//   id: integer('id').primaryKey(),
//   content: text('content'),
//   authorId: integer('author_id'),
// });

// export const postsRelations = relations(posts, ({ one }) => ({
//   author: one(users, {
//     fields: [posts.authorId],
//     references: [users.id],
//   }),
// }));


export const songSchema = z.object({
  title: z.string().min(1).max(255),
  author: z.string().min(1).max(255),
  lyric: z.array(z.string()).min(1).max(100),
});
