import { CardsContainerRow } from "../components";

const Movies = () => {
  return (
    <div className="">
      <CardsContainerRow
        title="Explore Movies"
        endpoint="https://api.themoviedb.org/3/discover/movie"
        className="flex-wrap justify-center gap-y-8 lg:mr-4"
      />
    </div>
  );
};

export default Movies;
