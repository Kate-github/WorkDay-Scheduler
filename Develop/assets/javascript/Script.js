
const savedData = localStorage.getItem('my-schedule');
let mySchedule;
if (savedData) {
    mySchedule = JSON.parse(savedData);
} else {
    mySchedule = [];
    for (let i = 0; i < 9; i++) {
        mySchedule.push({ "hour": 9 + i });
    }
}
for (let i = 0; i < mySchedule.length; i++) {
    const item = mySchedule[i];
    const currentHour = new Date().getHours();
    const hourLabel = (item.hour < 12) ? item.hour + 'AM' : (item.hour === 12) ? item.hour + 'PM' : item.hour - 12 + 'PM';
    const description = item.description ? item.description : '';
    let hourStatus;
    if (currentHour < item.hour) {
        hourStatus = 'future';
    } else if (currentHour === item.hour) {
        hourStatus = 'present';
    } else {
        hourStatus = 'past';
    }
    const hourRow = $(`<div class="row" id="row${i}">`);
    hourRow.html(`<div class="col hour" >
                        ${hourLabel}
                    </div>
                    <div class="col-10 ${hourStatus}">
                        <textarea id="eventDescription${i}">${description}</textarea>
                    </div>
                    <div class="col saveBtn" id="btnSave${i}" data-index="${i}">
                        <i class="fa-solid fa-floppy-disk"></i>
                    </div>
                    `);
    $('#schedule').append(hourRow);
}

function saveToLocalStorage() {
    localStorage.setItem('my-schedule', JSON.stringify(mySchedule));
}
$('.saveBtn').click(function () {
    const index = $(this).data("index");
    console.log(index);
    mySchedule[index].description = $("#eventDescription" + index).val();
    saveToLocalStorage();
});