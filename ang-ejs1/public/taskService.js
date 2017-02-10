var app = angular.module("uigridApp", ["ui.grid","ui.grid.pagination"]);
var createtaskfact = require('CreateTaskFactory');

module.exports= function(app){
app.service('tasksService',['$http','createtaskfact', function ($http,createtaskfact) {

var taskslist = [
{"id":"101", "name":"getMilk", "startDate":"2/7/2017", "endDate": "", "descr":"buy some milk"},
{id:102, name:'choclatees ', startDate:'3/16/2017',endDate: null, descr:'buy some milk'},
{id:103, name:'strawberris', startDate:'1/23/2017',endDate: null, descr:'buy some milk'},
{id:104, name:'blueberries', startDate:'2/31/2017',endDate: null, descr:'buy some milk'},
{id:105, name:'almonds', startDate:'9/17/2017',endDate: null, descr:'buy some milk'},
{id:106, name:'nuts', startDate:'8/21/2017', endDate: null,descr:'buy some milk'},
{id:107, name:'berries', startDate:'3/14/2017', endDate: null,descr:'buy some milk'},
{id:108, name:'books', startDate:'7/18/2017',endDate: null, descr:'buy some milk'},
{id:109, name:'songs', startDate:'5/19/2017',endDate: null, descr:'best songs'},
{id:110, name:'bread', startDate:'5/12/2017',endDate: null, descr:'buy bread'},
{id:111, name:'food', startDate:'2/16/2017',endDate: null, descr:'get food'}
];

        // retrieves the data from tasks api
            this.getTaskList = function(){        
             /* $http.get('/api/tasks')
             .then(function(res){
                return res.data;
               }).then(function(err){
                console.log('Error:' + err); 
                return err;            
               });*/
               var res1, res2;

                  console.log("res1:"+res1+"\n");
                  console.log("res2:"+res2+"\n");

              // return taskslist;

                },
      
    

        //creates the tasks and posts it
        
               this.addNewTask = function (name,descr){  

                  var newtask=createtaskfact.create(name,descr);
                    
                   /*
                   $http.post('/api/tasks', task)
                  .then(function(res){
                   alert('Task successfully created');
                   task ={};
                   return res.data;
                  //  $scope.todos = data;
                    }).then(function(err){
                    console.log('Error:' + data);
                    return err;            
                    });*/

                    var res=taskslist.push(newtask);
                    
                    if(res) return 1;
                    else 
                      return 0;
                 }

         
  
      }]);

};