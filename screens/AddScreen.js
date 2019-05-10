import React from 'react';
import { StyleSheet, Text, View, FlatList, Image, Dimensions, SafeAreaView, TouchableOpacity } from 'react-native';

class AddScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            goodsidlist:[0,1,],
            detail:{id:0,imgpath:"",name:"",maker:"",category:"",description:"",ratingcategory:""},
            memo:{id:0,editdate:"",subject:"",content:""},
            review:{id:0,editdate:"",onephrase:"",averagerate:0,/*ratingcategory foreach*/},
            hashtag:{id:0,editdate:"",hashtagstring:""}
        }
      }
      componentWillMount() {
        this._testformemo()
      }
      _testformemo=()=>{
        const detail={id:0,imgpath:"https://cosmeacademia.jp/img/products/img-lotion.jpg",name:"ローション",maker:"コスメアカメディア",category:"ローションcate",description:"洗顔で十分に汚れを落とした後、最も「脂肪幹細胞のエキス」が効果を発揮できるように「脂肪幹細胞のエキス」を角質層に浸透させるベースを作ります。",ratingccategory:"保湿性|値段"};
        const memo={id:0,editdate:"2019/05/09",subject:"使用感について",content:"高いだけあって、付けた後モチモチ肌になった。"};
        this.setState(
          {detail:detail,memo:memo}
        )
      }

    

      render() {
        return (
           <SafeAreaView style={styles.container}>
            <FlatList
              data={this.state.goodsidlist}
              extraData={this.state.goodsidlist}
              //keyExtractor={this._keyExtractor}
              renderItem={({item}) =>
              <TouchableOpacity style={styles.parentView} onPress={() => this.props.navigation.navigate('memo')}>
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
                    <Text style={styles.commonEdit}>最終更新日：{this.state.memo.editdate}</Text>
                  </View>
              </View>
              </View>
              <View style={styles.memoView}>
              <Text numberOfLines={1} ellipsizeMode="tail" style={styles.memoSubject}>{this.state.memo.subject}</Text>
              <Text numberOfLines={1} ellipsizeMode="tail" style={styles.memoContent}>　－　{this.state.memo.content}</Text>
              </View>
              </TouchableOpacity>
            }
            />
          </SafeAreaView>
        );
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


export default AddScreen;