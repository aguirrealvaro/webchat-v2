CREATE DATABASE webchat;

\c webchat; /*use table*/
\dt /*show tables*/

/*create table user*/
CREATE TABLE users(
    id integer PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    username VARCHAR(60),
    password TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

/*create table message*/
CREATE TABLE messages(
    id integer PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    origin integer REFERENCES users(id),
    destiny integer REFERENCES users(id),
    content TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    seen boolean DEFAULT false
);


/*create table relations*/
CREATE TABLE relations(
    id integer PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    origin integer REFERENCES users(id),
    destiny integer REFERENCES users(id),
    lastmessage integer REFERENCES messages(id),
    unseencount integer DEFAULT 0
);

/*add column*/
ALTER TABLE users
ADD createdAt TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP


TRUNCATE TABLE users RESTART IDENTITY CASCADE;

INSERT INTO users(username, password)
VALUES('fer', '1234');

INSERT INTO messages(origin, destiny, content)
VALUES(3, 4, 'Hola fer!');

INSERT INTO messages(origin, destiny, content)
VALUES(4, 3, 'Hola Alva!');

