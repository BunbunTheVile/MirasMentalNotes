CREATE TABLE "Notes" (
	"Id"				SERIAL PRIMARY KEY,
	"Name"			TEXT NULL,
	"Content"			TEXT NULL,
	"SecretContent" 	TEXT NULL,
	"Tags"			TEXT[] NULL
);