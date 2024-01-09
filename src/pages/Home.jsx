import { CardsContainerRow } from "../components";

const sections = [
  {
    title: "Today's Trending Movies",
    endpoint: "https://api.themoviedb.org/3/trending/movie/day",
  },
  {
    title: "Today's Trending TV Shows",
    endpoint: "https://api.themoviedb.org/3/trending/tv/day",
  },
  {
    title: "Week's Trending Movies",
    endpoint: "https://api.themoviedb.org/3/trending/movie/week",
  },
  {
    title: "Week's Trending TV Shows",
    endpoint: "https://api.themoviedb.org/3/trending/tv/week",
  },
  {
    title: "Recent Released",
    endpoint: "https://api.themoviedb.org/3/movie/upcoming",
  },
  {
    title: "Popular Movies",
    endpoint: "https://api.themoviedb.org/3/movie/popular",
  },
  {
    title: "Popular TV Shows",
    endpoint: "https://api.themoviedb.org/3/tv/popular",
  },
  {
    title: "Top Rated Movies",
    endpoint: "https://api.themoviedb.org/3/movie/top_rated",
  },
  {
    title: "Top Rated TV Shows",
    endpoint: "https://api.themoviedb.org/3/tv/top_rated",
  },
];

const Home = () => {
  return (
    <div className="">
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
