CREATE TABLE notes (
	id				SERIAL PRIMARY KEY,
	name			TEXT NOT NULL,
	content 		TEXT NOT NULL,
	tags			VARCHAR(255)[]
);