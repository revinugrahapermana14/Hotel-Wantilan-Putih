// Avoid `console` errors in browsers that lack a console.
(function() {
    var method;
    var noop = function () {};
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeline', 'timelineEnd', 'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }
}());

// Place any jQuery/helper plugins in here.

// Helper for smooth scrolling.
var gbks = gbks || {};
gbks.scroller = gbks.scroller || {};
gbks.scroller.scrollToPosition = function(position, canvas, options) {
  if(!canvas) {
    canvas = window;
  }

  var info = {
    startTime: new Date().getTime(),
    startValue: null,
    endValue: position,
    duration: 1500,
    lastUpdate: new Date().getTime(),
    canvas: canvas
  };

  if(options) {
    info = $.extend({}, info, options);
  }

  if(canvas == window) {
    info.startValue = canvas.pageYOffset;
  } else {
    info.startValue = canvas.scrollTop;
  }

  // Calculate duration based on distance.
  var duration = Math.abs(info.endValue - info.startValue);
  duration = Math.max(duration, 500);
  duration = Math.min(duration, 1500);
  info.duration = duration;
  
  $(window).unbind('mousewheel', gbks.scroller.mousewheelFunction);
  $(window).bind('mousewheel', gbks.scroller.mousewheelFunction);
  
  gbks.scroller.scrollInfo = info;

  clearTimeout(gbks.scroller.scrollInterval);
  gbks.scroller.scrollInterval = setTimeout($.proxy(gbks.scroller.onScrollInterval, gbks.scroller), 25);
};
  
gbks.scroller.onScrollInterval = function(event) {
  var info = gbks.scroller.scrollInfo;
  var delta = new Date().getTime() - info.startTime;
  delta = Math.min(delta, info.duration);
  var pos = gbks.scroller.easeInOutCubic(null, delta, info.startValue, info.endValue - info.startValue, info.duration);
  
  if(info.canvas == window) {
    info.canvas.scrollTo(0, pos);
  } else {
    info.canvas.scrollTop = pos;
  }
  
  if (Math.abs(delta) < info.duration) {
    var timePassed = new Date().getTime() - info.lastUpdate;
    var timer = Math.max(5, 25 - timePassed);
    
    clearTimeout(gbks.scroller.scrollInterval);
    gbks.scroller.scrollInterval = setTimeout($.proxy(gbks.scroller.onScrollInterval, gbks.scroller), timer);
  } else {
    $(window).unbind('mousewheel', gbks.scroller.mousewheelFunction);
  }
  
  info.lastUpdate = new Date().getTime();
};

gbks.scroller.onMouseWheel = function(event) {
  $(window).unbind('mousewheel', gbks.scroller.mousewheelFunction);
  clearInterval(gbks.scroller.scrollInterval);
};

gbks.scroller.easeInOutCubic = function (x, t, b, c, d) {
  if ((t/=d/2) < 1) return c/2*t*t*t + b;
  return c/2*((t-=2)*t*t + 2) + b;
};

gbks.scroller.mousewheelFunction = $.proxy(gbks.scroller.onMouseWheel, gbks.scroller);

gbks.tracker = gbks.tracker || {};
gbks.tracker.initialized = false;

/**
 * Track page events via Google Analytics
 *
 * category (required) - "Videos"
 * action (required) - "Play"
 * label (optional) - "Fall campaign"
 * value (optional) - 42
 */
gbks.tracker.trackEvent = function(category, action, label, value) {
  // console.log('gbks.tracker.trackEvent', category, action, label, value);
  if(window.ga) {
    if(!gbks.tracker.initialized) {
      gbks.tracker.initialized = true;
      ga('create', 'UA-81735626-1', 'auto');
    }

    var data = { hitType: 'event' };

    if(category) data.eventCategory = category;
    if(action) data.eventAction = action;
    if(label) data.eventLabel = label;
    if(value) data.eventValue = value;

    // console.log('gbks.tracker.trackEvent sending');

    ga('send', data);
  }
};

gbks.tracker.trackEventWithCallback = function(category, action, label, value, callback) {
  console.log('gbks.tracker.trackEvent', category, action, label, value, callback);
  
  if(ga) {
    if(!gbks.tracker.initialized) {
      gbks.tracker.initialized = true;
      ga('create', 'UA-81735626-1', 'auto');
    }

    var data = {
      hitCallback: callback
    };

    if(category) data.eventCategory = category;
    if(action) data.eventAction = action;
    if(label) data.eventLabel = label;
    if(value) data.eventValue = value;

    console.log('sending', data);

    ga('send', 'event', data);
  } else {
    console.log('gbks.tracker.trackEventWithCallback: Google Analytics is not available');
  }
};



/* 

Global event helper.

*/

var gbks = gbks || {};
gbks.events = gbks.events || {};
gbks.events.events = gbks.events.events || {};

// Available events to listent to
gbks.event = gbks.event || {};

gbks.event.Log = 'log';

// Drag and drop

gbks.event.DropImages = 'drop-images';
gbks.event.DropText = 'drop-text';
gbks.event.DropUrl = 'drop-url';
gbks.event.ClipboardImage = 'clipboard-image';
gbks.event.ClipboardText = 'clipboard-text';

// API events

gbks.event.LoadImages = 'load-images';
gbks.event.LoadImagesStart = 'load-images-start';
gbks.event.LoadImagesSuccess = 'load-images-success';
gbks.event.LoadImagesError = 'load-images-error';

gbks.event.LoadLightboxData = 'load-lightbox-data';
gbks.event.LoadLightboxDataStart = 'load-lightbox-data-start';
gbks.event.LoadLightboxDataSuccess = 'load-lightbox-data-success';
gbks.event.LoadLightboxDataError = 'load-lightbox-data-error';

gbks.event.ShowLightbox = 'lightbox-show';
gbks.event.UpdateLightbox = 'lightbox-update';
gbks.event.HideLightbox = 'lightbox-hide';

// Images

gbks.event.SaveImage = 'save-image';
gbks.event.SaveImageStart = 'save-image-start';
gbks.event.SaveImageSuccess = 'save-image-success';
gbks.event.SaveImageError = 'save-image-error';

gbks.event.UploadImage = 'upload-image';
gbks.event.UploadImageStart = 'upload-image-start';
gbks.event.UploadImageSuccess = 'upload-image-success';
gbks.event.UploadImageError = 'upload-image-error';

gbks.event.UnsaveImage = 'unsave-image';
gbks.event.UnsaveImageStart = 'unsave-image-start';
gbks.event.UnsaveImageSuccess = 'unsave-image-success';
gbks.event.UnsaveImageError = 'unsave-image-error';

gbks.event.SaveImageToGroup = 'save-image-to-group';
gbks.event.SaveImageToGroupStart = 'save-image-to-group-start';
gbks.event.SaveImageToGroupSuccess = 'save-image-to-group-success';
gbks.event.SaveImageToGroupError = 'save-image-to-group-error';

gbks.event.RemoveImageFromGroup = 'remove-image-from-group';
gbks.event.RemoveImageFromGroupStart = 'remove-image-from-group-start';
gbks.event.RemoveImageFromGroupSuccess = 'remove-image-from-group-success';
gbks.event.RemoveImageFromGroupError = 'remove-image-from-group-error';

gbks.event.SaveImageToDropbox = 'save-image-to-dropbox';
gbks.event.SaveImageToDropboxStart = 'save-image-to-dropbox-start';
gbks.event.SaveImageToDropboxSuccess = 'save-image-to-dropbox-success';
gbks.event.SaveImageToDropboxError = 'save-image-to-dropbox-error';

// gbks.event.UnsaveImageFromDropbox = 'unsave-image-from-dropbox';
// gbks.event.UnsaveImageFromDropboxStart = 'unsave-image-from-dropbox-start';
// gbks.event.UnsaveImageFromDropboxSuccess = 'unsave-image-from-dropbox-success';
// gbks.event.UnsaveImageFromDropboxError = 'unsave-image-from-dropbox-error';

gbks.event.MakeImagePublic = 'make-image-public';
gbks.event.MakeImagePublicStart = 'make-image-public-start';
gbks.event.MakeImagePublicSuccess = 'make-image-public-success';
gbks.event.MakeImagePublicError = 'make-image-public-error';

gbks.event.MakeImagePrivate = 'make-image-private';
gbks.event.MakeImagePrivateStart = 'make-image-private-start';
gbks.event.MakeImagePrivateSuccess = 'make-image-private-success';
gbks.event.MakeImagePrivateError = 'make-image-private-error';

gbks.event.LikeImage = 'like-image';
gbks.event.LikeImageStart = 'like-image-start';
gbks.event.LikeImageSuccess = 'like-image-success';
gbks.event.LikeImageError = 'like-image-error';

gbks.event.UnlikeImage = 'unlike-image';
gbks.event.UnlikeImageStart = 'unlike-image-start';
gbks.event.UnlikeImageSuccess = 'unlike-image-success';
gbks.event.UnlikeImageError = 'unlike-image-error';

gbks.event.SearchImages = 'search-images';
gbks.event.SearchImagesStart = 'search-images-start';
gbks.event.SearchImagesSuccess = 'search-images-success';
gbks.event.SearchImagesError = 'search-images-error';

gbks.event.ImageNsfw = 'image-nsfw';
gbks.event.ImageNsfwStart = 'image-nsfw-start';
gbks.event.ImageNsfwSuccess = 'image-nsfw-success';
gbks.event.ImageNsfwError = 'image-nsfw-error';

// Comment API

gbks.event.CreateComment = 'create-comment';
gbks.event.CreateCommentStart = 'create-comment-start';
gbks.event.CreateCommentSuccess = 'create-comment-success';
gbks.event.CreateCommentError = 'create-comment-error';

gbks.event.UpdateComment = 'update-comment';
gbks.event.UpdateCommentStart = 'update-comment-start';
gbks.event.UpdateCommentSuccess = 'update-comment-success';
gbks.event.UpdateCommentError = 'update-comment-error';

gbks.event.RemoveComment = 'remove-comment';
gbks.event.RemoveCommentStart = 'remove-comment-start';
gbks.event.RemoveCommentSuccess = 'remove-comment-success';
gbks.event.RemoveCommentError = 'remove-comment-error';

gbks.event.GetImageComments = 'get-image-comments';
gbks.event.GetImageCommentsStart = 'get-image-comments-start';
gbks.event.GetImageCommentsSuccess = 'get-image-comments-success';
gbks.event.GetImageCommentsError = 'get-image-comments-error';

gbks.event.GetUserComments = 'get-user-comments';
gbks.event.GetUserCommentsStart = 'get-user-comments-start';
gbks.event.GetUserCommentsSuccess = 'get-user-comments-success';
gbks.event.GetUserCommentsError = 'get-user-comments-error';

gbks.event.GetComment = 'get-comment';
gbks.event.GetCommentStart = 'get-comment-start';
gbks.event.GetCommentSuccess = 'get-comment-success';
gbks.event.GetCommentError = 'get-comment-error';

// User API

gbks.event.FollowUser = 'follow-user';
gbks.event.FollowUserStart = 'follow-user-start';
gbks.event.FollowUserSuccess = 'follow-user-success';
gbks.event.FollowUserError = 'follow-user-error';

gbks.event.UnfollowUser = 'unfollow-user';
gbks.event.UnfollowUserStart = 'unfollow-user-start';
gbks.event.UnfollowUserSuccess = 'unfollow-user-success';
gbks.event.UnfollowUserError = 'unfollow-user-error';

gbks.event.GetUserContacts = 'get-user-contacts';
gbks.event.GetUserContactsStart = 'get-user-contacts-start';
gbks.event.GetUserContactsSuccess = 'get-user-contacts-success';
gbks.event.GetUserContactsError = 'get-user-contacts-error';

gbks.event.GetUserFollowing = 'get-user-following';
gbks.event.GetUserFollowingStart = 'get-user-following-start';
gbks.event.GetUserFollowingSuccess = 'get-user-following-success';
gbks.event.GetUserFollowingError = 'get-user-following-error';

gbks.event.GetUserFollowers = 'get-user-followers';
gbks.event.GetUserFollowersStart = 'get-user-followers-start';
gbks.event.GetUserFollowersSuccess = 'get-user-followers-success';
gbks.event.GetUserFollowersError = 'get-user-followers-error';

gbks.event.SearchUsers = 'search-users';
gbks.event.SearchUsersStart = 'search-users-start';
gbks.event.SearchUsersSuccess = 'search-users-success';
gbks.event.SearchUsersError = 'search-users-error';

// Group API

gbks.event.CreateGroup = 'create-group';
gbks.event.CreateGroupStart = 'create-group-start';
gbks.event.CreateGroupSuccess = 'create-group-success';
gbks.event.CreateGroupError = 'create-group-error';

gbks.event.GetGroup = 'get-group';
gbks.event.GetGroupStart = 'get-group-start';
gbks.event.GetGroupSuccess = 'get-group-success';
gbks.event.GetGroupError = 'get-group-error';

gbks.event.UpdateGroup = 'update-group';
gbks.event.UpdateGroupStart = 'update-group-start';
gbks.event.UpdateGroupSuccess = 'update-group-success';
gbks.event.UpdateGroupError = 'update-group-error';

gbks.event.RemoveGroup = 'remove-group';
gbks.event.RemoveGroupStart = 'remove-group-start';
gbks.event.RemoveGroupSuccess = 'remove-group-success';
gbks.event.RemoveGroupError = 'remove-group-error';

gbks.event.GetUserGroups = 'get-user-groups';
gbks.event.GetUserGroupsStart = 'get-user-groups-start';
gbks.event.GetUserGroupsSuccess = 'get-user-groups-success';
gbks.event.GetUserGroupsError = 'get-user-groups-error';

gbks.event.FollowGroup = 'follow-group';
gbks.event.FollowGroupStart = 'follow-group-start';
gbks.event.FollowGroupSuccess = 'follow-group-success';
gbks.event.FollowGroupError = 'follow-group-error';

gbks.event.UnfollowGroup = 'unfollow-group';
gbks.event.UnfollowGroupStart = 'unfollow-group-start';
gbks.event.UnfollowGroupSuccess = 'unfollow-group-success';
gbks.event.UnfollowGroupError = 'unfollow-group-error';

gbks.event.SearchGroups = 'search-groups';
gbks.event.SearchGroupsStart = 'search-groups-start';
gbks.event.SearchGroupsSuccess = 'search-groups-success';
gbks.event.SearchGroupsError = 'search-groups-error';

gbks.event.SortGroups = 'sort-groups';

// Sources

gbks.event.FollowSource = 'follow-source';
gbks.event.FollowSourceStart = 'follow-source-start';
gbks.event.FollowSourceSuccess = 'follow-source-success';
gbks.event.FollowSourceError = 'follow-source-error';

gbks.event.UnfollowSource = 'unfollow-source';
gbks.event.UnfollowSourceStart = 'unfollow-source-start';
gbks.event.UnfollowSourceSuccess = 'unfollow-source-success';
gbks.event.UnfollowSourceError = 'unfollow-source-error';

// Categories

gbks.event.GetCategories = 'get-categories';
gbks.event.GetCategoriesStart = 'get-categories-start';
gbks.event.GetCategoriesSuccess = 'get-categories-success';
gbks.event.GetCategoriesError = 'get-categories-error';

// UI events

gbks.event.UpdateGridConfig = 'update-grid-config';

gbks.event.SetupNewContent = 'setup-new-content';

gbks.event.ChangeHistory = 'change-history';

gbks.event.ResizeTiles = 'resize-tiles';

gbks.event.SidebarOpen = 'open-sidebar';
gbks.event.SidebarClose = 'close-sidebar';

gbks.event.ShowPopup = 'show-popup';
gbks.event.HidePopup = 'hide-popup';

gbks.event.CommentFormResize = 'comment-form-resize';
gbks.event.CommentListResize = 'comment-list-resize';

// gbks.event.ShowCreateGroupPopup = 'show-create-group-popup';
// gbks.event.ShowCreateGroupPopupSuccess = 'on-create-group-popup-shown';
// gbks.event.HideCreateGroupPopup = 'hide-create-group-popup';
// gbks.event.HideCreateGroupPopupSuccess = 'on-create-group-popup-hidden';

// gbks.event.ShowSavePopup = 'show-save-popup';
// gbks.event.ShowSavePopupSuccess = 'on-save-popup-shown';
// gbks.event.HideSavePopup = 'hide-save-popup';
// gbks.event.HideSavePopupSuccess = 'on-save-popup-hidden';

// gbks.event.ShowContactsDropdown = 'show-contacts-dropdown';
// gbks.event.HideContactsDropdown = 'hide-contacts-dropdown';

// Signup popup
// 
// gbks.event.ShowSignupPopup = 'show-signup-popup';
// gbks.event.ShowSignupPopupSuccess = 'on-signup-popup-shown';

// gbks.event.HideSignupPopup = 'hide-signup-popup';
// gbks.event.HideSignupPopupSuccess = 'on-signup-popup-hidden';

// Logic

/**
 * Pass in the event name, a callback and an Id.
 * The Id is used for debugging and also to easily remove
 * all listeners from a specific object when destroying it.
 */
gbks.events.listen = function(event, callback, id) {
    var listeners = gbks.events.getListenersByEvent(event);
    var alreadyListening = false;
    var i=0, length=listeners.length, listener;
    for(; i<length; i++) {
        listener = listeners[i];

        if(listener.id == id) {
            alreadyListening = true;
            break;
        }
    }

    if(!alreadyListening) {
        listeners.push({
            callback: callback,
            id: id
        });
    }

    gbks.events.updateListenersByEvent(event, listeners);
};
  
gbks.events.unlisten = function(event, id) {
    var listeners = gbks.events.getListenersByEvent(event);

    var i=0, length=listeners.length, listener;
    for(; i<length; i++) {
        listener = listeners[i];

        if(listener.id == id) {
            listeners.splice(i, 1);
            break;
        }
    }

    gbks.events.updateListenersByEvent(event, listeners);
};
  
gbks.events.call = function(event, data) {
    // console.log('call', event);
    if(!data) {
        data = {};
    }

    var listeners = gbks.events.getListenersByEvent(event);
    
    if(listeners) {
        var i=0, length=listeners.length, listener;
        for(; i<length; i++) {
            listener = listeners[i];

            if(listener.callback) {
                listener.callback(data);
            }
        }
    }
};

gbks.events.getListenersByEvent = function(event) {
    return gbks.events.events[event] || [];
};

gbks.events.updateListenersByEvent = function(event, listeners) {
    gbks.events.events[event] = listeners;
};

gbks.events.clearListener = function(id) {
    for(var event in gbks.events.events) {
        var listeners = gbks.events.events[event], listener;
        var length = listeners.length;
        for(var i=0; i<length; i++) {
            listener = listeners[i];
            if(listener.id === id) {
                listeners.splice(i, 1);
                i--;
                length--;
            }
        }
    }
};



if(!window.console) {
  console = {
    log: function() {}
  };
}

/**
 * Loader.
 */
var gbks = gbks || {};
gbks.common = gbks.common || {};
gbks.common.Loader = gbks.common.Loader || {};
gbks.common.Loader.show = function(message) {
  var loader = gbks.common.Loader.getLoader();
  loader.stop();
  if(message && message.length > 0) {
    loader.html(message);
  } else {
    loader.html('');
  }
  
  loader.show();
  loader.animate({opacity:1}, 50);
};

gbks.common.Loader.hide = function() {
  var loader = gbks.common.Loader.getLoader();
  loader.stop();
  var callback = null;
  loader.animate({opacity:0}, 250, callback);
};

gbks.common.Loader.onHide = function(event) {
  gbks.common.Loader.getLoader().hide();
};

gbks.common.Loader.getLoader = function() {
  return $('#loader');
};

/**
 * Tracking helpers.
 */
gbks.common.track = function(one, two, three) {
  if(typeof(_gaq) !== 'undefined') {
    _gaq.push(['_trackEvent', one, two, three]);
  }
};

gbks.common.onWindowError = function(message, file, line) { 
  if(typeof(_gaq) !== 'undefined') {
    var sFormattedMessage = '[' + file + ' (' + line + ')] ' + message; 
    _gaq.push(['_trackEvent', 'Exceptions', 'Application', sFormattedMessage, null, true]);
  }
};

/** Popup helpers **/

gbks.common.wrapPopupContent = function(id, html, horizontal) {
  var name = (horizontal ? ' horizontal' : 'vertical');
  var h = '<div id="'+id+'" class="popup is-'+name+'">';
  h += '<div class="wrap">';
  h += '<div class="content">';

  // if(horizontal) {
  //   h += '<div class="arrow"><img class="left" width="17" height="29" src="/assets/overlay-arrow-left.png"><img class="right" width="17" height="29" src="/assets/overlay-arrow-right.png"></div>';
  // } else {
  //   h += '<div class="arrow"><img class="up" width="29" height="17" src="/assets/overlay-arrow-up.png"><img class="down" width="29" height="17" src="/assets/overlay-arrow-down.png"></div>';
  // }

  h += html;
  h += '</div>';
  h += '</div>';
  h += '</div>';
  return h;
};

gbks.common.positionPopupHorizontal = function(popup, target) {
  var docHeight = $(window).height();
  
  var pos = target.offset();
  var overlayHeight = popup.height();
  
  if(overlayHeight == 0) return false;
  
  var top = Math.round(pos.top + target.height()/2 - overlayHeight/2) - 2;
  var bottom = top + overlayHeight;
  
  var docBottomDelta = docHeight - 10 - bottom;
  var arrowTop = overlayHeight/2;
  
  if(docBottomDelta < 0) {
    top += docBottomDelta;
    arrowTop -= docBottomDelta;
  }
  if(top < 0) {
    top = 10;
    arrowTop += top - 10;
  }
  
  // Apply positioning.
  var left = pos.left + target.width() + 17;
  
  popup.css({
    left: left+'px',
    top: top+'px'
  });
  
  $('.arrow', popup).css('top', arrowTop+'px');
  
  return true;
};

gbks.common.positionPopup = function(popup, target) {
  var docWidth = $(window).width();
  
  var pos = target.offset();
  var overlayWidth = popup.width();
  var left = Math.round(pos.left + target.width()/2 - overlayWidth/2) - 2;
  var right = left + overlayWidth;
  var docRightDelta = docWidth - 10 - right;
  var arrowLeft = overlayWidth/2;
  
  if(docRightDelta < 0) {
    left += docRightDelta;
    arrowLeft -= docRightDelta;
  }
  if(left < 0) {
    left -= left - 10;
    arrowLeft += left - 10;
  }
  
  // Check if we're in the lower half of the screen.
  var windowHeight = $(window).height();
  var center = windowHeight/2;
  var buttonY = target.offset().top - window.pageYOffset + target.height()/2;
  var deltaTop = buttonY;
  var deltaBottom = windowHeight-deltaTop;
  var showTop = (deltaTop > deltaBottom);
  if(showTop) {
    popup.addClass('is-above');
  } else {
    popup.removeClass('is-above');
  }
  
  // Apply positioning.
  var top = pos.top + target.height() + 17;
  
  if(showTop) {
    top = pos.top - 17 - popup.height();
  }
  
  popup.css({
    left: left+'px',
    top: top+'px'
  });
  
  // $('.arrow', popup).css('left', arrowLeft+'px');
};

/** Cookie helper **/

gbks.common.Cookie = function(key, value, options) {
    // key and at least value given, set cookie...
    if (arguments.length > 1 && (!/Object/.test(Object.prototype.toString.call(value)) || value === null || value === undefined)) {
        options = $.extend({}, options);

        if (value === null || value === undefined) {
            options.expires = -1;
        }

        if (typeof options.expires === 'number') {
            var days = options.expires, t = options.expires = new Date();
            t.setDate(t.getDate() + days);
        }

        value = String(value);

        return (document.cookie = [
            encodeURIComponent(key), '=', options.raw ? value : encodeURIComponent(value),
            options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
            options.path    ? '; path=' + options.path : '',
            options.domain  ? '; domain=' + options.domain : '',
            options.secure  ? '; secure' : ''
        ].join(''));
    }

    // key and possibly options given, get cookie...
    options = value || {};
    var decode = options.raw ? function(s) { return s; } : decodeURIComponent;

    var pairs = document.cookie.split('; ');
    for (var i = 0, pair; pair = pairs[i] && pairs[i].split('='); i++) {
        if (decode(pair[0]) === key) return decode(pair[1] || ''); // IE saves cookies with empty string as "c; ", e.g. without "=" as opposed to EOMB, thus pair[1] may be undefined
    }
    return null;
};

// Responsive image upgrade.
gbks.common.updateRetinaImages = function() {
  var pixelRatio = (!!window.devicePixelRatio ? window.devicePixelRatio : 1);

  if(pixelRatio > 1) {
    var images = $('img.is-responsive');
    var i=0, length = images.length, image, retinaFile;
    for(; i<length; i++) {
      image = $(images[i]);
      retinaFile = image.data('2x');
      if(retinaFile) {
        image.attr('src', retinaFile);
        image.removeClass('is-responsive');
      }
    }
  }
};

// Fade in images.
gbks.common.fadeImages = function(canvas) {
  if(Modernizr.opacity && Modernizr.cssanimations) {
    var imgs = $('img', canvas);
    imgs.each(function(index) {
      if(!this.complete) {
        var t = $(this);
        t.addClass('is-loading');
        t.one('load', function(index) {
          $(this).addClass('is-loaded');
          $(this).removeClass('is-loading');
        });
      }
    });
  }
};

// Shortcut tool.
gbks.common.Shortcuts = function() {
  
  this.init = function() {
    this.keyUpMethod = $.proxy(this.onKeyUp, this);
    $(document).bind('keyup', this.keyUpMethod);
  };
  
  this.onKeyUp = function(event) {
    var focused = $('*:focus');
    if(focused.length > 0) return;
    console.log('key', event.which);
    switch(event.which) {
      case 83: // s
        $('body').toggleClass('fadeSaved');
        break;
      case 71: // g
        //this.toggleGroupOverlay();
        break;
      case 73: // i
        this.toggleTileInfo();
        break;
      case 77: // m
        this.toggleMenu();
        break;
    }
  };
  
  this.toggleTileInfo = function() {
    var b = $('body'), c = 'hideTileInfo';
    if(b.hasClass(c)) b.removeClass(c);
    else b.addClass(c);
    
    if(gbks.tilesInstance) {
      gbks.tilesInstance.updateLayout();
    }
  };
  
  this.toggleGroupOverlay = function() {
    if(this.groupsOverlay) {
      var wrap = $('.wrap', this.groupsOverlay);
      if(this.groupsOverlay.is(":visible")) {
        wrap.removeClass('zapMeIn');
        wrap.addClass('zapMeOut');
        //this.groupsOverlay.hide();
        var g = this.groupsOverlay;
        setTimeout(function(){ g.hide(); }, 150);
      } else {
        wrap.addClass('zapMeIn');
        wrap.removeClass('zapMeOut');
        this.groupsOverlay.show();
      }
    } else {
      this.loadGroupOverlay();
    }
  };

  this.toggleMenu = function() {
    if(gbks.kaoriInstance) {
      gbks.kaoriInstance.toggle();
    }
  };

  this.loadGroupOverlay = function() {
    if(!this.groupsOverlay) {
      this.groupsOverlay = $('<div id="quickGroupNav"><div class="wrap"><div class="wrap2"><div class="content clearfix"></div></div></div></div>');
      this.groupsOverlay.click($.proxy(this.onClickOverlay, this));
      $('body').append(this.groupsOverlay);
      $('.content', this.groupsOverlay).load('/autocomplete/quicknav', $.proxy(this.onLoadGroupOverlay, this));
    }
  };

  this.onClickOverlay = function(event) {
    var target = $(event.currentTarget);
    var isContent = (target.parents('#quickGroupNav .content').length > 0);
    if(!isContent) {
      this.toggleGroupOverlay();
    }
  };
  
  this.onLoadGroupOverlay = function() {
    this.groupsOverlay.addClass('loaded');
    var wrap = $('.wrap', this.groupsOverlay);
    wrap.addClass('zapMeIn');
  };

};
gbks.common.shortcutInstance = new gbks.common.Shortcuts();
gbks.common.shortcutInstance.init();

// History helper.

gbks.common.history = gbks.common.history || {};
gbks.common.history.push = function(url, title) {
  // console.log('gbks.common.history.push', url, title, gbks.common.history.supported());

  if(gbks.common.history.supported()) {
    try {
      history.pushState({url: url, title: title}, title, url);
    } catch(error) {

    }
    return true;
  }
  return false;
};

gbks.common.history.onChange = function(event) {
  var state = event.state;
};

gbks.common.history.supported = function() {
  return (typeof history.pushState !== 'undefined');
};

// Helper for smooth scrolling.
gbks.common.scroller = gbks.common.scroller || {};
gbks.common.scroller.scrollToPosition = function(position, canvas) {
  if(!canvas) {
    canvas = window;
  }

  var info = {
    startTime: new Date().getTime(),
    startValue: null,
    endValue: position,
    duration: 1500,
    lastUpdate: new Date().getTime(),
    canvas: canvas
  };

  if(canvas == window) {
    info.startValue = canvas.pageYOffset;
  } else {
    info.startValue = canvas.scrollTop;
  }

  console.log('gbks.common.scroller.scrollToPosition', info);

  // Calculate duration based on distance.
  var duration = Math.abs(info.endValue - info.startValue);
  duration = Math.max(duration, 500);
  duration = Math.min(duration, 1500);
  info.duration = duration;
  
  $(window).unbind('mousewheel', gbks.common.scroller.mousewheelFunction);
  $(window).bind('mousewheel', gbks.common.scroller.mousewheelFunction);
  
  gbks.common.scroller.scrollInfo = info;

  clearTimeout(gbks.common.scroller.scrollInterval);
  gbks.common.scroller.scrollInterval = setTimeout($.proxy(gbks.common.scroller.onScrollInterval, gbks.common.scroller), 25);
};
  
gbks.common.scroller.onScrollInterval = function(event) {
  var info = gbks.common.scroller.scrollInfo;
  var delta = new Date().getTime() - info.startTime;
  delta = Math.min(delta, info.duration);
  var pos = gbks.common.scroller.easeInOutCubic(null, delta, info.startValue, info.endValue - info.startValue, info.duration);
  
  if(info.canvas == window) {
    info.canvas.scrollTo(0, pos);
  } else {
    info.canvas.scrollTop = pos;
  }
  
  if (Math.abs(delta) < info.duration) {
    var timePassed = new Date().getTime() - info.lastUpdate;
    var timer = Math.max(5, 25 - timePassed);
    
    clearTimeout(gbks.common.scroller.scrollInterval);
    gbks.common.scroller.scrollInterval = setTimeout($.proxy(gbks.common.scroller.onScrollInterval, gbks.common.scroller), timer);
  } else {
    $(window).unbind('mousewheel', gbks.common.scroller.mousewheelFunction);
  }
  
  info.lastUpdate = new Date().getTime();
};

gbks.common.scroller.onMouseWheel = function(event) {
  $(window).unbind('mousewheel', gbks.common.scroller.mousewheelFunction);
  clearInterval(gbks.common.scroller.scrollInterval);
};

gbks.common.scroller.easeInOutCubic = function (x, t, b, c, d) {
  if ((t/=d/2) < 1) return c/2*t*t*t + b;
  return c/2*((t-=2)*t*t + 2) + b;
};

gbks.common.scroller.mousewheelFunction = $.proxy(gbks.common.scroller.onMouseWheel, gbks.common.scroller);

/** iPad specific stuff **/
gbks.common.iPad = gbks.common.iPad || {};
gbks.common.iPad.isWebApp = function() {
  return (("standalone" in window.navigator) && window.navigator.standalone);
};
gbks.common.iPad.captureLinks = function() {
  $('a').live('click', $.proxy(gbks.common.iPad.captureLink, gbks.common.iPad));
};
gbks.common.iPad.captureLink = function(event) {
  var link = $(event.currentTarget);
  //var target = link.attr('target');
  //if(target == undefined || target == "" || target == "_self" || target == "_blank") {
    //get the destination of the link clicked
    var dest = link.attr("href");

    // Only interfere with links on Wookmark
    var t = 'http://www.wookmark.com';
    if(dest.substring(0, t.length) == t) {
      //prevent default behavior (opening safari)
      event.preventDefault();
      //update location of the web app
      self.location = dest;
    }
  //}
};
gbks.common.iPad.detect = function() {
  if(navigator.userAgent.match(/iPad/i) != null) {
    $('body').addClass('iPad');
    
    // If it's a web app, capture all link clicks.
    if(gbks.common.iPad.isWebApp()) {
      gbks.common.iPad.captureLinks();
    }
  }
};
gbks.common.iPad.detect();

gbks.common.zapIn = function(element) {
  if(Modernizr.cssanimations) {
    element.removeClass('zapMeOut');
    element.addClass('zapMeIn');
  } else {
    element.show();
  }
};

gbks.common.zapOut = function(element, callback, hide) {
  if(Modernizr.cssanimations) {
    element.removeClass('zapMeIn');
    element.addClass('zapMeOut');
  } else {
    element.hide();
  }
  if(callback) {
    setTimeout(callback, 150);
  }
  if(hide) {
    setTimeout(element.hide, 150);
  }
};

/**
$(document).ready(function() {
  // Log all Javascript errors in GA.
  //$(window).bind('onerror', gbks.common.onWindowError);
});
//*/


var gbks = gbks || {};

gbks.icons = gbks.icons || {}; 

gbks.icons.down = '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="50px" height="50px" viewBox="0 0 50 50" enable-background="new 0 0 50 50" xml:space="preserve"><polygon points="47.25,15 45.164,12.914 25,33.078 4.836,12.914 2.75,15 25,37.25 "/></svg>';

gbks.icons.close = '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="50px" height="50px" viewBox="0 0 50 50" enable-background="new 0 0 50 50" xml:space="preserve"><line fill="none" stroke-width="2" stroke-miterlimit="10" x1="7" y1="7" x2="43" y2="43"/><line fill="none" stroke-width="2" stroke-miterlimit="10" x1="43" y1="7" x2="7" y2="43"/></svg>';

// gbks.icons.check = '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 50 50" enable-background="new 0 0 50 50" xml:space="preserve"><polyline fill="none" stroke-width="2" stroke-miterlimit="10" points="15.1,23.7 24,32 44,8.4 "/><path d="M43.7,13.4L42.3,15C44,18,45,21.4,45,25c0,11-9,20-20,20S5,36,5,25S14,5,25,5c5.2,0,9.9,2,13.5,5.3l1.3-1.5C35.9,5.2,30.7,3,25,3C12.9,3,3,12.9,3,25s9.9,22,22,22s22-9.9,22-22C47,20.7,45.8,16.8,43.7,13.4z"/></svg>';

gbks.icons.check = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" width="50px" height="50px" viewBox="0 0 50 50" enable-background="new 0 0 50 50" xml:space="preserve"><polyline fill="none" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" points="  8,29.312 21.921,41.348 42,10.652 "/></svg>';

gbks.icons.checkInCircleFilled = '<svg width="100px" height="100px" viewBox="0 0 100 100" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path d="M50,0 C22.4295455,0 0,22.4295455 0,50 C0,77.5704545 22.4295455,100 50,100 C77.5704545,100 100,77.5704545 100,50 C100,22.4295455 77.5704545,0 50,0 Z M46.5977273,71.6590909 L25.9772727,53.05 L29.0227273,49.6772727 L45.675,64.7045455 L70.5909091,26.0409091 L74.4136364,28.5022727 L46.5977273,71.6590909 Z" stroke="none" fill-rule="nonzero"></path></svg>'

gbks.icons.infoInCircle = '<svg width="106px" height="106px" viewBox="0 0 106 106" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path d="M53,105.083333 C24.2351693,105.083333 0.916666667,81.7648307 0.916666667,53 C0.916666667,24.2351693 24.2351693,0.916666667 53,0.916666667 C81.7648307,0.916666667 105.083333,24.2351693 105.083333,53 C105.083333,81.7648307 81.7648307,105.083333 53,105.083333 Z M53,100.916667 C79.4636443,100.916667 100.916667,79.4636443 100.916667,53 C100.916667,26.5363557 79.4636443,5.08333333 53,5.08333333 C26.5363557,5.08333333 5.08333333,26.5363557 5.08333333,53 C5.08333333,79.4636443 26.5363557,100.916667 53,100.916667 Z M50.45625,34.7520833 C50.00625,34.7520833 49.7125,34.4520833 49.7125,34.0041667 L49.7125,28.55 C49.7125,28.1020833 50.0083333,27.8020833 50.45625,27.8020833 L55.5375,27.8020833 C55.9854167,27.8020833 56.2854167,28.1020833 56.2854167,28.55 L56.2854167,34.0041667 C56.2854167,34.4520833 55.9833333,34.7520833 55.5375,34.7520833 L50.45625,34.7520833 Z M50.6083333,78.6104167 C50.1604167,78.6104167 49.8625,78.3125 49.8625,77.8645833 L49.8625,43.56875 C49.8625,43.1208333 50.1625,42.8208333 50.6083333,42.8208333 L55.3895833,42.8208333 C55.8395833,42.8208333 56.1375,43.1208333 56.1375,43.56875 L56.1375,77.8645833 C56.1375,78.3145833 55.8375,78.6104167 55.3895833,78.6104167 L50.6083333,78.6104167 Z" stroke="none" fill-rule="nonzero"></path></svg>';

gbks.icons.magnify = '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="50px" height="50px" viewBox="0 0 50 50" enable-background="new 0 0 50 50" xml:space="preserve"><circle fill="none" stroke-width="2" stroke-linecap="round" stroke-miterlimit="10" cx="21" cy="20" r="16"/><line fill="none" stroke-width="4" stroke-miterlimit="10" x1="32.229" y1="32.229" x2="45.5" y2="45.5"/></svg>';

gbks.icons.link = '<svg width="16px" height="15px" viewBox="0 0 16 15" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path d="M7.86086957,9.06818182 C8.17391304,9.92045455 7.96521739,10.875 7.30434783,11.5568182 L5.2173913,13.6022727 C4.76521739,14.0454545 4.13913043,14.2840909 3.51304348,14.2840909 C2.85217391,14.2840909 2.26086957,14.0454545 1.80869565,13.6022727 C0.869565217,12.6818182 0.869565217,11.1477273 1.80869565,10.2272727 L3.89565217,8.18181818 C4.34782609,7.73863636 4.97391304,7.5 5.6,7.5 C5.87826087,7.5 6.15652174,7.53409091 6.4,7.63636364 L6.92173913,7.125 C6.50434783,6.92045455 6.0173913,6.81818182 5.56521739,6.81818182 C4.76521739,6.81818182 3.96521739,7.125 3.33913043,7.70454545 L1.25217391,9.75 C0.0347826087,10.9431818 0.0347826087,12.8863636 1.25217391,14.0795455 C1.87826087,14.6931818 2.67826087,15 3.47826087,15 C4.27826087,15 5.07826087,14.6931818 5.70434783,14.1136364 L7.79130435,12.0681818 C8.76521739,11.1136364 8.93913043,9.71590909 8.3826087,8.59090909 L7.86086957,9.06818182 Z M14.7478261,0.886363636 C14.1217391,0.306818182 13.3217391,0 12.5217391,0 C11.7217391,0 10.9217391,0.306818182 10.2956522,0.886363636 L8.20869565,2.93181818 C7.23478261,3.88636364 7.06086957,5.28409091 7.6173913,6.40909091 L8.13913043,5.89772727 C7.82608696,5.04545455 8.03478261,4.09090909 8.69565217,3.40909091 L10.7826087,1.36363636 C11.2347826,0.920454545 11.8608696,0.681818182 12.4869565,0.681818182 C13.1478261,0.681818182 13.7391304,0.920454545 14.1913043,1.36363636 C15.1304348,2.28409091 15.1304348,3.81818182 14.1913043,4.73863636 L12.1043478,6.78409091 C11.6521739,7.22727273 11.026087,7.46590909 10.4,7.46590909 C10.1217391,7.46590909 9.84347826,7.43181818 9.6,7.32954545 L9.07826087,7.84090909 C9.49565217,8.04545455 9.94782609,8.14772727 10.4347826,8.14772727 C11.2347826,8.14772727 12.0347826,7.84090909 12.6608696,7.26136364 L14.7478261,5.21590909 C15.9652174,4.05681818 15.9652174,2.07954545 14.7478261,0.886363636 Z M10.4695652,5.07954545 C10.4,5.01136364 10.3304348,4.97727273 10.226087,4.97727273 C10.1565217,4.97727273 10.0521739,5.01136364 9.9826087,5.07954545 L5.56521739,9.40909091 C5.42608696,9.54545455 5.42608696,9.75 5.56521739,9.88636364 C5.63478261,9.95454545 5.73913043,9.98863636 5.80869565,9.98863636 C5.87826087,9.98863636 5.9826087,9.95454545 6.05217391,9.88636364 L10.4695652,5.55681818 C10.6086957,5.42045455 10.6086957,5.21590909 10.4695652,5.07954545 Z" stroke="none" fill-rule="evenodd"></path></svg>';

gbks.icons.heart = '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="50px" height="50px" viewBox="0 0 50 50" enable-background="new 0 0 50 50" xml:space="preserve"><path fill="none" stroke-width="2" stroke-linecap="round" stroke-miterlimit="10" d="M33.637,10c-3.606,0-6.78,1.832-8.637,4.605C23.144,11.832,19.97,10,16.364,10C10.641,10,6,14.606,6,20.286c0,12,13.817,18.427,19,22.714c5.183-4.287,19-10.714,19-22.714C44,14.606,39.359,10,33.637,10z"/></svg>';

gbks.icons.plus = '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="50px" height="50px" viewBox="0 0 50 50" enable-background="new 0 0 50 50" xml:space="preserve"><line fill="none" stroke-width="4" stroke-miterlimit="10" x1="9" y1="25" x2="41" y2="25"/><line fill="none" stroke-width="4" stroke-miterlimit="10" x1="25" y1="9" x2="25" y2="41"/></svg>';

gbks.icons.plusInCircle = '<svg width="18px" height="18px" viewBox="7 7 18 18" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke-width="1" fill="none" fill-rule="evenodd" transform="translate(8.000000, 8.000000)"><path d="M3.80952381,8 L12.1904762,8"></path><path d="M8,3.80952381 L8,12.1904762"></path><circle cx="8" cy="8" r="8"></circle></g></svg>';

gbks.icons.share = '<svg width="21px" height="20px" viewBox="-2 -1 21 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke-width="1" fill="none" fill-rule="evenodd"><polygon points="0 9.75 5.4 11.5125 15 3.75 8.3625 12.9375 13.5 18 18 0"></polygon><polyline points="8.3625 12.9375 4.875 16.875 5.4 11.5125"></polyline></g></svg>';

gbks.icons.lockFilled = '<svg width="14px" height="17px" viewBox="0 -1 14 17" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke-width="1" fill-rule="evenodd"><path d="M10.52,5.72 L10.52,3.8 C10.52,1.848 8.952,0.28 7,0.28 C5.048,0.28 3.48,1.848 3.48,3.8 L3.48,5.72" stroke-width="0.64" stroke-linecap="round" fill="none"></path><path d="M12.12,5.4 L1.88,5.4 C1.336,5.4 0.92,5.816 0.92,6.36 L0.92,14.04 C0.92,14.584 1.336,15 1.88,15 L12.12,15 C12.664,15 13.08,14.584 13.08,14.04 L13.08,6.36 C13.08,5.816 12.664,5.4 12.12,5.4 Z M7.64,10.264 L7.64,11.16 C7.64,11.512 7.352,11.8 7,11.8 C6.648,11.8 6.36,11.512 6.36,11.16 L6.36,10.264 C6.168,10.104 6.04,9.848 6.04,9.56 C6.04,9.016 6.456,8.6 7,8.6 C7.544,8.6 7.96,9.016 7.96,9.56 C7.96,9.848 7.832,10.104 7.64,10.264 Z" fill-rule="nonzero" stroke="none"></path></g></svg>';
gbks.icons.peopleFilled = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" width="50px" height="50px" viewBox="0 0 50 50" enable-background="new 0 0 50 50" xml:space="preserve"><g stroke="none"><path d="M30.645,7.771c2.156,3.472,1.492,8.205,0.726,11.185c0.424,0.898,0.584,1.935,0.454,3.012c-0.278,2.325-1.157,3.657-2.055,4.419c-0.409,1.515-1.129,3.046-1.935,4.129c-0.006,0.757-0.007,1.407,0.041,2.166c0.544,0.612,2.378,1.337,3.759,1.883c3.061,1.209,7.323,2.909,9.297,7.021h9.13l-0.063-1.06c-0.312-5.209-4.444-6.84-7.766-8.15c-1.844-0.728-3.589-1.416-4.097-2.527c-0.076-0.934-0.069-1.664-0.063-2.504l0.002-0.342c0.796-0.832,1.516-2.47,1.799-3.84c0.616-0.347,1.348-1.147,1.57-2.994c0.109-0.923-0.146-1.646-0.513-2.14c0.503-1.74,1.467-6.042-0.266-8.829c-0.738-1.188-1.851-1.942-3.31-2.244c-0.835-1.014-2.387-1.565-4.455-1.565c-1.417,0.026-2.643,0.266-3.715,0.666C29.747,6.546,30.238,7.117,30.645,7.771z"/><path d="M39.998,45.94c-0.025-0.421-0.076-0.817-0.143-1.198c-0.018-0.097-0.041-0.185-0.061-0.278c-0.061-0.289-0.127-0.572-0.21-0.841c-0.023-0.077-0.051-0.151-0.076-0.228c-0.097-0.284-0.202-0.56-0.322-0.82c-0.02-0.042-0.039-0.084-0.059-0.126c-0.145-0.3-0.302-0.587-0.474-0.857c-1.784-2.798-5.006-4.08-7.758-5.168c-2.339-0.924-4.368-1.725-4.98-3.131c-0.096-1.134-0.088-2.015-0.079-3.027l0.003-0.479c0.897-0.917,1.821-2.865,2.157-4.602c0.704-0.364,1.579-1.26,1.842-3.454c0.131-1.09-0.187-1.929-0.624-2.48c0.581-1.98,1.78-7.124-0.27-10.423C28.496,8.104,27.92,7.53,27.234,7.09l0,0c-0.313-0.201-0.649-0.374-1.009-0.518c-0.362-0.142-0.745-0.257-1.154-0.338c-0.944-1.193-2.754-1.843-5.184-1.843c-3.681,0.068-6.375,1.193-8.007,3.343c-1.933,2.548-2.292,6.41-1.069,11.484   c-0.451,0.551-0.783,1.401-0.65,2.513c0.265,2.205,1.122,3.104,1.844,3.465c0.343,1.732,1.288,3.68,2.208,4.597l0.002,0.467   c0.009,1.015,0.017,1.896-0.08,3.032c-0.612,1.405-2.649,2.207-4.999,3.131c-3.908,1.538-8.771,3.451-9.135,9.517L-0.062,47h40.124L39.998,45.94z"/></g></svg>';

gbks.icons.facebook = '<svg width="50px" height="50px" viewBox="-1 -1 50 50" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round"><path d="M39,0 L9,0 C4.028,0 0,4.028 0,9 L0,39 C0,43.972 4.028,48 9,48 L39,48 C43.972,48 48,43.972 48,39 L48,9 C48,4.028 43.972,0 39,0 Z" stroke-width="2"></path><path d="M25,47 L25,27 L22,27 L22,21 L25,21 L25,18 C25,13.323 26.581,10 32,10 C34.903,10 38,11 38,11 L38,16 L35,16 C32.855,16 32,16.504 32,18 L32,21 L38,21 L37,27 L32,27 L32,47" stroke-width="2"></path></g></svg>';
gbks.icons.twitter = '<svg width="52px" height="42px" viewBox="-2 -1 52 42" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path d="M48,5.096 C46.232,5.88 44.336,6.407 42.342,6.648 C44.377,5.428 45.939,3.497 46.674,1.2 C44.771,2.327 42.661,3.147 40.419,3.588 C38.624,1.672 36.065,0.478 33.233,0.478 C27.793,0.478 23.384,4.887 23.384,10.325 C23.384,11.096 23.472,11.847 23.641,12.569 C15.457,12.157 8.2,8.237 3.342,2.279 C2.494,3.737 2.01,5.428 2.01,7.232 C2.01,10.648 3.745,13.661 6.39,15.429 C4.774,15.378 3.258,14.934 1.93,14.196 L1.93,14.321 C1.93,19.094 5.324,23.069 9.826,23.978 C9.002,24.205 8.132,24.324 7.234,24.324 C6.598,24.324 5.981,24.262 5.378,24.146 C6.635,28.055 10.27,30.907 14.579,30.986 C11.211,33.627 6.965,35.199 2.349,35.199 C1.552,35.199 0.77,35.155 0.001,35.062 C4.357,37.857 9.535,39.487 15.096,39.487 C33.21,39.487 43.118,24.48 43.118,11.471 C43.118,11.042 43.107,10.615 43.089,10.196 C45.012,8.807 46.681,7.071 48,5.096 Z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"></path></svg>';
gbks.icons.tumblr = '<svg width="50px" height="50px" viewBox="-1 -1 50 50" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round"><path d="M39,0 L9,0 C4.028,0 0,4.028 0,9 L0,39 C0,43.972 4.028,48 9,48 L39,48 C43.972,48 48,43.972 48,39 L48,9 C48,4.028 43.972,0 39,0 Z" stroke-width="2"></path><path d="M33,39.239 C33,39.363 32.947,39.481 32.854,39.564 C32.74,39.663 30.011,42 23.743,42 C16.229,42 16,33.618 16,32.663 L16,22.01 L12.431,22 C12.193,22 12,21.818 12,21.58 L12,17.81 C12,17.633 12.109,17.473 12.274,17.408 C12.342,17.383 19.06,14.774 19.06,8.431 C19.06,8.193 19.253,8 19.491,8 L23.577,8 C23.815,8 24.008,8.193 24.008,8.431 L24,16 L30.561,16 C30.799,16 30.992,16.206 30.992,16.444 L30.992,21.553 C30.992,21.791 30.799,22 30.561,22 L24,22 L24,32.502 C24,32.75 24.227,35.763 27.434,35.763 C30.089,35.763 32.32,34.396 32.342,34.382 C32.474,34.297 32.64,34.294 32.778,34.371 C32.915,34.447 33,34.591 33,34.748 L33,39.239 Z" stroke-width="2"></path></g></svg>';
gbks.icons.pinterest = '<svg width="50px" height="50px" viewBox="-1 -1 50 50" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke-width="1" fill="none" fill-rule="evenodd"><circle stroke-width="2" stroke-linecap="round" stroke-linejoin="round" cx="24" cy="24" r="24"></circle><path d="M16.627,27.673 L16.994,26.15 C16.994,26.15 17.165,25.745 16.826,25.323 C16.409,24.804 15.509,23.857 15.509,21.501 C15.509,17.3 18.721,12.724 24.546,12.724 C30.263,12.724 32.221,16.566 32.221,19.747 C32.221,23.703 30.386,29.617 26.511,29.617 C24.105,29.617 23.411,27.7 23.411,26.762 C23.395,26.445 23.467,26.125 23.497,25.973 C23.527,25.822 24.505,22.606 24.817,21.46 C25.517,18.89 24.918,16.752 22.63,16.752 C19.404,16.752 18.243,21.438 19.659,24.437 L17.356,34.169 C17.356,34.169 17.038,35.762 16.976,36.702 C16.881,38.146 17.08,40.282 17.148,40.918 C17.198,41.38 17.198,41.601 17.402,41.642 C17.606,41.683 17.954,41.326 18.234,40.898 C18.586,40.36 19.782,38.613 20.269,37.503 C20.703,36.513 20.779,36.488 21.228,34.734 C21.677,32.98 22.285,30.513 22.285,30.513 C22.285,30.513 23.547,32.797 26.959,32.797 C31.812,32.797 36.747,28.433 36.747,20.276 C36.747,13.669 31.2,9.59 24.919,9.59 C17.007,9.59 11.909,15.381 11.909,20.969 C11.909,26.421 14.832,27.699 15.444,28.066 C16.056,28.435 16.491,28.176 16.627,27.673 Z" fill-rule="nonzero"></path></g></svg>';

gbks.icons.alphaSorting = '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="50px" height="50px" viewBox="0 0 50 50" enable-background="new 0 0 50 50" xml:space="preserve"><g><path d="M8.196,1.591h3.191l6.601,17.136h-3.216l-1.608-4.536h-6.84l-1.608,4.536H1.62L8.196,1.591z M7.14,11.91h5.232L9.804,4.543H9.732L7.14,11.91z"/><path d="M3.553,30.391h13.031v2.279L6.601,44.935h10.224v2.592H2.784v-2.448l9.984-12.096H3.553V30.391z"/></g><polyline fill="none" stroke-width="2" stroke-linecap="round" stroke-miterlimit="10" points="48.89,32.054 40,40.943 31.11,32.053 "/><line fill="none" stroke-width="2" stroke-linecap="round" stroke-miterlimit="10" x1="40" y1="9" x2="40" y2="40.445"/></svg>';
gbks.icons.dateSorting = '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 50 50" enable-background="new 0 0 50 50" xml:space="preserve"><polyline fill="none" stroke-width="2" stroke-linecap="round" stroke-miterlimit="10" points="33,11 42,11 42,2 "/><path fill="none" stroke-width="2" stroke-miterlimit="10" d="M41.7,10.7C37.7,6,31.7,3,25,3C12.8,3,3,12.8,3,25s9.8,22,22,22s22-9.8,22-22c0-3.6-0.9-7.1-2.4-10.1"/><polyline fill="none" stroke-width="2" stroke-miterlimit="10" points="25,9 25,25 33,33 "/><circle cx="25" cy="25" r="2"/></svg>';

gbks.icons.group = '<svg width="24px" height="25px" viewBox="10 9 24 25" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><defs><path d="M10,12.1813982 C10,10.9766452 10.968109,10 12.1813982,10 L18.7276927,10 C19.9324457,10 20.9090909,10.968109 20.9090909,12.1813982 L20.9090909,18.7276927 C20.9090909,19.9324457 19.9409819,20.9090909 18.7276927,20.9090909 L12.1813982,20.9090909 C10.9766452,20.9090909 10,19.9409819 10,18.7276927 L10,12.1813982 Z M23.0909091,12.1813982 C23.0909091,10.9766452 24.0590181,10 25.2723073,10 L31.8186018,10 C33.0233548,10 34,10.968109 34,12.1813982 L34,18.7276927 C34,19.9324457 33.031891,20.9090909 31.8186018,20.9090909 L25.2723073,20.9090909 C24.0675543,20.9090909 23.0909091,19.9409819 23.0909091,18.7276927 L23.0909091,12.1813982 Z M23.0909091,25.2723073 C23.0909091,24.0675543 24.0590181,23.0909091 25.2723073,23.0909091 L31.8186018,23.0909091 C33.0233548,23.0909091 34,24.0590181 34,25.2723073 L34,31.8186018 C34,33.0233548 33.031891,34 31.8186018,34 L25.2723073,34 C24.0675543,34 23.0909091,33.031891 23.0909091,31.8186018 L23.0909091,25.2723073 Z M10,25.2723073 C10,24.0675543 10.968109,23.0909091 12.1813982,23.0909091 L18.7276927,23.0909091 C19.9324457,23.0909091 20.9090909,24.0590181 20.9090909,25.2723073 L20.9090909,31.8186018 C20.9090909,33.0233548 19.9409819,34 18.7276927,34 L12.1813982,34 C10.9766452,34 10,33.031891 10,31.8186018 L10,25.2723073 Z" id="path-1"></path><mask id="mask-2" maskContentUnits="userSpaceOnUse" maskUnits="objectBoundingBox" x="0" y="0" width="24" height="24" fill="white"><use xlink:href="#path-1"></use></mask></defs><use mask="url(#mask-2)" stroke-width="2" fill="none" xlink:href="#path-1"></use></svg>';

gbks.icons.logo = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" preserveAspectRatio="xMidYMid" width="50" height="50" viewBox="0 0 96.006 96.006"><path d="M47.919,96.000 C21.454,96.000 -0.000,74.510 -0.000,48.000 C-0.000,21.490 21.454,0.000 47.919,0.000 C74.384,0.000 95.839,21.490 95.839,48.000 C95.839,74.510 74.384,96.000 47.919,96.000 ZM47.918,3.177 C23.212,3.177 3.185,23.238 3.185,47.986 C3.185,72.733 23.212,92.795 47.918,92.795 C72.624,92.795 92.652,72.733 92.652,47.986 C92.652,23.238 72.624,3.177 47.918,3.177 ZM54.397,67.191 L50.421,53.569 C49.393,50.060 48.639,46.895 47.885,42.836 L47.748,42.836 C47.062,46.964 46.171,50.266 45.211,53.569 L40.961,67.191 L33.078,67.191 L23.207,33.686 L31.844,33.686 L35.340,48.890 C36.094,52.468 36.848,56.114 37.465,59.761 L37.602,59.761 C38.288,56.114 39.385,52.399 40.344,48.959 L44.663,33.686 L51.518,33.686 L55.700,48.546 C56.728,52.468 57.619,56.114 58.373,59.761 L58.510,59.761 C59.059,56.114 59.813,52.468 60.704,48.546 L64.406,33.686 L72.701,33.686 L62.212,67.191 L54.397,67.191 Z" transform="translate(0.08 0)"/></svg>';

gbks.icons.flag = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" width="50px" height="50px" viewBox="0 0 50 50" enable-background="new 0 0 50 50" xml:space="preserve"><path fill="none" stroke-width="2" stroke-linecap="round" stroke-miterlimit="10" d="M49,4v25c0,0-5.273,3-12,3  c-11.929,0-15.869-4-24-4S1,30,1,30V3c0,0,2.085-2,12-2s14.047,6,24,6C43.281,7,48.13,4.471,49,4z"/><line fill="none" stroke-width="2" stroke-linecap="round" stroke-miterlimit="10" x1="1" y1="3" x2="1" y2="49"/></svg>';

gbks.icons.settings = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" width="50px" height="50px" viewBox="0 0 50 50" enable-background="new 0 0 50 50" xml:space="preserve"><path fill="none" stroke-width="2" stroke-linecap="round" stroke-miterlimit="10" d="M49,27.954v-6l-7.141-1.167  c-0.423-1.691-1.087-3.281-1.962-4.737l4.162-5.932l-4.243-4.241l-5.856,4.21c-1.46-0.884-3.06-1.558-4.763-1.982l-1.245-7.106h-6  l-1.156,7.083c-1.704,0.418-3.313,1.083-4.777,1.963L10.18,5.873l-4.243,4.241l4.107,5.874c-0.888,1.47-1.563,3.077-1.992,4.792  L1,21.954v6l7.044,1.249c0.425,1.711,1.101,3.318,1.992,4.79l-4.163,5.823l4.241,4.245l5.881-4.119  c1.468,0.882,3.073,1.552,4.777,1.973l1.18,7.087h6l1.261-7.105c1.695-0.43,3.297-1.105,4.751-1.99l5.922,4.155l4.242-4.245  l-4.227-5.87c0.875-1.456,1.539-3.048,1.958-4.739L49,27.954z M25,33c-4.418,0-8-3.582-8-8s3.582-8,8-8s8,3.582,8,8S29.418,33,25,33  z"/></svg>';

gbks.icons.facepalm = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 0 50 50" enable-background="new 0 0 50 50" xml:space="preserve"><path fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" d="  M22.3,46.9c0,0,16.4,2.6,19.5-14.2c1.5,0,3.4-3.3,3.4-6.5c0-1.2-0.8-2-1.5-2.4"/><path fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" d="  M14,22c0-6,5-10.3,5.4-12c2.2,12.8,21-1,21,17.5c0-3.2,3.5-3.8,3.5-3.8s0.7-5,0.7-7.6C44.6,10.7,40,1,27.3,1  C14.9,1,9.4,9.3,9.4,16.8c0,0-0.1,1.4,0.4,4.3"/><path fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" d="  M32.7,26.8c0.7-0.2,1.2-1.2,1-2c-0.3-1.2-1.6-1.3-2.4-1.3c-0.8,0.1-10.8,1.8-15.9,5.7c-0.3-1.7-0.5-4.6-1.1-6.4  c-0.8-2.4-2.9-3.7-4.5-1.7c0.6,1.6,0.9,7.3,0.9,10.9c0,5.6-3.2,10.6-4.2,13.6"/><path fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" d="  M35.5,30.3c1-0.3,1.5-1.5,1.2-2.5c-0.3-0.9-1.4-1.1-2.1-1.1c-0.8,0-2.5-0.4-11,2.9"/><path fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" d="  M34.4,34.8c2-0.7,2.4-2.1,2.3-2.8c-0.2-1-1.1-1.6-2-1.5c-3.6,0.5-9.4,3.1-9.4,3.1"/><path fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" d="  M18,49c0,0,2.9-0.9,5.2-2.8c1.1-1,2.7-2.8,4.5-4.1c0.9-0.6,7.6-3.9,7.6-3.9c1.1-0.4,1.4-1.6,1-2.3c-0.3-0.6-1.3-1.4-2-1.1  c0,0-3,0.9-6.5,2.6"/></svg>';

gbks.icons.dropbox = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 0 50 50" enable-background="new 0 0 50 50" xml:space="preserve"><polyline fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" points="10,31.9 10,39.1 25,49 40,39.2 40,31.9 "/><g><g><polygon fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" points="    49,11 34.8,2 25,10.1 39.7,18.6   "/></g><g><polygon fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" points="    1,26.5 15.6,35.1 25,27.8 11,19   "/></g><g><polygon fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" points="    15.6,2 1,11.4 11,19 25,10.1   "/></g><g><polygon fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" points="    25,27.8 34.6,35.1 49,26.5 39.7,18.6   "/></g></g></svg>';

gbks.icons.loader = '<svg width="20px" height="20px" viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path d="M17.041753,5.23684211 C15.4809279,2.93141767 12.8669823,1.5 10,1.5 C5.30577395,1.5 1.5,5.30577395 1.5,10 C1.5,10.2761424 1.27614237,10.5 1,10.5 C0.723857625,10.5 0.5,10.2761424 0.5,10 C0.5,4.7534892 4.7534892,0.5 10,0.5 C13.0169668,0.5 15.7837755,1.91880925 17.5526316,4.23530622 L17.5526316,1.47368421 C17.5526316,1.19754184 17.7764892,0.973684211 18.0526316,0.973684211 C18.328774,0.973684211 18.5526316,1.19754184 18.5526316,1.47368421 L18.5526316,6.23684211 L17.9387901,6.23684211 C17.9322317,6.23697135 17.92568,6.23697097 17.9191378,6.23684211 L13.7894737,6.23684211 C13.5133313,6.23684211 13.2894737,6.01298448 13.2894737,5.73684211 C13.2894737,5.46069973 13.5133313,5.23684211 13.7894737,5.23684211 L17.041753,5.23684211 Z M2.95861646,14.7632703 C4.51920189,17.0685525 7.13310324,18.5 10,18.5 C14.694226,18.5 18.5,14.694226 18.5,10 C18.5,9.72385763 18.7238576,9.5 19,9.5 C19.2761424,9.5 19.5,9.72385763 19.5,10 C19.5,15.2465108 15.2465108,19.5 10,19.5 C6.98292953,19.5 4.21600701,18.0809903 2.44736842,15.7643514 L2.44736842,18.5263158 C2.44736842,18.8024582 2.2235108,19.0263158 1.94736842,19.0263158 C1.67122605,19.0263158 1.44736842,18.8024582 1.44736842,18.5263158 L1.44736842,13.7631023 L6.21058187,13.7636316 C6.48672424,13.7636623 6.710557,13.9875448 6.71052631,14.2636871 C6.71049563,14.5398295 6.48661313,14.7636623 6.21047076,14.7636316 L2.95861646,14.7632703 Z" stroke="none" fill-rule="nonzero"></path></svg>';

gbks.icons.tag = '<svg width="17px" height="16px" viewBox="0 0 17 16" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path d="M10.6617647,11.71875 L4.54411765,11.71875 L4.23529412,15 L3.29411765,15 L3.60294118,11.71875 L0.188235294,11.71875 L0.282352941,10.78125 L3.69117647,10.78125 L4.26470588,4.6875 L0.847058824,4.6875 L0.941176471,3.75 L4.35294118,3.75 L4.70588235,0 L5.64705882,0 L5.29411765,3.75 L11.4117647,3.75 L11.7647059,0 L12.7058824,0 L12.3529412,3.75 L16,3.75 L15.9058824,4.6875 L12.2647059,4.6875 L11.6911765,10.78125 L15.3411765,10.78125 L15.2470588,11.71875 L11.6029412,11.71875 L11.2941176,15 L10.3529412,15 L10.6617647,11.71875 Z M10.75,10.78125 L11.3235294,4.6875 L5.20588235,4.6875 L4.63235294,10.78125 L10.75,10.78125 Z" stroke="none" fill-rule="evenodd"></path></svg>';

gbks.icons.video = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 0 50 50" style="enable-background:new 0 0 50 50" xml:space="preserve"><path d="M25,2C12.317,2,2,12.317,2,25s10.317,23,23,23s23-10.317,23-23S37.683,2,25,2z M19,35V15l17,10L19,35z"/></svg>';

gbks.icons.messageFilled = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" width="50px" height="50px" viewBox="0 0 50 50" enable-background="new 0 0 50 50" xml:space="preserve"><rect x="0" stroke="none" fill="none" width="50" height="50"/><g><path d="M50,12.436c-3.051,2.655-10.144,8.828-15.115,13.155L50,37.486V12.436z"/><path d="M21.666,28.642C23.072,29.867,24.466,30,25,30s1.928-0.133,3.334-1.358C29.752,27.406,48.046,11.487,50,9.786V7H0v2.781   C3.012,12.403,20.299,27.45,21.666,28.642z"/><path d="M33.349,26.928c-1.937,1.686-3.347,2.913-3.701,3.222C27.731,31.819,25.759,32,25,32s-2.731-0.181-4.648-1.851   c-0.351-0.306-1.76-1.533-3.701-3.223L0,40.075V43h50v-2.969L33.349,26.928z"/><path d="M15.115,25.59C10.214,21.323,3.231,15.244,0,12.431v25.094L15.115,25.59z"/></g></svg>';


/* 

Global render helper.

*/

var gbks = gbks || {};
gbks.render = gbks.render || {};

gbks.render.avatar = function(data, options) {
    var classes = ['avatar'];

    options = $.extend({
        size: null
    }, options);

    if(options.big === true) {
        classes.push('size--big');
    }

    h = '<a href="'+data.url+'" class="'+classes.join(' ')+'" title="'+data.name+'">';

    if(data.picture) {
        h += '<img src="'+data.picture.url+'" width="'+data.picture.width+'" height="'+data.picture.height+'" alt="'+data.name+'"/>';
    } else {
        var bits = data.name.split(' ');
        var initials = '';
        for(var i=0; i<bits.length; i++) {
            initials += bits[i].charAt(0);
        }

        h += '<span class="initials">'+initials+'</span>';
    }
    h += '</a>';

    return h;
};

gbks.render.imageTiles = function(data) {
    var h = '';
    for(var i=0; i<data.length; i++) {
        h += gbks.render.imageTile(data[i]);
    }
    return h;
};

gbks.render.imageTile = function(data) {
    var file = data.images.original;

    var userId;
    if(config && config.user) {
        userId = config.user.id;
    }

    if(file.width == 0 || file.height == 0) {
        console.log('gbks.render.imageTile image without size', data);
        return '';
    }

    var isOwner = (userId && userId == data.ownerId);
    var isSaver = (userId && data.savers && data.savers.indexOf(userId) !== -1);

    var isVideo = data.video;
    var isNSFW = data.mature;
    var isLiked = (userId && data.likers && data.likers.indexOf(userId) !== -1);
    var isSaved = (isOwner || isSaver);

    console.log('gbks.render.imageTile', data, userId, isSaved, config);

    var style = null;
    var styleProperties = [];
    if(data.color) {
        styleProperties.push('background-color: #'+data.color);
    }
    if(styleProperties.length > 0) {
        style = ' '+styleProperties.join('; ');
    }

    var tileClasses = ['tile', 'tile--image'];
    if(isNSFW) {
        tileClasses.push('is-nsfw');
    }

    var largeFile = data.images.large;
    var xlargeFile = data.images.xlarge;

    h = '';
    h += '<div class="'+tileClasses.join(' ')+'" data-id="'+data.id+'" data-w="'+file.width+'" data-h="'+file.height+'" data-likes="'+data.likeCount+'" data-saves="'+data.saveCount+'"'+(style ? style : '')+'>';
    h += '  <div class="wrap">';
    h += '    <div class="content">';
    h += '      <div class="options">';
    h += '        <a href="/signup?ref=tile&imageId='+data.id+'" class="option button--save'+(isSaved ? ' is-active' : '')+'" data-id="'+data.id+'">';
    h += gbks.icons.plus;
    h += '<span>'+(isSaved ? 'Saved' : 'Save')+'</span>';
    h += '        </a>';
    
    h += '<a href="/signup?ref=tile&imageId='+data.id+'" class="option button--like'+(isLiked ? ' is-active' : '')+'" data-id="'+data.id+'">';
    h += gbks.icons.heart;
    h += '<span>'+(isLiked ? 'Liked' : 'Like')+'</span>';
    h += '        </div>';
    h += '      </a>';

    h += '      <a href="'+data.url+'">';
    h += '        <img src="'+largeFile.url+'" srcset="'+largeFile.url+' 1x, '+xlargeFile.url+' 2x" width="'+largeFile.width+'" height="'+largeFile.height+'" alt="'+file.title+'">';
    h += '      </a>';

    if(isNSFW) {
        h += '<div class="nsfw-cover">';
        h += '  <div class="wrap">';
        h += '    <div class="content">';
        h += '      '+gbks.icons.facepalm;
        h += '    </div>';
        h += '  </div>';
        h += '</div>';
    }

    if(isVideo) {
        h += '<div class="icon--video">'+gbks.icons.video+'</div>';
    }

    h += '</div></div></div>';

    return h;
};

gbks.render.imageOptions = function(imageId) {
    var h = '<div class="image-options"><ul>';

    var id = '';
    if(imageId) {
        id = ' data-id="'+imageId+'"';
    }

    h += '<li>';
    h += '<a href="/signup?ref=save&imageId='+imageId+'" class="button button--save" title="Save image"'+id+'>';
    h += gbks.icons.plus+'<span>Save</span>';
    h += '</a>';
    h += '</li>'

    h += '<li>';
    h += '<a href="/signup?ref=save&imageId='+imageId+'"" class="button button--like" title="Like image"'+id+'>';
    h += gbks.icons.heart+'<span>Like</span>';
    h += '</a>';
    h += '</li>';

    h += '<li>';
    h += '<a href="/signup?ref=save&imageId='+imageId+'"" class="button button--share" title="Share image"'+id+'>';
    h += gbks.icons.share+'<span>Share</span>';
    h += '</a>';
    h += '</li>';

    h += '</ul></div>';

    return h;
};

gbks.render.userListItem = function(user) {
    var isFollowing = user.followed;

    var h = '<div class="user-list-item">';
    h += gbks.render.avatar(user, {big: true});
    h += '<h4><a href="'+user.url+'">'+user.name+'</a></h4>';

    if(user.bio && user.bio.length > 0) {
        h += '<p>'+user.bio+'</p>';
    }

    h += '<a href="/signup" class="button type--follow button--follow-user'+(isFollowing ? ' is-active' : '')+'" data-id="'+user.id+'">'+(isFollowing ? 'Following' : 'Follow')+'</a>';
    h += '</div>';

    return h;
};

gbks.render.sourceListItem = function(source) {
    var isFollowing = source.followed;

    var h = '<div class="source-list-item">';
    h += gbks.icons.link;
    h += '<h4><a href="'+source.url+'">'+source.name+'</a></h4>';

    if(source.description && source.description.length > 0) {
        h += '<p>'+source.description+'</p>';
    }

    h += '<a href="/signup" class="button type--follow button--follow-source'+(isFollowing ? ' is-active' : '')+'" data-id="'+source.id+'">'+(isFollowing ? 'Following' : 'Follow')+'</a>';
    h += '</div>';

    return h;
};

gbks.render.groupListItem = function(group) {
    var isFollowing = group.followed;

    var h = '<div class="group-list-item">';
    h += gbks.icons.group;
    h += '<h4><a href="'+group.url+'">'+group.name+'</a></h4>';
    h += '<p>By <a href="'+group.owner.url+'">'+group.owner.name+'</a></p>';
    h += '<a href="/signup" class="button type--follow button--follow-group'+(isFollowing ? ' is-active' : '')+'" data-id="'+group.id+'">'+(isFollowing ? 'Following' : 'Follow')+'</a>';
    h += '</div>';

    return h;
};

gbks.render.gridImage = function(image) {
    var file = image.images.medium;

    var classes = [];
    if(image.mature) {
        classes.push('is-nsfw');
    }
    var classText = '';
    if(classes.length > 0) {
        classText = ' class="'+classes.join(' ')+'"';
    }

    var styles = [];
    if(image.color) {
        styles.push('background-color: #'+image.color+';');
    }
    var stylesText = '';
    if(styles.length > 0) {
        stylesText = ' style="'+styles.join(' ')+'"';
    }

    var h = '<a href="'+image.url+'" data-id="'+image.id+'"'+classText+stylesText+'>';
    h += '<img src="'+file.url+'" alt="'+image.title+'" width="'+file.width+'" height="'+file.height+'"/>';

    if(image.mature) {
        h += '<div class="nsfw-cover"><div class="wrap"><div class="content">';
        h += gbks.icons.facepalm;
        h += '</div></div></div>';
    }

    if(image.video) {
        h += '<div class="icon--video">'+gbks.icons.video+'</div>';
    }

    h += '</a>';

    return h;
};

gbks.render.comment = function(comment) {
    var hasImage = comment.image;
    var isOwner = (config && config.user && config.user.id == comment.userId);

    console.log('gbks.render.comment', comment);

    var h = '';

    h += '<div class="comment-list-item'+(hasImage ? ' has-image' : '')+'">';

    h += gbks.render.avatar(comment.user);

    if(hasImage) {
        var file = comment.image.images.medium;
        h += '<a href="'+comment.image.url+'" class="image-link">';
        h += '<img src="'+file.url+'" width="'+file.width+'" height="'+file.height+'">';
        h += '</a>';
    }

    h += '<p>';

    h += '<b><a href="'+comment.user.url+'">'+comment.user.name+'</a></b>';
    h += '<span>'+gbks.formatTime(comment.created)+'</span>';

    if(isOwner) {
        h += '<a href="/editnote?commentId='+comment.id+'" class="button--edit">Edit</a>';
    }

    h += '<br/>';
    h += comment.comment;

    h += '</div>';

    return h;

// .comment-list-item(class = (image ? 'has-image' : ''))
//     a.avatar(href="#")
//         img(src="http://www.wookmark.com/images/profile/60/13165_istanislavcuk.jpg" width="60" height="60" alt="")

//     if image
//         a.image-link(href='http://www.wookmark.com/image/634522/brand-new-new-identity-for-sydney-opera-house-by-interbrand-and-collider')
//             img(src= image, title='Brand New: New Identity for Sydney Opera House by Interbrand and Collider', width='80', height='60', alt='')

//     p
//         b
//             a(href="#")= username
//             span= date
//             a.button--edit(href="#") Edit
//         br
//         = comment
};





var gbks = gbks || {};

gbks.ScrollLoader = function() {

	this.init = function(callback) {
		this.log = false;
		this.interval = null;
		this.callback = callback;
	};

    this.start = function() {
        if(this.log) {
            console.log('ScrollLoader.startEndlessScroll');
        }

        clearInterval(this.interval);
        this.interval = setInterval($.proxy(this.evaluateScrollPosition, this), 100);
    };

    this.stop = function() {
        if(this.log) {
            console.log('ScrollLoader.stopEndlessScroll');
        }

        clearInterval(this.interval);
    };

    this.evaluateScrollPosition = function() {
        var preloadDistance = 750;
        var position = this.getPageHeight() - this.getScrollHeight();
        var loadMore = (position < preloadDistance);

        if(this.log) {
            console.log('ScrollLoader.evaluateScrollPosition', position, this.getPageHeight(), this.getScrollHeight(), loadMore);
        }

        if(loadMore) {
            this.stop();

            this.callback();
        }
    };

    this.getScrollHeight = function(){
        var y;
        // all except Explorer
        if (self.pageYOffset) {
            y = self.pageYOffset;
        } else if (document.documentElement && document.documentElement.scrollTop) {
            y = document.documentElement.scrollTop;
        } else if (document.body) {
            y = document.body.scrollTop;
        }
        return parseInt(y)+this.getWindowHeight();
    };

    this.getWindowHeight = function(){
        var frameWidth;
        var frameHeight;
        if (self.innerWidth) {
            frameWidth = self.innerWidth;
            frameHeight = self.innerHeight;
        } else if (document.documentElement && document.documentElement.clientWidth) {
            frameWidth = document.documentElement.clientWidth;
            frameHeight = document.documentElement.clientHeight; 
        } else if (document.body) {
            frameWidth = document.body.clientWidth;
            frameHeight = document.body.clientHeight;
        }
        return parseInt(frameHeight);
    };

    this.getPageHeight = function(){
        return $(document).height();
    };

};




var gbks = gbks || {};

/**

Turns a time stamp into
- 3 weeks ago
- 5 days ago
- 6 hours ago
- 27 minutes ago
- 13 seconds ago

 */

gbks.formatTime = function(timestamp) {
    var now = new Date();
    var time = now.getTime() / 1000;

    var seconds = timestamp - time;
    var isPast = (seconds < 0);
    seconds = Math.abs(seconds);

    var intervals = {};
    intervals.minute = 60;
    intervals.hour = intervals.minute*60;
    intervals.day = intervals.hour*24;
    intervals.week = intervals.day*7;

    var weeks = Math.floor(seconds / intervals.week);
    seconds -= weeks*intervals.week;

    var days = Math.floor(seconds / intervals.day);
    seconds -= days*intervals.day;

    var hours = Math.floor(seconds / intervals.hour);
    seconds -= hours*intervals.hour;

    var minutes = Math.floor(seconds / intervals.minute);
    seconds -= minutes*intervals.minute;

    seconds = Math.round(seconds);
    seconds = Math.max(1, seconds);

    console.log('formatTime', weeks, days, hours, minutes, seconds);

    var result = seconds+' second'+(seconds != 1 ? 's' : '');
    if(weeks > 1) {
        result = weeks+' week'+(weeks != 1 ? 's' : '');
    } else if(days > 1) {
        result = days+' day'+(days != 1 ? 's' : '');
    } else if(hours > 1) {
        result = hours+' hour'+(hours != 1 ? 's' : '');
    } else if(minutes > 1) {
        result = minutes+' minute'+(minutes != 1 ? 's' : '');
    }
    result += ' ago';

    return result;
};


// Global permissions helper.

/*

var config = {
    "user":null,
    "permissions": {
        "isFree":false,
        "isBasicUnpaid":false,
        "isBasic":false,
        "isPlus":false,
        "isBeta":false,
        "isAdmin":false,
        "saveImages":false,
        "likeImages":false,
        "createGroups":false,
        "saveToDropbox":false,
        "uploadImages":false,
        "followOthers":false,
        "connectToDropbox":false
    }
}

 */

var gbks = gbks || {};
gbks.permissions = gbks.permissions || {

    userIsLoggedIn: function() {
        return (config && config.user);
    },

    userIsFree: function() {
        return (config && config.permissions && config.permissions.isFree);
    },

    userIsBasicUnpaid: function() {
        return (config && config.permissions && config.permissions.isBasicUnpaid);
    },

    userIsBasic: function() {
        return (config && config.permissions && config.permissions.isBasic);
    },

    userIsPlus: function() {
        return (config && config.permissions && config.permissions.isPlus);
    },

    userIsBeta: function() {
        return (config && config.permissions && config.permissions.isBeta);
    },

    userIsAdmin: function() {
        return (config && config.permissions && config.permissions.isAdmin);
    },

    canSaveImages: function() {
        return (config && config.permissions && config.permissions.saveImages);
    },

    canLikeImages: function() {
        return (config && config.permissions && config.permissions.likeImages);
    },

    canCreateGroups: function() {
        return (config && config.permissions && config.permissions.createGroups);
    },

    canSaveToDropbox: function() {
        return (config && config.permissions && config.permissions.saveToDropbox);
    },

    canUploadImages: function() {
        return (config && config.permissions && config.permissions.uploadImages);
    },

    canFollowOthers: function() {
        return (config && config.permissions && config.permissions.followOthers);
    },

    canConnectToDropbox: function() {
        return (config && config.permissions && config.permissions.connectToDropbox);
    }

};



var gbks = gbks || {};

gbks.WindowDropper = function() {
    
    this.init = function() {
        this.id = 'WindowDropper';
        this.log = !false;
        this.isActive = false;

        this.c = {
            dragging: 'is-dragging'
        };

        this.doc = $(document);
        this.body = $('body');

        this.dragEnterMethod = $.proxy(this.onDragEnter, this);
        this.dragOverMethod = $.proxy(this.onDragOver, this);
        this.dragLeaveMethod = $.proxy(this.onDragLeave, this);
        this.dropMethod = $.proxy(this.onDrop, this);
    };
    
    this.activate = function() {
        this.isActive = true;

        this.setupEvents();
    };
    
    this.deactivate = function() {
        this.isActive = false;

        this.clearEvents();
    };

    this.setupEvents = function() {
        this.doc.bind('dragenter', this.dragEnterMethod);
        this.doc.bind('dragover', this.dragOverMethod);
        this.doc.bind('dragleave', this.dragLeaveMethod);
        this.doc.bind('drop', this.dropMethod);
    };

    this.clearpEvents = function() {
        this.doc.unbind('dragenter', this.dragEnterMethod);
        this.doc.unbind('dragover', this.dragOverMethod);
        this.doc.unbind('dragleave', this.dragLeaveMethod);
        this.doc.unbind('drop', this.dropMethod);
    };

    this.onDragEnter = function(event) {
        if(this.log) {
            // console.log('WindowDropper.onDragEnter');
        }

        this.body.addClass(this.c.dragging);
    };

    this.onDragOver = function(event) {
        if(this.log) {
            // console.log('WindowDropper.onDragOver');
        }

        event.preventDefault();
    };

    this.onDragLeave = function(event) {
        if(this.log) {
            // console.log('WindowDropper.onDragLeave');
        }

        this.body.removeClass(this.c.dragging);
    };

    this.onDrop = function(event) {
        if(this.log) {
            console.log('WindowDropper.onDrop', event.originalEvent.dataTransfer);
        }

        event.preventDefault();

        this.body.removeClass(this.c.dragging);

        // Check if files were dropped
        var files = event.originalEvent.dataTransfer.files;
        if(files.length > 0) {
            gbks.events.call(gbks.event.DropImages, {files: files});
            // var file;
            // for(var i=0; i<files.length; i++) {
            //  this.handleDroppedFile(files[i]);
            // }
        }

        // Check if a URL was dropped
        var url = event.originalEvent.dataTransfer.getData('URL');
        if(url && url.length > 0) {
            gbks.events.call(gbks.event.DropUrl, {url: url});
            // this.handleDroppedUrl(url);
        }

        // Check if text was dropped
        var text = event.originalEvent.dataTransfer.getData('Text');
        if(text && text.length > 0 && text != url) {
            gbks.events.call(gbks.event.DropText, {text: text});
            // this.handleDroppedText(text);
        }
    };

    this.handleDroppedFile = function(file) {
        if(this.log) {
            console.log('WindowDropper.handleDroppedFile', file);
        }

        // Load and display the image
    };

    this.handleDroppedUrl = function(url) {
        if(this.log) {
            console.log('WindowDropper.handleDroppedUrl', url);
        }

        // Check if the file extension is that of an image
        

        // Load and display the image
    };

    this.handleDroppedText = function(text) {
        if(this.log) {
            console.log('WindowDropper.handleDroppedText', text);
        }

        // Check if the text is a URL and if it's an image
        

        // Load and display the image
    };

};



Vue.component('component-avatar', {

    props: [
        'user',
        'size'
    ],

    computed: {
        classObject: function() {
            var c = ['avatar'];

            if(this.size == 'big') {
                c.push('size--big');
            }

            return c.join(' ');
        },

        initials: function() {
            var bits = this.user.name.split(' ');
            var initials = '';
            for(var i=0; i<bits.length; i++) {
                initials += bits[i].charAt(0);
            }
            return initials;
        }
    },

    template: `
        <a :class="classObject" :href="user.url" :title="user.name">
            <img v-if="this.user.picture" :src="user.picture.url" :width="user.picture.width" :height="user.picture.height" :alt="user.name">
            <span v-else class="initials">{{ initials }}</span>
        </a>
    `

});



var gbks = gbks || {};

/*

Dropdown for selecting people from a list of contacts.

This is a self-contained component that creates its own HTML.
Just give it a container and it will create a dropdown head and content,
as well as the form fields needed.

var dropdown = new gbks.ContactsDropdown();
dropdown.init(container);

 */

gbks.ContactsDropdown = function() {
  
    this.init = function(container, options) {
        this.id = 'ContactsDropdown';
        this.isActive = false;
        this.log = !false;

        this.options = $.extend({
            action: 'Add others to this conversation',
            verb: 'notified'
        }, options);

        if(this.log) {
            console.log('ContactsDropdown.init');
        }

        this.c = {
            canvas: 'contacts-dropdown',
            toggle: 'contacts-dropdown__toggle',
            dropdown: 'contacts-dropdown__dropdown',
            active: 'is-active',
            visible: 'is-visible',
            hidden: 'is-hidden',
            error: 'has-error',
            loading: 'is-loading',
            loaded: 'is-loaded',
            searchEmpty: 'search-is-empty'
        };

        this.icons = {
            down: gbks.icons.down
        };

        this.e = {
            container: null,
            toggle: null,
            toggleContent: null,
            dropdown: null,
            items: null,
            search: null,
            searchField: null,
            teamField: null,
            userField: null,
            emailField: null,
        };

        this.contacts = {
            loading: false, // Are we currently loading data
            loaded: false, // Did we receive data already from the server
            error: false, // Did loading data return an error
            show: false, // Whether contacts dropdown should be visible
            data: null,
        };

        this.searchKeyUpMethod = $.proxy(this.onSearchKeyUp, this);
        this.searchBlurMethod = $.proxy(this.onSearchBlur, this);
        this.clickDocumentMethod = $.proxy(this.onClickDocument, this);

        gbks.events.listen(gbks.event.GetUserContactsSuccess, $.proxy(this.onLoadContacts, this), this.id);
        gbks.events.listen(gbks.event.GetUserContactsError, $.proxy(this.onLoadContactsError, this), this.id);

        // Initiate instance.
        this.setup(container);
    };

    this.setup = function(container) {
        if(this.log) {
            console.log('ContactsDropdown.setup');
        }
        
        this.e.container = container;

        // Create the overall wrapper.
        this.createCanvas();

        // Create the toggle element.
        this.createHead();

        // Bind the toggle click.
        this.e.toggle.bind('click tap', $.proxy(this.onClickToggle, this));
    };

    this.createCanvas = function() {
        if(this.log) {
            console.log('ContactsDropdown.createCanvas');
        }
        
        var h = '<div class="'+this.c.canvas+'"></div>';
        this.e.canvas = $(h);
        this.e.container.append(this.e.canvas);
    };

    this.createHead = function() {
        if(this.log) {
            console.log('ContactsDropdown.createHead');
        }
        
        var h = '<a class="'+this.c.toggle+'" href="#"><span>'+this.options.action+'</span>'+this.icons.down+'</a>';

        this.e.toggle = $(h);
        this.e.toggleContent = $('span', this.e.toggle);

        this.e.canvas.append(this.e.toggle);
    };

    this.onClickToggle = function(event) {
        if(this.log) {
            console.log('ContactsDropdown.onClickToggle');
        }
        
        event.preventDefault();
        event.stopPropagation();

        if(this.isActive) {
            this.hide();
        } else {
            this.show();
        }
    };

    this.onClickDocument = function(event) {
        if(this.log) {
            console.log('ContactsDropdown.onClickDocument');
        }
        
        var target = $(event.target);
        var canvas = target.parents('.'+this.c.canvas);
        if(canvas.length == 0) {
            this.hide();
        }
    };

    /**
    * Showing/hiding/creating dropdown.
    */

    this.show = function() {
        if(this.log) {
            console.log('ContactsDropdown.show');
        }
        
        this.isActive = true;

        // Create the dropdown holder if we don't have it yet.
        if(!this.e.dropdown) {
            this.createDropdown();
        }

        // Load the data if we haven't done so.
        if(!this.contacts.loaded) {
            if(!this.contacts.loading) {
                this.loadContacts();
            }
        }

        // Update the content based on the current state.
        this.updateDropdownContent();

        // Make it visible
        this.e.canvas.addClass(this.c.active);

        $(document).bind('click tap', this.clickDocumentMethod);
    };

    this.hide = function() {
        if(this.log) {
            console.log('ContactsDropdown.hide');
        }
        
        this.isActive = false;

        this.updateFormData();

        this.e.canvas.removeClass(this.c.active);

        $(document).unbind('click tap', this.clickDocumentMethod);
    };

    this.updateDropdownContent = function() {
        if(this.log) {
            console.log('ContactsDropdown.updateDropdownContent');
        }
        
        var h = false;

        if(this.contacts.loaded) {
            var list = $('ol', this.e.dropdown);
            if(list.length == 0) {
            // Search field.
                h = '<div class="search">';
                h += '<input type="text" placeholder="Search...">';
                h += '<div class="magnify">'+gbks.icons.magnify+'</div>';
                h += '<div class="clear">'+gbks.icons.close+'</div>';
                h += '</div>';
                h += '<p class="search-no-results">No matches</p>';

                // Contacts
                h += '<ol>';

                var check = gbks.icons.check;

                // Teams.
                var i=0, team, user, email;
                if(this.contacts.data.teams) {
                    for(; i<this.contacts.data.teams.length; i++) {
                        team = this.contacts.data.teams[i];
                        h += '<li data-type="team" data-id="'+team.id+'" data-name="'+team.name+'">';
                        h += team.name+check;
                        h += '</li>';
                    } 
                }   

                // Users.
                if(this.contacts.data.users) {
                    for(; i<this.contacts.data.users.length; i++) {
                        user = this.contacts.data.users[i];
                        h += '<li data-type="user" data-id="'+user.id+'" data-name="'+user.name+'">';
                        h += user.name+check;
                        h += '</li>';
                    } 
                }

                // Emails.
                if(this.contacts.data.emails) {
                    for(; i<this.contacts.data.emails.length; i++) {
                        email = this.contacts.data.emails[i];
                        h += '<li data-type="email" data-id="'+email.id+'" data-name="'+email.email+'">';
                        h += email.email+check;
                        h += '</li>';
                    } 
                } 

                h +'</ol>';
            }
        } else if(this.contacts.error) {
            h = '<p class="error">Sorry, could not load your contacts.</p>';
        } else if(this.contacts.loading) {
            h = '<p class="loader">'+gbks.icons.loader+'</p>';
        }

        // console.log('ContactsDropdown.updateDropdownContent', h);

        if(h) {
            // Insert content.
            this.e.dropdown.html(h);

            // Hook up events.
            if(this.contacts.loaded) {
                this.e.search = $(".search", this.e.dropdown);
                this.e.searchField = $("input", this.e.search);
                this.e.searchField.bind('focus', $.proxy(this.onSearchFocus, this));

                this.e.clearSearch = $(".clear", this.e.search);
                this.e.clearSearch.bind('click tap', $.proxy(this.onSearchClickClear, this));

                this.e.items = $('li', this.e.dropdown);
                this.e.items.bind('click tap', $.proxy(this.onClickItem, this));

                this.e.searchField.focus();
            }
        }
    };

    this.createDropdown = function() {
        if(this.log) {
            console.log('ContactsDropdown.createDropdown');
        }
        
        this.e.dropdown = $('<div class="'+this.c.dropdown+'"></div>');
        this.e.canvas.append(this.e.dropdown);

        this.updateDropdownContent();
    };

    this.onClickItem = function(event) {
        if(this.log) {
            console.log('ContactsDropdown.onClickItem');
        }
        
        event.preventDefault();
        event.stopPropagation();

        var item = $(event.currentTarget);

        if(item.hasClass(this.c.active)) {
            item.removeClass(this.c.active);
        } else {
            item.addClass(this.c.active);
        }

        this.updateFormData();
    };

    /**
    * Search events.
    */

    this.onSearchFocus = function(event) {
        if(this.log) {
            console.log('ContactsDropdown.onSearchFocus');
        }
        
        this.e.search.addClass(this.c.active);

        // Adjust events.
        this.e.searchField.bind('blur', this.searchBlurMethod);
        $(document).bind('keyup', this.searchKeyUpMethod);
    };

    this.onSearchBlur = function(event) {
        if(this.log) {
            console.log('ContactsDropdown.onSearchBlur');
        }
        
        this.e.search.removeClass(this.c.active);

        // Adjust events.
        this.e.searchField.unbind('blur', this.searchBlurMethod);
        $(document).unbind('keyup', this.searchKeyUpMethod);
    };

    this.onSearchKeyUp = function(event) {
        if(this.log) {
            console.log('ContactsDropdown.onSearchKeyUp');
        }
        
        this.filterDropdown();
    };

    this.onSearchClickClear = function(event) {
        if(this.log) {
            console.log('ContactsDropdown.onSearchClickClear');
        }
        
        event.preventDefault();
        event.stopPropagation();

        this.e.searchField.val('');
        this.e.searchField.focus();
        this.e.searchField.removeClass('has-content');

        this.e.dropdown.removeClass(this.c.searchEmpty);

        this.filterDropdown();
    };

    /**
    * Loading contacts data.
    */

    this.loadContacts = function() {
        if(this.log) {
            console.log('ContactsDropdown.loadContacts');
        }
        
        if(this.contacts.loading === true || this.contacts.loaded === true) {
            return;
        }

        this.e.dropdown.addClass(this.c.loading);

        this.contacts.loading = true;

        gbks.events.call(gbks.event.GetUserContacts);
    };

    this.onLoadContacts = function(data) {
        if(this.log) {
            console.log('ContactsDropdown.onLoadContacts', data, this.e);
        }

        this.contacts.data = data;
        this.contacts.loaded = true;

        this.e.dropdown.addClass(this.c.loaded);
        this.e.dropdown.removeClass(this.c.loading);

        this.updateDropdownContent();
    };

    this.onLoadContactsError = function(data) {
        if(this.log) {
            console.log('ContactsDropdown.onLoadContactsError');
        }

        this.contacts.error = true;

        this.e.dropdown.addClass(this.c.error);
        this.e.dropdown.removeClass(this.c.loading);

        this.updateDropdownContent();
    };

    /**
    * Hide contacts that don't match the entered text.
    */
    this.filterDropdown = function() {
        if(this.log) {
            console.log('ContactsDropdown.filterDropdown');
        }
        
        var text = this.e.searchField.val();
        text = text.toLowerCase();

        if(text.length == 0) {
            this.e.searchField.removeClass('has-content');
            this.e.items.removeClass(this.c.hidden);
        } else {
            this.e.searchField.addClass('has-content');
            var i=0, length=this.e.items.length, item, itemText;
            var matches = 0;
            for(; i<length; i++) {
                item = $(this.e.items[i]);
                itemText = item.html().toLowerCase();

                if(itemText.indexOf(text) === -1) {
                    item.addClass(this.c.hidden);
                } else {
                    item.removeClass(this.c.hidden);
                    matches++;
                }
            }

            if(matches == 0) {
                this.e.dropdown.addClass(this.c.searchEmpty);
            } else {
                this.e.dropdown.removeClass(this.c.searchEmpty);
            }
        }
    };

    /**
    * Store the data from the dropdown in the form.
    */
    this.updateFormData = function() {
        if(this.log) {
            console.log('ContactsDropdown.updateFormData');
        }
        
        var teamIds = [];
        var userIds = [];
        var emailIds = [];

        var teamNames = [];
        var userNames = [];
        var emails = [];

        var i=0, length=this.e.items.length, item, type, id, name;
        for(; i<length; i++) {
            item = $(this.e.items[i]);

            if(item.hasClass(this.c.active)) {
                type = item.data('type');
                id = item.data('id');
                name = item.data('name');

                switch(type) {
                    case 'team':
                        teamIds.push(id);
                        teamNames.push(name);
                        break;
                    case 'user':
                        userIds.push(id);
                        userNames.push(name);
                        break;
                    case 'email':
                        emailIds.push(id);
                        emails.push(name);
                        break;
                }
            }
        }

        this.setupHiddenFields();

        // Store the data.
        this.e.teamField.val(teamIds.join(','));
        this.e.userField.val(userIds.join(','));
        this.e.emailField.val(emailIds.join(','));

        this.updateNotificationCopy(teamNames, userNames, emails);
    };

    // Collect (and create) the fields to store the data.
    this.setupHiddenFields = function() {
        if(!this.e.teamField) {
            this.e.teamField = $('input[name=teams]', this.e.container);

            if(this.e.teamField.length == 1) {

            } else {
                this.e.teamField = $('<input type="hidden" name="teams"/>');
                this.e.canvas.append(this.e.teamField);
            }
        }

        if(!this.e.userField) {
            this.e.userField = $('input[name=users]', this.e.container);

            if(this.e.userField.length == 1) {

            } else {
                this.e.userField = $('<input type="hidden" name="users"/>');
                this.e.canvas.append(this.e.userField);
            }
        }

        if(!this.e.emailField) {
            this.e.emailField = $('input[name=emails]', this.e.container);

            if(this.e.emailField.length == 1) {

            } else {
                this.e.emailField = $('<input type="hidden" name="emails"/>');
                this.e.canvas.append(this.e.emailField);
            }
        }
    };

    this.updateNotificationCopy = function(teamNames, userNames, emails) {
        if(this.log) {
            console.log('ContactsDropdown.updateNotificationCopy');
        }
        
        var all = teamNames.concat(userNames);
        all = all.concat(emails);

        var text = '';
        if(all.length == 0) {
            text = this.options.action;
        } else if(all.length == 1) {
            text = all[0]+' will be '+this.options.verb;
        } else {
            text = all.length+' people will be '+this.options.verb;
        }

        /*
        } else if(all.length == 1) {
            text = all[0]+' will be notified';
        } else if(all.length == 2) {
            text = all[0]+' and '+all[1]+' will be notified';
        } else {
            text = all[0]+' and '+(all.length-1)+' others will be notified';
        }
        */

        this.e.toggleContent.html(text);
    };

    this.reset = function() {
        this.e.items.removeClass(this.c.active);

        this.e.searchField.val('');

        this.filterDropdown();
        this.updateFormData();
    };

    this.destroy = function() {
        this.e.canvas.remove();
        this.e.canvas = null;
        
        gbks.events.unlisten(gbks.event.GetUserContactsSuccess, this.id);
        gbks.events.unlisten(gbks.event.GetUserContactsError, this.id);
    };
  
};


/*
Lightbox

Contained components
- Image
- Options
- Finder
- Source
- Similar

- Comments
- Colors
- Groups
- Tags

*/

var gbks = gbks || {};
gbks.common = gbks.common || {};

gbks.common.lightboxInstance = null;

gbks.common.Lightbox = function() {
  
    if(gbks.common.lightboxInstance) {
        gbks.common.lightboxInstance.hide();
        gbks.common.lightboxInstance = null;
    }
    gbks.common.lightboxInstance = this;
  
    this.init = function() {
        this.log = false;
        this.hideTimer = null;
        this.savePopup = null;
        this.sharePopup = null;
        this.isLoading = false;
        this.inTransition = false;

        this.classes = {
            visible: 'is-visible',
            active: 'is-active',
            hidden: 'is-hidden',
            loading: 'is-loading',
            tile: '.tile--image',
            lightboxActive: 'lightbox-active'
        };

        this.isAuthenticated = $('body').hasClass('auth');
        this.maxLightboxWidth = 1024;
        this.sidebarWidth = 352;
        this.minBoxHeight = 500;
        this.minImageAreaHeight = 500;
        this.imagePadding = 32;
        this.navHeight = 50;
        this.initHistory = window.location.href;
        this.initTitle = window.document.title;
        this.e = {
            canvas: null,
            win: $(window)
        };

        this.windowWidth = this.e.win.width();

        this.keyUpMethod = $.proxy(this.onKeyUp, this);

        // Components
        this.image = new gbks.ImagePod();
        this.image.init(this);

        this.options = new gbks.OptionsPod();
        this.options.init(this);

        this.finder = new gbks.FinderPod();
        this.finder.init(this);

        this.source = new gbks.SourcePod();
        this.source.init(this);

        this.similar = new gbks.SimilarPod();
        this.similar.init(this);

        this.secondaryOptions = new gbks.SecondaryOptionsPod();
        this.secondaryOptions.init(this);

        this.stats = new gbks.StatsPod();
        this.stats.init(this);

        this.comments = new gbks.CommentsPod();
        this.comments.init(this);

        this.colors = new gbks.ColorsPod();
        this.colors.init(this);

        this.groups = new gbks.GroupsPod();
        this.groups.init(this);

        this.tags = new gbks.TagsPod();
        this.tags.init(this);

        this.registerEvents();

        // History
        this.updateHistory();
    };

    this.registerEvents = function() {
        gbks.events.listen(gbks.event.ShowLightbox, $.proxy(this.onShowLightbox, this), this.id);
        // gbks.events.listen(gbks.event.UpdateLightbox, $.proxy(this.onUpdateLightbox, this), this.id);
        // gbks.events.listen(gbks.event.onHideLightbox, $.proxy(this.onHideLightbox, this), this.id);

        gbks.events.listen(gbks.event.LoadLightboxDataStart, $.proxy(this.onLoadLightboxDataStart, this), this.id);
        gbks.events.listen(gbks.event.LoadLightboxDataSuccess, $.proxy(this.onLoadLightboxDataSuccess, this), this.id);
        gbks.events.listen(gbks.event.LoadLightboxDataError, $.proxy(this.onLoadLightboxDataError, this), this.id);
    };

    this.unregisterEvents = function() {
        gbks.events.clearListener(this.id);
    };

    // Events

    this.onShowLightbox = function(data) {
        if(this.log) {
            console.log('Lightbox.onShowLightbox', data);
        }

        gbks.tracker.trackEvent('lightbox', 'show');

        this.show(data);
    };

    this.onUpdateLightbox = function(data) {
        if(this.log) {
            console.log('Lightbox.onUpdateLightbox', data);
        }

        gbks.tracker.trackEvent('lightbox', 'update');

        this.update(data);
    };

    this.onHideLightbox = function(data) {
        if(this.log) {
            console.log('Lightbox.onHideLightbox', data);
        }

        gbks.tracker.trackEvent('lightbox', 'hide');

        this.hide();
    };

    // History
  
    this.updateHistory = function() {
        this.initHistory = window.location.href;
        this.initTitle = window.document.title;
    };

    // Show
  
    this.show = function(data) {
        if(this.log) {
            console.log('Lightbox.show', data);
        }

        this.options.activate();

        this.createCanvas();
        this.collectElements();
        this.image.resize(null, data.width, data.height);
        this.createPlaceholder(data);

        $(document).keyup(this.keyUpMethod);
        $(window).bind('resize', this.resizeMethod);
        this.e.canvas.bind('scroll', this.scrollMethod);

        setTimeout($.proxy(this.showPartTwo, this, data), 25);
    };

    this.showPartTwo = function(data) {
        setTimeout($.proxy(this.transitionFromTile, this, data), 25);

        gbks.events.call(gbks.event.LoadLightboxData, {imageId: data.imageId});
    };

    // Update
    
    this.updateByImageId = function(imageId) {
        if(this.log) {
            console.log('Lightbox.updateByImageId', imageId);
        }

        this.removePreview();

        gbks.common.scroller.scrollToPosition(0, this.e.lightboxWrap[0]);

        gbks.events.call(gbks.event.LoadLightboxData, {imageId: imageId});
    };
  
    /**
    * Hide content.
    * Update lightbox content, start loading image.
    * Show lightbox once image loaded.
    */
    this.update = function(tile) {
        if(this.log) {
            console.log('Lightbox.update', tile);
        }

        this.activeTile = tile;

        var id = tile.attr('id');
        var bits = id.split('_');
        this.imageId = bits[1];

        // Hide content
        

        // Load new content
        gbks.events.call(gbks.event.LoadLightboxData, {imageId: imageId});

        if(!this.e.canvas) {
            this.createCanvas();
            this.collectElements();

            gbks.events.call(gbks.event.ShowLightbox);
        }

        this.updateFromId(this.imageId);

        gbks.events.call(gbks.event.UpdateLightbox);
    };

    this.onLoadLightboxDataStart = function(data) {
        if(this.log) {
            console.log('Lightbox.onLoadLightboxDataStart', data);
        }

        this.isLoading = true;

        this.e.canvas.addClass(this.classes.loading);

        // this.hideContent();
    };

    this.onLoadLightboxDataSuccess = function(data) {
        if(this.log) {
            console.log('Lightbox.onLoadLightboxDataSuccess 2', data);
        }

        this.imageData = data;

        this.isLoading = false;

        if(!this.inTransition) {
            this.refresh();
        }
    };

    this.refresh = function() {
        var data = this.imageData;

        gbks.common.history.push(this.imageData.image.url, this.imageData.image.title);

        this.image.refreshHTML(data);
        this.image.resize(data, this.imageData.width, this.imageData.height);
        this.image.refresh(data);

        this.options.refresh(data);
        this.secondaryOptions.refresh(data);
        this.finder.refresh(data);
        this.source.refresh(data);
        this.similar.refresh(data);
        this.stats.refresh(data);
        this.comments.refresh(data);
        this.colors.refresh(data);
        this.groups.refresh(data);
        this.tags.refresh(data);

        this.e.bottom.removeClass(this.classes.hidden);

        gbks.events.call(gbks.event.SetupNewContent, this.e.canvas);
    };

    this.onLoadLightboxDataError = function(data) {
        if(this.log) {
            console.log('Lightbox.onLoadLightboxDataError', data);
        }
    };

    // Hide

    this.hide = function() {
        if(this.e.canvas) {
            this.e.canvas.unbind('scroll', this.scrollMethod);

            this.e.canvas.remove();
            this.e.canvas = null;

            gbks.common.history.push(this.initHistory, this.initTitle);

            // this.options.hidePopups();

            // if(this.options.savePopup) {
            //     this.options.savePopup.hide();
            //     this.options.savePopup = null;
            // }

            // if(this.options.sharePopup) {
            //     this.options.sharePopup.hide();
            //     this.options.sharePopup = null;
            // }

            $(window).unbind('resize', this.resizeMethod);
        }
        $('body').removeClass(this.classes.lightboxActive);

        this.options.deactivate();

        gbks.events.call(gbks.event.HideLightbox);
    };
  
    this.createCanvas = function() {
        if(!this.e.canvas) {
            var html = '';
            html = '<div id="lightbox">';
            html += '  <div class="lightbox-wrap">';
            html += '    <div class="cover"></div>';
            html += '    <div class="loader"></div>';
            html += '    <a class="button--close" href="#">'+gbks.icons.close+'</a>';
            html += '    <div class="wrap">';
            html += '      <div class="content" id="lightbox-content">';
            html += '        <div class="nav">';
            html += '           '+gbks.icons.logo;
            html += '           <a href="#" class="button--close">'+gbks.icons.close+'</a>';
            html += '        </div>';
            html += '        <div class="top">';
            html += '          <div class="image">';
            html += '            <div class="wrap">';
            html += '              <div class="content">';
            html += '                <a href="#" target="_blank" class="image-link">';
            html += '                  <span></span>';
            html += '                  <img class="image-preview">';
            html += '                  <img class="image-original">';
            html += '                </a>';
            html += '              </div>';
            html += '            </div>';
            html += '          </div>';
            html += '          <div class="info">';
            html += '            <div class="pod options-pod">'+gbks.render.imageOptions()+'</div>';
            html += '            <div class="pod finder-pod"></div>';
            html += '            <div class="pod source-pod"></div>';
            html += '            <div class="pod similar-pod"></div>';
            html += '            <div class="pod secondary-options-pod"></div>';
            html += '          </div>';
            html += '        </div>';
            html += '        <div class="bottom is-hidden">';
            html += '          <div class="split">';
            html += '            <div class="left">';
            html += '              <div class="pod stats-pod"></div>';
            html += '              <div class="comment-list-wrap"></div>';
            html += '              <div class="comment-form-wrap"></div>';
            html += '            </div>';
            html += '            <div class="right">';
            html += '              <div class="pod colors-pod"></div>';
            html += '            </div>';
            html += '          </div>';
            html += '          <div class="pod groups-pod"></div>';
            html += '          <div class="pod tags-pod"></div>';
            html += '        </div>';
            html += '      </div>';
            html += '    </div>';
            html += '  </div>';
            html += '</div>';
            $('body').append(html);
            this.e.canvas = $('#lightbox');

            this.e.canvas.click($.proxy(this.onClickLightbox, this));
        }

        $('body').addClass(this.classes.lightboxActive);

        this.e.canvas.focus();
    };

    this.collectElements = function() {
        this.e.canvas = $('#lightbox');
        this.e.lightboxWrap = $('> .lightbox-wrap', this.e.canvas);
        this.e.closeButton = $('a.button--close', this.e.lightboxWrap);
        this.e.wrap = $('> .wrap', this.e.lightboxWrap);
        this.e.content = $('> .content', this.e.wrap);
        this.e.nav = $('> .nav', this.e.content);
        this.e.top = $('> .top', this.e.content);
        this.e.image = $('> .image', this.e.top);
        this.e.imageWrap = $('> .wrap', this.e.image);
        this.e.imageContent = $('> .content', this.e.imageWrap);
        this.e.imageLink = $('.image-link', this.e.imageContent);
        this.e.imagePreview = $('.image-preview', this.e.imageContent);
        this.e.imageOriginal = $('.image-original', this.e.imageContent);
        this.e.info = $('> .info', this.e.top);
        this.e.bottom = $('> .bottom', this.e.content);

        if(this.log) {
            console.log('Lightbox.collectElements', this.e);
        }

        this.e.info = $('.info', this.e.top);
        // this.e.followButtons = $('.button.follow', this.e.topRight);

        // this.e.similar = $('.similar', this.e.topRight);
        // this.e.closeButton = $('.nav .close', this.e.canvas);

        this.e.closeButton.bind('click tap', $.proxy(this.hide, this));

        this.options.collectElements();
        this.secondaryOptions.collectElements();
        this.image.collectElements();
        this.finder.collectElements();
        this.source.collectElements();
        this.similar.collectElements();
        this.stats.collectElements();
        this.comments.collectElements();
        this.colors.collectElements();
        this.groups.collectElements();
        this.tags.collectElements();
    };

    this.onCreateCanvasTimer = function() {
        this.e.canvas.addClass(this.classes.visible);
    };

    this.fadeIn = function() {
        this.e.canvas.removeClass(this.classes.hidden);
    };
  
    // Hide if clicking outside of the lightbox content area
    this.onClickLightbox = function(event) {
        if(this.log) {
            console.log('Lightbox.onClickLightbox');
        }
        
        var target = $(event.target);
        var content = target.parents('#lightbox-content');
        var isContent = (content.length > 0);

        if(!isContent) {
            event.preventDefault();
            event.stopPropagation();

            this.hide();

            $(document).unbind('keyup', this.keyUpMethod);
        }
    };
  
    this.onKeyUp = function(event) {
        if(this.log) {
            console.log('Lightbox.onKeyUp', event.which);
        }

        var focused = $('*:focus');
        if(focused.length > 0) {
            return;
        }

        if(this.e.canvas) {
            switch(event.which) {
                case 37:
                    this.previous();
                    break;
                case 39:
                    this.next();
                    break;
                case 70:
                    this.goFullScreen();
                    break;
            }
        }
    };
  
    this.previous = function(event) {
        if(this.log) {
            console.log('Lightbox.previous');
        }
        
        gbks.common.track('Polaroid', 'Lightbox', 'Previous');

        var tiles = $('.tile');
        var currentId = this.e.canvas.attr('data-id');
        var currentTile = $('#image_'+currentId);

        var newTile;
        if(currentTile.length > 0) {
            var currentIndex = tiles.index(currentTile);

            if(currentIndex > 0) {
                newTile = $(tiles[currentIndex-1]);

                while(newTile.hasClass('ad') && newTile != null && newTile.length > 0) {
                    currentIndex--;
                    newTile = $(tiles[currentIndex-1]);
                }
            }
        }

        if(newTile && newTile.length > 0 && newTile.attr('id') != undefined) {
            this.update(newTile);
        } else {
            // Check if we have similar images to get the next image from.
            var similar = $('.similar a', this.e.canvas);
            if(similar.length > 0) {
                var last = $(similar[similar.length-1]);
                var id = last.attr('data-id');
                this.updateFromId(id);
            } else {
                this.hide();
            }
        }

        if(event) {
            event.preventDefault();
            event.stopPropagation();
        }

        this.hideSharePopup();
    };
  
    this.next = function(event) {
        if(this.log) {
            console.log('Lightbox.next');
        }

        gbks.common.track('Polaroid', 'Lightbox', 'Next');

        var tiles = $('.tile');
        var currentId = this.e.canvas.attr('data-id');
        var currentTile = $('#image_'+currentId);

        // If the tiles exists on the page, get the next one.
        var newTile;
        if(currentTile.length > 0) {
            var currentIndex = tiles.index(currentTile);

            if(currentIndex < (tiles.length-1)) {
                newTile = $(tiles[currentIndex+1]);

                while(newTile.hasClass('ad') && newTile != null && newTile.length > 0) {
                    currentIndex++;
                    newTile = $(tiles[currentIndex+1]);
                }
            }
        }

        if(newTile && newTile.length > 0 && newTile.attr('id') != undefined) {
            this.update(newTile);
        } else {
            // Check if we have similar images to get the next image from.
            var similar = $('.similar a', this.e.canvas);
            if(similar.length > 0) {
                var id = $(similar[0]).attr('data-id');
                this.updateFromId(id);
            } else {
                this.hide();
            }
        }

        if(event) {
            event.preventDefault();
            event.stopPropagation();
        }

        this.hideSharePopup();
    };

    this.updateFromId = function(id) {
        this.imageId = id;

        this.e.canvas.addClass('is-loading');

        clearTimeout(this.hideTimer);
        this.hideTimer = setTimeout($.proxy(this.updateContent, this), 10);
    };
  
    this.updateContent = function() {
        this.e.canvas.attr('data-id', this.imageId);

        gbks.common.track('Polaroid', 'Lightbox', this.imageId);

        gbks.events.call(gbks.event.LoadLightboxData, {imageId: this.imageId});
    };
  
    // this.onImageLoaded = function() {
    //     // If image width is 0 for some reason, adjust layout.

    //     var img = $('.image .wrap a img', this.e.canvas);

    //     if(this.log) {
    //         console.log('Lightbox.onImageLoaded');
    //     }

    //     if(img.length > 0 && !(img.attr('width') > 0)) {
    //         img.removeAttr('width');
    //         img.removeAttr('height');
    //         img.attr('data-width', img.width());
    //         img.attr('data-height', img.height());
    //         this.updateLayout();
    //     }

    //     $('.left .image', this.e.canvas).removeClass('loading');
    //     //$('.image .wrap', this.canvas).fadeTo(250, 1);
    //     //$('.details', this.canvas).fadeTo(250, 1);
    //     $('.loader', this.e.canvas).fadeOut(250);

    //     $('.nav .previous', this.e.canvas).click($.proxy(this.previous, this));
    //     $('.nav .next', this.e.canvas).click($.proxy(this.next, this));
    //     $('.layoutButton', this.e.canvas).click($.proxy(this.toggleLayoutMode, this));

    //     this.e.canvas.removeClass('loadingBigImage');
    //     setTimeout($.proxy(this.removePreview, this), 250);
    // };
  
    this.removePreview = function() {
        if(this.e.imagePreview) {
            this.e.imagePreview.remove();
            this.e.imagePreview = null;
        }
        // $('.preview .top', this.e.canvas).remove();
        // $('.preview', this.e.canvas).remove();
    };
  
    // this.toggleLayoutMode = function(event) {
    //     if(event) {
    //         event.preventDefault();
    //         event.stopPropagation();
    //     }

    //     if(this.layoutMode == 'big') {
    //         this.layoutMode = 'small';
    //         this.e.canvas.removeClass('biggy');
    //     } else {
    //         this.layoutMode = 'big';
    //         this.e.canvas.addClass('biggy');
    //     }
    //     gbks.common.Cookie('layout', this.layoutMode, {path: '/'});
    //     this.updateLayout();
    // };
  
    this.createPlaceholder = function(data) {
        // Get general information.
        // var win = $(window);
        // var winWidth = this.windowWidth;
        // //var winHeight = win.height();
        // var padding = this.imagePadding;
        // var isFullScreen = (this.layoutMode == 'big' || winWidth < 1088);
        // var img;
        // var iframe;
        // var isVideo;

        // // Get tile/image information
        // var tileData = this.getTileData(data.imageId);
        // var tileLayoutData = this.getTileImageLayoutData(data.imageId);
        // var tile = $('.tile--image[data-id='+data.imageId+']');
        // var imgWidth = tileData.width;
        // var imgHeight = tileData.height;
        // var previewImage = tileData.src;

        // if(this.log) {
        //     console.log('Lightbox.createPlaceholder', data, tileData);
        // }

        // // Is it an image or a video?
        // img = $('.left .image a img', this.e.canvas);
        // if(img.length == 0) {
        //     video = $('.left .video iframe', this.e.canvas);

        //     if(video.length > 0) {
        //         isVideo = true;
        //     }
        // }

        // var lightboxWidth = Math.min(this.maxLightboxWidth, winWidth);
        // if(isFullScreen) {
        //     lightboxWidth = winWidth;
        // }
        // var imageAreaWidth = lightboxWidth - this.sidebarWidth;

        // // If image fills the width available for it, then don't use any padding.
        // if(imgWidth >= imageAreaWidth) {
        //     padding = 0;
        // }

        // // Calculate final image size for display.
        // var maxImageWidth = imageAreaWidth - padding*2;

        // var newImageWidth = Math.min(imgWidth, maxImageWidth);
        // var newImageHeight = newImageWidth*imgHeight/imgWidth;

        // var imgX = padding;
        // var imgY = Math.min(32, padding);

        // var imageAreaHeight = newImageHeight + imgY*2;
        // imageAreaHeight = Math.max(imageAreaHeight, this.minImageAreaHeight);

        // imgY = Math.round((imageAreaHeight - newImageHeight)/2);

        // var h = '<a href="#" class="link--image">';
        // h += '<span></span>';
        // h += '<img class="image--preview" src="'+tileData.src+'" width="'+newImageWidth+'" height="'+newImageHeight+'">';
        // h += '</a>';
        // this.e.imageContent.append(h);

        this.e.imageLink.attr({
            href: data.url
        });

        this.e.imagePreview.attr({
            src: data.src,
            width: data.width,
            height: data.height
        });

        // this.e.imageContent.css({
        //     paddingTop: imgY+'px',
        //     paddingBottom: imgY+'px'
        // });

        // this.e.linkPreview = $('a.link--image', this.e.canvas);
        // this.e.imagePreview = $('img.image--preview', this.e.canvas);

        this.updateFullscreen();
    };

    this.updateLayout = function() {
        if(this.log) {
            console.log('Lightbox.updateLayout');
        }

        var win = $(window);
        var winWidth = this.windowWidth;
        //var winHeight = win.height();
        var padding = this.imagePadding;
        var isFullScreen = (this.layoutMode == 'big' || winWidth < 1088);
        var img;
        var iframe;
        var isVideo;

        img = $('.left .image a img', this.e.canvas);
        if(img.length == 0) {
            video = $('.left .video iframe', this.e.canvas);

            if(video.length > 0) {
                isVideo = true;
            }
        }

        // Get image size from element.
        var imgWidth = img.attr('data-width');
        var imgHeight = img.attr('data-height');

        // If not size available, get it from the image itself.
        if(imgWidth == 0) {
            imgWidth = img.width();
        }

        if(imgHeight == 0) {
            imgHeight = img.height();
        }

        // If still not available, try to get it from the respective tile.
        if(imgWidth == 0 || imgHeight == 0) {
            var tile = $('#image_'+this.imageId);

            if(tile.length == 1) {
                imgWidth = tile.attr('data-w');
                imgHeight = tile.attr('data-h');
            }

            if(imgWidth == 0 || imgHeight == 0) {
                img = $('.left .image a img', this.e.canvas);

                if(img.length > 0) {
                    img.removeAttr('width');
                    img.removeAttr('height');
                    img.removeAttr('data-width');
                    img.removeAttr('data-height');
                    img.css('width', '');
                    img.css('height', '');
                }
                return;
            }
        }

        var lightboxWidth = Math.min(this.maxLightboxWidth, winWidth);
        if(isFullScreen) {
            lightboxWidth = winWidth;
        }
        var imageAreaWidth = lightboxWidth - this.sidebarWidth;

        // If image fills the width available for it, then don't use any padding.
        if(imgWidth >= imageAreaWidth) {
            padding = 0;
        }

        // Calculate final image size for display.
        var maxImageWidth = imageAreaWidth - padding*2;

        var newImageWidth = Math.min(imgWidth, maxImageWidth);
        var newImageHeight = newImageWidth*imgHeight/imgWidth;

        var imgX = padding;
        var imgY = Math.min(32, padding);

        var imageAreaHeight = newImageHeight + imgY*2;
        imageAreaHeight = Math.max(imageAreaHeight, this.minImageAreaHeight);
        imgY = Math.round((imageAreaHeight - newImageHeight)/2);

        img.css({
            'padding-top': imgY + 'px',
            'padding-bottom': imgY+'px',
            width: newImageWidth+'px',
            height: newImageHeight+'px'
        });

        $('.left', this.e.canvas).css({
            width: imageAreaWidth+'px'
        });

        this.updateFullscreen();

        // Update lightbox container.
        var box = $('.lightboxContent', this.e.canvas);
        box.css({
            width: lightboxWidth+'px'
        });
    };

  // Data
  
    // this.onLoadDetails = function(result) {
    //     if(this.log) {
    //         console.log('Lightbox.onLoadDetails', result);
    //     }

    //     if(this.e.canvas && result && result.html) {
    //         // Remove previous content.
    //         $('.nav', this.e.canvas).remove();
    //         // $('.top', this.e.canvas).remove();
    //         $('.groups', this.e.canvas).remove();

    //         var tops = $('.top', this.e.canvas);
    //         var i=0, top, topParent;
    //         for(; i<tops.length; i++) {
    //             top = $(tops[i]);
    //             topParent = $(top.parents('.preview'));
    //             // console.log(i, top, topParent);

    //             if(topParent.length == 0) {
    //                 top.remove();
    //             }
    //         }

    //         var content = $('.lightboxContent', this.e.canvas);
    //         this.e.canvas.addClass('loadingBigImage');
    //         content.append($(result.html));

    //         this.collectElements();

    //         //console.log('onLoadDetails', result.html, $('.contentWrap', this.canvas));

    //         gbks.common.fadeImages(this.e.topRight);

    //         gbks.commentsInstance.setupCommentForm(this.e.canvas);

    //         //this.resizeImage();

    //         setTimeout(function() {
    //             gbks.common.history.push(result.history, result.title);
    //         }, 50);

    //         var options = $('.right .options', this.e.canvas);

    //         if(this.isAuthenticated) {
    //             this.e.saveButton.click($.proxy(this.onClickSaveButton, this));
    //             this.e.likeButton.click($.proxy(this.onClickLikeButton, this));
    //         }

    //         this.e.shareButton.click($.proxy(this.onClickShareButton, this));
    //         this.e.closeButton.click($.proxy(this.hide, this));

    //         if(gbks.followInstance) {
    //             gbks.followInstance.setupButtonEvents(this.e.canvas);
    //         }

    //         $('.images a', this.e.finder).click($.proxy(this.onClickSimilarImage, this));
    //         $('.images a', this.e.source).click($.proxy(this.onClickSimilarImage, this));
    //         $('li a', this.e.similar).click($.proxy(this.onClickSimilarImage, this));
    //         $('li a', this.e.groups).click($.proxy(this.onClickSimilarImage, this));

    //         this.updateLayout();

    //         var bigImage = $('a img', this.e.image);
    //         if(bigImage.length > 0) {
    //             bigImage.load($.proxy(this.onImageLoaded, this));
    //         } else {
    //             this.e.canvas.removeClass('loadingBigImage');
    //             this.onImageLoaded();
    //         }
    //     }

    //     this.e.canvas.removeClass('is-loading');

    //     this.updateFullscreen();
    // };

    // Layout
  
    this.resize = function(event) {
        this.windowWidth = this.win.width();

        if(this.sharePopup) {
            this.sharePopup.updatePosition();
        }

        if(this.savePopup) {
            this.savePopup.updatePosition();
        }

        $('.contentPreview', this.e.canvas).remove();
        //this.positionImage();

        this.updateLayout();

        this.updateFullscreen();
    };
  
    // this.positionImage = function() {
    //     var link = $('.image a', this.e.canvas);
    //     var img = $('img', link);
    //     var pos = this.getCenterPosition(img.width(), img.height());
    //     link.css({
    //         position: 'absolute',
    //         left: pos.x+'px',
    //         top: pos.y+'px'
    //     });
    //     img.css('margin', 0);

    //     this.e.canvas.removeClass('loading');

    //     var img = $('.image .wrap a img', this.e.canvas);
    //     var h = parseInt(img.attr('height'));
    //     if(h == 0) {
    //         img.attr('height', '');
    //     }
    // };
  
    this.resizeImage = function() {
        this.image.resize();
    };
  
    this.getCenterPosition = function(w, h) {
        var position = $('.left', this.e.canvas).position();
        var result = {x: 0, y: 0};
        if(position) {
            var mw = position.left;
            var mh = $(window).height();
            var x = Math.round((mw-w-20)/2);
            var y = Math.round((mh-h-20)/2);
            y = Math.max(y, 30);

            result = {
                x: x,
                y: y
            };
        }
        return result;
    };

    // Scrolling
  
    this.onScroll = function(event) {
        if(this.sharePopup) {
            this.sharePopup.updatePosition();
        }

        if(this.savePopup) {
            this.savePopup.updatePosition();
        }
    };
  
    this.updateActivityScrolling = function(boxHeight) {
        // Make activity section scrollable if needed.
        var activity = $('.activity', this.e.canvas);
        if(activity.length > 0) {
            var offset = activity.position();
            var bottom = offset.top+activity.height();

            console.log('offset', offset);
            console.log('bottom', bottom);

            if(bottom > boxHeight) {
                var newHeight = boxHeight-offset.top;
                console.log('newHeight', newHeight);
                activity.css('height', (newHeight-11)+'px');
                activity.addClass('scrollable');
            } else {
                activity.css('height', '');
                activity.removeClass('scrollable');
            }
        }
    };

    // Fullscreen
  
    this.detectFullscreen = function() {
        for(var i = 0; i < Modernizr._domPrefixes.length; i++) {
            if(document[Modernizr._domPrefixes[i].toLowerCase() + 'CancelFullScreen']) {
                return true;
            }
            
        }
        return !!document['cancelFullScreen'] || false;
    };

    this.updateFullscreen = function() {
        var isFullScreen = (this.windowWidth < 1025);

        if(this.log) {
            console.log('Lightbox.updateFullscreen', this.windowWidth, isFullScreen);
        }

        if(isFullScreen) {
            this.e.canvas.addClass('is-fullscreen');
        } else {
            this.e.canvas.removeClass('is-fullscreen');
        }
    };
  
    this.goFullScreen = function() {
        // Request full screen if available.
        if(this.detectFullscreen()) {
            var e = this.e.canvas[0];
            if(e.requestFullScreen) {  
                e.requestFullScreen();  
            } else if(e.mozRequestFullScreen) {  
                e.mozRequestFullScreen();  
            } else if(e.webkitRequestFullScreen) {  
                e.webkitRequestFullScreen();  
            }  
        }
    }

    // Animation
    
    this.transitionFromTile = function(data) {
        this.e.canvas.addClass(this.classes.active);
        this.inTransition = true;

        /*
        var tileData = this.getTileData(data.imageId);
        var tileImageData = this.getTileImageLayoutData(data.imageId);

        var ligthboxImageLayoutData = this.getLightboxImageLayoutData();

        if(this.log) {
            console.log('Lightbox.transitionFromTile', data);
            // console.log('tileData', tileData);
            // console.log('tileImageData', tileImageData);
            // console.log('ligthboxImageLayoutData', ligthboxImageLayoutData);
            // console.log('imageWrap.position', this.e.imageWrap.offset(), this.e.imageWrap.position());
            // console.log('imageContent.position', this.e.imageContent.offset(), this.e.imageContent.position());
            // console.log('imageLink.position', this.e.imageLink.offset(), this.e.imageLink.position());
            // console.log('imagePreview.position', this.e.imagePreview.offset(), this.e.imagePreview.position());
        }

        var scale = tileImageData.width / ligthboxImageLayoutData.width;
        var deltaX = ligthboxImageLayoutData.offset.left - tileImageData.offset.left;
        var deltaY = ligthboxImageLayoutData.offset.top - tileImageData.offset.top;

        deltaX *= -1;
        deltaY *= -1;

        var imageLinkPosition = this.e.imageLink.position();
        var originX = imageLinkPosition.left;
        var originY = imageLinkPosition.top;

        var transform = 'translate('+deltaX+'px, '+deltaY+'px) scale('+scale+')';

        this.e.content.css({
            transform: transform,
            transformOrigin: originX+'px '+originY+'px'
        });
        */

        // this.transitionFromTileStepTwo();
        // this.transitionFromTileStepThree();
        this.transitionFromTileStepFour();

        // setTimeout($.proxy(this.transitionFromTileStepTwo, this), 25);
    };

    this.transitionFromTileStepTwo = function(data) {
        this.e.canvas.addClass(this.classes.visible);
        
        setTimeout($.proxy(this.transitionFromTileStepThree, this, data), 25);
    };

    this.transitionFromTileStepThree = function(data) {
        this.e.content.css({
            transform: ''
        });

        setTimeout($.proxy(this.transitionFromTileStepFour, this, data), 450);
    };

    this.transitionFromTileStepFour = function(data) {
        this.inTransition = false;

        this.image.onTransitionFromTileComplete();

        if(!this.isLoading) {
            this.refresh();
        }
    };

    // Helpers

    this.getTileFromImageId = function(imageId) {
        var result = null;

        var tile = $(this.classes.tile+'[data-id='+imageId+']');
        if(tile.length === 1) {
            result = tile;
        }

        if(this.log) {
            console.log('Lightbox.getTileFromImageId', imageId, tile);
        }

        return result;
    };

    this.getTileData = function(imageId) {
        var tile = this.getTileFromImageId(imageId);

        var result = null;
        if(tile) {
            var image = $('a > img', tile);

            result = {
                id: imageId,
                tile: tile,
                src: image.attr('src'),
                width: tile.data('w'),
                height: tile.data('h'),
                isNSFW: tile.hasClass('is-nsfw'),
                isVideo: tile.hasClass('is-video')
            };
        }

        return result;
    };

    this.getTileImageLayoutData = function(imageId) {
        var tile = this.getTileFromImageId(imageId);

        var result = null;
        if(tile) {
            var image = $('a > img', tile);

            result = {
                id: imageId,
                image: image,
                src: image.attr('src'),
                offset: image.offset(),
                position: image.position(),
                width: image.width(),
                height: image.height()
            };
        }

        return result;
    };

    this.getLightboxImageLayoutData = function() {
        var image = this.e.imagePreview;

        var result = null;
        if(image.length > 0) {
            result = {
                image: image,
                offset: image.offset(),
                position: image.position(),
                width: image.width(),
                height: image.height()
            };
        }

        if(this.log) {
            console.log('Lightbox.getLightboxImageLayoutData', image, result);
        }

        return result;
    };

};


var gbks = gbks || {};
gbks.common = gbks.common || {};

gbks.common.Nav = function() {
  
  this.init = function() {  
    this.clickDocumentMethod = $.proxy(this.onClickDocument, this);

    this.data = {
      popular: {
        active: false,
        visible: false
      }
    };

    this.collectElements();
    this.setupEvents();

    this.groupsPopup = new gbks.common.NavGroupsPopup();
    this.groupsPopup.init(this.e.groupsLink);

    // this.profilePopup = new gbks.common.NavProfilePopup();
    // this.profilePopup.init();

    // this.createPopup = new gbks.common.NavCreatePopup();
    // this.createPopup.init();

    this.morePopup = new gbks.common.NavMorePopup();
    this.morePopup.init();

    this.searchOverlay = new gbks.common.NavSearchOverlay();
    this.searchOverlay.init();

    this.subNavHideTimer = null;
    this.canvasMouseLeaveMethod = $.proxy(this.onCanvasMouseLeave, this);
  };

  this.collectElements = function() {
    var e = {};

    e.doc = $(document);
    e.canvas = $('#nav');
    e.mainNav = $('.nav-row.type--main', e.canvas);
    e.mainNavLinks = $('> ol > li > a', e.canvas);
    e.homeLink = $('li.type--home > a', e.canvas);
    e.activityLink = $('li.type--activity > a', e.canvas);
    e.popularLink = $('li.type--popular > a', e.canvas);
    e.groupsLink = $('li.type--groups > a', e.canvas);
    e.searchLink = $('li.type--search > a', e.canvas);
    e.createLink = $('li.type--addimage > a', e.canvas);
    e.moreLink = $('li.type--more > a', e.canvas);
    e.popularSubNav = $('.nav-row.type--sub', e.canvas);

    console.log('Nav.collectElements', e);

    this.e = e;
  };

  this.setupEvents = function() {
    // this.e.mainNavLinks.bind('mouseenter', $.proxy(this.onMouseEnterMainNavLinks, this));
    // this.e.popularLink.bind('mouseenter', $.proxy(this.onMouseEnterPopular, this));
    this.e.homeLink.bind('click tap', $.proxy(this.onClickLinkToScrollUpIfActive, this));
    this.e.popularLink.bind('click tap', $.proxy(this.onClickLinkToScrollUpIfActive, this));
    this.e.activityLink.bind('click tap', $.proxy(this.onClickLinkToScrollUpIfActive, this));
    this.e.groupsLink.bind('click tap', $.proxy(this.onClickGroupsLink, this));
    this.e.searchLink.bind('click tap', $.proxy(this.onClickSearchLink, this));
    // this.e.profileLink.bind('click tap', $.proxy(this.onClickProfileLink, this));
    // this.e.createLink.bind('click tap', $.proxy(this.onClickCreateLink, this));
    this.e.moreLink.bind('click tap', $.proxy(this.onClickMoreLink, this));

    this.e.doc.bind('click tap', this.clickDocumentMethod);
  };

  // this.onMouseEnterMainNavLinks = function(event) {
  //   var target = $(event.currentTarget);
  //   var isPopular = target.hasClass('nav-item--popular');
  // };

  // Popular

  // this.onMouseEnterPopular = function(event) {
  //   this.activatePopularMenu();    

  //   this.e.canvas.bind('mouseleave', this.canvasMouseLeaveMethod);
  // };

  // this.activatePopularMenu = function() {
  //   if(!this.data.popular.active) {
  //     this.data.popular.active = true;
  //     this.e.popularSubNav.addClass('is-active');

  //     setTimeout($.proxy(this.showPopularMenu, this), 25);
  //   }
  // };

  // this.deactivatePopularMenu = function() {
  //   if(this.data.popular.active) {
  //     this.data.popular.active = false;
  //     this.e.popularSubNav.removeClass('is-active');
  //   }
  // };

  // this.showPopularMenu = function() {
  //   if(!this.data.popular.visible) {
  //     this.data.popular.visible = true;
  //     this.e.popularSubNav.addClass('is-visible');
  //   }
  // };

  // this.hidePopularMenu = function() {
  //   if(this.data.popular.visible) {
  //     this.data.popular.visible = false;
  //     this.e.popularSubNav.removeClass('is-visible');

  //     setTimeout($.proxy(this.deactivatePopularMenu, this), 25);
  //   }
  // };

  // this.onCanvasMouseLeave = function(event) {
  //   this.e.canvas.unbind('mouseleave', this.canvasMouseLeaveMethod);

  //   clearTimeout(this.subNavHideTimer);
  //   this.subNavHideTimer = setTimeout($.proxy(this.hideSubNav, this), 150);
  // };

  // this.hideSubNav = function() {
  //   this.hidePopularMenu();
  // };

  this.onClickLinkToScrollUpIfActive = function(event) {
    // If link is already active, just scroll up.
    var link = $(event.currentTarget);
    if(link.hasClass('is-active')) {
      event.preventDefault();
      event.stopPropagation();
      gbks.common.scroller.scrollToPosition(0);
    } else {
      this.e.mainNavLinks.removeClass('is-active');
      link.addClass('is-active'); 
      
      var tiles = $('.tiles .tile');
      tiles.remove();     
    }
  };

  // Search

  this.onClickSearchLink = function(event) {
    event.preventDefault();
    event.stopPropagation();

    gbks.tracker.trackEvent('nav', 'search');

    this.hidePopups();

    // if(this.createPopup.isActive) {
    //   this.createPopup.hide();
    // }

    // if(this.profilePopup.isActive) {
    //   this.profilePopup.hide();
    // }

    this.searchOverlay.show();
  };

  this.onClickGroupsLink = function(event) {
    event.preventDefault();
    event.stopPropagation();

    gbks.tracker.trackEvent('nav', 'groups');

    this.toggleGroups();
  };

  // this.onClickProfileLink = function(event) {
  //   event.preventDefault();
  //   event.stopPropagation();

  //   this.toggleProfile();
  // };

  // this.onClickCreateLink = function(event) {
  //   event.preventDefault();
  //   event.stopPropagation();

  //   this.toggleCreate();
  // };

  this.onClickMoreLink = function(event) {
    event.preventDefault();
    event.stopPropagation();

    gbks.tracker.trackEvent('nav', 'more');

    this.toggleMore();
  };

  this.hidePopups = function() {
    // this.hideSubNav();

    // if(this.createPopup.isActive) {
    //   this.createPopup.hide();
    // }

    if(this.groupsPopup.isActive) {
      this.groupsPopup.hide();
    }

    // if(this.profilePopup.isActive) {
    //   this.profilePopup.hide();
    // }

    if(this.morePopup.isActive) {
      this.morePopup.hide();
    }
  };

  this.toggleGroups = function() {  
    // console.log('toggleGroups', this.groupsPopup.isActive);  
    if(this.groupsPopup.isActive) {
      this.hidePopups();
    } else {
      this.hidePopups();

      this.groupsPopup.show();
    }
  };

  // this.toggleProfile = function() {
  //   if(this.profilePopup.isActive) {
  //     this.hidePopups();
  //   } else {
  //     this.hidePopups();

  //     this.profilePopup.show();
  //   }
  // };

  // this.toggleCreate = function() {
  //   if(this.createPopup.isActive) {
  //     this.hidePopups();
  //   } else {
  //     this.hidePopups();

  //     this.createPopup.show();
  //   }
  // };

  this.toggleMore = function() {
    if(this.morePopup.isActive) {
      this.hidePopups();
    } else {
      this.hidePopups();

      this.morePopup.show();
    }
  };

  this.onClickDocument = function(event) {
    this.groupsPopup.onClickDocument(event);
    // this.profilePopup.onClickDocument(event);
    this.morePopup.onClickDocument(event);
  };

  this.resize = function() {

  };
  
};

gbks.modules = gbks.modules || [];
gbks.modules.push({
  name: 'Nav',
  canvas: '#nav',
  class: gbks.common.Nav
});


var gbks = gbks || {};

gbks.common = gbks.common || {};

gbks.common.Expandables = function() {

    this.init = function() {
        this.setupEvents();
    };

    this.setupEvents = function() {
        $('.is-expandable .expand-trigger').click($.proxy(this.onClickExpandable, this));
    };

    this.onClickExpandable = function(event) {
        var target = $(event.currentTarget);
        var parent = $(target.parents('.is-expandable')[0]);
        parent.toggleClass('is-expanded');

        if(target.is('a')) {
            event.preventDefault();
            event.stopPropagation();
        }
    };

};


var gbks = gbks || {};

gbks.common = gbks.common || {};

gbks.common.Dropdowns = function() {

    this.init = function() {
        this.setupEvents();
    };

    this.setupEvents = function() {
        $('.dropdown .button').click($.proxy(this.onClickDropdown, this));
    };

    this.onClickDropdown = function(event) {
        event.preventDefault();
        event.stopPropagation();

        var button = $(event.currentTarget);
        var parent = button.parent();

        if(parent.hasClass('is-active')) {
            parent.removeClass('is-active');

            gbks.tracker.trackEvent('dropdown', 'collapse');
        } else {
            parent.addClass('is-active');

            gbks.tracker.trackEvent('dropdown', 'expand');
        }
    };

};


var gbks = gbks || {};
gbks.common = gbks.common || {};

gbks.common.NavSearchOverlay = function() {

    this.init = function() { 
        this.id = 'NavSearchOverlay';
        this.log = !false;
        this.isActive = false;
        this.autoComplete = null;
        this.badWords = [];
        this.searchFocused = false;
        this.searchTerm = '';
        this.searchResults = {
            users: null,
            groups: null,
            images: null,
            categories: null
        };

        this.collectElements();
        this.setupEvents();

        this.searchBlurMethod = $.proxy(this.blurSearch, this);
        this.clickDocumentMethod = $.proxy(this.onClickDocument, this);
        this.keyUpMethod = $.proxy(this.keyUp, this);
    };

    this.collectElements = function() {
        var e = {};

        e.canvas = $('#supermeganav');
        e.links = $('a', e.canvas);

        this.e = e;
    };

    this.setupEvents = function() {
        this.e.links.bind('click tap', $.proxy(this.onClickLink, this));
    };

    this.refreshSearches = function() {
        // console.log('refreshSearches');
        this.searchTerm = this.searchField.val();

        clearTimeout(this.searchTimer); 
        if(this.searchTerm.length >= 3) {
            this.createSearchCanvas();

            this.searchTimer = setTimeout($.proxy(this.doRefreshSearch, this), 500);
        }
    };

    this.createSearchCanvas = function() {
        if(!this.autoComplete) {
            var html = '<div id="searchResults" class="is-active">';
            html += '<div class="nav">';

            // Loader.
            html += '<div class="loader">'+gbks.icons.loader+'</div>';

            // Search icon.
            html += '<a href="#" class="button--search">';
            html += gbks.icons.magnify;
            html += '</a>';

            // Input field.
            html += '<input type="text" name="search" placeholder="Search anything...">';

            // Close icon.
            html += '<a href="#" class="button--close">';
            html += gbks.icons.close;
            html += '</a>';

            html += '</div>';

            html += '<div class="content"><div class="wrap">';
            html += '<div class="section section--images clearfix" data-type="images"></div>';
            html += '<div class="section section--people clearfix" data-type="people"></div>';
            html += '<div class="section section--groups clearfix" data-type="groups"></div>';
            // html += '<div class="section section--categories clearfix" data-type="categories"></div>';
            html += '</div></div></div>';
            this.autoComplete = $(html);
            $('body').append(this.autoComplete);

            $('a.button--search', this.autoComplete).bind('click tap', $.proxy(this.onClickSearchButton, this));
            $('a.button--close', this.autoComplete).bind('click tap', $.proxy(this.onClickCloseButton, this));

            this.searchField = $('input', this.autoComplete);
            this.searchField.bind('keyup change', $.proxy(this.onSearchInput, this));
            this.searchField.bind('focus', $.proxy(this.focusSearch, this));
            this.searchField.bind('blur', $.proxy(this.blurSearch, this));
        }
    };

    this.onClickSearchButton = function(event) {
        event.preventDefault();
        event.stopPropagation();

        this.updateSearch();
    };

    this.onClickCloseButton = function(event) {
        event.preventDefault();
        event.stopPropagation();

        this.hide();
    };

    this.focusSearch = function() {
        // console.log('focusSearch');
    };

    this.blurSearch = function() {
        // console.log('blurSearch');
    };

    this.onSearchInput = function(event) {
        // console.log('onSearchInput', event.which);
        switch(event.which) {
                case 13: // Enter
                this.performSearch();
            break;
                case 27: // Escape
                this.searchField.blur();
                this.searchField.val('');
                this.searchTerm = '';
                // this.hideAutoComplete();
                break;
            default:
                this.refreshSearches();
                break;
        }

        /*
        if(!this.autoComplete) {
        this.loadAutoComplete();
        } else {
        this.updateAutoComplete();
        }
        //*/
    };

    this.doRefreshSearch = function() {
        this.searchResults.groups = null;
        this.searchResults.images = null;
        this.searchResults.users = null;

        this.autoComplete.addClass('is-active is-loading');

        gbks.tracker.trackEvent('Search', 'term', this.searchTerm);

        this.searchUsers();
        this.searchGroups();
        this.searchImages();
        // this.searchCategories();
    };

    this.updateLoadingDisplay = function() {
        if(this.searchResults.groups != null && this.searchResults.images != null && this.searchResults.users != null) {
            this.autoComplete.removeClass('is-loading');
        }
    };

    this.show = function() {
        if(this.log) {
            console.log('NavSearchOverlay.show');
        }

        this.isActive = true;
        this.createSearchCanvas();

        this.autoComplete.addClass('is-active');

        $('body').addClass('lightbox-active');

        setTimeout($.proxy(this.doShowSearch, this), 25);
        setTimeout($.proxy(this.triggerSearchFocus, this), 100);
    };

    this.doShowSearch = function() {
        if(this.log) {
            console.log('NavSearchOverlay.doShowSearch');
        }

        this.autoComplete.addClass('is-visible');

        if(!this.searchTerm || this.searchTerm.length == 0) {
            // this.searchCategories();
        }
    };

    this.triggerSearchFocus = function() {
        $('input', this.autoComplete).focus();
    };

    this.hide = function() {
        this.isActive = false;
        this.autoComplete.removeClass('is-visible');
        $('body').removeClass('lightbox-active');

        if(this.log) {
            console.log('NavSearchOverlay.hide');
        }

        setTimeout($.proxy(this.doHideSearch, this), 300);
    };

    this.doHideSearch = function() {
        // console.log('search.doHideSearch', this.autoComplete.hasClass('is-active'));
        this.autoComplete.removeClass('is-active');
        // console.log('search.hasActive', this.autoComplete.hasClass('is-active'));
    };

    /**
    * Search users.
    */

    this.searchUsers = function() {
        if(this.searchUsersRequest) {
            this.searchUsersRequest.abort();
            this.searchUsersRequest = null;
        }

        this.searchUsersRequest = $.ajax({
            url: '/autocomplete/users',
            type: 'post',
            data: {
            term: this.searchTerm
        },
            success: $.proxy(this.onSearchUsers, this),
            error: $.proxy(this.onSearchUsersFailed, this)
        });
    };

    this.onSearchUsers = function(data) {
        // console.log('searchUsers', data);

        this.searchResults.users = data;

        // if(this.autoComplete) {
        //   $('.section--users', this.autoComplete).remove();
        // }

        if(data.length > 10) {
            $('.section--people', this.autoComplete).replaceWith(data);
            // $('.wrap', this.autoComplete).prepend(data);
        } else {
            $('.section--people', this.autoComplete).html('');
        }

        this.updateLoadingDisplay();
    };

    this.onSearchUsersFailed = function(data) {
        if(this.log) {
            console.log('NavSearchOverlay.onSearchUsersFailed', data);
        }

        this.searchResults.users = false;

        this.updateLoadingDisplay();
    };

    /**
    * Search groups.
    */

    this.searchGroups = function() {
        if(this.searchGroupsRequest) {
            this.searchGroupsRequest.abort();
            this.searchGroupsRequest = null;
        }

        this.searchGroupsRequest = $.ajax({
            url: '/autocomplete/groups',
            type: 'post',
            data: {
            term: this.searchTerm
        },
            success: $.proxy(this.onSearchGroups, this),
            error: $.proxy(this.onSearchGroupsFailed, this)
        });
    };

    this.onSearchGroups = function(data) {
        // console.log('searchGroups', data);

        this.searchResults.groups = data;

        // if(this.autoComplete) {
        //   $('.section--groups', this.autoComplete).remove();
        // }

        if(data.length > 10) {
            $('.section--groups', this.autoComplete).replaceWith(data);
            // $('.wrap', this.autoComplete).prepend(data);
        } else {
            $('.section--groups', this.autoComplete).html('');
        }

        this.updateLoadingDisplay();
    };

    this.onSearchGroupsFailed = function(data) {
        if(this.log) {
            console.log('NavSearchOverlay.onSearchGroupsFailed', data);
        }

        this.searchResults.groups = false;

        this.updateLoadingDisplay();
    };

    /**
    * Search images.
    */

    this.searchImages = function() {
        if(this.searchImagesRequest) {
            this.searchImagesRequest.abort();
            this.searchImagesRequest = null;
        }

        this.searchImagesRequest = $.ajax({
            url: '/autocomplete/images',
            type: 'post',
            data: {
            term: this.searchTerm
        },
            success: $.proxy(this.onSearchImages, this),
            error: $.proxy(this.onSearchImagesFailed, this)
        });
    };

    this.onSearchImages = function(data) {
        // console.log('searchImages', data);

        this.searchResults.images = data;

        // if(this.autoComplete) {
        // $('.section--images', this.autoComplete).remove();
        // }

        if(data.length > 10) {
            $('.section--images', this.autoComplete).replaceWith(data);
            // $('.wrap', this.autoComplete).prepend(data);
        } else {
            $('.section--images', this.autoComplete).html('');
        }

        this.updateLoadingDisplay();
    };

    this.onSearchImagesFailed = function(data) {
        if(this.log) {
            console.log('NavSearchOverlay.onSearchImagesFailed', data);
        }

        this.searchResults.images = false;

        this.updateLoadingDisplay();
    };

    /**
    * Search categories.
    */

    this.searchCategories = function() {
        if(!this.searchResults.categories && !this.categoryDataLoading) {
            this.loadCategories();
        } else {
            this.filterCategories();
        }
    };

    this.loadCategories = function() {
        this.categoryDataLoading = true;

        $.ajax({
            url: '/autocomplete/categories',
            success: $.proxy(this.onLoadCategories, this),
            error: $.proxy(this.onLoadCategoriesFailed, this)
        });
    };

    this.onLoadCategories = function(data) {
        // console.log('onLoadCategories', data);

        $('.section--categories', this.autoComplete).replaceWith(data);

        this.collectCategoryData();

        this.filterCategories();
    };

    this.onLoadCategoriesFailed = function(data) {
        if(this.log) {
            console.log('NavSearchOverlay.onLoadCategoriesFailed', data);
        }
    };

    this.collectCategoryData = function() {
        var data = [];
        var items = $('.section.section--categories li');
        var i=0, length=items.length, item;

        for(; i<length; i++) {
            item = $(items[i]);

            data.push({
                title: $('h3 a', item).html().toLowerCase(),
                element: item
            });
        }

        this.searchResults.categories = data;
    };

    this.filterCategories = function() {
        if(!this.searchResults.categories) {
            return;
        }

        var term = this.searchTerm.toLowerCase();
        var i=0, length=this.searchResults.categories.length, item;
        var visibles = 0;
        for(; i<length; i++) {
            item = this.searchResults.categories[i];

            if(item.title.indexOf(term) > -1) {
                item.element.show();
                visibles++;
            } else {
                item.element.hide();
            }
        }

        var section = $('.section.section--categories');
        if(visibles > 0) {
            section.show();
        } else {
            section.hide();
        }
    };

};


var gbks = gbks || {};

gbks.UserGroupsList = function() {
  
    this.init = function(options) { 
        this.id = 'UserGroupsList';
        this.container = options.container;
        this.options = $.extend({
            autoHeight: true
        }, options);
        this.mode = null;
        this.log = !false;
        this.isActive = false;
        this.groupData = null;
        this.imageId = null;
        this.isLoadingGroupData = false;
        this.searchText = null;
        this.searchData = null;
        this.cornifyActive = false;
        this.searchBlurMethod = $.proxy(this.onBlurSearch, this);
        this.sorting = 'alpha';
        this.keyUpMethod = $.proxy(this.onKeyUp, this);
        this.e = {};

        this.renderer = new gbks.UserGroupsListRenderer();
    };

    this.createCanvas = function() {
        var canvas = $('.user-groups-list', this.container);

        if(canvas.length == 0) {
            this.container.html(this.renderer.canvas());

            this.collectElements();
            this.setupEvents();
        }
    };

    this.collectElements = function() {
        var e = {};

        e.canvas = $('.user-groups-list', this.container);
        e.content = $('> .wrap > .content', e.canvas);
        e.groups = $('.content--groups', e.canvas);
        e.groupList = $('.content--groups ul', e.canvas);
        e.groupListItems = null;
        e.noSearchResults = $('.content--no-search-results', e.canvas);
        e.toggle = $('li.type--groups', e.canvas);
        e.create = $('.content--create a', e.canvas);
        e.search = $('.content--search input', e.canvas);
        e.sorting = $('.content--sorting', e.canvas);
        e.sortingOptions = $('a', e.sorting);
        e.noGroups = $('.content--no-groups', e.canvas);
        e.createFirstGroup = $('.button--create-first-group', e.noGroups);

        if(this.log) {
            console.log('UserGroupsListRenderer.collectElements', e);
        }

        this.e = e;
    };

    this.setupEvents = function() {
        this.e.search.bind('keyup change', this.keyUpMethod);
        this.e.create.bind('click tap', $.proxy(this.onClickCreateGroup, this));
        this.e.sortingOptions.bind('click tap', $.proxy(this.onTapSortingOption, this));
        this.e.createFirstGroup.bind('click tap', $.proxy(this.onTapCreateFirstGroup, this));
        // this.e.search.bind('focus', $.proxy(this.onFocusSearch, this));
        // this.e.links.bind('click tap', $.proxy(this.onClickLink, this));
        
        // For saving images
        gbks.events.listen(gbks.event.SaveImageStart, $.proxy(this.onSaveImageStart, this), this.id);
        gbks.events.listen(gbks.event.SaveImageSuccess, $.proxy(this.onSaveImageSuccess, this), this.id);
        gbks.events.listen(gbks.event.SaveImageError, $.proxy(this.onSaveImageError, this), this.id);

        // API events for loading the users groups.
        gbks.events.listen(gbks.event.GetUserGroupsSuccess, $.proxy(this.onGetUserGroupsSuccess, this), this.id);
        gbks.events.listen(gbks.event.GetUserGroupsError, $.proxy(this.onGetUserGroupsError, this), this.id);

        // API events for creating groups.
        gbks.events.listen(gbks.event.CreateGroupSuccess, $.proxy(this.onCreateGroupSuccess, this), this.id);
        gbks.events.listen(gbks.event.CreateGroupError, $.proxy(this.onCreateGroupError, this), this.id);

        // Save image to group.
        gbks.events.listen(gbks.event.SaveImageToGroupStart, $.proxy(this.onSaveImageToGroupStart, this), this.id);
        gbks.events.listen(gbks.event.SaveImageToGroupSuccess, $.proxy(this.onSaveImageToGroupSuccess, this), this.id);
        gbks.events.listen(gbks.event.SaveImageToGroupError, $.proxy(this.onSaveImageToGroupError, this), this.id);

        // Remove image from group.
        gbks.events.listen(gbks.event.RemoveImageFromGroupStart, $.proxy(this.onRemoveImageFromGroupStart, this), this.id);
        gbks.events.listen(gbks.event.RemoveImageFromGroupSuccess, $.proxy(this.onRemoveImageFromGroupSuccess, this), this.id);
        gbks.events.listen(gbks.event.RemoveImageFromGroupError, $.proxy(this.onRemoveImageFromGroupError, this), this.id);
    };

    this.saveImage = function(imageId) {
        this.imageId = imageId;
        this.isActive = true;
        this.mode = 'save';

        if(this.log) {
            console.log('UserGroupsList.saveImage', this.imageId);
        }

        gbks.tracker.trackEvent('usergroupslist', 'savemode');

        this.createCanvas();

        gbks.events.call(gbks.event.SaveImage, {imageId: this.imageId});
    };

    this.showCheckList = function() {
        this.isActive = true;
        this.mode = 'check';

        this.createCanvas();

        if(this.log) {
            console.log('UserGroupsList.showCheckList');
        }

        gbks.tracker.trackEvent('usergroupslist', 'checkmode');

        // Load the users list of groups
        if(!this.isLoadingGroupData) {
            this.loadGroupData();
        } else {
            // this.displayGroups();
        }
    };

    this.showLinkList = function() {
        this.isActive = true;
        this.mode = 'link';

        this.createCanvas();

        gbks.tracker.trackEvent('usergroupslist', 'linkmode');

        // Load the users list of groups
        if(!this.isLoadingGroupData) {
            this.loadGroupData();
        } else {
            // this.displayGroups();
        }
    };

    // Link list

    this.loadGroupData = function() {
        this.isLoadingGroupData = true;
        this.e.canvas.addClass('is-loading');

        this.updateHeight();

        gbks.events.call(gbks.event.GetUserGroups);
    };

    this.onGetUserGroupsSuccess = function(data) {
        this.groupData = data;

        if(this.log) {
            console.log('UserGroupsListRenderer.onGetUserGroupsSuccess', data);
        }

        this.e.canvas.removeClass('is-loading');

        // console.log('onGroupDataLoaded', data);
        if(this.groupData.groups && this.groupData.groups.length > 0) {
            this.renderGroups();
        } else {
            this.e.canvas.addClass('no-groups');
        }

        this.updateHeight();
    };

    this.onGetUserGroupsError = function(data) {
        if(this.log) {
            console.log('UserGroupsListRenderer.onGetUserGroupsError', data);
        }

        this.e.canvas.removeClass('is-loading');
        this.e.canvas.addClass('no-groups');
    };

    // Render list of groups.

    this.renderGroups = function() {
        if(this.log) {
            console.log('UserGroupsListRenderer.renderGroups', this.groupData.groups);
        }

        if(this.groupData.groups.length == 0) {
            this.renderNoGroups();
            return;
        }

        var groupIds = [];
        if(this.groupData.image && this.groupData.image.groupIds) {
            groupIds = this.groupData.image.groupIds;
        }

        var h = '';
        var i=0, length = this.groupData.groups.length, groupData;
        var isActive;
        for(; i<length; i++) {
            groupData = this.groupData.groups[i];

            if(this.isLinkMode()) {
                h += this.renderer.groupLinkItem(groupData);
            } else {
                isActive = (groupIds.indexOf(groupData.id) !== -1);

                h += this.renderer.groupCheckItem(groupData, isActive);
            }
        }

        this.e.groupList.html(h);

        // Update item references.
        this.e.groupListItems = $('li', this.e.groupList);

        if(this.isSaveMode()) {
            this.e.canvas.addClass('mode--save');
            this.e.canvas.removeClass('mode--link mode-check');

            this.e.groupListItems.bind('click tap', $.proxy(this.onClickItem, this));
        } else if(this.isCheckMode()) {
            this.e.canvas.addClass('mode--check');
            this.e.canvas.removeClass('mode--save mode-link');

            this.e.groupListItems.bind('click tap', $.proxy(this.onClickItem, this));
        } else {
            this.e.canvas.addClass('mode--link');
            this.e.canvas.removeClass('mode--save mode-check');
        }

        // Store item reference to each data object.
        for(i=0; i<length; i++) {
            this.groupData.groups[i].element = $(this.e.groupListItems[i]);
        }
    };

    this.renderNoGroups = function() {
        if(this.log) {
            console.log('UserGroupsListRenderer.renderNoGroups');
        }
    };

    this.getCheckedGroupIds = function() {
        var result = [];

        var i=0, length = this.groupData.groups.length, group;
        for(i=0; i<length; i++) {
            group = this.groupData.groups[i];

            if(group.element.hasClass('is-active')) {
                result.push(group.id);
            }

            // if(this.log) {
            //     console.log('UserGroupsListRenderer.getCheckedGroupIds', i, group);
            // }
        }

        if(this.log) {
            console.log('UserGroupsListRenderer.getCheckedGroupIds', result);
        }

        return result;
    };

    /**
     * Save or unsave image to group.
     */
    this.onClickItem = function(event) {
        event.preventDefault();

        var item = $(event.currentTarget);
        var groupId = item.data('id');
        var isActive = item.hasClass('is-active');

        if(this.log) {
            console.log('UserGroupsList.onClickItem', groupId, this.imageId);
        }

        gbks.tracker.trackEvent('usergroupslist', 'clickitem');

        if(this.isSaveMode()) {
            if(isActive) {
                gbks.events.call(gbks.event.RemoveImageFromGroup, {imageId: this.imageId, groupId: groupId});
            } else {
                gbks.events.call(gbks.event.SaveImageToGroup, {imageId: this.imageId, groupId: groupId});
            }
        } else if(this.isCheckMode()) {
            item.toggleClass('is-active');
        }

        // this.getCheckedGroupIds();
    };

    // Search

    this.onFocusSearch = function() {
        // this.e.search.bind('blur', this.searchBlurMethod);
        // this.e.doc.bind('keyup', this.keyUpMethod);
    };

    this.onKeyUp = function(event) {
        // console.log('onKeyUp', event.which);

        var text = this.e.search.val();

        if(text != this.searchText) {
            this.searchText = text;
            this.updateSearch();
        }
    };

    this.onBlurSearch = function() {
        this.e.doc.unbind('keyup', this.keyUpMethod);
    };

    this.updateSearch = function() {
        if(this.log) {
            console.log('UserGroupsListRenderer.updateSearch', this.searchText);
        }

        if(this.searchText.length > 0) {
            var text = this.searchText.toLowerCase();
            var i=0, length = this.groupData.groups.length, groupData, name, element;
            var visibles = 0;
            for(; i<length; i++) {
            groupData = this.groupData.groups[i];
            name = groupData.name.toLowerCase();
            element = $(this.e.groupListItems[i]);

            if(name.indexOf(text) !== -1) {
                element.show();
                visibles++;
            } else {
                element.hide();
            }
        }

        var classesToAdd = [];
        var classesToRemove = [];

        // Cornify!
        if(text == 'cornify') {
            if(!this.cornifyActive) {
                this.cornifyActive = true;
                $('body').addClass('cornify');
            }
        } else if(this.cornifyActive) {
            this.cornifyActive = false;
            $('body').removeClass('cornify');
        }

        // Show message if no matches found.
        if(visibles > 0) {
            classesToRemove.push('no-search-results');
            // this.e.canvas.removeClass('no-search-results');
        } else {
            $('span', this.e.noSearchResults).html(this.searchText);
            classesToAdd.push('no-search-results');
            // this.e.canvas.addClass('no-search-results');
        }

        if(classesToRemove.length > 0) {
            this.e.canvas.removeClass(classesToRemove.join(' '));
        }

        if(classesToAdd.length > 0) {
            this.e.canvas.addClass(classesToAdd.join(' '));
        }

        } else {
            this.e.canvas.removeClass('no-search-results');

            this.e.groupListItems.show();
        }

        clearTimeout(this.trackSearchTimer);
        this.trackSearchTimer = setTimeout($.proxy(this.trackSearch, this), 500);

        this.updateHeight();
    };

    this.trackSearch = function() {
        gbks.tracker.trackEvent('usergroupslist', 'search', this.searchText);
    };

    // Sorting

    this.onTapSortingOption = function(event) {
        event.preventDefault();
        event.stopPropagation();

        var target = $(event.currentTarget);
        this.sorting = target.data('id');

        gbks.tracker.trackEvent('usergroupslist', 'sort', this.sorting);

        if(this.log) {
            console.log('UserGroupsListRenderer.onTapSortingOption', this.sorting, target);
        }

        this.updateSorting();
    };

    this.updateSorting = function() {
        if(this.sorting == 'alpha') {
            this.groupData.groups.sort(this.sortGroupsByDate);
            this.e.sorting.removeClass('sort-by-alpha');
            this.e.sorting.addClass('sort-by-date');
        } else {
            this.groupData.groups.sort(this.sortGroupsByAlpha);
            this.e.sorting.removeClass('sort-by-date');
            this.e.sorting.addClass('sort-by-alpha');
        }

        if(this.log) {
            console.log('UserGroupsListRenderer.updateSorting', this.sorting, this.groupData.groups);
        }

        this.e.groupListItems.remove();

        var i=0, length=this.groupData.groups.length, groupData;
        for(; i<length; i++) {
            groupData = this.groupData.groups[i];

            this.e.groupList.append(groupData.element);
        }
    };

    this.sortGroupsByAlpha = function(a, b) {
        if(a.name < b.name) return -1;
        if(a.name > b.name) return 1;
        return 0;
    };

    this.sortGroupsByDate = function(a, b) {
        // Date
        if(a.changed < b.changed) return 1;
        if(a.changed > b.changed) return -1;

        // If same, use alpha by name
        if(a.name < b.name) return -1;
        if(a.name > b.name) return 1;

        return 0;
    };

    // Create

    this.onClickCreateGroup = function(event) {
        event.preventDefault();
        event.stopPropagation();

        var data = {
            id: 'CreateGroupPopup',
            x: event.pageX,
            y: event.pageY
        };

        gbks.tracker.trackEvent('usergroupslist', 'creategroup');

        if(this.log) {
            console.log('UserGroupsList.onClickCreateGroup', event, data);
        }

        gbks.events.call(gbks.event.ShowPopup, data);
    };

    this.onTapCreateFirstGroup = function(event) {
        if(this.log) {
            console.log('UserGroupsList.onTapCreateFirstGroup', event);
        }

        gbks.tracker.trackEvent('usergroupslist', 'createfirstgroup');

        this.onClickCreateGroup(event);
    };

    this.onCreateGroupSuccess = function(data) {
        if(this.log) {
            console.log('UserGroupsList.onCreateGroupSuccess', data);
        }

        var groupData = data.data.group;

        // Save to local list of groups
        this.groupData.groups.push(groupData);

        // Create the HTML
        var h = '';
        if(this.isSaveMode()) {
            h += this.renderer.groupCheckItem(groupData);
        } else {
            h += this.renderer.groupLinkItem(groupData);
        }
        var element = $(h);

        // Add to the page
        this.e.groupList.append(element);

        // Capture the click
        if(this.isSaveMode()) {
            element.bind('click tap', $.proxy(this.onClickItem, this));
        }

        groupData.element = element; 

        // Update the sorting
        this.updateSorting();

        // Scroll to that group
        this.scrollToGroup(groupData);
    };

    this.onCreateGroupFailure = function(data) {
        if(this.log) {
            console.log('UserGroupsListRenderer.onCreateGroupFailure', data);
        }
    };

    // Save image events.

    this.onSaveImageStart = function(data) {
        if(this.log) {
            console.log('UserGroupsList.onSaveImageStart', data);
        }

        this.e.canvas.addClass('is-loading');
    };

    this.onSaveImageSuccess = function(data) {
        if(this.log) {
            console.log('UserGroupsList.onSaveImageSuccess', data);
        }

        this.e.canvas.removeClass('is-loading');
        this.groupData = data;

        if(this.groupData.groups && this.groupData.groups.length > 0) {
            this.renderGroups();
        } else {
            this.e.canvas.addClass('no-groups');
        }

        this.updateHeight();
    };

    this.onSaveImageError = function(data) {
        if(this.log) {
            console.log('UserGroupsList.onSaveImageError', data);
        }
    };

    // Save image to group events.

    this.onSaveImageToGroupStart = function(data) {
        if(this.log) {
            console.log('UserGroupsList.onSaveImageToGroupStart', data);
        }

        this.toggleGroupItem(data.groupId, true);
    };

    this.onSaveImageToGroupSuccess = function(data) {
        if(this.log) {
            console.log('UserGroupsList.onSaveImageToGroupSuccess', data);
        }

        this.toggleGroupItem(data.groupId, true);
    };

    this.onSaveImageToGroupError = function(data) {
        if(this.log) {
            console.log('UserGroupsList.onSaveImageToGroupError', data);
        }

        this.toggleGroupItem(data.groupId, false);
    };

    // Remove image from group events.

    this.onRemoveImageFromGroupStart = function(data) {
        if(this.log) {
            console.log('UserGroupsList.onRemoveImageFromGroupStart', data);
        }

        this.toggleGroupItem(data.groupId, false);
    };

    this.onRemoveImageFromGroupSuccess = function(data) {
        if(this.log) {
            console.log('UserGroupsList.onRemoveImageFromGroupSuccess', data);
        }

        this.toggleGroupItem(data.groupId, false);
    };

    this.onRemoveImageFromGroupError = function(data) {
        if(this.log) {
            console.log('UserGroupsList.onRemoveImageFromGroupError', data);
        }

        this.toggleGroupItem(data.groupId, true);
    };

    // Helpers

    this.isSaveMode = function() {
        return (this.imageId !== null);
    };

    this.isCheckMode = function() {
        return (this.mode == 'check');
    };

    this.isLinkMode = function() {
        return (this.mode == 'link');
    };

    this.updateHeight = function() {
        if(this.options.autoHeight) {
            var height = this.e.content.height();
            this.e.canvas.css('height', height+'px');
        }
    };

    this.scrollToGroup = function(groupData) {
        var canvasHeight = this.e.canvas.height();
        var contentHeight = this.e.content.height();

        if(this.log) {
            console.log('UserGroupsList.scrollToGroup', canvasHeight, contentHeight);
        }

        var hasScrolling = (contentHeight > canvasHeight);
        hasScrolling = true;
        if(hasScrolling) {
            var item = $('li[data-id='+groupData.id+']');
            var itemPosition = item.offset().top;
            var scrollPosition = itemPosition - canvasHeight/2;

            if(this.log) {
                console.log('UserGroupsList.scrollToGroup', item, itemPosition, scrollPosition);
            }

            this.e.groups.scrollTop(scrollPosition);

            item.addClass('is-glowing');

            setTimeout(function() {
                item.removeClass('is-glowing');
            }, 1000);
        }
    };

    this.toggleGroupItem = function(groupId, active) {
        var item = $('li[data-id='+groupId+']', this.e.canvas);

        if(this.log) {
            console.log('UserGroupsList.toggleGroupItem', groupId, active, item);
        }

        gbks.tracker.trackEvent('usergroupslist', 'togglegroupitem');

        if(item.length > 0) {
            if(active) {
                item.addClass('is-active');
            } else {
                item.removeClass('is-active');
            }
        }
    };

    this.destroy = function() {
        this.isActive = false;

        if(this.log) {
            console.log('UserGroupsList.destroy');
        }

        if(this.e.canvas) {
            this.e.canvas.remove();
            this.e.canvas = null;
        }

        gbks.events.clearListener(this.id);
    };
  
};




var gbks = gbks || {};

gbks.UserGroupsListRenderer = function() {

    this.canvas = function() {
        var h = '';

        // Open wrapper.
        h += '<div class="user-groups-list">';
        h += '<div class="wrap">';
        h += '<div class="content">';

        h += this.loading();

        // Search.
        h += '<div class="content--search">';
        h += '<input type="text" placeholder="Find a group...">';
        h += '</div>';

        // Sorting
        h += this.sorting();

        // Create group option.-->
        h += '<div class="content--create">';
        h += '<a href="#">';
        h += gbks.icons.plusInCircle;
        h += '</a>';
        h += '</div>';

        // List of groups.
        h += '<div class="content--groups">';
        h += '<ul></ul>';
        h += '</div>';

        h += this.noFilterResults();
        h += this.noGroups();

        // Close wrapper.
        h += '</div>';
        h += '</div>';
        h += '</div>';

        return h;
    };

    this.groupCheckItem = function(groupData, isActive) {
        var isPrivate = groupData.private;
        var hasMembers = (groupData.members && groupData.members.length > 0);

        var h = '';
        h += '<li data-id="'+groupData.id+'"'+(isActive ? ' class="is-active"' : '')+'>';
        h += '<a href="'+groupData.url+'">';
        h += groupData.name;
        h += gbks.icons.check;

        if(isPrivate || hasMembers) {
            h += '<span class="group-properties">';
            if(isPrivate) {
                h += gbks.icons.lockFilled;
            }
            if(hasMembers) {
                h += gbks.icons.peopleFilled;
            }
            h += '</span>';
        }

        h += '</a>';
        h += '</li>';
        return h;
    };

    this.groupLinkItem = function(groupData) {
        var isPrivate = groupData.private;
        var hasMembers = (groupData.members && groupData.members.length > 0);
        
        var h = '';
        h += '<li data-id="'+groupData.id+'">';
        h += '<a href="'+groupData.url+'">';
        h += groupData.name;

        if(isPrivate || hasMembers) {
            h += '<span class="group-properties">';
            if(isPrivate) {
                h += gbks.icons.lockFilled;
            }
            if(hasMembers) {
                h += gbks.icons.peopleFilled;
            }
            h += '</span>';
        }

        h += '</a>';
        h += '</li>';
        return h;
    };

    this.noGroups = function() {
        var h = '';

        h += '<div class="content--no-groups">';
        h += '<h2>Create your first group</h2>';
        h += '<p>Create groups to keep things organized and collaborate with others</p>';
        h += '<a href="/addgroup" class="button button--create-first-group">Create a group</a>';
        h += '</div>';
        
        return h;
    };

    this.noFilterResults = function() {
        var h = '';

        h += '<div class="content--no-search-results">';
        h += '<p>No group names match<br>"<span></span>"</p>';
        h += '</div>';
        
        return h;
    };

    this.loading = function() {
        var h = '';

        h += '<div class="content--loading">';
        h += '<p>Loading your groups...</p>';
        h += '</div>';
        
        return h;
    };

    this.sorting = function() {
        var h = '';

        h += '<div class="content--sorting">';
        h += '<a href="#" data-id="alpha" title="Sorted by name" class="sorting--alpha">';
        h += gbks.icons.alphaSorting;
        h += '</a>';
        h += '<a href="#" data-id="date" title="Sorted by date of last change" class="sorting--date">';
        h += gbks.icons.dateSorting;
        h += '</a>';
        h += '</div>';
        
        return h;
    };
  
};


Vue.component('component-group-grid', {

    props: [
        'groups',
        'spacing',
        'columns'
    ],

    data: function() {
        return {
            id: 'component-group-grid_'+Date.now(),
        };
    },

    computed: {
        classObject: function() {
            var c = ['group-grid'];

            if(this.groups && this.groups.length > 0) {
                c.push('has-content');
            }

            return c.join(' ');
        }
    },

    template: `
        <div :class="classObject">
            <ul>
                <component-group-grid-item v-for="group in groups" :group="group" :key="group.id" :spacing="spacing" :columns="columns" />
            </ul>
        </div>
    `,

    mounted: function() {
        
    },

    beforeDestroy: function() {

    }

});



Vue.component('component-group-grid-item', {

    props: [
        'group',
        'spacing',
        'columns'
    ],

    data: function() {
        return {
            id: 'component-group-grid-item_'+Date.now(),
        };
    },

    computed: {
        classObject: function() {
            var c = ['pod', 'group-pod'];

            return c.join(' ');
        },

        imageGridClassObject: function() {
            var c = ['image-grid'];

            if(this.spacing) {
                c.push('spacing--'+this.spacing);
            }

            if(this.columns) {
                c.push('columns--'+this.columns);
            }

            return c.join(' ');
        },

        filteredImages: function() {
            var images = [];

            if(this.group.images) {
                images = this.group.images.slice();

                if(images.length > 4) {
                    images = images.splice(0, 4);
                }
            }

            return images;
        },

        placeholderCount: function() {
            var result = 0;
            var imageCount = 0;
            if(this.group.images) {
                imageCount = this.group.images.length;
            }

            if(this.columns) {
                result = (4 - imageCount);
            } else {
                result = (6 - imageCount);
            }

            result = Math.max(result, 0);

            return result;
        }
    },

    template: `
        <li :class="classObject">
            <div class="wrap">
                <div class="content">

                    <div v-if="group.owner" class="avatar-box">
                        <component-avatar :user="group.owner" />

                        <p><a :href="group.url">{{ group.name }}</a>
                        <br/>By <a :href="group.owner.url">{{ group.owner.name }}</a></p>
                    </div>
                    <div v-else class="avatar-box">
                        <h3>
                            <a :href="group.url">{{ group.name }}</a>
                        </h3>
                    </div>

                    <div :class="imageGridClassObject">
                        <component-grid-image v-for="image in filteredImages" :image="image" :key="image.id" />

                        <div v-for="n in placeholderCount" class="placeholder"></div>

                        <div class="info">
                            <div v-if="group.members" title="Group has multiple members">`+gbks.icons.peopleFilled+`</div>
                            <div v-if="group.private" title="Group is private">`+gbks.icons.lockFilled+`</div>
                            <div v-if="group.imageCount > 4" class="count" title="Number of images and videos in this group">{{ group.imageCount }}</div>
                        </div>
                    </div>
                </div>
            </div>
        </li>
    `,

    beforeMount: function() {
        
    },

    mounted: function() {
        console.log('a', this.group);
    },

    beforeDestroy: function() {

    }

});



Vue.component('component-grid-image', {

    props: [
        'image'
    ],

    data: function() {
        return {
            id: 'component-grid-image_'+Date.now()
        };
    },

    computed: {
        classObject: function() {
            var c = ['component-grid-image'];

            if(this.image.mature) {
                c.push('is-nsfw');
            }

            return c.join(' ');
        },

        styleObject: function() {
            var styles = {};

            if(this.image.color) {
                styles.backgroundColor = '#'+this.image.color;
            }

            return styles;
        },

        file: function() {
            return this.image.images.medium;
        }
    },

    template: `
        <a :class="classObject" :style="styleObject" :href="image.url">
            <img :src="file.url" :alt="image.title" :width="file.width" :height="file.height" />

            <div v-if="image.mature" class="nsfw-cover">
                <div class="wrap">
                    <div class="content">`+gbks.icons.facepalm+`</div>
                </div>
            </div>

            <div v-if="image.video" class="icon--video">`+gbks.icons.video+`</div>
        </a>
    `,

    mounted: function() {

    },

    beforeDestroy: function() {

    }

});



Vue.component('member-invite-list-friend', {

    props: [
        'data'
    ],

    computed: {
    	classObject: function() {
    		var c = ['component-member-invite-list-friend'];

    		return c.join(' ');
    	}
    },

    mounted: function() {
    	// console.log('friend', this);
    },

    methods: {
    	click: function() {
    		this.data.actions.inviteToGroup = true;

            gbks.events.call(gbks.event.MemberInviteListInviteToGroup, null, 'member-invite-list-friend');
    	}
    },

    template: `
        <li :class="classObject" @mousedown="click">
            <p>
                <img v-if="data.user.picture" :src="data.user.picture" width="30" height="30" :alt="data.user.name">
                <span v-else-if="!data.user.picture" class="icon--initials">{{ data.user.name.substr(0, 1) }}</span>
                
                {{ data.user.name }}
            </p>
            <div class="options">
	            <a href="#">`+gbks.icons.plus+`</a>
           	</div>
        </li>
    `

});



Vue.component('member-invite-list-invite-by-email', {

    props: [
        'email'
    ],

    methods: {
    	click: function() {
    		gbks.events.call(gbks.event.MemberInviteListInviteToGroup, { email: this.email }, 'member-invite-list-invite-by-email');
    	}
    },

    template: `
        <li class="component-member-invite-list-invite-by-email" @mousedown="click">
            <p>Send an invite to "{{ email }}"</p>
            <div class="options">
	            <a href="#">`+gbks.icons.messageFilled+`</a>
           	</div>
        </li>
    `

});



Vue.component('member-invite-list-contributor', {

    props: [
        'data'
    ],

    computed: {
    	classObject: function() {
    		var c = ['component-member-invite-list-contributor'];

    		if(this.data.actions.removeFromGroup) {
    			c.push('is-removing-from-group');
    		}

    		return c.join(' ');
    	},
    },

    methods: {
    	remove: function() {
    		this.data.actions.removeFromGroup = true;

            gbks.events.call(gbks.event.MemberInviteListRemoveFromGroup, null, 'member-invite-list-contributor');
    	},

    	cancelRemove: function() {
    		this.data.actions.removeFromGroup = false;

            gbks.events.call(gbks.event.MemberInviteListCancelRemoveFromGroup, null, 'member-invite-list-contributor');
    	}
    },

    template: `
        <li :class="classObject">
            <p>
                <img v-if="data.user.picture" :src="data.user.picture" width="30" height="30" :alt="data.user.name">
                <span v-else-if="!data.user.picture" class="icon--initials">{{ data.user.name.substr(0, 1) }}</span>

                {{ data.user.name }}
            </p>
            <div class="options">
                <template v-if="data.user.role">
    	            <div v-if="!data.actions.removeFromGroup" class="role-selector">`+gbks.icons.down+`
    		            <select v-model="data.user.role">
    			            <option value="0">Member</option>
    			            <option value="1">Manager</option>
    			            <option value="2">Admin</option>
    		            </select>
    	            </div>
                </template>
				<a v-if="data.actions.removeFromGroup" href="#" class="type--removing-from-group" @click="cancelRemove">Removing</a>
				<a v-else href="#" class="type--remove-from-group" @click="remove">Remove</a>
           	</div>
        </li>
    `

});


Vue.component('member-invite-list-invite', {

    props: [
        'data'
    ],

    computed: {
    	classObject: function() {
    		var c = ['component-member-invite-list-invite'];

    		if(this.data.actions.removeFromGroup) {
    			c.push('is-removing-from-group');
    		}

    		return c.join(' ');
    	},

    	role: function() {
    		var role = null;

    		if(this.data.user && this.data.user.role) {
    			name = this.data.user.role;
    		} else if(this.data.invite && this.data.invite.role) {
    			name = this.data.invite.role;
    		} else if(this.data.newInvite && this.data.newInvite.role) {
    			name = this.data.newInvite.role;
    		}

            return role;
    	},

    	name: function() {
    		var name = '';

    		// console.log('invite.name', this.data);

    		if(this.data.user && this.data.user.name) {
    			name = this.data.user.name;
    		} else if(this.data.invite && this.data.invite.email) {
    			name = this.data.invite.email;
    		} else if(this.data.newInvite && this.data.newInvite.email) {
    			name = this.data.newInvite.email;
    		} else {
    			name = 'Anonymous?';
    		}

    		return name;
    	}
    },

    methods: {
    	cancel: function() {
            if(this.data.invite) {
                this.data.actions.cancelInvite = true;

                gbks.events.call(gbks.event.MemberInviteListCancelInvite, null, 'member-invite-list-invite');
            } else {
                this.data.actions.inviteToGroup = false;

                var eventData = {};
                if(this.data.newInvite) {
                    eventData.email = this.data.newInvite.email;
                }

                gbks.events.call(gbks.event.MemberInviteListCancelInviteToGroup, eventData, 'member-invite-list-invite');
            }
    	},

    	uncancel: function() {
    		this.data.actions.cancelInvite = false;

            gbks.events.call(gbks.event.MemberInviteListUncancelInvite, null, 'member-invite-list-invite');
    	},

    	resend: function() {
    		this.data.actions.resendInvite = true;

            gbks.events.call(gbks.event.MemberInviteListResendInvite, null, 'member-invite-list-invite');
    	},

    	cancelResend: function() {
    		this.data.actions.resendInvite = false;

            gbks.events.call(gbks.event.MemberInviteListCancelResendInvite, null, 'member-invite-list-invite');
    	}
    },

    template: `
        <li :class="classObject">
            <p>
                <span v-if="data.newInvite" class="icon--email">`+gbks.icons.messageFilled+`</span>
                <img v-else-if="data.user && data.user.picture" :src="data.user.picture" width="30" height="30" :alt="data.user.name">
                <span v-else-if="data.user && !data.user.picture" class="icon--initials">{{ name.substr(0, 1) }}</span>

                {{ name }}
            </p>
            <div class="options">
                <template v-if="role">
    	            <div v-if="!data.actions.cancelInvite" class="role-selector">`+gbks.icons.down+`
    		            <select v-model="role">
    			            <option value="0">Guest</option>
    			            <option value="1">Member</option>
    			            <option value="2">Manager</option>
    			            <option value="3">Admin</option>
    		            </select>
    	            </div>
                </template>

                <template v-if="!data.actions.cancelInvite && data.invite">
    				<a v-if="data.actions.resendInvite" href="#" class="type--resending-invite" @click="cancelResend">Resending</a>
    				<a v-else href="#" class="type--cancel-resend-invite" @click="resend">Resend</a>
                </template>

                <a v-if="data.actions.cancelInvite" href="#" class="type--cancelling-invite" @click="uncancel">Cancelling</a>
                <a v-else href="#" class="type--cancel-invite" @click="cancel">Cancel</a>
           	</div>
        </li>
    `

});


gbks.event.MemberInviteListRemoveFromGroup = 'MemberInviteListRemoveFromGroup';
gbks.event.MemberInviteListCancelRemoveFromGroup = 'MemberInviteListCancelRemoveFromGroup';

gbks.event.MemberInviteListCancelInvite = 'MemberInviteListCancelInvite';
gbks.event.MemberInviteListUncancelInvite = 'MemberInviteListUncancelInvite';

gbks.event.MemberInviteListResendInvite = 'MemberInviteListResendInvite';
gbks.event.MemberInviteListCancelResendInvite = 'MemberInviteListCancelResendInvite';

gbks.event.MemberInviteListInviteToGroup = 'MemberInviteListInviteToGroup';
gbks.event.MemberInviteListCancelInviteToGroup = 'MemberInviteListCancelInviteToGroup';

gbks.event.MemberInviteListChangeRole = 'MemberInviteListChangeRole';

Vue.component('member-invite-list', {

    props: [
        'contacts',
        'isTeam'
    ],

    data: function() {
        var friends = [];
        var contributors = [];
        var invites = [];
        var nameInput = '';

        var i=0, length=this.contacts.length, contact;
        for(; i<length; i++) {
            contact = this.contacts[i];

            if(contact.isMember) {
                contributors.push(contact);
            } else if(contact.invite || contact.actions.inviteToGroup) {
                invites.push(contact);
            } else {
                if(friends.length < 10) {
                    friends.push(contact);
                }
            }
        }

        return {
            friends: friends,
            contributors: contributors,
            invites: invites,
            fieldActive: false,
            nameInput: nameInput,
            inputIsValidEmail: false,
            helpVisible: false,
            inviteEmails: '',
            inviteUserIds: '',
            resendInviteIds: '',
            cancelInviteIds: '',
            removeUserIds: '',
            changes: 0
        };
    },

    computed: {
        saveButtonLabel: function() {
            var result = 'Save changes';
            if(this.changes == 1) {
                result = 'Save 1 change';
            } else if(this.changes > 1) {
                result = 'Save '+this.changes+' changes';
            }
            return result;
        }
    },

    mounted: function() {
        gbks.events.listen(gbks.event.MemberInviteListRemoveFromGroup, $.proxy(this.onRemoveContributorFromGroup, this));
        gbks.events.listen(gbks.event.MemberInviteListCancelRemoveFromGroup, $.proxy(this.onCancelRemoveContributorFromGroup, this));

        gbks.events.listen(gbks.event.MemberInviteListCancelInvite, $.proxy(this.onCancelInvite, this));
        gbks.events.listen(gbks.event.MemberInviteListUncancelInvite, $.proxy(this.onUncancelInvite, this));

        gbks.events.listen(gbks.event.MemberInviteListResendInvite, $.proxy(this.onResendInvite, this));
        gbks.events.listen(gbks.event.MemberInviteListCancelResendInvite, $.proxy(this.onCancelResendInvite, this));

        gbks.events.listen(gbks.event.MemberInviteListInviteToGroup, $.proxy(this.onInviteToGroup, this));
        gbks.events.listen(gbks.event.MemberInviteListCancelInviteToGroup, $.proxy(this.onCancelInviteToGroup, this));

        gbks.events.listen(gbks.event.MemberInviteListChangeRole, $.proxy(this.onChangeRole, this));
    },

    methods: {
        getContactByUserId: function(id) {
            var result = null;
            var i=0, length=this.contacts.length, contact;
            for(; i<length; i++) {
                contact = this.contacts[i];

                if(contact.user && contact.user.id == id) {
                    result = contact;
                    break;
                }
            }
            return result;
        },

        onRemoveContributorFromGroup: function(data) {
            console.log('onRemoveContributorFromGroup', data);

            var contact = this.getContactByUserId(data.id);
            if(contact) {
                contact.actions.removeFromGroup = true;
            }

            this.updateForm();
        },

        onCancelRemoveContributorFromGroup: function(data) {
            console.log('onCancelRemoveContributorFromGroup', data);

            var contact = this.getContactByUserId(data.id);
            if(contact) {
                contact.actions.removeFromGroup = false;
            }

            this.updateForm();
        },

        onCancelInvite: function(data) {
            console.log('onCancelInvite', data);
            this.refresh();
            this.updateForm();
        },

        onUncancelInvite: function(data) {
            console.log('onUncancelInvite', data);

            this.updateForm();
        },

        onResendInvite: function(data) {
            console.log('onResendInvite', data);
            
            this.updateForm();
        },

        onCancelResendInvite: function(data) {
            console.log('onCancelResendInvite', data);
            
            this.updateForm();
        },

        onInviteToGroup: function(data) {
            console.log('onInviteToGroup', data);

            if(data.email) {
                // console.log('adding by email', data.email);

                var contact = {
                    newInvite: {
                        id: this.contacts.length,
                        email: data.email,
                        role: 0
                    },
                    actions: {
                        resendInvite: false,
                        removeFromGroup: false,
                        cancelInvite: false,
                        inviteToGroup: true
                    }
                }
                this.contacts.push(contact);
            }

            this.nameInput = '';
            this.inputIsValidEmail = false;

            this.refresh();
            // this.updateForm();
        },

        onCancelInviteToGroup: function(data) {
            console.log('onCancelInviteToGroup', data);

            if(data.email) {
                var i=0, length=this.contacts.length, contact;
                for(; i<length; i++) {
                    contact = this.contacts[i];

                    if(contact.newInvite && contact.newInvite.email) {
                        this.contacts.splice(i, 1);
                        break;
                    }
                }                
            }

            this.refresh();
            this.updateForm();

            // console.log('this.contacts', this.contacts);
        },

        onChangeRole: function(data) {
            console.log('onChangeRole', data);

            this.updateForm();
        },

        onFocusField: function() {
            this.fieldActive = true;
        },

        onBlurField: function() {
            this.fieldActive = false;
        },

        onChangeField: function(event) {
            event.preventDefault();

            // console.log('onChangeField', event);

            if(event.keyCode == 13) {
                // Enter - if input is an email, add it.
                this.validateEmail();

                if(this.inputIsValidEmail) {
                    this.onInviteToGroup({ email: this.nameInput });

                    this.$refs.nameInput.blur();
                }
            } else {
                // Check if input is a valid email
                this.validateEmail();

                // Update sorting
                this.refresh();
            }
        },

        validateEmail: function() {
            // Check if the input is a valid email.
            var email = this.nameInput;
            var atIndex = email.indexOf('@');
            var dotIndex = email.indexOf('.');

            var minLength = email.length > 5;
            var hasAt = (atIndex !== -1);
            var hasDot = (dotIndex !== -1);
            var dotAfterAt = (dotIndex > atIndex);
            var atNotFirst = (atIndex > 0);
            var dotNotLast = dotIndex < (email.length -1 );

            var isEmail = (minLength && hasAt && hasDot && dotAfterAt && atNotFirst && dotNotLast);
            this.inputIsValidEmail = isEmail;
        },

        refresh: function() {
            var friends = [];
            var contributors = [];
            var invites = [];

            var filter;

            if(this.nameInput) {
                filter = this.nameInput.toLowerCase();
            }

            // console.log('onChangeField', this.nameInput, this.filter);

            var i=0, length=this.contacts.length, contact, name;
            for(; i<length; i++) {
                contact = this.contacts[i];

                if(contact.isMember) {
                    contributors.push(contact);
                } else if(contact.invite || contact.actions.inviteToGroup) {
                    invites.push(contact);
                } else {
                    var isMatch = true;
                    if(filter && filter.length > 0) {
                        isMatch = false;
                        // console.log('i', i, contact);
                        name = contact.user.name.toLowerCase(); 
                        if(name.indexOf(filter) != -1) {
                            isMatch = true;
                        }
                    }

                    if(isMatch && friends.length < 10) {
                        friends.push(contact);
                    }
                }
            }

            // console.log('invites', invites.length);

            this.contributors = contributors;
            this.invites = invites;
            this.friends = friends;

            this.updateForm();
        },

        updateForm: function() {
            var inviteEmails = [];
            var inviteUserIds = [];
            var resendInviteIds = [];
            var cancelInviteIds = [];
            var removeUserIds = [];

            var i=0, length=this.contacts.length, contact, name;
            for(; i<length; i++) {
                contact = this.contacts[i];

                // console.log(i, contact);

                if(contact.actions.cancelInvite) {
                    cancelInviteIds.push(contact.invite.id);
                } else if(contact.actions.resendInvite) {
                    resendInviteIds.push(contact.invite.id);
                } else if(contact.actions.removeFromGroup) {
                    removeUserIds.push(contact.user.id);
                } else if(contact.actions.inviteToGroup) {
                    // console.log('inviteToGroup', contact);
                    if(contact.user) {
                        inviteUserIds.push(contact.user.id);
                    } else if(contact.newInvite) {
                        inviteEmails.push(contact.newInvite.email);
                    }
                }
            }

            // console.log('inviteEmails', inviteEmails);
            // console.log('inviteUserIds', inviteUserIds);
            // console.log('resendInviteIds', resendInviteIds);
            // console.log('cancelInviteIds', cancelInviteIds);
            // console.log('removeUserIds', removeUserIds);

            this.inviteEmails = inviteEmails.join(',');
            this.inviteUserIds = inviteUserIds.join(',');
            this.resendInviteIds = resendInviteIds.join(',');
            this.cancelInviteIds = cancelInviteIds.join(',');
            this.removeUserIds = removeUserIds.join(',');

            // Count how many changes were made
            this.changes = inviteEmails.length + inviteUserIds.length + resendInviteIds.length + cancelInviteIds.length + removeUserIds.length;
        },

        onClickHelp: function() {
            this.helpVisible = true;
        }
    },

    template: `
        <div class="component-member-invite-list">

            <section class="section--invite">
                <input type="hidden" name="inviteEmails" v-model="inviteEmails">
                <input type="hidden" name="inviteUserIds" v-model="inviteUserIds">
                <input type="hidden" name="resendInviteIds" v-model="resendInviteIds">
                <input type="hidden" name="cancelInviteIds" v-model="cancelInviteIds">
                <input type="hidden" name="removeUserIds" v-model="removeUserIds">

                <label for="input--contributors">Invite someone</label>

                <div class="content">
                    <div class="invite-wrap">
                        <input type="text" id="input--contributors" ref="nameInput" name="contributors" autocomplete="off" placeholder="Enter a username or email" v-model="nameInput" @blur="onBlurField" @focus="onFocusField" @keyup="onChangeField">
                    </div>

                    <div class="help">
                        <a href="#" v-if="!helpVisible" @click="onClickHelp">How it works</a>
                        <p v-if="helpVisible">Enter an email address or the username of somebody you follow and also follows you. We will send them an email to join the group, and will also email you when they accept or decline. Make sure to save when you are done making changes here.</p>
                    </div>

                    <ul class="list--friends" v-if="fieldActive">
                        <member-invite-list-invite-by-email v-if="inputIsValidEmail" key="invite-by-email" :email="nameInput"></member-invite-list-invite-by-email>
                        <member-invite-list-friend v-for="friend in friends" key="friend.user.id" :data="friend"></member-invite-list-friend>
                    </ul>
                </div>
            </section>

            <section class="section--contributors" v-if="contributors.length > 0">
                <label>Current members</label>
                <div class="content">
                    <ul class="list--contributors">
                        <member-invite-list-contributor v-for="contributor in contributors" key="contributor.user.id" :data="contributor"></member-invite-list-contributor>
                    </ul>
                </div>
            </section>

            <section class="section--open-invites" v-if="invites.length > 0">
                <label>Open invites</label>

                <div class="content">
                    <ul class="list--open-invites">
                        <member-invite-list-invite v-for="invite in invites" key="invite.user.id" :data="invite"></member-invite-list-invite>
                    </ul>
                </div>
            </section>

            <section class="section--options">
                <input type="submit" name="submitButton" :value="saveButtonLabel" :disabled="changes == 0">
            </section>

        </div>
    `

});


var gbks = gbks || {};

/*

Handles all create group buttons across the whole site.

 */

gbks.CreateGroupButtons = function() {
    
    this.init = function() {
        this.id = 'CreateGroupButtons';
        this.log = !false;
        this.classes = {
            button: '.button--create-group',
            active: 'is-active',
            loading: 'is-loading'
        };

        if(this.log) {
            console.log('CreateGroupButtons.init');
        }

        this.buttonMethod = $.proxy(this.onClickButton, this);

        gbks.events.listen(gbks.event.SetupNewContent, $.proxy(this.onSetupNewContent, this), this.id);

        this.setupButtonEvents($('body'));
    };

    this.onSetupNewContent = function(data) {
        this.setupButtonEvents(data.canvas);
    };

    // Resets all the follow buttons events in a given container
    this.setupButtonEvents = function(canvas) {
        var buttons = $(this.classes.button, canvas);
        buttons.unbind('click', this.buttonMethod);
        buttons.bind('click', this.buttonMethod);
    };

    // Events

    this.onClickButton = function(event) {
        event.preventDefault();
        event.stopPropagation();

        var data = {
            id: 'CreateGroupPopup',
            x: event.pageX,
            y: event.pageY
        };

        gbks.tracker.trackEvent('button', 'creategroup', 'click');

        if(this.log) {
            console.log('CreateGroupButtons.onClickCreateGroup', event, data);
        }

        gbks.events.call(gbks.event.ShowPopup, data);
    };

};


var gbks = gbks || {};

/*

Handles all follow buttons across the whole site.
Can follow users, sources and groups.

 */

gbks.FollowButtons = function() {
	
    this.init = function() {
        this.id = 'FollowButtons';
        this.log = false;
        this.classes = {
            userButton: '.button--follow-user',
            sourceButton: '.button--follow-source',
            colorButton: '.button--follow-color',
            groupButton: '.button--follow-group',
            active: 'is-active',
            loading: 'is-loading'
        };

        if(this.log) {
            console.log('FollowButtons.init');
        }

        this.userButtonMethod = $.proxy(this.onClickFollowUserButton, this);
        this.sourceButtonMethod = $.proxy(this.onClickFollowSourceButton, this);
        this.colorButtonMethod = $.proxy(this.onClickFollowColorButton, this);
        this.groupButtonMethod = $.proxy(this.onClickFollowGroupButton, this);

        gbks.events.listen(gbks.event.SetupNewContent, $.proxy(this.onSetupNewContent, this), this.id);

        gbks.events.listen(gbks.event.FollowUserStart, $.proxy(this.onFollowUserStart, this), this.id);
        gbks.events.listen(gbks.event.FollowUserSuccess, $.proxy(this.onFollowUserSuccess, this), this.id);
        gbks.events.listen(gbks.event.FollowUserError, $.proxy(this.onFollowUserError, this), this.id);

        gbks.events.listen(gbks.event.UnfollowUserStart, $.proxy(this.onUnfollowUserStart, this), this.id);
        gbks.events.listen(gbks.event.UnfollowUserSuccess, $.proxy(this.onUnfollowUserSuccess, this), this.id);
        gbks.events.listen(gbks.event.UnfollowUserError, $.proxy(this.onUnfollowUserError, this), this.id);

        gbks.events.listen(gbks.event.FollowSourceStart, $.proxy(this.onFollowSourceStart, this), this.id);
        gbks.events.listen(gbks.event.FollowSourceSuccess, $.proxy(this.onFollowSourceSuccess, this), this.id);
        gbks.events.listen(gbks.event.FollowSourceError, $.proxy(this.onFollowSourceError, this), this.id);

        gbks.events.listen(gbks.event.UnfollowSourceStart, $.proxy(this.onUnfollowSourceStart, this), this.id);
        gbks.events.listen(gbks.event.UnfollowSourceSuccess, $.proxy(this.onUnfollowSourceSuccess, this), this.id);
        gbks.events.listen(gbks.event.UnfollowSourceError, $.proxy(this.onUnfollowSourceError, this), this.id);

        gbks.events.listen(gbks.event.FollowGroupStart, $.proxy(this.onFollowGroupStart, this), this.id);
        gbks.events.listen(gbks.event.FollowGroupSuccess, $.proxy(this.onFollowGroupSuccess, this), this.id);
        gbks.events.listen(gbks.event.FollowGroupError, $.proxy(this.onFollowGroupError, this), this.id);

        gbks.events.listen(gbks.event.UnfollowGroupStart, $.proxy(this.onUnfollowGroupStart, this), this.id);
        gbks.events.listen(gbks.event.UnfollowGroupSuccess, $.proxy(this.onUnfollowGroupSuccess, this), this.id);
        gbks.events.listen(gbks.event.UnfollowGroupError, $.proxy(this.onUnfollowGroupError, this), this.id);

        this.setupButtonEvents($('body'));
    };

    this.onSetupNewContent = function(data) {
        this.setupButtonEvents(data.canvas);
    };

    // Resets all the follow buttons events in a given container
    this.setupButtonEvents = function(canvas) {
        if(!gbks.permissions.userIsLoggedIn()) {
            return false;
        }

        var userButtons = $(this.classes.userButton, canvas);
        userButtons.unbind('click', this.userButtonMethod);
        userButtons.bind('click', this.userButtonMethod);

        if(this.log) {
            console.log('FollowButtons.setupButtonEvents', userButtons);
        }

        var sourceButtons = $(this.classes.sourceButton, canvas);
        sourceButtons.unbind('click', this.sourceButtonMethod);
        sourceButtons.bind('click', this.sourceButtonMethod);

        var colorButtons = $(this.classes.colorButton, canvas);
        colorButtons.unbind('click', this.colorButtonMethod);
        colorButtons.bind('click', this.colorButtonMethod);

        var groupButtons = $(this.classes.groupButton, canvas);
        groupButtons.unbind('click', this.groupButtonMethod);
        groupButtons.bind('click', this.groupButtonMethod);
    };

    // User

    this.onClickFollowUserButton = function(event) {
        event.preventDefault();
        event.stopPropagation();

        var button = $(event.currentTarget);
        var id = button.data('id');

        if(button.hasClass(this.classes.active)) {
            gbks.tracker.trackEvent('button', 'unfollow', 'click', id);

            gbks.events.call(gbks.event.UnfollowUser, {userId: id});
        } else {
            gbks.tracker.trackEvent('button', 'follow', 'click', id);

            gbks.events.call(gbks.event.FollowUser, {userId: id});
        }
    };

    this.onFollowUserStart = function(data) {
        this.toggleButton(this.classes.userButton, data.userId, true);
    };

    this.onFollowUserSuccess = function(data) {
        this.toggleButton(this.classes.userButton, data.userId, true);
    };

    this.onFollowUserError = function(data) {
        this.toggleButton(this.classes.userButton, data.userId, false);
    };

    this.onUnfollowUserStart = function(data) {
        this.toggleButton(this.classes.userButton, data.userId, false);
    };

    this.onUnfollowUserSuccess = function(data) {
        this.toggleButton(this.classes.userButton, data.userId, false);
    };

    this.onUnfollowUserError = function(data) {
        this.toggleButton(this.classes.userButton, data.userId, true);
    };

    // Source

    this.onClickFollowSourceButton = function(event) {
        event.preventDefault();
        event.stopPropagation();

        var button = $(event.currentTarget);
        var id = button.data('id');

        console.log('onClickFollowSourceButton', id, button);

        if(button.hasClass(this.classes.active)) {
            gbks.events.call(gbks.event.UnfollowSource, {sourceId: id});
        } else {
            gbks.events.call(gbks.event.FollowSource, {sourceId: id});
        }
    };

    this.onFollowSourceStart = function(data) {
        this.toggleButton(this.classes.sourceButton, data.sourceId, true);
    };

    this.onFollowSourceSuccess = function(data) {
        this.toggleButton(this.classes.sourceButton, data.sourceId, true);
    };

    this.onFollowSourceError = function(data) {
        this.toggleButton(this.classes.sourceButton, data.sourceId, false);
    };

    this.onUnfollowSourceStart = function(data) {
        this.toggleButton(this.classes.sourceButton, data.sourceId, false);
    };

    this.onUnfollowSourceSuccess = function(data) {
        this.toggleButton(this.classes.sourceButton, data.sourceId, false);
    };

    this.onUnfollowSourceError = function(data) {
        this.toggleButton(this.classes.sourceButton, data.sourceId, true);
    };

    // Group

    this.onClickFollowGroupButton = function(event) {
        event.preventDefault();
        event.stopPropagation();

        var button = $(event.currentTarget);
        var id = button.data('id');

        if(button.hasClass(this.classes.active)) {
            gbks.events.call(gbks.event.UnfollowGroup, {groupId: id});
        } else {
            gbks.events.call(gbks.event.FollowGroup, {groupId: id});
        }
    };

    this.onFollowGroupStart = function(data) {
        this.toggleButton(this.classes.groupButton, data.groupId, true);
    };

    this.onFollowGroupSuccess = function(data) {
        this.toggleButton(this.classes.groupButton, data.groupId, true);
    };

    this.onFollowGroupError = function(data) {
        this.toggleButton(this.classes.groupButton, data.groupId, false);
    };

    this.onUnfollowGroupStart = function(data) {
        this.toggleButton(this.classes.groupButton, data.groupId, false);
    };

    this.onUnfollowGroupSuccess = function(data) {
        this.toggleButton(this.classes.groupButton, data.groupId, false);
    };

    this.onUnfollowGroupError = function(data) {
        this.toggleButton(this.classes.groupButton, data.groupId, true);
    };

    // Helpers.

    this.toggleButton = function(type, id, isActive) {
        var button = $(type+'[data-id='+id+']');

        if(this.log) {
            console.log('FollowButtons.toggleButton', type, id, isActive, button);
        }

        if(isActive) {
            button.addClass(this.classes.active);
            button.html('Following');
        } else {
            button.removeClass(this.classes.active);
            button.html('Follow');
        }
    }

};


var gbks = gbks || {};

/*

Handles all like buttons across the whole site.

 */

gbks.LikeButtons = function() {
	
    this.init = function() {
        this.id = 'LikeButtons';
        this.log = false;
        
        this.classes = {
            likeButton: '.button--like',
            active: 'is-active',
            loading: 'is-loading'
        };

        this.likeButtonMethod = $.proxy(this.onClickLikeButton, this);

        gbks.events.listen(gbks.event.SetupNewContent, $.proxy(this.onSetupButtons, this), this.id);

        gbks.events.listen(gbks.event.LikeImageStart, $.proxy(this.onLikeImageStart, this), this.id);
        gbks.events.listen(gbks.event.LikeImageSuccess, $.proxy(this.onLikeImageSuccess, this), this.id);
        gbks.events.listen(gbks.event.LikeImageError, $.proxy(this.onLikeImageError, this), this.id);

        gbks.events.listen(gbks.event.UnlikeImageStart, $.proxy(this.onUnlikeImageStart, this), this.id);
        gbks.events.listen(gbks.event.UnlikeImageSuccess, $.proxy(this.onUnlikeImageSuccess, this), this.id);
        gbks.events.listen(gbks.event.UnlikeImageError, $.proxy(this.onUnlikeImageError, this), this.id);

        this.setupButtonEvents($('body'));
    };

    this.onSetupButtons = function(data) {
        this.setupButtonEvents(data.canvas);
    };

    // Resets all the follow buttons events in a given container
    this.setupButtonEvents = function(canvas) {
        if(!gbks.permissions.userIsLoggedIn()) {
            return false;
        }

        var likeButtons = $(this.classes.likeButton, canvas);
        likeButtons.unbind('click', this.likeButtonMethod);
        likeButtons.bind('click', this.likeButtonMethod);

        if(this.log) {
            console.log('LikeButtons.setupButtonEvents', likeButtons);
        }
    };

    // Liking

    this.onClickLikeButton = function(event) {
        event.stopPropagation();
        event.preventDefault();

        var button = $(event.currentTarget);
        var imageId = button.data('id');
        var isActive = button.hasClass(this.classes.active);

        if(isActive) {
            gbks.tracker.trackEvent('button', 'unlike', 'click', imageId);

            this.unlikeImage(imageId);
        } else {
            gbks.tracker.trackEvent('button', 'like', 'click', imageId);

            this.likeImage(imageId);
        }
    };

    // Like

    this.likeImage = function(imageId) {
        gbks.events.call(gbks.event.LikeImage, {imageId: imageId});

        gbks.common.track('Image', 'like', imageId);
    };

    this.onLikeImageStart = function(data) {
        if(this.log) {
            console.log('LikeButtons.onLikeImageStart', data);
        }

        this.toggleLikeButton(data, true, true);
    };

    this.onLikeImageSuccess = function(data) {
        if(this.log) {
            console.log('LikeButtons.onLikeImageSuccess', data);
        }

        this.toggleLikeButton(data, true, false);
    };

    this.onLikeImageError = function(data) {
        if(this.log) {
            console.log('LikeButtons.onLikeImageError', data);
        }

        this.toggleLikeButton(data, false, false);
    };

    // Unlike

    this.unlikeImage = function(imageId) {
        if(this.log) {
            console.log('LikeButtons.unlikeImage', imageId);
        }

        gbks.events.call(gbks.event.UnlikeImage, {imageId: imageId});

        gbks.common.track('Image', 'unlike', imageId);
    };

    this.onUnlikeImageStart = function(data) {
        if(this.log) {
            console.log('LikeButtons.onUnlikeImageStart', data);
        }
        
        this.toggleLikeButton(data, false, true);
    };

    this.onUnlikeImageSuccess = function(data) {
        if(this.log) {
            console.log('LikeButtons.onUnlikeImageSuccess', data);
        }
        
        this.toggleLikeButton(data, false, false);
    };

    this.onUnlikeImageError = function(data) {
        if(this.log) {
            console.log('LikeButtons.onUnlikeImageError', data);
        }
        
        this.toggleLikeButton(data, true, false);
    };

    this.toggleLikeButton = function(data, isActive, isLoading) {
        var button = $(this.classes.likeButton+'[data-id='+data.imageId+']');

        if(this.log) {
            console.log('LikeButtons.toggleLikeButton', data, button, isActive, isLoading);
        }

        if(button.length > 0) {
            var span = $('span', button);
            if(isActive) {
                button.addClass(this.classes.active);
                span.html('Liked');
            } else {
                button.removeClass(this.classes.active);
                span.html('Like');
            }

            if(isLoading) {
                button.addClass(this.classes.loading);
            } else {
                button.removeClass(this.classes.loading);
            }
        }
    };

    this.destroy = function() {
        gbks.events.clearListener(this.id);
    };

};


var gbks = gbks || {};

/*

Handles all save buttons across the whole site.

 */

gbks.SaveButtons = function() {
    
    this.init = function() {
        this.id = 'SaveButtons';
        this.log = false;
        this.savePopup = null;
        
        this.classes = {
            saveButton: '.button--save',
            active: 'is-active',
            loading: 'is-loading'
        };

        this.saveButtonMethod = $.proxy(this.onClickSaveButton, this);

        gbks.events.listen(gbks.event.SetupNewContent, $.proxy(this.onSetupButtons, this), this.id);

        gbks.events.listen(gbks.event.SaveImageStart, $.proxy(this.onSaveImageStart, this), this.id);
        gbks.events.listen(gbks.event.SaveImageSuccess, $.proxy(this.onSaveImageSuccess, this), this.id);
        gbks.events.listen(gbks.event.SaveImageError, $.proxy(this.onSaveImageError, this), this.id);

        gbks.events.listen(gbks.event.UnsaveImageStart, $.proxy(this.onUnsaveImageStart, this), this.id);
        gbks.events.listen(gbks.event.UnsaveImageSuccess, $.proxy(this.onUnsaveImageSuccess, this), this.id);
        gbks.events.listen(gbks.event.UnsaveImageError, $.proxy(this.onUnsaveImageError, this), this.id);

        this.setupButtonEvents($('body'));
    };

    this.onSetupButtons = function(data) {
        this.setupButtonEvents(data.canvas);
    };

    // Resets all the follow buttons events in a given container
    this.setupButtonEvents = function(canvas) {
        if(!gbks.permissions.userIsLoggedIn()) {
            return false;
        }

        var saveButtons = $(this.classes.saveButton, canvas);
        saveButtons.unbind('click', this.saveButtonMethod);
        saveButtons.bind('click', this.saveButtonMethod);
    };

    // Liking

    this.onClickSaveButton = function(event) {
        event.stopPropagation();
        event.preventDefault();

        var button = $(event.currentTarget);
        var imageId = button.data('id');

        gbks.tracker.trackEvent('button', 'save', 'click', imageId);

        this.saveImage(imageId, button);
    };

    // Save

    this.saveImage = function(imageId, button) {
        if(this.log) {
            console.log('SaveButtons.saveImage', imageId, button);
        }

        gbks.events.call(gbks.event.ShowPopup, {
            id: 'SavePopup',
            imageId: imageId,
            button: button
        });

        // gbks.events.call(gbks.event.SaveImage, {imageId: imageId});

        gbks.common.track('Image', 'save', imageId);
    };

    this.onSaveImageStart = function(data) {
        if(this.log) {
            console.log('SaveButtons.onSaveImageStart', data);
        }

        this.toggleSaveButton(data, true, true);
    };

    this.onSaveImageSuccess = function(data) {
        if(this.log) {
            console.log('SaveButtons.onSaveImageSuccess', data);
        }

        this.toggleSaveButton(data, true, false);
    };

    this.onSaveImageError = function(data) {
        if(this.log) {
            console.log('SaveButtons.onSaveImageError', data);
        }
        
        this.toggleSaveButton(data, false, false);
    };

    // Unsave

    this.unsaveImage = function(imageId) {
        gbks.events.call(gbks.event.UnsaveImage, {imageId: imageId});

        gbks.common.track('Image', 'unsave', imageId);
    };

    this.onUnsaveImageStart = function(data) {
        if(this.log) {
            console.log('SaveButtons.onUnsaveImageStart', data);
        }
        
        this.toggleSaveButton(data, false, false);
    };

    this.onUnsaveImageSuccess = function(data) {
        if(this.log) {
            console.log('SaveButtons.onUnsaveImageSuccess', data);
        }
        
        this.toggleSaveButton(data, false, false);
    };

    this.onUnsaveImageError = function(data) {
        if(this.log) {
            console.log('SaveButtons.onUnsaveImageError', data);
        }
        
        this.toggleSaveButton(data, true, false);
    };

    this.toggleSaveButton = function(data, isActive, isLoading) {
        var button = $(this.classes.saveButton+'[data-id='+data.imageId+']');
        if(button.length > 0) {
            var span = $('span', button);
            if(isActive) {
                button.addClass(this.classes.active);
                span.html('Saved');
            } else {
                button.removeClass(this.classes.active);
                span.html('Save');
            }

            if(isLoading) {
                button.addClass(this.classes.loading);
            } else {
                button.removeClass(this.classes.loading);
            }
        }
    };

    this.destroy = function() {
        gbks.events.clearListener(this.id);
    };

};


var gbks = gbks || {};

/*

Handles all share buttons across the whole site.

 */

gbks.ShareButtons = function() {
    
    this.init = function() {
        this.id = 'ShareButtons';
        this.log = false;
        
        this.classes = {
            shareButton: '.button--share',
            active: 'is-active',
            loading: 'is-loading'
        };

        this.shareButtonMethod = $.proxy(this.onClickShareButton, this);

        gbks.events.listen(gbks.event.SetupNewContent, $.proxy(this.onSetupButtons, this), this.id);

        this.setupButtonEvents('body');
    };

    this.onSetupButtons = function(data) {
        this.setupButtonEvents(data.canvas);
    };

    // Resets all the follow buttons events in a given container
    this.setupButtonEvents = function(canvas) {
        var shareButtons = $(this.classes.shareButton, canvas);
        shareButtons.unbind('click', this.shareButtonMethod);
        shareButtons.bind('click', this.shareButtonMethod);

        if(this.log) {
            console.log('ShareButtons.setupButtonEvents', shareButtons);
        }
    };

    // Liking

    this.onClickShareButton = function(event) {
        event.stopPropagation();
        event.preventDefault();

        var button = $(event.currentTarget);
        var imageId = button.data('id');

        // this.hidePopups('share');

        if(button.hasClass(this.classes.active)) {
            //sharing.removeClass('active');
            button.removeClass(this.classes.active);
            this.onHideSharePopup();
        } else {
            //sharing.addClass('active');
            button.addClass(this.classes.active);

            gbks.common.track('button', 'share', imageId);

            this.sharePopup = new gbks.common.SharePopup();
            this.sharePopup.display(imageId, button, $.proxy(this.onHideSharePopup, this));
        }
    };

    // Share

    this.shareImage = function(imageId) {
        gbks.events.call(gbks.event.ShareImage, {imageId: imageId});

        gbks.common.track('Image', 'share', imageId);
    };

    this.onShareImageStart = function(data) {
        this.e.shareButton.addClass(this.classes.loading);

        this.toggleShareButton(data, true);
    };

    this.onShareImageSuccess = function(data) {
        this.e.shareButton.removeClass(this.classes.loading);

        this.sharePopup = new gbks.common.SharePopup();
        this.sharePopup.init(this.e.shareButton, result, $.proxy(this.onClickRemoveImage, this), $.proxy(this.onCloseSharePopup, this));
    };

    this.onShareImageError = function(data) {
        this.e.shareButton.removeClass(this.classes.loading);

        this.toggleShareButton(data, false);
    };

    // Unshare

    this.unshareImage = function(imageId) {
        gbks.events.call(gbks.event.UnshareImage, {imageId: imageId});

        gbks.common.track('Image', 'unshare', imageId);
    };

    this.onUnshareImageStart = function(data) {
        this.e.shareButton.addClass(this.classes.loading);

        this.toggleShareButton(data, false);
    };

    this.onUnshareImageSuccess = function(data) {
        this.e.shareButton.removeClass(this.classes.loading);
    };

    this.onUnshareImageError = function(data) {
        this.e.shareButton.removeClass(this.classes.loading);

        this.toggleShareButton(data, true);
    };

    this.toggleShareButton = function(data, active) {
        var button = $(this.classes.shareButton+'[data-id='+data.imageId+']');
        if(button.length > 0) {
            var span = $('span', button);
            if(active) {
                button.addClass(this.classes.active);
                span.html('Shared');
            } else {
                button.removeClass(this.classes.active);
                span.html('Share');
            }
        }
    };

    // Helpers

    this.hideSharePopup = function() {
        if(this.sharePopup) {
            this.sharePopup.hide();
            this.sharePopup = null;
        }
    };

    this.onHideSharePopup = function(event) {
        if(this.sharePopup) {
            this.sharePopup.hide();
            this.sharePopup = null;
        }
        if(this.e.shareButton) {
            this.e.shareButton.removeClass(this.classes.active);
        }
    };

    this.destroy = function() {
        gbks.events.clearListener(this.id);
    };

};


/**
 * Grid handler.
 */

var gbks = gbks || {};

gbks.TileGrid = function() { 
  
    this.init = function() {
        console.log('TileGrid.init');

        this.layout = new gbks.TileLayout();
        this.layout.init(config);

        this.polaroid = new gbks.ImageTile();
        this.polaroid.init();
    };

    this.setHistory = function(url, title) {
        var supported = (typeof history.pushState !== 'undefined');
        if(supported) {
            history.pushState({url: url, title: title}, title, url);
        }
    };

    this.onHistoryChange = function(event) {
        var state = event.state;
    };
};

// $(document).ready(function() {
//     if($('.pod--tile-grid').length > 0 && !gbks.gridInstance) {
//         grid = new gbks.Grid();
//         grid.init(pageConfig);
//     }
// });

gbks.modules = gbks.modules || [];
gbks.modules.push({
  name: 'TileGrid',
  canvas: '.pod--tile-grid',
  class: gbks.TileGrid
});


/**
 * Handles automatic layout of polaroids.
 */

var gbks = gbks || {};

gbks.TileLayout = function() {
  
    this.init = function(config) {
        this.id = 'TileLayout';
        this.log = false;
        this.fadeIndex = 0;

        this.config = $.extend({}, {
            currentPage: 0,
            columnWidth: 232,
            itemOffset: 0,
            itemWidth: 232,
            itemMargin: 22,
            maxWidth: null,
            columns: [],
            columnCount: null,
            baseOffset: null,
            itemCount: null
        }, config);

        this.classes = {
            canvas: '.pod--tile-grid',
            wrap: '> .wrap',
            content: '> .content',
            tile: '> .tile'
        };

        // gbks.tilesInstance = this;
        // tiles = this;

        this.collectElements();
        this.collectData();

        if(this.e.canvas.length > 0) {
            this.updateLayout();

            this.initAutoLayout();

            if(this.pageConfig.type) {
                this.startEndlessScroll();
            }
        }

        if(this.log) {
            console.log('TileLayout.init', this.config, this.e);
        }

        gbks.events.listen(gbks.event.LoadImagesStart, $.proxy(this.onLoadImagesStart, this), this.id);
        gbks.events.listen(gbks.event.LoadImagesSuccess, $.proxy(this.onLoadImagesSuccess, this), this.id);
        gbks.events.listen(gbks.event.LoadImagesError, $.proxy(this.onLoadImagesError, this), this.id);
        gbks.events.listen(gbks.event.ShowLightbox, $.proxy(this.onLightboxShown, this), this.id);
        gbks.events.listen(gbks.event.HideLightbox, $.proxy(this.onLightboxHidden, this), this.id);
        gbks.events.listen(gbks.event.ResizeTiles, $.proxy(this.onTileResize, this), this.id);

        gbks.events.listen(gbks.event.UpdateGridConfig, $.proxy(this.onUpdateGridConfig, this), this.id);

        //setTimeout($.proxy(this.tiles.show, this.tiles), 25);

        //this.fadeImages();
    };

    this.onUpdateGridConfig = function(data) {
        this.pageConfig = $.extend(this.pageConfig, data);
    };

    this.collectElements = function() {
        var e = {};

        e.canvas = $(this.classes.canvas);
        e.wrap = $(this.classes.wrap, e.canvas);
        e.content = $(this.classes.content, e.wrap);
        e.tiles = $(this.classes.tile, e.content);
        e.loader = $('#loader');

        this.e = e;
    };

    this.onLightboxShown = function() {
        if(this.log) {
            console.log('TileLayout.onLightboxShown');
        }

        this.stopEndlessScroll();
    };

    this.onLightboxHidden = function() {
        if(this.log) {
            console.log('TileLayout.onLightboxHidden');
        }

        this.startEndlessScroll();
    };
  
    this.collectData = function() {
        this.data = {
            columns: [],
            heights: [],
            root: this.e.canvas.data('root')
        };

        this.pageConfig = $.extend(this.e.canvas.data(), {
            page: 0,
            format: 'json'
        });
    };

    this.onTileResize = function() {
        this.updateLayout();
    };
  
    this.updateLayout = function() {
        this.layout(this.data);
    };
  
  /**
   * Do a full layout update.
   */
  this.layout = function(data) {
    var maxWidth;

    if(this.e.content) {
      maxWidth = this.e.content.outerWidth();
    }
    
    if($('body').hasClass('hidenav') !== true) {
      //maxWidth -= $('#kaori').width();
    }
    
    if(this.log) {
        console.log('TileLayout.layout', data);
    }
    
    if(this.maxWidth) {
        maxWidth = this.config.maxWidth;
    }

    var columnWidth = this.config.columnWidth + this.config.itemMargin;
    var maxColumns = Math.floor(maxWidth / columnWidth);
    var baseOffset = Math.round((maxWidth + this.config.itemMargin - (maxColumns*columnWidth))/2);
    var itemWidth = this.config.itemWidth;
    
    if(this.log) {
        console.log('columnWidth', columnWidth);
        console.log('maxColumns', maxColumns);
        console.log('baseOffset', baseOffset);
        console.log('config', this.config);
        console.log('this.itemMargin', this.config.itemMargin);
        console.log('maxWidth', maxWidth, this.e.canvas.outerWidth());
    }
    
    if(maxColumns == data.columns.length && this.config.baseOffset == baseOffset && this.config.itemCount == this.e.tiles.length) {
      this.columnLayout(data, columnCount);
      return;
    }
    
    var tileCount = this.e.tiles.length;
    var columnCount = maxColumns;
    
    data.heights = [];
    while(data.heights.length < maxColumns) {
      data.heights.push(0);
    }
    
    data.columns = [];
    while(data.columns.length < maxColumns) {
      data.columns.push([]);
    }
    
    var tile, top, left;
    var i=0;
    var k = 0;
    var shortest = null;
    var shortestIndex = 0;
    for(; i<tileCount; i++ ) {
      tile = $(this.e.tiles[i]);
      
      shortest = null;
      shortestIndex = 0;
      for(k = 0; k < maxColumns; k++) {
        if(shortest == null || data.heights[k] < shortest) {
          shortest = data.heights[k];
          shortestIndex = k;
        }
      }

      top = shortest;
      left = shortestIndex*columnWidth + baseOffset;

      var imageWidth = tile.data('w');
      var imageHeight = tile.data('h');

      if(!imageWidth) {
        var img = $('img', tile);
        imageWidth = img.width();
        imageHeight = img.height();
      }

      var tileHeight = tile.data('h') / tile.data('w') * this.config.columnWidth;

      tile.css({
        position: 'absolute',
        top: top+'px',
        left: left+'px',
        height: tileHeight+'px'
      });

      if(this.log) {
          console.log(i, data);
      }

      // console.log('layout', i, tile, tile.outerHeight(), tileHeight);
      
      data.heights[shortestIndex] = shortest + tileHeight + this.config.itemMargin;

      if(isNaN(data.heights[shortestIndex])) {
        data.heights[shortestIndex] = 0;

        console.log('isNaN', shortest, tileHeight, this.config.itemMargin, tile.data('h'), tile.data('w'), tile);
      }

      data.columns[shortestIndex].push(tile);
    }
    
    var maxHeight = 0;
    for(i=0; i<columnCount; i++) {
      maxHeight = Math.max(maxHeight, data.heights[i]);
    }
    
    if(tile) {
      var holder = $(tile.parent());
      this.e.content.css({
        'height': maxHeight+'px',
        'margin-left': 'auto',
        'margin-right': 'auto'
      });
    }
    
    this.e.tiles.show();
  };
  
  /**
   * Lay out height only, based on column setup from previous full layout call.
   */
  this.columnLayout = function(data) {
    data.heights = [];
    
    var verticalOffset = 0;
    if(this.config.verticalOffset) {
      verticalOffset = this.config.verticalOffset;
    }
    
    while(data.heights.length < data.columns.length) {
      if(data.heights.length == 0) data.heights.push(0);
      else data.heights.push(verticalOffset);
    }
    
    var i=0, length = data.columns.length, column;
    var k=0, kLength, tile;
    for(; i<length; i++) {
      column = data.columns[i];
      kLength = column.length;
      for(k=0; k<kLength; k++) {
        tile = column[k];
        
        tile.css({
          top: data.heights[i]+'px'
        });
        
        data.heights[i] += tile.outerHeight() + this.itemOffset;
      }
    }
    
    var maxHeight = 0;
    for(i=0; i<length; i++) {
      maxHeight = Math.max(maxHeight, data.heights[i]);
    }
    data.container.css({
      'height': maxHeight+'px'
    });
  };
  
  /**
   * If browser supports CSS animations, fade images in nicely
   * once they are loaded.
   */
  this.fadeImages = function() {
    if(Modernizr.opacity && Modernizr.cssanimations) {
      var imgs = $('.polaroid img');
      imgs.each(function(index) {
        // Imgs have complete if they are cached and don't need to be faded.
        if(!this.complete) {
          var t = $(this);
          t.addClass('is-loading');
          t.one('load', function(index) {
            $(this).addClass('is-loading');
          });
        }
      });
    }
  };
  
  this.initAutoLayout = function() {
    $(window).resize($.proxy(this.resize, this));
  };
  
  this.resize = function() {
    clearTimeout(this.layoutTimer);
    this.layoutTimer = setTimeout($.proxy(this.updateLayout, this), 500);
  };
  
  this.onAfterUpdateElement = function(li) {
    //$('results').style.position = 'relative';
  };
  
  // Endless scroll.
  
  this.startEndlessScroll = function() {
    if(this.log) {
        console.log('TileLayout.startEndlessScroll');
    }
    clearInterval(this.interval);
    this.interval = setInterval($.proxy(this.evaluateScrollPosition, this), 100);
  };
  
  this.stopEndlessScroll = function() {
    if(this.log) {
        console.log('TileLayout.startEndlessScroll');
    }

    clearInterval(this.interval);
  };
  
  this.evaluateScrollPosition = function() {
    var preloadDistance = 750;
    var position = this.getPageHeight() - this.getScrollHeight();
    var loadMore = (position < preloadDistance);
    if(this.log) {
        console.log('TileLayout.evaluateScrollPosition', position, this.getPageHeight(), this.getScrollHeight(), loadMore);
    }
    if(loadMore) {
      this.loadMore();
    }
  };
  
  this.getScrollHeight = function(){
    var y;
    // all except Explorer
    if (self.pageYOffset) {
        y = self.pageYOffset;
    } else if (document.documentElement && document.documentElement.scrollTop) {
        y = document.documentElement.scrollTop;
    } else if (document.body) {
        y = document.body.scrollTop;
    }
    return parseInt(y)+this.getWindowHeight();
  };
  
  this.getWindowHeight = function(){
    var frameWidth;
    var frameHeight;
    if (self.innerWidth) {
      frameWidth = self.innerWidth;
      frameHeight = self.innerHeight;
    } else if (document.documentElement && document.documentElement.clientWidth) {
      frameWidth = document.documentElement.clientWidth;
      frameHeight = document.documentElement.clientHeight; 
    } else if (document.body) {
      frameWidth = document.body.clientWidth;
      frameHeight = document.body.clientHeight;
    }
    return parseInt(frameHeight);
  };

  this.getPageHeight = function(){
    return $(document).height();
  };
  
  this.clear = function() {
    $('.tile').remove();
    
    $('.tileTrash').remove();
  };
  
  this.loadMore = function() {
    this.pageConfig.page++;

    gbks.events.call(gbks.event.LoadImages, this.pageConfig);

    // var url = this.loadMoreUrl;
    // $.ajax({
    //   url: url,
    //   data: this.config,
    //   success: $.proxy(this.onLoadMore, this),
    //   error: $.proxy(this.onLoadMoreError, this)
    // });

    //console.log('loadMore', this.config);
    
    this.track('loadMore', this.pageConfig.type, this.pageConfig.toString());
  };
  
  this.track = function(one, two, three) {
    gbks.tracker.trackEvent(one, two, three);
    // if(typeof(_gaq) !== 'undefined') {
    //   _gaq.push(['_trackEvent', one, two, three]);
    // }
  };
  
  this.onLoadImagesStart = function(data) {
    this.stopEndlessScroll();
    this.showLoader();
  };
  
  this.onLoadImagesSuccess = function(data) {
    if(this.log) {
        console.log('TileLayout.onLoadImagesSuccess', data);
    }

    if(data.images) {
        var h = gbks.render.imageTiles(data.images);

        if(data.page == 0) {
            this.e.content.html(h);
        } else {
            this.e.content.append(h);
        }

        this.e.tiles = $(this.classes.tile, this.e.content);

        gbks.events.call(gbks.event.SetupNewContent, {canvas: this.e.tiles});
    }

    if(!data.images || data.images.length === 0) {
        this.e.canvas.addClass('is-at-end');
    } else {
        this.e.canvas.removeClass('is-at-end');

        this.startEndlessScroll();
    }

    // $('.tiles').append(result);
    
    this.fadeImages();
    
    this.hideLoader();
    
    this.updateLayout();
  };
  
  this.onLoadImagesError = function(result) {
    this.hideLoader();
  };
  
  this.showLoader = function() {
    // this.loader.stop();
    this.e.loader.show();
    this.e.loader.animate({opacity:1}, 50);
  };
  
  this.hideLoader = function() {
    this.e.loader.stop();
    var callback = null;
    if(this.onHideLoader) {
      callback = $.proxy(this.onHideLoader, this);
    }
    this.e.loader.animate({opacity:0}, 250, callback);
  };
  
  this.onHideLoader = function(event) {
    this.e.loader.hide();
  };
};


/**
 * Interaction for polaroid-style display of images.
 */

var gbks = gbks || {};

gbks.ImageTile = function() { 
  
    this.init = function() {
        this.id = 'ImageTile';
        this.log = false;
        this.tileResizeTimer = null;

        this.classes = {
            tile: '.tile--image',
            likeButton: '.option--like',
            saveButton: '.option--save',
            image: 'a > img',
            nsfwCover: '.nsfw-cover',
            active: 'is-active',
            saved: 'is-saved',
            liked: 'is-liked',
            loading: 'loading',
            overlay: 'has-overlay'
        };

        this.polaroids = $('.tile--image');

        gbks.polaroidInstance = this;

        this.auth = (config && config.user);
        this.lightbox = null;
        this.groupsOverlay = null;
        this.savePopup = null;
        this.htmlDecoder = null;

        this.shiftDown = false;
        $(window).bind('keydown', $.proxy(this.keyDown, this));
        $(window).bind('keyup', $.proxy(this.keyUp, this));

        this.clickImageMethod = $.proxy(this.onClickImage, this);
        this.loadImageMethod = $.proxy(this.onLoadImage, this);
        this.clickNsfwCoverMethod = $.proxy(this.onClickNSFWCover, this);
        this.clickDocumentMethod = $.proxy(this.onClickDocument, this);

        gbks.events.listen(gbks.event.LoadImagesSuccess, $.proxy(this.onLoadImagesSuccess, this), this.id);

        gbks.events.listen(gbks.event.ShowPopup, $.proxy(this.onShowPopup, this), this.id);
        gbks.events.listen(gbks.event.HidePopup, $.proxy(this.onHidePopup, this), this.id);

        // gbks.events.listen(gbks.event.LikeImageStart, $.proxy(this.onLikeImageStart, this), this.id);
        // gbks.events.listen(gbks.event.LikeImageSuccess, $.proxy(this.onLikeImageSuccess, this), this.id);
        // gbks.events.listen(gbks.event.LikeImageError, $.proxy(this.onLikeImageError, this), this.id);

        // gbks.events.listen(gbks.event.UnlikeImageStart, $.proxy(this.onUnlikeImageStart, this), this.id);
        // gbks.events.listen(gbks.event.UnlikeImageSuccess, $.proxy(this.onUnlikeImageSuccess, this), this.id);
        // gbks.events.listen(gbks.event.UnlikeImageError, $.proxy(this.onUnlikeImageError, this), this.id);

        // gbks.events.listen(gbks.event.SaveImageStart, $.proxy(this.onSaveImageStart, this), this.id);
        // gbks.events.listen(gbks.event.SaveImageSuccess, $.proxy(this.onSaveImageSuccess, this), this.id);
        // gbks.events.listen(gbks.event.SaveImageError, $.proxy(this.onSaveImageError, this), this.id);

        // gbks.events.listen(gbks.event.RemoveImageStart, $.proxy(this.onRemoveImageStart, this), this.id);
        // gbks.events.listen(gbks.event.RemoveImageSuccess, $.proxy(this.onRemoveImageSuccess, this), this.id);
        // gbks.events.listen(gbks.event.RemoveImageError, $.proxy(this.onRemoveImageError, this), this.id);

        this.reset();
    };

    this.reset = function() {
        if(this.e) {
            this.e.images.unbind('click', this.clickImageMethod);
            this.e.images.unbind('load', this.loadImageMethod);
            this.e.nsfwCovers.unbind('click', this.clickNsfwCoverMethod);
        }

        this.collectElements();
        this.setupEvents();
    };

    this.collectElements = function() {
        var e = {};

        e.loader = $('#loader');
        e.tiles = $(this.classes.tile);
        e.likeButtons = $(this.classes.likeButton, e.tiles);
        e.saveButtons = $(this.classes.saveButton, e.tiles);
        e.images = $(this.classes.image, e.tiles);
        e.nsfwCovers = $(this.classes.nsfwCover, e.tiles);

        if(this.log) {
            console.log('ImageTile.collectElements', e);
        }

        this.e = e;
    };

    this.setupEvents = function() {
        if(this.log) {
            console.log('ImageTile.setupEvents', this.auth);
        }

        if(this.auth) {
            // this.e.likeButtons.bind('click', $.proxy(this.onClickLikeButton, this));
            // this.e.saveButtons.bind('click', $.proxy(this.onClickSaveButton, this));
        }

        if(this.log) {
            console.log('ImageTile.setupEvents');
        }

        this.e.images.bind('click tap', this.clickImageMethod);
        this.e.images.bind('load', this.loadImageMethod);
        this.e.nsfwCovers.bind('click tap', this.clickNsfwCoverMethod);
    };

    // Called via global event handler on 'gbks.event.LoadMoreDone'.
    this.onLoadImagesSuccess = function(data) {
        if(this.log) {
            console.log('ImageTile.onLoadImagesSuccess', data);
        }
        this.reset();
    };

    this.onLoadImage = function(event) {
        var target = $(event.currentTarget);
        var tile = $(target.parents(this.classes.tile)[0]);

        if(this.log) {
            console.log('ImageTile.onLoadImage', target, tile);
        }

        var width = tile.data('w');
        var height = tile.data('h');
        if(width == 0 || height == 0) {
            tile.data('w', target[0].naturalWidth);
            tile.data('h', target[0].naturalHeight);

            clearTimeout(this.tileResizeTimer);
            this.tileResizeTimer = setTimeout($.proxy(this.broadcastTileResize, this), 100);
        }
    };

    this.broadcastTileResize = function() {
        gbks.events.call(gbks.event.ResizeTiles);
    }

    // Like events

    this.onClickLikeButton = function( event ) {
        event.stopPropagation();
        event.preventDefault();

        var button = $(event.currentTarget);
        var tile = $(button.parents(this.classes.tile)[0]);

        var isLike = !tile.hasClass(this.classes.saved);

        // Grab image id.
        var imageId = tile.data('id');

        if(isLike) {
            gbks.events.call(gbks.event.LikeImage, {imageId: imageId});
        } else {
            gbks.events.call(gbks.event.UnlikeImage, {imageId: imageId});
        }
    };

    this.onLikeImageStart = function(data) {
        var tile = this.getTileByImageId(data.imageId);
        if(tile) {
            this.markTileLiked(tile);
        }
    };

    this.onLikeImageSuccess = function(data) {
        var tile = this.getTileByImageId(data.imageId);
        if(tile) {
            this.markTileLiked(tile);
        }
    };

    this.onLikeImageError = function(data) {
        var tile = this.getTileByImageId(data.imageId);
        if(tile) {
            this.markTileUnliked(tile);
        }
    };

    this.onUnlikeImageStart = function(data) {
        var tile = this.getTileByImageId(data.imageId);
        if(tile) {
            this.markTileLiked(tile);
        }
    };

    this.onUnlikeImageSuccess = function(data) {
        var tile = this.getTileByImageId(data.imageId);
        if(tile) {
            this.markTileUnliked(tile);
        }
    };

    this.onUnlikeImageError = function(data) {
        var tile = this.getTileByImageId(data.imageId);
        if(tile) {
            this.markTileLiked(tile);
        }
    };

    // Save events

    this.onSaveImageStart = function(data) {
        var tile = this.getTileByImageId(data.imageId);
        if(tile) {
            this.markTileSaved(tile);
        }
    };

    this.onSaveImageSuccess = function(data) {
        var tile = this.getTileByImageId(data.imageId);
        if(tile) {
            this.markTileSaved(tile);
        }
    };

    this.onSaveImageError = function(data) {
        var tile = this.getTileByImageId(data.imageId);
        if(tile) {
            this.markTileUnsaved(tile);
        }
    };

    this.onRemoveImageStart = function(data) {
        var tile = this.getTileByImageId(data.imageId);
        if(tile) {
            this.markTileUnsaved(tile);
        }
    };

    this.onRemoveImageSuccess = function(data) {
        var tile = this.getTileByImageId(data.imageId);
        if(tile) {
            this.markTileUnsaved(tile);
        }
    };

    this.onRemoveImageError = function(data) {
        var tile = this.getTileByImageId(data.imageId);
        if(tile) {
            this.markTileSaved(tile);
        }
    };

    // Helpers

    this.markTileLiked = function(tile) {
        var likeButton = $(this.classes.likeButton, tile);
        var text = $('b', likeButton);

        tile.addClass(this.classes.liked);
        likeButton.addClass(this.classes.active);
        text.html('Liked');
    };

    this.markTileUnliked = function(tile) {
        var likeButton = $(this.classes.likeButton, tile);
        var text = $('b', likeButton);

        tile.removeClass(this.classes.liked);
        likeButton.removeClass(this.classes.active);
        text.html('Like');
    };

    this.markTileSaved = function(tile) {
        var saveButton = $(this.classes.saveButton, tile);
        var text = $('b', saveButton);

        tile.addClass(this.classes.saved);
        saveButton.addClass(this.classes.active);
        text.html('Saved');
    };

    this.markTileUnsaved = function(tile) {
        var saveButton = $(this.classes.saveButton, tile);
        var text = $('b', saveButton);

        tile.removeClass(this.classes.saved);
        saveButton.removeClass(this.classes.active);
        text.html('Save');
    };

    this.getTileByImageId = function(imageId) {
        var tile = $(this.classes.tile+'[data-id='+imageId+']');
        if(tile.length > 0) {
            return tile;
        } else {
            return null;
        }
    };

    this.onClickSaveButton = function(event) {
        event.stopPropagation();
        event.preventDefault();

        var button = $(event.currentTarget);
        var tile = $(button.parents(this.classes.tile)[0]);
        var imageId = tile.data('id');

        var isSaved = tile.hasClass(this.classes.saved);
        var isActive = button.hasClass(this.classes.active);

        if(this.log) {
            console.log('ImageTile.onClickSaveButton', isActive);
        }

        if(isActive) {
            button.removeClass(this.classes.active);
        } else {
            gbks.events.call(gbks.event.ShowSavePopup, {imageId: imageId});
            
            if(!isSaved) {
                // gbks.events.call(gbks.event.SaveImage, {imageId: imageId});
            }
        }
    };

    this.saveImage = function(polaroid) {
        var button = $('.options .save', polaroid);
        var saveHolder = $('.saves', polaroid);
        var saveDisplay = $('.saves', polaroid);

        var isSaved = button.hasClass(this.classes.active);

        button.addClass(this.classes.active);

        // Grab image id.
        var id = polaroid.attr('id');
        var bits = id.split('_')
        var imageId = bits[1];

        gbks.common.track('Polaroid', 'Save', imageId);

        // Update the number display and show it.
        if(!hasSaved) {
            button.addClass(this.classes.active);
            var count = parseInt(polaroid.attr('data-saves'));
            tile.data('saves', (count+1));
        }

        this.hideGroupsOverlay();

        var callback = $.proxy(this.onSaveImage, this);
        if(this.shiftDown) {
            callback = null;
        } else {
            button.addClass('loading');
        }

        $.ajax({
            url: '/bookmark/savetouser?imageId='+imageId,
            type: 'POST',
            dataType: 'jsonp',
            success: callback  
        });

        this.updateLayout();
    };

    this.onCloseSavePopup = function(event) {
        var tile = this.getTileByImageId(this.savePopup.data.imageId);
        tile.removeClass(this.classes.overlay);
    };

    /**
    * When image is saved, shows an overlay for user to add it to their groups.
    * @param result JSON file with all users groups.
    */
    this.onSaveImage = function(result) {
        if(this.log) {
            console.log('ImageTile.onSaveImage', result);
        }

        var tile = this.getTileByImageId(result.imageId);
        var save = $('.save', tile);

        save.removeClass(this.classes.loading);

        this.savePopup = new gbks.common.SavePopup();
        this.savePopup.init(save, result, $.proxy(this.onClickRemoveImage, this), $.proxy(this.onCloseSavePopup, this));
        tile.addClass(this.classes.overlay);
    };

    this.onClickDocument = function( event ) {
        var target = $(event.target);
        var parents = target.parents('#groupsOverlay');
        if(parents.length == 0) {
            this.hideGroupsOverlay();

            event.stopPropagation();
            event.preventDefault();
        }

        if(this.log) {
            console.log('onClickDocument', target, parents, event.target);
        }
    };

    this.hideGroupsOverlay = function() {
        $(document).unbind('mousedown', this.clickDocumentMethod);
    };

    this.onClickImage = function(event) {
        event.preventDefault();
        event.stopPropagation();

        var button = $(event.currentTarget);
        var target = $(button.parents(this.classes.tile)[0]);
        var link = $('a', target);
        var image = $('a img', target);

        var imageId = target.data('id');
        var width = target.data('w');
        var height = target.data('h');
        var src = image.attr('src');
        var url = link.attr('href');

        if(this.log) {
            console.log('ImageTile.onClickImage', imageId);
        }

        gbks.events.call(gbks.event.ShowLightbox, {
            imageId: imageId,
            width: width,
            height: height,
            src: src,
            url: url
        });
    };

    this.onClickNSFWCover = function(event) {
        // var nsfwTiles = $('.tile.is-nsfw');
        // var covers = $('.nsfw-cover', nsfwTiles);

        // nsfwTiles.removeClass('is-nsfw');
        // covers.remove();

        var cover = $(event.currentTarget);
        var tile = cover.parents('.tile');
        
        if(tile.length > 0) {
            tile.removeClass('is-nsfw');

            cover.remove();

            event.preventDefault();
            event.stopPropagation();
        }
    };

    this.onShowPopup = function(data) {
        if(this.log) {
            console.log('ImageTile.onShowPopup', data);
        }

        if(data.id == 'SavePopup') {
            var tile = $(this.classes.tile+'[data-id='+data.imageId+']');
            if(tile.length > 0) {
                tile.addClass(this.classes.active);
            }
        }
    };

    this.onHidePopup = function(data) {
        if(this.log) {
            console.log('ImageTile.onHidePopup', data);
        }

        if(data.id == 'SavePopup') {
            var tile = $(this.classes.tile+'[data-id='+data.imageId+']');
            if(tile.length > 0) {
                tile.removeClass(this.classes.active);
            }
        }
    };
  
};


/*

Handles a list of comments.

 */

var gbks = gbks || {};

gbks.CommentList = function() {
	
    this.init = function(main, container) {
        this.id = 'CommentList';
    	this.log = false;
    	this.main = main;
    	this.container = container;
        this.data = [];
    	this.e = {};

        if(this.log) {
            console.log('CommentList.init', main, container);
        }

        gbks.events.listen(gbks.event.CreateCommentSuccess, $.proxy(this.onCreateCommentSuccess, this), this.id);
        gbks.events.listen(gbks.event.UpdateCommentSuccess, $.proxy(this.onUpdateCommentSuccess, this), this.id);
        gbks.events.listen(gbks.event.RemoveCommentSuccess, $.proxy(this.onRemoveCommentSuccess, this), this.id);
    };

    // Data is an Array of comments
    this.refresh = function(data) {
        this.data = data;

    	if(this.log) {
    		console.log('CommentList.refresh', data, this.container, this.e);
    	}

    	if(data && data.length > 0) {
    		this.render(data);

    		if(this.e.canvas) {
    			this.collectElements();
    			this.setupEvents();

    			this.e.canvas.addClass('is-active');
    		}
    	} else {
    		if(this.e.canvas) {
    			this.e.canvas.removeClass('is-active');
    		}
    	}
    };

    this.broadcastResize = function() {
        clearTimeout(this.broadcastResizeTimer);
        this.broadcastResizeTimer = setTimeout($.proxy(this.doBroadcastResize, this), 25);
    };

    this.doBroadcastResize = function() {
        gbks.events.call(gbks.event.CommentListResize, {form: this});
    };

    this.collectElements = function() {
    	this.e.canvas = $('.comment-list', this.container);
    	this.e.comments = $('.comment', this.e.canvas);
    };

    this.setupEvents = function() {

    };

    this.render = function(comments) {
    	var h = '<div class="comment-list"><div class="wrap"><div class="content">';
    	for(var i=0; i<comments.length; i++) {
    		h += gbks.render.comment(comments[i]);
    	}
    	h += '</div></div></div>';
    	this.container.html(h);

        if(this.log) {
            console.log('CommentList.render', h, this.container);
        }

        this.broadcastResize();
    };

    this.clear = function() {
    	if(this.e.canvas) {
    		this.e.canvas.remove();
    		this.e = {};
    	}

        this.broadcastResize();
    };

    this.onCreateCommentSuccess = function(data) {
        if(!this.data) {
            this.data = [];
        }

        this.data.push(data.comment);

        if(this.log) {
            console.log('CommentList.onCreateCommentSuccess', data, this.data);
        }

        $('.comment-list .content', this.container).append(gbks.render.comment(data.comment));

        // this.render(this.data);
    };

    this.onUpdateCommentSuccess = function(commentData) {
        if(!this.data) {
            this.data = [];
        }

        var i=0, length=this.data.length, comment;
        for(; i<length; i++) {
            comment = this.data[i];
            if(comment.id == commentData.comment.id) {
                this.data.splice(i, 1, commentData);
                break;
            }
        }

        this.render(this.data);
    };

    this.onRemoveCommentSuccess = function(commentData) {
        if(!this.data) {
            this.data = [];
        }

        var i=0, length=this.data.length, comment;
        for(; i<length; i++) {
            comment = this.data[i];
            if(comment.id == commentData.comment.id) {
                this.data.splice(i, 1);
                break;
            }
        }

        this.render(this.data);
    };
};




var gbks = gbks || {};

gbks.CommentListItem = function() {
	
    this.init = function() {

    };

    this.refresh = function() {

    };
};




var gbks = gbks || {};

gbks.CommentForm = function() {
	
    this.init = function(main, container) {
        this.id = 'CommentForm';
        this.log = false;
        this.main = main;
        this.container = container;
        this.isFocused = false;
        this.isEmpty = true;
        this.placeholder = 'Enter a comment...';

        this.c = {
            form: '.comment-form',
            active: 'is-active',
            disabled: 'is-disabled',
            empty: 'is-empty'
        };

        this.e = {};

        this.keyUpMethod = $.proxy(this.onKeyUp, this);
        this.keyDownMethod = $.proxy(this.onKeyDown, this);
        this.focusMethod = $.proxy(this.onFocusField, this);
        this.blurMethod = $.proxy(this.onBlurField, this);

        if(this.log) {
            console.log('CommentForm.init', main, container, this.e);
        }

        gbks.events.listen(gbks.event.CreateCommentStart, $.proxy(this.onCreateCommentStart, this), this.id);
        gbks.events.listen(gbks.event.CreateCommentSuccess, $.proxy(this.onCreateCommentSuccess, this), this.id);
        gbks.events.listen(gbks.event.CreateCommentError, $.proxy(this.onCreateCommentError, this), this.id);
    };

    this.refresh = function() {
        this.clear();

        if(config && config.user) {
            this.createCanvas();
            this.collectElements();
            this.setupEvents();
        }

        if(this.log) {
            console.log('CommentForm.refresh', this.e, this.container, config);
        }
    };

    this.createCanvas = function() {
        var h = '<div class="comment-form">';

        h += gbks.render.avatar(config.user);

        h += '<p data-placeholder="'+this.placeholder+'" contenteditable class="comment-input is-empty">'+this.placeholder+'</p>';
        h += '<div class="comment-form-options">';
        h += '<div class="contacts"></div>';
        h += '<button class="button style--blue">Save comment</button>';
        h += '</div>';

        h += '</div>';

        this.container.append(h);
    };

    this.collectElements = function() {
        var e = {};

        e.canvas = $('.comment-form', this.container);
        e.input = $('.comment-input', e.canvas);
        e.contacts = $('.contacts', e.canvas);
        e.button = $('.button', e.canvas);

        // Initiate contacts dropdown.
        this.contactsDropdown = new gbks.ContactsDropdown();
        this.contactsDropdown.init(e.contacts);

        this.e = e;
    };

    this.setupEvents = function() {
        this.e.input.bind('focus', this.focusMethod);
        this.e.input.bind('blur', this.blurMethod);
        this.e.input.bind('keydown', this.keyDownMethod);

        if(this.log) {
            console.log('CommentForm.setupEvents', this.e);
        }

        this.e.button.bind('click', $.proxy(this.onSubmitForm, this));
    };

    this.onSubmitForm = function(event) {
        event.preventDefault();
        event.stopPropagation();

        var button = $(event.currentTarget);
        var form = $(button.parents(this.c.form)[0]);

        gbks.tracker.trackEvent('commentform', 'save');

        this.saveComment(form);
    };

    this.onFocusField = function(event) {
        if(!this.e.canvas.hasClass('is-active')) {
            this.e.canvas.addClass('is-active');

            // var field = $(event.currentTarget);
            // var form = $(field.parents(this.formClass)[0]);
            // form.addClass('is-active');
            
            this.isFocused = true;

            if(this.log) {
                console.log('CommentForm.onFocusField', this.e.input, this.e.input.text());
            }

            gbks.tracker.trackEvent('commentform', 'expand');

            if(this.e.input.text() == this.e.input.data('placeholder')) {
                this.e.input.text('');
                this.e.input.removeClass('is-empty');
            }

            this.broadcastResize();
        }

        // $(document).bind('keyup', this.keyUpMethod);
    };

    this.onBlurField = function(event) {
        if(this.e.input.text().length === 0) {
            this.e.input.text(this.e.input.data('placeholder'));
            this.e.input.addClass('is-empty');
        }

        this.isFocused = false;

        if(this.log) {
            console.log('CommentForm.onBlurField', this.e.input.text());
        }

        $(document).unbind('keyup', this.keyUpMethod);

        this.broadcastResize();
    };

    this.onKeyDown = function(event) {
        var text = this.e.input.text();
        if(event.which != 8 && text.length > 200) {
            event.preventDefault();
        }

        this.broadcastResize();
    };

    this.onKeyUp = function(event) {
        this.broadcastResize();
    // var form = $(this.formClass+'.is-active');
    // if(form.length > 0) {
    //   var field = $('textarea', form);
    //   var comment = field.val();
    //   var teams = $("input[name='teams']", form).val();
    //   var users = $("input[name='users']", form).val();
    //   var emails = $("input[name='emails']", form).val();

    //   if(event.which == 13 && comment.length > 2 && comment != field.attr('placeholder')) {
    //     event.stopPropagation();
    //     event.preventDefault();

    //     this.saveComment(comment, field, form, teams, users, emails);
    //   } 
    // }
    };

    this.broadcastResize = function() {
        clearTimeout(this.broadcastResizeTimer);
        this.broadcastResizeTimer = setTimeout($.proxy(this.doBroadcastResize, this), 25);
    };

    this.doBroadcastResize = function() {
        gbks.events.call(gbks.event.CommentFormResize, {form: this});
    };

    // Data

    this.saveComment = function(form) {
        $(document).unbind('keyup', this.keyUpMethod);

        // Collect data.
        // var imageId = form.data('imageid');
        var imageId = this.container.data('id');

        if(!imageId) {
            console.log('CommentForm.saveComment no image id provided');
            return;
        }

        var comment = this.e.input[0].textContent;
        var teams = $("input[name='teams']", form).val();
        var users = $("input[name='users']", form).val();
        var emails = $("input[name='emails']", form).val();

        // Validate data.
        var lower = comment.toLowerCase();
        var isGood = true;
        if(lower == 'test') {
            isGood = false;
        }

        if(comment == this.e.input.data('placeholder')) {
            isGood = false;
        }

        if(lower.length < 3) {
            isGood = false;
        }

        // Prepare data.
        var data = {
            imageId: imageId, 
            text: comment,
            format: 'big',
            teams: teams,
            users: users,
            emails: emails
        };

        if(this.log) {
            console.log('data', data);
        }

        if(lower == 'test') {
            // For testing.
            alert('Congratulations! Your test worked!');

            if(this.log) {
                console.log('data', data);
            }

            this.e.input.html('');
        } else if(isGood) {
            // Disable form.
            this.disable();

            if(this.log) {
                console.log('CommentForm.saveComment', data);
            }

            gbks.events.call(gbks.event.CreateComment, data);
        } else {
            this.elements.canvas.addClass('has-error');
            alert('Please ensure your comment is more than 3 characters.');
        }
    };

    this.onCreateCommentStart = function(data) {
        this.disable();
    };

    this.onCreateCommentSuccess = function(data) {
        if(this.log) {
            console.log('CommentForm.onCreateCommentSuccess', data);
        }

        this.resetForm();
        this.enable();
    };

    this.onCreateCommentError = function(data) {
        this.enable();
    };

    this.disable = function() {
        this.e.canvas.addClass(this.c.disabled);

        this.e.input.removeAttr('contenteditable');
        this.e.button.attr('disabled', true);
    };

    this.enable = function() {
        this.e.canvas.removeClass(this.c.disabled);

        this.e.input.attr('contenteditable', true);
        this.e.button.attr('disabled', false);
    };

    this.resetForm = function() {
        if(this.e && this.e.canvas) {
            this.e.input.addClass(this.c.empty);
            this.e.input.html(this.placeholder);
            this.e.canvas.removeClass(this.c.active);

            this.contactsDropdown.reset();
        }
    };

    this.clear = function() {
        if(this.e && this.e.canvas) {
            this.e.canvas.remove();
            this.e.canvas = null;
        }
    };
};




var gbks = gbks || {};
gbks.common = gbks.common || {};

gbks.common.NavMorePopup = function() {
  
  this.init = function() {  
    this.isActive = false;

    this.collectElements();
    this.setupEvents();
  };

  this.collectElements = function() {
    var e = {};

    e.container = $('#nav');
    e.canvas = $('.overlay.type--more', e.container);
    e.toggle = $('li.type--more', e.container);

    this.e = e;
  };

  this.setupEvents = function() {
    
  };

  this.show = function() {  
    this.isActive = true;

    this.e.toggle.addClass('is-active');
  };

  this.hide = function() {
    this.isActive = false;

    this.e.toggle.removeClass('is-active');
  };

  this.onClickDocument = function(event) {
    if(this.isActive) {
      var target = $(event.target);
      var parents = target.parents('li.type--more');

      if(parents.length == 0) {
        this.hide();
      }
    }
  };
  
};


var gbks = gbks || {};
gbks.common = gbks.common || {};

/*

Popup shown when clicking "Groups" in the navbar

Bits
- Search field
- Sorting button
- "Create group" button
- List of groups
- Loading message
- Empty message
- "Create first group" message

States
- Loading groups
- Could not load groups
- Empty ("Create your first group")
- List of groups
- No results (when filtering and no matches)

 */

gbks.common.NavGroupsPopup = function() {
  
    this.init = function() { 
        this.log = false;
        this.isActive = false;
        this.userGroupsList = null;

        this.collectElements();
        this.setupEvents();
    };

    this.collectElements = function() {
        var e = {};

        e.container = $('#nav');
        e.canvas = $('.overlay.type--groups', e.container);
        e.content = $('> .wrap > .content', e.canvas);
        e.toggle = $('li.type--groups', e.container);

        if(this.log) {
            console.log('NavGroupsPopup.collectElements', e);
        }

        this.e = e;
    };

    this.setupEvents = function() {

    };

    // Show/hide

    this.show = function() {  
        this.isActive = true;

        if(this.log) {
            console.log('NavGroupsPopup.show');
        }

        this.e.toggle.addClass('is-active');

        this.userGroupsList = new gbks.UserGroupsList();
        this.userGroupsList.init({
            container: this.e.content
        })
        this.userGroupsList.showLinkList();
    };

    this.hide = function() {
        this.isActive = false;

        if(this.log) {
            console.log('NavGroupsPopup.hide');
        }

        this.e.toggle.removeClass('is-active');

        this.userGroupsList.destroy();
        this.userGroupsList = null;
    };

    this.loadGroupData = function() {
        this.isLoadingGroupData = true;
        this.e.canvas.addClass('is-loading');

        this.updateHeight();

        gbks.events.call(gbks.event.GetUserGroups);
    };

    this.updateHeight = function() {
        var height = this.e.content.height();
        this.e.canvas.css('height', height+'px');
    };

    this.onClickDocument = function(event) {
        if(this.isActive) {
            var target = $(event.target);
            var parents = target.parents('li.type--groups');

            if(parents.length == 0) {
                this.hide();
            }
        }
    };
  
};


var gbks = gbks || {};
gbks.common = gbks.common || {};

gbks.common.NavProfilePopup = function() {
  
  this.init = function() {  
    this.isActive = false;
    this.groupData = null;
    this.isLoadingGroupData = false;

    this.collectElements();
    this.setupEvents();

    this.userId = this.e.toggle.data('id');
  };

  this.collectElements = function() {
    var e = {};

    e.container = $('#supermeganav');
    e.canvas = $('.overlay--profile', e.container);
    e.groupList = $('.list--groups', e.canvas);
    e.toggle = $('li.nav-item--profile', e.container);
    e.noGroups = null;

    this.e = e;
  };

  this.setupEvents = function() {
    // this.e.links.bind('click tap', $.proxy(this.onClickLink, this));
  };

  this.show = function() {  
    this.isActive = true;

    // if(!this.e.canvas) {
    //   this.createCanvas();
    // }

    this.e.toggle.addClass('is-active');

    // if(!this.isLoadingGroupData) {
    //   this.loadGroupData();
    // } else {
    //   this.displayGroups();
    // }
  };

  this.hide = function() {
    this.isActive = false;

    this.e.toggle.removeClass('is-active');
  };

  this.loadGroupData = function() {
    this.isLoadingGroupData = true;
    this.e.canvas.addClass('is-loading');

    $.ajax({
      url: '/groups/usergroups',
      type: 'POST',
      data: {id: this.userId},
      dataType: 'jsonp',
      success: $.proxy(this.onGroupDataLoaded, this),
      error: $.proxy(this.onGroupDataLoadError, this)
    });
  };

  this.onGroupDataLoaded = function(data) {
    this.groupData = data;

    this.e.canvas.removeClass('is-loading');

    this.createGroupsHTML();
  };

  this.onGroupDataLoadError = function(data) {
    this.e.canvas.removeClass('is-loading');
  };

  this.createGroupsHTML = function() {
    if(data.groups.length == 0) {
      this.createNoGroupsHTML();
      return;
    }

    var h = '';

    var i=0, length = this.groupData.groups.length, groupData;
    for(; i<length; i++) {
      groupData = this.groupData.groups[i];
      h += '<li><a href="'+groupData.url+'">'+groupData.name+'</a></li>';
    }

    this.e.groupList.html(h);
  };

  this.createNoGroupsHTML = function() {
    // var h = '';
    // h += '<div class="no-groups">';
    // h += '<p>'</p>';
    // h += '</div>';
    // this.e.noGroups = $(h);
    // this.e.groupList.before(this.e.noGroups);
  };
  
};


var gbks = gbks || {};
gbks.common = gbks.common || {};

gbks.common.NavCreatePopup = function() {
  
  this.init = function() { 
    this.isActive = false;

    this.collectElements();
    this.setupEvents();
  };

  this.collectElements = function() {
    var e = {};

    e.container = $('#supermeganav');
    // e.links = $('a', e.canvas);
    e.toggle = $('li.nav-item--addimage', e.container);

    this.e = e;
  };

  this.setupEvents = function() {
    // this.e.links.bind('click tap', $.proxy(this.onClickLink, this));
  };

  this.show = function() {
    this.isActive = true;

    this.e.toggle.addClass('is-active');
  };

  this.hide = function() {
    this.isActive = false;

    this.e.toggle.removeClass('is-active');
  };
  
};


/**
 * Popup for signing in.
 */
var gbks = gbks || {};
gbks.common = gbks.common || {};
gbks.common.signupPopupInstance = null;
gbks.common.SignupPopup = function() {
  
  this.init = function() {
    this.e = {};
    this.ids = {
      canvas: 'signup-popup',
      cover: 'signup-popup-cover'
    }
    this.updateContentTimer = null;
    this.timer = null;
    this.timing = {
      beat: 25,
      cover: 100,
      canvas: 250
    };
    this.icons = {
      close: gbks.icons.down
    };
    this.togglePosition = null;
    this.resizeMethod = $.proxy(this.onResize, this);
    this.clickDocumentMethod = $.proxy(this.onClickDocument, this);
    this.descriptionKeyMethod = $.proxy(this.onDescriptionKey, this);

    // gbks.events.listen(gbks.event.ShowPopup, $.proxy(this.onShowPopupEvent, this));
    // gbks.events.listen(gbks.event.HidePopup, $.proxy(this.onHidePopupEvent, this));
  };
  
  this.createCanvas = function() {
    if(this.e.canvas) {
      this.clearCanvas();
    }

    // Show groups overlay.
    var h = '';
    h += '<div id="'+this.ids.cover+'"></div>';
    h += '<div id="'+this.ids.canvas+'">';
    h += '  <div class="wrap-table">';
    h += '  <div class="wrap-cell">';
    h += '  <div class="content">';
    h += '  <div class="content-wrap">';
    h += '    <h2>Welcome</h2>';
    h += '    <a href="#" class="close">';
    h += '      '+this.icons.close;
    h += '    </a>';
    h += '    <form>';
    h += '      <div class="form-field form-field--name">';
    h += '        <input name="name" type="text" placeholder="Group name"/>';
    h += '        <p class="error">Please enter a longer name</p>';
    h += '      </div>';
    h += '      <div class="form-field form-field--description">';
    h += '        <p class="input" contenteditable="true" data-placeholder="Description">Description</p>';
    h += '        <p class="error">Too long!</p>';
    h += '      </div>';

    if(gbks.permissions.userIsAdmin()) {
      h += '      <div class="form-field form-field--contacts">';
      h += '      </div>';
    }

    if(gbks.permissions.userIsPlus()) {
      h += '      <div class="form-field form-field--privacy">';
      h += '        <a href="#" class="toggle" data-id="private">Private</a>';
      h += '      </div>';
    }

    h += '      <div class="options">';
    h += '        <input type="submit" class="button button--filled" value="Create group"/>';
    h += '      </div>';
    h += '    </form>';
    h += '  </div>';
    h += '  </div>';
    h += '  </div>';
    h += '  </div>';
    h += '</div>';
    $('body').append(h);

    this.collectElements();
    this.setupEvents();

    // Initiate contacts dropdown.
    this.contactsDropdown = new gbks.ContactsDropdown();
    this.contactsDropdown.init(this.e.contactsFormField);
  };

  this.collectElements = function() {
    var e = {};

    e.cover = $('#'+this.ids.cover);
    e.canvas = $('#'+this.ids.canvas);
    e.content = $('.content', e.canvas);
    e.contentWrap = $('.content-wrap', e.canvas);
    e.closeButton = $('.close', e.canvas);
    e.form = $('form', e.canvas);
    e.nameFormField = $(".form-field--name", e.canvas);
    e.nameField = $("input[type='text']", e.nameFormField);
    e.emailFieldWrap = $(".form-field-email", e.canvas);
    e.emailField = $("input[type='email']", e.emailFieldWrap);
    e.passFieldWrap = $(".form-field-pass", e.canvas);
    e.passField = $("input[type='password']", e.passFieldWrap);
    e.submitButton = $("input[type='submit']", e.canvas);

    this.e = e;
  };

  this.setupEvents = function() {    
    // Hide when pressing close button.
    this.e.closeButton.bind('click tap', $.proxy(this.onClickCloseButton, this));
    this.e.submitButton.bind('click tap', $.proxy(this.onClickSubmit, this));

    this.e.form.bind('submit', $.proxy(this.onSubmitForm, this));
  };

  this.clearCanvas = function() {
    this.e.canvas.remove();
    this.e.cover.remove();
    this.e = {};
  };

  // Saving
  
  this.onClickSubmit = function(event) {
    event.stopPropagation();
    event.preventDefault(); 

    this.submitForm();
  };

  this.onSubmitForm = function(event) {
    event.stopPropagation();
    event.preventDefault();

    this.submitForm();
  };

  this.submitForm = function() {   
    console.log('SignupPopup.submitForm'); 


    var nameValidation = this.validateName(name);
    var emailValidation = this.validateEmail(name);
    var passValidation = this.validatePass(name);

    if(nameIsValid) {
      this.e.nameFormField.removeClass('has-error');
    } else {
      this.e.nameFormField.addClass('has-error');
    }
    
    if(nameIsValid) {
      this.e.canvas.removeClass('has-error');

      // Hide and clear group creation form.
      this.clearForm();
      this.disableForm();
      
      this.e.canvas.addClass('is-saving');
    
      // Make call.
      var data = {
        name: name,
        description: description,
        'private': isPrivate,
        members: members
      };

      // console.log('CreateGroupPopup.onSubmitForm', data);

      gbks.common.api.group.createGroup(data);
    } else {
      this.e.canvas.addClass('has-error');
    }
  };

  this.disableForm = function() {
    // this.e.createGroupForm.removeClass('is-active');
    // this.e.inputs.attr('disabled', true);
  };

  this.enableForm = function() {
    // this.e.inputs.removeAttr('disabled');
  };

  this.clearForm = function() {
    this.e.nameField.val('');
    this.e.emailField.val('');
    this.e.passField.val('');
  };

  // Validation.

  this.validateName = function() {
    var name = this.e.nameField.val();
    var valid = true;
    var errors = [];

    if(name.length < 3) {
      valid = false;
      errors.push('Please enter a longer name');
    }

    return {
      value: name,
      valid: valid,
      errors: errors
    };
  };

  this.validateEmail = function() {
    var email = this.e.emailField.val();
    var valid = true;
    var errors = [];

    var length = email.length;
    var atPosition = email.indexOf('@');
    var atPositionLast = email.lastIndexOf('@');
    var dotPosition = email.indexOf('.');
    var dotPositionLast = email.lastIndexOf('.');

    if(length < 3) {
      valid = false;
      errors.push('Please enter a longer email');
    } else if(atPosition == -1) {
      valid = false;
      errors.push('Your email must contain a @');
    } else if(dotPosition == -1) {
      valid = false;
      errors.push('Your email must contain a .');
    } else if(atPosition != atPositionLast) {
      valid = false;
      errors.push('Your email can only contain one @');
    } else if(dotPosition != dotPositionLast) {
      valid = false;
      errors.push('Your email can only contain one .');
    }

    return {
      value: email,
      valid: valid,
      errors: errors
    };
  };

  this.validatePass = function() {
    var pass = this.e.passField.val();
    var valid = true;
    var errors = [];

    if(pass.length < 3) {
      valid = false;
      errors.push('Please enter a longer password');
    }

    return {
      value: pass,
      valid: valid,
      errors: errors
    };
  };

  // Show

  this.onShowPopupEvent = function(data) {
    this.togglePosition = data;

    this.show();
  };

  this.show = function() {
    if(!this.e.canvas) {
      this.createCanvas();
    }

    // $(document).mousedown(this.clickDocumentMethod);
    $(window).resize(this.resizeMethod);

    // Animate in.
    this.e.cover.addClass('is-active');
      
    clearTimeout(this.timer);    
    this.timer = setTimeout($.proxy(this.showPartTwo, this), this.timing.beat);
  };

  this.showPartTwo = function() {
    this.e.cover.addClass('is-visible');

    clearTimeout(this.timer);
    this.timer = setTimeout($.proxy(this.showPartThree, this), this.timing.cover);
  };

  this.showPartThree = function() {
    this.e.canvas.addClass('is-active');

    this.placeOverToggle();

    clearTimeout(this.timer);
    this.timer = setTimeout($.proxy(this.showPartFour, this), this.timing.beat);
  };

  this.showPartFour = function() {
    this.e.canvas.addClass('is-visible');
    
    clearTimeout(this.timer);
    this.timer = setTimeout($.proxy(this.showPartFive, this), this.timing.beat);
  };

  this.showPartFive = function() {
    this.removeContentTransform();

    this.updateContentHeight();
  };

  // Hide

  this.onHidePopupEvent = function() {
    // console.log('CreateGroupPopup.onHideEvent');
    this.hide();
  };
  
  this.hide = function(event) {
    // $(document).unbind('mousedown', this.clickDocumentMethod);
    $(window).unbind('resize', this.resizeMethod);
    
    if(this.e.canvas) {
      this.e.canvas.removeClass('is-visible');

      clearTimeout(this.timer);
      this.timer = setTimeout($.proxy(this.hidePartTwo, this), this.timing.canvas);
    }
  };

  this.hidePartTwo = function() {
    this.e.canvas.removeClass('is-active');

    clearTimeout(this.timer);
    this.timer = setTimeout($.proxy(this.hidePartThree, this), this.timing.beat);
  };

  this.hidePartThree = function() {
    this.e.cover.removeClass('is-visible');

    clearTimeout(this.timer);
    this.timer = setTimeout($.proxy(this.hidePartFour, this), this.timing.cover);
  };

  this.hidePartFour = function() {
    this.e.cover.removeClass('is-active');

    this.clearCanvas();
  };

  // Clicks

  this.onClickCloseButton = function(event) {
    event.stopPropagation();
    event.preventDefault();

    this.hide();
  };

  this.onClickDocument = function(event) {
    // var target = $(event.target);
    // var parents = target.parents('#'+this.ids.);
    // if(parents.length == 0) {
    //   this.hide();

    //   event.stopPropagation();
    //   event.preventDefault();
    // }
  };

  // Layout.

  this.onResize = function(event) {

  };

  this.removeContentTransform = function() {
    this.e.content.css({
      transform: ''
    });
  };
  
};
  
if(!gbks.common.signupPopupInstance) {
  gbks.common.signupPopupInstance = new gbks.common.SignupPopup();
  gbks.common.signupPopupInstance.init();
}



/**
 * Popup for creating new groups.
 */

var gbks = gbks || {};
gbks.common = gbks.common || {};

gbks.common.CreateGroupPopup = function() {
  
    this.init = function() {
        this.id = 'CreateGroupPopup';
        this.log = !false;
        this.isVisible = false;
        this.e = {};
        this.ids = {
            canvas: 'create-group-popup',
            cover: 'create-group-popup-cover'
        };
        this.updateContentTimer = null;
        this.timer = null;
        this.timing = {
            beat: 25,
            cover: 100,
            canvas: 250
        };
        this.togglePosition = null;
        this.resizeMethod = $.proxy(this.onResize, this);
        this.clickDocumentMethod = $.proxy(this.onClickDocument, this);
        this.descriptionKeyMethod = $.proxy(this.onDescriptionKey, this);

        gbks.events.listen(gbks.event.ShowPopup, $.proxy(this.onShowPopup, this));
        gbks.events.listen(gbks.event.HidePopup, $.proxy(this.onHidePopup, this));

        // gbks.events.listen(gbks.event.ShowCreateGroupPopup, $.proxy(this.onShowEvent, this));
        // gbks.events.listen(gbks.event.HideCreateGroupPopup, $.proxy(this.onHideEvent, this));
    };

    this.createCanvas = function() {
        if(this.e.canvas) {
            this.clearCanvas();
        }

        // Show groups overlay.
        var h = '';
        h += '<div id="'+this.ids.cover+'"></div>';
        h += '<div id="'+this.ids.canvas+'">';
        h += '  <div class="wrap-table">';
        h += '  <div class="wrap-cell">';
        h += '  <div class="content">';
        h += '  <div class="content-wrap">';
        h += '    <h2>Create a group</h2>';
        h += '    <a href="#" class="close">';
        h += '      '+gbks.icons.close;
        h += '    </a>';
        h += '    <form>';
        h += '      <div class="form-field form-field--name">';
        h += '        <input name="name" type="text" placeholder="Group name"/>';
        h += '        <p class="error">Please enter a longer name</p>';
        h += '      </div>';
        h += '      <div class="form-field form-field--description">';
        h += '        <p class="input" contenteditable="true" data-placeholder="Description">Description</p>';
        h += '        <p class="error">Too long!</p>';
        h += '      </div>';

        if(gbks.permissions.userIsAdmin()) {
            h += '      <div class="form-field form-field--contacts">';
            h += '      </div>';
        }

        if(gbks.permissions.userIsPlus()) {
            h += '      <div class="form-field form-field--privacy">';
            h += '        <a href="#" class="toggle" data-id="private">Private</a>';
            h += '      </div>';
        }

        h += '      <div class="options">';
        h += '        <input type="submit" class="button button--filled" value="Create group"/>';
        h += '      </div>';
        h += '    </form>';
        h += '  </div>';
        h += '  </div>';
        h += '  </div>';
        h += '  </div>';
        h += '</div>';
        $('body').append(h);

        this.collectElements();

        // Initiate contacts dropdown.
        if(gbks.permissions.userIsAdmin()) {
            this.contactsDropdown = new gbks.ContactsDropdown();
            this.contactsDropdown.init(this.e.contactsFormField, {
                action: 'Invite others'
            });
        }

        this.setupEvents();
    };

    this.collectElements = function() {
        var e = {};

        e.cover = $('#'+this.ids.cover);
        e.canvas = $('#'+this.ids.canvas);
        e.content = $('.content', e.canvas);
        e.contentWrap = $('.content-wrap', e.canvas);
        e.closeButton = $('.close', e.canvas);
        e.form = $('form', e.canvas);
        e.nameFormField = $(".form-field--name", e.canvas);
        e.nameField = $("input[name='name']", e.nameFormField);
        e.descriptionFormField = $(".form-field--description", e.canvas);
        e.descriptionFieldWrap = $(".form-field-wrap", e.descriptionFormField);
        e.descriptionField = $("p.input", e.descriptionFormField);
        e.contactsFormField = $(".form-field--contacts", e.canvas);
        e.privacyField = $("input[name='privacy']", e.canvas);
        e.privacyToggle = $(".form-field--privacy a.toggle", e.canvas);
        e.membersField = $("input[name='users']", e.canvas);
        e.submitButton = $("input[type='submit']", e.canvas);

        this.e = e;
    };

    this.setupEvents = function() {    
        // Hide when pressing close button.
        this.e.closeButton.bind('click tap', $.proxy(this.onClickCloseButton, this));
        this.e.privacyToggle.bind('click tap', $.proxy(this.onClickPrivacyToggle, this));
        this.e.submitButton.bind('click tap', $.proxy(this.onClickSubmit, this));
        this.e.descriptionField.bind('focus', $.proxy(this.onFocusDescriptionField, this));
        this.e.descriptionField.bind('blur', $.proxy(this.onBlurDescriptionField, this));

        this.e.form.bind('submit', $.proxy(this.onSubmitForm, this));
    };

    this.clearCanvas = function() {
        this.e.canvas.remove();
        this.e.cover.remove();
        this.e = {};
    };

    this.onFocusDescriptionField = function(event) {
        if(this.e.descriptionField.html() == this.e.descriptionField.data('placeholder')) {
            this.e.descriptionField.addClass('is-active');
            this.e.descriptionField.html('');
        }

        this.e.descriptionField.bind('keydown', this.descriptionKeyMethod);
    };

    this.onBlurDescriptionField = function(event) {
        if(this.e.descriptionField.html() == '') {
            this.e.descriptionField.removeClass('is-active');
            this.e.descriptionField.html(this.e.descriptionField.data('placeholder'));
        }

        this.e.descriptionField.unbind('keydown', this.descriptionKeyMethod);
    };

    // Saving

    this.onClickSubmit = function(event) {
        event.stopPropagation();
        event.preventDefault(); 

        this.submitForm();
    };

    this.onSubmitForm = function(event) {
        event.stopPropagation();
        event.preventDefault();

        this.submitForm();
    };

    this.submitForm = function() {   
        if(this.log) {
            console.log('CreateGroupPopup.submitForm', this.e); 
        }

        var name = this.e.nameField.val();
        var description = this.e.descriptionField.html();
        var isPrivate = this.e.privacyToggle.hasClass('is-active'); 
        var members = $('input[name=users]', this.e.canvas).val();

        var nameIsValid = (name.length >= 3);

        if(nameIsValid) {
            this.e.nameFormField.removeClass('has-error');
        } else {
            this.e.nameFormField.addClass('has-error');
        }

        if(nameIsValid) {
            this.e.canvas.removeClass('has-error');

            // Hide and clear group creation form.
            this.clearForm();
            this.disableForm();

            this.e.canvas.addClass('is-saving');

            // Make call.
            var data = {
                name: name,
                description: description,
                'private': isPrivate,
                members: members
            };

            if(this.log) {
                console.log('CreateGroupPopup.onSubmitForm', data);
            }

            gbks.events.call(gbks.event.CreateGroup, data);

            this.hide();
        } else {
         this.e.canvas.addClass('has-error');
        }
    };

    this.disableForm = function() {
        // this.e.createGroupForm.removeClass('is-active');
        // this.e.inputs.attr('disabled', true);
    };

    this.enableForm = function() {
        // this.e.inputs.removeAttr('disabled');
    };

    this.clearForm = function() {
        this.e.nameField.val('');
        this.e.descriptionField.html('');
    };

    // Events

    this.onShowPopup = function(data) {
        if(this.log) {
            console.log('CreateGroupPopup.onShowPopup', data);
        }

        if(data.id == this.id) {
            this.togglePosition = data;

            this.show();
        } else if(this.isVisible) {
            this.hide();
        }
    };

    this.onHidePopup = function(data) {
        if(this.log) {
            console.log('CreateGroupPopup.onHidePopup', data);
        }

        if(this.isVisible && data.id == this.id) {
            this.hide();
        }
    };

    // Show

    this.onShowEvent = function(data) {
        this.togglePosition = data;

        this.show();
    };

    this.show = function() {
        this.isVisible = true;

        if(!this.e.canvas) {
            this.createCanvas();
        }

        // $(document).mousedown(this.clickDocumentMethod);
        $(window).resize(this.resizeMethod);

        // Animate in.
        this.e.cover.addClass('is-active');

        $('body').addClass('lightbox-active');

        clearTimeout(this.timer);    
        this.timer = setTimeout($.proxy(this.showPartTwo, this), this.timing.beat);
    };

    this.showPartTwo = function() {
        this.e.cover.addClass('is-visible');

        clearTimeout(this.timer);
        this.timer = setTimeout($.proxy(this.showPartThree, this), this.timing.cover);
    };

    this.showPartThree = function() {
        this.e.canvas.addClass('is-active');

        this.placeOverToggle();

        clearTimeout(this.timer);
        this.timer = setTimeout($.proxy(this.showPartFour, this), this.timing.beat);
    };

    this.showPartFour = function() {
        this.e.canvas.addClass('is-visible');

        clearTimeout(this.timer);
        this.timer = setTimeout($.proxy(this.showPartFive, this), this.timing.beat);
    };

    this.showPartFive = function() {
        this.removeContentTransform();

        this.updateContentHeight();
    };

    // Hide

    this.onHideEvent = function() {
        if(this.log) {
            console.log('CreateGroupPopup.onHideEvent', data);
        }

        this.hide();
    };

    this.hide = function(event) {
        this.isVisible = false;

        // $(document).unbind('mousedown', this.clickDocumentMethod);
        $(window).unbind('resize', this.resizeMethod);

        $('body').removeClass('lightbox-active');

        if(this.e.canvas) {
            this.e.canvas.removeClass('is-visible');

            clearTimeout(this.timer);
            this.timer = setTimeout($.proxy(this.hidePartTwo, this), this.timing.canvas);
        }
    };

    this.hidePartTwo = function() {
        this.e.canvas.removeClass('is-active');

        clearTimeout(this.timer);
        this.timer = setTimeout($.proxy(this.hidePartThree, this), this.timing.beat);
    };

    this.hidePartThree = function() {
        this.e.cover.removeClass('is-visible');

        clearTimeout(this.timer);
        this.timer = setTimeout($.proxy(this.hidePartFour, this), this.timing.cover);
    };

    this.hidePartFour = function() {
        this.e.cover.removeClass('is-active');

        if(this.contactsDropdown) {
            this.contactsDropdown.destroy();
        }

        this.clearCanvas();
    };

    // Clicks

    this.onClickCloseButton = function(event) {
        event.stopPropagation();
        event.preventDefault();

        this.hide();
    };

    this.onClickDocument = function(event) {
        // var target = $(event.target);
        // var parents = target.parents('#'+this.ids.);
        // if(parents.length == 0) {
        //   this.hide();

        //   event.stopPropagation();
        //   event.preventDefault();
        // }
    };

    this.onClickPrivacyToggle = function(event) {
        event.stopPropagation();
        event.preventDefault();

        this.e.privacyToggle.toggleClass('is-active');  
    }

    // Layout.

    this.onResize = function(event) {

    };

    this.placeOverToggle = function(data) {
        // console.log('CreateGroupPopup.placeOverToggle', this.togglePosition);

        var position = this.e.content.offset();

        // console.log('position', position);
        // console.log('width', this.e.content.width());
        // console.log('height', this.e.content.height());

        position.left += this.e.content.width()/2;
        position.top += this.e.content.height()/2;

        var deltaX = this.togglePosition.x - position.left;
        var deltaY = this.togglePosition.y - position.top;

        // deltaX *= 0.75;
        // deltaY *= 0.75;

        // console.log('x and y', deltaX, deltaY);

        this.e.content.css({
            transform: 'translate('+deltaX+'px, '+deltaY+'px) scale(0)'
        });
    };

    this.removeContentTransform = function() {
        this.e.content.css({
            transform: ''
        });
    };

    this.onDescriptionKey = function(event) {
        var text = this.e.descriptionField.text();
        var maxLength = 150;

        if(text.length > maxLength) {
            // event.preventDefault();
            // event.stopPropagation();

            this.e.descriptionFormField.addClass('has-error');
        } else {
            this.e.descriptionFormField.removeClass('has-error');
        }

        // this.updateContentHeight();
        // this.startUpdateContentTimer();
    };

    this.updateContentHeight = function() {
        // var height = this.e.contentWrap.outerHeight();
        // this.e.content.css('height', Math.ceil(height)+'px');
    };

    this.startUpdateContentTimer = function() {
        // clearTimeout(this.updateContentTimer);
        // this.updateContentTimer = setTimeout($.proxy(this.updateContentHeight, this), 1);
    };
  
};
  
if(!gbks.common.createGroupPopupInstance) {
    gbks.common.createGroupPopupInstance = new gbks.common.CreateGroupPopup();
    gbks.common.createGroupPopupInstance.init();
}



/*

Interaction for polaroid-style display of images.

*/

var gbks = gbks || {};
gbks.common = gbks.common || {};

gbks.common.SavePopup = function() {

    this.init = function() {
        this.id = 'SavePopup';
        this.isVisible = false;
        this.log = !false;
        this.button = null;
        this.data = null;
        this.userGroupsList = null;

        this.classes = {
            active: 'is-active',
            loading: 'is-loading',
            saved: 'is-saved',
            top: 'is-top'
        };

        this.e = {
            canvas: null,
            cover: null
        };

        this.coverTimer = null;

        this.resizeMethod = $.proxy(this.onResize, this);
        this.clickDocumentMethod = $.proxy(this.onClickDocument, this);

        this.setupEvents();
    };

    this.clearEvents = function() {
        $(document).unbind('mousedown', this.clickDocumentMethod);
        $(window).unbind('resize', this.resizeMethod);

        gbks.events.clearListener(this.id);
    };

    this.setupEvents = function() {
        gbks.events.listen(gbks.event.ShowPopup, $.proxy(this.onShowPopup, this), this.id);
        gbks.events.listen(gbks.event.HidePopup, $.proxy(this.onHidePopup, this), this.id);
    };

    this.setupEventsWhileVisible = function() {
        $(document).bind('mousedown', this.clickDocumentMethod);
        $(window).bind('resize', this.resizeMethod);

        gbks.events.listen(gbks.event.SaveImageStart, $.proxy(this.onSaveImageStart, this), this.id);
        gbks.events.listen(gbks.event.SaveImageSuccess, $.proxy(this.onSaveImageSuccess, this), this.id);
        gbks.events.listen(gbks.event.SaveImageError, $.proxy(this.onSaveImageError, this), this.id);

        gbks.events.listen(gbks.event.SaveImageToDropboxStart, $.proxy(this.onSaveImageToDropboxStart, this), this.id);
        gbks.events.listen(gbks.event.SaveImageToDropboxSuccess, $.proxy(this.onSaveImageToDropboxSuccess, this), this.id);
        gbks.events.listen(gbks.event.SaveImageToDropboxError, $.proxy(this.onSaveImageToDropboxError, this), this.id);
    };

    // Events

    this.onShowPopup = function(data) {
        if(this.log) {
            console.log('SavePopup.onShowPopup', data);
        }

        if(data.id == this.id) {
            this.button = data.button;
            this.imageId = data.imageId;
            this.show();
        } else if(this.isVisible) {
            this.hide();
        }
    };

    this.onHidePopup = function(data) {
        if(this.isVisible) {
            this.hide();
        }
    };

    this.onShowSavePopup = function(data) {
        if(this.log) {
            console.log('SavePopup.onShowSavePopup', data);
        }

        this.show(data.imageId);
    };

    this.onHideSavePopup = function() {
        if(this.log) {
            console.log('SavePopup.onHideSavePopup');
        }

        this.hide();
    };

    this.show = function() {
        if(this.log) {
            console.log('SavePopup.show', this.imageId, this.button);
        }

        this.isVisible = true;

        // Create canvas.
        if(!this.e.canvas) {
            this.createCanvas();
        }

        this.setupEventsWhileVisible();

        this.userGroupsList = new gbks.UserGroupsList();
        this.userGroupsList.init({
            container: this.e.groupsWrap
        });
        this.userGroupsList.saveImage(this.imageId);
    };

    this.onSaveImageStart = function(data) {
        if(this.log) {
            console.log('SavePopup.onSaveImageStart', data);
        }
    };

    this.onSaveImageSuccess = function(data) {
        if(this.log) {
            console.log('SavePopup.onSaveImageSuccess', data);
        }
    };

    this.onSaveImageError = function(data) {
        if(this.log) {
            console.log('SavePopup.onHideSavePopup', data);
        }
    };

    this.createCanvas = function() {
        var h = '<div class="popup popup--save-image">';
        h += '  <div class="wrap">';
        h += '      <div class="arrow"></div>';
        h += '      <div class="content">';
        h += '          <div class="top">';
        h += '              <h4>Image saved</h4>';
        h += '              <a href="#" class="button--close">'+gbks.icons.close+'</a>';
        h += '          </div>';
        h += '          <div class="user-groups-list-wrap"></div>';
        h += '          <div class="options"><ul>';
        h += '              <li><a href="#" class="button--dropbox">'+gbks.icons.dropbox+'Save to Dropbox<span class="icon--loader">'+gbks.icons.loader+'</span><span class="icon--success">'+gbks.icons.check+'</span></a></li>';
        h += '              <li><a href="#" class="button--unsave">'+gbks.icons.close+'Unsave image</a></li>';
        h += '          </ul></div>';
        h += '      </div>';
        h += '  </div>';
        h += '</div>';

        $('body').append(h);

        this.collectElements();

        this.updatePosition();

        // Hide when pressing close button.
        this.e.closeButton.click($.proxy(this.hide, this));

        // Hide when clicking outside of overlay.
        this.e.cover.click($.proxy(this.hide, this));

        // Option events.
        this.e.unsaveButton.click($.proxy(this.onClickUnsave, this));
        this.e.dropboxButton.click($.proxy(this.onClickDropbox, this));

        this.showCover();
    };

    this.collectElements = function() {
        this.e.canvas = $('.popup--save-image');
        this.e.cover = $('#groupsOverlayCover');
        this.e.arrow = $('.arrow', this.e.canvas);
        this.e.closeButton = $('.button--close', this.e.canvas);
        this.e.groupsWrap = $('.user-groups-list-wrap', this.e.canvas);
        this.e.unsaveButton = $('.button--unsave', this.e.canvas);
        this.e.dropboxButton = $('.button--dropbox', this.e.canvas);
    };

    this.showCover = function() {
        clearTimeout(this.coverTimer);
        this.coverTimer = setTimeout($.proxy(this.onCoverTimerShow, this), 25);
    };

    this.onCoverTimerShow = function() {
        this.e.cover.addClass(this.classes.active);
    };

    this.hideCover = function() {
        this.e.cover.removeClass(this.classes.active);

        clearTimeout(this.coverTimer);
        this.coverTimer = setTimeout($.proxy(this.onCoverTimerHide, this), 350);
    };

    this.onCoverTimerHide = function() {
        this.e.cover.remove();
        this.e.cover = null;
    };

    // Dropbox

    this.onClickDropbox = function(event) {
        event.preventDefault();
        event.stopPropagation();

        if(!this.e.dropboxButton.hasClass(this.classes.saved) && !this.e.dropboxButton.hasClass(this.classes.loading)) {
            gbks.events.call(gbks.event.SaveImageToDropbox, {imageId: this.imageId});
        }
    };

    this.onSaveImageToDropboxStart = function(data) {
        if(this.log) {
            console.log('SavePopup.onSaveImageToDropboxStart', data);
        }

        this.e.dropboxButton.addClass(this.classes.loading);
    };

    this.onSaveImageToDropboxSuccess = function(data) {
        if(this.log) {
            console.log('SavePopup.onSaveImageToDropboxSuccess', data);
        }

        this.e.dropboxButton.removeClass(this.classes.loading);
        this.e.dropboxButton.addClass(this.classes.saved);
    };

    this.onSaveImageToDropboxError = function(data) {
        if(this.log) {
            console.log('SavePopup.onSaveImageToDropboxError', data);
        }

        this.e.dropboxButton.addClass(this.classes.loading+' '+this.classes.saved);
    };

    this.onClickUnsave = function(event) {
        event.preventDefault();
        
        gbks.events.call(gbks.event.UnsaveImage, {imageId: this.imageId});

        this.hide();
    };

    this.onClickDocument = function(event) {
        var target = $(event.target);
        var parents = target.parents('.popup--save-image');
        if(parents.length == 0) {
            this.hide(null);

            event.stopPropagation();
            event.preventDefault();
        }
    };

    this.hide = function(event) {
        if(this.log) {
            console.log('SavePopup.hide');
        }

        this.isVisible = false;

        this.clearEvents();
        this.setupEvents();

        this.userGroupsList.destroy();

        if(this.e.canvas) {
            this.hideCover();

            this.e.canvas.remove();
            this.e.canvas = null;
        }

        gbks.events.call(gbks.event.HidePopup, {
            id: this.id,
            imageId: this.imageId
        });
    };

    // Resize

    this.onResize = function(event) {
        this.updatePosition();
    };

    this.updatePosition = function() {
        var windowWidth = $(window).width();
        var windowHeight = $(window).height();

        var buttonOffset = this.button.offset();
        var buttonWidth = this.button.width();
        var buttonHeight = this.button.height();

        var canvasWidth = this.e.canvas.width();
        var canvasHeight = this.e.canvas.height();

        var overlayWidth = canvasWidth;
        var left = Math.round(buttonOffset.left + buttonWidth/2 - overlayWidth/2) - 2;
        var right = left + overlayWidth;
        var windowRightDelta = windowWidth - 10 - right;
        var arrowLeft = overlayWidth/2;

        if(windowRightDelta < 0) {
            left += windowRightDelta;
            arrowLeft -= windowRightDelta;
        }
        if(left < 0) {
            var leftCopy = left;
            left -= left - 10;
            arrowLeft += leftCopy - 10;
        }

        // Check if we're in the lower half of the screen.
        var center = windowHeight/2;
        var buttonY = buttonOffset.top - window.pageYOffset + buttonHeight/2;
        var deltaTop = buttonY;
        var deltaBottom = windowHeight - deltaTop;
        var showTop = (deltaTop > deltaBottom);
        if(showTop) {
            this.e.canvas.addClass(this.classes.top);
        } else {
            this.e.canvas.removeClass(this.classes.top);
        }

        // Apply positioning.
        var top = buttonOffset.top + buttonHeight + 17;

        if(showTop) {
            top = buttonOffset.top - 17 - canvasHeight;
        }

        this.e.canvas.css({
            left: left+'px',
            top: top+'px'
        });

        this.e.arrow.css({
            left: arrowLeft+'px'
        });

        if(this.log) {
            console.log('SavePopup.updatePosition', left, top);
            console.log('windowWidth', windowWidth);
            console.log('windowHeight', windowHeight);
            console.log('buttonOffset', buttonOffset);
            console.log('buttonWidth', buttonWidth);
            console.log('buttonHeight', buttonHeight);
            console.log('canvasWidth', canvasWidth);
            console.log('canvasHeight', canvasHeight);
            console.log('left', left);
            console.log('right', right);
            console.log('windowRightDelta', windowRightDelta);
            console.log('arrowLeft', arrowLeft);
            console.log('center', center);
            console.log('buttonY', buttonY);
            console.log('deltaTop', deltaTop);
            console.log('deltaBottom', deltaBottom);
            console.log('showTop', showTop);
        }
    };

    // this.onSaveToDropbox = function(data) {
    //     this.e.dropboxButton.removeClass('icon-reload');
    //     this.e.dropboxButton.addClass('icon-check-circle-filled');
    // };

    // this.unsaveImage = function() {
    //     $.ajax({
    //         url: '/bookmark/removefromuser?imageId='+this.data.imageId,
    //         type: 'POST',
    //         dataType: 'jsonp',
    //         success: $.proxy(this.onUnsaveImage, this)  
    //     });

    //     this.hide();
    // };

    // this.onUnsaveImage = function(result) {

    // };

    // this.showLoader = function(message) {
    //     // gbks.common.Loader.show(message);
    // };

    // this.hideLoader = function() {
    //     // gbks.common.Loader.hide();
    // };

    // this.onClickCreateGroup = function(event) {
    //     event.stopPropagation();
    //     event.preventDefault(); 

    //     var imageId = this.e.createGroupFormId.val();
    //     var groupName = this.e.createGroupFormInput.val();
    //     var nameDefault = this.e.createGroupFormInput.data('default');

    //     if(groupName.length > 0 && groupName != nameDefault) {
    //         gbks.common.track('Polaroid', 'CreateGroup', groupName);

    //         // Hide and clear group creation form.
    //         this.e.createGroupForm.removeClass('is-active');
    //         this.e.createGroupFormInput.val('');

    //         $('input', this.e.createGroupForm).attr('disabled', true);

    //         this.e.createGroupFormSubmit.addClass('is-loading');

    //         // Make call.
    //         var data = {imageId:imageId, groupName:groupName};
    //         $.ajax({
    //             url: '/groups/create',
    //             data: data,
    //             type: 'POST',
    //             success: $.proxy(this.onCreateGroup, this)  
    //         });
    //     }
    // };

    // this.onCreateGroup = function(json) {
    //     this.e.createGroupFormSubmit.removeClass('is-loading');
    //     $('input', this.e.createGroupForm).removeAttr('disabled');

    //     var group = json;

    //     var html = '<li data-checked="true" data-id="'+group.id+'"><span class="icon-check-circle-filled"></span><b>'+group.name+'</b></li>';
    //     var newItem = $(html);

    //     if(this.e.groupItems.length > 0) {
    //         var i=0, length = this.e.groupItems.length, item, itemName;
    //         for(; i<length; i++) {
    //             item = $(this.e.groupItems[i]);
    //             itemName = $('b', item).html();

    //             if(group.name.toLowerCase() < itemName.toLowerCase() || i == (length-1)) {
    //                 item.before(newItem);
    //                 break;
    //             }
    //         }
    //     } else {
    //         this.e.groups.append(newItem);
    //     }

    //     // Scroll the list to the new item position.
    //     var position = newItem.position();
    //     var itemHeight = newItem.height();
    //     var listHeight = this.e.groups.height();
    //     var scrollTop = this.e.groups[0].scrollTop;
    //     var newScrollPosition = position.top + scrollTop;
    //     gbks.common.scroller.scrollToPosition(newScrollPosition, this.e.groups[0]);

    //     this.e.groups.addClass('has-groups');

    //     this.e.groupItems = $('li', this.e.groups);

    //     newItem.click($.proxy(this.onClickGroupOverlayItem, this));

    //     this.hideLoader();
    // };

    // this.onFocusInput = function(event) {
    //     var target = $(event.currentTarget);
    //     target.addClass('active');
    //     if(target.val() == target.attr('data-default')) {
    //         target.val('');
    //     }
    // };

    // this.onBlurInput = function(event) {
    //     var target = $(event.currentTarget);
    //     target.addClass('active');
    //     if(target.val() == '') {
    //         target.val(target.attr('data-default'));
    //     }
    // };

    // this.onClickGroupOverlayItem = function(event) {
    //     event.preventDefault();
    //     event.stopPropagation();

    //     var item = $(event.currentTarget);
    //     var span = $('span', item);

    //     var c = item.data('checked');

    //     var groupId = item.data('id');
    //     var checked = (c == "true" || c === true);

    //     var url = '/groups/removeImageFromGroup';
    //     var message = 'Removing from group';
    //     if(checked) {
    //         item.data('checked', false);

    //         gbks.common.track('Polaroid', 'RemoveFromGroup', this.data.imageId+'-'+groupId);

    //         span.removeClass('icon-check-circle-filled');
    //         span.addClass('icon-check-circle');
    //     } else {
    //         url = '/groups/addImageToGroup';
    //         message = 'Adding to group';

    //         item.data('checked', true);

    //         gbks.common.track('Polaroid', 'AddToGroup', this.data.imageId+'-'+groupId);

    //         span.addClass('icon-check-circle-filled');
    //         span.removeClass('icon-check-circle');
    //     }

    //     item.addClass('loading');

    //     // Make call.
    //     $.ajax({
    //         url: url,
    //         data: {imageId:this.data.imageId, groupId:groupId},
    //         type: 'POST',
    //         success: $.proxy(this.onGroupSaved, this)
    //     });
    // };

    // this.onGroupSaved = function(event) {
    //     if(this.canvas) {
    //         $('.groups li', this.canvas).removeClass('loading');
    //     }
    //     //$('#addToGroups li').removeClass('loading');
    //     //this.hideLoader();
    // };

    // this.onClickPrivacyOption = function(event) {
    //     var radio = $(event.currentTarget);
    //     var val = radio.val();

    //     var isPrivate = (val == 'private');
    //     var url = '/bookmark/setpublic';
    //     if(isPrivate) {
    //         url = '/bookmark/setprivate';
    //     }

    //     $('.privacy', this.canvas).addClass('loading');

    //     // Make call.
    //     $.ajax({
    //         url: url,
    //         data: {imageId:this.data.imageId},
    //         type: 'POST',
    //         success: $.proxy(this.onChangePrivacy, this)
    //     });
    // };

    // this.onChangePrivacy = function(event) {
    //     $('.privacy', this.canvas).removeClass('loading');
    // };

    // this.onFocusCreateGroupInput = function(event) {
    //     this.e.createGroup.addClass('is-active');
    //     this.onFocusInput(event);
    // };
  
};





/*

Share popup

*/

var gbks = gbks || {};
gbks.common = gbks.common || {};

gbks.common.SharePopup = function() {

    this.init = function() {
        this.id = 'SharePopup';
        this.isVisible = false;
        this.canvas = null;
        this.element = null;
        this.target = null;
        this.hideCallback = false;
        this.resizeMethod = $.proxy(this.updateLayout, this);

        gbks.events.listen(gbks.event.ShowPopup, $.proxy(this.onShowPopup, this));
        gbks.events.listen(gbks.event.HidePopup, $.proxy(this.onHidePopup, this));
    };

    // Events

    this.onShowPopup = function(data) {
        if(data.id == this.id) {
            this.togglePosition = data;

            this.show();
        } else if(this.isVisible) {
            this.hide();
        }
    };

    this.onHidePopup = function(data) {
        if(this.isVisible) {
            this.hide();
        }
    };

    this.display = function(imageId, target, callback) {
        this.imageId = imageId;
        this.element = target;
        this.hideCallback = callback;

        this.clickDocumentMethod = $.proxy(this.onClickDocument, this);

        $(window).resize(this.resizeMethod);

        this.createCanvas();
        this.updatePosition();
        this.canvas.show();

        $(document).click(this.clickDocumentMethod);
    };

    this.hide = function() {
        $(document).unbind('click', this.clickDocumentMethod);
        $(window).unbind('resize', this.resizeMethod);

        if(this.canvas) {
            this.canvas.hide();
            this.canvas.remove();
            this.canvas = null;
        }
    };

    this.onClickDocument = function(event) {
        var target = $(event.target);
        var parents = target.parents('#sharePopup');
        if(parents.length === 0) {
            this.hide();

            if(this.hideCallback) {
                this.hideCallback(event);
                this.hideCallback = null;
            }

            event.stopPropagation();
            event.preventDefault();
        }
    };

    this.createCanvas = function() {
        if(this.canvas) {
            this.canvas.remove();
            this.canvas = null;
        }

        var h = '<ol>';
        
        h += '<li class="type--icon type--facebook">';
        h += '<a href="/share/facebook?imageId='+this.imageId+'" target="_blank">';
        h += '<span>'+gbks.icons.facebook+'</span>';
        h += '</a>';
        h += '</li>';
        
        h += '<li class="type--icon type--pinterest">';
        h += '<a href="/share/pinterest?imageId='+this.imageId+'" target="_blank">';
        h += '<span>'+gbks.icons.pinterest+'</span>';
        h += '</a>';
        h += '</li>';
        
        h += '<li class="type--icon type--twitter">';
        h += '<a href="/share/twitter?imageId='+this.imageId+'" target="_blank">';
        h += '<span>'+gbks.icons.twitter+'</span>';
        h += '</a>';
        h += '</li>';
        
        h += '<li class="type--icon type--tumblr">';
        h += '<a href="/share/tumblr?imageId='+this.imageId+'" target="_blank">';
        h += '<span>'+gbks.icons.tumblr+'</span>';
        h += '</a>';
        h += '</li>';
        h += '</ol>';
        
        h += '<ol>';
        h += '<li class="type--text type--embed">';
        h += '<a href="/embed/image/'+this.imageId+'" target="_blank">';
        h += '<span>Embed</span>';
        h += '</a>';
        h += '</li>';
        
        h += '</ol>';
        h = gbks.common.wrapPopupContent('share-popup', h, false);

        this.canvas = $(h);
        $('body').append(this.canvas);

        $('li', this.canvas).click($.proxy(this.onClickItem, this));
    };

    this.onClickItem = function(event) {
        //this.hide();
    };

    this.updatePosition = function() {
        gbks.common.positionPopup(this.canvas, this.element);
    };
};


var gbks = gbks || {};

gbks.ColorsPod = function() {
  
	this.init = function(main) {
		this.main = main;

		console.log('ColorsPod.init');
	};

	this.collectElements = function() {
		var e = {};

		e.canvas = $('.colors-pod', this.main.e.bottom);

		this.e = e;
	};

	this.setupEvents = function() {

	};
	
	this.refresh = function(data) {
		if(data.colors) {
			var h = '<h2>Palette</h2><ul>';

			var colors = data.colors;
			var i=0, length=colors.length, color;
			for(; i<length; i++) {
				color = colors[i];

				h += '<li><a href="'+color.url+'" style="background-color: #'+color.hex+';">'+color.name+'</a></li>';
			}

			h += '</ul>';

			this.e.canvas.html(h);

			this.e.canvas.addClass('is-active');
		} else {
			this.e.canvas.removeClass('is-active');
		}
	}

};


var gbks = gbks || {};

gbks.CommentsPod = function() {
  
	this.init = function(main) {
		this.id = 'CommentsPod';
		this.main = main;
	};

	this.collectElements = function() {
		var e = {};

		e.commentList = $('.comment-list-wrap', this.main.e.canvas);
		e.commentForm = $('.comment-form-wrap', this.main.e.canvas);

		this.commentList = new gbks.CommentList();
		this.commentList.init(this, e.commentList);

		this.commentForm = new gbks.CommentForm();
		this.commentForm.init(this, e.commentForm);

		this.e = e;
	};

	this.setupEvents = function() {

	};

    this.refresh = function(data) {
	    if(this.main.log) {
	        console.log('CommentsPod.refresh', data);
	    }

    	this.e.commentList.data('id', data.imageId);
    	this.e.commentForm.data('id', data.imageId);

    	this.commentList.refresh(data.comments);
    	
    	this.commentForm.refresh();
    };

};


var gbks = gbks || {};

gbks.FinderPod = function() {
  
	this.init = function(main) {
        this.id = 'FinderPod';
        this.log = false;
		this.main = main;
	};

	this.collectElements = function() {
		var e = {};

		e.canvas = $('.finder-pod', this.main.e.info);

		this.e = e;
	};

	this.setupEvents = function() {

	};

	this.refresh = function(data) {
        if(this.log) {
            console.log('FinderPod.refresh', data);
        }

        var h = '';

        if(data.owner) {
            h = this.renderUser(data.owner, data);
            h += this.renderImages(data.owner.images);
        }

        this.e.canvas.html(h);

        $('.image-grid a', this.e.canvas).bind('tap click', $.proxy(this.onClickImage, this));
    };

    this.renderUser = function(user, data) {
        var isFollowing = (data.user && data.user.followsOwner);

        var h = '<div class="avatar-box">';
        h += gbks.render.avatar(user);
        h += '<h3>Added by<br/><a href="'+user.url+'">'+user.name+'</a></h3>';
        h += '<a href="/signup" class="button button--follow-user'+(isFollowing ? ' is-active' : '')+'" data-type="1" data-id="'+user.id+'">'+(isFollowing ? 'Following' : 'Follow')+'</a>';
        h += '</div>';

        return h;
    };

    this.renderImages = function(images) {
        var h = '<div class="image-grid">';

        var i=0, length=images.length;
        for(; i<length; i++) {
            h += this.renderImage(images[i]);

            if(i >= 5) {
              break;
            }
        }

        h += '</div>';

        return h;
    };

    this.renderImage = function(image) {
        var h = '';

        h += gbks.render.gridImage(image);

        // file = image.images.medium;
        // h += '<a href="'+image.url+'" data-id="'+image.id+'">';
        // h += '<img src="'+file.url+'" alt="'+image.title+'" width="'+file.width+'" height="'+file.height+'"/>';
        // h += '</a>';

        return h;
    };

    this.onClickImage = function(event) {
        event.preventDefault();
        event.stopPropagation();

        var link = $(event.currentTarget);
        var imageId = link.data('id');

        link.append('<span class="loader">'+gbks.icons.loader+'</span>');
        setTimeout($.proxy(this.showImageLoader, this, link), 25);

        this.main.updateByImageId(imageId);
    };

    this.showImageLoader = function(link) {
        $('.loader', link).addClass('is-visible');
    };

};



var gbks = gbks || {};

gbks.GroupsPod = function() {
  
	this.init = function(main) {
		this.main = main;
	};

	this.collectElements = function() {
		var e = {};

    	e.canvas = $('.groups-pod', this.main.e.canvas);

		this.e = e;
	};

	this.setupEvents = function() {

	};

	this.refresh = function(data) {
        if(this.main.log) {
            console.log('GroupsPod.refresh', data);
        }

		if(data.groups && data.groups.length > 0) {
			var h = '<h2>Groups</h2><ul>';

			var groups = data.groups;
			var i=0, length=groups.length, group;
			for(; i<length; i++) {
				group = groups[i];

				h += this.renderGroup(group);
			}

			h += '</ul>';

			this.e.canvas.html(h);
			this.e.canvas.addClass('is-active');

			$('.image-grid a', this.e.canvas).bind('tap click', $.proxy(this.onClickImage, this));
		} else {
			this.e.canvas.removeClass('is-active');
		}
	};

	this.renderGroup = function(data) {
		h = '<li>';

		h += this.renderGroupOwner(data);

		h += this.renderGroupImages(data.images);

		h += '</li>';

		return h;
	};

	this.renderGroupOwner = function(data) {
        var h = '<div class="avatar-box">';

        h += gbks.render.avatar(data.owner);
        h += '<p><a href="'+data.url+'">'+data.name+'</a>';
        h += '<br/>By <a href="'+data.owner.url+'">'+data.owner.name+'</a></p>';

        h += '</div>';

        return h;
	};

	this.renderGroupImages = function(images) {
		h = '<div class="image-grid">';

        var i=0, length=images.length, image, file;
        for(; i<length; i++) {
            image = images[i];

			h += gbks.render.gridImage(image);
			
            // file = image.images.medium;
            // h += '<a href="'+image.url+'" data-id="'+image.id+'">';
            // h += '<img src="'+file.url+'" alt="'+image.title+'" width="'+file.width+'" height="'+file.height+'"/>';
            // h += '</a>';

            if(i >= 6) {
              break;
            }
        }

		h += '</div>';

		return h;
	};

    this.onClickImage = function(event) {
        event.preventDefault();
        event.stopPropagation();

        var link = $(event.currentTarget);
        var imageId = link.data('id');

        link.append('<span class="loader">'+gbks.icons.loader+'</span>');
        setTimeout($.proxy(this.showImageLoader, this, link), 25);

        this.main.updateByImageId(imageId);
    };

    this.showImageLoader = function(link) {
        $('.loader', link).addClass('is-visible');
    };

};


var gbks = gbks || {};

gbks.ImagePod = function() {

    this.init = function(main) {
        this.main = main;
        this.data = null;
        this.isLoading = false;
        this.inTransition = false;
    };

    this.collectElements = function() {
        var e = {};

        e.wrap = $('.top .image .wrap', this.main.e.canvas);
        e.canvas = $('.content', e.wrap);
        e.link = $('.image-link', e.canvas);
        e.image = $('.image-original', e.canvas);
        e.videoWrap = $('.video-wrap', this.main.e.content);
        e.videoFrame = $('iframe', e.videoWrap);

        this.e = e;
    };

    this.setupEvents = function() {
        
    };

    this.refreshHTML = function(data) {
        var e = this.main.e;

        // Update image or video HTML
        var isVideo = (data.image.video.length > 0);

        if(this.main.log) {
            console.log('ImagePod.refreshHTML', isVideo);
        }

        if(isVideo) {
            var videoBits = data.image.video.split(':');
            var h = '<div class="video-wrap">';
            var isVimeo = (videoBits[0] == 'v');
            if(isVimeo) {
                h += '<iframe src="http://player.vimeo.com/video/'+videoBits[1]+'" width="670" height="375" frameborder="0" data-width="670" data-height="375"></iframe>';
            } else {
                h += '<iframe id="ytplayer" type="text/html" width="670" height="375" data-width="670" data-height="375" src="http://www.youtube.com/embed/'+videoBits[1]+'?autoplay=0&showinfo=0&theme=light&modestbranding=1&autohide=1&origin='+window.location.href+'" frameborder="0"></iframe>';
            }
            h += '</div>';
            e.imageContent.html(h);

            e.image.addClass('is-video');

            this.e.videoWrap = $('.video-wrap', this.main.e.content);
            this.e.videoFrame = $('iframe', e.videoWrap);

            e.videoWrap = $('.video-wrap', e.imageContent);
            e.videoFrame = $('iframe', e.videoWrap);
        } else {
            var currentImageLink = $('.image-link', e.imageContent);

            if(currentImageLink.length == 0) {
                var h = '<a href="'+data.image.url+'" target="_blank" class="image-link">';
                h += '<span></span>';
                h += '<img class="image-preview">';
                h += '<img class="image-original">';
                h += '</a>';
                e.imageContent.html(h);

                this.e.link = $('.image-link', this.e.canvas);
                this.e.image = $('.image-original', this.e.canvas);

                e.image.removeClass('is-video');

                e.imageLink = $('.image-link', e.imageContent);
                e.imagePreview = $('.image-preview', e.imageContent);
                e.imageOriginal = $('.image-original', e.imageContent);
            }
        }
    };

    this.refresh = function(data) {
        this.data = data;

        var isVideo = this.isVideo();

        if(this.main.log) {
            console.log('LightboxImage.refresh', data, this.e);
        }

        if(this.e.image) {
            this.e.image.remove();
            this.e.image = null;
        }

        this.collectElements();

        if(!isVideo) {
            var file = data.image.images.original;

            var h = '<img class="image-original is-loading" src="'+file.url+'" width="'+file.width+'" height="'+file.height+'" alt="'+data.image.title+'">';

            this.e.link.append(h);

            this.e.image = $('.image-original', this.e.canvas);
            this.e.image.bind('load', $.proxy(this.onImageLoaded, this));
            this.isLoading = true;

            this.e.image.attr({
                src: file.url,
                alt: data.image.title
            });

            this.e.link.attr('href', data.referer);

            if(data.image.color) {
                $('span', this.e.canvas).css('background-color', '#'+data.image.color);
            } else {
                $('span', this.e.canvas).css('background-color', 'transparent');
            }
        }
    };

    this.onImageLoaded = function() {
        this.isLoading = false;

        if(this.main.log) {
            console.log('LightboxImage.onImageLoaded');
        }

        if(!this.inTransition) {
            this.e.image.removeClass('is-loading');
        }
    };

    this.resize = function(imageData, imageWidth, imageHeight) {
        if(imageData) {
            this.data = imageData;
        }

        var sidebarWidth = 346;
        var maxLightboxWidth = 1024;

        // var maxWidth = this.e.wrap.width();
        var windowWidth = $(window).width();
        var lightBoxWidth = Math.min(windowWidth, maxLightboxWidth);

        var maxImageWidth = lightBoxWidth - sidebarWidth;

        var padding = 30;
        var isFullWidth = false;
        if(imageWidth > maxImageWidth) {
            padding = 0;
            isFullWidth = true;
        }

        if(this.main.log) {
            console.log('LightboxImage.resize', this.e, imageWidth, maxImageWidth, padding);
        }

        maxImageWidth -= padding * 2;

        // var left = padding;
        var top = padding;

        var newWidth = Math.min(maxImageWidth, imageWidth);
        var newHeight = imageHeight / imageWidth * newWidth;

        if(this.isVideo()) {
            newWidth = maxImageWidth + padding;
            newHeight = newWidth / 16 * 9;

            newWidth = Math.round(newWidth);
            newHeight = Math.round(newHeight);

            // this.e.canvas.css({
            //     marginTop: '0px'
            // });

            console.log('resizing video', newWidth, newHeight, this.e.videoFrame.length);

            // this.e.videoFrame.css({
            //     width: newWidth+'px',
            //     height: newHeight+'px'
            // });

            // this.e.videoFrame.attr('data-test', 'stuff');
        } else {
            this.e.canvas.css({
                marginTop: top+'px'
            });

            this.e.link.css({
                width: newWidth+'px',
                height: newHeight+'px'
            });
        }
        
        if(isFullWidth) {
            this.e.link.addClass('is-full-width');
        } else {
            this.e.link.removeClass('is-full-width');
        }

        // var image = $('.image .wrap img', this.e.canvas);

        // if(image.length == 0) {
        //     image = $('.image .wrap iframe');
        // }

        // var w = image.attr('data-width');
        // var h = image.attr('data-height');

        // // Adjust size to screen pixel ratio.
        // if(window.devicePixelRatio && window.devicePixelRatio > 1) {
        //     w /= window.devicePixelRatio;
        //     h /= window.devicePixelRatio;
        // }

        // var maxWidth = $('.image', this.e.canvas).width();
        // var maxHeight = $(window).height() - 80;

        // var windowWidth = maxWidth - 60;
        // var windowHeight = $(window).height() - 180;

        // var ratioOriginal = w/h;
        // w = Math.min(w, windowWidth);
        // h = w/ratioOriginal;

        // w = Math.round(w);
        // h = Math.round(h);

        // image.css({
        //     width: w+'px',
        //     height: h+'px'
        // });
    };

    this.isVideo = function() {
        var result = false;
        if(this.data && this.data.image) {
            result = (this.data.image.video.length > 0);
        } else {
            result = ($('iframe', this.e.videoWrap).length > 0);
        }
        return result;
    };

    this.onTransitionFromTileStart = function() {
        this.inTransition = true;
    };

    this.onTransitionFromTileComplete = function() {
        this.inTransition = false;

        if(!this.isLoading) {
            this.e.image.removeClass('is-loading');
        }
    };

};


var gbks = gbks || {};

gbks.OptionsPod = function() {

    this.init = function(main) {
        this.id = 'ImageOptions';
        this.main = main;
        this.log = false;

        this.classes = {
            canvas: '.options-pod',
            active: 'is-active',
            loading: 'is-loading'
        };
    };

    this.collectElements = function(container) {
        var e = {};

        e.canvas = $(this.classes.canvas, container);
        e.saveButton = $('.button--save', e.canvas);
        e.likeButton = $('.button--like', e.canvas);
        e.shareButton = $('.button--share', e.canvas);

        this.e = e;
    };

    this.setupEvents = function() {

    };

    this.refresh = function(data) {
        this.data = data;

        if(this.log) {
            console.log('OptionsPod.refresh', data);
        }

        var isSaved = (data.user && data.user.saved);
        this.toggleSaveButton(isSaved);

        var isLiked = (data.user && data.user.liked);
        this.toggleLikeButton(isLiked);

        this.e.saveButton.attr('data-id', data.imageId);
        this.e.likeButton.attr('data-id', data.imageId);
        this.e.shareButton.attr('data-id', data.imageId);

        if(this.log) {
            console.log('this.e.likeButton', this.e.likeButton, data.imageId);
        }

        // console.log('a', this.e.shareButton.data('id'));
    };

    this.toggleSaveButton = function(isActive) {
        if(isActive) {
            this.e.saveButton.addClass(this.classes.active);
            $('span', this.e.saveButton).html('Saved');
        } else {
            this.e.saveButton.removeClass(this.classes.active);
            $('span', this.e.saveButton).html('Save');
        }
    };

    this.toggleLikeButton = function(isActive) {
        if(isActive) {
            this.e.likeButton.addClass(this.classes.active);
            $('span', this.e.likeButton).html('Liked');
        } else {
            this.e.likeButton.removeClass(this.classes.active);
            $('span', this.e.likeButton).html('Like');
        }
    };

    this.activate = function() {

    };

    this.deactivate = function() {
        
    };

    this.render = function() {
        this.e.canvas.html(gbks.render.imageOptions());

        this.collectElements();
    };

    // Helper

    this.destroy = function() {
        gbks.events.clearListener(this.id);
    };

    // Sharing

    // this.onClickShareButton = function(event) {
    //     event.stopPropagation();
    //     event.preventDefault();

    //     var imageId = this.e.shareButton.attr('data-id');
    // };

    // this.hidePopups = function(except) {
    //     if(except != 'save') {
    //         this.hideSavePopup();
    //     }

    //     if(except != 'share') {
    //         this.onHideSharePopup();
    //     }
    // };

    // // Saving

    // this.onClickSaveButton = function(event) {
    //     event.stopPropagation();
    //     event.preventDefault();

    //     // this.hidePopups('save');

    //     var button = $(event.currentTarget);
    //     var imageId = button.attr('data-id');

    //     gbks.events.call(gbks.event.SaveImage, {imageId: imageId});

    //     // this.toggleSaveButton(true);

    //     // this.e.saveButton.addClass('is-loading');

    //     gbks.common.track('Image', 'Save', imageId);

    //     // $.ajax({
    //     //     url: '/bookmark/savetouser?imageId='+imageId,
    //     //     type: 'POST',
    //     //     dataType: 'jsonp',
    //     //     success: $.proxy(this.onAddImageComplete, this)
    //     // });
    // };

    // this.onSaveImageStart = function(data) {
    //     this.e.saveButton.addClass(this.classes.loading);

    //     this.toggleSaveButton(true);
    // };

    // this.onSaveImageSuccess = function(data) {
    //     this.e.saveButton.removeClass(this.classes.loading);

    //     this.savePopup = new gbks.common.SavePopup();
    //     this.savePopup.init(this.e.saveButton, result, $.proxy(this.onClickRemoveImage, this), $.proxy(this.onCloseSavePopup, this));
    // };

    // this.onSaveImageError = function(data) {
    //     this.e.saveButton.removeClass(this.classes.loading);

    //     this.toggleSaveButton(false);
    // };

    // this.onUnsaveImageStart = function(data) {
    //     this.e.saveButton.addClass(this.classes.loading);

    //     this.toggleSaveButton(true);
    // };

    // this.onUnsaveImageSuccess = function(data) {
    //     this.e.saveButton.removeClass(this.classes.loading);
    // };

    // this.onUnsaveImageError = function(data) {
    //     this.e.saveButton.removeClass(this.classes.loading);

    //     this.toggleSaveButton(false);
    // };

    // this.toggleSaveButton = function(active) {
    //     if(active) {
    //         this.e.saveButton.addClass(this.classes.active);
    //         $('span', this.e.saveButton).html('Saved');
    //     } else {
    //         this.e.saveButton.removeClass(this.classes.active);
    //         $('span', this.e.saveButton).html('Save');
    //     }
    // };

    // this.onAddImageComplete = function(result) {
    //     this.e.saveButton.removeClass(this.classes.loading);

    // };

    // // Save popup

    // this.hideSavePopup = function() {
    //     if(this.savePopup) {
    //         this.savePopup.hide();
    //     }
    // };

    // this.onCloseSavePopup = function(event) {

    // };

};


var gbks = gbks || {};

gbks.SecondaryOptionsPod = function() {

    this.init = function(main) {
        this.id = 'SecondaryOptionsPod';
        this.main = main;
        this.log = !false;

        this.classes = {
            canvas: '.secondary-options-pod',
            active: 'is-active',
            loading: 'is-loading'
        };
    };

    this.collectElements = function(container) {
        var e = {};

        e.canvas = $(this.classes.canvas, container);

        this.e = e;
    };

    this.setupEvents = function() {

    };

    this.refresh = function(data) {
        this.data = data;

        this.render();
    };

    this.render = function() {
        var h = '<ul>';

        h += '<li><a href="/flag?ref=image&imageId='+this.data.imageId+'">'+gbks.icons.flag+'Flag this image</a></li>';

        if(gbks.permissions.userIsAdmin()) {
            h += '<li><a href="/flag?ref=image&imageId='+this.data.imageId+'">'+gbks.icons.settings+'Admin</a></li>';
        }

        h += '</ul>';

        this.e.canvas.html(h);
    };

    // Helper

    this.destroy = function() {

    };

};


var gbks = gbks || {};

gbks.SimilarPod = function() {
  
	this.init = function(main) {
		this.main = main;
	};

	this.collectElements = function() {
		var e = {};

		e.canvas = $('.similar-pod', this.main.e.canvas);

		this.e = e;
	};

	this.setupEvents = function() {

	};

    this.refresh = function(data) {

    };
  
	this.onClickSimilarImage = function(event) {
		event.preventDefault();
		event.stopPropagation();

		gbks.common.track('Polaroid', 'Lightbox', 'Similar');

		var target = $(event.currentTarget);
		//var tile = $(target.parents('.tile')[0]);
		var id = target.attr('data-id');

		//console.log('onClickSimilarImage', target, tile, id);

		this.updateFromId(id);

		//gbks.common.scroller.scrollToPosition(0);
	};

};


var gbks = gbks || {};

gbks.SourcePod = function() {
  
	this.init = function(main) {
		this.main = main;
	};

	this.collectElements = function() {
		var e = {};
		
		e.canvas = $('.source-pod', this.main.e.info);

		this.e = e;
	};

	this.setupEvents = function() {

	};

	this.refresh = function(data) {
		if(data.source) {
			this.render(data);

			this.e.canvas.addClass('is-active');
		} else {
			this.e.canvas.html('');

			this.e.canvas.removeClass('is-active');
		}
	};

	this.render = function(data) {
		var source = data.source;

		var h = '';
		h += '<h3><a href="'+source.url+'">'+gbks.icons.link+source.name+'</a></h3>';

		// Images
		h += '<div class="image-grid">';

		var i=0, length=source.images.length, image, file;
		for(; i<length; i++) {
			image = source.images[i];

			h += gbks.render.gridImage(image);

			// file = image.images.medium;
			// h += '<a href="'+image.url+'" data-id="'+image.id+'">';
			// h += '<img src="'+file.url+'" alt="'+image.title+'" width="'+file.width+'" height="'+file.height+'"/>';
			// h += '</a>';

            if(i >= 6) {
              break;
            }
		}

		h += '</div>';

		this.e.canvas.html(h);

    	$('.image-grid a', this.e.canvas).bind('tap click', $.proxy(this.onClickImage, this));
	};

    this.onClickImage = function(event) {
        event.preventDefault();
        event.stopPropagation();

        var link = $(event.currentTarget);
        var imageId = link.data('id');

        link.append('<span class="loader">'+gbks.icons.loader+'</span>');
        setTimeout($.proxy(this.showImageLoader, this, link), 25);

        this.main.updateByImageId(imageId);
    };

    this.showImageLoader = function(link) {
        $('.loader', link).addClass('is-visible');
    };

};


var gbks = gbks || {};

gbks.TagsPod = function() {
  
	this.init = function(main) {
		this.id = 'TagsPod';
		this.log = false;
		this.main = main;
	};

	this.collectElements = function() {
		var e = {};

		e.canvas = $('.tags-pod', this.main.e.canvas);

		this.e = e;
	};

	this.setupEvents = function() {

	};

	this.refresh = function(data) {
		if(this.log) {
			console.log('TagsPod.refresh', data);
		}

		if(data.tags && data.tags.length > 0) {
			var h = '<h2>Tags</h2><ul>';

			var tags = data.tags;
			var i=0, length=tags.length, tag;
			for(; i<length; i++) {
				tag = tags[i];

				h += this.renderTag(tag);
			}

			h += '</ul>';

			this.e.canvas.html(h);
			this.e.canvas.addClass('is-active');

			$('.image-grid a', this.e.canvas).bind('tap click', $.proxy(this.onClickImage, this));
		} else {
			this.e.canvas.removeClass('is-active');
		}
	};

	this.renderTag = function(data) {
		h = '<li>';

		h += this.renderTagHeader(data);

		h += this.renderTagImages(data.images);

		h += '</li>';

		return h;
	};

	this.renderTagHeader = function(data) {
        var h = '<h3><a href="'+data.url+'">'+gbks.icons.tag+data.name+'</a></h3>';

        return h;
	};

	this.renderTagImages = function(images) {
		h = '<div class="image-grid">';

        var i=0, length=images.length, image, file;
        for(; i<length; i++) {
            image = images[i];

			h += gbks.render.gridImage(image);
			
            // file = image.images.medium;
            // h += '<a href="'+image.url+'" data-id="'+image.id+'">';
            // h += '<img src="'+file.url+'" alt="'+image.title+'" width="'+file.width+'" height="'+file.height+'"/>';
            // h += '</a>';

            if(i >= 6) {
              break;
            }
        }

		h += '</div>';

		return h;
	};

    this.onClickImage = function(event) {
        event.preventDefault();
        event.stopPropagation();

        var link = $(event.currentTarget);
        var imageId = link.data('id');

        link.append('<span class="loader">'+gbks.icons.loader+'</span>');
        setTimeout($.proxy(this.showImageLoader, this, link), 25);

        this.main.updateByImageId(imageId);
    };

    this.showImageLoader = function(link) {
        $('.loader', link).addClass('is-visible');
    };

};


var gbks = gbks || {};

gbks.StatsPod = function() {
  
	this.init = function(main) {
		this.main = main;
	};

	this.collectElements = function() {
		var e = {};

		e.canvas = $('.stats-pod', this.main.e.canvas);

		this.e = e;
	};

	this.setupEvents = function() {

	};

	this.refresh = function(data) {
		var h = '<h2>';

		if(data.image.saveCount > 0) {
			h += '<span>'+data.image.saveCount+' like'+(data.image.saveCount != 1 ? 's' : '')+'</span>';
		}

		if(data.image.likeCount > 0) {
			h += '<span>'+data.image.likeCount+' save'+(data.image.likeCount != 1 ? 's' : '')+'</span>';
		}

		if(data.image.commentCount > 0) {
			h += '<span>'+data.image.commentCount+' comment'+(data.image.commentCount != 1 ? 's' : '')+'</span>';
		}
		
		h += '</h2>';

		this.e.canvas.html(h);
	};

};


var gbks = gbks || {};

gbks.ColorsInfoBlock = function() {
  
    this.init = function() {
        this.classes = {
            active: 'is-active'
        };

        this.collectElements();
        this.setupEvents();

        // this.actives = [];
        // this.choices = [];
        this.loadTimer = null;

        // if(typeof(grid) !== 'undefined') {
        //     grid.layout.initAutoLayout();
        // }
    };

    this.collectElements = function() {
        var e = {};

        e.canvas = $('.info-block.type--colors');
        e.colors = $('li', e.canvas);

        this.e = e;
    };

    this.setupEvents = function() {
        this.e.colors.bind('click tap', $.proxy(this.onClickColor, this));
    };

    this.onClickColor = function(event) {
        event.preventDefault();

        var item = $(event.currentTarget);
        var hex = item.data('hex');

        gbks.events.call(gbks.event.UpdateGridConfig, {hex: hex});

        this.e.colors.removeClass(this.classes.active);
        item.addClass(this.classes.active);

        // Update list of active items.
        // if(item.hasClass('is-active')) {
        //     if(this.actives.indexOf(item) === -1) {
        //         this.actives.push(item);
        //     }
        // } else {
        //     while(this.actives.indexOf(item) !== -1) {
        //         this.actives.splice(this.actives.indexOf(item), 1);
        //     }
        // }

        // while(this.actives.length > 3) {
        //     var first = this.actives.shift();
        //     first.removeClass(this.classes.active);
        // }

        // this.choices = this.getColorChoices();

        clearTimeout(this.loadTimer);
        // if(this.choices.length > 0) {
            this.loadTimer = setTimeout($.proxy(this.loadImages, this, hex), 250);
        // }
    };

    this.getColorChoices = function(event) {
        var items = $('li.is-active', this.palette);
        var colors = [];
        items.each(function(index) {
            colors.push($(this).data('hex'));
        });
        return colors;
    };

    this.loadImages = function(hex) {
        // var choices = this.getColorChoices();
        // var colors = choices.join('|');

        gbks.events.call(gbks.event.LoadImages, {
            type: 'colors',
            page: 0,
            hex: hex,
            format: 'json'
        });

        //$('#clue', this.canvas).remove();
        // $('.tile').remove();
        // $('#noMoreImages').remove();

        // gbks.tilesInstance.config.type = 'colors';
        // gbks.tilesInstance.config.currentPage = 0;
        // gbks.tilesInstance.config.hex = colors;
        // gbks.tilesInstance.loadMore();
    };
  
};

gbks.modules = gbks.modules || [];
gbks.modules.push({
    name: 'Colors',
    canvas: '.info-block.type--colors',
    class: gbks.ColorsInfoBlock
});



var gbks = gbks || {};
gbks.common = gbks.common || {};

gbks.common.CategoryApi = function() {

	this.init = function(api) {
		this.api = api;
		
		this.id = 'CategoryApi';
        this.log = false;

	    gbks.events.listen(gbks.event.GetCategories, $.proxy(this.getCategories, this), this.id);
	};

	// Load all categories

	this.getCategories = function() {
		if(this.api.log) {
			console.log('CategoryApi.getCategories');
		}

		gbks.events.call(gbks.event.GetCategoriesStart);

		$.ajax({
			url: this.api.path + '/autocomplete/categories',
			dataType: 'jsonp',
			success: $.proxy(this.onGetCategoriesSuccess, this),
			error: $.proxy(this.onGetCategoriesError, this)
		});
	};

	this.onGetCategoriesSuccess = function(data) {
		if(this.api.log) {
			console.log('CategoryApi.onGetCategoriesSuccess', data);
		}

		gbks.events.call(gbks.event.GetCategoriesSuccess, data);
	};

	this.onGetCategoriesError = function(data) {
		if(this.api.log) {
			console.log('CategoryApi.onGetCategoriesError', data);
		}

		gbks.events.call(gbks.event.GetCategoriesError, data);
	};
  
};


var gbks = gbks || {};
gbks.common = gbks.common || {};

gbks.common.CommentApi = function() {

	this.init = function(api) {
		this.api = api;
		this.id = 'CommentApi';
        this.log = !false;

	    gbks.events.listen(gbks.event.CreateComment, $.proxy(this.createComment, this), this.id);
	    gbks.events.listen(gbks.event.GetComment, $.proxy(this.getComment, this), this.id);
	    gbks.events.listen(gbks.event.UpdateComment, $.proxy(this.updateComment, this), this.id);
	    gbks.events.listen(gbks.event.RemoveComment, $.proxy(this.removeComment, this), this.id);
	    gbks.events.listen(gbks.event.GetImageComments, $.proxy(this.getImageComments, this), this.id);
	    gbks.events.listen(gbks.event.GetUserComments, $.proxy(this.getUserComments, this), this.id);
	};

	// Create comment.

	this.createComment = function(data) {
		if(this.log) {
			console.log('CommentApi.createComment', data);
		}

		var request = {
			url: this.api.path + '/api/v2/images/'+data.imageId+'/notes',
			type: 'POST',
			data: data,
			dataType: 'jsonp',
			success: $.proxy(this.onCreateCommentSuccess, this),
			error: $.proxy(this.onCreateCommentError, this)
		};

		this.api.call(request);
	};

	this.onCreateCommentSuccess = function(data) {
		if(this.log) {
			console.log('CommentApi.onCreateCommentSuccess', data);
		}

		gbks.events.call(gbks.event.CreateCommentSuccess, data.data);
	};

	this.onCreateCommentError = function(data) {
		if(this.log) {
			console.log('CommentApi.onCreateCommentError', data);
		}

		gbks.events.call(gbks.event.CreateCommentError, data);
	};

	// Get comment
	
	this.getComment = function(data) {
		if(this.log) {
			console.log('CommentApi.getComment', data);
		}

		gbks.events.call(gbks.event.GetCommentStart, data);

		var request = {
			url: this.api.path + '/api/v2/images/'+data.imageId+'/notes/'+data.commentId,
			dataType: 'jsonp',
			success: $.proxy(this.onGetCommentSuccess, this),
			error: $.proxy(this.onGetCommentError, this)
		};

		this.api.call(request);
	};

	this.onGetCommentSuccess = function(data) {
		if(this.log) {
			console.log('CommentApi.onGetCommentSuccess', data);
		}

		gbks.events.call(gbks.event.GetCommentSuccess, data.data);
	};

	this.onGetCommentError = function(data) {
		if(this.log) {
			console.log('CommentApi.onGetCommentError', data);
		}

		gbks.events.call(gbks.event.GetCommentError, data);
	};

	// Update comment
	
	this.updateComment = function(data) {
		if(this.log) {
			console.log('CommentApi.updateComment', data);
		}

		var request = {
			url: this.api.path + '/api/v2/images/'+data.imageId+'/notes/'+data.commentId,
			type: 'PUT',
			data: data,
			dataType: 'jsonp',
			success: $.proxy(this.onUpdateCommentSuccess, this),
			error: $.proxy(this.onUpdateCommentError, this)
		};

		this.api.call(request);
	};

	this.onUpdateCommentSuccess = function(data) {
		if(this.log) {
			console.log('CommentApi.onUpdateCommentSuccess', data);
		}

		gbks.events.call(gbks.event.UpdateCommentSuccess, data.data);
	};

	this.onUpdateCommentError = function(data) {
		if(this.log) {
			console.log('CommentApi.onUpdateCommentError', data);
		}

		gbks.events.call(gbks.event.UpdateCommentError, data);
	};

	// Remove comment
	
	this.removeComment = function(data) {
		if(this.log) {
			console.log('CommentApi.removeComment', data);
		}

		var request = {
			url: this.api.path + '/api/v2/images/'+data.imageId+'/notes/'+data.commentId,
			type: 'DELETE',
			dataType: 'jsonp',
			success: $.proxy(this.onRemoveCommentSuccess, this),
			error: $.proxy(this.onRemoveCommentError, this)
		};

		this.api.call(request);
	};

	this.onRemoveCommentSuccess = function(data) {
		if(this.log) {
			console.log('CommentApi.onRemoveCommentSuccess', data);
		}

		gbks.events.call(gbks.event.RemoveCommentSuccess, data.data);
	};

	this.onRemoveCommentError = function(data) {
		if(this.log) {
			console.log('CommentApi.onRemoveCommentError', data);
		}

		gbks.events.call(gbks.event.RemoveCommentError, data);
	};

	// get image comments
	
	this.getImageComments = function(data) {
		if(this.log) {
			console.log('CommentApi.getImageComments', data);
		}

		var request = {
			url: this.api.path + '/api/v2/images/'+data.imageId+'/notes',
			dataType: 'jsonp',
			success: $.proxy(this.onGetImageCommentsSuccess, this),
			error: $.proxy(this.onGetImageCommentsError, this)
		};

		this.api.call(request);
	};

	this.onGetImageCommentsSuccess = function(data) {
		if(this.log) {
			console.log('CommentApi.onGetImageCommentsSuccess', data);
		}

		gbks.events.call(gbks.event.GetImageCommentsSuccess, data.data);
	};

	this.onGetImageCommentsError = function(data) {
		if(this.log) {
			console.log('CommentApi.onGetImageCommentsError', data);
		}

		gbks.events.call(gbks.event.GetImageCommentsError, data);
	};

	// Get user comments
	
	this.getUserComments = function(data) {
		if(this.log) {
			console.log('CommentApi.getUserComments', data);
		}

		gbks.events.call(gbks.event.GetUserCommentsStart, data);

		var request = {
			url: this.api.path + '/api/v2/users/'+data.userId+'/notes',
			dataType: 'jsonp',
			success: $.proxy(this.onGetUserCommentsSuccess, this),
			error: $.proxy(this.onGetUserCommentsError, this)
		};

		this.api.call(request);
	};

	this.onGetUserCommentsSuccess = function(data) {
		if(this.log) {
			console.log('CommentApi.onGetUserCommentsSuccess', data);
		}
		
		gbks.events.call(gbks.event.GetUserCommentsSuccess, data.data);
	};

	this.onGetUserCommentsError = function(data) {
		if(this.log) {
			console.log('CommentApi.onGetUserCommentsError', data);
		}

		gbks.events.call(gbks.event.GetUserCommentsError, data);
	};

};


var gbks = gbks || {};
gbks.common = gbks.common || {};

gbks.common.GroupApi = function() {
  
    this.init = function(api) {
        this.api = api;

        this.id = 'GroupApi';

        if(this.api.log) {
            console.log('GroupApi.init');
        }

        gbks.events.listen(gbks.event.CreateGroup, $.proxy(this.createGroup, this), this.id);
        gbks.events.listen(gbks.event.GetGroup, $.proxy(this.getGroup, this), this.id);
        gbks.events.listen(gbks.event.UpdateGroup, $.proxy(this.updateGroup, this), this.id);
        gbks.events.listen(gbks.event.RemoveGroup, $.proxy(this.removeGroup, this), this.id);
        gbks.events.listen(gbks.event.GetUserGroups, $.proxy(this.getUserGroups, this), this.id);
        gbks.events.listen(gbks.event.FollowGroup, $.proxy(this.followGroup, this), this.id);
        gbks.events.listen(gbks.event.UnfollowGroup, $.proxy(this.unfollowGroup, this), this.id);
        gbks.events.listen(gbks.event.SearchGroups, $.proxy(this.searchGroups, this), this.id);

        this.userGroups = {
            loading: false,
            loaded: false,
            success: null,
            data: null
        };
    };

    // Get a group.

    this.getGroup = function(data) {

    };

    /* 
        Create group.

        data = {
            name, 
            description, 
            members, 
            private, 
            imageId
        }
    */
    this.createGroup = function(data) {
        if(this.api.log) {
            console.log('GroupApi.createGroup', data);
        }

        gbks.events.call(gbks.event.CreateGroupStart, data);

        var request = {
            url: this.api.path+'/api/v2/groups',
            data: data,
            type: 'POST',
            dataType: 'jsonp',
            success: $.proxy(this.onCreateGroupSuccess, this),
            error: $.proxy(this.onCreateGroupError, this)  
        };

        this.api.call(request);
    };

    this.onCreateGroupSuccess = function(data) {
        if(this.api.log) {
            console.log('GroupApi.onCreateGroupSuccess', data);
        }

        gbks.events.call(gbks.event.CreateGroupSuccess, data);
    };

    this.onCreateGroupError = function(data) {
        if(this.api.log) {
            console.log('GroupApi.onCreateGroupError', data);
        }

        gbks.events.call(gbks.event.CreateGroupError, data);
    };

    // Update group.

    this.updateGroup = function(data) {
        if(this.api.log) {
            console.log('GroupApi.updateGroup', data);
        }

    };

    // Remove group. 

    this.removeGroup = function(data) {
        if(this.api.log) {
            console.log('GroupApi.removeGroup', data);
        }

    };

    // Load user groups.

    this.getUserGroups = function(data) {
        if(this.api.log) {
            console.log('GroupApi.getUserGroups', data);
        }

        if(this.userGroups.loaded) {
            if(this.userGroups.success) {
                gbks.events.call(gbks.event.GetUserGroupsSuccess, this.userGroups.data.data);
            } else {
                gbks.events.call(gbks.event.GetUserGroupsError, this.userGroups.data.data);
            }
        } else if(!this.userGroups.loading) {
            this.userGroups.loading = true;

            var userId;
            if(config && config.user) {
                userId = config.user.id;
            }

            if(userId) {
                // url: this.api.path+'/groups/usergroups',

                var request = {
                    url: this.api.path+'/api/v2/users/'+userId+'/groups',
                    dataType: 'jsonp',
                    success: $.proxy(this.onGetUserGroupsSuccess, this),
                    error: $.proxy(this.onGetUserGroupsError, this)
                };

                this.api.call(request);
            } else {
                console.log('GroupApi.getUserGroups user id not found in config');
            }
        }
    };

    this.onGetUserGroupsSuccess = function(data) {
        if(this.api.log) {
            console.log('GroupApi.onGetUserGroupsSuccess', data);
        }

        this.userGroups.loading = false;
        this.userGroups.loaded = true;
        this.userGroups.success = true;
        this.userGroups.data = data;

        gbks.events.call(gbks.event.GetUserGroupsSuccess, data.data);
    };

    this.onGetUserGroupsError = function(data) {
        if(this.api.log) {
            console.log('GroupApi.onGetUserGroupsError', data);
        }

        this.userGroups.loading = false;
        this.userGroups.loaded = true;
        this.userGroups.success = false;
        this.userGroups.data = data;

        gbks.events.call(gbks.event.GetUserGroupsError, data);
    };

    // Follow group. 

    this.followGroup = function(data) {
        if(this.api.log) {
            console.log('GroupApi.followGroup', data);
        }

        gbks.events.call(gbks.event.FollowGroupStart, data);

        var request = {
            url: this.api.path+'/api/v2/groups/'+data.groupId+'/followers',
            type: 'POST',
            dataType: 'jsonp',
            success: $.proxy(this.onFollowGroupSuccess, this),
            error: $.proxy(this.onFollowGroupError, this)  
        };

        this.api.call(request);
    };

    this.onFollowGroupSuccess = function(data) {
        if(this.api.log) {
            console.log('GroupApi.onFollowGroupSuccess', data);
        }

        gbks.events.call(gbks.event.FollowGroupSuccess, data);
    };

    this.onFollowGroupError = function(data) {
        if(this.api.log) {
            console.log('GroupApi.onFollowGroupError', data);
        }

        gbks.events.call(gbks.event.FollowGroupError, data);
    };

    // Unfollow group. 

    this.unfollowGroup = function(data) {
        if(this.api.log) {
            console.log('GroupApi.unfollowGroup', data);
        }

        gbks.events.call(gbks.event.UnfollowGroupStart, data);

        var request = {
            url: this.api.path+'/api/v2/groups/'+data.groupId+'/followers',
            type: 'DELETE',
            success: $.proxy(this.onUnfollowGroupSuccess, this),
            error: $.proxy(this.onUnfollowGroupError, this)  
        };

        this.api.call(request);
    };

    this.onUnfollowGroupSuccess = function(data) {
        if(this.api.log) {
            console.log('GroupApi.onUnfollowGroupSuccess', data);
        }

        gbks.events.call(gbks.event.UnfollowGroupSuccess, data);
    };

    this.onUnfollowGroupError = function(data) {
        if(this.api.log) {
            console.log('GroupApi.onUnfollowGroupError', data);
        }

        gbks.events.call(gbks.event.UnfollowGroupError, data);
    };

    // Search groups
  
    this.searchGroups = function(data) {
        if(this.log) {
            console.log('GroupApi.searchGroups', data);
        }

        gbks.events.call(gbks.event.SearchGroupsStart, data);

        var request = {
            url: this.api.path + '/autocomplete/groups',
            data: {
                term: data.term
            },
            dataType: 'jsonp',
            success: $.proxy(this.onSearchGroupsSuccess, this),
            error: $.proxy(this.onSearchGroupsError, this)  
        };

        this.api.call(request);
    };

    this.onSearchGroupsSuccess = function(data) {
        if(this.log) {
            console.log('GroupApi.onSearchGroupsSuccess', data);
        }

        gbks.events.call(gbks.event.SearchGroupsSuccess, data);
    };

    this.onSearchGroupsError = function(data) {
        if(this.log) {
            console.log('GroupApi.onSearchGroupsError', data);
        }

        gbks.events.call(gbks.event.SearchGroupsError, data);
    };

};


var gbks = gbks || {};
gbks.common = gbks.common || {};

gbks.common.ImageApi = function() {
  
	this.init = function(api) {
		this.api = api;

		this.id = 'ImageApi';
		this.log = !false;

	    gbks.events.listen(gbks.event.LoadImages, $.proxy(this.loadImages, this), this.id);
	    gbks.events.listen(gbks.event.SaveImage, $.proxy(this.saveImage, this), this.id);
	    gbks.events.listen(gbks.event.UploadImage, $.proxy(this.uploadImage, this), this.id);
	    gbks.events.listen(gbks.event.UnsaveImage, $.proxy(this.unsaveImage, this), this.id);
	    gbks.events.listen(gbks.event.SaveImageToGroup, $.proxy(this.saveImageToGroup, this), this.id);
	    gbks.events.listen(gbks.event.RemoveImageFromGroup, $.proxy(this.removeImageFromGroup, this), this.id);
	    gbks.events.listen(gbks.event.SaveImageToDropbox, $.proxy(this.saveImageToDropbox, this), this.id);
	    // gbks.events.listen(gbks.event.UnsaveImageFromDropbox, $.proxy(this.unsaveImageFromDropbox, this), this.id);
	    gbks.events.listen(gbks.event.MakeImagePublic, $.proxy(this.makeImagePublic, this), this.id);
	    gbks.events.listen(gbks.event.MakeImagePrivate, $.proxy(this.makeImagePrivate, this), this.id);
	    gbks.events.listen(gbks.event.LikeImage, $.proxy(this.likeImage, this), this.id);
	    gbks.events.listen(gbks.event.UnlikeImage, $.proxy(this.unlikeImage, this), this.id);
	    gbks.events.listen(gbks.event.SearchImages, $.proxy(this.searchImages, this), this.id);
	    gbks.events.listen(gbks.event.LoadLightboxData, $.proxy(this.loadLightboxData, this), this.id);
	    gbks.events.listen(gbks.event.ImageNsfw, $.proxy(this.imageNsfw, this), this.id);
	};

	// Load images.

	this.loadImages = function(data) {
		if(this.log) {
			console.log('ImageApi.loadImages', data);
		}

		gbks.events.call(gbks.event.LoadImagesStart, data);

		var request = {
			url: this.api.path + '/bookmarks/loadMore',
			type: 'POST',
			data: data,
			dataType: 'jsonp',
			success: $.proxy(this.onLoadImagesSuccess, this),
			error: $.proxy(this.onLoadImagesError, this)
		};

		this.api.call(request);
	};

	this.onLoadImagesSuccess = function(data) {
		if(this.log) {
			console.log('ImageApi.onLoadImagesSuccess', data);
		}

		gbks.events.call(gbks.event.LoadImagesSuccess, data);
	};

	this.onLoadImagesError = function(data) {
		if(this.log) {
			console.log('ImageApi.onLoadImagesError', data);
		}

		gbks.events.call(gbks.event.LoadImagesError, data);
	};

	// Save image.

	this.saveImage = function(data) {
		if(this.log) {
			console.log('ImageApi.saveImage', data);
		}

		gbks.events.call(gbks.event.SaveImageStart, data);

		var data = {
			imageId: data.imageId
		};

		var request = {
			url: this.api.path + '/api/v2/images/'+data.imageId+'/saves',
			type: 'POST',
			data: data,
			success: $.proxy(this.onSaveImageSuccess, this),
			error: $.proxy(this.onSaveImageError, this)
		};

		this.api.call(request);
	};

	this.onSaveImageSuccess = function(data) {
		if(this.log) {
			console.log('ImageApi.onSaveImageSuccess', data);
		}

		gbks.events.call(gbks.event.SaveImageSuccess, data.data);
	};

	this.onSaveImageError = function(data) {
		if(this.log) {
			console.log('ImageApi.onSaveImageError', data);
		}

		gbks.events.call(gbks.event.SaveImageError, data);
	};

	// Upload image.

	/**
	 * data = {
	 *     source
	 *     referer
	 *     images - list of URLs
	 *     image
	 *     groups - list of group Ids
	 * }
	 */
	this.uploadImage = function(data) {
		if(this.log) {
			console.log('ImageApi.uploadImage', data);
		}

		gbks.events.call(gbks.event.UploadImageStart, data);

		var request = {
			url: this.api.path + '/api/v2/images',
			type: 'POST',
			data: data,
			contentType: false,
			processData: false,
			cache: false,
			success: $.proxy(this.onUploadImageSuccess, this),
			error: $.proxy(this.onUploadImageError, this)
		};

		this.api.call(request);
	};

	this.onUploadImageSuccess = function(data) {
		if(this.log) {
			console.log('ImageApi.onUploadImageSuccess', data);
		}

		gbks.events.call(gbks.event.UploadImageSuccess, data.data);
	};

	this.onUploadImageError = function(data) {
		if(this.log) {
			console.log('ImageApi.onUploadImageError', data);
		}

		gbks.events.call(gbks.event.UploadImageError, data);
	};

	// Unsave image.

	this.unsaveImage = function(data) {
		if(this.log) {
			console.log('ImageApi.unsaveImage', data);
		}
		
		gbks.events.call(gbks.event.UnsaveImageStart, data);

		var data = {
			imageId: data.imageId
		};

		var request = {
			url: this.api.path + '/api/v2/images/'+data.imageId+'/saves',
			type: 'DELETE',
			data: data,
			success: $.proxy(this.onUnsaveImageSuccess, this),
			error: $.proxy(this.onUnsaveImageError, this)
		};

		this.api.call(request);
	};

	this.onUnsaveImageSuccess = function(data) {
		gbks.events.call(gbks.event.UnsaveImageSuccess, data);
	};

	this.onUnsaveImageError = function(data) {
		console.log('ImageApi.onUnsaveImageError', data);
		gbks.events.call(gbks.event.UnsaveImageError, data);
	};

	// Save image to group.

	this.saveImageToGroup = function(data) {
		gbks.events.call(gbks.event.SaveImageToGroupStart, data);

		if(this.log) {
			console.log('ImageApi.saveImageToGroup', data);
		}

		var data = {
			imageId: data.imageId,
			groupId: data.groupId
		};

			// url: this.api.path + '/groups/addImageToGroup',
		var request = {
			url: this.api.path + '/api/v2/images/'+data.imageId+'/groups',
			type: 'POST',
			data: data,
			success: $.proxy(this.onSaveImageToGroupSuccess, this),
			error: $.proxy(this.onSaveImageToGroupError, this)
		};

		this.api.call(request);
	};

	this.onSaveImageToGroupSuccess = function(data) {
		if(this.log) {
			console.log('ImageApi.onSaveImageToGroupSuccess', data);
		}

		gbks.events.call(gbks.event.SaveImageToGroupSuccess, data.data);
	};

	this.onSaveImageToGroupError = function(data) {
		if(this.log) {
			console.log('ImageApi.onSaveImageToGroupError', data);
		}
		gbks.events.call(gbks.event.SaveImageToGroupError, data.data);
	};

	// Remove image from group.

	this.removeImageFromGroup = function(data) {
		gbks.events.call(gbks.event.RemoveImageFromGroupStart, data);

		var data = {
			imageId: data.imageId,
			groupId: data.groupId
		};

		if(this.log) {
			console.log('ImageApi.removeImageFromGroup', data);
		}

		// url: this.api.path + '/groups/removeImageFromGroup',
		var request = {
			url: this.api.path + '/api/v2/images/'+data.imageId+'/groups/'+data.groupId,
			type: 'DELETE',
			data: data,
			success: $.proxy(this.onRemoveImageFromGroupSuccess, this),
			error: $.proxy(this.onRemoveImageFromGroupError, this)
		};

		this.api.call(request);
	};

	this.onRemoveImageFromGroupSuccess = function(data) {
		if(this.log) {
			console.log('ImageApi.onRemoveImageFromGroupSuccess', data);
		}

		gbks.events.call(gbks.event.RemoveImageFromGroupSuccess, data.data);
	};

	this.onRemoveImageFromGroupError = function(data) {
		if(this.log) {
			console.log('ImageApi.onRemoveImageFromGroupError', data);
		}

		gbks.events.call(gbks.event.RemoveImageFromGroupError, data.data);
	};

	// Like image.

	this.likeImage = function(data) {
		gbks.events.call(gbks.event.LikeImageStart, data);

		var data = {
			imageId: data.imageId
		};

		if(this.log) {
			console.log('ImageApi.likeImage', data);
		}

		var request = {
			url: this.api.path + '/api/v2/images/'+data.imageId+'/likes',
			type: 'POST',
			data: data,
			success: $.proxy(this.onLikeImageSuccess, this),
			error: $.proxy(this.onLikeImageError, this)
		};

		this.api.call(request);
	};

	this.onLikeImageSuccess = function(data) {
		if(this.log) {
			console.log('ImageApi.onLikeImageSuccess', data);
		}

		gbks.events.call(gbks.event.LikeImageSuccess, data.data);
	};

	this.onLikeImageError = function(data) {
		if(this.log) {
			console.log('ImageApi.onLikeImageError', data);
		}

		gbks.events.call(gbks.event.LikeImageError, data);
	};

	// Unlike image.

	this.unlikeImage = function(data) {
		if(this.log) {
			console.log('ImageApi.unlikeImage', data);
		}

		gbks.events.call(gbks.event.UnlikeImageStart, data);

		var data = {
			imageId: data.imageId
		};

		var request = {
			url: this.api.path + '/api/v2/images/'+data.imageId+'/likes',
			type: 'DELETE',
			data: data,
			success: $.proxy(this.onUnlikeImageSuccess, this),
			error: $.proxy(this.onUnlikeImageError, this)
		};

		this.api.call(request);
	};

	this.onUnlikeImageSuccess = function(data) {
		if(this.log) {
			console.log('ImageApi.onUnlikeImageSuccess', data);
		}

		gbks.events.call(gbks.event.UnlikeImageSuccess, data.data);
	};

	this.onUnlikeImageError = function(data) {
		if(this.log) {
			console.log('ImageApi.onUnlikeImageError', data);
		}

		gbks.events.call(gbks.event.UnlikeImageError, data);
	};

	// Save image to Dropbox.

	this.saveImageToDropbox = function(data) {
		gbks.events.call(gbks.event.SaveImageToDropboxStart, data);

		var data = {
			imageId: data.imageId,
			ref: 'popup'
		};

		var request = {
			url: this.api.path + '/bookmark/dropbox',
			data: data,
			dataType: 'jsonp',
			success: $.proxy(this.onSaveImageToDropboxSuccess, this),
			error: $.proxy(this.onSaveImageToDropboxError, this)
		};

		this.api.call(request);
	};

	this.onSaveImageToDropboxSuccess = function(data) {
		gbks.events.call(gbks.event.SaveImageToDropboxSuccess, data);
	};

	this.onSaveImageToDropboxError = function(data) {
		console.log('ImageApi.onSaveImageToDropboxError', data);
		gbks.events.call(gbks.event.SaveImageToDropboxError, data);
	};

	// Make image public.

	this.makeImagePublic = function(data) {
		gbks.events.call(gbks.event.MakeImagePublicStart, data);

		var data = {
			imageId: data.imageId
		};

		var request = {
			url: this.api.path + '/bookmark/setpublic',
			data: data,
			success: $.proxy(this.onMakeImagePublicSuccess, this),
			error: $.proxy(this.onMakeImagePublicError, this)
		};

		this.api.call(request);
	};

	this.onMakeImagePublicSuccess = function(data) {
		gbks.events.call(gbks.event.MakeImagePublicSuccess, data);
	};

	this.onMakeImagePublicError = function(data) {
		console.log('ImageApi.onMakeImagePublicError', data);
		gbks.events.call(gbks.event.MakeImagePublicError, data);
	};

	// Make image private.

	this.makeImagePrivate = function(data) {
		gbks.events.call(gbks.event.MakeImagePrivateStart, data);

		var data = {
			imageId: data.imageId
		};

		var request = {
			url: this.api.path + '/bookmark/setprivate',
			data: data,
			success: $.proxy(this.onMakeImagePrivateSuccess, this),
			error: $.proxy(this.onMakeImagePrivateError, this)
		};

		this.api.call(request);
	};

	this.onMakeImagePrivateSuccess = function(data) {
		gbks.events.call(gbks.event.MakeImagePrivateSuccess, data);
	};

	this.onMakeImagePrivateError = function(data) {
		console.log('ImageApi.onMakeImagePrivateError', data);
		gbks.events.call(gbks.event.MakeImagePrivateError, data);
	};

    // Search images
  
    this.searchImages = function(data) {
        if(this.log) {
            console.log('ImageApi.searchImages', data);
        }

        gbks.events.call(gbks.event.SearchImagesStart, data);

        var request = {
            url: this.api.path + '/autocomplete/images',
            data: {
                term: data.term
            },
            success: $.proxy(this.onSearchImagesSuccess, this),
            error: $.proxy(this.onSearchImagesError, this)  
        };

		this.api.call(request);
    };

    this.onSearchImagesSuccess = function(data) {
        if(this.log) {
            console.log('ImageApi.onSearchImagesSuccess', data);
        }

        gbks.events.call(gbks.event.SearchImagesSuccess, data);
    };

    this.onSearchImagesError = function(data) {
        if(this.log) {
            console.log('ImageApi.onSearchImagesError', data);
        }

        gbks.events.call(gbks.event.SearchImagesError, data);
    };

    // Lightbox
  
    this.loadLightboxData = function(data) {
        if(this.log) {
            console.log('ImageApi.loadLightboxData', data);
        }

        gbks.events.call(gbks.event.LoadLightboxDataStart, data);

        var request = {
            url: this.api.path+'/lightbox/get',
            data: {
            	imageId: data.imageId
            },
            dataType: 'jsonp',
            type: 'POST',
            success: $.proxy(this.onLoadLightboxDataSuccess, this),
            error: $.proxy(this.onLoadLightboxDataError, this)  
        };

		this.api.call(request);
    };

    this.onLoadLightboxDataSuccess = function(data) {
        if(this.log) {
            console.log('ImageApi.onLoadLightboxDataSuccess', data);
        }

        gbks.events.call(gbks.event.LoadLightboxDataSuccess, data);
    };

    this.onLoadLightboxDataError = function(data) {
        if(this.log) {
            console.log('ImageApi.onLoadLightboxDataError', data);
        }

        gbks.events.call(gbks.event.LoadLightboxDataError, data);
    };

	// Nsfw image.

	// data = {imageId: 1, mature: 1/0}
	this.imageNsfw = function(data) {
		if(this.log) {
			console.log('ImageApi.imageNsfw', data);
		}

		gbks.events.call(gbks.event.ImageNsfwStart, data);

		var request = {
			url: this.api.path + '/api/v2/images/'+data.imageId+'/mature',
			type: 'POST',
			data: data,
			success: $.proxy(this.onImageNsfwSuccess, this),
			error: $.proxy(this.onImageNsfwError, this)
		};

		this.api.call(request);
	};

	this.onImageNsfwSuccess = function(data) {
		if(this.log) {
			console.log('ImageApi.onImageNsfwSuccess', data);
		}

		gbks.events.call(gbks.event.ImageNsfwSuccess, data.data);
	};

	this.onImageNsfwError = function(data) {
		if(this.log) {
			console.log('ImageApi.onImageNsfwError', data);
		}

		gbks.events.call(gbks.event.ImageNsfwError, data);
	};
  
};

var gbks = gbks || {};
gbks.common = gbks.common || {};

gbks.common.SourceApi = function() {
  
    this.init = function(api) {
        this.api = api;
        
        this.id = 'SourceApi';
        this.log = !false;

        if(this.log) {
            console.log('SourceApi.init');
        }

        gbks.events.listen(gbks.event.FollowSource, $.proxy(this.followSource, this), this.id);
        gbks.events.listen(gbks.event.UnfollowSource, $.proxy(this.unfollowSource, this), this.id);
        gbks.events.listen(gbks.event.GetSourceContacts, $.proxy(this.getSourceContacts, this), this.id);
        gbks.events.listen(gbks.event.SearchSources, $.proxy(this.searchSources, this), this.id);
    };

    // Follow source
  
    this.followSource = function(data) {
        if(this.log) {
            console.log('SourceApi.followSource', data);
        }

        gbks.events.call(gbks.event.FollowSourceStart, data);

        $.ajax({
            url: this.api.path + '/api/v2/sources/'+data.sourceId+'/followers',
            type: 'POST',
            success: $.proxy(this.onFollowSourceSuccess, this),
            error: $.proxy(this.onFollowSourceError, this)  
        });
    };

    this.onFollowSourceSuccess = function(data) {
        if(this.log) {
            console.log('SourceApi.onFollowSourceSuccess', data);
        }

        gbks.events.call(gbks.event.FollowSourceSuccess, data);
    };

    this.onFollowSourceError = function(data) {
        if(this.log) {
            console.log('SourceApi.onFollowSourceError', data);
        }

        gbks.events.call(gbks.event.FollowSourceError, data);
    };

    // Unfollow source
  
    this.unfollowSource = function(data) {
        if(this.log) {
            console.log('SourceApi.unfollowSource', data);
        }

        gbks.events.call(gbks.event.UnfollowSourceStart, data);

        $.ajax({
            url: this.api.path + '/api/v2/sources/'+data.sourceId+'/followers',
            type: 'DELETE',
            success: $.proxy(this.onUnfollowSourceSuccess, this),
            error: $.proxy(this.onUnfollowSourceError, this)  
        });
    };

    this.onUnfollowSourceSuccess = function(data) {
        if(this.log) {
            console.log('SourceApi.onUnfollowSourceSuccess', data);
        }

        gbks.events.call(gbks.event.UnfollowSourceSuccess, data);
    };

    this.onUnfollowSourceError = function(data) {
        if(this.log) {
            console.log('SourceApi.onUnfollowSourceError', data);
        }

        gbks.events.call(gbks.event.UnfollowSourceError, data);
    };
  
};

var gbks = gbks || {};
gbks.common = gbks.common || {};

gbks.common.UserApi = function() {
  
    this.init = function(api) {
        this.api = api;
        
        this.id = 'UserApi';
        this.log = !false;

        gbks.events.listen(gbks.event.FollowUser, $.proxy(this.followUser, this), this.id);
        gbks.events.listen(gbks.event.UnfollowUser, $.proxy(this.unfollowUser, this), this.id);
        gbks.events.listen(gbks.event.GetUserContacts, $.proxy(this.getUserContacts, this), this.id);
        gbks.events.listen(gbks.event.GetUserFollowing, $.proxy(this.getUserFollowing, this), this.id);
        gbks.events.listen(gbks.event.GetUserFollowers, $.proxy(this.getUserFollowers, this), this.id);
        gbks.events.listen(gbks.event.SearchUsers, $.proxy(this.searchUsers, this), this.id);
    };

    // Follow user
  
    this.followUser = function(data) {
        if(this.log) {
            console.log('UserApi.followUser', data);
        }

        gbks.events.call(gbks.event.FollowUserStart, data);

        $.ajax({
            url: this.api.path + '/api/v2/users/'+data.userId+'/followers',
            type: 'POST',
            dataType: 'jsonp',
            data: {
                requestmethod: 'POST',
            },
            success: $.proxy(this.onFollowUserSuccess, this),
            error: $.proxy(this.onFollowUserError, this)  
        });
    };

    this.onFollowUserSuccess = function(data) {
        if(this.log) {
            console.log('UserApi.onFollowUserSuccess', data);
        }

        gbks.events.call(gbks.event.FollowUserSuccess, data.data);
    };

    this.onFollowUserError = function(data) {
        if(this.log) {
            console.log('UserApi.onFollowUserError', data);
        }

        gbks.events.call(gbks.event.FollowUserError, data);
    };

    // Unfollow user
  
    this.unfollowUser = function(data) {
        if(this.log) {
            console.log('UserApi.unfollowUser', data);
        }

        gbks.events.call(gbks.event.UnfollowUserStart, data);

        $.ajax({
            url: this.api.path + '/api/v2/users/'+data.userId+'/followers',
            type: 'DELETE',
            success: $.proxy(this.onUnfollowUserSuccess, this),
            error: $.proxy(this.onUnfollowUserError, this)  
        });
    };

    this.onUnfollowUserSuccess = function(data) {
        if(this.log) {
            console.log('UserApi.onUnfollowUserSuccess', data);
        }

        gbks.events.call(gbks.event.UnfollowUserSuccess, data.data);
    };

    this.onUnfollowUserError = function(data) {
        if(this.log) {
            console.log('UserApi.onUnfollowUserError', data);
        }

        gbks.events.call(gbks.event.UnfollowUserError, data);
    };

    // Get user contacts
  
    this.getUserContacts = function(data) {
        if(this.log) {
            console.log('UserApi.getUserContacts', data);
        }

        gbks.events.call(gbks.event.GetUserContactsStart, data);

        $.ajax({
            url: this.api.path + '/autocomplete/contacts',
            dataType: 'jsonp',
            success: $.proxy(this.onGetUserContactsSuccess, this),
            error: $.proxy(this.onGetUserContactsError, this)  
        });
    };

    this.onGetUserContactsSuccess = function(data) {
        if(this.log) {
            console.log('UserApi.onGetUserContactsSuccess', data);
        }

        gbks.events.call(gbks.event.GetUserContactsSuccess, data);
    };

    this.onGetUserContactsError = function(data) {
        if(this.log) {
            console.log('UserApi.onGetUserContactsError', data);
        }

        gbks.events.call(gbks.event.GetUserContactsError, data);
    };

    // Get user following
  
    this.getUserFollowing = function(data) {
        if(this.log) {
            console.log('UserApi.getUserFollowing', data);
        }

        gbks.events.call(gbks.event.GetUserFollowingStart, data);

        $.ajax({
            url: this.api.path + '/api/v2/users/'+data.userId+'/following',
            dataType: 'jsonp',
            data: data,
            success: $.proxy(this.onGetUserFollowingSuccess, this),
            error: $.proxy(this.onGetUserFollowingError, this)  
        });
    };

    this.onGetUserFollowingSuccess = function(data) {
        if(this.log) {
            console.log('UserApi.onGetUserFollowingSuccess', data);
        }

        gbks.events.call(gbks.event.GetUserFollowingSuccess, data.data);
    };

    this.onGetUserFollowingError = function(data) {
        if(this.log) {
            console.log('UserApi.onGetUserFollowingError', data);
        }

        gbks.events.call(gbks.event.GetUserFollowingError, data);
    };

    // Get user followers
  
    this.getUserFollowers = function(data) {
        if(this.log) {
            console.log('UserApi.getUserFollowers', data);
        }

        gbks.events.call(gbks.event.GetUserFollowersStart, data);

        $.ajax({
            url: this.api.path + '/api/v2/users/'+data.userId+'/followers',
            dataType: 'jsonp',
            data: data,
            success: $.proxy(this.onGetUserFollowersSuccess, this),
            error: $.proxy(this.onGetUserFollowersError, this)  
        });
    };

    this.onGetUserFollowersSuccess = function(data) {
        if(this.log) {
            console.log('UserApi.onGetUserFollowersSuccess', data);
        }

        gbks.events.call(gbks.event.GetUserFollowersSuccess, data.data);
    };

    this.onGetUserFollowersError = function(data) {
        if(this.log) {
            console.log('UserApi.onGetUserFollowersError', data);
        }

        gbks.events.call(gbks.event.GetUserFollowersError, data);
    };

    // Search users
  
    this.searchUsers = function(data) {
        if(this.log) {
            console.log('UserApi.searchUsers', data);
        }

        gbks.events.call(gbks.event.SearchUsersStart, data);

        $.ajax({
            url: this.api.path + '/autocomplete/users',
            data: {
                term: data.term
            },
            dataType: 'jsonp',
            success: $.proxy(this.onSearchUsersSuccess, this),
            error: $.proxy(this.onSearchUsersError, this)  
        });
    };

    this.onSearchUsersSuccess = function(data) {
        if(this.log) {
            console.log('UserApi.onSearchUsersSuccess', data);
        }

        gbks.events.call(gbks.event.SearchUsersSuccess, data);
    };

    this.onSearchUsersError = function(data) {
        if(this.log) {
            console.log('UserApi.onSearchUsersError', data);
        }

        gbks.events.call(gbks.event.SearchUsersError, data);
    };
  
};

var gbks = gbks || {};
gbks.common = gbks.common || {};

gbks.common.WookmarkApi = function() {
  
    this.init = function() {
        this.log = !false;
        this.path = 'http://www.wookmark.com';

        if (window.location.protocol == 'https:') {
            this.path = 'https://www.wookmark.com';
        }

        var host = window.location.hostname;
        this.isDev = (host == 'ono.local');

        this.user = new gbks.common.UserApi();
        this.user.init(this);

        this.image = new gbks.common.ImageApi();
        this.image.init(this);

        this.group = new gbks.common.GroupApi();
        this.group.init(this);

        this.source = new gbks.common.SourceApi();
        this.source.init(this);

        this.comment = new gbks.common.CommentApi();
        this.comment.init(this);

        this.categories = new gbks.common.CategoryApi();
        this.categories.init(this);
    };

    this.call = function(data) {
        if(this.isDev) {
            if(data.data) {
                data.data.requestmethod = data.type;
            }
            data.type = 'GET';
            data.dataType = 'jsonp';
        }

        if(this.log) {
            console.log('WookmarkApi.call', data);
        }

        $.ajax(data);   
    };

};

gbks.common.api = new gbks.common.WookmarkApi();
gbks.common.api.init(); 



// @codekit-prepend "general/_plugins.js"
// @codekit-prepend "general/_events.js"
// @codekit-prepend "general/_helpers.js"
// @codekit-prepend "general/_icons.js"
// @codekit-prepend "general/_render-helper.js"
// @codekit-prepend "general/_scroll-loader.js"
// @codekit-prepend "general/_time-formatter.js"
// @codekit-prepend "general/_permissions.js"
// @codekit-prepend "general/_window-dropper.js"

// @codekit-prepend "components/_avatar.js"
// @codekit-prepend "components/_contacts-dropdown.js"
// @codekit-prepend "components/_lightbox.js"
// @codekit-prepend "components/_nav.js"
// @codekit-prepend "components/_expandables.js"
// @codekit-prepend "components/_dropdowns.js"
// @codekit-prepend "components/_nav-search-overlay.js"
// @codekit-prepend "components/_user-groups-list.js"
// @codekit-prepend "components/_user-groups-list-renderer.js"
 
// @codekit-prepend "components/_group-grid.js"
// @codekit-prepend "components/_group-grid-item.js"
// @codekit-prepend "components/_grid-image.js"
 
// @codekit-prepend "components/_member-invite-list-friend.js"
// @codekit-prepend "components/_member-invite-list-invite-by-email.js"
// @codekit-prepend "components/_member-invite-list-contributor.js"
// @codekit-prepend "components/_member-invite-list-invite.js"
// @codekit-prepend "components/_member-invite-list.js"

// @codekit-prepend "components/buttons/_create-group.js"
// @codekit-prepend "components/buttons/_follow.js"
// @codekit-prepend "components/buttons/_like.js"
// @codekit-prepend "components/buttons/_save.js"
// @codekit-prepend "components/buttons/_share.js"

// @codekit-prepend "components/tiles/_grid.js"
// @codekit-prepend "components/tiles/_layout.js"
// @codekit-prepend "components/tiles/_image.js"

// @codekit-prepend "components/comments/_comment-list.js"
// @codekit-prepend "components/comments/_comment-list-item.js"
// @codekit-prepend "components/comments/_comment-form.js"

// @codekit-prepend "components/popups/_nav-more.js"
// @codekit-prepend "components/popups/_nav-groups.js"
// @codekit-prepend "components/popups/_nav-profile.js"
// @codekit-prepend "components/popups/_nav-create.js"
// @codekit-prepend "components/popups/_signup.js"
// @codekit-prepend "components/popups/_create-group.js"
// @codekit-prepend "components/popups/_save.js"
// @codekit-prepend "components/popups/_share.js"

// @codekit-prepend "components/pods/_colors.js"
// @codekit-prepend "components/pods/_comments.js"
// @codekit-prepend "components/pods/_finder.js"
// @codekit-prepend "components/pods/_groups.js"
// @codekit-prepend "components/pods/_image.js"
// @codekit-prepend "components/pods/_options.js"
// @codekit-prepend "components/pods/_secondary-options.js"
// @codekit-prepend "components/pods/_similar.js"
// @codekit-prepend "components/pods/_source.js"
// @codekit-prepend "components/pods/_tags.js"
// @codekit-prepend "components/pods/_stats.js"
 
// @codekit-prepend "components/info-blocks/_colors.js"

// @codekit-prepend "api/_category-api.js"
// @codekit-prepend "api/_comment-api.js"
// @codekit-prepend "api/_group-api.js"
// @codekit-prepend "api/_image-api.js"
// @codekit-prepend "api/_source-api.js"
// @codekit-prepend "api/_user-api.js"
// @codekit-prepend "api/_api.js"

var gbks = gbks || {};

gbks.Main = function() {
	
    this.init = function() {
        this.log = false;

        if(this.log) {
            console.log('Main.init');
        }

        // Fix icons fonts on Chrome/Windows.
        if(navigator.platform.indexOf('Mac') >= 0) {

        } else {
            var isChromium = window.chrome;
            var vendorName = window.navigator.vendor;
            if(isChromium !== null && isChromium !== undefined && vendorName === "Google Inc.") {
            // is Google chrome
            //$('html').addClass('use-svg-font');
            } else { 
            // not Google chrome 
            }
        }

        this.updateCookie();

        gbks.common.updateRetinaImages();

        this.dropdowns = new gbks.common.Dropdowns();
        this.dropdowns.init();

        this.expandables = new gbks.common.Expandables();
        this.expandables.init();

        // this.comments = new gbks.CommentList();
        // this.comments.init();

        // Buttons.

        this.followButtons = new gbks.FollowButtons();
        this.followButtons.init();

        this.likeButtons = new gbks.LikeButtons();
        this.likeButtons.init();

        this.saveButtons = new gbks.SaveButtons();
        this.saveButtons.init();

        this.shareButtons = new gbks.ShareButtons();
        this.shareButtons.init();

        this.createGroupButtons = new gbks.CreateGroupButtons();
        this.createGroupButtons.init();

        this.lightbox = new gbks.common.Lightbox();
        this.lightbox.init();

        // Popups.
        
        this.createGroupPopup = new gbks.common.CreateGroupPopup();
        this.createGroupPopup.init();

        this.savePopup = new gbks.common.SavePopup();
        this.savePopup.init();

        this.sharePopup = new gbks.common.SharePopup();
        this.sharePopup.init();

        // Page-specific modules.

        this.initModules();

        // Track pixel density.
        setTimeout($.proxy(this.trackPixelDensity, this), 100);

        this.resizeTimer = null;
        $(window).resize($.proxy(this.onWindowResize, this));

        this.manageGlobalMessages();

        // Remove 300ms delay on touch devices.
        // new FastClick(document.body);

        this.setupSkinnyBorders();
    };

    this.setupSkinnyBorders = function() {
        if(window.devicePixelRatio && devicePixelRatio >= 2) {
            var testElem = document.createElement('div');
            testElem.style.border = '.5px solid transparent';
            document.body.appendChild(testElem);
            if(testElem.offsetHeight == 1) {
                $('html').addClass('hairlines');
            }
            document.body.removeChild(testElem);
        }
    };

    this.onWindowResize = function(event) {
        clearTimeout(this.resizeTimer);
        this.resizeTimer = setTimeout($.proxy(this.resize, this), 50);
    };

    this.resize = function(event) {
        var i=0, length=this.modules.length, module;
        for(; i<length; i++) {
            module = this.modules[i];

            if(module.resize) {
                module.resize();
            }
        }

        // if(gbks.common && gbks.common.lightboxInstance) {
        //     gbks.common.lightboxInstance.resize();
        // }
    };

    // Initialize all modules that have registered itself.
    this.initModules = function() {
        var names = [];
        var i = 0, length = gbks.modules.length, module, instance, canvas;
        this.modules = [];
        for(; i<length; i++) {
            module = gbks.modules[i];

            if(names.indexOf(module.name) === -1) {
                canvas = $(module.canvas);
                names.push(module.name);

                if(canvas.length > 0) {
                    instance = new module.class();
                    instance.name = module.name;
                    instance.canvas = canvas;
                    instance.init();
                    this.modules.push(instance);
                }
            }
        }

        console.log('Main.initModules', names.join(','));
    };

    // Track pixel ratio with Google Analytics.
    this.trackPixelDensity = function(event) {
        var pixelRatio = (!!window.devicePixelRatio ? window.devicePixelRatio : 1);
        if(pixelRatio > 1) {
            var w = $(window);
            var p = w.width()+'x'+w.height();
            gbks.common.track('Info', 'dpr'+pixelRatio, p);
        }
    };

    this.updateCookie = function() {
        // Save pixel ratio in cookie.
        var pixelRatio = (!!window.devicePixelRatio ? window.devicePixelRatio : 1);
        gbks.common.Cookie('devicePixelRatio', pixelRatio, {path: '/'});

        // Save screen width in cookie.
        gbks.common.Cookie('viewport', $(window).width(), {path: '/'});
    };

    // Manage hiding of messages and state storage in a cookie.
    this.manageGlobalMessages = function() {
        this.globalMessage = $('#globalMessage');
        if(this.globalMessage.length > 0) {
            var id = this.globalMessage.attr('id');

            $(".close", this.globalMessage).click($.proxy(this.onClickCloseGlobalMessage, this));

            var state = gbks.common.Cookie('message_'+id);
            if(state == 'hide') {
                this.globalMessage.hide();
            };
        }
    };

    this.onClickCloseGlobalMessage = function(event) {
        event.preventDefault();
        event.stopPropagation();

        this.globalMessage.hide();

        gbks.common.Cookie('message_'+id, 'hide', {path: '/'});
    };
	
};

$(document).ready(function() {
    if(!gbks.mainInstance) {
        gbks.mainInstance = new gbks.Main();
        gbks.mainInstance.init();
    }
});

