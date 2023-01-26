//變數宣告
var height = document.querySelector('.height');
var weight = document.querySelector('.weight');
var send = document.querySelector('.send');
var result = document.querySelector('.showResult');
var list = document.querySelector('.list')
var refresh = document.querySelector('.refresh');
var deleteli = document.querySelector('.record')
var deleteAllBut = document.querySelector('.deleteAll')
var data = JSON.parse(localStorage.getItem('dataList'))|| [];

updateList(data);


//事件
send.addEventListener('click',calculateBMI);
result.addEventListener('click',changeDisplay);
deleteli.addEventListener('click',deleteSelf);
deleteAllBut.addEventListener('click',deleteAll);

//方法函式
//計算BMI
function calculateBMI(e){
    heightNum = parseInt(height.value)/100;
    weightNum = parseInt(weight.value);
    var BMI = (weightNum/(heightNum*heightNum)).toFixed(2);
    var condition='';
    var classcolor = '';
    var date = new Date();
    var month = date.getMonth()+1;
    var year = date.getFullYear();
    var day = date.getDate();
    

    //提醒作用
    if(height.value == '' || weight.value == ''){
        alert('請輸入資料')
        return;
    }
    if(height.value > 999 || weight.value > 999 ){
        alert('請輸入數字且最大不超過999')
        return;
    }
    
    
    
    //BMI分級
    if (BMI < 18.5) {
        condition = '過低';
        classcolor = 'light';
        
    } else if( BMI >= 18.5 && BMI < 25 ){
        condition = '正常';
        classcolor = 'common';
        
    } else if( BMI >= 25 && BMI < 30){
        condition = '過重';
        classcolor = 'overWeight';
        
    } else if( BMI >= 30 && BMI < 35){
        condition = '中等肥胖';
        classcolor = 'fatModerate';
        
    } else if( BMI >= 35 && BMI < 40){
        condition = '嚴重肥胖';
        classcolor = 'fatSevere';
        
    } else {
        condition = '非常嚴重肥胖';
        classcolor = 'fatSerious';
       
    }

    var BMIList = {
        condition : condition,
        classcolor : classcolor,
        weight : weightNum,
        height : (heightNum*100).toFixed(0),
        BMI : BMI ,
        year : year,
        month : month,
        day : day,
    
    }
    //紀錄以便重整還有資料
    data.push(BMIList);
    localStorage.setItem('dataList',JSON.stringify(data))
    
    //更新介面
    updateList(data);
    

    str=`<ul class = ${classcolor}>
            <li class = "condition">${BMI}</li>
            <li>BMI</li>
            <li ><img class = "refresh ${classcolor} " src="https://upload.cc/i1/2020/10/01/voJMKS.png"></li>
            <div class = "resulttext" ${classcolor}>${condition}</div>
        </ul>`
    
    result.innerHTML =  str;
    
    //按結果後會自行隱藏換成結果圖
    send.style.display = 'none';
    result.style.display = 'block';
    
    //清空
    height.value='';
    weight.value='';

    deleteAllBut.style.display = 'flex';

}

function updateList(data){
    var str = ''
    for (var i = 0; i < data.length; i++) {
        str+= ` 
        <li class="${data[i].classcolor} ">
            
            <div class="firstCondition">
                ${data[i].condition}
            </div>
            
            <div class="conditionBox">
                BMI
                <em class="condition">
                    ${data[i].BMI}
                </em>
            </div>
            
            <div class="conditionBox">
                weight
                <em class="condition"> 
                    ${data[i].weight}kg
                </em>
            </div>
            
            <div class="conditionBox">
                height
                <em class="condition">
                    ${data[i].height}cm
                </em>
            </div>
            
            <div>
                    ${data[i].day}-${data[i].month}-${data[i].year}
            </div>
            <div>
                <i class="fas fa-trash condition deleteIcon data-num=${i} deleteSelf"></i>
            </div>
        </li>
        `
    }
    list.innerHTML = str;
}

//切換送出按鈕
function changeDisplay(e){
    if(e.target.nodeName!='IMG'){
        return;
    }
    send.style.display = 'flex';
    result.style.display = 'none';
    

}

//個別刪除
function deleteSelf(e){
    if(e.target.nodeName!="I"){return;}
    if (confirm('確定要刪除這筆紀錄嗎？')) {
        var num = e.target.dataset.num;
        data.splice(num,1);
        localStorage.setItem('dataList',JSON.stringify(data))
        updateList(data);
    }
    
}

//全部刪除
function deleteAll(e){
    if(confirm('確定刪除全部嗎？')){
        data = []
        localStorage.setItem('dataList',JSON.stringify(data))
        updateList(data);
    }
    send.style.display = 'flex';
    result.style.display = 'none';
    deleteAllBut.style.display = 'none';
}

