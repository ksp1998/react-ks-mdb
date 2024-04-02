import { useParams } from "react-router-dom";
import { TMDB_API_BASE_URL } from "../utlils";
import { CardsContainerRow, PersonDetails } from "../components";

const Person = () => {
  const { id } = useParams();

  return (
    <section className="">
      <PersonDetails id={id} />

      {/* Combined Credits Section */}
      <CardsContainerRow
        endpoint={`${TMDB_API_BASE_URL}/person/${id}/movie_credits`}
        title="Movies"
        resultsKey="cast"
      />

      {/* Combined Credits Section */}
      <CardsContainerRow
        endpoint={`${TMDB_API_BASE_URL}/person/${id}/tv_credits`}
        title="TV Shows"
        resultsKey="cast"
      />
    </section>
  );
};

export default Person;
