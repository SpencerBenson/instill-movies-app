import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
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
            imdbID: '',
            Title: 'the godfather',
            Type: 'movie',
            Year: ''
          },
        ],
      },
    });
    const { getByText, getByPlaceholderText, queryByText } = render(<MovieSearch />);

    // Fill in the search input and click the search button
    const searchInput = getByPlaceholderText('Search for a movie...');
    fireEvent.change(searchInput, { target: { value: 'the godfather' } });
    fireEvent.click(getByText('Search'));

    // Wait for the component to update with search results
    await waitFor(() => {
      expect(getByText('the godfather')).toBeInTheDocument();
    }); // Increase the timeout as needed

  });

  it('handles API error gracefully', async () => {
    const { getByText, getByPlaceholderText } = render(<MovieSearch />);

    // Mock axios.get to simulate an API error
    axios.get.mockRejectedValue({ message: 'API Error' });

    // Fill in the search input and click the search button
    const searchInput = getByPlaceholderText('Search for a movie...');
    fireEvent.change(searchInput, { target: { value: 'Movie Title' } });
    fireEvent.click(getByText('Search'));

    // Wait for the error message to be displayed
    await waitFor(() => {
      expect(getByText('Error fetching data: API Error')).toBeInTheDocument();
    });
  });
});
