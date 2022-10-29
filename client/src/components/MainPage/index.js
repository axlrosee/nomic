import { useState, useRef, useCallback } from 'react';
import usePosts from '../../hooks/usePosts';
import Post from './post';

const MainPage = () => {
  const [query, setQuery] = useState('');
  const [pageNum, setPageNum] = useState(1);
  const [field, setField] = useState('title');

  const { isLoading, isError, error, results, hasNextPage } = usePosts(
    pageNum,
    query,
    field
  );

  const intObserver = useRef();
  const lastPostRef = useCallback(
    (post) => {
      if (isLoading) return;

      if (intObserver.current) intObserver.current.disconnect();

      intObserver.current = new IntersectionObserver((posts) => {
        if (posts[0].isIntersecting && hasNextPage)
          setPageNum((prev) => prev + 1);
      });

      if (post) intObserver.current.observe(post);
    },
    [isLoading, hasNextPage]
  );

  const handleSearch = (e) => {
    setQuery(e.target.value);
    setPageNum(1);
  };

  const handleFieldChange = (field) => {
    setField(field);
  };

  if (isError) return <p className='center'>Error: {error.message}</p>;

  const content = results.map((post, i) => {
    if (results.length === i + 1) {
      return <Post ref={lastPostRef} key={i} post={post} />;
    }
    return <Post key={i} post={post} />;
  });

  return (
    <>
      <div className='SearchBarContainer'>
        <div className='search'>
          <div className='searchInputs'>
            <input type='text' value={query} onChange={handleSearch}></input>
            <select
              name='field'
              value={field}
              onChange={(event) => handleFieldChange(event.target.value)}
            >
              <option id='title'>title</option>
              <option id='summary'>summary</option>
            </select>
          </div>
        </div>
      </div>
      {content}
      {isLoading && <p className='center'>Loading...</p>}
    </>
  );
};
export default MainPage;
