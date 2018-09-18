
import { Symbolizer } from './Symbolizer.js'
import { PolyBase } from './Symbolizer.PolyBase.js'
import { PolylineTextPath } from './plugins/leaflet.textpath.js'

// 🍂class LineSymbolizer
// 🍂inherits Polyline
// A symbolizer for lines. Can be applied to line and polygon features.

export var LineSymbolizer = L.Polyline.extend({
	includes: [Symbolizer.prototype, PolyBase, PolylineTextPath],

	initialize: function(feature, pxPerExtent) {
		this.properties = feature.properties;
		this._makeFeatureParts(feature, pxPerExtent);
	},

	render: function(renderer, style) {
		style.fill = false;
		Symbolizer.prototype.render.call(this, renderer, style);
		// TODO check type renderer._container. must be SVG
		if (this.setText && style.TextPath) {
			this.setText(style.TextPath.text, style.TextPath.options, renderer._container)
		}
		this._updatePath();
	},

	updateStyle: function(renderer, style) {
		style.fill = false;
		Symbolizer.prototype.updateStyle.call(this, renderer, style);
	},
});

