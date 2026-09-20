# dic-vue-github-api

Vue.js series assignment - Vue.js and GitHub API integration.

The ToDo application from the Vue.js series, with the card componentisation
finished so that `TodoItem.vue` renders both todo cards and GitHub issue cards.

## The problem

`TodoItem.vue` referenced `todo` and `removeTodo(index)` without receiving
either, so the console reported:

> Property or method "todo" is not defined on the instance but referenced
> during render.

## The fix

**`src/components/TodoItem.vue`** takes what it displays as props and does not
decide what finishing means:

```js
props: {
  todo:  { type: String, required: true },
  index: { type: Number, required: true },
},
methods: {
  finish() {
    this.$emit('finish', this.index);
  },
},
```

**`src/views/TodosIssues.vue`** uses the same component for both lists and
binds a different handler to each:

```html
<todo-item
  v-for="( item, index ) in todos"
  :key="'todo-' + index"
  :todo="item"
  :index="index"
  @finish="removeTodo"
></todo-item>

<todo-item
  v-for="( issue, index ) in issues"
  :key="issue.id"
  :todo="issue.title"
  :index="index"
  @finish="closeIssue"
></todo-item>
```

So the parent owns the data and the actions, the child owns the card, and one
component covers both cases.

## GitHub access

Requests go to `/api/github`, the back-end proxy that holds the GitHub token.
No token is read or stored in the front end, so nothing secret ends up in the
bundle. `vue.config.js` forwards `/api/github` to `API_PROXY_TARGET` during
development.

## Verified in a browser against a stub of that API

| Check | Result |
| --- | --- |
| Issue cards on load | Both issues rendered |
| Adding todos | Todo cards appear alongside the issue cards |
| Components in the tree | `TodosIssues` plus four `TodoItem`, nothing else |
| Finish on a todo | Card removed from the view |
| Finish on an issue | `PATCH /api/github/issues/9/close` sent, card removed, server recorded the close |
| Console | No errors and no warnings |

## Run

```
npm install
API_PROXY_TARGET=http://localhost:3000 npm run serve
```

Then open <http://localhost:8080/todos-issues>.
