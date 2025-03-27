export type Message = {
   _id: string;
   content: string,
   author: {
      username: string,
   },
   date: string,
};

export enum CHAT_TYPES {
   DIRECT = "DIRECT",
   GROUP = "GROUP",
   NONE = '',
}
