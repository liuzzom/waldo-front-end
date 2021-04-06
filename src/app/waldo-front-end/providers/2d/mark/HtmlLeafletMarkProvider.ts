import {Provider} from "../../../domain-model/Provider";
import {Model} from "../../../domain-model/Model";
import * as L from 'leaflet';

export class HtmlLeafletMarkProvider implements Provider{
  id: string;
  name: string;
  providerFeatures: string[];
  renderingEngine: string;
  private map;

  constructor(info: Provider) {
    this.id = info.id;
    this.name = info.name;
    this.providerFeatures = info.providerFeatures;
    this.renderingEngine = info.renderingEngine;
  }

  yx = L.latLng;

  xy(x, y) {
    if (L.Util.isArray(x)) {    // When doing xy([x, y]);
      return this.yx(x[1], x[0]);
    }
    return this.yx(y, x);  // When doing xy(x, y);
  };

  async renderModel(model: Model) {
    const modelWidth = model.metadata.width;
    const modelHeight = model.metadata.height;

    const renderingArea = document.getElementById('rendering-area');
    renderingArea.innerHTML = `<div id="map" style="height: 100%;"></div>`

    this.map = L.map('map', {
      crs: L.CRS.Simple,
      minZoom: -5
    });

    let bounds = [[0,0], [modelHeight, modelWidth]];
    L.imageOverlay(model.sources[0], bounds).addTo(this.map);

    this.map.fitBounds(bounds, {padding: [20, 20]});
    this.map.setView( [modelHeight/2, modelWidth/2], -1);
  }
}
