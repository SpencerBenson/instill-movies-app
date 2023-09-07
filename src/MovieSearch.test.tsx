import { render, screen, fireEvent } from '@testing-library/react';
import MovieSearch from './MovieSearch';

test('renders Movie Search component', () => {
  render(<MovieSearch />);

  const movieSearchElement = screen.getByText(/Movie Search App/i);
  expect(movieSearchElement).toBeInTheDocument();
});

test('performs movie search', () => {
  render(<MovieSearch />);

  const searchInput = screen.getByPlaceholderText(/Search for a movie.../i);
  const searchButton = screen.getByText(/Search/i);

  // Simulate user input and click the search button
  fireEvent.change(searchInput, { target: { value: 'Star Wars' } });
  fireEvent.click(searchButton);

  // You can add more assertions here to check for expected behavior
});
