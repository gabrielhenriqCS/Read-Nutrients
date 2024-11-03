import React from "react";

export function ConsultarNutrientes() {
    return (
        <>
        <h1 className="font-bold text-3xl z-10">Consultar Nutrientes</h1>
        <div className="flex items-center mt-4 z-10">
            <input className="py-2 pr-10 pl-3 rounded box-border" type="text" name="codebar" id="codebar" />
            <button className="ml-2 bg-green-100 p-2 rounded font-semibold text-base w-24 hover:bg-green-600 hover:text-white active:bg-green-900">Consultar</button>
        </div>
        </>
    );
}