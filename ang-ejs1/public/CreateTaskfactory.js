var app = angular.module("uigridApp", ["ui.grid","ui.grid.pagination"]);
module.exports= function(app){
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