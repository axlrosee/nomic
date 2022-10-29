import { useState, useEffect } from 'react';
import axios from 'axios';

const usePosts = (pageNum, search, field = 'title') => {
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState({});
  const [hasNextPage, setHasNextPage] = useState(false);

  useEffect(() => {
    setResults([]);
  }, [search]);

  useEffect(() => {
    setIsLoading(true);
    setIsError(false);
    setError({});

    const controller = new AbortController();
    const { signal } = controller;

    setTimeout(() => {
      axios
        .get(
          `http://127.0.0.1:8000/?page_num=${pageNum}&search=${search}&field=${field}`,
          { signal }
        )
        .then((data) => {
          setResults((prev) => [...prev, ...data.data.news]);
          setHasNextPage(data.data.news.length);
          setIsLoading(false);
        })
        .catch((e) => {
          setIsLoading(false);
          if (signal.aborted) return;
          setIsError(true);
          setError({ message: e.message || 'Error' });
        });
    }, 1000);

    return () => controller.abort();
  }, [pageNum, search, field]);

  return { isLoading, isError, error, results, hasNextPage };
};

export default usePosts;
