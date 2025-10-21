import React from 'react';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {describe, it, expect} from 'vitest';
import {BrowserRouter, useParams} from 'react-router-dom';
import Hilo from '../src/paginas/Hilo';

const navigateSpy = vi.fn();

vi.mock('react-router-dom', async() => {
    const actual = await vi.importActual('react-router-dom');
    return{
        ...actual,
        useNavigate: () => navigateSpy,
        useParams: () => ({hiloId: '1'}),
    };
});

describe("Componente Hilo", () => {

    beforeEach(() => {
        navigateSpy.mockClear();
        vi.spyOn(globalThis, "fetch").mockRestore();
        vi.spyOn(window, "confirm").mockClear;
    })
    it("debe mostrar una respuesta al enviarla", async() => {
        const mockHilos = [
            {
                id: 1,
                titulo: "Hilo de prueba",
                autor: "AutorPrueba",
                mensajes: [
                    {id: 101, autor: "AutorPrueba", contenido: "Mensaje original", fecha: new Date().toISOString()}
                ]
            }
        ];

        vi.spyOn(globalThis, 'fetch').mockResolvedValue({
            ok: true,
            json: async () => mockHilos,
        });

        render(
            <BrowserRouter>
                <Hilo />
            </BrowserRouter>
        );

        await screen.findByText("Mensaje original");

        const respuestaInput = screen.getByLabelText(/Escribe una respuesta/i);
        const submitButton = screen.getByRole("button", {name: /Publicar respuesta/i});

        const textoRespuesta = "Esta es una nueva respuesta de prueba.";
        await userEvent.type(respuestaInput, textoRespuesta);
        await userEvent.click(submitButton);

        const nuevaRespuesta = await screen.findByText(textoRespuesta);
        expect(nuevaRespuesta).toBeInTheDocument();
    })

    it("debe navegar a /foro al eliminar el hilo", async() =>{
        vi.spyOn(window, 'confirm').mockReturnValue(true);

        const mockHilos = [
            {
                id: 1,
                titulo: "Hilo de prueba para eliminar",
                autor: "AutorPrueba",
                mensajes: [{id: 101, autor: "AutorPrueba", contenido: "Mensaje", fecha: new Date().toISOString()}]
            }
        ];

        vi.spyOn(globalThis, "fetch").mockResolvedValue({
            ok: true,
            json: async() => mockHilos,
        });

        render(
            <BrowserRouter>
                <Hilo />
            </BrowserRouter>
        );

        const deleteButton = await screen.findByRole("button", {name: /Eliminar Hilo/i});

        await userEvent.click(deleteButton);

        expect(navigateSpy).toHaveBeenCalledWith("/foro");
    });
});