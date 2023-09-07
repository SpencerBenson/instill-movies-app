import axios from 'axios';

const apiKey: string = process.env.OMDB_API_KEY as string

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

    const apiUrl: string = process.env.OMDB_APIURL as string;

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

