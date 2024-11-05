
function home() {
    return (
      <>
      <div className='bg-purple-300'>
        <div class="text-center mt-5">
            <label for="searchBar"><input type="text" id="search"></input></label>
            <button onclick="search()">Search</button>
        </div>
        <p id="test"></p>
        </div>
      </>
    );
  }
  
  export default home;
  