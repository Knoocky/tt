import React, { useCallback, useEffect, useState} from 'react';
import { Data } from './types/Data';
import './App.css';
import Filter from './components/Filter/Filter';
import GameList from './components/GameList/GameList';

function search(item: Data, searchWord: string, searchPlatform: string) {
  return item.gameName.toLowerCase().replace(/\s+/g, '').includes(searchWord.toLowerCase().replace(/\s+/g, '')) && item.platform.includes(searchPlatform);
}

function App() {
  const [data, setData] = useState<Array<Data>>([]);
  const [searchInput, setSearchInput] = useState<string>('');
  const [platform, setPlatform] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [filteredData, setFilteredData] = useState<Array<Data>>([]);
  const [renderData, setRenderData] = useState<Array<Data>>([]);

  const fetchData = useCallback(() => {
    fetch('https://staging.belparyaj.com/api/pragmatic/game_list')
      .then((response) => response.json())
      .then((data) => setData(data.result));
  }, []);

  const loadMoreItems = useCallback(() => {
    setIsLoading(true);

    const lastElement = renderData.length;
    setRenderData([...renderData, ...filteredData.slice(lastElement, lastElement + 30)]);
    setIsLoading(false);
  }, [filteredData, renderData]);

  const handleScroll = useCallback(() => {
    const { scrollTop, clientHeight, scrollHeight } = document.documentElement;

    if (scrollHeight - scrollTop === clientHeight && !isLoading) {
      loadMoreItems();
    }
  }, [isLoading, loadMoreItems]);

  useEffect(() => {
    setIsLoading(true);
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    if (isLoading) {
      loadMoreItems();
    }
  }, [filteredData, isLoading, loadMoreItems]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isLoading, handleScroll]);

  useEffect(() => {
    setIsLoading(true);
    setRenderData([]);
    setFilteredData(data.filter((item) => search(item, searchInput, platform)));
  }, [searchInput, platform, data]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.currentTarget.value);
  };

  const handlePlatformChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPlatform(e.target.value);
  };

  return (
    <div className='App'>
      <Filter
        onSearchChange={handleSearchChange}
        onPlatformChange={handlePlatformChange}
      />
      <GameList data={renderData} isLoading={isLoading} />
    </div>
  );
}

export default App;
