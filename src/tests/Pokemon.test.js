import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../helpers/renderWithRouter';

describe(' Teste o componente <Pokemon.js />', () => {
  it('Teste se é renderizado um card com as informações de determinado pokémon', () => {
    renderWithRouter(<App />);
    const btnPikachu = screen.getByRole('button', { name: /electric/i });
    userEvent.click(btnPikachu);
    const namePikachu = screen.getByText(/pikachu/i);
    const typeEletric = screen.getByTestId('pokemon-type');
    const averagePikachu = screen.getByText(/average weight: 6\.0 kg/i);
    const imgPikachu = screen.getByRole('img', { name: /pikachu sprite/i });

    expect(namePikachu).toHaveTextContent('Pikachu');
    expect(typeEletric).toHaveTextContent('Electric');
    expect(averagePikachu).toHaveTextContent('Average weight: 6.0 kg');
    expect(imgPikachu.src).toBe('https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
    expect(imgPikachu).toHaveAttribute('alt', 'Pikachu sprite');
  });

  it(`Teste se o card do Pokémon indicado na Pokédex contém 
        um link de navegação para exibir detalhes deste Pokémon.`, () => {
    renderWithRouter(<App />);
    const linkMoreDetails = screen.getByRole('link', { name: /more details/i });
    expect(linkMoreDetails.href).toBe('http://localhost/pokemons/25');
  });

  it(`Teste se ao clicar no link de navegação do Pokémon,é feito o redirecionamento
         da aplicação para a página de detalhes de Pokémon.
         && 
         Teste também se a URL exibida no navegador muda para /pokemon/<id>,
         onde <id> é o id do Pokémon cujos detalhes se deseja ver;`, () => {
    const { history } = renderWithRouter(<App />);
    const linkMoreDetails = screen.getByRole('link', { name: /more details/i });
    userEvent.click(linkMoreDetails);
    expect(history.location.pathname).toBe('/pokemons/25');
  });

  it('Teste se existe um ícone de estrela nos Pokémons favoritados.', () => {
    renderWithRouter(<App />);
    const linkMoreDetails = screen.getByRole('link', { name: /more details/i });
    userEvent.click(linkMoreDetails);
    const favoritePokemon = screen.getByRole('checkbox');
    userEvent.click(favoritePokemon);
    const starFavorite = screen.getByAltText(/Pikachu is marked/);
    expect(starFavorite).toHaveAttribute('src', '/star-icon.svg');
  });
});
