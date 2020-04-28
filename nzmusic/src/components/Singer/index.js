function nomalData(data) {
    //处理数据
    let obj = { hot: [] };
    for (let index = 0; index < data.length; index++) {
      let  { Findex,Fother_name,Fsinger_mid,Fsinger_name } = data[index]; 
      let avator =`https://y.gtimg.cn/music/photo_new/T001R300x300M000${Fsinger_mid}.jpg?max_age=2592000`
       let singerItem= { Findex,Fother_name,Fsinger_mid,Fsinger_name,avator }
      
      //将前十条数据加入到热门内部
      if (index < 10) {
        obj.hot.push(singerItem);
      }
      if (!obj[Findex]) {
        //有添加的操作
        obj[Findex] = [singerItem];
      } else {
        //向首字母添加歌手
        obj[Findex].push(singerItem);
      }
    }
    let hot=[]
    let other=[]
    for (const key in obj) {
      if(key==='hot'){
          hot.push({Findex:key,list:obj[key]})
      }else if(key!=9){
          other.push({Findex:key,list:obj[key]})
      }
    }
    //按照下标进行排序
  other.sort((a,b)=>{return a.Findex.charCodeAt()-b.Findex.charCodeAt()})
  //将数据进行合并
  let result=hot.concat(other)
   return result
  }
  export {nomalData}