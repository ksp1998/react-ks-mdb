import useAxios from "../utlils/hooks/useAxios";
import { Card, ScrollContainer } from "./";

const CardsContainerRow = ({ endpoint, title, className = "", resultsKey }) => {
  const { data, error } = useAxios(endpoint);

  const results = resultsKey ? data[resultsKey] : data?.results;

  console.log(results);

  return (
    <div className="relative p-2">
      <h3 className="text-xl font-bold py-2">{title}</h3>
      <ScrollContainer className={className}>
        {(results || Array(20).fill(null))?.map((record, index) => (
          <Card key={record?.id || index} record={record} />
        ))}
      </ScrollContainer>
      <div className="text-red-500">{error}</div>
    </div>
  );
};

export default CardsContainerRow;
