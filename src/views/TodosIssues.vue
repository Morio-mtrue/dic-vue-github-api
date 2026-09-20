<template>
  <div>
    <h1>
      todo list
    </h1>
    <!-- todo input form -->
    <form @submit.prevent="addTodo()">
      <el-input placeholder="todo" v-model="todo">
      </el-input>
    </form>
    <el-row :gutter="12">
      <!-- todo display area -->
      <todo-item
        v-for="( item, index ) in todos"
        :key="'todo-' + index"
        :todo="item"
        :index="index"
        @finish="removeTodo"
      >
      </todo-item>
      <!-- Issue Display Area -->
      <todo-item
        v-for="( issue, index ) in issues"
        :key="issue.id"
        :todo="issue.title"
        :index="index"
        @finish="closeIssue"
      >
      </todo-item>
    </el-row>
  </div>
</template>

<script>
import axios from 'axios';
import TodoItem from '@/components/TodoItem';

const client = axios.create({
  baseURL: '/api/github',
});

export default {
  name: 'TodosIssues',
  components: {
    TodoItem,
  },
  data() {
    return {
      todo: '',
      todos: [],
      issues: [],
    };
  },
  methods: {
    addTodo() {
      if (this.todo === '') {
        return;
      }
      this.todos.push(this.todo);
      this.todo = '';
    },
    removeTodo(index) {
      this.todos.splice(index, 1);
    },
    closeIssue(index) {
      const target = this.issues[index];
      client.patch(`/issues/${target.number}/close`)
        .then(() => {
          this.issues.splice(index, 1);
        });
    },
    getIssues() {
      client.get('/issues')
        .then((res) => {
          this.issues = res.data;
        });
    },
  },
  created() {
    this.getIssues();
  },
};
</script>
