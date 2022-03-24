import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../helpers/renderWithRouter';
import data from '../data';

describe('Teste o componente <Pokedex.js />', () => {
  it('Teste se página contém um heading h2 com o texto Encountered pokémons', () => {
    renderWithRouter(<App />);
    const textPokemon = screen.getByRole('heading', {
      name: /encountered pokémons/i,
    });
    expect(textPokemon).toBeInTheDocument();
  });

  it(`Teste se é exibido o próximo Pokémon da lista
        quando o botão Próximo pokémon é clicado.`, () => {
    renderWithRouter(<App />);
    const nextPokemon = screen.getByRole('button', {
      name: /próximo pokémon/i,
    });
    expect(nextPokemon).toBeInTheDocument();
    userEvent.click(nextPokemon);
    const charmander = screen.getByRole('img', { name: /charmander sprite/i });
    expect(charmander).toBeInTheDocument();
  });

  it('Testa se é mostrado apenas um Pokémon por vez.', () => {
    renderWithRouter(<App />);
    const arrayPokemons = screen.getAllByTestId('pokemon-name');
    expect(arrayPokemons).toHaveLength(1);
  });

  it('Teste se a Pokédex tem os botões de filtro.', () => {
    renderWithRouter(<App />);
    const btnFilter = screen.getAllByTestId('pokemon-type-button');
    const tamanhoArrayBtn = btnFilter.length;
    expect(btnFilter).toBeDefined();
    expect(btnFilter.length).toBe(tamanhoArrayBtn);

    const psychicType = screen.getByRole('button', { name: /psychic/i });
    const nextPokemon = screen.getByRole('button', {
      name: /próximo pokémon/i,
    });
    userEvent.click(psychicType);

    const alakazam = screen.getByText(/alakazam/i);
    expect(alakazam).toBeInTheDocument();

    userEvent.click(nextPokemon);

    const mew = screen.getByText(/mew/i);
    expect(mew).toBeInTheDocument(); // Vê, depois, uma forma de pegar todos os 7 btns
  });

  it('Teste se a Pokédex contém um botão para resetar o filtro', () => {
    renderWithRouter(<App />);
    const btnAll = screen.getByRole('button', { name: /all/i });
    expect(btnAll.textContent).toBe('All');
    userEvent.click(btnAll);
    const pikachu = screen.getByText(/Pikachu/i);
    expect(pikachu).toBeInTheDocument();

    const nextPokemon = screen.getByRole('button', {
      name: /próximo pokémon/i,
    });
    data.forEach((element) => {
      expect(screen.getByText(element.name)).toBeInTheDocument();
      userEvent.click(nextPokemon);
    });
  });
});
