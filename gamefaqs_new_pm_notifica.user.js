// ==UserScript==
// @name            GameFAQs New PM Notification
// @namespace       OTACON120
// @author          OTACON120
// @version         1.1.2
// @description     Displays a notification when there are unread PMs on GameFAQs
// @updateURL       http://otacon120.com/user-script-files/meta/gamefaqs-related/new-pm-notification/
// @downloadURL     http://otacon120.com/user-script-files/script/gamefaqs-related/new-pm-notification/gamefaqs_new_pm_notifica.user.js
// @website         http://otacon120.com/user-scripts/gamefaqs-related/new-pm-notification/
// @contributionURL https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=otacon120%40gmail%2ecom&lc=US&item_name=OTACON120&no_note=0&cn=Comments%3a&no_shipping=1&currency_code=USD&bn=PP%2dDonationsBF%3abtn_donate_LG%2egif%3aNonHosted
// @match           *://*.gamefaqs.com/*
// @grant           none
// ==/UserScript==

var	i, unreadPMs, unreadPMNote, notifContent, alertDismiss, dismissIcon, plural, pronoun,
	userLinks = document.getElementsByClassName( 'welcome' )[0].parentNode.getElementsByTagName( 'a' ),
	mantleSkin = document.getElementById( 'mantle_skin' );

for ( i = 0; i < userLinks.length; i++ ) {
	if ( userLinks[i].textContent.indexOf( 'Inbox' ) !== -1 && userLinks[ i ].textContent.indexOf( '(' ) !== -1 ) {
		unreadPMs = parseInt( userLinks[ i ].textContent.split( ' ', 2 )[1].replace( /\(([\d]*)\)/, '$1' ) );

		if ( unreadPMs > 1 ) {
			plural  = 's';
			pronoun = 'them';
		} else {
			plural  = '';
			pronoun = 'it';
		}
	}
}

if ( unreadPMs > 0 ) {
	notifContent           = document.createElement( 'span' );
	notifContent.id        = 'pm-notification-content';
	notifContent.innerHTML = 'You have ' + unreadPMs + ' unread private message' + plural + '. Please <a href="/pm/" style="text-decoration: underline;">read ' + pronoun + '</a> at your earliest convenience.';

	alertDismiss           = document.createElement( 'div' );
	alertDismiss.className = 'site_alert_dismiss';

	dismissIcon           = document.createElement( 'a' );
	dismissIcon.className = 'icon icon-remove';
	dismissIcon.onclick   = function() {
		unreadPMNote.parentNode.removeChild( unreadPMNote );
	}
	dismissIcon.style     = 'cursor: pointer;';
	dismissIcon.innerHTML = 'hide';

	alertDismiss.appendChild( dismissIcon );

	unreadPMNote    = document.createElement( 'div' );
	unreadPMNote.id = 'site_alert';
	unreadPMNote.className = 'site_alert_severe new-pm-notification';

	unreadPMNote.appendChild( notifContent );
	unreadPMNote.appendChild( alertDismiss );

	mantleSkin.parentNode.insertBefore(unreadPMNote, mantleSkin);
}
