export class ApiResponse {
    code: number;   
    description: string | null;
    data: any | null;

    constructor(code: number = 500, description: string | null = 'Error', data: any | null = null) {
        this.code = code;
        this.description = description;
        this.data = data;
    }

    UpdateResponse(code: number, description: string | null, data: any | null) {
        this.code = code;
        this.description = description;
        this.data = data;
    }
}

// Personalizacion de la respuesta de la API para estandarizar las respuestas.
