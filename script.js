const wrapper = document.createElement('div')
wrapper.className = "wrapper"
document.querySelector('body').append(wrapper)

const container = document.createElement('div')
container.className = "container"
wrapper.append(container)

const autocomplete = document.createElement('div')
autocomplete.className = 'autocomplete'
container.append(autocomplete)

const searchInput = document.createElement('input')
searchInput.setAttribute('type', 'text')
searchInput.className = 'search-input'
autocomplete.append(searchInput)

const autocompleteList = document.createElement('ul')
autocompleteList.className = 'autocomplete-list'
autocomplete.append(autocompleteList)

const repositoriesList = document.createElement('div')
repositoriesList.className = 'repositories'
container.append(repositoriesList)

let debounceTimeout;
const debounce = (func, wait) => {
  let debounceTimeout;
  return function () {
    const args = arguments;
    clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(() => {
      func.apply(null, args);
    }, wait);
  };
};

const fetchRepositories = async (query) => {
  const response = await fetch(`https://api.github.com/search/repositories?q=${query}&per_page=5`);
  const data = await response.json();
  return data.items;
};

const renderAutocompleteList = (repositories) => {
  autocompleteList.innerHTML = '';
  repositories.forEach((repository) => {
    const li = document.createElement('li');
    li.textContent = repository.name;
    li.addEventListener('click', () => {
      addRepository(repository);
      searchInput.value = '';
      autocompleteList.innerHTML = '';
    });
    autocompleteList.append(li);
  });
};

const addRepository = (repository) => {
  const li = document.createElement('li');
  li.insertAdjacentHTML('beforeend', `
    <div class="repo-data">
      <p>Name: ${repository.name}</p>
      <p>Owner: ${repository.owner.login}</p>
      <p>Stars: ${repository.stargazers_count}</p>
    </div>
    <svg class="delete-btn" width="46" height="42" viewBox="0 0 46 42" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2 40.5L44 2" stroke="#FF0000" stroke-width="4"/>
    <path d="M44 40.5L2 2" stroke="#FF0000" stroke-width="4"/>
    </svg>
    `);

  const closeBtn = li.querySelector('.delete-btn')

  function removeEl() {
    li.remove()
    closeBtn.removeEventListener('click', removeEl)
  }
  closeBtn.addEventListener('click', removeEl
  );
  repositoriesList.append(li);
};

searchInput.addEventListener('input', debounce(async (e) => {
  const query = e.target.value.trim();
  if (query === '') {
    autocompleteList.innerHTML = '';
    return;
  }
  const repositories = await fetchRepositories(query);
  renderAutocompleteList(repositories);
}, 500));
