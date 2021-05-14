import {Provider} from "../../../domain-model/Provider";
import {Model} from "../../../domain-model/Model";
import * as L from 'leaflet';
import {v4 as uuidv4} from 'uuid';
import {PointersService} from "../../../services/pointers.service";
import {Pointer} from "../../../domain-model/Pointer";

// Define the pointer icon
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

  // state variables used to manage pointers into the map
  public pointerTrigger: boolean = false;
  public selectedPointerId: string = null;
  private pointersService: PointersService;

  // ----- Constructor ----- \\
  constructor(info: Provider) {
    this.id = info.id;
    this.name = info.name;
    this.providerFeatures = info.providerFeatures;
    this.renderingEngine = info.renderingEngine;
    this.selectedPointerId = null;
  }

  // ----- Method ----- \\
  public setPointerService(service: PointersService){
    this.pointersService = service;
  }

  public setPointerTrigger(value: boolean) {
    this.pointerTrigger = value;
  }

  // ----- Handlers ----- \\

  // Map Click Handler
  onMapClick(event, model: Model){
    document.getElementById('pointer-header').innerHTML = `<b>Pointer Message</b>`;
    document.getElementById('pointer-message-edit').innerText = '';
    document.getElementById('pointer-message').innerText = 'Click on a pointer';
    this.selectedPointerId = null;
    
    // Get click position
    const lat = event.latlng["lat"];
    const lng = event.latlng["lng"];

    if(!this.pointerTrigger){
      // trigger is not active
      return;
    }

    if((lat >= this.mapBounds[0][0] && lat <= this.mapBounds[1][0]) && (lng >= this.mapBounds[0][1] && lng <= this.mapBounds[1][1])){
      // valid point
      const pointer = L.latLng([lat, lng]);

      // Prepare data for new Pointer
      const id: string = uuidv4();
      const position: number[] = [pointer.lat, pointer.lng];
      const message: string = "";
      const uploaded: string = new Date().toJSON();
      const lastModified: string = uploaded;
      const modelId: string = model.id;

      // create an object that is compliant with the Pointer interface
      let newPointer: Pointer = {
        id: id,
        name: 'Pointer name',
        position: position,
        message: message,
        uploaded: uploaded,
        lastModified: lastModified,
        modelId: modelId
      }

      // save pointer into the back-end
      this.pointersService.loadPointer(newPointer).subscribe((pointer) => {
        this.showPointer(pointer); // add the pointer into the map
        this.setPointerTrigger(false);
      });
      return;
    }

    // invalid point
    return;
  }

  // Pointer Click Handler
  showPointerMessage(pointer: Pointer){
    this.selectedPointerId = pointer.id;
    const defaultMessage = "This pointer has no message yet";

    document.getElementById('pointer-header').innerHTML = `<b>${pointer.name}</b>`;

    if(!pointer.message){
      document.getElementById('pointer-message-edit').innerText = `${defaultMessage}`;
      document.getElementById('pointer-message').innerText = `${defaultMessage}`;
    } else {
      document.getElementById('pointer-message-edit').innerText = `${pointer.message}`;
      document.getElementById('pointer-message').innerText = `${pointer.message}`;
    }
  }

  // ----- Visual Methods ----- \\
  showPointer(pointer: Pointer){
    const position = L.latLng(pointer.position);
    // show the pointer and register the click handler
    let marker = L.marker(position).addTo(this.map).on('click', () => this.showPointerMessage(pointer));

    if (!pointer.message){
      marker.bindPopup(`This pointer has no message yet`);
    } else {
      marker.bindPopup(`${pointer.message}`);
    }
  }

  renderModel(model: Model) {
    // get image size...used for set the bounds
    const modelWidth = model.metadata.width;
    const modelHeight = model.metadata.height;

    const renderingArea = document.getElementById('rendering-area');
    renderingArea.innerHTML = `<div id="map" style="height: 100%;"></div>`

    // initialize the map
    this.map = L.map('map', {
      crs: L.CRS.Simple,
      minZoom: -5
    });

    // set the bounds and add image to the map
    this.mapBounds = [[0,0], [modelHeight, modelWidth]];
    L.imageOverlay(model.sources[0], this.mapBounds).addTo(this.map);

    // fit bounds and set view
    this.map.fitBounds(this.mapBounds);
    this.map.setView( [modelHeight/2, modelWidth/2], -1);

    // get pointers from back-end and render them
    this.pointersService.getPointersByModelId(model.id).subscribe(pointers => {
      for(let pointer of pointers){
        this.showPointer(pointer);
      }
    });

    // register the click handler
    this.map.on('click', (event) => this.onMapClick(event, model));
  }
}
