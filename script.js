// This script is part of the blog post "How to Make an Embedded Pen Resizeable"
// Source: https://blog.codepen.io/2017/05/01/make-embedded-pen-resizeable/
// This is the callback from CodePen's embed script, ei.js
function __CodePenIFrameAddedToPage() {
  makeEmbedsResizeable();
}

function makeEmbedsResizeable() {
  // You don't have to set min and max, but it's kinda useful so that users don't drag them to a weird/bad size.
  var maxWidth = 1000; // calculated below
  var minWidth = 320;
  var minHeight = 150;

  $(".cp_embed_wrapper").each(function () {
    var $wrapper = $(this);
    var $iframe = $wrapper.find("iframe");
    $wrapper.append("<div class='win-size-grip'></div>");
    var originalHeight = $iframe.outerHeight();
    $wrapper.css("height", originalHeight);
    // Can't set this in CSS, otherwise height measurement will be wrong
    $iframe.css("height", "100%");
    $wrapper.resizable({
      handleSelector: "> .win-size-grip",
      onDragStart: function (e, $el, opt) {
        $el.addClass("dragging");
        maxWidth = window.outerWidth;
      },
      onDragEnd: function (e, $el, opt) {
        $el.removeClass("dragging");
      },
      onDrag: function (e, $el, newWidth, newHeight, opt) {
        if (newWidth > maxWidth) {
          newWidth = maxWidth;
        }
        if (newWidth < minWidth) {
          newWidth = minWidth;
        }
        if (newHeight < minHeight) {
          newHeight = minHeight;
        }
        $el.width(newWidth);
        $el.height(newHeight);
        return false;
      },
    });
  });
}
