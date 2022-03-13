import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helpers';
import App from '../App';
import { FavoritePokemons } from '../components';

describe('Teste o componente FavoritePokemons', () => {
  test('Teste se No favorite pokemon found, não tiver pokémons favoritos.', () => {
    renderWithRouter(<FavoritePokemons />);
    const notFoundMsg = screen.getByText('No favorite pokemon found');

    expect(notFoundMsg).toBeInTheDocument();
  });

  test('Teste se é exibido todos os cards de pokémons favoritados.', () => {
    const { history } = renderWithRouter(<App />);

    const moreDetails = screen.getByRole('link', { name: 'More details' });
    expect(moreDetails).toBeInTheDocument();
    userEvent.click(moreDetails);

    const favoriteCheck = screen.getByRole('checkbox', { name: 'Pokémon favoritado?' });
    expect(favoriteCheck).toBeInTheDocument();
    userEvent.click(favoriteCheck);

    history.push('/favorites');

    const favoritePokemon = screen.getByTestId('pokemon-name');
    expect(favoritePokemon).toBeInTheDocument();
  });
});
