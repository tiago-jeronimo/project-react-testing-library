import React from 'react';
import { screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../helpers/renderWithRouter';

describe('Teste o componente <NotFound.js />', () => {
  it(`
  Teste se página contém um heading h2 com o texto Page requested not found 😭`, () => {
    const { history } = renderWithRouter(<App />);
    history.push('/epistemologia');
    const heanding = screen.getByRole('heading', {
      level: 2, name: /page requested not found crying/i,
    });
    expect(heanding).toBeInTheDocument();
  });
  it('Teste se página mostra a imagem', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/epistemologia');
    const img = screen.getByRole('img', {
      name: /pikachu crying because the page requested was not found/i,
    });
    expect(img.src).toContain('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
