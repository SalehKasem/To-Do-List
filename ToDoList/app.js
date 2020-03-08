//getting the user tasks list from DB 
$(document).ready(function () {
    $.ajax({

        url: "Default.aspx/getTasks",
        type: 'POST',
        contentType: 'application/json; charset=utf-8',
        success: function (response) {
            console.log(response);
            if (response != null && response.d != null) {
                var data = response.d;
                data = $.parseJSON(data);
                console.log(data);
                var sd = new Date(data[0].startDate);
                //tasks = data;
                console.log(sd.getDate());

                getDataFromDataBase(data);
                //display the user tasks list 
                displayListOfTasks();
            }
        },
        error: function (err) {
            alert('Data Loading Error!!');
        }
    });
});

function getDataFromDataBase(data) {
    for (var i = 0; i < data.length; i++) {
        data[i].startDate = new Date(data[i].startDate);
        data[i].endDate = new Date(data[i].endDate);
        tasks.push(data[i]);
    }
}

//     to add a task     ----------------
$('.fa-plus').click(function () {
    displayForm();
});

function displayForm() {
    if ($('#form').css('display') == "none") {

        $('#form').slideDown('fast');
        $('.item:nth-child(2n)').css({ display: 'none' });
    }
}
//-----------------------------------------


// to hide the form when click on cancel
$('#btnCancel').click(function () {

    hideForm();
});
function hideForm() {
    $('#form').slideUp('fast');
}

//----------------------------


//       to show and hide the details when clicking on task
$('#tasksList').on('click', '.item:nth-child(odd)', function () {
    var index = $(this).prevAll().length;
    index += 2;

    if ($('.item:nth-child(' + index + ')').css('display') == "none")
        showDetails(index)
    else
        hideDetails(index);

});

//----------------------------------------

function hideDetails(index) {
    $('.item:nth-child(' + index + ')').slideUp('fast');
    setTimeout(() => { $('.item:nth-child(' + index + ')').css({ display: 'none' }) }, 1000);
}


//------------------------------------


function showDetails(index) {
    hideForm();
    $('.item:nth-child(2n)').css({ display: 'none' })


    $('.item:nth-child(' + index + ')').slideDown('fast');
    $('.item:nth-child(' + index + ')').css({
        display: 'inline-block',
    });
}


//----------------------------------------------
//global array to hold the tasks
var tasks = [];
var editedTasks = [];

// on clicking on save
$('#btnSave').click(function () {

    var trimmed;
    // var Task = new Object();
    var Task = {
        userId: 0,
        id: "",
        taskName: "",
        priority: "",
        startDate: new Date(),
        endDate: new Date(),
        note: "",
    }

    // task
    trimmed = $('#form #taskId').val().trim();
    if (trimmed) {
        Task.taskName = trimmed;
    } else {
        alert('The field of the task is empty');
        return;
    }
    //priority
    trimmed = $('#form #priorityId').val().trim();
    if (trimmed) {
        Task.priority = trimmed;
    } else {
        alert('The field of the priority is empty');
        return;
    }



    var day, month, year;

    //starting date
    trimmed = $('#form #startingDate').val().trim();
    if (trimmed) {

        var date = new Date($('#form #startingDate').val());
        day = date.getDate();
        month = date.getMonth();
        year = date.getFullYear();
    } else {
        alert('The field of the starting date is empty');
        return;
    }

    var hours;
    var minutes;

    var startTime = $('#form #startingTime').val();
    trimmed = $('#form #startingTime').val().trim();
    if (trimmed) {

        hours = startTime.split(":")[0];

        minutes = startTime.split(":")[1];

    } else {
        alert('The field of the finishing time is empty');
        return;
    }

    Task.startDate = new Date(year, month, day, hours, minutes, 0, 0);




    //finishing date
    trimmed = $('#form #finishingDate').val().trim();
    if (trimmed) {
        var date = new Date($('#form #finishingDate').val());
        day = date.getDate();
        month = date.getMonth();
        year = date.getFullYear();
    } else {
        alert('The field of the finishing date is empty');
        return;
    }





    var finishTime = $('#form #finishingTime').val();


    trimmed = $('#form #finishingTime').val().trim();
    if (trimmed) {

        hours = finishTime.split(":")[0];
        minutes = finishTime.split(":")[1];
    } else {
        alert('The field of the finishing time is empty');
        return;
    }



    Task.endDate = new Date(year, month, day, hours, minutes, 0, 0);


    //note
    trimmed = $('#form #exampleTextarea').val().trim();
    if (trimmed) {
        Task.note = trimmed;
    } else {
        alert('The field of the note is empty');
        return;
    }

    if (Task.startDate.getTime() > Task.endDate.getTime()) {
        alert('The starting date must be befor the finishing date');
                    return;
    }

    //create unique id for the task
    Task.id = uuidv4();

    tasks.push(Task);


    $.ajax({

        url: "Default.aspx/addTask",
        type: 'POST',
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        data: JSON.stringify({ 't': Task }),
        success: function (response) {
            alert('Added Successfully');

            //initialize the labels input
            $('#form #taskId').val('');
            $('#form #priorityId').val('Low');
            $('#form #startingDate').val('');
            $('#form #finishingDate').val('');
            $('#form #exampleTextarea').val('');
            $('#form #startingTime').val('');
            $('#form #finishingTime').val('');

            hideForm();
            displayListOfTasks();

        },
        error: function (err) {
            alert('Task Adding Failed!!');
        }
    });
})

//creates unique id for task
function uuidv4() {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
}

//-----------------------------------------------------

var sort = 'start';//		variable to know by what to sort

function addTodo(task, i) {

    var sday, smonth, syear;
    if (task.startDate.getDate() < 10) {
        sday = '0' + (task.startDate.getDate()).toString();

    } else {
        sday = (task.startDate.getDate()).toString();
    }


    if (task.startDate.getMonth() + 1 < 10) {
        smonth = '0' + (task.startDate.getMonth() + 1).toString();
    } else {
        smonth = (task.startDate.getMonth() + 1).toString();
    }
    syear = task.startDate.getFullYear().toString();
    var startDate = [syear, smonth, sday].join('-');



    var eday, emonth, eyear;
    if (task.endDate.getDate() < 10) {
        eday = '0' + (task.endDate.getDate()).toString();
    } else {
        eday = (task.endDate.getDate()).toString();
    }

    if (task.endDate.getMonth() < 10) {
        emonth = '0' + (task.endDate.getMonth() + 1).toString();
    } else {
        emonth = (task.endDate.getMonth() + 1).toString();
    }
    eyear = task.endDate.getFullYear().toString();
    var finishDate = [eyear, emonth, eday].join('-');

    var id = 'task' + task.id;

    var low = '';
    var high = '';
    var medium = '';
    if (task.priority == 'Low')
        low = 'selected';
    else if (task.priority == 'High')
        high = 'selected';
    else if (task.priority == 'Medium')
        medium = 'selected';



    //-----------------------------------------------------------------
    var sHour, sMinutes;
    if (task.startDate.getHours() < 10) {
        sHour = '0' + (task.startDate.getHours()).toString();
    } else {
        sHour = (task.startDate.getHours()).toString();
    }


    if (task.startDate.getMinutes() < 10) {
        sMinutes = '0' + (task.startDate.getMinutes()).toString();
    } else {
        sMinutes = (task.startDate.getMinutes()).toString();
    }


    //-------------------------------------


    var eHour, eMinutes;
    if (task.endDate.getHours() < 10) {
        eHour = '0' + (task.endDate.getHours()).toString();
    } else {
        eHour = (task.endDate.getHours()).toString();
    }


    if (task.endDate.getMinutes() < 10) {
        eMinutes = '0' + (task.endDate.getMinutes()).toString();
    } else {
        eMinutes = (task.endDate.getMinutes()).toString();
    }

    //------------------------------------------
    if (sort == 'finish') {
        $('#tasksList').append('<li class="item">' + task.taskName + '<span><i class="dateOnLi">' + eHour + ':' + eMinutes + '       ' + (task.endDate.getMonth() + 1).toString() + '-' + task.endDate.getDate() + '-' + task.endDate.getFullYear() + '</i></span></li>');
    } else {
        $('#tasksList').append('<li class="item">' + task.taskName + '<span><i class="dateOnLi">' + sHour + ':' + sMinutes + '       ' + (task.startDate.getMonth() + 1).toString() + '-' + task.startDate.getDate() + '-' + task.startDate.getFullYear() + '</i></span></li>');
    }

    var startTime = sHour + ':' + sMinutes;
    var finishTime = eHour + ':' + eMinutes;

    $('#tasksList').append('<li id=' + id + ' class="item container2"><div class="detailInForm"><div class="elementInForm"><label for="validationServer03">Task</label></div><div class="elementInForm"><input id="tasksContent" value=' + task.taskName + ' class="inputInForm" type="text" name="" ></div></div><div class="detailInForm"><div class="form-group"><label for="exampleSelect1">Priority</label><br><select id="selectPrio" class="inputInForm"><option ' + low + ' >Low</option><option ' + medium + ' >Medium</option><option ' + high + ' >High</option></select></div></div><div class="detailInForm"><div class="elementInForm"><label for="validationServer03">Starting date</label></div><div class="elementInForm"><input value=' + startDate + ' id="startingDate" class="inputInForm" type="date" name=""></div></div><div class="detailInForm"><div class="elementInForm"><label for="validationServer03">Finishing date</label></div><div class="elementInForm"><input value=' + finishDate + ' id="finishingDate" class="inputInForm" type="date" name=""></div></div><div class= "detailInForm" ><div class="elementInForm"><label for="validationServer03">Start time</label></div><div class="elementInForm"><input id="startingTime" class="inputInForm" type="time" value=' + startTime + ' name=""></div></div><div class= "detailInForm" > <div class="elementInForm"><label for="validationServer03">Finish time</label></div> <div class="elementInForm"><input id="finishingTime" class="inputInForm" type="time" value=' + finishTime + ' name=""></div></div><br><div class="detailInForm"><div class="form-group"><label for="exampleTextarea">Note</label><textarea class="inputInForm form-control" id="exampleTextarea" id="textareaContent" rows="3">' + task.note + '</textarea></div></div> <button id="btnDelete" class="btnInForm">Delete</button><button disabled id="btnEdit" class="btnInForm">edit</button></li > ');
    $('.dateOnLi').css({
        color: 'red',
        float: 'right',
        'margin-right': '5px',
    });
}

//-----------------------------------------------------

//displaying the list of tasks on the screen
function displayListOfTasks() {
    var sortedTasks = [];
    var date = new Date($('#inputDate').val());
    var year;
    var month;
    var day;
    month = date.getMonth();
    year = date.getFullYear();
    day = date.getDate();


    var date = new Date(year, month, day, 0, 0, 0, 0);


    //if there is selected date
    if (day < 32 && day > 0) {
        for (var i = 0; i < tasks.length; i++) {//--------------
            if (checkDate(date, tasks[i]) == 0) {
                sortedTasks.push(tasks[i]);

            }



        }
    }
    else
        for (var i = 0; i < tasks.length; i++)
            sortedTasks.push(tasks[i]);


    sortedTasks = sortTasks(sortedTasks);


    $("#tasksList").empty();
    for (var i = 0; i < sortedTasks.length; i++) {
        addTodo(sortedTasks[i], i + 1);

    }
    console.log(tasks);
}

//-----------------------------------------------------


//  decide wich date is befor the another
function sortDate(task1, task2) {
    var date1;
    var date2;
    if (sort == 'finish') {
        date1 = Date.parse([task1.endDate.getMonth(), task1.endDate.getDate(), task1.endDate.getFullYear()].join('/'));
        date2 = Date.parse([task2.endDate.getMonth(), task2.endDate.getDate(), task2.endDate.getFullYear()].join('/'));
    } else {
        date1 = Date.parse([task1.startDate.getMonth(), task1.startDate.getDate(), task1.startDate.getFullYear()].join('/'));
        date2 = Date.parse([task2.startDate.getMonth(), task2.startDate.getDate(), task2.startDate.getFullYear()].join('/'));
    }




    if (date1 > date2) {
        return 1;
    } else if (date1 < date2) {
        return 2;
    } else {
        return 0;
    }

}


function checkDate(date, task) {

    var date2;
    if (sort == 'finish') {
        date2 = new Date(task.endDate.getFullYear(), task.endDate.getMonth(), task.endDate.getDate());
    } else {
        date2 = new Date(task.startDate.getFullYear(), task.startDate.getMonth(), task.startDate.getDate());
    }


    if (date.getTime() > date2.getTime()) {
        return 1;
    } else if (date.getTime() < date2.getTime()) {
        return 2;
    } else {
        return 0;
    }

}


//sorting array of tasks by date
function sortTasks(arr) {

    for (var i = 1; i < arr.length; i++) {
        for (var j = 0; j < arr.length - i; j++) {
            if (sortDate(arr[j], arr[j + 1]) == 1) {
                var temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }

    return arr;
}



//-------------------------------------------------------------------------

// on clicking on the reset date button
$('#resetDate').click(function () {
    $('#inputDate').val('');
    displayListOfTasks();
});


//----------------------------------------------------------------------------


//  on clicking on the sort by starting date button

$('#sortByStart').click(function () {
    sort = 'start';
    $('#sortByStart').css({
        background: '#158cba',
    });
    $('#sortByFinish').css({
        background: 'white',
    });
    displayListOfTasks();
})


//----------------------------------------------------------------------------


//  on clicking on the sort by finishing date button

$('#sortByFinish').click(function () {
    sort = 'finish';
    $('#sortByStart').css({
        background: 'white',
    });
    $('#sortByFinish').css({
        background: '#158cba',
    });
    displayListOfTasks();
})



//deleting task     -----------------------------

$('#tasksList').on('click', '.item #btnDelete', function () {// to make the  listener to the elements that in and also will be in the li



    var index = $(this).parent().prevAll().length;
    $('.item:nth-child(' + index + ')').remove();
    $('.item:nth-child(' + index + ')').remove();

    //delete from database
    var deletedId = $(this).parent().attr('id');
    deletedId = deletedId.substring(4);
    for (var i = 0; i < tasks.length; i++) {
        if (tasks[i].id == deletedId) {

            tasks.splice(i, 1);
            
            break;
        }
    }

    //delete from database
    $.ajax({

        url: "Default.aspx/deleteTask",
        type: 'POST',
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        data: JSON.stringify({ 'taskId': deletedId }),
        success: function (response) {
            alert('Task Deleted Successfuly');
        },
        error: function (err) {
            alert('Deleting Task Error!!');
        }
    });

});

//disable and enable the edit button
function disable() { $('#btnEdit').prop('disabled', true); }
function enable() { $('#btnEdit').prop('disabled', false); }

// on updating 
$('#tasksList').on('change', '.item .inputInForm', function () {// to make the  listener to the elements that in and also will be in the li

    enable();
    
});


//-------------------------------------------------------------------------

$('#tasksList').on('click', '.item #btnEdit', function () {// to make the  listener to the elements that in and also will be in the li
    var changedId = $(this).closest(".item").attr('id');
    var tasksNum = changedId.substring(4);
    var liInList = $(this).closest(".item");

    for (var i = 0; i < tasks.length; i++) {

        if (tasks[i].id == tasksNum) {

            var trimmed;
            var day, month, year;
            var Task = {
                userId: 0,
                id: "",
                taskName: "",
                priority: "",
                startDate: new Date(),
                endDate: new Date(),
                note: "",
            }
            Task.id = tasks[i].id;

            // task
            trimmed = $('#' + changedId + ' #tasksContent').val().trim();
            if (trimmed) {
                Task.taskName = trimmed;
            } else {
                alert('The field of the task is empty');
                return;
            }
            //priority
            trimmed = $('#' + changedId + ' #selectPrio').val().trim();
            if (trimmed) {
                Task.priority = trimmed;
            } else {
                alert('The field of the priority is empty');
                return;
            }

            var day, month, year;

            //starting date
            trimmed = $('#' + changedId + ' #startingDate').val().trim();
            if (trimmed) {

                var date = new Date($('#' + changedId + ' #startingDate').val());
                day = date.getDate();
                month = date.getMonth();
                year = date.getFullYear();
            } else {
                alert('The field of the starting date is empty');
                return;
            }

            var hours;
            var minutes;

            var startTime = $('#' + changedId + ' #startingTime').val();
            trimmed = $('#' + changedId + ' #startingTime').val().trim();
            if (trimmed) {

                hours = startTime.split(":")[0];

                minutes = startTime.split(":")[1];

            } else {
                alert('The field of the finishing time is empty');
                return;
            }

            Task.startDate = new Date(year, month, day, hours, minutes, 0, 0);

            //finishing date
            trimmed = $('#' + changedId + ' #finishingDate').val().trim();
            if (trimmed) {
                var date = new Date($('#' + changedId + ' #finishingDate').val());
                day = date.getDate();
                month = date.getMonth();
                year = date.getFullYear();
            } else {
                alert('The field of the finishing date is empty');
                return;
            }



            var finishTime = $('#' + changedId + ' #finishingTime').val();


            trimmed = $('#' + changedId + ' #finishingTime').val().trim();
            if (trimmed) {

                hours = finishTime.split(":")[0];
                minutes = finishTime.split(":")[1];
            } else {
                alert('The field of the finishing time is empty');
                return;
            }

            Task.endDate = new Date(year, month, day, hours, minutes, 0, 0);


            //note
            trimmed = $('#' + changedId + ' #exampleTextarea').val().trim();
            if (trimmed) {
                Task.note = trimmed;
            } else {
                alert('The field of the note is empty');
                return;
            }

            // //checking if the starting date before the finishing date
            if (Task.startDate.getTime() > Task.endDate.getTime()) {
                alert('The starting date must be befor the finishing date');
                return;
            }


            tasks[i].taskName = Task.taskName;
            tasks[i].priority = Task.priority;
            tasks[i].startDate = Task.startDate;
            tasks[i].endDate = Task.endDate;
            tasks[i].note = Task.note;

            displayListOfTasks();
            disable();


            // update in database
            $.ajax({

                url: "Default.aspx/updateTask",
                type: 'POST',
                contentType: 'application/json; charset=utf-8',
                dataType: 'json',
                data: JSON.stringify({ 't': Task }),
                success: function (response) {
                    alert('Updated Successfully');
                },
                error: function (err) {
                    alert('Updated Failed!!');
                }
            });


        }


    }
});
