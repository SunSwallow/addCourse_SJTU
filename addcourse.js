//配置参数
PREFERENCE_MODE = false

TEACHER_NAME = '邓大萌' //目标老师名字
TIME_AND_PLACE = '星期三'//上课时间地点,设置为空字符串则匹配所有时间

//主体代码
function sleep(sleepTime) {
	for(let start = new Date; new Date - start <= sleepTime;) {}
}

function isFull(str){
    let index = str.search('/');
    return str.slice(index+1,str.length) != str.slice(0,index)
}

function clickAdd(lesson_info){
    console.log("选择"+lesson_info[2].textContent);
    lesson_info[8].getElementsByTagName("a")[0].click();
    sleep(15);
    document.querySelector("button").click()
    clearInterval(pid);
}

function addCourse(lessons_tr, only_teacher_mode, only_time_place_mode){
    for (i=1;i<lessons_tr.length;i++){
        lesson_info = lessons_tr[i].getElementsByTagName("td");
        teacher = lesson_info[2].textContent;
        full_flag = isFull(lesson_info[7].textContent);
        time_and_place = lesson_info[6].textContent
        
        if (full_flag){
            if (only_teacher_mode){
                if (teacher == '' || teacher == TEACHER_NAME){
                    if (only_time_place_mode){
                        if (time_and_place.indexOf(TIME_AND_PLACE)!=-1){
                            clickAdd(lesson_info);
                            return true;
                        }else{
                            console.log(teacher+'  '+time_and_place + '非目标时间')
                        }
                    }else{
                        clickAdd(lesson_info);
                        return true;
                    }
                }else{
                    console.log(teacher + '非目标老师')
                }
            }else{
                clickAdd(lesson_info);
                return true;
            }
        }else{
            console.log(teacher+'已满');
        }
    };
    return false;
}

function flash(){
    document.getElementsByClassName("zeromodal-btn zeromodal-btn-primary querybtn")[0].click(); // 点击查询
    console.log('刷新次数：'+flash_times);
    flash_times=flash_times+1;
    let lessons_tr =document.getElementsByClassName("zero-grid zero-grid-hover")[0].getElementsByTagName("tr");
    console.log("第一遍扫描，只扫描目标老师与目标时间")
    flag = addCourse(lessons_tr, only_teacher_mode = true, only_time_place_mode=true);
    if (flag){return 0;}
    if (!PREFERENCE_MODE){
        console.log("第二遍扫描,扫描目标老师所有时间")
        flag = addCourse(lessons_tr, only_teacher_mode = true, only_time_place_mode=false);
        if (flag){return 0;}
        console.log("第三遍扫描,扫描所有老师所有时间")
        flag = addCourse(lessons_tr, only_teacher_mode = false, only_time_place_mode=false);
        if (flag){return 0;}
    }
    console.log('\t\t');
}
var flash_times=0;
pid = setInterval(flash, 100);
