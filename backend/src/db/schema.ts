import {
  bigint,
  char,
  pgTableCreator
} from "drizzle-orm/pg-core";

export const createTable = pgTableCreator((name) => `lyricsync_${name}`);

export const song = createTable("Song", {
	id: bigint("id", { mode: "number" }).primaryKey().notNull(),
	title: char("Title", { length: 255 }).notNull(),
	author: char("Author", { length: 255 }).notNull(),
	lyric: bigint("Lyric", { mode: "number" }).notNull().references(() => lyric.id),
});

export const schedule = createTable("Schedule", {
	id: bigint("id", { mode: "number" }).primaryKey().notNull(),
	songs: bigint("Songs", { mode: "number" }).notNull().references(() => song.id),
});

export const lyric = createTable("Lyric", {
	id: bigint("id", { mode: "number" }).primaryKey().notNull(),
	content: char("content", { length: 255 }).notNull(),
});