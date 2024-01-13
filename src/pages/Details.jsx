import { useParams } from "react-router-dom";
import useAxios from "../utlils/hooks/useAxios";
import { BASE_URL } from "../utlils";
import { CardsContainerRow, Cast, DetailsHero, Videos } from "../components";

const Details = ({ mediaType }) => {
  const { id } = useParams();
  const { data: videos, error } = useAxios(
    `${BASE_URL}/${mediaType}/${id}/videos`
  );
  const credits = useAxios(`${BASE_URL}/${mediaType}/${id}/credits`);

  return (
    <section className="">
      <DetailsHero
        mediaType={mediaType}
        trailer={videos?.results?.[0]}
        crew={credits?.data?.crew}
      />
      <Cast cast={credits.data?.cast} error={credits.error} />
      <Videos videos={videos?.results} error={error} />

      {/* Similar Video Section */}
      <CardsContainerRow
        endpoint={`${BASE_URL}/movie/${id}/similar`}
        title="More Like This"
      />

      {/* Recommended Video Section */}
      <CardsContainerRow
        endpoint={`${BASE_URL}/movie/${id}/recommendations`}
        title="Recommendations"
      />
    </section>
  );
};

export default Details;
