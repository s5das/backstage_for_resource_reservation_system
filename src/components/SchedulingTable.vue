<template>
  <div class="course-table clearfix" :style="{ width: `${tableWidth}px` }">
    <div class="float-left">
      <div
        class="top-table clearfix"
        :style="{ height: `${dayHeight}px`, top: `${stickyTop}px` }"
      >
        <div
          class="menu float-left"
          :style="{ width: `${sectionWidth}px` }"
        ></div>
        <div class="week-table float-left clearfix">
          <div
            v-for="(day, dayIndex) in weekTable"
            :class="[
              'day',
              'float-left',
              'content-center',
              showTimeline && nowDay == dayIndex + 1 ? 'active' : '',
            ]"
            :key="dayIndex"
            :style="{ width: `${dayWidth}px` }"
          > 
          <div>
            <div style="margin-bottom: 10px;">{{time[dayIndex]}}</div>
            <div>{{day}}</div>
          </div>
            
          </div>
        </div>
      </div>
      <div class="clearfix position-relative">
        <div
          class="now-timeline"
          v-if="showTimeline"
          :style="{
            top: `${nowTimelineTop}px`,
          }"
        >
          <div class="label" :style="{ width: `${sectionWidth}px` }">
            {{ nowTimeStr }}
          </div>
          <div
            class="now-point"
            :style="{
              left: `${sectionWidth +
                (nowDay > 0 ? nowDay - 1 : 0) * dayWidth}px`,
            }"
          ></div>
        </div>
        <div
          class="float-left section-table"
          :style="{ width: `${sectionWidth}px` }"
        >
          <div>
            <div
              class="section content-center"
              v-for="(part, partIndex) in parts"
              :key="partIndex"
              :style="{
                height: `${part.height}px`,
              }"
            >
              <!-- {{ part.name }} -->
            </div>
          </div>
          <div class="parts">
            <div
              v-for="(item, index) in markers"
              :key="index"
              :style="{ height: `${item.height}px` }"
              class="part"
            >
              <div class="label">{{ item.label }}</div>
            </div>
          </div>
        </div>
        <div class="all-courses float-left">
          <div class="clearfix">
            <div
              v-for="(day, dayIndex) in weekTable"
              :class="[
                'col',
                'float-left',
                showTimeline && nowDay == dayIndex + 1 ? 'active' : '',
              ]"
              :key="dayIndex"
              :style="{ width: `${dayWidth}px` }"
            >
              <div
                class="cell"
                v-for="(part, partIndex) in parts"
                @click="add(part)"
                :key="partIndex"
                :style="{ height: `${part.height}px` }"
                >
                <div v-for="item of 5" :key="item" :style="{borderBottom:'solid 1px #eee',height:'42px'}"></div>
              </div>
             
            </div>
          </div>
          <div
            v-for="(course, index) in modelValue"
            :key="course.id"
            class="course-wrap"
            :style="{
              width: `${dayWidth}px`,
              height: `${((course.end[0] - course.start[0]) * 60 +
                (course.end[1] - course.start[1])) *
                pixelOfMinutes}px`,
              left: `${(course.day - 1) * dayWidth}px`,
              top: `${((course.start[0] - parts.morning.start[0]) * 60 +
                course.start[1]) *
                pixelOfMinutes}px`,
            }"
          >
            <CourseCard
              @edit="editCourse"
              @remove="removeCourse"
              :index="index"
              :course="course"
            ></CourseCard>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CourseCard from "./CourseCard.vue";

function fixNumber(num) {
  num = "" + num;
  return num[1] ? num : "0" + num;
}

export default {
  name: "SchedulingTable",
  components: {
    CourseCard,
  },
  emits: ["add", "edit", "remove"],
  props: {
    modelValue: null,
    minuteHeight: {
      type: Number,
      default: 1,
    },
    showTimeline: {
      type: Boolean,
      default: false,
    },
    stickyTop: {
      type: Number,
      default: 0,
    },
    time:{
      typle:Object,
    }
  },
  data() {
    return {
      CardsData: this.modelValue,
      // 一周天数
      weekTable: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
      // 一天节数
      sectionTable: ["早", "上", "下", "晚"],
      // 节数栏宽度
      sectionWidth: 90,
      // 天数栏高度
      dayHeight: 50,
      // 一节宽度
      dayWidth: 150,
      // 一节高度
      sectionHeight: 100,
      // 一分钟所占像素
      pixelOfMinutes: this.minuteHeight,
      // now-timeline 顶部定位
      nowTimelineTop: 0,
      // now time str
      nowTimeStr: "00:00",
      // 周几
      nowDay: 0,
      // 定时器
      timer: null,
    };
  },
  created() {
    this.timer = setInterval(() => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      if (
        hours < this.parts.morning.start[0] ||
        hours >= this.parts.night.end[0]
      ) {
        this.nowTimelineTop = 0;
        return;
      }
      this.nowDay = now.getDay();
      this.nowTimelineTop =
        ((hours - this.parts.morning.start[0]) * 60 + minutes) *
        this.pixelOfMinutes;
      this.nowTimeStr = `${fixNumber(hours)}:${fixNumber(minutes)}`;
    }, 1000);
  },
  computed: {
    // 刻度
    markers() {
      const startHours = this.parts.morning.start[0];
      const endHours = this.parts.night.end[0];
      const data = [];
      const heightOfHours = 60 * this.pixelOfMinutes;
      for (let i = startHours; i <= endHours; i++) {
        data.push({
          label: `${fixNumber(i)}:00`,
          height: heightOfHours,
        });
      }
      return data;
    },
    // 表格宽度
    tableWidth() {
      const tableWidth =
        this.sectionWidth + this.weekTable.length * this.dayWidth;
      return tableWidth;
    },
    // 表格高度
    tableHeight() {
      const tableHeight =
        this.dayHeight +
        this.morningHeight +
        this.forenoonHeight +
        this.afternoonHeight +
        this.nightHeight;
      return tableHeight;
    },
    parts() {
      return {
        // 早课180分钟
        morning: {
          name: "早",
          height: 0,
          start: [8,0],
          end: [8, 0],
        },
        // 上午300分钟
        forenoon: {
          name: "上",
          height: this.pixelOfMinutes * 300,
          start: [8, 0],
          end: [13, 0],
        },
        // 下午300分钟
        afternoon: {
          name: "下",
          height: this.pixelOfMinutes * 300,
          start: [13, 0],
          end: [18, 0],
        },
        // 晚课300分钟
        night: {
          name: "晚",
          height: this.pixelOfMinutes * 300,
          start: [18, 0],
          end: [22, 0],
        },
      };
    },
  },
  mounted() {
    console.log(this.time)
  },
  methods: {
    add(part) {
      this.$emit("add", part);
    },
    editCourse(i) {
      this.$emit("edit", i, this.CardsData[i]);
    },
    removeCourse(i) {
      this.$emit("remove", i, this.CardsData[i]);
    },
  },
};
</script>

<style scoped>
* {
  box-sizing: border-box;
}
.float-left {
  float: left;
}
.clearfix:before,
.clearfix:after {
  content: "";
  display: block;
  clear: both;
}
.content-center {
  display: flex;
  align-items: center;
  justify-content: center;
  
}
.course-table {
  margin: 0px auto;
  font-size: 15px;
}
.menu {
  height: 100%;
  /* border: 1px solid #eee; */
}
.top-table {
  background-color: #fff;
  position: sticky;
  z-index: 2;
}
.week-table {
  border-bottom: 1px solid #eee;
  /* border-top: 1px solid #eee; */
  height: 105%;
  
}
.week-table .day {
  text-align: center;
  height: 100%;
  /* border-right: 1px solid #eee; */
  transition: all 1000ms;
}
.week-table .day.active {
  background-color: #e9ebfb;
  color: #222;
}
.col {
  transition: all 1000ms;
  
}
.col.active {
  background-color: #f5f6fd;
}
.section-table {
  position: relative;
  /* border-right: 1px solid #eee; */
  text-align: center;
  /* border-left: 1px solid #eee; */
}
.cell {
  position: relative;
  /* border-right: 1px solid #eee;*/
  /* border-bottom: 1px solid #eee; */
  color: #ddd;
}
.all-courses {
  position: relative;
}
.add-course {
  height: 100%;
  font-size: 2em;
  color: transparent;
  background-color: transparent;
  transition: all 170ms;
}
.add-course:hover {
  background-color: #f9f9f9;
  cursor: pointer;
  color: #607d8b;
}

.course-wrap {
  position: absolute;
  z-index: 1;
  padding: 0 4px;
  color: #fff;
  transition: all 500ms;
}
.parts {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
}
.parts .part {
  position: relative;
}
.parts .label {
  position: absolute;
  top: -8px;
  width: 100%;
  height: -1px;
  line-height: 1;
  /* border-top: 1px solid #eee; */
  /* padding-top: 4px; */
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-right:10px;
  /* color: #bbb; */
  z-index: 100;
}
.part:last-child {
  /* border-bottom: 1px solid #eee; */
}
.position-relative {
  position: relative;
}
.now-timeline {
  position: absolute;
  z-index: 2;
  left: 0;
  right: 0;
  height: 2px;
  background-color: crimson;
  pointer-events: none;
  transition: all 1000ms;
}
.now-timeline .label {
  position: absolute;
  transform: translate(0, -50%);
  line-height: 1;
  background-color: crimson;
  color: #fff;
  padding: 4px 0;
  text-align: center;
  font-weight: bold;
  border-radius: 3px;
}
.now-point {
  position: absolute;
  top: 0;
  width: 8px;
  height: 8px;
  background-color: crimson;
  transform: translate(0, -40%);
  border-radius: 10px;
  transition: all 1000ms;
}
</style>
