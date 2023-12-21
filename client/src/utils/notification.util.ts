import { NotificationInterface } from './notification.util.type';

// ważne: nie są to kody odpowiedzi http, tylko niestandardowe kody błędów powiadomień

const codes: {[key: number]: string} = {
    0: 'Nie można połączyć się z serwerem. Następna próba nastąpi za 5 sekund.',
    1: 'Pobieranie danych z serwera...',
    2: 'Próba połączenia z serwerem...',
    3: 'Udało się połączyć z serwerem.',

    200: 'Pobrano dane z serwera.',
    409: "Kanał z podaną nazwą już istnieje.",
    500: 'Nie można pobrać danych z serwera. Następna próba nastąpi za 10 sekund.',
}

const titles: {[key: number]: string} = {
    1000: 'Wrong name',
    1001: 'Wrong number of clients',

    400: 'Błąd w żądaniu',
    401: 'Brak autoryzacji',
    403: 'Brak dostępu',
    404: 'Nie znaleziono'
}

export const generate = (code: number, message: string) => {

    const notification: NotificationInterface = {
        code: code ?? 0,
        title: `${message}`,
        body: 'Nieoczekiwany błąd. Skontaktuj się z administratorem.'
    }

    if (codes[code]) notification.body = codes[code]

    else if (code==1000 || code===1001) {
        notification.body = message;
        if (code===1000) notification.title = "Wrong name";
        else notification.title = "Wrong number of clients";
    }

    else if (code >= 400 && code < 500) {
        notification.body = message;
        notification.title = 'Błąd w żądaniu';
    };

    return notification;
}
