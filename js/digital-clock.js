$.fn.digitalClock = function(options) {
  let that = this;

  that.options = $.extend(
    {
      context: {
        width: $(that).css("width").replace("px", ""),
        height: $(that).css("height").replace("px", "")
      }
    },
    options
  );

  //   $(that).css({
  //     height: that.options.context.height,
  //     width: that.options.context.width
  //   });

  that.context = $(that).get(0).getContext("2d");
  //   that.context.strokeStyle = "#34495e";
  //   that.context.lineWidth=0.2;
  that.context.strokeRect(
    0,
    0,
    that.options.context.width,
    that.options.context.height
  );
  ///-----------
  that.context.moveTo(0, 20);
  that.context.lineTo(that.options.context.width, 20);

  that.context.moveTo(0, that.options.context.height / 2);
  that.context.lineTo(
    that.options.context.width,
    that.options.context.height / 2
  );

  that.context.moveTo(0, that.options.context.height - 20);
  that.context.lineTo(
    that.options.context.width,
    that.options.context.height - 20
  );
  ///-----------
  that.context.moveTo(20, 0);
  that.context.lineTo(20, that.options.context.height);

  that.context.moveTo(100, 0);
  that.context.lineTo(100, that.options.context.height);

  that.context.moveTo(120, 0);
  that.context.lineTo(120, that.options.context.height);

  that.context.moveTo(200, 0);
  that.context.lineTo(200, that.options.context.height);

  that.context.moveTo(220, 0);
  that.context.lineTo(220, that.options.context.height);

  that.context.moveTo(240, 0);
  that.context.lineTo(240, that.options.context.height);

  that.context.moveTo(260, 0);
  that.context.lineTo(260, that.options.context.height);

  that.context.moveTo(340, 0);
  that.context.lineTo(340, that.options.context.height);

  that.context.moveTo(360, 0);
  that.context.lineTo(360, that.options.context.height);

  that.context.moveTo(440, 0);
  that.context.lineTo(440, that.options.context.height);

  that.context.stroke();

  console.log(that.options.context.height / 2);
};

$.fn.digit = function(options) {
  let that = this;

  options = $.extend(
    {
      x: 0,
      y: 0,
      width: 120,
      ledWidth: 20
    },
    options
  );
  options.height = options.width * 1.3;

  if (!that.context) that.context = $(that).get(0).getContext("2d");
  else that.context.save();

  //   //for test
  //   that.context.strokeRect(options.x, options.y, options.width, options.height);
  var top = function() {
    that.context.rect(
      options.x + options.ledWidth,
      options.y,
      options.width - options.ledWidth * 2,
      options.ledWidth
    );
  };
  var middle = function() {
    that.context.rect(
      options.x + options.ledWidth,
      (options.height - options.ledWidth) / 2,
      options.width - options.ledWidth * 2,
      options.ledWidth
    );
  };
  var bottom = function() {
    that.context.rect(
      options.x + options.ledWidth,
      options.height - options.ledWidth,
      options.width - options.ledWidth * 2,
      options.ledWidth
    );
  };
  var left1 = function() {
    that.context.rect(
      options.x,
      options.y + options.ledWidth,
      options.ledWidth,
      (options.height - options.ledWidth * 3) / 2
    );
  };

  var left2 = function() {
    that.context.rect(
      options.x,
      options.y + (options.height + options.ledWidth) / 2,
      options.ledWidth,
      (options.height - options.ledWidth * 3) / 2
    );
  };

  var right1 = function() {
    that.context.rect(
      options.width - options.ledWidth,
      options.y + options.ledWidth,
      options.ledWidth,
      (options.height - options.ledWidth * 3) / 2
    );
  };

  var right2 = function() {
    that.context.rect(
      options.width - options.ledWidth,
      options.y + (options.height + options.ledWidth) / 2,
      options.ledWidth,
      (options.height - options.ledWidth * 3) / 2
    );
  };

  //   that.context.rect(options.width - options.ledWidth, options.ledWidth, options.ledWidth, options.height-options.ledWidth);
  //right
  //   that.context.rect(options.width - options.ledWidth, options.ledWidth, options.ledWidth, options.height-options.ledWidth);
  //   //bottom
  //   that.context.rect(options.x, options.height, options.width, options.y + options.ledWidth);
  //   //left
  //   that.context.rect(0, options.ledWidth, options.ledWidth, options.height-options.ledWidth);
  //   //middle
  //   that.context.rect(
  //     options.x+ options.ledWidth,
  //     options.height / 2,
  //     options.width - options.ledWidth,
  //     options.ledWidth
  //   );

  //   that.context.fill();

  that.val = function(value) {
    if (isNaN(value)) value = 0;
    that.context.clearRect(0, 0, 150, 195);
    options.x, options.y, options.width, options.height;
    that.context.beginPath();
    switch (value % 10) {
      case 0:
        top();
        left1();
        left2();
        bottom();
        right1();
        right2();
        break;
      case 1:
        right1();
        right2();
        break;
      case 2:
        top();
        right1();
        middle();

        left2();
        bottom();
        break;
      case 3:
        top();
        middle();
        bottom();
        right1();
        right2();
        break;
      case 4:
        left1();
        middle();
        right1();
        right2();
        break;
      case 5:
        top();
        left1();
        middle();
        bottom();
        right2();
        break;
      case 6:
        top();
        left2();
        middle();
        bottom();
        right1();
        right2();
        break;
      case 7:
        top();
        right1();
        right2();
        break;
      case 8:
        top();
        left1();
        left2();
        middle();
        bottom();
        right1();
        right2();
        break;
      case 9:
        top();
        left1();
        middle();
        bottom();
        right1();
        right2();
        break;

      default:
        break;
    }
    that.context.closePath();
    that.context.fill();
  };
  return that;
};
