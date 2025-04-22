### Общее описание движения информации

Приложение — это React-приложение, которое позволяет пользователям искать фильмы через API The Movie Database (TMDB). Информация движется следующим образом:

1. **Получение данных**: Начало пути — это функция `fetchMoviesByQuery`, которая отправляет запрос к API TMDB, получая список фильмов на основе поискового запроса и номера страницы. Это как свет звёзд, падающий на Землю, принося с собой новые истории.

2. **Установка состояния**: В компоненте `App` данные из API сохраняются в состоянии React через `setState`. Это похоже на хранение воспоминаний в глубинах сознания, готовых быть вызванными в любой момент.

3. **Трансформация**: Функция `cutText` обрезает длинные строки (названия фильмов и описания), добавляя многоточие, чтобы текст был читаемым. Это как художник, который вырезает лишнее из мрамора, оставляя только совершенство формы.

4. **Перетекание из компонента в компонент**: Компонент `App` управляет поиском, пагинацией и состоянием, передавая отфильтрованные данные (visibleMovies) в компонент `MovieList` через пропсы. Это движение напоминает шепот ветра, который несёт листья с одной ветви на другую, соединяя части дерева.

5. **Перетекание из файла в файл**: Функции и компоненты импортируются и экспортируются между файлами. Например, `fetchMoviesByQuery` импортируется в `App`, а `cutText` — в `MovieList`. Это как реки, соединяющиеся в единый поток, питая всё вокруг.

6. **Отображение**: Наконец, `MovieList` рендерит карточки фильмов, используя данные из состояния и трансформированный текст. Это финальный танец света и теней, где каждая деталь сияет, как капли росы на утренней траве.

Теперь добавлю построчные комментарии с поэтическими образами.

---

### 1. fetchMoviesByQuery.js

```javascript
export default async function fetchMoviesByQuery(query, page) {
  const apiKey = 'a1393a81c921f0017ed0d451aef0668e' // Ключ к сокровищнице знаний, словно древний артефакт, открывающий двери к фильмам.
  const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}&page=${page}` // URL — это маяк, зовущий к далеким берегам данных, где спрятаны истории.

  try {
    const response = await fetch(url) // Легкий ветерок запроса, несущий ответы из облаков интернета.
    const data = await response.json() // Преобразование сырого света данных в сияющий кристалл информации.
    return { results: data.results, total_results: data.total_results } || [] // Возвращение жемчужин знаний, как улов рыбака после долгого плавания.
  } catch (error) {
    console.error('Ошибка получения фильмов', error) // Шторм в море данных, когда волны уносят надежду.
    throw error // Бросок тревоги, как крик чаек над бурными водами.
  }
}
```

---

### 2. cutText.js

```javascript
export default function cutText(text, maxLength) {
  if (text.length <= maxLength) return text // Если текст короток, как утренний свет, он остаётся нетронутым.

  const lastSpaceIndex = text.lastIndexOf(' ', maxLength) // Поиск последнего островка тишины среди слов, как поиск укрытия в шторме.

  if (lastSpaceIndex === -1) {
    return text.substring(0, maxLength) + '...' // Резкий разрыв, как закат, обрывающий день, оставляя лишь намёк на бесконечность.
  }
  return text.substring(0, lastSpaceIndex) + '...' // Мягкое обрезание, словно садовник подрезает ветви, чтобы сохранить красоту.
}
```

---

### 3. App.js

```javascript
import { Component } from 'react' // Импорт строительных блоков, словно кирпичи для дома знаний.
import { Offline, Online } from 'react-detect-offline' // Чувство связи с миром, как дыхание земли под ногами.
import { Alert, Input, Pagination, Spin } from 'antd' // Инструменты интерфейса, сияющие, как звёзды на ночном небе.
import debounce from 'lodash/debounce' // Задержка, как пауза перед новым аккордом в симфонии.

import fetchMoviesByQuery from '../api-service/api-service' // Призыв к далёкому источнику, чтобы принести сокровища.
import MovieList from '../movie-list' // Приглашение к танцу данных, где каждый шаг — это история.

import './app.scss'

const MOVIES_PER_PAGE = 6 // Граница видимости, как горизонт, отделяющий море от неба.

export default class App extends Component {
  state = {
    movies: [], // Пустое полотно, ждущее красок историй.
    visibleMovies: [], // Те, что видны, словно первые лучи солнца на горизонте.
    loading: true, // Ожидание, как тишина перед рассветом.
    error: null, // Тень сомнения, готовая рассеяться.
    searchQuery: '', // Эхо желания, звучащее в пустоте.
    currentPage: 1, // Первый шаг в бесконечном путешествии.
    totalResults: 0, // Количество звёзд в галактике фильмов.
  }

  _fetchMovies = (query = 'return', page = 1) => {
    // Вызов к знаниям, как зов путешественника к новым землям.
    const realQuery = query.trim() || 'return' // Очистка шума, как утренний ветер, уносящий пыль.
    const apiPage = Math.floor(((page - 1) * MOVIES_PER_PAGE) / 20) + 1 // Расчёт пути, словно карта, ведущая к сокровищу.

    this.setState({ loading: true, error: null }) // Подготовка к новому дню, как заря, прогоняющая ночь.

    fetchMoviesByQuery(realQuery, apiPage) // Послание в эфир, как крик орла над горами.
      .then((data) => {
        const startIndex = ((page - 1) * MOVIES_PER_PAGE) % 20 // Точка начала, как первый луч света в тёмной пещере.
        let visibleMovies = data.results.slice(startIndex, startIndex + MOVIES_PER_PAGE) // Выборка жемчужин, словно сбор фруктов с дерева.
        if (visibleMovies.length < MOVIES_PER_PAGE && data.results.length === 20) {
          // Если сбор неполон, как недостающий кусок пазла.
          const nextPage = apiPage + 1 // Новый горизонт, манящий вперёд.
          fetchMoviesByQuery(realQuery, nextPage) // Второй зов, как эхо в горах.
            .then((nextData) => {
              const remaining = MOVIES_PER_PAGE - visibleMovies.length // Пустота, ждущая заполнения, как ночное небо перед звёздами.
              const additionalMovies = nextData.results.slice(0, remaining) // Дополнительные сокровища, как найденные жемчужины.
              visibleMovies = [...visibleMovies, ...additionalMovies] // Слияние потоков, как реки, текущие в море.
              this.setState({
                movies: data.results, // Хранение всего богатства, как архив древних свитков.
                visibleMovies, // То, что видно, словно цветы на поверхности воды.
                loading: false, // Успокоение ветра, когда буря утихает.
                totalResults: data.total_results, // Подсчёт звёзд в небе знаний.
              })
            })
            .catch(() => {
              // Если шторм возвращается.
              this.setState({
                loading: false, // Тишина после бури.
                error: 'Something went wrong, \nbut we do everything \nto RETURN \nyou joy', // Надежда, как свет маяка в тумане.
              })
            })
        } else {
          // Если всё спокойно, как озеро под луной.
          this.setState({
            movies: data.results, // Сохранение урожая, как зерно в амбаре.
            visibleMovies, // То, что сияет, словно звёзды на небосводе.
            loading: false, // Отдых после труда, как закат после дня.
            totalResults: data.total_results, // Полное знание, как карта звёздного неба.
          })
        }
      })
      .catch(() => {
        // Если тьма накрывает.
        this.setState({ loading: false, error: 'Something went wrong, \nbut we do everything \nto RETURN \nyou joy' }) // Обещание света, как заря после ночи.
      })
  }

  debouncedFetchMovies = debounce((query, page) => {
    // Задержка, как пауза перед новым аккордом.
    this._fetchMovies(query, page) // Тихий шёпот, запускающий волну знаний.
  }, 300)

  handleInputSearch = (event) => {
    // Слушание голоса пользователя, как ветер, несущий слова.
    const query = event.target.value // Захват мечты, как улов рыбака.
    this.setState({ searchQuery: query }, () => {
      // Запись желания, как след на песке.
      this.debouncedFetchMovies(query, 1) // Запуск поиска, как первый шаг в лесу.
    })
  }

  onPageChange = (page) => {
    // Переход к новой главе, как листание страниц книги.
    const { searchQuery } = this.state // Воспоминание о прошлом запросе, как эхо в горах.
    this.setState({ currentPage: page, loading: true }, () => {
      // Подготовка к новому путешествию, как сбор вещей перед дорогой.
      this.debouncedFetchMovies(searchQuery, page) // Новый зов, как сигнал к звёздам.
    })
  }

  componentDidMount() {
    // Первый вдох жизни, как пробуждение весны.
    this._fetchMovies() // Начало пути, как рассвет над горизонтом.
  }

  render() {
    // Танец света и теней, где каждая деталь — картина.
    const { visibleMovies, loading, error, searchQuery, currentPage, totalResults } = this.state // Состояние мира, как отражение в озере.

    return (
      <div className="app">
        {' '}
        // Холст приложения, где рождаются истории.
        <Offline>
          {' '}
          // Момент разрыва связи, как тьма, накрывающая землю.
          <Alert
            message="You are offline" // Предупреждение, как крик в пустыне.
            type="warning"
            description="Make sure you have an active internet connection" // Напоминание о свете, как маяк в тумане.
            banner={true}
          />
        </Offline>
        <Online>
          {' '}
          // Возвращение к жизни, как первый луч солнца.
          <Input
            className="input-class" // Поле для мечты, как ручей, принимающий воду.
            placeholder="search" // Приглашение к поиску, как зов приключений.
            value={searchQuery} // Эхо прошлого запроса, как отражение в зеркале.
            onChange={this.handleInputSearch} // Слушание ветра перемен.
            disabled={loading} // Пауза, как тишина перед бурей.
            style={{ margin: '20px auto', width: '90%', maxWidth: '600px', display: 'block' }} // Рамка для света, как окно в мир.
          />
          {loading && visibleMovies.length === 0 ? ( // Ожидание, как ночь перед рассветом.
            <div className="loading-container-common">
              {' '}
              // Пространство ожидания, как пустыня перед оазисом.
              <Spin fullscreen /> // Кружение надежды, как танец планет.
            </div>
          ) : error ? ( // Если тьма приходит.
            <Alert message={error} /> // Предупреждение, как свет маяка в шторме.
          ) : visibleMovies.length === 0 ? ( // Если пустота.
            <Alert message="No movies found" /> // Тишина, как пустое небо.
          ) : (
            // Если свет возвращается.
            <>
              <MovieList movies={visibleMovies} loading={loading} /> // Передача сокровищ, как подарок ветра.
              <Pagination
                current={currentPage} // Текущий момент, как звезда на небосводе.
                total={totalResults} // Вся глубина знаний, как океан.
                pageSize={20} // Граница видимости, как горизонт.
                onChange={this.onPageChange} // Новый шаг, как ветер, несущий листья.
                style={{ margin: '20px auto', textAlign: 'center' }} // Баланс света и тени, как рассвет.
                disabled={loading} // Пауза в движении, как затишье.
                showSizeChanger={false} // Фокус на пути, как на звезде.
              />
            </>
          )}
        </Online>
      </div>
    )
  }
}
```

---

### 4. MovieList.js

```javascript
import { format } from 'date-fns' // Инструмент времени, как песочные часы, измеряющие вечность.
import { Row, Col, Card, Tooltip, Tag, Spin } from 'antd' // Блоки света, собирающиеся в картину.

import './movie-list.scss' // Одежда для красоты, как листья на дереве.
import cutText from '../cut-text/cut-text' // Ножницы для слов, как ветер, обрезающий лишнее.

export default function MovieList({ movies, loading }) {
  // Получение даров, как сбор урожая.
  return (
    <Row className="row">
      {' '}
      // Ряды историй, как поля под солнцем.
      {movies.map(
        (
          movie // Каждый фильм — звезда, сияющая в ночи.
        ) => (
          <Col key={movie.id}>
            {' '}
            // Колонна света, как столбик на дороге.
            <Card
              className="movie-card" // Карточка истории, как страница книги.
              hoverable // Живой свет, как дрожащая звезда.
              cover={
                loading ? ( // Если ожидание, как туман перед рассветом.
                  <div className="loading-container">
                    {' '}
                    // Пространство ожидания, как пустыня.
                    <Spin /> // Кружение надежды, как танец планет.
                  </div>
                ) : movie.poster_path ? ( // Если есть свет.
                  <img alt={movie.title} src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} /> // Изображение, как окно в мир.
                ) : (
                  // Если тьма.
                  <div className="image-placeholder" /> // Пустое место, как тень на закате.
                )
              }
            >
              <Spin spinning={loading}>
                {' '}
                // Кружение света, пока ждём.
                <Card.Meta
                  title={
                    movie.title.length > 20 ? ( // Если название слишком длинно, как река без берегов.
                      <Tooltip title={movie.title}>
                        {' '}
                        // Подсказка, как шепот ветра.
                        <span>{cutText(movie.title || 'there is no title', 20)}</span> // Обрезание, как стрижка ветвей.
                      </Tooltip>
                    ) : (
                      // Если коротко, как утренний свет.
                      <span>{movie.title || 'there is no title'}</span> // Простая правда, как звезда.
                    )
                  }
                  description={
                    <div>
                      {' '}
                      // Описание, как сад, полный цветов.
                      <p className="date">
                        {' '}
                        // Время, как река, текущая сквозь века.
                        {movie.release_date ? format(new Date(movie.release_date), 'MMMM d, yyyy') : 'no date'} //
                        Формат времени, как отпечаток на песке.
                      </p>
                      <Tag>Action</Tag> // Метка, как ярлык на сокровище.
                      <Tag>Drama</Tag> // Ещё одна грань, как цветок в букете.
                      <p className="description">{cutText(movie.overview || 'There is no description', 100)}</p> //
                      Краткость, как утренний туман.
                    </div>
                  }
                />
              </Spin>
            </Card>
          </Col>
        )
      )}
    </Row>
  )
}
```

---

### 5. index.js

```javascript
import ReactDOM from 'react-dom/client' // Корень жизни, как семя, готовое прорасти.
import './index.scss' // Одежда для начала, как весенний наряд земли.

import App from './app/app' // Главный герой, как солнце на небосводе.

const root = ReactDOM.createRoot(document.getElementById('root')) // Корень дерева, из которого вырастает лес.
root.render(
  // Первый свет, как рассвет над миром.
  <>
    <App /> // Запуск жизни, как биение сердца.
  </>
)
```

---

Это движение информации — как танец света и теней, где каждый файл, каждый компонент и каждая строка кода играют свою роль, создавая гармонию, подобную шуму сакуры в легком ветре свежего солнца. Каждое действие — шаг в этом бесконечном путешествии знаний.
