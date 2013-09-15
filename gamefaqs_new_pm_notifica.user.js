// ==UserScript==
// @name           GameFAQs New PM Notification
// @namespace      OTACON120
// @version        1.0.3
// @description    Displays a notification when there are unread PMs on GameFAQs
// @updateURL      http://userscripts.org/scripts/source/116444.meta.js
// @downloadURL    http://userscripts.org/scripts/source/116444.user.js
// @website        http://otacon120.com/user-scripts/gamefaqs-related/new-pm-notification/
// @include        http://*.gamefaqs.com/boards*
// @match          http://*.gamefaqs.com/boards*
// ==/UserScript==

var userLinks = document.getElementsByClassName('masthead_strip')[0].getElementsByClassName('masthead_user')[0].getElementsByTagName('a'),
	unreadPMs,
	unreadPMNote,
	parentDiv = document.getElementById('content'),
	contentFirstChild = parentDiv.firstChild,
	i;

for (i = 0; i < userLinks.length; i++) {
	if (userLinks[i].textContent.indexOf('Inbox') !== -1 && userLinks[i].textContent.indexOf('(') !== -1) {
		unreadPMs = parseInt( userLinks[i].textContent.split(' ', 2)[1].replace(/\(([\d]*)\)/, '$1') );
	}
}

if (unreadPMs > 0) {
	unreadPMNote = document.createElement('p');
	unreadPMNote.className = 'gamefox-usernote';
	unreadPMNote.innerHTML = 'You have ' + unreadPMs + ' unread private message' + (unreadPMs > 1 ? 's' : '') + '. Please <a href="/pm/">read ' + (unreadPMs > 1 ? 'them' : 'it') + '</a> at your earliest convenience.';
	parentDiv.insertBefore(unreadPMNote, contentFirstChild);
}
