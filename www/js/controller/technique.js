angular.module('droem')
.controller('TechniqueCtrl', function($scope) {
  $scope.techniques = [
    {icon: 'ion-ios-alarm-outline',type: 'wbtb', name: 'WBTB', text: "Ein sanfter Wecker mit Meeresrauschen."},
    {icon: 'ion-clock', type: 'rythm', name: 'Rythm Napping', text: "Schlaf mit Interval Tönen."},
    {icon: 'ion-lightbulb', type: 'remulator', name: 'REMulator', text: "REMEE Emulator."},
    {icon: 'ion-android-hand', type: 'fild', name: 'FILD / HILD', text: "Tappe auf dein Handy um in den Traum zu gleiten."},
    {icon: 'ion-ios-checkmark-outline', type: 'reality', name: 'Reality Checks', text: "Checke deine Realität stundenweise."},
    {icon: 'ion-ios-body', type: 'wild', name: '61 WILD', text: "Ein Unterstützer für das 61 Punkte Programm."},
    {icon: 'ion-ios-person', type: 'meditation', name: 'Meditation', text: "Tägliches meditieren steigert das wohlbefinden und die luzidität."}
  ];
});
