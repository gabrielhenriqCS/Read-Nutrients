"use client"
import React, { useState } from "react";

export function ConsultarNutrientes() {
    const [erro, setErro] = useState(false);
    const [codeBar, setCodeBar] = useState<number | null>(null);

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        const numberValue = value ? Number(value) : null;
        setCodeBar(numberValue);
        setErro(false);
    }

    const MsgError = () => {
        if (codeBar === null) {
            setErro(true);
        } else {
            setErro(false);
        }
    }

    return (
        <>
        <h1 className="font-bold text-3xl z-10">Consultar Nutrientes</h1>
        <div className="flex items-center mt-4 z-10">
            <input className="py-3 pr-10 pl-3 rounded box-border" type="text" name="codebar" id="codebar"  placeholder="Digite o código de barras" onChange={handleInput} />
            <button className="ml-2 bg-green-100 p-3 rounded font-semibold text-base w-24 hover:bg-green-600 hover:text-white active:bg-green-900" onClick={MsgError}>Consultar</button>
        </div>
       {erro && <div className="bg-red-300 p-2 rounded text-red-800 z-10 mt-4">
                <h1>A requisição não foi bem sucedida.</h1>
            </div>}
        {codeBar !== null && !erro && <div className="bg-green-300 p-2 rounded text-green-800 z-10 mt-4">
                <h1>Consulta realizada com sucesso.</h1>
            </div>}
        </>
    );
}