import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../helpers';
import App from '../App';

describe('Teste o componente NotFound.js /', () => {
  test('Teste se página contém um heading h2 com o texto pedido', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/abc');

    const getHeading = screen.getByRole('heading', { name: /Page requested not found/i });
    expect(getHeading).toBeInTheDocument();
  });

  test('Teste se página mostra a imagem pedida', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/abc');

    const imgPokemon = screen.getByRole('img', { name: /Pikachu crying/i });
    const imgUrl = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    expect(imgPokemon).toHaveAttribute('src', imgUrl);
  });
});
