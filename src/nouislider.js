'use strict';

var angular = require('angular'),
    noUiSlider = require('nouislider'),
    dependencies = [];

var directive = function () {
    return {
        restrict: 'A',
        scope: {
            start: '@',
            step: '@',
            end: '@',
            margin: '@',
            ngModel: '=',
            ngFrom: '=',
            ngTo: '=',
            tooltips: '='
        },
        link: function (scope, element) {
            var slider = element[0];

            if (scope.ngFrom !== undefined && scope.ngTo !== undefined) {
                noUiSlider.create(slider, {
                    start: [
                        scope.ngFrom !== null ? scope.ngFrom : scope.start,
                        scope.ngTo !== null ? scope.ngTo : scope.end
                    ],
                    step: parseFloat(scope.step || 1),
                    connect: true,
                    margin: parseFloat(scope.margin || 0),
                    range: {
                        min: [parseFloat(scope.start)],
                        max: [parseFloat(scope.end)]
                    },
                    tooltips: scope.tooltips || false
                });
                slider.noUiSlider.on('slide', function (values) {
                    scope.$apply(function () {
                        scope.ngFrom = parseFloat(values[0]);
                        scope.ngTo = parseFloat(values[1]);
                    });
                });
                scope.$watch('ngFrom', function (newVal) {
                    slider.noUiSlider.set([newVal, null]);
                });
                scope.$watch('ngTo', function (newVal) {
                    slider.noUiSlider.set([null, newVal]);
                });
            } else {
                noUiSlider.create(slider, {
                    start: [scope.ngModel !== undefined && scope.ngModel !== null ? scope.ngModel : scope.start],
                    step: parseFloat(scope.step || 1),
                    range: {
                        min: [parseFloat(scope.start)],
                        max: [parseFloat(scope.end)]
                    },
                    tooltips: scope.tooltips || false
                });
                slider.noUiSlider.on('slide', function (values, handle) {
                    scope.$apply(function () {
                        scope.ngModel = parseFloat(values[handle]);
                    });
                });
                scope.$watch('ngModel', function (newVal) {
                    slider.noUiSlider.set(newVal);
                });
            }
        }
    };
};

angular
    .module('nouislider', dependencies)
    .directive('slider', directive);

module.exports = 'nouislider';
