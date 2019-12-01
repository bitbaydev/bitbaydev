(function($){
  console.log(drupalSettings.bitbay_buy.buy_form.variable); 

  $("#edit-currency").change(function () {
    if (window.location.href.indexOf("?") < 0) {
      window.location.href = window.location.href + "?currency="+ this.value;
    }
    else{
      window.location.href = replaceUrlParam(window.location.href, "currency", this.value)
    } 
  });


  function replaceUrlParam(url, paramName, paramValue){
    var pattern = new RegExp('\\b(' + paramName + '=).*?(&|$)')
    if (url.search(pattern) >= 0){
      return url.replace(pattern, '$1' + paramValue + '$2');
    }
    return url + (url.indexOf('?') > 0 ? '&' : '?') + paramName + '=' + paramValue
  }  
})(jQuery);
