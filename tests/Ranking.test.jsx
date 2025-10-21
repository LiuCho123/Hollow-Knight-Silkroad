import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import RankingPage from '../src/paginas/Ranking'; 

vi.mock('../src/data/ChecklistContext', async (importOriginal) => {
    const mod = await importOriginal();
    return {
        ...mod,
        useChecklist: vi.fn(), 
    };
});
import { useChecklist } from '../src/data/ChecklistContext';

describe('Componente RankingPage', () => {

    beforeEach(() => {
        vi.clearAllMocks(); 
    });

    it('4. Muestra nombre de usuario ("prueba") y su porcentaje (35.50%)', () => {
        useChecklist.mockReturnValue({ currentPercentage: 35.50, isLoading: false });

        render(
            <BrowserRouter>
                <RankingPage />
            </BrowserRouter>
        );

        const userRow = screen.getByText(/prueba \(Tú\)/i);
        expect(userRow).toBeInTheDocument();

        const listItem = userRow.closest('li');
        expect(listItem).toHaveTextContent('35.50%');
        expect(listItem).toHaveClass('current-user');
    });

    it('5. Muestra la lista ordenada por porcentaje descendente', () => {
        useChecklist.mockReturnValue({ currentPercentage: 35.50, isLoading: false });

        render(
            <BrowserRouter>
                <RankingPage />
            </BrowserRouter>
        );

        const listItems = screen.getAllByRole('listitem')
                           .filter(li => li.classList.contains('ranking-item')); 

        expect(listItems[0]).toHaveTextContent('Hornet');
        expect(listItems[0]).toHaveTextContent('112.00%');
        
        expect(listItems[5]).toHaveTextContent(/prueba \(Tú\)/i);
        expect(listItems[5]).toHaveTextContent('35.50%');

        expect(listItems[6]).toHaveTextContent('Iselda');
        expect(listItems[6]).toHaveTextContent('25.00%');
    });
});