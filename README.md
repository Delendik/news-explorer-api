# Проект по поиску и сохранению интересующих новостей

## Бэкенд расположен по адресу

http://api.delendiknews.students.nomoredomains.icu


## Как взаимодействовать с API

POST /signup - зарегистрировать пользователя  
POST /signin - войти  
GET /users/me - получить данные пользователя  
GET /articles - получить сохранённые пользователем новости  
POST /articles - добавить новость в свой список  
DELETE /articles/:_id - удалить новость из списка  
