# AcquisitionChannels

- [AcquisitionChannels](#acquisitionchannels)
- [Struktura Repozytorium](#struktura-repozytorium)
- [Technologie](#technologie)
- [Funkcje](#funkcje)
- [Instalacja](#instalacja)
  - [Wymagania](#wymagania)
  - [Krok po kroku](#krok-po-kroku)
- [Konfiguracja](#konfiguracja)
  - [Zmiana domyślnego adresu klienta (Cors)](#zmiana-domyślnego-adresu-klienta-cors)
  - [Zmiana domyślnego adresu serwera](#zmiana-domyślnego-adresu-serwera)
- [Ścieżki API](#ścieżki-api)
  - [GET /channels/read](#get-channelsread)
  - [POST /channels/create](#post-channelscreate)
    - [Parametry](#parametry)
  - [PUT /channels/update/{id}](#put-channelsupdateid)
    - [Parametry](#parametry-1)
  - [DELETE /channels/delete/{id}](#delete-channelsdeleteid)
- [Testy](#testy)
  - [Testowanie serwera](#testowanie-serwera)
  - [Testowanie klienta](#testowanie-klienta)


Aplikacja składa się z dwóch części: frontendu i backendu, które są zaimplementowane w dwóch osobnych folderach "server" i "client". Backend został stworzony w frameworku Laravel w języku PHP, natomiast frontend w React z użyciem TypeScriptu. Aplikacja umożliwia pobieranie danych z bazy danych (CRUD) dotyczących kanałów pozyskiwania klientów oraz ilości klientów zdobytych za pomocą poszczególnych kanałów, a następnie wyświetla je wraz z wykresem kołowym. Użytkownicy mogą dodawać, edytować i usuwać rekordy w bazie danych za pomocą intuicyjnego UI. Aplikacja posiada pełną obsługę błedów (po stronie serwera jak i klienta). Do generowania wykresów wykorzystana została biblioteka "react-chartjs-2".

# Struktura Repozytorium

Repozytorium jest podzielone na 2 osobne części: frontend i backend, które są zorganizowane w osobnych folderach "server" i "client". Oto krótki opis struktury repozytorium:

- server: Folder zawierający kod backendu aplikacji, napisanego w frameworku Laravel w języku PHP. Znajdują się tu pliki związane z logiką biznesową, zarządzaniem bazą danych oraz obsługą API.

- client: Folder zawierający kod frontendu aplikacji, napisanego w React z użyciem TypeScriptu. Znajdują się tu pliki związane z komponentami interfejsu użytkownika, logiką interakcji z użytkownikiem oraz komunikacją z backendem.

Dodatkowo, w repozytorium mogą znajdować się inne pliki takie jak pliki konfiguracyjne, pliki testowe, dokumentacja, czy pliki zasobów  używanych w aplikacji.

# Technologie

Aplikacja "AcquisitionChannels" została zbudowana przy użyciu następujących technologii:

Backend:

- Laravel: Popularny framework do tworzenia aplikacji webowych w języku PHP.

- PHPUnit - Framework do testowania aplikacji napisanych w PHP. Wybrany ze względu na jego popularność w społeczności programistycznej.

- MySQL: Relacyjna baza danych, użyta do przechowywania danych w aplikacji.
  
Frontend:

- React: Popularna biblioteka JavaScript do budowy interfejsów użytkownika.

- TypeScript: Rozszerzenie języka JavaScript o statyczną typizację. Wybrany ze względu na możliwość wykrywania błędów na etapie kompilacji oraz ułatwienie pracy z większymi projektami.

- Bootstrap: Popularna biblioteka CSS do tworzenia responsywnych interfejsów użytkownika.

Biblioteki i narzędzia dodatkowe:

- react-chartjs-2: Biblioteka do generowania interaktywnych wykresów w aplikacjach React, wykorzystana do tworzenia wykresów w aplikacji.

- Git: System kontroli wersji, wykorzystany do zarządzania kodem źródłowym aplikacji i współpracy zespołowej.

- react-loader-spinner: Biblioteka do wyświetlania ładowania w aplikacjach React, wykorzystana dokładnie w tym celu.

- Vite: Szybki i minimalistyczny bundler dla aplikacji frontendowych, wykorzystany do budowania aplikacji.

# Funkcje

- Wyświetlanie danych o kanałach pozyskania klientów: Aplikacja pobiera dane z bazy danych (CRUD) dotyczące kanałów pozyskania klientów, takich jak nazwa kanału i liczba klientów zdobytych danym kanałem (np. YouTube), a następnie wyświetla je na interfejsie użytkownika.

- Tworzenie nowych rekordów: Użytkownik może dodawać nowe rekordy do bazy danych, dodając nowe kanały pozyskania klientów i ich liczby.

- Edycja i usuwanie istniejących rekordów: Użytkownik ma możliwość edytowania lub usuwania istniejących rekordów dotyczących kanałów pozyskania klientów, co umożliwia aktualizację danych w bazie danych.

- Generowanie wykresów: Aplikacja wykorzystuje bibliotekę react-chartjs-2 do generowania interaktywnych wykresów na podstawie danych o kanałach pozyskania klientów, co pozwala na wizualizację tych danych w postaci wykresów.

- Obsługa błędów: Aplikacja jest zoptymalizowana pod kątem obsługi błędów, takich jak błędy komunikacji z serwerem, błędy walidacji danych itp. Dzięki temu użytkownicy otrzymują odpowiednie komunikaty o błędach, co poprawia użyteczność aplikacji.

- Powiadomienia w formie toastów: Aplikacja wykorzystuje elementy biblioteki Bootstrap do wyświetlania powiadomień w formie toastów, które informują użytkownika o sukcesie lub niepowodzeniu operacji.

# Instalacja

## Wymagania

- PHP 7.4 lub nowszy
- MySQL 5.7 lub nowszy
- Node.js 14 lub nowszy
- Composer 2.0 lub nowszy do zarządzania zależnościami w projekcie backendowym
- NPM lub Yarn do zarządzania zależnościami w projekcie frontendowym
- Działająca bazą danych (preferowany MySQL) do przechowywania danych

## Krok po kroku

1. Sklonuj repozytorium poleceniem
```
git clone https://github.com/JakubKorytko/AcquisitionChannels.git
```
2. Przejdź do folderu "server" i wykonaj polecenie:
```
composer install
```

3. Skopiuj plik ".env.example" z folderu "server" i zmień jego nazwę na ".env". W pliku ".env" ustaw parametry połączenia z bazą danych. Przykładowe ustawienia:
```
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=laravel
DB_USERNAME=root
DB_PASSWORD=
```

W pliku ".env" znajdują się również inne ustawienia, które można zmienić wedle uznania. Np. ustawienie "SERVER_PORT" na 3000 spowoduje, że serwer będzie dostępny pod adresem "http://127.0.0.1:3000".

4. Wykonaj migrację bazy danych poleceniem:
```
php artisan migrate
```

5. Wykonaj seedowanie bazy danych poleceniem:
```
php artisan db:seed
```

6. Stwórz klucz aplikacji poleceniem:
```
php artisan key:generate
```

7. Uruchom serwer backendowy poleceniem:
```
php artisan serve
```

8. Przejdź do folderu "client" i wykonaj polecenie:
```
npm install
```
lub
```
yarn install
```

9. Uruchom serwer frontendowy poleceniem:
```
npm run dev
```
lub
```
yarn dev
```

Aplikacja jest dostępna pod adresem "http://localhost:5173" (domyślny port).

# Konfiguracja

## Zmiana domyślnego adresu klienta (Cors)

Aby uruchomić klienta na innym adresie niż domyślny, należy ustawić zmienną środowiskową "PORT" przed uruchomieniem klienta. Przykładowe ustawienie:
```
PORT=5173
```

W przypadku użycia innego adresu niż "http://localhost" lub "http://127.0.0.1" (porty są dowolne) do uruchomienia aplikacji, należy zmienić ustawienia CORS w pliku "server/app/Http/Middleware/Cors.php". Wartość zmiennej "allowed_origins" powinna zawierać adres serwera frontendowego.

## Zmiana domyślnego adresu serwera

Aby zmienić port domyślny serwera, należy zmienić ustawienia w pliku ".env". Wartość zmiennej "SERVER_PORT" powinna zawierać port serwera.

W przypadku użycia innego adresu niż domyślny do uruchomienia serwera backendowego, należy zmienić ustawienia w pliku "client/src/utils/api.util.js". Wartość zmiennej `url` (3 linijka) powinna zawierać adres serwera backendowego wraz z portem (bez slasha końcowego).

# Ścieżki API

## GET /channels/read

Zwraca listę wszystkich kanałów pozyskania klientów.

## POST /channels/create

Tworzy nowy kanał pozyskania klientów.

### Parametry

- name: nazwa kanału pozyskania klientów (string, wymagany)
- clients: liczba klientów pozyskanych przez kanał (int, wymagany)

## PUT /channels/update/{id}

Aktualizuje istniejący kanał pozyskania klientów.

### Parametry

- name: nowa nazwa kanału pozyskania klientów (string, wymagany)
- clients: nowa liczba klientów pozyskanych przez kanał (int, wymagany)

## DELETE /channels/delete/{id}

Usuwa istniejący kanał pozyskania klientów.

# Testy

## Testowanie serwera

Testy zostały napisane przy użyciu frameworka PHPUnit. Aby uruchomić testy, należy przejść do folderu "server" i wykonać polecenie:
```
php artisan test
```

## Testowanie klienta

Testy zostały napisane przy użyciu biblioteki React Testing Library oraz Jest. Aby uruchomić testy, należy przejść do folderu "client" i wykonać polecenie:
```
npm run test
```
lub
```
yarn test
```