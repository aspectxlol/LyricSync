CREATE TABLE `lyrics` (
	`id` integer PRIMARY KEY NOT NULL,
	`content` text,
	`song_id` integer
);
--> statement-breakpoint
CREATE TABLE `songs` (
	`id` integer PRIMARY KEY NOT NULL,
	`title` text,
	`author` text
);
