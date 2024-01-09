import { CardsContainerRow } from "../components";

const Shows = () => {
  return (
    <div className="">
      <CardsContainerRow
        title="Explore TV Shows"
        endpoint="https://api.themoviedb.org/3/discover/tv"
        className="flex-wrap justify-center gap-y-8 lg:mr-4"
      />
    </div>
  );
};

export default Shows;
