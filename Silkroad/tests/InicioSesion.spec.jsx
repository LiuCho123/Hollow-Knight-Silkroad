import React from 'react';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {describe, it, expect, vi, beforeEach} from 'vitest';
import { BrowserRouter, useNavigate } from 'react-router-dom';
import InicioSesion from '../src/paginas/InicioSesion';

const navigate = vi.fn();
vi.mock('react-router-dom', async() => {
    const actual = await vi.importActual('react-router-dom');
    return{
        ...actual,
        useNavigate: () => navigate,
    };
});

describe("Componente InicioSesion", () => {
    beforeEach(() => {
        navigate.mockClear();
    });

    it("debe redirigir a /foro con credenciales correctas", async () => {
        const mockUsuarios = [
            {email: 'l.cabello@duocuc.cl', username: 'LiuCho', password: 'Password123'}
        ];

        vi.spyOn(globalThis, 'fetch').mockResolvedValue({
            ok: true,
            json: async() => mockUsuarios,
        });

        render(
            <BrowserRouter>
                <InicioSesion/>
            </BrowserRouter>
        );

        await userEvent.type(screen.getByLabelText(/Nombre de Usuario o Correo/i), 'l.cabello@duocuc.cl');
        await userEvent.type(screen.getByLabelText(/Contraseña/i), 'Password123');

        await userEvent.click(screen.getByRole('button', {name: /Iniciar sesión/i}));

        expect(navigate).toHaveBeenCalledWith("/foro");
    });
});