import { useCallback, useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { TMDB_API_BASE_URL, fetchRecordFromApi } from "../utlils";
import Spinner from "./Spinner";
import Card from "./Card";

const ExploreSearch = ({ heading }) => {
  const params = new URLSearchParams(location.search);

  const [data, setData] = useState({ results: [] });
  const [search, setSearch] = useState(params.get("q") ?? "");
  const [page, setPage] = useState(1);

  document.title = `KS MDB | ${search ? `s: ${search}` : "Search"}`;

  const fetchData = useCallback(
    (pg = page) => {
      fetchRecordFromApi(
        `${TMDB_API_BASE_URL}/search/multi?query=${search}&page=${pg}`
      )
        .then((response) => {
          if (response?.results) {
            if (pg > 1) {
              setData({
                ...data,
                results: [...data.results, ...response.results],
              });
            } else {
              setData(response);
            }
          } else {
            console.log(response);
          }
          setPage((prev) => prev + 1);
        })
        .catch((error) => console.log(error));
    },
    [search, page, data]
  );

  useEffect(() => {
    fetchData(1);
  }, [search]);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchData(1);
  };

  return (
    <div className="">
      <div className="p-8 flex flex-col items-center gap-5">
        <form onSubmit={handleSubmit} className="block w-full">
          <div className="flex justify-center">
            <div className="relative rounded-md overflow-hidden w-[min(100%,500px)]">
              <input
                type="search"
                className="w-full px-6 py-4 text-white text-lg bg-gray-800 outline-none z-10"
                placeholder="Search movies, tv shows..."
                value={search}
                onChange={(e) => setSearch(String(e.target.value.trim()))}
                required
              />
              <button
                type="submit"
                className="absolute top-0 end-0 pr-4 h-full bg-gray-800"
              >
                <img className="w-5 h-5" src="/ic-search.svg" alt="" />
                <span className="sr-only">Search</span>
              </button>
            </div>
          </div>
        </form>
        {search && (
          <div className="text-lg">
            You searched for: <span className="font-bold">{search}</span>
          </div>
        )}
      </div>

      <div className="relative p-2">
        <h3 className="text-xl font-bold py-2">{heading}</h3>
        <>
          {data?.results?.length > 0 ? (
            <InfiniteScroll
              className="content"
              dataLength={data?.results?.length || []}
              next={fetchData}
              hasMore={page <= data?.total_pages}
              loader={<Spinner />}
            >
              <div className="flex gap-2 flex-wrap justify-center gap-y-8 lg:mr-4">
                {data?.results?.map((item, index) => (
                  <Card key={item.id || index} record={item} />
                ))}
              </div>
            </InfiniteScroll>
          ) : (
            <div className="text-center text-2xl">
              Oops! No matching records found!
            </div>
          )}
        </>
      </div>
    </div>
  );
};

export default ExploreSearch;
