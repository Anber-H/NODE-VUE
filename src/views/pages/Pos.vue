<template>
  <div class="pos">
    <el-row>
      <el-col :span="7" class="pos-order" id="order-list">
        <el-tabs>
          <el-tab-pane label="点餐">
            <el-table :data="tableData" border style="width: 100%">
              <el-table-column prop="goodsName" label="商品"></el-table-column>
              <el-table-column prop="count" label="量" width="50"></el-table-column>
              <el-table-column prop="price" label="金额" width="70"></el-table-column>
              <el-table-column label="操作" width="100" fixed="right">
                <template slot-scope="scope">
                  <el-button type="text" size="small">删除</el-button>
                  <el-button type="text" size="small" @click="addOrderList(scope.row)">增加</el-button>
                </template>
              </el-table-column>
            </el-table>
            <div>
              <small>数量:{{totalCount}}</small>
              <small>金额:{{totalMoney}}</small>
            </div>
            <div class="function-button">
              <el-button type="warning">挂单</el-button>
              <el-button type="danger">删除</el-button>
              <el-button type="success" @click="save">结账</el-button>
              <el-button type="success" @click="download">导出</el-button>
            </div>
          </el-tab-pane>
          <el-tab-pane label="挂单">挂单</el-tab-pane>
          <el-tab-pane label="外卖">外卖</el-tab-pane>
        </el-tabs>
      </el-col>
      <el-col :span="17">
        <div class="common-goods">
          <div class="title">常用商品</div>
          <div class="common-goods-list">
            <ul>
              <li v-for="(item,index) in commonGoods" :key="index" @click="addOrderList(item)">
                <span>{{item.goodsName}}</span>
                <span class="o-price">￥{{item.price}}元</span>
              </li>
            </ul>
          </div>
        </div>
        <div class="goods-type">
          <el-tabs>
            <el-tab-pane label="汉堡">
              <div>
                <ul class="cook-list" v-if="type0Goods.length>0">
                  <li v-for="(item,index) in type0Goods" :key="index">
                    <span class="food-img">
                      <img :src="item.goodsImg" alt="pic" width="100%" />
                    </span>
                    <span class="food-name">{{item.goodsName}}</span>
                    <span class="food-price">￥{{item.price}}元</span>
                  </li>
                </ul>
              </div>
            </el-tab-pane>
            <el-tab-pane label="小食">小食</el-tab-pane>
            <el-tab-pane label="饮料">饮料</el-tab-pane>
            <el-tab-pane label="套餐">套餐</el-tab-pane>
          </el-tabs>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import axios from 'axios';
import EXCEL from '@/common/excel';

export default {
    name: 'pos',
    data () {
        return {
            totalCount: 0,
            totalMoney: 0,
            tableData: [],
            commonGoods: [
                {
                    goodsId: 1,
                    goodsName: '香辣鸡腿堡',
                    price: 18
                },
                {
                    goodsId: 2,
                    goodsName: '田园鸡腿堡',
                    price: 15
                },
                {
                    goodsId: 3,
                    goodsName: '和风汉堡',
                    price: 15
                },
                {
                    goodsId: 4,
                    goodsName: '快乐全家桶',
                    price: 80
                },
                {
                    goodsId: 5,
                    goodsName: '脆皮炸鸡腿',
                    price: 10
                },
                {
                    goodsId: 6,
                    goodsName: '魔法鸡块',
                    price: 20
                },
                {
                    goodsId: 7,
                    goodsName: '可乐大杯',
                    price: 10
                },
                {
                    goodsId: 8,
                    goodsName: '雪顶咖啡',
                    price: 18
                },
                {
                    goodsId: 9,
                    goodsName: '大块鸡米花',
                    price: 15
                },
                {
                    goodsId: 20,
                    goodsName: '香脆鸡柳',
                    price: 17
                }
            ],
            type0Goods: [],
            params: {}
        };
    },
    mounted () {
        let orderHeight = document.body.clientHeight;

        document.getElementById('order-list').style.height = orderHeight + 'px';
    },
    created () {
        axios
            .get(
                'https://www.fastmock.site/mock/0bf6a5bae7eab8507e44b56191ddff36/vuepos/typeGoods'
            )
            .then(response => {
                for (let i = 1; i < 4; i++) {
                    this.type0Goods.push(response.data.data[0][i]);
                }
                return this.type0Goods;
            })
            .catch(error => {
                console.log(error);
                alert('网络错误，不能访问');
            });
    },
    methods: {
        // async save () {
        //     const res = await this.$http.post('categories', this.params);

        //     this.$router.push('/categories/list');
        //     this.$message({
        //         type: 'success',
        //         message: '保存成功'
        //     });
        // },
        download () {
            let params = {};

            this.$http.post('reports', params).then(res => {
                console.log(res.data.data, 'res');
                const data = res.data.data;

                EXCEL.downloadExcel(data);
            });
        },
        save () {
            this.$http.post('categories', this.params).then(res => {
                this.$router.push('/categories/list');
                this.$message({
                    type: 'success',
                    message: '保存成功'
                }); 
            });
        },
        addOrderList (goods) {
            this.totalCount = 0;
            this.totalMoney = 0;
            let isHave = false;

            for (let i = 0; i < this.tableData.length; i++) {
                if (this.tableData[i].goodsId == goods.goodsId) {
                    isHave = true;
                }
            }
            if (isHave) {
                let arr = this.tableData.filter(o => o.goodsId == goods.goodsId);

                arr[0].count++;
            } else {
                let newGoods = {
                    goodsId: goods.goodsId,
                    goodsName: goods.goodsName,
                    price: goods.price,
                    count: 1
                };

                this.tableData.push(newGoods);
            }
            this.tableData.forEach(el => {
                this.totalCount += el.count;
                this.totalMoney = this.totalMoney + el.price * el.count;
            });
        }
    }
};
</script>

<style lang="less" scoped>
    .pos-order {
        background-color: #f9fafc;
        border-right: 1px solid #c0ccda;
    }
    .function-button {
        margin-top: 10px;
    }
    .title {
        height: 20px;
        border-bottom: 1px solid #d3dce6;
        background-color: #f9fafc;
        padding: 10px;
    }
    .common-goods-list {
        ul {
            li {
            list-style: none;
            float: left;
            border: 1px solid #e5e9f2;
            padding: 10px;
            margin: 5px;
            background-color: #fff;
            cursor: pointer;
            }
        }
    }
    .o-price {
        color: #58b7ff;
    }
    .goods-type {
        clear: both;
    }
    .cook-list {
        li {
            list-style: none;
            width: 23%;
            border: 1px solid #e5e9f2;
            height: 80px;
            overflow: hidden;
            background-color: #fff;
            padding: 2px;
            float: left;
            margin: 2px;
        }
    }
    .cook-list {
        li {
            span {
                display: block;
                float: left;
            }
        }
    }
    .food-img {
        width: 40%;
    }
    .food-name {
        font-size: 18px;
        padding-left: 10px;
        color: brown;
    }
    .food-price {
        font-size: 16px;
        padding-left: 10px;
        padding-top: 10px;
    }
</style>