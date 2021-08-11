# typingup-pro
- Typing-up.pro is the web app for practicing touch typing in various languages.
- The app is made with Vue.js.

## Online Use
- Access to the following website: https://www.typing-up.pro/ .
- Select language and change your keyboard language to the target language.
- Type the texts as it appears on the screen, including uppercase and lowercase, comma, apostrophe, and characters.

## Desktop Use
- Clone this repository.
- Install npm environment to your project directory. It is necessary to run Vue.js app.

### Set your own texts
- If you want to use your own texts, please put csv file to /static folder.
- Add the link to /src/components/SideMenu.vue as following.

```html
<li><a href="/language/spanish" v-bind:class="{'is-active': language === 'Spanish'}">Spanish</a></li>
```

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
