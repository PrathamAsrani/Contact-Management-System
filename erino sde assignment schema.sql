CREATE TABLE IF NOT EXISTS client (
    id serial primary key,
	name varchar(255),
	email varchar(255) unique,
	password varchar(255)
);

create table if not exists contacts(
	contact_id serial primary key,
	user_id int not null,
	first_name varchar(55) not null,
	last_name varchar(55) not null,
	Email varchar(255) UNIQUE,
	phone varchar(15) not null,
	company varchar(255),
	job varchar(255),
	foreign key (user_id) references users(id) on delete cascade
);

insert into client (name, email, password)
values
('Pratham Asrani', 'prathamasrani.cs@gmail.com', 'pass@1234');

select * from client
delete from client where id = 4;

INSERT INTO contacts (user_id, first_name, last_name, email, phone, company, job) VALUES
(1, 'Alice', 'Johnson', 'alice.johnson@example.com', '1234567890', 'TechCorp', 'Engineer'),
(1, 'Bob', 'Smith', 'bob.smith@example.com', '9876543210', 'BizGroup', 'Manager'),
(1, 'Charlie', 'Brown', 'charlie.brown@example.com', '5678901234', 'WebSolutions', 'Designer');

select * from contacts