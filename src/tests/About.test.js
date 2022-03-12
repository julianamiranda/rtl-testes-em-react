import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../helpers';
import { About } from '../components';

describe('Teste o componente About.js', () => {
  test('Teste se a página contém um heading h2 com o texto About Pokédex', () => {
    renderWithRouter(<About />);

    const getHeading = screen.getByRole('heading', { name: 'About Pokédex' });

    expect(getHeading).toBeInTheDocument();
  });

  test('Teste se a página contém dois parágrafos com texto sobre a Pokédex', () => {
    renderWithRouter(<About />);
    const pokedex = screen.getAllByText(/Pokémons/i);
    expect(pokedex).toHaveLength(2);
  });

  test('Teste se a página contém a seguinte imagem de uma Pokédex:', () => {
    renderWithRouter(<About />);

    const imgPokemon = screen.getByRole('img', { name: 'Pokédex' });
    const imgUrl = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    expect(imgPokemon).toHaveAttribute('src', imgUrl);
  });
});

// O ultimo teste, desenvolvi utilizando um metodo (.toHaveAttribute()) visto em no teste 03.CreateCard do projeto Tryunfo.
