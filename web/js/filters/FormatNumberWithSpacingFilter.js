angular.module('FormatNumberWithSpacingFilter', []).filter('FormatNumberWithSpacing', function() {
    return function(number) {
      return  number ? number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") : 0;
    };
  }
);