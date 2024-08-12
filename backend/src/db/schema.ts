import {
  bigint,
  char,
	pgTable,
} from "drizzle-orm/pg-core";

export const song = pgTable("Song", {
	id: bigint("id", { mode: "number" }).primaryKey().notNull(),
	title: char("Title", { length: 255 }).notNull(),
	author: char("Author", { length: 255 }).notNull(),
	lyric: bigint("Lyric", { mode: "number" }).notNull().references(() => lyric.id),
});

export const schedule = pgTable("Schedule", {
	id: bigint("id", { mode: "number" }).primaryKey().notNull(),
	songs: bigint("Songs", { mode: "number" }).notNull().references(() => song.id),
});

export const lyric = pgTable("Lyric", {
	id: bigint("id", { mode: "number" }).primaryKey().notNull(),
	content: char("content", { length: 255 }).notNull(),
});