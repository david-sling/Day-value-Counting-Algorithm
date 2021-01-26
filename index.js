const inputD = {
    "2020-01-01":4,
    "2020-01-02":4,
    "2020-01-03":6,
    "2020-01-04":8,
    "2020-01-05":2,
    "2020-01-06":-6,
    "2020-01-07":2,
    "2020-01-08":-2
}

var outputD = {
    'Mon': 0,
    'Tue': 0,
    'Wed': 0,
    'Thu': 0,
    'Fri': 0,
    'Sat': 0,
    'Sun': 0,
}

const days = ['Sun','Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

const getDay = date => {
    dateArray = date.split('-')
    
    var year = dateArray[0]
    const month = dateArray[1]
    const day = dateArray[2]

    year = parseInt(month)<3? (parseInt(year)-1).toString() : year

    //implementing Zeller's rule to find day
    const k = parseInt(day) //Day of the month
    const m = parseInt(month)>2? parseInt(month)-2:parseInt(month)+10  //March->1 | April->2 | .... | January->11 | February->12 |
    const D = parseInt(year.slice(2,4)) //Last two digits of the year
    const C = parseInt(year.slice(0,2)) //First two digits of the year


    var F=k+(Math.floor(13*m-1)/5)+D+Math.floor(D/4)+Math.floor(C/4)-2*C  //Zeller's formula
    F=Math.floor(F)
    // F=F/7
    var R = F>0? F%7 : F%7+7
    R = R%7
    

    return days[R]

}


var inputKeyArray = Object.keys(inputD)
// console.log(keyArray)
inputKeyArray.forEach( key => {
    var day = getDay(key)
    outputD[day] += inputD[key]
} )

outputKeyArray=Object.keys(outputD)
for(var i=0; i<7; i++){
    var prev = i==0? 6 : i-1
    var next = i==6? 0 : i+1

    if (outputD[prev]==0) prev = prev==0? 6 : prev-1
    if (outputD[next]==0) next = next==0? 6 : next-1


    if (outputD[days[i]]==0) {
        dayZero = days[i]
        dayprev = days[prev]
        daynext = days[next]
        outputD[dayZero] = Math.round((outputD[dayprev]+outputD[daynext])/2)
    }
}

console.log('input:', inputD)
console.log('output:', outputD)