<template>
  <div class="amap-page-container">
    <!-- 搜索框 -->
    <el-amap-search-box class="search-box"
                        :search-option="searchOption"
                        :on-search-result="onSearchResult">
    </el-amap-search-box>
    <el-amap ref="map"
             vid="amapDemo"
             :center="center"
             :map-manager="amapManager"
             :zoom="zoom"
             :plugin="plugin"
             :events="events"
             class="amap-demo">
      <!-- 在地图上标记点 -->
      <el-amap-marker v-for="(marker,index) in markers"
                      :key="index"
                      :position="marker"
                      :events="currentWindow.events">
      </el-amap-marker>
      <!-- 坐标点 -->
      <el-amap-marker vid="amapDemo"
                      :position="center"
                      :events="clickHandle"></el-amap-marker>
      <el-amap-info-window :position="currentWindow.position"
                           :content="currentWindow.content"
                           :visible="currentWindow.visible"
                           :events="currentWindow.events">
      </el-amap-info-window>
    </el-amap>

  </div>
</template>
<script>
import Vue from 'vue'
import VueAMap from 'vue-amap'
Vue.use(VueAMap)
let amapManager = new VueAMap.AMapManager()
export default {
  name: 'Gaode',
  created () {
    VueAMap.initAMapApiLoader({
      key: 'a61c1a307136ad1c19d9d8615d60ca7c',
      plugin: ['AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.Geolocation',
        'AMap.loadUI', 'AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.PolyEditor', 'AMap.CircleEditor'],
      uiVersion: '1.0.11' // 版本号
    })
  },
  data () {
    let me = this
    me.city = me.city || '佛山'
    return {
      visible: false,
      zoom: 12,
      center: [113.10972, 23.018779], // 中心位置
      makerConf: {
        position: [113.10972, 23.018779],
        content: ''
      },
      amapManager,
      events: {
        init: (o) => {
          // 将当前位置标记为A
          AMapUI.loadUI(['overlay/SimpleMarker'], function (SimpleMarker) {
            const marker = new SimpleMarker({
              iconLabel: 'A',
              iconStyle: 'red',
              map: o,
              position: o.getCenter()
            })
          })
          console.log('当前位置的坐标', o.getCenter())
          console.log('方法', this.$refs.map.$$getInstance())
          o.getCity(result => {
            console.log(result)
          })
        },
        'moveend': () => {
        },
        'zoomchange': () => {
        },
        'click': (e) => {
          console.log(e)
          this.center = [e.lnglat.lng, e.lnglat.lat]// 点击选择新地址为中心点
          const msg = {
            key: 'a61c1a307136ad1c19d9d8615d60ca7c',
            location: this.center.join()
          }
          // 获取当前地址
          console.log(this, 'this')
          this.$$.ajax({
            url: 'https://restapi.amap.com/v3/geocode/regeo',
            data: msg,
            success: data => {
              console.log(data)
              let d = data.regeocode
              if (d) {
                this.address = d.formatted_address// 点击选择新地址并获取地址的名称
              }
            },
            error: err => {
              console.log(err);
            }
          })
        }
      },
      markers: [
        [113.133537, 23.027676],
      ],
      clickHandle: {
        'click': (e) => {
          console.log(e)
          this.$router.push('/home')
        }
      },
      searchOption: {
        city: '佛山',
        citylimit: true
      },
      mapCenter: [113.10972, 23.018779],
      // ToolBar工具条插件、MapType插件、Scale比例尺插件、OverView鹰眼插件
      plugin: ['ToolBar', {
        pName: 'MapType',
        defaultType: 0,
        events: {
          init (o) {
            console.log(o)
          }
        }
      }, {
          pName: 'Scale',
          events: {
            init (instance) {
              console.log(instance)
            }
          }
        }, {
          pName: 'OverView',
          events: {
            init (instance) {
              console.log(instance)
            }
          }
        }],
      // 当前窗口
      currentWindow: {
        position: [0, 0],
        content: '',
        events: {
          'click': (e) => {
            console.log(e)
            this.$router.push('/home')
          }
        },
        visible: false
      },
      // 个人定义的地址
      address: ''
    }
  },
  methods: {
    getMap () {
      console.log(amapManager._componentMap)
      console.log(amapManager._map)
    },

    // 在地图上添加标记的点
    addMarker () {
      let lng = 113.1 + Math.round(Math.random() * 1000) / 10000
      let lat = 23.018779 + Math.round(Math.random() * 500) / 10000
      this.markers.push([lng, lat])
    },
    // 搜索框输入
    onSearchResult (pois) {
      console.log(pois, '123456789')
      let me = this
      let latSum = 0
      let lngSum = 0
      if (pois.length > 0) {
        var poi = pois[0]
        let lng = poi['lng']
        let lat = poi['lat']
        me.center = [lng, lat]
        me.makerConf.position = [lng, lat]
        me.list = pois
        pois.forEach(poi => {
          let { lng, lat } = poi
          lngSum += lng
          latSum += lat
          this.markers.push([poi.lng, poi.lat])
        })
        let center = {
          lng: lngSum / pois.length,
          lat: latSum / pois.length
        }
        this.mapCenter = [center.lng, center.lat]
      }
    }
  }
}
</script>

<style scoped>
.amap-demo {
  height: 1200px;
}
.search-box {
  position: absolute;
  top: 25px;
  left: 70px;
}
.amap-page-container {
  position: relative;
}
.toolbar button {
  background: #42b983;
  border: 0;
  color: white;
  padding: 8px;
  margin: 0 5px;
  border-radius: 3px;
  cursor: pointer;
  margin-top: 10px;
}
</style>

