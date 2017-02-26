var nav = document.getElementsByTagName('nav')[0];
var i;

for(i = 0; i < nav.querySelectorAll('a').length; i++) {
	if(nav.querySelectorAll('a')[i].getAttribute('href') === '/' + location.pathname.split("/")[1]) {
		nav.querySelectorAll('a')[i].classList.add('active');
	}
}