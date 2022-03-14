import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../helpers';
import pokemons from '../data';
import { readFavoritePokemonIds } from '../services/pokedexService';

describe('Teste o componente PokemonDetails', () => {
  const pkm = pokemons[0];
  test('Teste se as informações detalhadas do Pokémon são mostradas na tela.', () => {
    const { history } = renderWithRouter(<App />);
    history.push(`/pokemons/${pkm.id}`);

    const pokemonName = screen.getByText(`${pkm.name} Details`);
    expect(pokemonName).toBeInTheDocument();

    const pokemonSummary = screen.getByRole('heading', { name: 'Summary' });
    expect(pokemonSummary).toBeInTheDocument();

    const pokemonResume = screen.getByText(pkm.summary);
    expect(pokemonResume).toBeInTheDocument();
    expect(pokemonResume).toBeVisible();
  });

  test('Teste se há uma seção com os mapas com as localizações do pokémon', () => {
    const { history } = renderWithRouter(<App />);
    history.push(`/pokemons/${pkm.id}`);

    const pkmLct = screen.getByRole('heading', { name: `Game Locations of ${pkm.name}` });
    expect(pkmLct).toBeInTheDocument();

    const maps = pkm.foundAt;
    const locations = screen.getAllByRole('img', { name: `${pkm.name} location` });

    expect(locations).toHaveLength(maps.length);
    expect(locations[0]).toHaveAttribute('src', maps[0].map);
    expect(locations[1]).toHaveAttribute('src', maps[1].map);

    const mapNameA = screen.getByText(maps[0].location);
    const mapNameB = screen.getByText(maps[1].location);
    expect(mapNameA).toBeInTheDocument();
    expect(mapNameB).toBeInTheDocument();
  });
  test('Teste se é possivel favoritar um pokémon pela da página de detalhes', () => {
    const { history } = renderWithRouter(<App />);
    history.push(`/pokemons/${pkm.id}`);

    const checkboxLabel = screen.getByLabelText('Pokémon favoritado?');
    expect(checkboxLabel).toBeInTheDocument();

    userEvent.click(checkboxLabel);
    expect(readFavoritePokemonIds()).toHaveLength(1);

    userEvent.click(checkboxLabel);
    expect(readFavoritePokemonIds()).toHaveLength(0);
  });
});

/* Utilizei o link abaixo como material de consulta para elaboração desse codigo:
    - https://stackoverflow.com/a/67765701
  */
