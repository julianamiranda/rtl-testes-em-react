import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../helpers';
import pokemons from '../data';

describe('Teste o componente Pokemon', () => {
  const pkm = pokemons[0];

  test('Teste se o card é renderizado com as informações do pokémon', () => {
    renderWithRouter(<App />);

    const { value, measurementUnit } = pkm.averageWeight;
    const pkmMeasure = `${value} ${measurementUnit}`;
    const pokemonName = screen.getByTestId('pokemon-name');
    const pokemonType = screen.getByTestId('pokemon-type');
    const pokemonMeasure = screen.getByTestId('pokemon-weight');
    const pokemonImage = screen.getByRole('img', { name: `${pkm.name} sprite` });

    expect(pokemonName).toHaveTextContent(pkm.name);
    expect(pokemonType).toHaveTextContent(pkm.type);
    expect(pokemonMeasure).toHaveTextContent(pkmMeasure);
    expect(pokemonImage).toHaveAttribute('src', pkm.image);
  });

  test('Teste se o card do Pokémon na Pokédex tem um link "More details"', () => {
    renderWithRouter(<App />);

    const pkmLink = `/pokemons/${pkm.id}`;
    const moreDetailsLink = screen.getByRole('link', { name: 'More details' });

    expect(moreDetailsLink).toHaveAttribute('href', pkmLink);
  });

  test('Teste se é feito o redirecionamento para a página de detalhes', () => {
    const { history } = renderWithRouter(<App />);

    const moreDetailsLink = screen.getByRole('link', { name: 'More details' });
    userEvent.click(moreDetailsLink);

    const { pathname } = history.location;
    expect(pathname).toBe(`/pokemons/${pkm.id}`);
  });

  test('Teste se existe um ícone de estrela nos Pokémons favoritados', () => {
    const { history } = renderWithRouter(<App />);
    history.push(`/pokemons/${pkm.id}`);

    const favoriteCheck = screen.getByRole('checkbox', { name: 'Pokémon favoritado?' });
    expect(favoriteCheck).toBeInTheDocument();
    userEvent.click(favoriteCheck);

    const star = screen.getByRole('img', { name: `${pkm.name} is marked as favorite` });

    expect(star).toBeInTheDocument();
    expect(star).toHaveAttribute('src', '/star-icon.svg');
  });
});
