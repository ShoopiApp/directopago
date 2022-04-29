"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
var endpoint;
(function (endpoint) {
    endpoint["PROD"] = "https://checkout-api.directopago.com/v1";
    endpoint["DEV"] = "https://checkout-api-stg.directopago.com/v1";
})(endpoint || (endpoint = {}));
class DirectoPago {
    constructor(apikey, environment = 'development') {
        this.header = {
            Authorization: `Bearer ${apikey}`,
            'content-type': 'application/json'
        };
        this.url = environment === 'development' ? endpoint.DEV : endpoint.PROD;
    }
    CheckOutWithCardId(data) {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await axios_1.default.post(`${this.url}/checkout`, data, { headers: this.header });
                resolve(response.data);
            }
            catch (error) {
                if (error)
                    reject(error.response.data);
            }
        });
    }
    DeleteCardId(id) {
        return new Promise(async (resolve) => {
            try {
                await axios_1.default.delete(`${this.url}/cards/${id}`, { headers: this.header });
                resolve();
            }
            catch (error) {
                if (error)
                    throw new Error(error);
            }
        });
    }
}
exports.default = DirectoPago;
