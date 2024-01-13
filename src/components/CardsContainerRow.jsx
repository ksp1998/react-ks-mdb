import useAxios from "../utlils/hooks/useAxios";
import { Card } from "./";

const CardsContainerRow = ({ endpoint, title, className = "" }) => {
  const { data, error } = useAxios(endpoint);

  return (
    <div className="relative p-2">
      <h3 className="text-xl font-bold py-2">{title}</h3>
      <div className={`flex gap-2 overflow-auto no-scrollbar ${className}`}>
        {(data?.results || Array(20).fill(null))?.map((record, index) => (
          <Card key={record?.id || index} record={record} />
        ))}
      </div>
      <div className="text-red-500">{error}</div>
    </div>
  );
};

export default CardsContainerRow;
