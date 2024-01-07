

create table users (
                       id serial primary key,
                       email varchar(255) unique,
                       phone varchar(15) unique,
                       birthday timestamptz,
                       role varchar(50),
                       name varchar(255),
                       password varchar(260),
                       created_at timestamptz default CURRENT_TIMESTAMP,
                       updated_at timestamptz default CURRENT_TIMESTAMP
);


insert into users(email,phone,role,name,password) values('viet@gmail.com','0797790110','user','viet nguyen','');
insert into cities(name) values('Ho Chi Minh City');
insert into cities(name) values('Ha Noi City');
insert into districts (name,city_id) values('district 1', 1);
insert into districts (name,city_id) values('district 2', 1);
insert into wards (name,district_id) values('Ben Nghe', 1);
insert into wards (name,district_id) values('Tan Thanh', 1);
insert into wards (name,district_id) values('My Dinh', 2);
insert into wards (name,district_id) values('An Phu', 2);
insert into spaces(address,longitude,latitude,type,format,img_url,is_planned,ward_id) values('123 Pasteur',123, 12,'private house','politic','',true,1);
insert into spaces(address,longitude,latitude,type,format,img_url,is_planned,ward_id) values('125 Pasteur',123, 12.12,'private house','politic','',true,1);
insert into surfaces (format,width,height,img_url,content,space_id) values('politic',150,250,'advertisment for testing','',1);
insert into surfaces (format,width,height,img_url,content,space_id) values('politic',250,250,'advertisment for testing 2','',1);

create table cities (
                        id serial primary key,
                        name varchar(255),
                        created_at timestamptz default CURRENT_TIMESTAMP,
                        updated_at timestamptz default CURRENT_TIMESTAMP
);





create table districts (
                           id serial primary key,
                           city_id int,
                           name varchar(255),
                           created_at timestamptz default CURRENT_TIMESTAMP,
                           updated_at timestamptz default CURRENT_TIMESTAMP,
                           CONSTRAINT fk_district_city
                               foreign KEY(city_id)
                                   REFERENCES cities(id)
);




create table wards (
                       id serial primary key,
                       district_id int,
                       name varchar(255),
                       created_at timestamptz default CURRENT_TIMESTAMP,
                       updated_at timestamptz default CURRENT_TIMESTAMP,
                       CONSTRAINT fk_ward_district
                           FOREIGN KEY(district_id)
                               REFERENCES districts(id)
);



create table spaces (
                        id serial primary key,
                        address varchar(255),
                        longitude float,
                        latitude float,
                        type varchar(255),
                        format varchar(255),
                        img_url varchar(255),
                        is_planned bool,
                        ward_id int,
                        created_at timestamptz default CURRENT_TIMESTAMP,
                        updated_at timestamptz default CURRENT_TIMESTAMP,
                        CONSTRAINT fk_space_ward
                            FOREIGN KEY(ward_id)
                                REFERENCES wards(id)
);




create table surfaces (
                          id serial primary key,
                          format varchar(255),
                          width int,
                          height int,
                          img_url varchar(500),
                          content text,
                          space_id int,
                          created_at timestamptz default CURRENT_TIMESTAMP,
                          updated_at timestamptz default CURRENT_TIMESTAMP,
                          CONSTRAINT fk_surface_space
                              FOREIGN KEY(space_id)
                                  REFERENCES spaces(id)
);




create table reports (
                         id serial primary key,
                         surface_id int,
                         address varchar(255),
                         user_ip varchar(255),
                         ward_id int,
                         longitude float,
                         latitude float,
                         report_date timestamptz,
                         content text,
                         email varchar(255),
                         phone varchar(15),
                         state int,
                         img_url varchar(255)[],
                         approved_id int,
                         response text,
                         created_at timestamptz default CURRENT_TIMESTAMP,
                         updated_at timestamptz default CURRENT_TIMESTAMP,
                         CONSTRAINT fk_report_surface
                             FOREIGN KEY(surface_id)
                                 REFERENCES surfaces(id),
                         CONSTRAINT fk_report_ward
                             FOREIGN KEY(ward_id)
                                 REFERENCES wards(id),
                         CONSTRAINT fk_report_user
                             FOREIGN KEY(approved_id)
                                 REFERENCES users(id)
);

create table surface_requests (
                                  id serial primary key,
                                  report_date timestamptz,
                                  user_id int,
                                  surface_id int,
                                  des_space_id int,
                                  content text,
                                  approved_id int,
                                  state int,
                                  response text,
                                  created_at timestamptz default CURRENT_TIMESTAMP,
                                  updated_at timestamptz default CURRENT_TIMESTAMP,
                                  CONSTRAINT fk_request_surface
                                      FOREIGN KEY(surface_id)
                                          REFERENCES surfaces(id),
                                  CONSTRAINT fk_request_space
                                      FOREIGN KEY(des_space_id)
                                          REFERENCES spaces(id),
                                  CONSTRAINT fk_request_approved
                                      FOREIGN KEY(approved_id)
                                          REFERENCES users(id),
                                  CONSTRAINT fk_request_user
                                      FOREIGN KEY(user_id)
                                          REFERENCES users(id)
);

create table space_requests (
                                id serial primary key,
                                address varchar(255),
                                report_date timestamptz,
                                user_id int,
                                latitude float,
                                longitude float,
                                space_id int,
                                ward_id int,
                                content text,
                                type varchar(30),
                                format varchar(30),
                                approved_id int,
                                state int,
                                response text,
                                created_at timestamptz default CURRENT_TIMESTAMP,
                                updated_at timestamptz default CURRENT_TIMESTAMP,
                                CONSTRAINT fk_space_request_space
                                    FOREIGN KEY(space_id)
                                        REFERENCES spaces(id),
                                CONSTRAINT fk_space_request_ward
                                    FOREIGN KEY(ward_id)
                                        REFERENCES wards(id),
                                CONSTRAINT fk_space_request_approved
                                    FOREIGN KEY(approved_id)
                                        REFERENCES users(id),
                                CONSTRAINT fk_space_request_user
                                    FOREIGN KEY(user_id)
                                        REFERENCES users(id)
);

create table surface_licenses (
                                  id serial primary key,
                                  request_date timestamptz,
                                  user_id int,
                                  format varchar(255),
                                  ward_id int,
                                  width int,
                                  height int,
                                  img_url varchar(500),
                                  space_id int,
                                  content text,
                                  company_email varchar(255),
                                  company_phone varchar(15),
                                  company_address varchar(255),
                                  start_date timestamptz,
                                  end_date timestamptz,
                                  state int,
                                  response text,
                                  approved_id int,
                                  response_date timestamptz,
                                  created_at timestamptz default CURRENT_TIMESTAMP,
                                  updated_at timestamptz default CURRENT_TIMESTAMP,
                                  CONSTRAINT fk_license_space
                                      FOREIGN KEY(space_id)
                                          REFERENCES spaces(id),
                                  CONSTRAINT fk_license_ward
                                      FOREIGN KEY(ward_id)
                                          REFERENCES wards(id),
                                  CONSTRAINT fk_license_approved
                                      FOREIGN KEY(approved_id)
                                          REFERENCES users(id),
                                  CONSTRAINT fk_license_user
                                      FOREIGN KEY(user_id)
                                          REFERENCES users(id)
);
