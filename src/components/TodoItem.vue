<template>
  <!--
    One card, used for both a todo and a GitHub issue.
    The text comes in as a prop and the finish button only emits an event,
    so the parent decides what finishing actually means.
  -->
  <el-col :span="12">
    <el-card class="box-card" shadow="hover" style="margin: 5px 0;">
      <el-row :gutter="12">
        <el-col :span="21">
          {{ todo }}
        </el-col>
        <el-col :span="3">
          <el-button
            type="success"
            circle
            aria-label="Complete"
            @click="finish"
          >
            ✓
          </el-button>
        </el-col>
      </el-row>
    </el-card>
  </el-col>
</template>

<script>
export default {
  name: 'TodoItem',
  props: {
    // The text shown on the card: a todo string, or an issue title.
    todo: {
      type: String,
      required: true,
    },
    // Position in the parent's list, sent back with the event.
    index: {
      type: Number,
      required: true,
    },
  },
  methods: {
    finish() {
      this.$emit('finish', this.index);
    },
  },
};
</script>
