use MelodiAja;

create table Pengguna (
	ID_Pengguna int auto_increment primary key,
    Nama varchar(255) not null,
    Email varchar(255) not null,
    Kata_Sandi varchar(255) not null
);

create table Album (
	ID_Album int auto_increment primary key,
    Judul_Album varchar(255),
    Tanggal_Rilis date,
    ID_Pengguna int, 
    foreign key (ID_Pengguna) references Pengguna(ID_Pengguna)
);

create table Lagu (
	ID_Lagu int auto_increment primary key,
    File_Musik varchar(255) not null,
    Judul_Lagu varchar(255) not null,
    Genre varchar(255) not null,
    Nama_Artist varchar(255),
    Durasi time, 
    Jumlah_Like int,
    Jumlah_Dislike int,
    ID_Album int, 
    foreign key (ID_Album) references Album(ID_Album)
);

create table Playlist (
	ID_Playlist int auto_increment primary key,
    Judul_Playlist varchar(255) not null,
    ID_Pemilik int,
    foreign key (ID_Pemilik) references Pengguna(ID_Pengguna)
);

create table Playlist_Item (
	ID_Item int auto_increment primary key,
    ID_Playlist int,
    ID_Lagu int,
    foreign key (ID_Playlist) references Playlist(ID_Playlist),
    foreign key (ID_Lagu) references Lagu(ID_Lagu)
);

create table Komentar (
	ID_Komentar int auto_increment primary key,
    Isi_Komentar text,
    Waktu_Komentar timestamp default current_timestamp,
    ID_Pengguna int,
    ID_Lagu int,
    foreign key (ID_Pengguna) references Pengguna(ID_Pengguna),
    foreign key (ID_Lagu) references Lagu(ID_Lagu)
);
