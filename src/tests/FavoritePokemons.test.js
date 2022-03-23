import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../helpers/renderWithRouter';

describe('Teste o componente <FavoritePokemons.js />', () => {
  it(`Teste se é exibido na tela a mensagem No favorite pokemon found,
         se a pessoa não tiver pokémons favoritos.`, () => {
    const { history } = renderWithRouter(<App />);

    history.push('/favorites');
    const errorPag = screen.getByText('No favorite pokemon found');
    expect(errorPag).toBeInTheDocument();
  });
  it('Teste se é exibido todos os cards de pokémons favoritados', () => {
    renderWithRouter(<App />);

    const moreDetails = screen.getByRole('link', { name: /more details/i });
    userEvent.click(moreDetails);

    const checkedBox = screen.getByRole('checkbox', { name: /pokémon favoritado\?/i });
    userEvent.click(checkedBox);

    const linkFavorites = screen.getByRole('link', { name: /favorite pokémons/i });
    userEvent.click(linkFavorites);

    const cardPikachu = screen.getByText(/pikachu/i);
    expect(cardPikachu).toBeInTheDocument();
  });
});
