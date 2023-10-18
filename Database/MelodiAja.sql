use melodiaja;

create table pengguna (
	ID_pengguna int auto_increment primary key,
    nama varchar(255) not null,
    email varchar(255) not null,
    kata_sandi varchar(255) not null,
    file_img_profile varchar(255)
);

create table album (
	ID_album int auto_increment primary key,
    judul_album varchar(255),
    file_img_album varchar(255),
    tanggal_rilis date,
    ID_pengguna int, 
    foreign key (ID_pengguna) references pengguna(ID_pengguna)
);

create table lagu (
	ID_lagu int auto_increment primary key,
    file_musik varchar(255) not null,
    file_img_lagu varchar(255),
    judul_lagu varchar(255) not null,
    genre varchar(255) not null,
    pencipta_lagu varchar(255) not null,
    durasi time, 
    jumlah_like int,
    jumlah_dislike int,
    ID_album int, 
    ID_artist int,
    foreign key (ID_album) references album(ID_album),
    foreign key (ID_artist) references pengguna(ID_Pengguna)
);

create table playlist (
	ID_playlist int auto_increment primary key,
    judul_playlist varchar(255) not null,
    ID_pemilik int,
    file_img_playlist varchar(255),
    foreign key (ID_pemilik) references pengguna(ID_pengguna)
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
    ID_pengguna int,
    ID_lagu int,
    foreign key (ID_pengguna) references pengguna(ID_pengguna),
    foreign key (ID_lagu) references lagu(ID_lagu)
);
