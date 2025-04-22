### Поэизя кода (попросил grok добавить поэтические образы)

Я объясню движение информации в приложении, начиная с общего описания, а затем добавлю построчные комментарии к каждому файлу. Информация в этом приложении течёт, словно река знаний, текущая через долины компонентов, каскады API и тихие пруды состояний, питая каждый элемент системы, как весенний дождь оживляет лес.

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
// Ключ к сокровищнице знаний, словно древний артефакт, открывающий двери к фильмам.
const apiKey = 'a1393a81c921f0017ed0d451aef0668e'

// URL — это маяк, зовущий к далеким берегам данных, где спрятаны истории.
const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}&page=${page}`

export default async function fetchMoviesByQuery(query, page) {
  // Легкий ветерок запроса, несущий ответы из облаков интернета.
  const response = await fetch(url)

  // Преобразование сырого света данных в сияющий кристалл информации.
  const data = await response.json()

  // Возвращение жемчужин знаний, как улов рыбака после долгого плавания.
  return { results: data.results, total_results: data.total_results } || []

  try {
  } catch (error) {
    // Шторм в море данных, когда волны уносят надежду.
    console.error('Ошибка получения фильмов', error)

    // Бросок тревоги, как крик чаек над бурными водами.
    throw error
  }
}
```

---

### 2. cutText.js

```javascript
// Если текст короток, как утренний свет, он остаётся нетронутым.
if (text.length <= maxLength) return text

// Поиск последнего островка тишины среди слов, как поиск укрытия в шторме.
const lastSpaceIndex = text.lastIndexOf(' ', maxLength)

export default function cutText(text, maxLength) {
  if (lastSpaceIndex === -1) {
    // Резкий разрыв, как закат, обрывающий день, оставляя лишь намёк на бесконечность.
    return text.substring(0, maxLength) + '...'
  }

  // Мягкое обрезание, словно садовник подрезает ветви, чтобы сохранить красоту.
  return text.substring(0, lastSpaceIndex) + '...'
}
```

---

### 3. App.js

```javascript
// Импорт строительных блоков, словно кирпичи для дома знаний.
import { Component } from 'react'

// Чувство связи с миром, как дыхание земли под ногами.
import { Offline, Online } from 'react-detect-offline'

// Инструменты интерфейса, сияющие, как звёзды на ночном небе.
import { Alert, Input, Pagination, Spin } from 'antd'

// Задержка, как пауза перед новым аккордом в симфонии.
import debounce from 'lodash/debounce'

// Призыв к далёкому источнику, чтобы принести сокровища.
import fetchMoviesByQuery from '../api-service/api-service'

// Приглашение к танцу данных, где каждый шаг — это история.
import MovieList from '../movie-list'

// Одежда для красоты, как листья на дереве.
import './app.scss'

const MOVIES_PER_PAGE = 6 // Граница видимости, как горизонт, отделяющий море от неба.

export default class App extends Component {
  // Пустое полотно, ждущее красок историй.
  state = {
    movies: [],

    // Те, что видны, словно первые лучи солнца на горизонте.
    visibleMovies: [],

    // Ожидание, как тишина перед рассветом.
    loading: true,

    // Тень сомнения, готовая рассеяться.
    error: null,

    // Эхо желания, звучащее в пустоте.
    searchQuery: '',

    // Первый шаг в бесконечном путешествии.
    currentPage: 1,

    // Количество звёзд в галактике фильмов.
    totalResults: 0,
  }

  // Вызов к знаниям, как зов путешественника к новым землям.
  _fetchMovies = (query = 'return', page = 1) => {
    // Очистка шума, как утренний ветер, уносящий пыль.
    const realQuery = query.trim() || 'return'

    // Расчёт пути, словно карта, ведущая к сокровищу.
    const apiPage = Math.floor(((page - 1) * MOVIES_PER_PAGE) / 20) + 1

    // Подготовка к новому дню, как заря, прогоняющая ночь.
    this.setState({ loading: true, error: null })

    // Послание в эфир, как крик орла над горами.
    fetchMoviesByQuery(realQuery, apiPage)
      .then((data) => {
        // Точка начала, как первый луч света в тёмной пещере.
        const startIndex = ((page - 1) * MOVIES_PER_PAGE) % 20

        // Выборка жемчужин, словно сбор фруктов с дерева.
        let visibleMovies = data.results.slice(startIndex, startIndex + MOVIES_PER_PAGE)

        // Если сбор неполон, как недостающий кусок пазла.
        if (visibleMovies.length < MOVIES_PER_PAGE && data.results.length === 20) {
          // Новый горизонт, манящий вперёд.
          const nextPage = apiPage + 1

          // Второй зов, как эхо в горах.
          fetchMoviesByQuery(realQuery, nextPage)
            .then((nextData) => {
              // Пустота, ждущая заполнения, как ночное небо перед звёздами.
              const remaining = MOVIES_PER_PAGE - visibleMovies.length

              // Дополнительные сокровища, как найденные жемчужины.
              const additionalMovies = nextData.results.slice(0, remaining)

              // Слияние потоков, как реки, текущие в море.
              visibleMovies = [...visibleMovies, ...additionalMovies]

              this.setState({
                // Хранение всего богатства, как архив древних свитков.
                movies: data.results,

                // То, что видно, словно цветы на поверхности воды.
                visibleMovies,

                // Успокоение ветра, когда буря утихает.
                loading: false,

                // Подсчёт звёзд в небе знаний.
                totalResults: data.total_results,
              })
            })
            .catch(() => {
              // Если шторм возвращается.
              this.setState({
                // Тишина после бури.
                loading: false,

                // Надежда, как свет маяка в тумане.
                error: 'Something went wrong, \nbut we do everything \nto RETURN \nyou joy',
              })
            })
        } else {
          // Если всё спокойно, как озеро под луной.
          this.setState({
            // Сохранение урожая, как зерно в амбаре.
            movies: data.results,

            // То, что сияет, словно звёзды на небосводе.
            visibleMovies,

            // Отдых после труда, как закат после дня.
            loading: false,

            // Полное знание, как карта звёздного неба.
            totalResults: data.total_results,
          })
        }
      })
      .catch(() => {
        // Если тьма накрывает.
        this.setState({
          // Тишина после бури.
          loading: false,

          // Обещание света, как заря после ночи.
          error: 'Something went wrong, \nbut we do everything \nto RETURN \nyou joy',
        })
      })
  }

  // Задержка, как пауза перед новым аккордом.
  debouncedFetchMovies = debounce((query, page) => {
    // Тихий шёпот, запускающий волну знаний.
    this._fetchMovies(query, page)
  }, 300)

  // Слушание голоса пользователя, как ветер, несущий слова.
  handleInputSearch = (event) => {
    // Захват мечты, как улов рыбака.
    const query = event.target.value

    // Запись желания, как след на песке.
    this.setState({ searchQuery: query }, () => {
      // Запуск поиска, как первый шаг в лесу.
      this.debouncedFetchMovies(query, 1)
    })
  }

  // Переход к новой главе, как листание страниц книги.
  onPageChange = (page) => {
    // Воспоминание о прошлом запросе, как эхо в горах.
    const { searchQuery } = this.state

    // Подготовка к новому путешествию, как сбор вещей перед дорогой.
    this.setState(
      {
        currentPage: page,
        loading: true,
      },
      () => {
        // Новый зов, как сигнал к звёздам.
        this.debouncedFetchMovies(searchQuery, page)
      }
    )
  }

  // Первый вдох жизни, как пробуждение весны.
  componentDidMount() {
    // Начало пути, как рассвет над горизонтом.
    this._fetchMovies()
  }

  // Танец света и теней, где каждая деталь — картина.
  render() {
    // Состояние мира, как отражение в озере.
    const { visibleMovies, loading, error, searchQuery, currentPage, totalResults } = this.state

    return (
      // Холст приложения, где рождаются истории.
      <div className="app">
        <Offline>
          // Момент разрыва связи, как тьма, накрывающая землю.
          <Alert
            // Предупреждение, как крик в пустыне.
            message="You are offline"
            type="warning"
            // Напоминание о свете, как маяк в тумане.
            description="Make sure you have an active internet connection"
            banner={true}
          />
        </Offline>
        <Online>
          // Возвращение к жизни, как первый луч солнца.
          <Input
            // Поле для мечты, как ручей, принимающий воду.
            className="input-class"
            // Приглашение к поиску, как зов приключений.
            placeholder="search"
            // Эхо прошлого запроса, как отражение в зеркале.
            value={searchQuery}
            // Слушание ветра перемен.
            onChange={this.handleInputSearch}
            // Пауза, как тишина перед бурей.
            disabled={loading}
            style={{ margin: '20px auto', width: '90%', maxWidth: '600px', display: 'block' }}
          />
          // Ожидание, как ночь перед рассветом.
          {loading && visibleMovies.length === 0 ? (
            // Пространство ожидания, как пустыня перед оазисом.
            <div className="loading-container-common">
              // Кружение надежды, как танец планет.
              <Spin fullscreen />
            </div>
          ) : error ? ( // Если тьма приходит.
            // Предупреждение, как свет маяка в шторме.
            <Alert message={error} />
          ) : visibleMovies.length === 0 ? ( // Если пустота.
            // Тишина, как пустое небо.
            <Alert message="No movies found" />
          ) : (
            // Если свет возвращается.
            <>
              // Передача сокровищ, как подарок ветра.
              <MovieList movies={visibleMovies} loading={loading} />
              <Pagination
                // Текущий момент, как звезда на небосводе.
                current={currentPage}
                // Вся глубина знаний, как океан.
                total={totalResults}
                // Граница видимости, как горизонт.
                pageSize={20}
                // Новый шаг, как ветер, несущий листья.
                onChange={this.onPageChange}
                style={{ margin: '20px auto', textAlign: 'center' }}
                // Пауза в движении, как затишье.
                disabled={loading}
                // Фокус на пути, как на звезде.
                showSizeChanger={false}
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
// Инструмент времени, как песочные часы, измеряющие вечность.
import { format } from 'date-fns'

// Блоки света, собирающиеся в картину.
import { Row, Col, Card, Tooltip, Tag, Spin } from 'antd'

// Одежда для красоты, как листья на дереве.
import './movie-list.scss'

// Ножницы для слов, как ветер, обрезающий лишнее.
import cutText from '../cut-text/cut-text'

export default function MovieList({ movies, loading }) {
  // Получение даров, как сбор урожая.
  return (
    // Ряды историй, как поля под солнцем.
    <Row className="row">
      {movies.map(
        (
          movie // Каждый фильм — звезда, сияющая в ночи.
        ) => (
          // Колонна света, как столбик на дороге.
          <Col key={movie.id}>
            <Card
              // Карточка истории, как страница книги.
              className="movie-card"
              // Живой свет, как дрожащая звезда.
              hoverable
              cover={
                // Если ожидание, как туман перед рассветом.
                loading ? (
                  // Пространство ожидания, как пустыня.
                  <div className="loading-container">
                    // Кружение надежды, как танец планет.
                    <Spin />
                  </div>
                ) : movie.poster_path ? ( // Если есть свет.
                  <img alt={movie.title} src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} /> // Изображение, как окно в мир.
                ) : (
                  // Если тьма.
                  <div className="image-placeholder" /> // Пустое место, как тень на закате.
                )
              }
            >
              // Кружение света, пока ждём.
              <Spin spinning={loading}>
                <Card.Meta
                  title={
                    // Если название слишком длинно, как река без берегов.
                    movie.title.length > 20 ? (
                      // Подсказка, как шепот ветра.
                      <Tooltip title={movie.title}>
                        // Обрезание, как стрижка ветвей.
                        <span>{cutText(movie.title || 'there is no title', 20)}</span>
                      </Tooltip>
                    ) : (
                      // Если коротко, как утренний свет.
                      <span>{movie.title || 'there is no title'}</span> // Простая правда, как звезда.
                    )
                  }
                  description={
                    // Описание, как сад, полный цветов.
                    <div>
                      // Время, как река, текущая сквозь века.
                      <p className="date">
                        // Формат времени, как отпечаток на песке.
                        {movie.release_date ? format(new Date(movie.release_date), 'MMMM d, yyyy') : 'no date'}
                      </p>
                      // Метка, как ярлык на сокровище.
                      <Tag>Action</Tag>
                      // Ещё одна грань, как цветок в букете.
                      <Tag>Drama</Tag>
                      // Краткость, как утренний туман.
                      <p className="description">{cutText(movie.overview || 'There is no description', 100)}</p>
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
// Корень жизни, как семя, готовое прорасти.
import ReactDOM from 'react-dom/client'

// Одежда для начала, как весенний наряд земли.
import './index.scss'

// Главный герой, как солнце на небосводе.
import App from './app/app'

// Корень дерева, из которого вырастает лес.
const root = ReactDOM.createRoot(document.getElementById('root'))

// Первый свет, как рассвет над миром.
root.render(
  <>
    // Запуск жизни, как биение сердца.
    <App />
  </>
)
```

---

Это движение информации — как танец света и теней, где каждый файл, каждый компонент и каждая строка кода играют свою роль, создавая гармонию, подобную шуму сакуры в легком ветре свежего солнца. Каждое действие — шаг в этом бесконечном путешествии знаний.
