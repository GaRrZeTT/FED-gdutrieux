var APP = APP || {};
//De variable APP is gelijk aan een object APP of een leeg Object.

//namespace is een nieuw object die ervoor zorgt dat je geen conflicten voororrzaakt door je code af te schermen van de rest

(function () {
	//Dit is een naamloze functie, tussen je haakjes zet je argumenten
	// Data objecten
	APP.schedule = {
	//Dit is een Json object, binnen de namespace APP
		title:'Schedule',
		description:'Schematisch overzicht',
		items: [
			{
				thuis: 'Raiders',
				uit: 'Panthers',
				datum: '21-10-2013'
			},
			{
				thuis: 'Panthers',
				uit: 'Lions',
				datum: '27-10-2013'
			},
			{
				thuis: 'Lions',
				uit: 'Catfish',
				datum: '30-10-2013'
			},
			{
				thuis: 'Castfish',
				uit: 'Monkeys',
				datum: '3-11-2013'
			},
			{
				thuis: 'Monkeys',
				uit: 'Raiders',
				datum: '7-11-2013'
			}
		]
	};

	APP.game = {
	//Dit is ook een object in APP
		title:'Game',
		description:'Overzicht punten en fouten',
		items: [
			{
				team: 'Raiders',
				points: '280',
				fouten: '16',
				freethrows: '12'
			},
			{
				team: 'Panthers',
				points: '200',
				fouten: '16',
				freethrows: '12'
			},
			{
				team: 'Lions',
				points: '180',
				fouten: '10',
				freethrows: '1'
			},
			{
				team: 'Monkeys',
				points: '180',
				fouten: '0',
				freethrows: '5'
			},
			{
				team: 'Catfish',
				points: '100',
				fouten: '16',
				freethrows: '9'
			}
		]
	};

	APP.ranking = {
	//Dit is ook een object in app
		title:'Ranking',
		description:'Overzicht standen',
		items: [
			{
				nummer: '1',
				team: 'Raiders',
				punten: '12 punten'
			},
			{
				nummer: '2',
				team: 'Panthers',
				punten: '9 punten'
			},
			{
				nummer: '3',
				team: 'Lions',
				punten: '4 punten'
			},
			{
				nummer: '4',
				team: 'Monkeys',
				punten: '4 punten'
			},
			{
				nummer: '5',
				team: 'Catfish',
				punten: '0 punten'
			}
		]
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
			    '/schedule': function() {
			    	APP.page.render('schedule');
				},
			    '/game': function() {
			    	APP.page.render('game');
			    },

			    '/ranking': function() {
			    	APP.page.render('ranking');
			    },
			    '*': function() {
			    	APP.page.render('schedule');
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