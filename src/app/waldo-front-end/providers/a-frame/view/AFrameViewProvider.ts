import {Provider} from "../../../domain-model/Provider";
import {Model} from "../../../domain-model/Model";

export class AFrameViewProvider implements Provider {
  id: string;
  name: string
  providerFeatures: string[];
  renderingEngine: string;

  renderModel(model: Model) {
    let renderingArea = document.getElementById('rendering-area');
    let innerHtml = `<h1>Hello</h1>
                     <p>Hello</p>`;
    renderingArea.innerHTML = innerHtml;
  }
}
