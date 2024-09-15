-- user schema 
create table users{
    id serial primary key,
    username varchar(255),
    email varchar(255),
    password varchar(255)
}

-- post schema 
create table posts(
	id serial primary key,
	user_id int,
	title varchar(255) not null,
	contentType varchar(50) not null,
	summary text,
	author varchar(255),
	publish_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
	content text not null,
	filepath varchar(255),
	FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
	
)

