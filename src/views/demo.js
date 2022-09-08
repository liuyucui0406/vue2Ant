const formatData = (_data) => {
    let data = cloneDeep(_data);
    let inx = 0;
    uniq(data.map((item) => item.name)).forEach((item) => {
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
    });
    //age
    uniq(data.map((item) => item.name)).forEach((item) => {
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
    return data;
  };