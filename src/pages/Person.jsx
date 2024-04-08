import { useParams } from "react-router-dom";
import { TMDB_API_BASE_URL } from "../utlils";
import { CardsContainerRow, PersonDetails } from "../components";

const uniqueRecords = (records) =>
  records?.reduce((uniqueRecords, record) => {
    if (!uniqueRecords.some((uniqueRecord) => uniqueRecord.id === record.id)) {
      uniqueRecords.push(record);
    }
    return uniqueRecords;
  }, []);

const Person = () => {
  const { id } = useParams();

  return (
    <section className="">
      <PersonDetails id={id} />

      {/* Known For Section */}
      <CardsContainerRow
        endpoint={`${TMDB_API_BASE_URL}/person/${id}/tagged_images`}
        title="Best Known For"
        getResults={(data) =>
          uniqueRecords(data?.results?.map((result) => result?.media))
        }
      />

      {/* Movie Credits Section */}
      <CardsContainerRow
        endpoint={`${TMDB_API_BASE_URL}/person/${id}/movie_credits`}
        title="Movies"
        getResults={(data) => uniqueRecords(data?.cast)}
      />

      {/* TV Shows Credits Section */}
      <CardsContainerRow
        endpoint={`${TMDB_API_BASE_URL}/person/${id}/tv_credits`}
        title="TV Shows"
        getResults={(data) => uniqueRecords(data?.cast)}
      />
    </section>
  );
};

export default Person;
