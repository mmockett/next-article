(function () {

    window.addEventListener("load", function () {
        
        var $ = function (selector) {
            return [].slice.call(document.querySelectorAll(selector));
        };

        $('.js-more-on').forEach(function (el) {
            reqwest('/more-on/ ' + el.getAttribute('data-article-id'))
		        .then(function (resp) {
                    el.innerHTML = resp;
                    if (window.Origami) {
                        window.Origami['o-date'].init(el);
                    }
                }, function() {
                    el.parentNode.removeChild(el);
                });
        });

    }, false);

})();
