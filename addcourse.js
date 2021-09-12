ONLY_TEACHER_MODE = false
TEACHER_NAME = '邓大萌'


function sleep(sleepTime) {
	for(let start = new Date; new Date - start <= sleepTime;) {}
}

function isFull(str){
    let index = str.search('/');
    return str.slice(index+1,str.length) != str.slice(0,index)
}

function clickAdd(lesson_info){
    console.log("选择"+lesson_info[2].textContent)
    lesson_info[8].getElementsByTagName("a")[0].click();
    sleep(50);
    document.querySelector("button").click()
    clearInterval(pid);
}

function addCourse(lessons_tr, only_teacher_mode){
    for (i=1;i<lessons_tr.length;i++){
        lesson_info = lessons_tr[i].getElementsByTagName("td");
        teacher = lesson_info[2].textContent;
        full_flag = isFull(lesson_info[7].textContent);
        
        if (full_flag){
            if (only_teacher_mode){
                if (teacher == TEACHER_NAME){
                    clickAdd(lesson_info);
                    return true;
                }else{console.log(teacher+'非目标老师')}
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
    console.log(flash_times);
    flash_times=flash_times+1;
    let lessons_tr =document.getElementsByClassName("zero-grid zero-grid-hover")[0].getElementsByTagName("tr");
    console.log("第一遍扫描，只扫描目标老师")
    flag = addCourse(lessons_tr, only_teacher_mode = true)
    if (flag){return 0;}
    if (!ONLY_TEACHER_MODE){
        console.log("第二遍扫描,扫描其他老师")
        addCourse(lessons_tr, only_teacher_mode = false)
    }
    console.log('\t\t');
}
var flash_times=0;
pid = setInterval(flash, 300);
