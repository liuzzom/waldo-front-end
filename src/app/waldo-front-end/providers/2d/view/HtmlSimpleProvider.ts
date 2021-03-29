import {Provider} from "../../../domain-model/Provider";
import {Model} from "../../../domain-model/Model";
import {ResizeObserver} from "resize-observer";

export class HtmlSimpleProvider implements Provider{
  id: string;
  name: string;
  providerFeatures: string[];
  renderingEngine: string;

  constructor(info: Provider) {
    this.id = info.id;
    this.name = info.name;
    this.providerFeatures = info.providerFeatures;
    this.renderingEngine = info.renderingEngine;
  }

  renderModel(model: Model) {
    const renderingArea = document.getElementById('rendering-area');
    renderingArea.innerHTML = `
    <img src="${model.sources[0]}" alt="${model.name}" width="${renderingArea.clientWidth}" height="${renderingArea.clientHeight}" />
    `;

    const ro = new ResizeObserver(() => {
      renderingArea.innerHTML = `
        <img src="${model.sources[0]}" alt="${model.name}" width="${renderingArea.clientWidth}" height="${renderingArea.clientHeight}" />
      `;
    });
    ro.observe(renderingArea);
  }
}
