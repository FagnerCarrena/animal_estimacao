create database catalogo_animal

create table usuarios(
id serial primary key,
  nome text not null,
  email text not null unique,
  senha text not null
  );
  
  create table animal(
  id serial primary key,
  usuario_id integer not null references usuarios(id),
  nome text not null,
  tipo text not null,
  apelido text
  )