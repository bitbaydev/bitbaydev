(function ($) {
  'use strict';

  Drupal.form_placeholder = {};

  Drupal.form_placeholder.elementIsSupported = function ($element) {
    var supportedElement = $element.is('input[type=number], input[type=text], input[type=date], input[type=email], input[type=url], input[type=tel], input[type=password], textarea');
    var hasId = $element.attr('id');
    return supportedElement && hasId;
  };

  Drupal.form_placeholder.placeholderIsSupported = function () {
    // Opera Mini v7 doesn’t support placeholder although its DOM seems to
    // indicate so.
    var isOperaMini = Object.prototype.toString.call(window.operamini) == '[object OperaMini]';
    return 'placeholder' in document.createElement('input') && !isOperaMini;
  };

  Drupal.behaviors.form_placeholder = {
    attach: function (context, settings) {
      // In some cases settings after ajax form submit could contain only
      // settings from response but not all Drupal.settings data.
      if (!settings.hasOwnProperty('form_placeholder')) {
        settings = Drupal.settings;
      }
      var include = settings.form_placeholder.include;
      if (include) {
        include += ', ';
      }
      include += '.form-placeholder-include-children *';
      include += ', .form-placeholder-include';
      var exclude = settings.form_placeholder.exclude;
      if (exclude) {
        exclude += ', ';
      }
      exclude += '.form-placeholder-exclude-children *';
      exclude += ', .form-placeholder-exclude';

      var required_indicator = settings.form_placeholder.required_indicator;

      $(include, context).not(exclude).each(function () {
        var $textfield = $(this);
        var elementSupported = Drupal.form_placeholder.elementIsSupported($textfield);
        var placeholderSupported = Drupal.form_placeholder.placeholderIsSupported() || $().placeholder;

        // Placeholder is supported.
        if (elementSupported && placeholderSupported) {
          var $form = $textfield.closest('form');
          var $label = $form.find('label[for=' + this.id + ']');
          var placeholder = $.trim($label.text());

          // Handle required field marker.
          if ($label.hasClass('form-required')) {
            switch (required_indicator) {
              case 'append':
                $textfield.after('<span class="form-required"></span>');
                break;
              case 'remove':
                // It's removed anyway, so we don't have to do anything.
                break;
              case 'leave':
                placeholder += ' *';
                break;
              case 'text':
                placeholder += ' (' + Drupal.t('required') + ')';
                break;
            }
          }
          else if (required_indicator === 'optional') {
            placeholder += ' (' + Drupal.t('optional') + ')';
          }

          if (!$textfield.attr('placeholder')) {
            $textfield.attr('placeholder', placeholder);
            $label.addClass('visually-hidden');
          }

          // Fallback support for older browsers.
          if (!Drupal.form_placeholder.placeholderIsSupported() && $().placeholder) {
            $textfield.placeholder();
          }
        }
      });
    }
  };

})(jQuery);
