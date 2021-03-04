<script>
/*
 * @Author: Your name
 * @Date:   2020-12-24 14:26:24
 * @Last Modified by:   Your name
 * @Last Modified time: 2020-12-24 14:26:24
 */
</script>
<template>
  <Row class="question-wrapper">
    <Col span="24" class="question-list" />
    <p v-if="questionList.length == 0" style="margin: 10px 0">一点东西都没有，赶快点击上方按钮添加题目吧！</p>
    <Row
      v-for="(topic, index) in questionList"
      :key="topic.q_id"
      type="flex"
      justify="start"
      align="top"
      class="question-item"
    >
      <Col span="6" style="width: 60px; text-align: center" />
      <h2>Q{{ index + 1 }}:</h2>
      <div v-show="isPreview" class="question-action" @click="delQuestion(index)">
        <Icon type="trash-a" size="18" />
      </div>
      </Col>
      <Col span="18" />
      <h3>[{{ topic.type }}] {{ topic.question }}{{ topic.isRequired ? "（必填）" : "（选填）" }} <span v-if="topic.isRequired" style="color: #f00;">*</span></h3>
      <p v-if="topic.description !== ''" class="question-desc">说明：{{ topic.description }}</p>
      <div class="question-options">
        <div v-if="topic.type === '单选'">
          <Radio-group v-model="topic.selectContent" vertical style="width: 100%;">
            <Radio
              v-for="(option, opIndex) in topic.options"
              :key="option.o_id"
              :label="option.o_id"
              :disabled="isPreview"
              class="option-item"
            >
              <span>{{ option.content }}</span>
              <Input
                v-show="option.isAddition && topic.selectContent === option.o_id "
                v-if="option.isAddition"
                v-model="topic.additional"
                placeholder="请输入理由"
                style="width: 300px"
              /></Input>
              <div v-show="isPreview" class="option-action" @click="delOption(index, opIndex)">
                <Icon type="close" size="16" />
              </div>
            </Radio>
          </Radio-group>
        </div>
        <div v-if="topic.type === '多选'">
          <Checkbox-group v-model="topic.selectMultipleContent" class="checkbox-list">
            <Checkbox
              v-for="(option, opIndex) in topic.options"
              :key="option.o_id"
              :label="option.o_id"
              :disabled="isPreview"
              class="option-item"
            >
              <span>{{ option.content }}</span>
              <div v-show="isPreview" class="option-action" @click="delOption(index, opIndex)">
                <Icon type="close" size="16" />
              </div>
            </Checkbox>
          </Checkbox-group>
        </div>
        <div v-if="topic.type === '文本'" class="option-item">
          <Input
            v-model="topic.selectContent"
            type="textarea"
            :autosize="{minRows: 2,maxRows: 5}"
            placeholder="请输入..."
            :disabled="isPreview"
          /></Input>
        </div>
      </div>
      </Col>
    </Row>
    <div class="question-btns">
      <slot />
    </div>
    </Col>
  </Row>
</template>

<script>
export default {
  props: ['questionList', 'isPreview'],
  created() {
    console.log('imported successfully', this.questionList, this.isPreview)
  },
  methods: {
    delQuestion(index) {
      console.log(index)
      this.$store.dispatch('delQuestion', index)
    },
    delOption(index, opIndex) {
      console.log(index, opIndex)
      this.$store.dispatch('delOption', {
        index: index,
        opIndex: opIndex
      })
    }
  }
}
</script>

<style scoped>
  .question-list {
    padding: 30px 0;
    overflow: visible;
  }

  .checkbox-list label {
    display: block;
  }

  .question-options {
    padding: 5px 0;
  }

  .option-item {
    margin: 5px 0;
  }

  .question-desc {
    padding: 5px 0;
  }

  .question-action {
    display: none;
    color: #a9afb2;
  }

  .question-item {
    padding: 20px 0;
    min-width: 300px;
  }

  .question-item:hover {
    background: rgba(238, 238, 238, 0.47);
  }

  .question-item:hover .question-action {
    display: block;
    margin-top: 8px;
  }

  .question-action:hover {
    color: #018fe5;
    cursor: pointer;
  }

  .option-item {

  }

  .question-btns {
    margin-top: 20px;
  }

  .option-action {
    display: none;
    margin-left: 100px;
    padding: 0 10px;
    text-align: right;
    color: #a9afb2;
  }

  .option-action:hover {
    color: #018fe5;
  }

  .option-item:hover .option-action {
    display: inline-block;
    cursor: pointer;
  }
</style>
