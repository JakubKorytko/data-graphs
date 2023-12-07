import { NotificationInterface } from '../types/notifications.d';

export const generate = (code: number, message: string) => {

    const notification: NotificationInterface = {
        code: code ?? 0,
        title: `${message}`,
        body: 'Nieoczekiwany błąd. Skontaktuj się z administratorem.'
    }

    if (code === 0) notification.body = 'Nie można połączyć się z serwerem. Następna próba nastąpi za 5 sekund.';
    if (code === 1) notification.body = 'Pobieranie danych z serwera...';
    if (code === 2) notification.body = 'Próba połączenia z serwerem...';
    if (code === 3) notification.body = 'Udało się połączyć z serwerem.';
    if (code === 500) notification.body = 'Nie można pobrać danych z serwera. Następna próba nastąpi za 10 sekund.';
    if (code === 200) notification.body = 'Pobrano dane z serwera.';
    if (code === 409) notification.body = "Kanał z podaną nazwą już istnieje."

    if (code==1000 || code===1001) {
        notification.body = message;
        if (code===1000) notification.title = "Wrong name";
        notification.title = "Wrong number of clients";
    };
    
    return notification;
}