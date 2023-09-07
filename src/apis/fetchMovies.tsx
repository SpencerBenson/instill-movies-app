import axios from 'axios';

const apiKey: string = "fb03d60f"

interface Movie {
  Title: string;
  Year: string;
  Poster: string;
  imdbID: string;
  Type: string;
}

export const fetchMovies = async (
  query: string,
  type: string,
  year: string
): Promise<Movie[]> => {

  try {
    const params: Record<string, string> = {
      apikey: apiKey,
      s: query,
    };

    if (type) {
      params.type = type;
    }

    if (year) {
      params.y = year;
    }

    const apiUrl: string = "https://www.omdbapi.com/";

    const response = await axios.get(apiUrl, { params });
    const { Search } = response.data;

    if (Search) {
      return Search;
    } else {
      return [];
    }
  } catch (error: any) {
    throw new Error(`Error fetching data: ${error.message as string}`);
  }
};

