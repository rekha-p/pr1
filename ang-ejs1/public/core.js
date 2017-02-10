var app = angular.module("uigridApp", ["ui.grid","ui.grid.pagination"]);


app.factory('CreateTaskfactory',['$http', function ($http) {

               var newtask={};
                newtask.create= function(name,descr){
                      var d= (new Date().getMonth()+1)+'/'+new Date().getDate()+'/'+new Date().getFullYear();
                       
                       var task={
                          name:name,
                          descr:descr,
                          startDate:d,
                          endDate: '',
                          status: 'created'
                       };  

                      return task;
                  }

      return newtask;

  }]);

app.service('tasksService',['$http','CreateTaskfactory', function ($http,CreateTaskfactory) {

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
           /*  $http.get('/tasks')
             .then(function(res){
                return res.data;
               }).then(function(err){
                console.log('Error:' + err); 
                return err;            
               });*/
               return taskslist;

                },
      
    

        //creates the tasks and posts it
        
               this.addNewTask = function (name,descr){  

                  var newtask=CreateTaskfactory.create(name,descr);
                    
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
                    }); */

                    var res=taskslist.push(newtask);
                    
                    if(res) return 1;
                    else 
                      return 0;
                    
                 }

         
  
      }]);



app.controller("uigridCtrl", function ($scope, tasksService) {



$scope.gridOptions = {
  excludeProperties:'__metadata',
	enableFiltering: true,
	enableSorting: true,
paginationPageSizes: [50, 50, 75],
paginationPageSize: 5,
columnDefs: [
{ field: 'name' },
{ field: 'startDate' },
{ field: 'descr', enableSorting: false, enableFiltering: false }
]
};




      var tasks = [];
      var task={
      	name:'',
      	descr:''
      };

     // $scope.load = function(){ 
       var l='';
           $scope.newtaskpanel=false;
                
           $scope.gridOptions.data = tasksService.getTaskList();
           
      // };

   // $scope.load();
     

   
      $scope.addtaskfn = function(name,descr){
       
         // var newtask=tasksService.addNewTask(addtask);
           var newtask=tasksService.addNewTask(name,descr);
            if(newtask)
               alert(name +"task is inserted");
            else
              alert(name  +"not inserted");

          $scope.name=''; $scope.descr='';
         $scope.gridOptions.data = tasksService.getTaskList();
          
        };   

    $scope.shownewtaskfn= function(){
          $scope.newtaskpanel=true;

    }


});










