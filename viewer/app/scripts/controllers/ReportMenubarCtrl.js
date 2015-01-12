"use strict";

app.controller('ReportMenubarCtrl', ['$routeParams', '$scope', function ($routeParams, $scope) {
    //Save reference to controller in order to avoid reference soup
    var ReportMenubar = this;


    ReportMenubar.route = $routeParams.id;
    if(angular.isDefinedOrNotNull(ReportMenubar.route)){
        ReportMenubar.currentReport = $scope.$parent.Rapport.currentReport;
    }


    // Create wrapper for the exportPanel controllers
    this.exportPanel = { activeTab: 'share' };

    // Helper-method to change currently open tab
    this.exportPanel.openTab = angular.bind(this.exportPanel, function (tab) {
        this.activeTab = tab;
    });

    // Helper-method to determine if a tab is currently active
    this.exportPanel.isTabActive = angular.bind(this.exportPanel, function (tab) {
        return this.activeTab === tab;
    });

    // Helper-method to determine whether a tab is available
    this.exportPanel.isTabAvailable = angular.bind(this.exportPanel, function (tab) {
        switch (tab) {
            case 'share': return true; break;
            case 'csv': return true; break;
            default: return true; break;
        }
    });

}]);
