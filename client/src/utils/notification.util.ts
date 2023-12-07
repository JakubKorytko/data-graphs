import { NotificationInterface } from '../types/notifications.d';

export const generate = (code: number, message: string) => {

    const notification: NotificationInterface = {
        code: code ?? 0,
        title: `${message}`,
        body: 'Nieoczekiwany błąd. Skontaktuj się z administratorem.'
    }

    if (code === 1) notification.body = 'Ponowna próba połączenia z serwerem...';
    if (code === 500) notification.body = 'Nie można połączyć się z serwerem. Spróbuj ponownie później lub skontaktuj się z administratorem. Ponowna próba połączenia nastąpi za 10 sekund.';
    if (code === 200) notification.body = 'Połączenie z serwerem zostało nawiązane.';
    if (code === 409) notification.body = "Kanał z podaną nazwą już istnieje."

    if (code==1000 || code===1001) {
        notification.body = message;
        if (code===1000) notification.title = "Wrong name";
        notification.title = "Wrong number of clients";
    };
    
    return notification;
}