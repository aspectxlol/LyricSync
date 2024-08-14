import { relations } from "drizzle-orm";
import {
  integer,
  text,
  sqliteTable,
} from "drizzle-orm/sqlite-core";

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

export const background = sqliteTable('background', {
  id: integer('id').primaryKey(),
  fileName: text('file_name'),
  originalName: text('original_name'),
});
