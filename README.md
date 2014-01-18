KineticJS CSS
=============

Apply CSS styles to a KineticJS canvas element from an externat stylesheet.

Suported CSS properties
-----------------------

### width

```CSS
#node {
	width: 100px;	// node.setWidth(100);
	width: 100em;	// node.setWidth(100);
	width: 100pt;	// node.setWidth(100);
	width: 100%;	// node.setWidth(100);
}
```

### height

	```CSS
	#node {
		height: 100px;	// node.setHeight(100);
		height: 100em;	// node.setHeight(100);
		height: 100pt;	// node.setHeight(100);
		height: 100%;	// node.setHeight(100);
	}
	```

### top

	```CSS
	#node {
		top: 100px;		// node.setY(100);
		top: 100em;		// node.setY(100);
		top: 100pt;		// node.setY(100);
		top: 100%;		// node.setY(100);
	}
	```

### left

	```CSS
	#node {
		left: 100px;	// node.setX(100);
		left: 100em;	// node.setX(100);
		left: 100pt;	// node.setX(100);
		left: 100%;		// node.setX(100);
	}
	```

### opacity

	```CSS
	#node {
		opacity: 0.5;	// node.setOpacity(0.5);
	}
	```

### display

	```CSS
	#node {
		display: block;			// node.setVisible(true);
		display: inline;		// node.setVisible(true);
		display: inline-block;	// node.setVisible(true);
		display: table;			// node.setVisible(true);
		display: table-cell;	// node.setVisible(true);
		display: list-item;		// node.setVisible(true);
		display: none;			// node.setVisible(false);
	}
	```

### backgroundImage

	```CSS
	#node {
		background-image: url(image.png);	// node.setFillPatternImage(image.png);
	}
	```

### backgroundRepeat

	```CSS
	#node {
		background-repeat: repeat;		// node.setFillPatternRepeat('repeat');
		background-repeat: no-repeat;	// node.setFillPatternRepeat('no-repeat');
		background-repeat: repeat-x;	// node.setFillPatternRepeat('repeat-x');
		background-repeat: repeat-y;	// node.setFillPatternRepeat('repeat-y');
	}
	```

### backgroundColor
### borderColor
### borderWidth

Suported CSS selectors
-----------------------

### Ids
### Classes
### Node types

