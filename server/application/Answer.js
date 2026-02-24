class Answer {
    bad(errorCode) {
        // Для списка кодов ошибок создать отдельный файл или прописать в едином месте api.md
        switch(errorCode) {
            case 11:
                return { error: 'Ошибка авторизации' };
                break;
            default:
                return { error: 'Разрабы дауны, ошибку не указали' };
        }
    }
    good(data) {
        return data;
    }
}