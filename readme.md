# Meraki API

This is an API for Meraki app.
Meraki app is a stream online courses plataform.

It is being builded only with JavaSCript language.
Specifically with the MERN Stack:
```html
M - MongoDB
E - ExpressJS
R - ReactJS/ReactNative
N - NodeJS
```

I also have used another technologies and development tools like...
```html
HTML5 - (Markup language)
CSS3 - (Style language)
NodeJS - (Of course)
Yarn - (JavaScript package manager. You can use NPM also)
ExpressJS - (To implement the routes)
Mongoose - (To abstract the data base sintaxe)
Nodemon - (Just to reload the server when I save the script automatically)
```

Observation: The app is still being developing. So, it has some functionalities not implemented.

## Installation

Clone the repository using the command below:
(Make sure you go to the correct folder on terminal before execute this command. Just to avoid copy files in an unwanted place).
```console
git clone git@github.com:RogerFernandoBR/Meraki-API.git.

```
Then, go to the Meraki-API folder with the command below:
```console
cd Meraki-API
```
Now it's time to install the project dependencies.
```console
yarn install

```
Or...
```console
npm install

```

Then, you need to set the enviroment variables. So, go to the clonned root folder. Inside the root folder, must have a file named ".env_sample". You need to rename this file to ".env" and fill the enviroments variables inside the file.

Now you are ready to use/test the Meraki-API!
## Usage
First, you need to get the server up.
Run the following command for that:
```console
npm run dev
```
Or
```console
yarn start
```
To use the API, you must call some specific route from API.
Inside the project folder there are a script called "routes.js" that has all of the availables routes to use.
```console
Meraki-API/src/routes.js
```
I also put insede the test folder, two files:
```console
Meraki-API/test/Insomnia_meraki.json
```
And...
```console
Meraki-API/test/Insomnia-All.har
```
Both are the same tests.
You can import which one you prefer in your favorite tool to test calls to APIs like Postman or Insomnia (I really recommend Insomnia).

## License
[MIT](https://choosealicense.com/licenses/mit/)