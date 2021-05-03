import {Model} from "./Model";
import {PointersService} from "../services/pointers.service";
import {Pointer} from "./Pointer";

export interface Provider {
  // properties
  id: string;
  name: string
  providerFeatures: string[];
  renderingEngine: string;
  pointerTrigger?: boolean;
  selectedPointerId?: string;

  // methods
  renderModel(model: Model): void;

  setPointerService?(pointersService: PointersService): void;

  setPointerTrigger?(value: boolean): void;

  showPointer?(pointer: Pointer, scene?: any): void;
}
