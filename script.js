function openFeatures() {
    let allElem = document.querySelectorAll('.elem')
    let fullElem = document.querySelectorAll('.fullElem')
    let backBtn = document.querySelectorAll('.back')

    allElem.forEach(function (elem) {
        elem.addEventListener('click', function () {
            fullElem[elem.id].style.display = 'block'
        })
    })
    backBtn.forEach(function (back) {
        back.addEventListener('click', function () {
            fullElem[back.id].style.display = 'none'
        })
    })

}
openFeatures()
function todoList() {
    let form = document.querySelector('.todo-form')
    let todoInput = document.querySelector('.todo-input')
    let todoTitle = document.querySelector('.task-title')
    let todoTextarea = document.querySelector('.todo-textarea')
    let markImp = document.querySelector('#mark')

    let currentask = []
    if (localStorage.getItem('currentask')) {
        currentask = JSON.parse(localStorage.getItem('currentask'))
    } else {
        console.log('Task list is empty')
    }
    function renderTask() {

        let AllTask = document.querySelector('.alltask')
        let clutter = ''
        currentask.forEach(function (elem, idx) {
            clutter += `   <div class="task">
                        <h5 class="task-title">${elem.task}<span class=${elem.imp}>imp</span></h5>
                        <button id=${idx} class="complete">Mark as Completed</button>
                    </div>`
        })
        AllTask.innerHTML = clutter
        localStorage.setItem('currentask', JSON.stringify(currentask))
        document.querySelectorAll('.complete').forEach(function (btn) {
            btn.addEventListener('click', function () {
                currentask.splice(btn.id, 1)
                renderTask()
            })
        })

    }

    renderTask()
    form.addEventListener('submit', function (e) {
        e.preventDefault()
        currentask.push({ task: todoInput.value, details: todoTextarea.value, imp: markImp.checked })

        renderTask()
        markImp.checked = false;
        todoInput.value = '';
        todoTextarea.value = '';
    })

}
todoList()
function dailyPlanner() {
    let hours = Array.from({ length: 18 }, (elem, idx) => { return `${6 + idx}:00-${7 + idx}:00` })
    let clutter = ''
    let dayPlanner = document.querySelector('.day-planner')
    let dayPlanData = JSON.parse(localStorage.getItem('dayPlanData')) || {}

    hours.forEach(function (elem, idx) {
        let savedData = dayPlanData[idx] || ''
        clutter += `  <div class="day-planner-time">
                    <p>${elem}</p>
                    <input id=${idx} class='day-plan-input' type="text" placeholder="..." value=${savedData}>
                </div>`
    })
    dayPlanner.innerHTML = clutter
    let dayPlannerInput = document.querySelectorAll('.day-plan-input')


    dayPlannerInput.forEach(function (elem) {
        elem.addEventListener('input', function () {
            dayPlanData[elem.id] = elem.value
            console.log(dayPlanData)
            localStorage.setItem('dayPlanData', JSON.stringify(dayPlanData))
        })

    })
}
dailyPlanner()
function motivation() {
    let randomQuote = document.querySelector('.quotee')
    let wrapper = document.querySelector('.motivational-wrapper')
    let author = document.querySelector('.Author')


    async function fetchQuote() {
        let response = await fetch('https://dummyjson.com/quotes')
        let data = await response.json()
        wrapper.addEventListener('click', function () {
            let number = Math.floor(Math.random() * 30)
            randomQuote.innerHTML = `${data.quotes[number].quote}`
            author.innerHTML = `${data.quotes[number].author}`

        })

    }
    fetchQuote()
}
motivation()
function clock() {
    let time = document.querySelector('.time')
    let startButton = document.querySelector('.start-time')
    let pauseButton = document.querySelector('.pause-time')
    let resetButton = document.querySelector('.reset-time')
    let session = document.querySelector('.session')
    let timeInterval = null
    let isWorkSession = true

    let totalTime = 25 * 60
    function updateTime() {
        let min = Math.floor(totalTime / 60)
        let sec = totalTime % 60
        time.innerHTML = `${String(min).padStart('2', '0')}:${String(sec).padStart('2', '0')}`
    }
    startButton.addEventListener('click', function () {

        if (timeInterval) return
        if (isWorkSession) {
            session.innerHTML = 'WORK SESSION'
        } else {
            session.innerHTML = 'BREAK'

        }

        timeInterval = setInterval(function () {

            if (totalTime > 0) {
                totalTime--
                updateTime()


            } else {
                clearInterval(timeInterval)
                timeInterval = null

                isWorkSession = !isWorkSession

                if (isWorkSession) {
                    session.innerHTML = 'WORK SESSION'
                    totalTime = 25 * 60
                } else {
                    session.innerHTML = 'BREAK'
                    totalTime = 5 * 60
                }
                updateTime()
            }
        }, 1000)
    })

    pauseButton.addEventListener('click', function () {
        clearInterval(timeInterval)
        timeInterval = null
    })

    resetButton.addEventListener('click', function () {
        clearInterval(timeInterval)
        timeInterval = null

        isWorkSession = true
        totalTime = 25 * 60

        updateTime()
    })
}
clock()

let city = 'Islamabad'
let Api = '476993309faa449db4f183418262909'
let data = null
let headerTime = document.querySelector('.header-time')
let datee = document.querySelector('.date')
let temp = document.querySelector('.temp')
let season = document.querySelector('.season')
let prep = document.querySelector('.prep')
let humi = document.querySelector('.humi')
let wind = document.querySelector('.wind')
async function weatherApiCall() {

    let response = await fetch(`http://api.weatherapi.com/v1/current.json?key=${Api}&q=${city}`)
    data = await response.json()
    temp.innerHTML=`${data.current.temp_c}°C`
    season.innerHTML=`${data.current.condition.text}`
    humi.innerHTML=`Humidity: ${data.current.humidity}%`
    wind.innerHTML=`Wind: ${data.current.wind_kph}km/h`
    prep.innerHTML=`Precipitation: ${data.current.heatindex_c}%`


}
weatherApiCall()
function timeDate() {
    let totalDaysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    let ullMonths= [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ]
    let date = new Date()
    let minss = date.getMinutes()
    let secs = date.getSeconds()
    let hourss = date.getUTCHours()
    let dateee = date.getDate()
    let month = ullMonths[date.getMonth()]
    let fullYear = date.getFullYear()
    let dayOfWeek = totalDaysOfWeek[date.getDay()]
    datee.innerHTML = `${dateee} ${month},${fullYear}`
    if (hourss > 12) {
         headerTime.innerHTML = `${dayOfWeek},${hourss}:${(String(minss).padStart('2', '0'))}:${(String(secs).padStart('2', '0'))}am`
    } else {
        headerTime.innerHTML = `${dayOfWeek},${hourss}:${(String(minss).padStart('2', '0'))}:${(String(secs).padStart('2', '0'))}pm`
    }
}
setInterval(function(){
    timeDate()
},1000)


