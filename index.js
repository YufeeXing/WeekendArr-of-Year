//import moment.js
const formatDate = "YYYY-MM-DD";

function exportWeekend(year){
    let weekendArr = [];
    const yearNum = Number(year);
    const mStartDate = moment().year(yearNum).startOf('year').endOf('day');//年起始日期
    const mEndDate = moment().year(yearNum).endOf('year');//年结束日期
    const firstWeekendOfYear = moment().year(yearNum).startOf('year').endOf('week');
    let temptSaturdayDate;
    let temptSundayDate = firstWeekendOfYear.clone();
    let sameWeek = true;
    //判断年第一天是否周日
    if(firstWeekendOfYear.isSame(mStartDate)){
        //如是
        temptSaturdayDate = firstWeekendOfYear.add(6,'days');//这种情况下的第一个周六
        sameWeek = false;
    }
    else{
        //不是
        temptSaturdayDate = firstWeekendOfYear.subtract(1,'days');//另外的第一个周六
    }
    while((sameWeek && mEndDate.isAfter(temptSundayDate))||(!sameWeek && mEndDate.isAfter(temptSaturdayDate))){
        if(sameWeek){
            weekendArr.push(temptSaturdayDate.format(formatDate));//保证按日期排列
            weekendArr.push(temptSundayDate.format(formatDate));
        }
        else{
            weekendArr.push(temptSundayDate.format(formatDate));
            weekendArr.push(temptSaturdayDate.format(formatDate));
        }
        
        temptSaturdayDate.add(1,'weeks');
        temptSundayDate.add(1,'weeks');
    }
    if(!sameWeek && mEndDate.isAfter(temptSaturdayDate.subtract(1,'weeks').add(1,'hours')))//最后一个周日
    {
        weekendArr.push(temptSaturdayDate.format(formatDate));
    }
    return weekendArr;
}
