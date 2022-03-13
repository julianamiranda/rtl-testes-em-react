import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helpers';
import App from '../App';
import pokemons from '../data';

describe('Teste o componente Pokedex', () => {
  const POKEMON_ID = 'pokemon-name';
  const POKEMON_TYPE = 'pokemon-type';
  const NEXT_POKEMON = 'Próximo pokémon';

  test('Testa se página contém um heading com o texto Encountered pokémons', () => {
    renderWithRouter(<App />);

    const getHeading = screen.getByRole('heading', { name: 'Encountered pokémons' });
    expect(getHeading).toBeInTheDocument();
  });

  test('Testa se existe um botão com o texto "Próximo pokémon"', () => {
    renderWithRouter(<App />);

    const nextPokemon = screen.getByRole('button', { name: NEXT_POKEMON });
    expect(nextPokemon).toBeInTheDocument();
  });

  test('Ao clicar no botão apenas o próximo Pokemon da lista é mostrado', () => {
    renderWithRouter(<App />);

    const nextPokemon = screen.getByRole('button', { name: NEXT_POKEMON });

    pokemons.forEach((pokemon) => {
      const pokemonName = pokemon.name;
      const newPokemonName = screen.getByTestId(POKEMON_ID);
      expect(newPokemonName).toHaveTextContent(pokemonName);
      userEvent.click(nextPokemon);
      const otherPokemon = screen.getAllByTestId(POKEMON_ID);
      expect(otherPokemon).toHaveLength(1);
    });
  });

  test('Deve existir um botão de filtragem para cada tipo de Pokémon', () => {
    renderWithRouter(<App />);

    const POKEMON_TYPES = 7;
    const typeFilters = screen.getAllByTestId('pokemon-type-button');

    expect(typeFilters).toHaveLength(POKEMON_TYPES);
  });

  test('Clicar no botão de um tipo, mostra somente os pokémons daquele tipo', () => {
    renderWithRouter(<App />);

    const btnPsychic = screen.getByRole('button', { name: 'Psychic' });
    const nextPokemon = screen.getByRole('button', { name: NEXT_POKEMON });

    userEvent.click(btnPsychic);

    const pokemon = screen.getByTestId(POKEMON_TYPE);
    expect(pokemon).toHaveTextContent('Psychic');

    userEvent.click(nextPokemon);

    const newPokemon = screen.getByTestId(POKEMON_TYPE);
    expect(newPokemon).toHaveTextContent('Psychic');
  });

  test('Teste se a Pokédex contém um botão para resetar o filtro (Botão All)', () => {
    renderWithRouter(<App />);

    const btnAll = screen.getByRole('button', { name: 'All' });
    const btnPsychic = screen.getByRole('button', { name: 'Psychic' });

    expect(btnAll).toBeInTheDocument();
    expect(btnAll).toHaveTextContent('All');

    userEvent.click(btnPsychic);
    const pokemon = screen.getByTestId(POKEMON_TYPE);
    expect(pokemon).toHaveTextContent('Psychic');

    userEvent.click(btnAll);
    const newPokemon = screen.getByTestId(POKEMON_TYPE);
    expect(newPokemon).not.toHaveTextContent('Psychic');
  });
});

/* Utilizei os seguintes materiais de consulta para elaboração desse codigo:
    - Teste 04.PreviewCard do projeto Tryunfo.
    - https://github.com/testing-library/jest-dom#tohavetextcontent.
    - https://jestjs.io/pt-BR/docs/expect#not
  */
