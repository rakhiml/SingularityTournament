drop table if exists users;
drop table if exists tournaments;
drop table if exists users_roles;
drop table if exists roles;
create TABLE users
(
    id BIGSERIAL NOT NULL PRIMARY KEY,
    login VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255)  NOT NULL,
    surname VARCHAR(255)  NOT NULL,
    major VARCHAR(255)  NOT NULL,
    password VARCHAR(255) NOT NULL,
    tournament_id BIGINT

);
create table match
(
    id BIGSERIAL NOT NULL primary key,
    tournament_id INTEGER,
    user_id1 BIGINT,
    user_id2 BIGINT,
    winner bigint

);


create table round
(
    id BIGSERIAL NOT NULL primary key,
    tournament_id INTEGER,
    stage int,
    match_id bigint,
    foreign key (match_id) references match (id)


);

create TABLE tournaments
(
    id BIGSERIAL NOT NULL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    type VARCHAR(255) NOT NULL,
    status VARCHAR(255) NOT NULL,
    created_date date not null,
    started_date date,
    finished_date date,
    user_id BIGINT,
    round_id bigint,
    owner_id bigint,
    foreign key (round_id) references round (id)

);







create table roles
(
    id   INTEGER     NOT NULL PRIMARY KEY,
    name VARCHAR(80) not null
);

create table users_roles
(
    user_id bigint not null,
    role_id integer not null,
    primary key (user_id, role_id),
    foreign key (user_id) references users (id),
    foreign key (role_id) references roles (id)

);



-- create table tournaments_users
-- (
--     tournament_id bigint not null,
--     user_id integer not null,
--     primary key (tournament_id, user_id),
--     foreign key (tournament_id) references tournaments (id),
--     foreign key (user_id) references users (id)
--
-- );