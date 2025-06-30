
import { Form2026 } from "@/models/form2026";
import { Homepageglobal2026 } from "@/models/homepageglobal2026";


const KontentDelivery = require("@kentico/kontent-delivery");


export const TypeResolver = [
  new KontentDelivery.TypeResolver("Homepageglobal2026", (rawData: any) => new Homepageglobal2026()),
  new KontentDelivery.TypeResolver("Form2026", (rawData: any) => new Form2026()),



];
