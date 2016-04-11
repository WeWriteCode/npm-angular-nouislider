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
            ngTo: '='
        },
        link: function (scope, element) {
            var slider = element[0];

            if (scope.ngFrom && scope.ngTo) {
                noUiSlider.create(slider, {
                    start: [
                        scope.ngFrom || scope.start,
                        scope.ngTo || scope.end
                    ],
                    step: parseInt(scope.step || 1),
                    connect: true,
                    margin: parseInt(scope.margin || 0),
                    range: {
                        min: [parseInt(scope.start)],
                        max: [parseInt(scope.end)]
                    }
                });
                slider.noUiSlider.on('slide', function (values) {
                    scope.$apply(function () {
                        scope.ngFrom = parseInt(values[0]);
                        scope.ngTo = parseInt(values[1]);
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
                    start: [scope.ngModel || scope.start],
                    step: parseInt(scope.step || 1),
                    range: {
                        min: [parseInt(scope.start)],
                        max: [parseInt(scope.end)]
                    }
                });
                slider.noUiSlider.on('slide', function (values, handle) {
                    scope.$apply(function () {
                        scope.ngModel = parseInt(values[handle]);
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
