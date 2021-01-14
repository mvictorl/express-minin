1. Инициализируем приложение и создаем файл `package.json`:

    ```shell
    > npm init
    ```

1. Добавляем в `package.json` поддержку модулей:

    ```json
    "type": "module"
    ```

1. Устанавливаем npm-пакет `express`:

    ```shell
    > npm install express
    ```

1. Создаем файл `index.js` и импортируем `express`:

    ```javascript
    import express from 'express'
    ```

1. Инициализируем приложение:

    ```javascript
    const app = express()
    ```

1. Для запуска web-сервера вызывается метод `app.listen()` с обязательным параметром - порт:

    ```javascript
    app.listen(8080)
    ```

1. Проверяем работоспособность web-сервера:

    ```shell
    > node index
    ```

    Процесс в режиме ожидания, а браузер по адресу `http://localhost:8080/` выдаёт: `Cannot GET /` (отсутствие контента в корне web-приложения).

1. Второй параметр функции `app.listen()` может быть колбэк-функция с дополнительным функционалом web-сервера. \
   Например, сообщение в консоль:
   
    ```javascript
    app.listen(8080, () => {
      console.log('Server has been started on port 8080...')
    })
    ```

1. Выносим значение порта в константу:

    ```javascript
    const PORT = 8080
    
    app.listen(PORT, () => {
      console.log(`Server has been started on port ${PORT}...`)
    })
    ```

1. Предусматриваем наличие значения порта в переменных окружения, иначе используется значение `8080`:

    ```javascript
    const PORT = process.env.PORT ?? 8080
    ```

1. Если редактор не понимает, что осуществляется разработка приложения на `Node.js`, то устанавливаем для режима разработки пакет типов `express`:

    ```shell
    > npm install -D @types/express
    ```
    
    также в `WebStorm` необходимо нажать `Ctrl-Shift-A`, во вкладке `Actions` найти по поиску `nodejs` и включить `"Toggle coding assistance for Node.js"`
   
1. Добавляем обработку GET-запроса к корню (`/`) приложения:

    ```javascript
    app.get('/', (request, response) => {
      response.send('<h1>Hello Express</h1>')
    })
    ```
    
    В данном случае в ответ (`response`) отправляется (`send`) HTML-строка.

1. Для получения результата необходимо перезапустить сервер. \
    Чтобы сервер перезапускался автоматически в зависимости от вносимых изменений, необходимо установить пакет `nodemon` для режима разработки:
    
    ```shell
    > npm install -D nodemon
    ```

    Добавляем в `packagw.json` скрипт для запуска сервера с функционалом `nodemon`:

    ```json
    "scripts": {
      "serve": "nodemon index.js",
      "start": "node index.js"
    }
    ```

1. Создадим в корне приложения директорию `static` и в нем файл `index.html` со стандартным содержимым HTML-файла.

1. Заменим в `index.js` отправку в ответ сервера HTML-строки на отправку HTML-файла. \
Однако, для указания правильного пути к необходимому файлу потребуется импорт объекта `path` из модуля `path` библиотеки `Node.js`:

    ```javascript
    import path from 'path'

    const __dirname = path.resolve()

    app.get('/', (request, response) => {
        response.sendFile(path.resolve(__dirname, 'static', 'index.html'))
    })
    ```

1. Создадим в папке `static` еще один HTML-файл `features.html`. \
    В файле `index.html` добавим ссылку:
    ```html
    <a href="/features">Goto Features</a>
    ```
    И добавим в `index.js` новый обработчик GET-запроса для адреса `/features`:
    ```javascript
    app.get('/features', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'static', 'features.html'))
    })
    ```
    
1. Для демонстрации функции `download` переменной, обозначающей ответ сервера (в данном случае `res`), добавляем роут (обработку адреса) `/download`:
    ```javascript
    app.get('/download', (req, res) => {
      res.download(path.resolve(__dirname, 'static', 'index.html'))
    })
    ```
   И добавляем соответствующую ссылку в `index.html` файл:
    ```html
    <a href="/download" target="_blank">Download this Page</a>
    ```
   
1. С помощью middleware `express.static` можно обрабатывать прямые запросы на файлы (без описания их соответствия какому-то пути). \
Например, вместо двух описанных уже роутов: 
   ```javascript
    app.use(express.static(
      path.resolve(__dirname, 'static')
    ))
   ```
   > Не забудьте только изменить ссылки в HTML-файлах \
   > с вида `/features` на `features.html`
   
1. Демонстрация middleware.
    1. Создаем файл `middleware.js`.
    1. Импортируем в `index.js` созданные в `middleware.js` функции.
    1. Добавляем middleware с помощью `app.use()`.
   > Для создания логгера устанавливаем пакет `colors`.

1. [Переименовываем `index.js` и `/static`, очищаем их от предыдущих примеров]

1. Для дальнейшей демонстрации используем шаблонизатор [`EJS`](https://ejs.co/). \
Устанавливаем пакет `ejs`:
   ```shell
   > npm install ejs
   ```
   Присваиваем в `app` переменной `'view engine'` значение `'ejs'`:
   ```javascript
   app.set('view engine', 'ejs')
   ```
   
1. По умолчанию `ejs` ожидает шаблоны в директории `views` (посмотреть можно командой `app.get('views')`, либо задать своё значение командой `app.set()`)

1. В директории `views` создаем файл `index.ejs` со стандартной HTML-структурой.

1. В файле `index.js` пишем роутер для корня сервера:
   ```javascript
   app.get('/', (req, res) => {
     res.render('index')
   })
   ```
   
1. Переменные добавляются в шаблон вторым параметром, например:
   ```javascript
   app.get('/', (req, res) => {
     res.render('index', { title: 'EJS Main Page' })
   })
   ```
   А в шаблон `index.ejs` вставляем следующее:
   ```html
   <h1><%= title %></h1>
   ```
   
1. Создаем аналогичный шаблон `features.ejs` и соответствующий ему роут `/features` в файле `index.js`.

1. Добавляем в шаблон CDN-ссылку на стили `bootstrap`.

1. Для добавления одинакового меню (NavBar) в оба файла и для избежания дублирования кода создадим в директории `views` поддиректорию `parts` и создадим в ней файл `navbar.ejs` с кодом NavBar от `bootstrap`. \
И подключаем содержимое данного фрагмента в оба файла `index.ejs` и `features.ejs`:
   ```html
   <%- include('./parts/navbar'); %>
   ```
   
1. Аналогично выносим в отдельный файл `head.ejs` общий заголовок шаблонов.

1. Добавляем в роуты параметр `active` для выделения пункта меню активной страницы:
   ```javascript
   app.get('/', (req, res) => {
     res.render('index', { title: 'EJS Main Page', active: 'main' })
   })
   
   app.get('/features', (req, res) => {
     res.render('features', { title: 'EJS Features Page', active: 'features' })
   })
   ```
   А в фрагменте NavBar'а ссылки меню меняем на следующее:
   ```html
   <li class="nav-item">
    <a class="nav-link <% if (active === 'main') { %>active<% } %>" aria-current="page" href="/">Main</a>
   </li>
   <li class="nav-item">
    <a class="nav-link <% if (active === 'features') { %>active<% } %>" href="/features">Features</a>
   </li>
   ```

1. Теперь продемонстрируем создание **динамического** приложения.

1. Для того, чтобы вынести обработку роутов из `index.js` создаем директорию `routes`, а в ней файл `servers.js`.

1. Создаем директорию `controllers`, а в ней файл `servers.js`.

1. Добавляем контроллер в файл роута `servers.js`.

1. Добавляем к проекту (в файл `features.html`) CDN-ссылку на `Vue.js`, а так же ссылку на пользовательский файл `app.js`, который расположим в директории `static`. \
Также добавляем узел для приложения на `Vue`:
   ```html
   <div id="app"></div>
   ```
   
1. С помощью `Vue` забираем в асинхронном режиме данные с `/api/server` и вносим их в локальный массив `servers`.

1. Генерируем в `features.ejs` список на основании массива `servers`. \
Дополнительно добавляем спиннер, если массив `servers` пустой.
   
1. Добавляем в `features.ejs` форму из `bootstrap`.

1. 