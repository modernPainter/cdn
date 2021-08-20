//调取方法：that.$refs.outputjson.show(你的数据);
Vue.component('outputjson', {
    template: `<footer style="width: 100%;height: auto;" v-show="showBox">
        <div style="width: 100vw;
            height: 100vh;
            position: fixed;
            top: 50%;
            left: 50%;
            z-index: 15;
            -webkit-transform: translate(-50%, -50%);
            -ms-transform: translate(-50%, -50%);
            transform: translate(-50%, -50%);
            background-color: rgba(0, 0, 0, 0.4);">
        </div>
        <div style="width: 900px;
            height: 550px;
            position: fixed;
            top: 50%;
            left: 50%;
            z-index: 16;
            -webkit-transform: translate(-50%, -50%);
            -ms-transform: translate(-50%, -50%);
            transform: translate(-50%, -50%);">
            <div style="width: 100%;
                    height: 50px;
                    display: flex;
                    flex-direction: row;
                    justify-content: center;">
                <button style="outline: none;
                    border: 1px solid orangered;
                    border-radius: 5px;
                    background-color: orangered;
                    color: #fff;
                    width: 80px;
                    height: 30px;
                    margin-right: 30px;" @click="selectedTxT">选择文本</button>
                    <button style="outline: none;
                    border: 1px solid orangered;
                    border-radius: 5px;
                    background-color: orangered;
                    color: #fff;
                    width: 80px;
                    height: 30px;
                    margin-right: 30px;" 
                @click="setEmpty">清空关闭</button>
            </div>
            <p style="color: greenyellow;
                line-height: 30px;
                font-size: 14px;
                padding-left: 10px;">温馨提示:数据存储在{{addressname}}中</p>
            <textarea style="width: 100%;
                height: 500px;
                padding: 15px;
                font-size: 14px;
                line-height: 20px;
                overflow: auto;
                background: #fff5ee;
                border-radius: 5px;
                outline: none;
                resize: none;" 
            ref='textareaRef' v-model="outputJSON" readonly="readonly"></textarea>
        </div>				
    </footer>`,
    props: [],
    data() {
        return {
            outputJSON: '',//输出数据
            showBox: false,//不展示浮层
            addressname:'***', //地址和名称添加
        }
    },
    methods: {
        selectedTxT() { //选中文本信息
            if (this.outputJSON != '') {
                this.$refs.textareaRef.select();
                document.execCommand("Copy"); // 执行浏览器复制命令				
            } else {
                alert("内容不能为空！");
            }
        },
        setEmpty() { //文本清空
            this.outputJSON = '';
            this.showBox = false;
        },
        show(val1,val2) { //克隆展示数据
            if (!!val1&&typeof val1==="object") {
                this.outputJSON = ComUse.JSONformat(JSON.stringify($.extend(true, {}, val1)));
                this.showBox = true;
                this.$nextTick(function () {
                    this.selectedTxT();
                });
            }
            if(!!val2){
                this.addressname=val2;
            }
        }
    },
    watch: {

    },
    created: function () {

    },
    mounted: function () {

    },
})


