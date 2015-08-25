// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('quizApp', ['ionic','angular-svg-round-progress','ngCordova'])

.run(function ($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      if (cordova.platformId == 'android') {
        StatusBar.backgroundColorByHexString("#ff0000");
      }
      else {StatusBar.styleDefault();}
    }
  });
}).config(['$stateProvider','$urlRouterProvider',function($stateProvider, $urlRouterProvider){
  $stateProvider
  // .state('tab',{
  //   url:'/tab',
  //   abstract:true,
  //   templateUrl:'templates/tabs.html'
  // })
  // .state('tab.choose',{
  //   url:'/choose',
  //   views:{
  //     'tab-choose':{
  //       templateUrl:'templates/homeTmpl.html',
  //       controller:'StartController'
  //     }
  //   }
  // })
  // .state('tab.quiz',{
  //   url:'/quiz',
  //   views:{
  //     'tab-quiz':{
  //       templateUrl:'templates/quizStateTmpl.html',
  //       controller:'QuizController'
  //     }
  //   }
  // })
  .state('choose',{
    url:'/choose',
    templateUrl:'templates/homeTmpl.html',
    controller:'StartController'
  })
  .state('quiz',{
    url:'/quiz',
    templateUrl:'templates/quizStateTmpl.html',
    controller:'QuizController'
  })
  .state('acknowledgements',{
    url:'/acknowledgements',
    templateUrl:'templates/acknowledgementsTmpl.html',
    controller:'AcknowledgementsContr'
  })
  .state('statistics',{
    url:'/statistics',
    templateUrl:'templates/statisticsTmpl.html',
    controller:'StatisticsContr'
  })
  .state('instructions',{
    url:'/instructions',
    templateUrl:'templates/instructionsTmpl.html',
  });
  $urlRouterProvider.otherwise('/choose');
}])
// .factory('$localstorage', ['$window', function($window) {
//   return {
//     set: function(key, value) {
//       $window.localStorage[key] = value;
//     },
//     get: function(key, defaultValue) {
//       return $window.localStorage[key] || defaultValue;
//     },
//     setObject: function(key, value) {
//       $window.localStorage[key] = JSON.stringify(value);
//     },
//     getObject: function(key) {
//       return JSON.parse($window.localStorage[key] || '{}');
//     }
//   }
// }])
.factory("Data",function(){
  var factory={};
  factory.chosenLength={};
  factory.customCategories=[];
  //factory.chosenLength.chosen=null;
  var quizObjectRaw=[
    {"category":"general","question": "Grand Central Terminal, Park Avenue, New York is the world's", "choices": ["largest railway station","highest railway station","longest railway station","None of the above"], "correctAnswer":0},
    {"category":"science","question": "Entomology is the science that studies", "choices": ["Behavior of human beings","Insects","The origin and history of technical and scientific terms","the formation of rocks"], "correctAnswer":1},
    {"category":"world","question": "Eritrea, which became the 182nd member of the UN in 1993, is in the continent of", "choices": ["Asia","Europe","Africa","Australia"], "correctAnswer":2},
    {"category":"world","question": "Garampani sanctuary is located in the Indian town of", "choices": ["Diphu, Assam","Junagarh, Gujarat","Gangtok, Sikkim","Kohima, Nagaland"], "correctAnswer":0},
    {"category":"general","question": "For which of the following disciplines is Nobel Prize awarded?", "choices": ["Physics and Chemistry","Literature, Peace and Economics","Physiology or Medicine","All of the above"], "correctAnswer":3},
    {"category":"history","question": "Hitler's party, which came into power in 1933, is known as", "choices": ["Ku-Klux-Klan","Labour Party","Democratic Party","Nazi Party"], "correctAnswer":3},
    {"category":"science","question": "Galileo was an Italian astronomer who", "choices": ["discovered four satellites of Jupiter","discovered that the movement of pendulum produces a regular time measurement","developed the telescope","All of the above"], "correctAnswer":3},
    {"category":"science","question": "Exposure to sunlight helps improve a person's health because", "choices": ["resistance power increases","the ultraviolet rays convert skin oil into Vitamin D","the infrared light kills bacteria in the body","the pigment cells in the skin get stimulated and produce a healthy tan"], "correctAnswer":1},
    {"category":"history","question": "First China War was fought between", "choices": ["China and Britain","China and France","China and Egypt","China and Greece"], "correctAnswer":0},
    {"category":"world","question": "Famous Indian sculptures depicting art of love built some time in 950 AD - 1050 AD are at", "choices": ["Mahabalipuram temples","Jama Masjid","Khajuraho temples","Sun temple"], "correctAnswer":2},
    {"category":"science","question":"Friction can be reduced by changing from","choices":["sliding to rolling","rolling to sliding","potential energy to kinetic energy","dynamic to static"],"correctAnswer":0},
    //{"category":"history","question":"During World War II, when did Germany attack France?","choices":["1915","1940","1943","1962"],"correctAnswer":1},
    {"category":"science","question":"The ozone layer restricts which of the following types of radiation?","choices":["Visible light","Infrared radiation","X-rays and gamma rays","Ultraviolet radiation"],"correctAnswer":3},
    {"category":"history","question":"During World War II, when did Germany attack France?","choices":["1915","1940","1943","1962"],"correctAnswer":1},
    {"category":"general","question":"Eugenics is the study of","choices":["people of European origin","different races of mankind","altering human beings by changing their genetic components","genetics of plants"],"correctAnswer":2},
    {"category":"science","question":"Escape velocity of a rocket fired from the earth towards the moon is a velocity to get rid of the","choices":["Moon's gravitational pull","Earth's gravitational pull","Centripetal force due to the earth's rotation","Pressure of the atmosphere"],"correctAnswer":1},
    {"category":"history","question":"Hamid Karzai was chosen president of Afghanistan in","choices":["2002","1978","2010","1899"],"correctAnswer":0},
    {"category":"world","question":"Headquarters of UNO are located at","choices":["Geneva (Switzerland)","Paris (France)","Hague (Netherlands)","New York (USA)"],"correctAnswer":3},
    {"category":"general","question":"For seeing objects at the surface of water from a submarine under water, the instrument used is","choices":["Telescope","Spectroscope","Periscope","No scope 360"],"correctAnswer":2},
    {"category":"entertainment","question":"Which 1990's TV series won the Emmy Award as best comedy in five consecutive years?","choices":["Friends","Days of our Lives","Ally McBeal","Frasier"],"correctAnswer":3},
    {"category":"history","question":"Which US holiday came to exist as a result of a presidential Proclamation in 1863?","choices":["Thanksgiving","Labor Day","Veteran's Day","4th of July"],"correctAnswer":0},
    {"category":"entertainment","question":"Who wrote 'The Raven'?","choices":["Daniel Defoe","Mark Twain","Edgar Allan Poe","Nathaniel Hawthorne"],"correctAnswer":2},
    {"category":"world","question":"After Los Angeles, which California city not starting with an 'S' has the highest population?","choices":["Long Beach","Fresno","Oakland","Fremont"],"correctAnswer":1},
    {"category":"entertainment","question":"In which year was the first talkie film, 'The Jazz Singer', released?","choices":["1905","1916","1927","1939"],"correctAnswer":2},
    {"category":"world","question":"Which American state has the closest proximity to Russia?","choices":["Hawaii","Alaska","California","Oregon"],"correctAnswer":1},
    {"category":"science","question":"Which word describes a living being that is both male and female?","choices":["Androgynous","Gynandromorph","Hermaphrodite","Gonochorous"],"correctAnswer":2},
    {"category":"entertainment","question":"In the famous movie 'Rocky', what was Sylvester Stallone's character's last name?","choices":["Marciano","Colavito","Lynch","Balboa"],"correctAnswer":3},
    {"category":"entertainment","question":"Which female artist has the most top ten Billboard hits?","choices":["Madonna","Whitney Houston","Britney Spears","Janet Jackson"],"correctAnswer":0},
    {"category":"history","question":"Who was the last president of the Soviet Union?","choices":["Nikita Khrushchev","Gennady Yanayev","Vladimir Lenin","Mikhail Gorbachev"],"correctAnswer":3},
    {"category":"entertainment","question":"Which 1990s musical group was heavily criticized for releasing a song written by Charles Manson?","choices":["Pearl Jam","Marilyn Manson","Guns and Roses","The Beastie Boys"],"correctAnswer":2},
    {"category":"entertainment","question":"Which is the largest Sesame Street Puppet?","choices":["Mr. Snuffleupagus","Big Bird","Elmo","this"],"correctAnswer":0},
    {"category":"science","question":"Who discovered penicillin?","choices":["Louis Pasteur","Joseph Lister","Robert Koch","Alexander Fleming"],"correctAnswer":3},
    {"category":"science","question":"Approximately how long does light from the sun need to reach the earth?","choices":["8 minutes","24 hours","45 seconds","365 days"],"correctAnswer":0},
    {"category":"general","question":"What is the smallest country in the world?","choices":["Grenada","Monaco","Vatican","Tuvalu"],"correctAnswer":2},
    {"category":"general","question":"Which disease is the focus of oncology?","choices":["Glaucoma","HIV","Diabetes","Cancer"],"correctAnswer":3},
    {"category":"general","question":"What is the most popular sport in the world?","choices":["Hockey","Football/soccer","Basketball","Tennis"],"correctAnswer":1},
    {"category":"general","question":"What is the hardest substance found in nature?","choices":["Iron","Wurtzite boron nitride","Diamond","Alumina"],"correctAnswer":1},
    // {"category":"general","question":"this","choices":["this","this","this","this"],"correctAnswer":},
    // {"category":"this","question":"this","choices":["this","this","this","this"],"correctAnswer":},
    // {"category":"this","question":"this","choices":["this","this","this","this"],"correctAnswer":},
  ];
  factory.quizObjectRaw=quizObjectRaw;
  var quizObjectJSON=[];
  var randomizeArray=function(targetArr,desiredLength){
    var returnArray=[];
    while (returnArray.length<targetArr.length){
      var shouldAdd=true;
      var lastInstance=targetArr[Math.floor(Math.random()*targetArr.length)];
      if (returnArray.length===0){returnArray.push(lastInstance);}
      else {
        for (var s=0;s<returnArray.length;s++){
          if (lastInstance.question===returnArray[s].question){
            shouldAdd=false;
          }
        }
        if (shouldAdd===true){
          returnArray.push(lastInstance);
        }
      }
    }
    return returnArray.slice(0,desiredLength);
  }
  factory.finalObject=[];
  factory.questionNumberS=0;
  factory.sortCategories=function(arr,chosenLength){
    factory.questionNumberS=0;
    quizObjectJSON=[];
    factory.finalObject=[];
    for (var i=0;i<arr.length;i++){
      if (arr[i]==='all'){
        quizObjectJSON=quizObjectRaw;
        break;
      }
      else{
        for (var v=0;v<quizObjectRaw.length;v++){
          if (quizObjectRaw[v].category===arr[i]){
            quizObjectJSON.push(quizObjectRaw[v]);
          }
          else {continue;}
        }
      }
    }
    factory.finalObject=randomizeArray(quizObjectJSON,chosenLength);
    factory.answeredQuiz=[];
    factory.answeredQuiz=factory.finalObject;
  }
  return factory;
}).factory("Stats",function(){
  if (!factory){
    var factory={};
  }
  factory.numPerfectQuiz=0;
  factory.currentQuizPercentage=function(score,total){
    return ((score/total)*100);
  }
  if (!factory.allPercentages){
    factory.allPercentages=[];
    factory.allScores=[];
    factory.allTotals=[];
    factory.allRightTimes=[];
    factory.allWrongTimes=[];
  }
  factory.determineAverageAttempted=function(){
    var totes=0;
    var nums=factory.allTotals.length;
    for (i=0;i<factory.allTotals.length;i++){
      totes+=factory.allTotals[i];
    }
    return (totes/nums);
  }
  factory.determineAverageCompleted=function(){
    var totes=0;
    var nums=factory.allScores.length;
    for (i=0;i<factory.allScores.length;i++){
      totes+=factory.allScores[i];
    }
    return (totes/nums);
  }
  factory.determineAverageRate=function(){
    var scores=0;
    var totes=0;
    for (i=0;i<factory.allScores.length;i++){
      scores+=factory.allScores[i];
      totes+=factory.allTotals[i];
    }
    var percent=(scores/totes)*100;
    return percent;
  }
  // factory.allScores=$localstorage.getObject('allScores');
  // factory.allTotals=$localstorage.getObject('allTotals');
  factory.recordCurrentQuizPercentage=function(score,total){
    factory.allPercentages.push(factory.currentQuizPercentage(score,total));
  }
  factory.determineByQuestionPercentage=function(){
    var scoreSum=0;
    var totalSum=0;
    for (var n=0;n<factory.allScores.length;n++){
      scoreSum+=factory.allScores[n];
      totalSum+=factory.allTotals[n];
    }
    var overallPer=(scoreSum/totalSum)*100;
    return [overallPer,totalSum];
  }
  factory.determineByQuizPercentage=function(){
    var percentSum=0;
    var numberOfQuizzes=factory.allPercentages.length;
    for (var l=0;l<numberOfQuizzes;l++){
      percentSum+=factory.allPercentages[l];
    }
    var overallPer=percentSum/numberOfQuizzes;
    return [overallPer,numberOfQuizzes]
  }
  factory.currentCategoryNum=0;
  factory.scoresByCategory=[{"category":"all","individualScores":[],"correctlyAnswered":0,"wronglyAnswered":0,"unanswered":0,"percentage":0},
  {"category":"general","individualScores":[],"correctlyAnswered":0,"wronglyAnswered":0,"unanswered":0,"percentage":0},
  {"category":"science","individualScores":[],"correctlyAnswered":0,"wronglyAnswered":0,"unanswered":0,"percentage":0},
  {"category":"world","individualScores":[],"correctlyAnswered":0,"wronglyAnswered":0,"unanswered":0,"percentage":0},
  {"category":"history","individualScores":[],"correctlyAnswered":0,"wronglyAnswered":0,"unanswered":0,"percentage":0},
  {"category":"entertainment","individualScores":[],"correctlyAnswered":0,"wronglyAnswered":0,"unanswered":0,"percentage":0}];
  factory.determineIndividualPercents=function(){
    for (var s=0;s<factory.scoresByCategory.length;s++){
      factory.scoresByCategory[s].percentage=((100*factory.scoresByCategory[s].correctlyAnswered)/(factory.scoresByCategory[s].wronglyAnswered+factory.scoresByCategory[s].unanswered+factory.scoresByCategory[s].correctlyAnswered));
    }
  }
  factory.determineCategoryStats=function(category){
    var totalAnswered=0;
    var correctAnswered=0;
    var wrongAnswered=0;
    var unAnswered=0;
    for (n=0;n<factory.scoresByCategory.length;n++){
      if (factory.scoresByCategory[n].category===category){
        totalAnswered=factory.scoresByCategory[n].correctlyAnswered+factory.scoresByCategory[n].wronglyAnswered+factory.scoresByCategory[n].unanswered;
        wrongAnswered=factory.scoresByCategory[n].wronglyAnswered;
        correctAnswered=factory.scoresByCategory[n].correctlyAnswered;
        unAnswered=factory.scoresByCategory[n].unanswered;
        break;
      }
      else {continue;}
    }
    var categoryPercent=((correctAnswered)/totalAnswered)*100;
    return [
      {"name":"Total number of questions attempted","val":totalAnswered},
      {"name":"Correct answers","val":correctAnswered},
      {"name":"Wrong answers","val":wrongAnswered},
      {"name":"Not answered","val":unAnswered},
      {"name":"Percentage score","val":categoryPercent}
    ];
  }
  factory.determineBestCategory=function(){
    var best='';
    var highestPer=0;
    for (var l=0;l<factory.scoresByCategory.length;l++){
      if (factory.scoresByCategory[l].percentage>highestPer){
        best=factory.scoresByCategory[l].category;
        highestPer=factory.scoresByCategory[l].percentage;
      }
    }
    return [best,highestPer];
  }
  factory.determineWorstCategory=function(){
    var worst='';
    var lowestPer=100;
    for (var l=0;l<factory.scoresByCategory.length;l++){
      if (factory.scoresByCategory[l].percentage<lowestPer){
        worst=factory.scoresByCategory[l].category;
        lowestPer=factory.scoresByCategory[l].percentage;
      }
    }
    return [worst,lowestPer];
  }
  factory.determineLongestStreak=function(){
    var longestStreak=0;
    for (i=0;i<factory.allScores.length;i++){
      if (factory.allScores[i]>longestStreak){
        longestStreak=factory.allScores[i];
      }
    }
    return longestStreak;
  }
  factory.determineAveRightTime=function(){
    var totalTime=0;
    var numTime=factory.allRightTimes.length;
    for (i=0;i<factory.allRightTimes.length;i++){
      totalTime+=factory.allRightTimes[i];
    }
    var aveRightTime=(totalTime/numTime);
    return aveRightTime;
  }
  factory.determineAveWrongTime=function(){
    var totalTime=0;
    var numTime=factory.allWrongTimes.length;
    for (i=0;i<factory.allWrongTimes.length;i++){
      totalTime+=factory.allWrongTimes[i];
    }
    var aveWrongTime=(totalTime/numTime);
    return aveWrongTime;
  }
  return factory;

}).directive('questionDiv',function(){
  return{
    restrict:'E',
    replace:false,
    //scope:{questionNumber:'='},
    templateUrl:'templates/questionDivTmpl.html',
  }
}).controller('stateChange',['$scope','$state',function($scope,$state){
  $scope.setPage=function(page){
    $state.transitionTo(page)
  }
}]).controller('NavCtrl', function($scope, $ionicSideMenuDelegate) {
  $scope.showMenu = function () {
    $ionicSideMenuDelegate.toggleLeft();
  }
}).controller("StartController",['$scope','$state','Data','$ionicModal','$rootScope',function($scope,$state,Data,$ionicModal,$rootScope){
  $scope.finalCategors=[{"category":"general","chosen":false},{"category":"science","chosen":false},{"category":"world","chosen":false},{"category":"history","chosen":false},{"category":"entertainment","chosen":false}];
  $scope.thisIsIt=[];
  $scope.thisIsSelected;
  $scope.modalCancel=0;
  $scope.highestAllowed=Data.quizObjectRaw.length;
  $scope.goInstructions=function(){
    $state.go('instructions');
  }
  // $scope.whichCategory=function(){
  //   for (var s=0;s<$scope.finalCategors.length;s++){
  //     if (!$scope.finalCategors[s].chosen) {continue;}
  //     else {$scope.thisIsIt.push($scope.finalCategors[s].category);}
  //   }
  // }

  $scope.setPage=function(page){
    $state.transitionTo(page);
  }

  $scope.chosenLength={};
  $scope.customCategories=[];
  $scope.isCustomCategory=false;
  $scope.showCategors=false;
  $scope.selectText="Choose desired categories (optional)";

  $scope.convertThem=function(){
    if ($scope.showCategors===true){
      $scope.showCategors=false;
      $scope.selectText="Choose desired categories (optional)";
    }
    else{
      $scope.showCategors=true;
      $scope.selectText="Hide category options";
    }
  }

  $scope.lengthPopover;

  $ionicModal.fromTemplateUrl('templates/quizLengthPopover.html', {
    scope: $scope,
    animation:'slide-in-up'
  }).then(function(modal) {
    $scope.lengthPopover = modal;
  });

  $rootScope.$on("$stateChangeStart",
      function(){
        $ionicModal.fromTemplateUrl('templates/quizLengthPopover.html', {
          scope: $scope,
          animation: 'slide-in-up'
        }).then(function(modal) {
          $scope.lengthPopover = modal;
        });
  });

  $scope.$watch(function(scope){return scope.modalCancel},
    function(){
      $ionicModal.fromTemplateUrl('templates/quizLengthPopover.html', {
        scope: $scope,
        animation: 'slide-in-up'
      }).then(function(modal) {
        $scope.lengthPopover = modal;
      });
      // Data.customCategories=[];
      $scope.isCustomCategory=false;
    })

  $scope.cancelModal=function(){
    $scope.lengthPopover.hide();
    $scope.lengthPopover.remove();
    $scope.modalCancel++;
  }

  $scope.selectedCategories=function($index){
    if ($scope.finalCategors[$index].chosen){
      $scope.customCategories.push($scope.finalCategors[$index].category);
    }
    else if ($scope.finalCategors[$index].chosen===false){
      // var thisUn=$scope.finalCategors[$index].category;
      for (i=0;i<$scope.customCategories.length;i++){
        if ($scope.customCategories[i]===$scope.finalCategors[$index].category){
          $scope.customCategories.splice($scope.customCategories.indexOf($scope.finalCategors[$index].category),1);
        }
      }
    }
    console.log($scope.customCategories);
  }

  $scope.populateCategories=function(){
    if ($scope.customCategories.length<=0){
      $scope.thisIsIt=["all"]
    }
    else {
      $scope.thisIsIt=$scope.customCategories;
    }
    return $scope.thisIsIt;
  }

  $scope.killPopover=function(){
    $scope.chosenLength.chosen=10;
    console.log(Data.chosenLength.chosen);
    if ($scope.chosenLength.chosen>=1 && $scope.chosenLength.chosen<=37){
      Data.chosenLength.chosen=$scope.chosenLength.chosen;
      $scope.lengthPopover.hide();
      $scope.lengthPopover.remove();
      Data.sortCategories($scope.populateCategories(),Data.chosenLength.chosen);
      $state.transitionTo('quiz');
    }
    else {
      alert("You must choose an option between 0 and 37");
      Data.chosenLength.chosen=null;
    }
  }

  $scope.openPopover=function($event){
    $scope.thisIsIt=[];
    $scope.chosenLength.chosen=10;
    console.log(Data.chosenLength.chosen);
    if ($scope.chosenLength.chosen>=1 && $scope.chosenLength.chosen<=37){
      Data.chosenLength.chosen=$scope.chosenLength.chosen;
      $scope.lengthPopover.hide();
      $scope.lengthPopover.remove();
      Data.sortCategories($scope.populateCategories(),Data.chosenLength.chosen);
      $state.transitionTo('quiz');
    }
    else {
      alert("You must choose an option between 0 and 37");
      Data.chosenLength.chosen=null;
    }
    // $scope.whichCategory();
    // Data.sortCategories(["all"],Data.chosenLength.chosen);
    // $scope.lengthPopover.show($event);
    //$state.transitionTo('quiz');
  }
}]).controller('QuizController',['$scope','Data','$state','$rootScope','$ionicPopup','Stats','$interval',"$timeout","$cordovaVibration",function($scope,Data,$state,$rootScope,$ionicPopup,Stats,$interval, $timeout,$cordovaVibration){
  $scope.moneyOptions=Data.moneyOptions;
  $scope.timeLimit;
  $scope.timeOut=function(){
    if ($scope.isQuizActive===true){
      $scope.timeLimit=$timeout(
        function(){
          $scope.nextButtonOnclick();
        },
        20000
      );
    }
    else {$timeout.cancel($scope.timeLimit);}
  }
  $scope.restartTimeout=function(){
    $timeout.cancel($scope.timeLimit);
    $scope.timeLimit=undefined;
    $scope.timeOut();
  }
  $scope.timer=0;
  var timerInterval;
  $scope.runTimer=function(){
    $scope.timer=0;
    timerInterval=$interval(
      function(){
        $scope.timer+=1;
      },
      1000,
      20
    );
  };
  $scope.restartTimer=function(){
    $interval.cancel(timerInterval);
    timerInterval=undefined;
    $scope.runTimer();
  }
  $scope.noCategory=false;
  if (Data.finalObject.length===0){$scope.noCategory=true;}
  $scope.restartQuiz=function(){
    $scope.questionNumber=Data.questionNumberS;
    $scope.displayNumber=Data.questionNumberS;
    $scope.progress=0-(0-$scope.quizObjectJSON.length);
    $scope.isQuizActive=true;
    $scope.scoreQuizNow=false;
    $scope.quizIsDone=false;
    $scope.finalScore=0;
    $scope.anyWrong=false;
    $scope.anyMissed=false;
    $scope.perfectQuiz=false;
    $scope.wrongAnswers=[];
    $scope.notAnswereds=[];
    Stats.currentFinalScore=0;
    Stats.currentNumQuestions=0;
    $scope.restartTimer();
    $scope.restartTimeout();
  }
  $scope.setNewTopic=function(){
      $scope.answeredQuiz=Data.finalObject;
      $scope.quizObjectJSON=Data.finalObject;
      $scope.restartQuiz();
  }
  $scope.setNewTopic();
  // $scope.$watch(function(Data){return Data.finalObject},
  //   function(){
  //     for (var l=0;l<$scope.answeredQuiz.length;l++){
  //       $scope.answeredQuiz[l].userAnswer=null;
  //     }
  //     $scope.restartQuiz();
  // });
  $rootScope.$on("$stateChangeStart",
      function(){
        for (var l=0;l<$scope.answeredQuiz.length;l++){
          $scope.answeredQuiz[l].userAnswer=null;
        }
        // $scope.setNewTopic();
  });

  $scope.goToStatistics=function(){
    $state.go('statistics')
  }

  $scope.goHome=function(){
    $state.go('choose');
  }

  $scope.showConfirm = function() {
     var confirmPopup = $ionicPopup.confirm({
       title: 'Skip question?',
       template: 'Are you sure you want to continue without choosing an answer?'
     });
     confirmPopup.then(function(res) {
       if(res) {
         $scope.questionNumber++; goOn=true;
       }
       else {
       }
     });
   };

   $scope.optionClick=false;
   $scope.optionOnclick=function(){
     $scope.optionClick=true;
   }
  //  $scope.wrongVibration=function(){
  //    if (ionic.Platform.isAndroid()){
  //      $cordovaVibration.vibrate([70,70]);
  //    }
  //    else {
  //      $cordovaVibration.vibrate(140);
  //    }
  //  }
  //  var rotation =0;
  $scope.ifWrong=function(){
    // $scope.isQuizActive=false;
    // $scope.scoreQuizNow=true;
    // $cordovaVibration.vibrate(140);
    if (Data.answeredQuiz[Data.answeredQuiz.length-1].userAnswer===Data.answeredQuiz[Data.answeredQuiz.length-1].correctAnswer){
      $scope.displayNumber+=1;
      $scope.questionNumber++;
    }
    else if (Data.answeredQuiz[Data.answeredQuiz.length-1].userAnswer!=Data.answeredQuiz[Data.answeredQuiz.length-1].correctAnswer  && Data.answeredQuiz[Data.answeredQuiz.length-1].userAnswer!=null|undefined){
      Stats.allWrongTimes.push($scope.timer);
    }
    else if (Data.answeredQuiz[$scope.questionNumber].userAnswer===null|undefined){
      $scope.notAnswereds.push(Data.answeredQuiz[$scope.questionNumber]);
      $scope.anyMissed=true;
      $scope.anyWrong=true;
      for (var l=0;l<Stats.scoresByCategory.length;l++){
        if (Data.answeredQuiz[$scope.questionNumber].category===Stats.scoresByCategory[l].category){
          Stats.scoresByCategory[l].unanswered+=1;

        }
        else {continue;}
      }
    }
    for (var i=0;i<Data.answeredQuiz.length;i++){
      if (Data.answeredQuiz[i].userAnswer===Data.answeredQuiz[i].correctAnswer){
        $scope.finalScore+=1;
        for (var l=0;l<Stats.scoresByCategory.length;l++){
          if (Data.answeredQuiz[i].category===Stats.scoresByCategory[l].category){
            Stats.scoresByCategory[l].correctlyAnswered+=1;
          }
          else {continue;}
        }
      }
      else if (Data.answeredQuiz[i].userAnswer!=Data.answeredQuiz[i].correctAnswer && Data.answeredQuiz[i].userAnswer!=null|undefined){
        $scope.wrongAnswers.push(Data.answeredQuiz[i]);
        $scope.anyWrong=true;
        for (var l=0;l<Stats.scoresByCategory.length;l++){
          if (Data.answeredQuiz[i].category===Stats.scoresByCategory[l].category){
            Stats.scoresByCategory[l].wronglyAnswered+=1;
          }
          else {continue;}
        }
      }
      else {continue;}
      // else {
      //   $scope.notAnswereds.push(Data.answeredQuiz[i]);
      //   $scope.anyMissed=true;
      //   $scope.anyWrong=true;
      //   for (var l=0;l<Stats.scoresByCategory.length;l++){
      //     if (Data.answeredQuiz[i].category===Stats.scoresByCategory[l].category){
      //       Stats.scoresByCategory[l].unanswered+=1;
      //
      //     }
      //     else {continue;}
      //   }
      //   break;
      // }
    }
    Stats.recordCurrentQuizPercentage($scope.finalScore,Data.answeredQuiz.length);
    Stats.allScores.push($scope.finalScore);
    Stats.allTotals.push(Data.answeredQuiz.length);
    Stats.determineIndividualPercents();
    for (var j=0;j<Stats.scoresByCategory.length;j++){
      Stats.scoresByCategory[j].individualScores.push({"score":$scope.finalScore,"totalQuestions":$scope.wrongAnswers.length+$scope.notAnswereds.length})
    }
    // $scope.scoreQuizNow=true;
    // $scope.isQuizDone=true;
    if ($scope.finalScore===Data.answeredQuiz.length){
      $scope.perfectQuiz=true;
      Stats.numPerfectQuiz++;
    }
  }
  $scope.moveOn=function(){
    var goOn=false;
    $scope.isQuizActive=true;
    if ($scope.questionNumber<$scope.quizObjectJSON.length-1) {
      if ($scope.answeredQuiz[$scope.questionNumber].userAnswer===Data.finalObject[$scope.questionNumber].correctAnswer){
        if (!$scope.answeredQuiz[$scope.questionNumber].userAnswer){
          if ($scope.answeredQuiz[$scope.questionNumber].userAnswer===0){
            $scope.questionNumber++;
            $scope.displayNumber++;
            goOn=true;
          }
          else {
            $scope.showConfirm();
          }
        }
        else {
          $scope.questionNumber++;
          $scope.displayNumber++;
          goOn=true;
        }
        Stats.allRightTimes.push($scope.timer);
        // $cordovaVibration.vibrate(70);
      }
      else {
        goOn=true;

        Stats.allWrongTimes.push($scope.timer);
        $scope.ifWrong();
      }
    }
    else if ($scope.questionNumber>=$scope.answeredQuiz.length-1){
      goOn=true;
      $scope.anyWrong=true;
      // $scope.questionNumber++;
      $scope.ifWrong();
    }
    console.log($scope.finalScore);
    $scope.$watch(function(scope){return scope.answeredQuiz},
      function(){Data.answeredQuiz=$scope.answeredQuiz});
    $scope.progress=0-($scope.questionNumber-$scope.quizObjectJSON.length);
    return goOn;
  }
  $scope.flipToBack=function(){
    // console.log('to back');
    angular.element(questionContainer).addClass('flip');
    angular.element(cardContent).removeClass('front');
    $scope.moveOn();
    angular.element(cardContent).addClass('back');
  }
  $scope.flipToFront=function(){
    // console.log('to front');
    angular.element(questionContainer).addClass('flip');
    angular.element(cardContent).removeClass('back');
    angular.element(cardContent).addClass('front');
    angular.element(questionContainer).removeClass('flip');
    $scope.moveOn();
  }
  $scope.doTheFlip=function(){
    if (angular.element(cardContent).hasClass('front')){
      return $scope.flipToBack();
      // $scope.flipToggle=true;
    }
    else {
      return $scope.flipToFront();
      // $scope.flipToggle=false;
      // angular.element(questionContainer).toggleClass('flip');
    }
  }

  $scope.nextButtonOnclick=function(){
    $scope.optionClick=false;
    $scope.doTheFlip();
    // if (ionic.Platform.isIOS() || ionic.Platform.isAndroid()){
    //   $cordovaVibration.vibrate(70);
    // }
    // console.log(ionic.Platform.device());
    $scope.restartTimer();
    $scope.restartTimeout();

  }
}]).controller('AcknowledgementsContr',function($scope,Data){
    $scope.thankYou=Data;
}).controller('StatisticsContr',['$scope','$rootScope','Stats',function($scope,$rootScope,Stats){
  $scope.startThisUp=function(){
    $scope.showOverall=false;
    $scope.showAverage=false;
    $scope.showCategory=false;
    $scope.listCategories=['general','science','world','history','entertainment'];
    $scope.allCategories=[
      {"category":"all","chosen":true},
      {"category":"general","chosen":false},
      {"category":"science","chosen":false},
      {"category":"world","chosen":false},
      {"category":"history","chosen":false},
      {"category":"entertainment","chosen":false},
    ];
    $scope.chosenCategory="";
    $scope.getCategoryStats=function(thisOne){
      $scope.statsList=Stats.determineCategoryStats(thisOne);
      console.log($scope.statsList);
    }
    // $scope.getCategoryStats(0);
    $scope.convertThem=function(thisOne){
      var whichOne;
      if (thisOne==="showOverall"){
        if ($scope.showOverall===true){
          $scope.showOverall=false;
        }
        else{
          $scope.showOverall=true;
        }
      }
      else if (thisOne==="showAverage"){
        if ($scope.showAverage===true){
          $scope.showAverage=false;
        }
        else{
          $scope.showAverage=true;
        }
      }
      else if (thisOne==="showCategory"){
        if ($scope.showCategory===true){
          $scope.showCategory=false;
        }
        else{
          $scope.showCategory=true;
        }
      }
    }
    $scope.byQuestionPercentages=Stats.determineByQuestionPercentage();
    $scope.byQuestionPercentage=$scope.byQuestionPercentages[0];
    $scope.byQuestionTotal=$scope.byQuestionPercentages[1];
    $scope.byQuizPercentages=Stats.determineByQuizPercentage();
    $scope.overallPercentage=$scope.byQuizPercentages[0];
    $scope.totalQuizzes=$scope.byQuizPercentages[1];
    $scope.bestCategoryInfo=Stats.determineBestCategory();
    $scope.bestCategory=$scope.bestCategoryInfo[0];
    $scope.bestCategoryPercent=$scope.bestCategoryInfo[1];
    $scope.worstCategoryInfo=Stats.determineWorstCategory();
    $scope.worstCategory=$scope.worstCategoryInfo[0];
    $scope.worstCategoryPercent=$scope.worstCategoryInfo[1];
    $scope.longestStreak=Stats.determineLongestStreak();
    $scope.numPerf=Stats.numPerfectQuiz;
    $scope.aveAttempted=Stats.determineAverageAttempted();
    $scope.aveCompleted=Stats.determineAverageCompleted();
    $scope.aveRate=Stats.determineAverageRate();
    $scope.aveRightTime=Stats.determineAveRightTime();
    $scope.aveWrongTime=Stats.determineAveWrongTime();
  }
  $scope.startThisUp();
  $rootScope.$on('$stateChangeStart',
    function(){
      $scope.startThisUp();
    });
}])