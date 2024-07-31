/***
 * Adaptar una funcionalidad externa a mi codigo
 */

import axios from "axios"
// ocultan la implementacion
export interface HttpAdapter {

    get<T>(url: string): Promise<T>;
}

/***
 * 
 */
export class PokeApiFetchAdapter implements HttpAdapter{
    async get<T>( url: string): Promise<T>{
        // peticion get
        const resp =  await fetch(url);
        console.log('Response fetch:', resp);
        const data: T = await resp.json();
        console.log('Response.json:', data);
        return data;
    }
}


export class PokeApiAdapter implements HttpAdapter{

    private readonly axios = axios;

    async get<T>( url: string): Promise<T>{
        // peticion get
        const { data } = await this.axios.get<T>(url);
        return data;
    }

    async post( url: string){
        
    }

    async patch( url: string){
        
    }

    async delete( url: string){
        
    }
}