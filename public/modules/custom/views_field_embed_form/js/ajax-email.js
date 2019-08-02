(function ($, Drupal) {
  'use strict';

  Drupal.behaviors.ajax_email = {
    attach: function(context, settings) {
      $('.send-email-form', context).once('processed').each(function () {
        var text = $(this).closest(".vdt-item").find(".vdt-links-text").text(); 
        //get rid of empty lines       
        text = text.replace(/^\s*[\r\n]/gm, "");
        var send = $(this).find('input[name="send"]');
        $(send).val(text);        
      });      
    }
  };

}(jQuery, Drupal));