/* global fetch */
'use strict';

var fetchres = require('fetchres');

var numberOfArticles = 1;
var lastArticleUID;
var articleUIDS = [];
var breakpoints = [0];
var articleIsLoading = false;
var currentArticleUid;
var updateUrlThrottled;

function throttle(func, time){
	var callable = true;
	return function(){
		var args = [].slice.call(arguments);
		if(callable){
			callable = false;
			func.apply(null, args);
			setTimeout(function(){
				callable = true;
			}, time);
		}
	};
}

function extractArticleUid(article){
	return article.getAttribute('data-capi-id');
}

function updateUrl(scroll){
	for(var i= 0, l=breakpoints.length; i<l; i++){
		if(
			scroll > breakpoints[i] &&
			(i === (l-1) || scroll < breakpoints[i+1]) &&
			articleUIDS[i] !== currentArticleUid
		){
			var uid = articleUIDS[i];
			history.replaceState({uid: uid}, '', '/' + uid);
			currentArticleUid = uid;
			break;
		}
	}

}

function extractArticleHTML(html){
	var div = document.createElement('div');
	var fragment = document.createDocumentFragment();
	div.innerHTML = html;
	fragment.appendChild(div.querySelector('article'));
	var survey = document.querySelector('.alpha-survey__container');
	var optout = document.querySelector('.opt-out');
	if(survey){
		fragment.appendChild(survey.cloneNode(true));
	}

	if(optout){
		fragment.appendChild(optout.cloneNode(true));
	}

	return fragment;
}

function loadArticle(){
	if(articleIsLoading){
		return;
	}

	articleIsLoading = true;
	fetch('/' + lastArticleUID + '/next-article')
		.then(fetchres.text)
		.then(function(response){
			articleIsLoading = false;
			if(!response){
				return;
			}

			var article = extractArticleHTML(response);
			var uid = extractArticleUid(article.childNodes[0]);
			document.body.insertBefore(article, document.querySelector('body script:last-child'));
			breakpoints.push(topOfLastArticle());
			numberOfArticles++;
			articleUIDS.push(uid);
			lastArticleUID = uid;

		})
		.catch(function(err){
			articleIsLoading = false;
			throw err;
		});
}

function heightOfLastArticle(){
	return document.querySelector('article:last-of-type').offsetHeight;
}

function topOfLastArticle(){
	return document.querySelector('article:last-of-type').offsetTop;
}

function distanceFromBottomOfPage(){
	return document.body.offsetHeight - window.scrollY;
}

function onScroll(){
	var distance = distanceFromBottomOfPage();
	var height = heightOfLastArticle();
	var loadTriggerPoint = (height / 10) * 8;
	if(distance <= loadTriggerPoint && !articleIsLoading){
		loadArticle();
	}

	updateUrlThrottled(window.scrollY);
}


function init(){
	window.scrollTo(0,0);
	lastArticleUID = extractArticleUid(document.querySelector('article'));
	currentArticleUid = lastArticleUID;
	articleUIDS.push(lastArticleUID);
	updateUrlThrottled = throttle(updateUrl, 500);
	window.addEventListener('scroll', onScroll);
}


module.exports = {
	init : init
};
