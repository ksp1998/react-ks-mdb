import useAxios from "../utlils/hooks/useAxios";
import { Card } from "./";

const CardsContainerRow = ({ endpoint, title, className }) => {
  const { data, error } = useAxios(endpoint);

  return (
    <div className="p-2">
      <h3 className="text-xl font-bold py-2">{title}</h3>
      <div className={`flex gap-2 overflow-auto no-scrollbar ${className}`}>
        {data?.results?.map((record) => (
          <Card key={record.id} record={record} />
        ))}
      </div>
      <div className="text-red-500">{error || "Hey there!"}</div>
    </div>
  );
};

export default CardsContainerRow;
