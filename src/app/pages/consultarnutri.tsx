"use client"
import React, { useState } from "react";

export function ConsultarNutrientes() {
    const [erro, setErro] = useState(false);
    const [codeBar, setCodeBar] = useState<string | null>();

    const MsgErro = () => {
        if (!codeBar) {
            setErro(true);
        } else {
            setErro(false);
        }
    }

    return (
        <>
        <h1 className="font-bold text-3xl z-10">Consultar Nutrientes</h1>
        <div className="flex items-center mt-4 z-10">
            <input className="py-2 pr-10 pl-3 rounded box-border" type="text" name="codebar" id="codebar"  placeholder="Digite o código de barras" onChange={(e) => setCodeBar(e.target.value)} />
            <button className="ml-2 bg-green-100 p-2 rounded font-semibold text-base w-24 hover:bg-green-600 hover:text-white active:bg-green-900" onClick={MsgErro}>Consultar</button>
        </div>
       {erro && <div className="bg-red-300 p-2 rounded text-red-800 z-10 mt-4">
                <h1>A requisição não foi bem sucedida.</h1>
            </div>  }
        </>
    );
}