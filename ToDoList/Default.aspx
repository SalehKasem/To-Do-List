<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Default.aspx.cs" Inherits="_Default" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">

    <title>Todo List</title>
    <link href="https://stackpath.bootstrapcdn.com/bootswatch/4.4.1/lumen/bootstrap.min.css" rel="stylesheet" integrity="sha384-715VMUUaOfZR3/rWXZJ9agJ/udwSXGEigabzUbJm2NR4/v5wpDy8c14yedZN6NL7" crossorigin="anonymous">
    <link rel="stylesheet" type="text/css" href="StyleSheet.css">
    <script type="text/javascript" src="jquery.js"></script>
    <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/css/all.css">
    <script src="https://code.jquery.com/jquery-3.1.0.js"></script>
    <link href="https://fonts.googleapis.com/css?family=Roboto&display=swap" rel="stylesheet">
</head>


<body class="bg">

     <nav class="navbar navbar-expand-lg navbar-dark bg-primary" style="height:50px;">
         <a class="navbar-brand">
            <img src="pictures/TDL_Logo.png" width="40" height="40" />
            <b>To Do List</b>
        </a>
        <button class="navbar-toggler" aria-expanded="false" aria-controls="navbarColor01" aria-label="Toggle navigation" type="button" data-target="#navbarColor01" data-toggle="collapse">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarColor01">
             <ul><li style="color:aqua; margin-top:10px; margin-right:10px">Hello <%= username %> </li></ul>
            <form  class="form-inline my-2 my-lg-0" runat="server">
                <asp:Button  id="signOutBtn"  class="btn btn-secondary my-2 my-sm-0"  runat="server" Text="Sign Out" OnClick="signOutBtn_Click" float="right"/>
            </form>
        </div>
    </nav>



    <div id="tasksDate"><input id="inputDate" type="Date" onchange="displayListOfTasks()"/></div>
    <div id="mainButtons">
        <button class="sortButtons" id="resetDate">Reset the date</button><br/>
        <button class="sortButtons" id="sortByStart">Sort by start date</button><br/>
        <button class="sortButtons" id="sortByFinish">Sort by finish date</button>
    </div>
    <div id="container1">
        <h1 class="mainHeader">To-Do List<i class="fas fa-plus"></i></h1>
        <div id="form">
            <div class="detailInForm">
                <div class="elementInForm">
                    <label for="validationServer03">Task</label>
                </div>

                <div class="elementInForm">
                    <input id="taskId" class="inputInForm" type="text" name="">
                </div>
            </div>


            <div class="detailInForm">
                <div class="form-group">
                    <label for="exampleSelect1">Priority</label>
                    <br>
                    <select id='priorityId' class='inputInForm'>
                        <option>Low</option>
                        <option>Medium</option>
                        <option>High</option>
                    </select>
                </div>
            </div>




            <div class="detailInForm">
                <div class="elementInForm">
                    <label for="validationServer03">Start date</label>
                </div>

                <div class="elementInForm">
                    <input id="startingDate" class="inputInForm" type="date" name="">
                </div>
            </div>


            <div class="detailInForm">
                <div class="elementInForm">
                    <label for="validationServer03">Finish date</label>
                </div>

                <div class="elementInForm">
                    <input id="finishingDate" class="inputInForm" type="date" name="">
                </div>
            </div>

            <div class="detailInForm">
                <div class="elementInForm">
                    <label for="validationServer03">Start time</label>
                </div>

                <div class="elementInForm">
                    <input id="startingTime" class="inputInForm" type="time" name="">
                </div>
            </div>


            <div class="detailInForm">
                <div class="elementInForm">
                    <label for="validationServer03">Finish time</label>
                </div>

                <div class="elementInForm">
                    <input id="finishingTime" class="inputInForm" type="time" name="">
                </div>
            </div>


            <br>

            <div class="detailInForm">
                <div class="form-group">
                    <label for="exampleTextarea">Note</label>
                    <textarea class="inputInForm form-control" id="exampleTextarea" rows="3"></textarea>
                </div>
            </div>


            <button id="btnCancel" class="btnInForm">Cancel</button>
            <button id="btnSave" class="btnInForm">Save</button>
        </div>

        <ul id="tasksList">
            <!-- <li>11</li>

    <li class="container2">
        <div class="detailInForm">
            <div class="elementInForm">
                <label for="validationServer03">Task</label>
            </div>

            <div class="elementInForm">
                <input class="inputInForm" type="text" name="" disabled>
            </div>
        </div>


        <div class="detailInForm">
             <div class="form-group">
                <label for="exampleSelect1">Priority</label>
                <br>
                <select class='inputInForm'>
                    <option>Low</option>
                    <option>Medium</option>
                    <option>High</option>
                </select>
            </div>
        </div>




        <div class="detailInForm">
            <div class="elementInForm">
                <label for="validationServer03">Starting date</label>
            </div>

            <div class="elementInForm">
                <input id="startingDate" class="inputInForm" type="date" name="">
            </div>
        </div>


        <div class="detailInForm">
            <div class="elementInForm">
                <label for="validationServer03">Finishing date</label>
            </div>

            <div class="elementInForm">
                <input id="finishingDate" class="inputInForm" type="date" name="">
            </div>
        </div>

        <div class="detailInForm">
            <div class="elementInForm">
                <label for="validationServer03">Start time</label>
            </div>

            <div class="elementInForm">
                <input id="startingTime" class="inputInForm" type="time" value="starttime" name="">
            </div>
        </div>


                <div class="detailInForm">
                    <div class="elementInForm">
                        <label for="validationServer03">Finish time</label>
                    </div>

                    <div class="elementInForm">
                        <input id="finishingTime" class="inputInForm" type="time" value="finishtime" name="">
                    </div>
                </div>




        <div class="detailInForm">
            <div class="custom-control custom-radio">
                <input type="radio" id="customRadio1" name="customRadio" class="custom-control-input" checked="">
                <label class="custom-control-label" for="customRadio1">Finished task</label>
            </div>
        </div>

        <br>

        <div class="detailInForm">
            <div class="form-group">
                <label for="exampleTextarea">Note</label>
                <textarea class="inputInForm form-control" id="exampleTextarea" rows="3"></textarea>
            </div>
        </div>

        <button id="btnDelete" class="btnInForm">Delete</button>
    </li> -->
            <!-- --------------------------------------------------------------------------------------->

        </ul>
    </div>






    <script type="text/javascript" src="app.js"></script>
</body>
</html>