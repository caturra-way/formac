import React from 'react';
import { StyleSheet, Text, View, FlatList, Image, Dimensions, SafeAreaView } from 'react-native';
import { SQLite } from 'expo';
const DB = SQLite.openDatabase('memoDB');
function insertPlayer(subject,content) {
    console.log('insert Player, name:' + subject)
    console.log('insert Player, name:' + content)

    DB.transaction(tx => {
            tx.executeSql(
                `insert into itemmemo (itemid, subject, content) values (1, ?, ?);`,
                [subject,content]
            );
        },
        () => {
            console.log('fail')
        },
        () => {
            console.log('success')
        },
    );
}

const creatTable=()=>{//itemdetail{id:0,itemid:0,subject:"",content:"",created_datetime:yyyy-mm-dd hh:mm:ss}
    const sql = "CREATE TABLE IF NOT EXISTS itemmemo (id INTEGER PRIMARY KEY, itemid INTENGER, subject TEXT NOT NULL, content INTEGER NOT NULL, created_datetime TIMESTAMP DEFAULT (datetime(CURRENT_TIMESTAMP,'localtime')))";
    DB.transaction(tx=>{
        tx.executeSql(sql);
    },()=>{console.log("fail"),()=>{console.log("success")}});
}

function insertTestData() {
    creatTable();
    insertPlayer("使用感について","まあいいでしょ");
    insertPlayer("使用感について","まあいいでしょ");
    insertPlayer("使用感について","まあいいでしょ");
    insertPlayer("使用感について","まあいいでしょ");
    console.log(DB)
}

insertTestData()

class memoDetailScreen extends React.Component {
    constructor(props){
        super(props);
        this.state={
            memo:null,
            detail:{id:0, itemid:0, imgpath:"", name:"", maker:"", category:"", description:"", ratingcategory:""},
        }
    }
    _testformemo=()=>{
        const detail={id:0,imgpath:"https://cosmeacademia.jp/img/products/img-lotion.jpg",name:"ローション",maker:"コスメアカメディア",category:"ローションcate",description:"洗顔で十分に汚れを落とした後、最も「脂肪幹細胞のエキス」が効果を発揮できるように「脂肪幹細胞のエキス」を角質層に浸透させるベースを作ります。",ratingccategory:"保湿性|値段"};
        const memo={id:0,editdate:"2019/05/09",subject:"使用感について",content:"高いだけあって、付けた後モチモチ肌になった。"};
        this.setState(
          {detail:detail, memo:memo}
        )
        let consol;
        /*DB.transaction(tx => {
            tx.executeSql(
                'select * from itemmemo' ,
                null,
                (_, {
                    rows: {
                        _array
                    }
                }) => {this.setState({
                    consol: _array//memo
                }, () => {
                    //console.log(this.state.memo);
                })}
            )
        })*/
        DB.transaction(tx => {
            tx.executeSql('SELECT * FROM itemmemo;', [], (tx, results) => {
              const rows = results.rows;
              console.log(rows)
              //alert(rows)
              const items=rows.items
              this.setState({
                  memo:rows
              })
              //this.setState({ users });
            });
          });
    }
    componentWillMount() {
        this._testformemo()
      }
      componentDidMount(){
          console.log(this.state.memo)
      }
    render(){
        alert(this.state.memo[0])
        return(
            <SafeAreaView style={{flex:1}}>
            <View style={styles.parentView} onPress={()=>{alert("hi")}}>
              <View style={styles.commonView}>
              <View style={styles.commonImgWrapper}>
              <Image style={styles.commonImg} source={{ uri: this.state.detail.imgpath }} style={{ width: imgSize-10, height: imgSize-10 }} />
              </View>
              <View style={styles.commonRightAreaWrapper}>
              <View style={styles.commonTitleMakerCateWrapper}>
                <View style={styles.commonTitleWrapper}>
                  <Text numberOfLines={1} ellipsizeMode="tail" style={styles.commonTitle}>商品名：{this.state.detail.name}</Text>
                </View>
                  <View style={styles.commonMakerWrapper}>
                  <Text numberOfLines={1} ellipsizeMode="tail" style={styles.commonMaker}>メーカー：{this.state.detail.maker}</Text>
                  </View>
                  <View style={styles.commonCateWrapper}>
                  <Text numberOfLines={1} ellipsizeMode="tail" style={styles.commonCategory}>カテゴリー：{this.state.detail.category}</Text>                  
                  </View>
                  </View>
                  <View style={styles.commonEditWrapper}>
                    <Text style={styles.commonEdit}>最終更新日：{this.state.memo.detail}</Text>
                  </View>
              </View>
              </View>
              <View style={styles.memoView}>
              <Text numberOfLines={1} ellipsizeMode="tail" style={styles.memoSubject}>{this.state.memo.subject}</Text>
              <Text numberOfLines={1} ellipsizeMode="tail" style={styles.memoContent}>　－　{this.state.memo.content}</Text>
              </View>
              </View>
            </SafeAreaView>
        )
    }
}

let {height, width} = Dimensions.get('window');
width -= 10;
const imgSize=85;
const textMarginFromEdge=5;
const borderColor="#fbeaff";
const styles=StyleSheet.create({
  container:{
    flex:1,
  },
  parentView:{
    flex:1,
    paddingTop:10,
    paddingBottom:15,
    borderBottomColor:borderColor,
    borderBottomWidth:3,
    borderStyle:"solid"
  },
  commonView:{
    flex:1,
    flexDirection:"row",
    justifyContent:"center",
  },
  commonImgWrapper:{
    width:imgSize,
    height:imgSize+10,
    flexDirection:"row",
    justifyContent:"center",
    alignItems:"center",
  },
  commonImg:{
    marginRight:10,
    borderStyle:"solid",
    borderRightWidth:3,
    borderColor:borderColor,
  },
  commonRightAreaWrapper:{
    /*borderStyle:"solid",
    borderWidth:1,
    borderColor:borderColor,*/
    width:(width-imgSize),
    height:imgSize+10
  },
  commonTitleMakerCateWrapper:{
    flex:1,
  },
  commonTitleWrapper:{
    marginLeft:textMarginFromEdge,
    paddingTop: textMarginFromEdge,    
  },
  commonTitle:{
    borderBottomColor:"#e7e7e7",
    borderStyle:"solid",
    borderBottomWidth:0.7,
  },
  commonMakerCateWrapper:{
    flex:1,
  },
  commonMakerWrapper:{
    marginLeft:textMarginFromEdge, 
  },
  commonMaker:{
    borderBottomColor:"#e7e7e7",
    borderStyle:"solid",
    borderBottomWidth:0.7,
  },
  commonCateWrapper:{
    marginLeft:textMarginFromEdge,
  },
  commonCategory:{
    borderBottomColor:"#e7e7e7",
    borderStyle:"solid",
    borderBottomWidth:0.7,
  },
  
  commonEditWrapper:{
    marginRight:textMarginFromEdge,
    //marginTop: 5,
    paddingBottom: textMarginFromEdge,    
  },
  commonEdit:{
    textAlign:"right",
    fontStyle:"italic"
  },
  memoView:{
    /*
    borderStyle:"solid",
    borderWidth:1,
    borderColor:borderColor,*/
    width:width,
    height:50,
  },
  memoSubject:{
    fontSize:18,
    marginBottom: 10,
    marginLeft: textMarginFromEdge
  },
  memoContent:{
  }
})



export default memoDetailScreen;