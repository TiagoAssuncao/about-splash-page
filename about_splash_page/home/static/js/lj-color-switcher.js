$(document).ready(function (){
  'use strict';

  // CREATING EMPTY VARIABLES
  var arr = '';
  var data = '';
  var elements = '';

  // FOR EACH 'MODULE' INSTANCE CREATE LIST ELEMENT
  $('.module').each(function(){
    data = $(this).attr('class');
    arr = data.split(' ');
    if(arr[0] != 'module')
      elements += '<li><a class="select-module module-on" href="' + arr[0] + '">' + arr[0].replace(/\-/g, ' ') + '</a></li>';
  });

  // INSERT SWITCHER INTO BODY
  var $code = '<div class="panel">\
    <div class="panel-options">\
      <p>Choose color scheme</p>\
      <ul class="color-picker clearfix">\
        <li><a class="color-1" href="#"></a></li>\
        <li><a class="color-2" href="#"></a></li>\
        <li><a class="color-3" href="#"></a></li>\
        <li><a class="color-4" href="#"></a></li>\
      </ul>\
      <ul class="color-picker color-picker-last clearfix">\
        <li><a class="color-5" href="#"></a></li>\
        <li><a class="color-6" href="#"></a></li>\
        <li><a class="color-7 selected-color" href="#"></a></li>\
        <li><a class="color-8" href="#"></a></li>\
      </ul>\
      <p>Show or hide modules</p>\
      <ul class="select-modules clearfix">'
      + elements + 
      '</ul>\
      <p>Check other demos</p>\
      <ul class="demo-list fa-ul">\
        <li><i class="fa-li fa fa-angle-right"></i><a href="../demo-1/index.html">Single image</a></li>\
        <li><i class="fa-li fa fa-angle-right"></i><a href="../demo-2/index.html">Image slideshow</a></li>\
        <li><i class="fa-li fa fa-angle-right"></i><a href="../demo-3/index.html">YouTube video</a></li>\
        <li><i class="fa-li fa fa-angle-right"></i><a href="../demo-4/index.html">Gradient overlay</a></li>\
      </ul>\
    </div>\
    <div class="panel-toggle left">\
      <i class="fa fa-cog"></i>\
    </div>\
  </div>';
  
  $('header').before($code);

  // CALCULATE COLOR IN HEXADECIMAL
  function hexc(colorval) {
    var color = '';

    var parts = colorval.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
    delete(parts[0]);
    for (var i = 1; i <= 3; ++i) {
        parts[i] = parseInt(parts[i]).toString(16);
        if (parts[i].length == 1) parts[i] = '0' + parts[i];
    }
    return color = '#' + parts.join('');
  }

  // CHANGE COLOR OF TEMPLATE ELEMENTS
  function toggleColor(colorHEX){
    $('style').remove();

    var style = '<style>\
    .lj-icon-box span,\
    .lj-quote span,\
    address i,\
    .lj-icon-box > a:hover,\
    .lj-twitter-feed a,\
    .lj-twitter-date a,\
    .yt-controls a:hover {\
      color: ' + colorHEX + ';\
    }\
    .lj-scroll-down a:hover,\
    .lj-subscribe-form input[type=submit],\
    .lj-footer-right input[type=submit] {\
      background-color: ' + colorHEX + ';\
      border: 1px solid ' + colorHEX + ';\
    }\
    .lj-footer-socials li a:hover {\
      background-color: ' + colorHEX + ';\
    </style>';
    
    $('head').append(style);
  }

  $('.color-picker a').click(function(event){
    event.preventDefault();
    $('.color-picker a').removeClass('selected-color');
    $(this).addClass('selected-color');
    var selectedColor = hexc($(this).css('background-color'));
    toggleColor(selectedColor);
  });

  var defaultColor = hexc($('.selected-color').css('background-color'));
  toggleColor(defaultColor);

// HIDE PANEL AFTER 2 SECONDS
  $('.panel').delay(2000).animate({left: '-230px'}, 250);

// PANEL TOGGLE
  $('.panel-toggle').click(function(){
    var $panel = $('.panel');
    var left = -230;
    if( parseInt($panel.css('left')) == left)
      $panel.animate({left: '0px'}, 250);
    else if( parseInt($panel.css('left')) == 0)
      $panel.animate({left: '-230'}, 250);
  });

// TOGGLE MODULES
  $(".select-module").click(function(event) {
    event.preventDefault();

    // toggle pestka on/off
    $(this).toggleClass('module-on module-off');

    // hide/show module
    var module = $(this).attr('href');
    $('.' + module).toggleClass('module module-hidden');

    //refresh stellar plugin
    $.stellar('refresh');
  });

});

$(window).resize(function() {
    $.stellar('refresh');
});