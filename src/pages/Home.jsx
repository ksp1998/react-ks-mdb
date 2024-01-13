import { CardsContainerRow, Hero } from "../components";
import { TMDB_API_BASE_URL } from "../utlils";

const sections = [
  {
    title: "Today's Trending Movies",
    endpoint: `${TMDB_API_BASE_URL}/trending/movie/day`,
  },
  {
    title: "Today's Trending TV Shows",
    endpoint: `${TMDB_API_BASE_URL}/trending/tv/day`,
  },
  {
    title: "Week's Trending Movies",
    endpoint: `${TMDB_API_BASE_URL}/trending/movie/week`,
  },
  {
    title: "Week's Trending TV Shows",
    endpoint: `${TMDB_API_BASE_URL}/trending/tv/week`,
  },
  {
    title: "Recent Released",
    endpoint: `${TMDB_API_BASE_URL}/movie/upcoming`,
  },
  {
    title: "Popular Movies",
    endpoint: `${TMDB_API_BASE_URL}/movie/popular`,
  },
  {
    title: "Popular TV Shows",
    endpoint: `${TMDB_API_BASE_URL}/tv/popular`,
  },
  {
    title: "Top Rated Movies",
    endpoint: `${TMDB_API_BASE_URL}/movie/top_rated`,
  },
  {
    title: "Top Rated TV Shows",
    endpoint: `${TMDB_API_BASE_URL}/tv/top_rated`,
  },
];

const Home = () => {
  document.title = "KS MDB | Watch Popular Movies & TV Shows";

  return (
    <div className="">
      <Hero />
      {sections.map((section, i) => (
        <CardsContainerRow
          key={i}
          title={section.title}
          endpoint={section.endpoint}
        />
      ))}
    </div>
  );
};

export default Home;
