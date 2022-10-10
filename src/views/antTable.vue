<template>
  <a-table
    :columns="columns"
    :data-source="data"
    bordered
    :pagination="false"
    :scroll="{ x: 200, y: 600 }"
  >
    <template slot="operation" slot-scope="text, record">
      <span style="display: inline-block; width: 35px">
        <a-icon type="plus" @click="() => addFun(record)" />
      </span>
      <span style="display: inline-block; width: 35px">
        <a-icon
          type="arrow-up"
          v-show="record.showUp"
          @click="() => moveFun(record, 'up')"
        />
      </span>
      <span style="display: inline-block; width: 35px">
        <a-icon
          type="arrow-down"
          v-show="record.showDown"
          @click="() => moveFun(record, 'down')"
        />
      </span>
    </template>
  </a-table>
</template>
  <script>
import { cloneDeep, findIndex, findLastIndex, uniq } from "lodash";
const data = [
  {
    key: "1",
    name: "John Brown",
    age: 32,
    tel: "0571-22098909",
    phone: 18889898989,
    address: "1",
  },
  {
    key: "11",
    name: "John Brown",
    age: 32,
    tel: "0571-22098909",
    phone: 18889898989,
    address: "2",
  },
  {
    key: "12",
    name: "John Brown",
    age: 32,
    tel: "0571-22098909",
    phone: 18889898989,
    address: "3",
  },
  {
    key: "13",
    name: "John Brown",
    age: 32,
    tel: "0571-22098909",
    phone: 18889898989,
    address: "4",
  },
  {
    key: "14",
    name: "John Brown",
    age: 31,
    tel: "0571-22098909",
    phone: 18889898989,
    address: "5",
  },
  {
    key: "15",
    name: "John Brown",
    age: 31,
    tel: "0571-22098909",
    phone: 18889898989,
    address: "6",
  },
  {
    key: "2",
    name: "Jim Green",
    tel: "0571-22098333",
    phone: 18889898888,
    age: 42,
    address: "11",
  },
  {
    key: "21",
    name: "Jim Green",
    tel: "0571-22098333",
    phone: 18889898888,
    age: 43,
    address: "12",
  },
  {
    key: "22",
    name: "Jim Green",
    tel: "0571-22098333",
    phone: 18889898888,
    age: 43,
    address: "13",
  },
  {
    key: "3",
    name: "Joe Black",
    age: 32,
    tel: "0575-22098909",
    phone: 18900010002,
    address: "21",
  },
  {
    key: "4",
    name: "Jim Red",
    age: 18,
    tel: "0575-22098909",
    phone: 18900010002,
    address: "22",
  },
  {
    key: "5",
    name: "Jake White",
    age: 18,
    tel: "0575-22098909",
    phone: 18900010002,
    address: "23",
  },
];
const formatData = (_data) => {
  let data = cloneDeep(_data);
  let inx = 0;
  uniq(data.map((item) => item.name)).forEach((item) => {
    //name
    const nameStart = findIndex(data, (ele) => ele.name == item);
    const nameEnd = findLastIndex(data, (ele) => ele.name == item);
    const nameNum = data.filter((ele) => ele.name == item).length;
    data.forEach((ele) => {
      if (ele.name == item) {
        ele.nameStart = nameStart;
        ele.nameEnd = nameEnd;
        ele.nameNum = nameNum;
      }
    });
    //age
    const itemData = data.filter((f) => f.name == item);
    uniq(itemData.map((i) => i.age)).forEach((i) => {
      const ageStart = inx + findIndex(itemData, (ele) => ele.age == i);
      const ageEnd = inx + findLastIndex(itemData, (ele) => ele.age == i);
      const ageNum = itemData.filter((ele) => ele.age == i).length;
      data.forEach((ele) => {
        if (ele.name == item && ele.age == i) {
          ele.ageStart = ageStart;
          ele.ageEnd = ageEnd;
          ele.ageNum = ageNum;
        }
      });
    });
    inx += itemData.length;
  });
  return formatUpAndDown(data);
};
const formatUpAndDown = (_data) => {
  //是否显示上下箭头
  _data.forEach((item, index) => {
    if (index == 0 || _data[index - 1].age != item.age) {
      item.showUp = false;
    } else {
      item.showUp = true;
    }
    if (index == _data.length - 1 || _data[index + 1].age != item.age) {
      item.showDown = false;
    } else {
      item.showDown = true;
    }
  });
  return _data;
};
export default {
  data() {
    const columns = [
      {
        title: "Name",
        dataIndex: "name",
        width: 200,
        customRender: (value, row, index) => {
          const { nameStart, nameEnd, nameNum } = row;
          const obj = {
            children: value,
            attrs: {},
          };
          obj.attrs.rowSpan =
            index > nameStart && index <= nameEnd ? 0 : nameNum;
          return obj;
        },
      },
      {
        title: "Age",
        width: 200,
        dataIndex: "age",
        customRender: (value, row, index) => {
          const { ageStart, ageEnd, ageNum } = row;
          const obj = {
            children: value,
            attrs: {},
          };
          obj.attrs.rowSpan = index > ageStart && index <= ageEnd ? 0 : ageNum;
          return obj;
        },
      },
      {
        width: 200,
        title: "Home phone",
        dataIndex: "tel",
      },
      {
        width: 200,
        title: "Phone",
        dataIndex: "phone",
      },
      {
        title: "Address",
        dataIndex: "address",
        width: 200,
      },
      {
        title: "Home phone",
        dataIndex: "tel1",
        width: 200,
      },
      {
        title: "Phone",
        dataIndex: "phone1",
        width: 200,
      },

      {
        title: "operation",
        dataIndex: "operation",
        fixed: "right",
        // width: 200,
        scopedSlots: { customRender: "operation" },
      },
    ];
    return {
      data,
      columns,
    };
  },
  created() {
    console.log(this.$store.state.count);
    this.data = formatData(this.data);
    console.log(this.data);
  },
  methods: {
    moveFun(d, str) {
      let index = this.data.findIndex((e) => e.key == d.key);
      if (str == "up") {
        this.data[index] = this.data.splice(index - 1, 1, this.data[index])[0];
      } else {
        this.data[index] = this.data.splice(index + 1, 1, this.data[index])[0];
      }
      this.data = formatUpAndDown(this.data);
    },
    addFun(d) {
      let index = this.data.findIndex((e) => e.key == d.key);
      const obj = {
        key: new Date().getTime(),
        name: d.name,
        age: d.age,
        tel: "",
        phone: "",
        address: "",
      };
      this.data.splice(index + 1, 0, obj);
      this.data = formatData(this.data);
    },
  },
};
</script>