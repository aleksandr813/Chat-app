export type TUser = {
    token: string;
    name: string;
    id?: number;
}

export type TMessage = {
    message: string;
    author: string;
    created: string;
}

export type TMessages = TMessage[];

export interface TMessagesResponse {
    messages: TMessages;
    hash: string;
}

export type TChatMessage = {
    id: number;
    text: string;
    time: string;
    author: string;
    author_id: number;
}

export type TChatUser = {
    id: number;
    name: string;
    isOnline: boolean;
}

export interface TUpdateChatData {
    hash: string;
    messages: TChatMessage[] | null;
    users: TChatUser[];
}

