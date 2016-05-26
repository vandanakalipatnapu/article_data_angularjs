app = angular.module('app2',['ngRoute']);

app.directive('fileModel',function($parse){
       
       return{
          restrict: 'A',
          link: function(scope,element,attrs){
            var model = $parse(attrs.fileModel);
            var modelSetter = model.assign;
            
            element.bind('change',function(){
              scope.$apply(function(){
                modelSetter(scope,element[0].files[0])
              })
            })

          }
       }

      });
      
       app.service('multipartform',function($http){
         // alert("in multipart service part")

        this.post = function uploader(uploadurl,data){

          // alert("inside uploader function");
         var fd = new FormData();

         for(var key in data)
          fd.append(key,data[key]);
          
          $http.post(uploadurl,fd,{
            transformRequest: angular.Identity,
            headers: {'Content-Type': undefined }
          });
        }

      });


 // app.controller('formsController', ['$scope','$http', 'fileUpload', function($scope,$http, fileUpload){
  
 //  $scope.createarticle = function(article){
 //    $http.post("http://192.168.199.239:3000/articles",article)
 //        .then(function(response){
 //            var file = $scope.article.image;
 //            alert($scope.article.image);

 //            var uploadUrl = "http://192.168.199.239:3000/articles.json";
 //            fileUpload.uploadFileToUrl(file, uploadUrl);
 //            $http.get("http://192.168.199.239:3000/articles")
 //            .then(function(response){
 //                $scope.images = response.data.articles;

 //            });
 //            $scope.article = response.data.article;
 //            console.log($scope.article);
 //        });
 //  };
        app.controller('formsController',function($scope,$http,multipartform){
        $scope.createarticle = function(article){ 
          var uploadurl = 'http://192.168.199.239:3000/articles';
          multipartform.post(uploadurl,$scope.article);
  //      $http.post("http://192.168.199.239:3000/articles",article)
  //           .then(function(response){
  //     alert($scope.article);
  // });
  }

	$scope.categorydata = function(){
    	$http.get("http://192.168.199.239:3000/categories")
   		.then(function(response){
    		$scope.categories = response.data.categories;
        	// alert($scope.colleges)
    		console.log($scope.categories)
     		});
 	}

 	$scope.allarticles = function(){
 		$http.get("http://192.168.199.239:3000/articles")
 		.then(function(response){
 			$scope.articles = response.data.articles;
 			console.log($scope.articles);
 		});
 	}

  $scope.showdata = function(id){
    // alert();
    $scope.article_id = id;
      $http.get("http://192.168.199.239:3000/articles/"+id)
      .then(function(response){
      $scope.show = response.data.article;
      $scope.comment_show = response.data.comment;
         console.log($scope.show);
         console.log($scope.comment_show);
         // document.write($scope.postshow.title)
     });
 }

  $scope.editarticle = function(id){
    // alert();
      $http.get("http://192.168.199.239:3000/articles/"+id)
      .then(function(response){
      $scope.edit = response.data.article;
      $scope.article = $scope.edit;
         console.log($scope.article);
     });
 }

  $scope.createcomment = function(comment,article_id){
        $http.post("http://192.168.199.239:3000/articles/"+article_id+"/comments",comment)
      .then(function(response){
        $scope.comment_details = response.data.comment;
        console.log($scope.comment_details);
    });
 }

 $scope.createcategory = function(category){
  $http.post("http://192.168.199.239:3000/categories",category)
  .then(function(response){
    $scope.categorydata = response.data.category;
    console.log($scope.categorydata);
  });
 }

 $scope.updatearticle = function(article){
    // alert(student);
          $http.put("http://192.168.199.239:3000/articles/"+article,$scope.article)
    .then(function(response){

      $http.get("http://192.168.199.239:3000/articles")
        .then(function(response){
          $scope.article = response.data.articles;
          console.log($scope.article);
        });
       
    });
}
$scope.categorydata();

});

app.config(['$routeProvider',function($routeProvider){
          $routeProvider.when('/newarticle',{
            templateUrl: 'articleform.html'
          });

          $routeProvider.when('/allarticles',{
            templateUrl: 'articles.html'
          });

          $routeProvider.when('/showarticle',{
            templateUrl: 'show.html'
          });

          $routeProvider.when('/newcomment',{
            templateUrl: 'commentform.html'
          });

          $routeProvider.when('/edit',{
            templateUrl: 'editarticle.html'
          });

           $routeProvider.when('/newcategory',{
            templateUrl: 'categoryform.html'
          });

      }]);