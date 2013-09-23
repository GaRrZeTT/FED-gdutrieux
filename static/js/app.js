var APP = APP || {};
//De variable APP is gelijk aan een object APP of een leeg Object.

//namespace is een nieuw object die ervoor zorgt dat je geen conflicten voororrzaakt door je code af te schermen van de rest

(function () {
	//Dit is een naamloze functie, tussen je haakjes zet je argumenten
	// Data objecten
	APP.page1 = {
	//Dit is een Json object, binnen de namespace APP
		title:'Pagina 1',
		description:'Pagina 1 is de eerste pagina',
		items: [
			{
				title: 'Item 1',
				description: 'Item 1 is het eerste item'
			}, {
				title: 'Item 2',
				description: 'Item 2 is het tweede item'
			}, {
				title: 'Item 3',
				description: 'Item 3 is het derde item'
			}, {
				title: 'Item 4',
				description: 'Item 4 is het vierde item'
			}
		]
	};

	APP.page2 = {
	//Dit is ook een object in APP
		title:'Pagina 2',
		description:'Pagina 2 is de tweede pagina'
	};

	APP.page3 = {
	//Dit is ook een object in app
		title:'Pagina 3',
		description:'Pagina 3 is de derde pagina'
	};
	
	// Controller Init
	//App.controller wordt aangemaakt initiliased the function app.router.init
	APP.controller = {
		//DE init function die in app.controller zit, voert app.routred.init uit
		init: function () {
			// Initialize router
			APP.router.init();
		}
	};

	// Router
	APP.router = {
		init: function () {
			//Hier roepen we routie aan, het is altijd page 1,2 of 3. Dus render een pagina met als string pag 1 erbij
			// Als page 1 in de URL voeren deze functie uit en je voert dan gelijk de render function uit.
	  		routie({
			    '/page1': function() {
			    	APP.page.render('page1');
				},
			    '/page2': function() {
			    	APP.page.render('page2');
			    },

			    '/page3': function() {
			    	APP.page.render('page3');
			    },
			    '*': function() {
			    	APP.page.render('page1');
			    }
			});
		},

		change: function () {

			//Window is je browser window, location is je URL, hash is hashtag je numieriek teken, 

            var route = window.location.hash.slice(2),
                sections = qwery('section'),
                section = qwery('[data-route=' + route + ']')[0];

            // Show active section, hide all other
            //als section bestaat, voer dan de rest uit
            if (section) {
            	//we maken een for loop aan, vervolgens loopt het de sections af
            	//voor elke instantie dat i kleiner is dan het aantal sections gaan we die specifieke sections.
            	//daar halen we de klasse active van weg

            	for (var i=0; i < sections.length; i++){
            		sections[i].classList.remove('active');
            	}
            	section.classList.add('active');
            }

            // Default route
            //als je route 
            if (!route) {
            	sections[0].classList.add('active');
            }

		}
	};

	// Pages
	APP.page = {
		render: function (route) {
			// http://javascriptweblog.wordpress.com/2010/04/19/how-evil-is-eval/
			var data = eval('APP.'+route);
			//eval gebruik je als je objecten wilt ophalen in dit geval

			Transparency.render(qwery('[data-route='+route+']')[0], data);
			APP.router.change();
		}
	}
	// DOM ready
	//het start app.controller.init helemaal boven
	domready(function () {
		// Kickstart application
		APP.controller.init();
	});
	
})();