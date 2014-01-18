
;(function(){

	var K = this.KineticCSS = function(layer, url){
		var t = this;
		t.layer = layer;
		t.url = url;
		t.load();
		return t;
	};

	K.prototype.properties = {
		width: {
			parse: function(node, value){
				return parseInt(value);
			},
			render: function(node, value){
				node.setWidth(value);
			}
		},
		height: {
			parse: function(node, value){
				return parseInt(value);
			},
			render: function(node, value){
				node.setHeight(value);
			}
		},
		top: {
			parse: function(node, value){
				return parseInt(value);
			},
			render: function(node, value){
				node.setY(value);
			}
		},
		left: {
			parse: function(node, value){
				return parseInt(value);
			},
			render: function(node, value){
				node.setX(value);
			}
		},
		opacity: {
			parse: function(node, value){
				return parseFloat(value);
			},
			render: function(node, value){
				node.setOpacity(value);
			}
		},
		display: {
			parse: function(node, value){
				return value !== 'none';
			},
			render: function(node, value){
				node.setVisible(value);
			}
		},
		backgroundImage: {
			parse: function(node, value){
				return value.replace(/"/g, '').replace(')', '').replace('url(', '');
			},
			render: function(node, value){
				var t = this,
					img = new Image();
				img.onload = function(){
					node.setFillPatternImage(img);
					t.layer.draw();
				};
				img.src = value;
			}
		},
		backgroundRepeat: {
			parse: function(node, value){
				return value;
			},
			render: function(node, value){
				node.setFillPatternRepeat(value);
			}
		},
		backgroundColor: {
			parse: function(node, value){
				return value.replace(' ', '');
			},
			render: function(node, value){
				node.setFill(value);
			}
		},
		borderColor: {
			parse: function(node, value){
				return value.replace(' ', '');
			},
			render: function(node, value){
				node.setStroke(value);
			}
		},
		borderWidth: {
			parse: function(node, value){
				return parseInt(value);
			},
			render: function(node, value){
				node.setStrokeWidth(value);
			}
		}
	};

	K.prototype.propertyAliases = {
		borderTopWidth: 'borderWidth',
		borderRightWidth: 'borderWidth',
		borderBottomWidth: 'borderWidth',
		borderLeftWidth: 'borderWidth',
		borderTopColor: 'borderColor',
		borderRightColor: 'borderColor',
		borderBottomColor: 'borderColor',
		borderLeftColor: 'borderColor',
		backgroundRepeatX: 'backgroundRepeat',
		backgroundRepeatY: 'backgroundRepeat'
	};

	K.prototype.getCamelCasedProperty = function(property){ 
		return property.toLowerCase().replace(/-(.)/g, function(match, group1) {
			return group1.toUpperCase();
		});
	},

	K.prototype.load = function(){
		var t = this,
			head = document.getElementsByTagName('head')[0],
			link = document.createElement('link'),
			sheet = 'sheet',
			cssRules = 'cssRules',
			loader,
			canceller;
		link.setAttribute('rel', 'stylesheet');
		link.setAttribute('type', 'text/css');
		link.setAttribute('href', t.url);
		if(!('sheet' in link)){
			sheet = 'styleSheet';
			cssRules = 'rules';
		}
		loader = setInterval(function(){
			try {
				if(link[sheet] && link[sheet][cssRules].length){
					clearInterval(loader);
					clearTimeout(canceller);
					t.parse(link[sheet][cssRules]);
					head.removeChild(link);
				}
			} catch( e ) {} finally {}
		}, 1000);
		canceller = setTimeout(function() {
			clearInterval(loader);
			clearTimeout(canceller);
			head.removeChild(link);
			alert('Unable to load stylesheet');
		}, 15000);
		head.appendChild(link);
		return t;
	};

	K.prototype.parse = function(rules){
		var t = this;
		console.log(rules);
		for(var i=0; i<rules.length; i++){
			var rule = rules[i],
				selector = rule.selectorText;
			if(
				selector.charAt(0) !== '#'
				&& selector.charAt(0) !== '.'
			){
				selector = selector.charAt(0).toUpperCase() + selector.slice(1);
			}
			for(var j=0; j<rule.style.length; j++){
				var srcProperty = t.getCamelCasedProperty(rule.style[j]),
					property = t.propertyAliases[srcProperty] ? t.propertyAliases[srcProperty] : srcProperty,
					formatter = t.properties[property],
					nodes = t.layer.find(selector);
				/*
				console.log({
					style: rule.style,
					srcProperty: srcProperty,
					property: property,
					formatter: formatter,
					nodes: nodes
				});
				*/
				if(formatter && nodes.length){
					for(var k=0; k<nodes.length; k++){
						var node = nodes[k],
							style = rule.style[property],
							valueParser = formatter.parse.bind(t),
							renderer = formatter.render.bind(t),
							value = valueParser(node, style);
						renderer(node, value);
					}
				}
			}
		}
		t.layer.draw();
		return t;
	};

})();