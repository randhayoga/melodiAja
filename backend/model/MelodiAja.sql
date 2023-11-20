use melodiaja;

create table pengguna (
	username varchar(255) not null primary key,
    nama varchar(255) not null,
    email varchar(255) not null,
    kata_sandi varchar(255) not null,
    file_img_profile varchar(255) not null
);

create table pengguna_like_lagu (
	ID_pengguna_like_lagu int auto_increment primary key,
    username varchar(255),
    ID_lagu int,
    foreign key (username) references pengguna(username),
    foreign key (ID_lagu) references lagu(ID_lagu)
);

create table pengguna_dislike_lagu (
	ID_pengguna_dislike_lagu int auto_increment primary key,
    username varchar(255),
    ID_lagu int,
    foreign key (username) references pengguna(username),
    foreign key (ID_lagu) references lagu(ID_lagu)
);

create table album (
	ID_album int auto_increment primary key,
    judul_album varchar(255),
    file_img_album varchar(255) not null,
    tanggal_rilis date,
    username varchar(255), 
    foreign key (username) references pengguna(username)
);

create table lagu (
	ID_lagu int auto_increment primary key,
    file_musik varchar(255) not null,
    file_img_lagu varchar(255) not null,
    judul_lagu varchar(255) not null,
    genre varchar(255) not null,
    pencipta_lagu varchar(255) not null,
    durasi time, 
    jumlah_like int,
    jumlah_dislike int,
    ID_album int, 
    username_artist varchar(255),
    foreign key (ID_album) references album(ID_album),
    foreign key (username_artist) references pengguna(username)
);

create table playlist (
	ID_playlist int auto_increment primary key,
    judul_playlist varchar(255) not null,
    username_pemilik varchar(255),
    file_img_playlist varchar(255) not null,
    foreign key (username_pemilik) references pengguna(username)
);

create table playlist_item (
	ID_item int auto_increment primary key,
    ID_playlist int,
    ID_lagu int,
    foreign key (ID_playlist) references playlist(ID_playlist),
    foreign key (ID_lagu) references lagu(ID_lagu)
);

create table komentar (
	ID_komentar int auto_increment primary key,
    isi_komentar text,
    waktu_komentar timestamp default current_timestamp,
    username_pengguna varchar(255),
    ID_lagu int,
    foreign key (username_pengguna) references pengguna(username),
    foreign key (ID_lagu) references lagu(ID_lagu)
);
