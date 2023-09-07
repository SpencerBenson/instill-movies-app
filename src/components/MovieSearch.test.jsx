import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import axios from 'axios';
import MovieSearch from './MovieSearch';
import 'jest';
import '@testing-library/jest-dom';

jest.mock('axios');

describe('MovieSearch Component', () => {
  it('renders the component correctly', () => {
    const { getByText, getByPlaceholderText } = render(<MovieSearch />);

    // Check if the component title is rendered
    expect(getByText('Movie Search App')).toBeInTheDocument();

    // Check if input fields and search button are present
    expect(getByPlaceholderText('Search for a movie...')).toBeInTheDocument();
    expect(getByPlaceholderText('Year of Release (Optional)')).toBeInTheDocument();
    expect(getByText('Search')).toBeInTheDocument();
  });

  it('fetches and displays search results on button click', async () => {
    // Mock axios.get to return sample search results
    axios.get.mockResolvedValue({
      data: {
        Search: [
          {
            imdbID: '123',
            Title: 'The Godfather',
            Type: 'movie',
            Year: '1972'
          },
        ],
      },
    });

    const { getByText, getByPlaceholderText, queryByText, findByText, getByRole } = render(<MovieSearch />);

    // Fill in the search input
    const searchInput = getByPlaceholderText('Search for a movie...');
    fireEvent.change(searchInput, { target: { value: 'The Godfather' } });

    // Find the "Search" button
    const searchButton = getByRole('button', { name: 'Search' });

    // Trigger a click event on the "Search" button
    fireEvent.click(searchButton);

    // Wait for the component to update with search results
    await findByText('The Godfather'); // Wait for the title to appear
    expect(getByText('Year: 1972')).toBeInTheDocument();
    expect(queryByText('Error fetching data:')).not.toBeInTheDocument();
  });

  it('handles API error gracefully', async () => {
    axios.get.mockRejectedValue({ message: 'API Error' });

    const { getByText, getByPlaceholderText, findByText, getByRole } = render(<MovieSearch />);

    // Fill in the search input
    const searchInput = getByPlaceholderText('Search for a movie...');
    fireEvent.change(searchInput, { target: { value: 'Movie Title' } });

    // Find the "Search" button
    const searchButton = getByRole('button', { name: 'Search' });

    // Trigger a click event on the "Search" button
    fireEvent.click(searchButton);

    // Wait for the error message to be displayed
    await findByText(/Error fetching data: API Error/);

  });
});
