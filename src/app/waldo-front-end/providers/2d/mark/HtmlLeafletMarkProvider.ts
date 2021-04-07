import {Provider} from "../../../domain-model/Provider";
import {Model} from "../../../domain-model/Model";
import * as L from 'leaflet';
import {v4 as uuidv4} from 'uuid';
import {PointersService} from "../../../services/pointers.service";
import {Pointer} from "../../../domain-model/Pointer";

// Define the icon
const iconRetinaUrl = 'assets/marker-icon-2x.png';
const iconUrl = 'assets/marker-icon.png';
const shadowUrl = 'assets/marker-shadow.png';
const iconDefault = L.icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});
L.Marker.prototype.options.icon = iconDefault;

export class HtmlLeafletMarkProvider implements Provider{
  id: string;
  name: string;
  providerFeatures: string[];
  renderingEngine: string;

  private map;
  private mapBounds;
  // state variable used to add into the map
  public pointerTrigger: boolean = false;
  private pointersService: PointersService;

  constructor(info: Provider) {
    this.id = info.id;
    this.name = info.name;
    this.providerFeatures = info.providerFeatures;
    this.renderingEngine = info.renderingEngine;
  }

  public setPointerService(service: PointersService){
    this.pointersService = service;
  }

  onMapClick(event, model: Model){
    const lat = event.latlng["lat"];
    const lng = event.latlng["lng"];

    if(!this.pointerTrigger){
      // trigger is not active
      return;
    }

    if((lat >= this.mapBounds[0][0] && lat <= this.mapBounds[1][0]) && (lng >= this.mapBounds[0][1] && lng <= this.mapBounds[1][1])){
      // valid point
      const pointer = L.latLng([lat, lng]);
      let newMarker = L.marker(pointer).addTo(this.map); // TODO: vedere se è possibile inserire un listener per il marker


      // Prepare data for new Pointer
      const id: string = uuidv4();
      const position: number[] = [newMarker._latlng['lat'], newMarker._latlng['lng']];
      const message: string = "";
      const uploaded: string = new Date().toJSON();
      const lastModified: string = uploaded;
      const modelId: string = model.id;

      // create an object that is compliant with the Pointer interface
      let newPointer: Pointer = {
        id: id,
        position: position,
        message: message,
        uploaded: uploaded,
        lastModified: lastModified,
        modelId: modelId
      }

      // save pointer into the back-end
      this.pointersService.loadPointer(newPointer).subscribe(() => console.log('pointer loaded'));

      return;
    }

    // invalid point
    return;
  }

  renderModel(model: Model) {
    const modelWidth = model.metadata.width;
    const modelHeight = model.metadata.height;

    const renderingArea = document.getElementById('rendering-area');
    renderingArea.innerHTML = `<div id="map" style="height: 100%;"></div>`

    this.map = L.map('map', {
      crs: L.CRS.Simple,
      minZoom: -5
    });

    this.mapBounds = [[0,0], [modelHeight, modelWidth]];
    L.imageOverlay(model.sources[0], this.mapBounds).addTo(this.map);

    this.map.fitBounds(this.mapBounds);
    this.map.setView( [modelHeight/2, modelWidth/2], -1);

    // TODO: get pointers from back-end and render them

    this.map.on('click', (event) => this.onMapClick(event, model));
  }
}
