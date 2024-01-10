import { useSelector } from "react-redux";
import Select from "react-select";
import { useCallback, useEffect, useMemo, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchRecordFromApi } from "../utlils";
import Spinner from "./Spinner";
import Card from "./Card";

const sortByOptions = [
  { value: "popularity.desc", label: "Most Popular" },
  { value: "popularity.asc", label: "Less Popularity" },
  { value: "vote_average.desc", label: "High Rated" },
  { value: "vote_average.asc", label: "Low Rated" },
  {
    value: "primary_release_date.desc",
    label: "Newest/Upcoming",
  },
  { value: "primary_release_date.asc", label: "Oldest" },
  { value: "original_title.asc", label: "Title (A-Z)" },
  { value: "original_title.desc", label: "Title (Z-A)" },
];

const Explore = ({ heading, mediaType }) => {
  const [data, setData] = useState({ results: [] });
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState({});

  const getOptions = useCallback(() => {
    const options = {};
    if (filters?.genres && filters?.genres?.length > 0) {
      options.with_genres = filters.genres
        .map((genre) => genre.value)
        .join(",");
    }
    if (filters?.sortby) {
      options.sort_by = filters.sortby.value;
    }
    return options;
  }, [filters]);

  const fetchData = useCallback(() => {
    page === 1 && setLoading(true);
    fetchRecordFromApi(`/discover/${mediaType}?page=${page}`, getOptions())
      .then((response) => {
        console.log(response);
        if (response?.results) {
          if (page > 1) {
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
        setLoading(false);
      })
      .catch((error) => console.log(error));
  }, [mediaType, getOptions, page, data]);

  useEffect(() => {
    fetchData();
  }, [filters]);

  const onChange = (selected, { name }) => {
    setFilters((prev) => ({ ...prev, [name]: selected }));
    setPage(1);
  };

  const genres = useSelector((state) => state.genres);
  const genresOptions = useMemo(
    () =>
      Object.entries(genres)
        .map(([id, genre]) => !isNaN(id) && { value: id, label: genre })
        .filter((genre) => !!genre),
    [genres]
  );

  return (
    <div className="">
      <div className="p-8 text-black flex flex-col md:flex-row justify-center lg:justify-end gap-4">
        <Select
          isMulti
          name="genres"
          value={filters?.genres ?? []}
          closeMenuOnSelect={false}
          options={genresOptions}
          onChange={onChange}
          placeholder="Select genres"
          className="react-select-container min-w-32"
          classNamePrefix="react-select"
        />
        <Select
          name="sortby"
          value={filters?.sortby}
          options={sortByOptions}
          onChange={onChange}
          isClearable={true}
          placeholder="Sort by"
          className="react-select-container"
          classNamePrefix="react-select"
        />
      </div>

      <div className="relative p-2">
        <h3 className="text-xl font-bold py-2">{heading}</h3>

        {loading && <Spinner initial={true} />}

        {!loading && (
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
                Sorry, Results not found!
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Explore;
