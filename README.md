> \[NOTICE\] This project is unfinished and discontinued. The project wasn't meant to be a production-ready application to begin with. As the code writer I would say that the code (especially the frontend) is a jumbled mess (I was clueless on how I should write the code and ended up sorta like combining functional-component and class-component approach into one weird thingamajig) so... that's also one of the reason the project won't be continued. Anyway, thanks for your visit!

<br />
<div align="center">
  <a href="https://github.com/solsteace/melodiAja">
    <img src="public/static/img/meLogo.png" alt="Logo" width="100" height="100">
  </a>

<h3 align="center">MelodiAja</h3>
  <p align="center">
    <strong>Listen and share what you love :heart:</strong>
  </p>
</div>

## Tentang MelodiAja
![homePage](https://github.com/randhayoga/melodiAja/assets/92174528/cce8c3a2-dacf-401d-a164-000358459683)
<strong>MelodiAja</strong> adalah sebuah perangkat lunak yang dapat digunakan untuk mendengarkan musik secara streaming.
Aplikasi MelodiAja adalah aplikasi berbasis website dan dapat diakses secara online dengan menggunakan browser.<br><br>
Selain memutar musik, pengguna juga dapat:
* :bust_in_silhouette: Membuat akun.
* :notes: Membuat _playlist_ musik.
* :speech_balloon: Menyampaikan opini melalui kolom komentar.
* :guitar: Mengunggah musik untuk didengarkan oleh pengguna lain.

<br><strong>MelodiAja</strong> dibuat oleh kelompok <strong>Teh Pucuk</strong>
<br>Tujuan utama dibuatnya Aplikasi MelodiAja adalah untuk memenuhi tugas besar mata kuliah RPL: Implentasi dan Pengujian PL.

#### MelodiAja Dibangun Dengan:

Front-End:<br>
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![SASS](https://img.shields.io/badge/SASS-hotpink.svg?style=for-the-badge&logo=SASS&logoColor=white)<br>
Back-End:<br>
![MySQL](https://img.shields.io/badge/mysql-%2300f.svg?style=for-the-badge&logo=mysql&logoColor=white)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)<br>
IDE:<br>
![Neovim](https://img.shields.io/badge/NeoVim-%2357A143.svg?&style=for-the-badge&logo=neovim&logoColor=white)
![Visual Studio Code](https://img.shields.io/badge/Visual%20Studio%20Code-0078d7.svg?style=for-the-badge&logo=visual-studio-code&logoColor=white)<br>

<!-- GETTING STARTED -->
## Cara Mengakses MelodiAja
Untuk saat ini, aplikasi MelodiAja belum di-deploy dan dapat diakses menggunakan tautan tertentu.
 Oleh karena itu, MelodiAja hanya bisa digunakan dengan cara mem-build aplikasi di perangkat masing-masing.

### Prasyarat

* Perangkat Desktop atau Laptop
* Web Browser
* Git (untuk download melalui terminal/cmd)
* [Node.js](https://nodejs.org/en)
* [NPM](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)

### Download Source Code
#### Melaui Browser dan File Explorer
1. Buka https://github.com/solsteace/melodiAja
2. Klik ikon "<> Code" berwarna hijau
3. Klik "Download ZIP"
4. Buka folder dimana file melodiAja-main.zip yang telah didownload tersimpan
5. Extract melodiAja-main.zip
6. Buka folder melodiAja-main
    
#### Melalui Terminal / CMD
1. Pastikan Anda berada folder atau directory yang diinginkan untuk menyimpan file unduhan melodiAja
2. Clone repo:
   ```sh
   git clone https://github.com/solsteace/melodiAja
   ```
3. Buka directory /public/static<br>
   Pada Windows:
   ```sh
   cd .\melodiAja\
   ```
   Pada Linux/MacOS:
   ```sh
   cd /melodiAja/
   ```

### Download Aset
1. Buka https://drive.google.com/drive/folders/12wyFlBzj67VqKJirUUafh32RI7fwme3z?usp=sharing
2. Extract datastore.zip
3. Letakkan folder datastore di folder/direktori yang sama dengan file server.js di melodiAja-main

### Menjalankan MelodiAja
#### Proses di bawah berlaku untuk sistem operasi Windows, macOS, maupun Linux
1. Buka terminal atau powershell pada folder melodiAja
2. Install packages dan dependencies yang diperlukan oleh melodiAja:
   ```sh
   npm i
   ```
3. Buat *build directory*:
   ```sh
   npm run build
   ```
4. Jalankan server.js:
   ```sh
   node server.js
   ```
5. Ketik localhost:8069 pada kotak pencarian browser Anda.
   ```sh
   localhost:8069
   ```
