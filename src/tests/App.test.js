import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../helpers/renderWithRouter';

describe('Teste o componente <App.js />', () => {
  it(
    'Testa se o topo da aplicação contém um conjunto fixo de links de navegação', () => {
      renderWithRouter(<App />);
      const home = screen.getByRole('link', { name: /home/i });
      const about = screen.getByRole('link', { name: /about/i });
      const favorite = screen.getByRole('link', { name: /favorite pokémons/i });
      expect(home.textContent).toBe('Home');
      expect(about.textContent).toBe('About');
      expect(favorite.textContent).toBe('Favorite Pokémons');
    },
  );
  it(
    'Se é redirecionada para a página inicial, ao clicar no link Home', () => {
      const { history } = renderWithRouter(<App />);
      const home = screen.getByRole('link', { name: /home/i });
      expect(home).toBeInTheDocument();
      userEvent.click(home);
      // console.log(history);
      expect(history.location.pathname).toBe('/');
    },
  );
  it(
    'Se é redirecionada para a página de About ao clicar no link About', () => {
      const { history } = renderWithRouter(<App />);
      const about = screen.getByRole('link', { name: /about/i });
      expect(about).toBeInTheDocument();
      userEvent.click(about);
      // console.log(history);
      expect(history.location.pathname).toBe('/about');
    },
  );
  it(
    'Se é redirecionada à Pokémons Favoritados ao clicar em Favorite Pokémons', () => {
      const { history } = renderWithRouter(<App />);
      const favorite = screen.getByRole('link', { name: /favorite pokémons/i });
      expect(favorite).toBeInTheDocument();
      userEvent.click(favorite);
      // console.log(history);
      expect(history.location.pathname).toBe('/favorites');
    },
  );
  it(
    'Se é redirecionada para Not Found ao entrar em uma URL desconhecida.', () => {
      const { history } = renderWithRouter(<App />);
      history.push('epistemologia');
      const errorPag = screen.getByText('Page requested not found');
      expect(errorPag).toBeInTheDocument();
    },
  );
});
// DESABAFO 😠
// Fiquei mais de um dia no requisito, pensei:
// "como assim não?? será que não entendi nada??"
// rodava npm test e passava tudo!
// quando ia pro strike ele falava que estavam os 3 vivos
// resumindo: estava fazendo o requisito e rodando no arquivo errado
// era pra ser no App.test.js e estava fazendo no About.test.js 🤦‍♂️
