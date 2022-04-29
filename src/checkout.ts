import axios, { AxiosRequestHeaders } from 'axios';
import { CardIdBody } from './classes/RequestBody';
import { ServerError, ServerResponse } from './classes/ServerResponse';

export type Environment = | 'development' | 'production';

enum endpoint {
    PROD = 'https://checkout-api.directopago.com/v1',
    DEV = 'https://checkout-api-stg.directopago.com/v1'
}

export default class DirectoPago {
    private url: string;
    private header: AxiosRequestHeaders; 

    constructor(apikey: string, environment: Environment = 'development') {
        this.header = {
            Authorization: `Bearer ${apikey}`,
            'content-type': 'application/json'
        };
        this.url = environment === 'development' ? endpoint.DEV : endpoint.PROD;
    }

    public CheckOutWithCardId(data: CardIdBody): Promise<ServerResponse | ServerError> {
        return new Promise(async (resolve, reject) => {
            try {                
                const response = await axios.post(`${this.url}/checkout`, data, { headers: this.header });
                resolve(response.data);
            } catch (error) {
                if (error) reject(error.response.data);
            }
        });
    }

    public DeleteCardId(id: string): Promise<ServerResponse | ServerError | void> {
        return new Promise(async (resolve) => {
            try {
                await axios.delete(`${this.url}/cards/${id}`, { headers: this.header });
                resolve();
            } catch (error) {
                if (error) throw new Error(error);
            }
        });
    }
}