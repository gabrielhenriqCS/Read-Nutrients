
const API_URL = 'http://localhost:5000/consultanutrientes';

export async function getHistorico() {
    const response = await fetch(`${API_URL}/`);
    if (!response.ok) {
        throw new Error(`Erro ao carregar dados: ${response.status} ${response.statusText}`);
    }
    const data = await response.json();
    return data;
}

export async function postHistorico() {
    const body = {
        data: new Date().toLocaleTimeString(),
        titulo: 'Consulta de nutrientes',
        dados: {
            calorias: 0,
            proteinas: 0,
            carboidratos: 0,
            gorduras: 0,
            fibras: 0
        }
    }
    const response = await fetch(`${API_URL}/fazer-consulta`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    });
    if (!response.ok) {
        throw new Error("Erro ao enviar dados");
    }
    return response.json();
}
