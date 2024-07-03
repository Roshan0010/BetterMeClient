import { Account, Client, Databases, ID, Query, Storage } from "appwrite";

export const client = new Client()
    .setEndpoint(import.meta.env.VITE_APPWRITE_URL)
    .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID);

export const storage = new Storage(client);
export const account = new Account(client);
export const database = new Databases(client);
export const id = ID;
export const  query= Query
