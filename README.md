<a name="readme-top"></a>


<br />
<div align="center">
<h3 align="center">H2.live scraper</h3>

  <p align="center">
    Ein simpler Web-Scraper für h2.live, der Daten in festgelegten Intervallen sammelt und in einer mongoDB-Datenbank speichert.
    Die Daten können für weitere Analyse und Visualisierung heruntergeladen werden oder über eine API abgefragt werden.
    <br />
    <br />
    <a href="https://github.com/bambusgamer/h2.live-scraper/issues">Bug reporten</a>
    ·
    <a href="https://github.com/bambusgamer/h2.live-scraper/issues">Request Feature</a>
  </p>
</div>


<!-- TABLE OF CONTENTS -->
<details>
  <summary>Inhalt</summary>
  <ol>
    <li>
      <a href="#das-projekt">Das Projekt</a>
    </li>
    <li>
      <a href="#lokal-installieren">Lokal installieren</a>
      <ul>
        <li><a href="#voraussetzungen">Voraussetzungen</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#nutzung">Nutzung</a></li>
    <li><a href="#lizenz">Lizenz</a></li>
    <li><a href="#kontakt">Kontakt</a></li>
  </ol>
</details>


<!-- ABOUT THE PROJECT -->
## Das Projekt

Dies ist ein einfacher Web-Scraper der für eins im Erzgebirge entwickelt wurde. Er sammelt Daten von der Website h2.live und speichert sie in einer MongoDB-Datenbank. 
Die Daten können dann für weitere Analyse und Visualisierung heruntergeladen oder über eine API abgefragt werden.

Eine Demo kann [hier](https://hopium.funkloch.net/) gefunden werden.
Zur Auswertung wird eine beispielhafte Excel-Tabelle [hier](https://github.com/bambusgamer/h2.live-scraper/blob/main/analyse.xlsx) bereitgestellt.

<p align="right">(<a href="#readme-top">zurück hoch</a>)</p>


<!-- GETTING STARTED -->
## Lokal installieren

Um das Projekt lokal zu installieren und zu verwenden, folgen Sie den unten stehenden Schritten.

### Voraussetzungen

* eine MongoDB-Datenbank Instanz
* npm

  ```sh
  npm install npm@latest -g
  ```

### Installation

1. repository klonen.
   ```sh
   git clone https://github.com/bambusgamer/h2.live-scraper.git
   ```
2. npm packages installieren.
   ```sh
   npm install
   ```
3. Kopieren Sie die .env-example Datei und benennen Sie sie in .env um.
   ```sh
   cp .env-example .env
   ```
4. Füllen Sie die .env-Datei mit den entsprechenden Informationen aus.
   ```JS
    PORT=3000
    MONGO_URI=mongodb://localhost:27017/h2live
    INTERVAL_MINUTES=3
    ```
5. Starten Sie den Server.
   ```sh
   pnpm run start
   ```
6. Besuchen Sie `http://localhost:3000/`, um auf den Server zuzugreifen (Port kann in der .env-Datei geändert werden).

(Optional kann der Server über die bereitgestellte pm2 Konfiguration gestartet werden, um ihn im Hintergrund laufen zu lassen.)

<p align="right">(<a href="#readme-top">zurück hoch</a>)</p>


<!-- NUTZUNG EXAMPLES -->
## Nutzung

Der Server beginnt nach dem Start, Daten von h2.live zu sammeln und in der angegebenen MongoDB-Datenbank zu speichern.

Sie können die gesammelten Daten als .csv-Dateien herunterladen, indem Sie `http://localhost:3000/` besuchen.

Die Daten können auch über eine API abgefragt werden. Die API-Endpunkte sind:

* `/api/v1/data/combined.zip` - gibt alle gesammelten Daten als Zip-Datei zurück
* `/api/v1/data/stations.csv` - gibt die Daten der Stationen als .csv-Datei zurück
* `/api/v1/data/fueling-events.csv` - gibt die Daten der Tankvorgänge als .csv-Datei zurück
* `/api/v1/data/downtimes.csv` - gibt die Daten der Ausfälle als .csv-Datei zurück

Eine Demo der API kann [hier](https://hopium.funkloch.net/) gefunden werden.

Die Daten können mit der Demo-Excel-Tabelle [hier](https://github.com/bambusgamer/h2.live-scraper/blob/main/analyse.xlsx) ausgewertet werden.

<p align="right">(<a href="#readme-top">zurück hoch</a>)</p>


<!-- LICENSE -->
## Lizenz

Unter der MIT-Lizenz. Siehe `LICENSE` für weitere Informationen.

<p align="right">(<a href="#readme-top">zurück hoch</a>)</p>


<!-- CONTACT -->
## Kontakt

E-Mail: lauckner.vincent@gmail.com

Projektlink: [https://github.com/bambusgamer/h2.live-scraper](https://github.com/bambusgamer/h2.live-scraper)

<p align="right">(<a href="#readme-top">zurück hoch</a>)</p>
