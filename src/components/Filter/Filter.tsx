interface Props {
    onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onPlatformChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

function Filter({ onSearchChange, onPlatformChange }: Props) {
    return (
      <div className='Header'>
        <input name='searchInput' onChange={onSearchChange} />
        <label>
          Platform:
          <select onChange={onPlatformChange}>
            <option value="">All</option>
            <option value="MOBILE">Mobile</option>
            <option value="DOWNLOAD">Download</option>
            <option value="WEB">Web</option>
          </select>
        </label>
      </div>
    );
}

export default Filter;
