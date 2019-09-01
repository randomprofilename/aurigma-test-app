# Aurigma Test App
<details> 
  <summary>Задание</summary>
  
  ```
   Необходимо написать простейший файловый менеджер, который позволяет:

    1. Показывать список файлов из заданной в web.config папки на сервере в табличном виде (имя файла, размер, дата модификации)

    2. Возможность просматривать вложенные папки

    3. Удалять файлы и папки

    4. Загружать файлы с клиентского компьютера

    5. Для текстовых файлов, показывать контент в отдельном модальном окне. Для картинок – отображать изображение.

    Дополнительное (необязательное) задание со звёздочкой: релизовать real-time синхронизацию файловой системы и отображаемого сожержимого.

    Unit-тесты, обработка ошибок, логирование – всё на усмотрение исполнителя.

    Серверная часть

    Серверная часть должна быть написана на ASP.NET MVC, Web API или ASP.NET Core – на выбор соискателя. В случае незнакомства соискателя с платформой Microsoft, так же допускаются альтернативные платформы – node.js, PHP, Python и проч.

    Клиенская часть

    Клиентская часть должна быть выполнена как SPA-приложение, т.е. удаление или загрузка файлов не должны требовать перезагрузки страницы.

    Можно использовать любой JavaScript Framework – Ember, Knockout.js, Vue.js, Angular, React, Polymer и проч.

    Примечание: Если не было опыта ни с одним из этих фреймворков, рекомедую обратить внимание на Vue.js – довольно простой, но при этом современный.

    Верстка

    Необходимо продемонстрировать хоть какой-нибудь навык вёрстки. Допустимо использовать любой знакомый CSS-фреймворк – Materialize, Semantic UI, Foundation, Bootstrap.
```
</details>

<details> 
  <summary>Описание Backend </summary>
  
## Node.js
### Зависимости:
* Express;
* Express-formidable - middleware для парсинга formdata;
* Morgan - логирование запросов в консоль;
* Ws - реализация веб-сокетов.

Переменные окружения:
* DIRECTORY - заданная директория, с которой будет взаимодействовать приложение. По умолчанию - папка приложения;  
* PORT - порт, который слушает приложение. По умолчанию - 3000.

Эндпоинт API - /api.

Методы API: 
* /content - 
  1. GET query: [ subdir ] - выдает список файлов и директорий в subdir.
  2. DELETE query: [ subdir ] - удаление пустой папки.
* /file - 
  1. GET query: [ subdir,  filename, preview ] - получить файл filename из папки subdir. В случае если preview=false - добавляется заголовок attachment для скачивания файла.
  2. POST formdata: [ subdir, [filename]: filedata ] - аплоад файлов в папку subdir.
  3. DELETE query: [ subdir, filename ] - удалить файл filename из subdir.

При запуске активируется fs.watch с параметром рекурсии, который оповещает по сокету об изменениях в subdir(исходя из документации - может не работать на linux).
</details>

<details> 
  <summary>Описание Frontend</summary>

## React.js приложение (create-react-app) 
### Зависимости:
* Antd - UI фреймворк
* Axios - HTTP клиент

### Переменные окружения:
* BACKEND_URL - Хост бэкенда. По умолчанию - "http://localhost:3001";  
* BACKEND_API_ENDPOINT - Эндпоинт апи бэкенда. По умолчанию "/api"
* WEBSOCKET_URL - URL вебсокета. По умолчанию - "ws://localhost:3001"

При запуске клиента - стучится на вебсокет по указанному WEBSOCKET_URL. При получении сообщений из сокета - обновляет список файлов/папок на гриде. В случае закрытия сокета - попытки реконнекта каждые 5 секунд.

#### Загрузка файлов
По нажатию на кнопку Upload Files. Возможна загрузка нескольких файлов. Возможно указать локацию, в которую будут загружены файлы (если такой нет - она будет создана).

#### Скачивание файлов 
По кнопке Download в модальном окне предпросмотра файла.

#### Информация о файле
В всплывающем окне при наведении на файл. Там же - кнопка удаления файла.

#### Просмотр файлов
В предпросмотре открываются форматы:
* Текст: txt, js json, md, bat, yml, xml, cmd;
* Изображения: jpg, webp, png, ico

</details>

## Запуск
### Backend
**В директории ./backend**

Установка зависимостей:

```npm install```

Смена рабочей директории - через изменение значения переменной окружения DIRECTORY в скрипте "start" в package.json, либо в web.config изменить значение переменной workingDirectory.

Пресет переменных в скрипте **npm start**: DIRECTORY=./share PORT=3001

Запуск:

```npm start```

### Frontend
**В директории ./frontend**

Установка зависимостей:

```npm install```


Запуск (порт 3000):

```npm start```
