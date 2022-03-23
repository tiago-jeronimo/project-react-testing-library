import React from 'react';
import { screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../helpers/renderWithRouter';

describe('Teste o componente <About.js />', () => {
  it('Teste se a página contém as informações sobre a Pokédex.', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/about');
    const aboutPokedex = screen.getByRole('heading', { name: /about pokédex/i });
    expect(aboutPokedex.textContent).toBe('About Pokédex');
  });
  it('Teste se a página contém um heading h2 com o texto About Pokédex', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/about');
    const aboutPokedex = screen.getByRole(
      'heading', { level: 2, name: /about pokédex/i },
    );
    expect(aboutPokedex.textContent).toBe('About Pokédex');
  });
  it('Teste se a página contém dois parágrafos com texto sobre a Pokédex.', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/about');
    const p1 = screen.getByText(/this application simulates a pokédex,/i);
    const p2 = screen.getByText(
      /one can filter pokémons by type, and see more details for each one of them/i,
    );
    expect(p1 && p2).toBeInTheDocument();
  });
  it('Teste se a página contém a imagem de uma Pokédex', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/about');
    const img = screen.getByRole('img', { name: /pokédex/i });
    expect(img.src).toContain('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
