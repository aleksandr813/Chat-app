import { TMessages, TUser } from "../server/types";

const TOKEN = 'token';

class Store {
    [key: string]: any;
    user: TUser | null = null;
    messages: TMessages = [];
    chatHash: string = 'empty chat hash';

    setToken(token: string): void {
        localStorage.setItem(TOKEN, token);
    }

    setName(name: string): void {
        
    }

    getToken(): string | null {
        return localStorage.getItem(TOKEN);
    }

    setUser(user: TUser): void {
        const { token } = user;
        this.setToken(token);
        this.user = user;
    }

    getUser(): TUser | null {
        return this.user;
    }

    clearUser(): void {
        this.user = null;
        this.setToken('');
    }

    addMessages(messages: TMessages): void {
        if (messages && messages.length > 0) {
            this.messages = messages;
        }
    }

    getMessages(): TMessages {
        return this.messages;
    }

    clearMessages(): void {
        this.messages = [];
    }

    getChatHash(): string {
        return this.chatHash;
    }

    setChatHash(hash: string): void {
        this.chatHash = hash;
    }

}

export default Store;