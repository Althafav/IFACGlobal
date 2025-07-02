
import { Exhibitpage2026 } from "@/models/exhibitpage2026";
import { Form2026 } from "@/models/form2026";
import { Homepageglobal2026 } from "@/models/homepageglobal2026";
import { Partnerpage } from "@/models/partnerpage";
import { Visitorpage2026 } from "@/models/visitorpage2026";


const KontentDelivery = require("@kentico/kontent-delivery");


export const TypeResolver = [
  new KontentDelivery.TypeResolver("Homepageglobal2026", (rawData: any) => new Homepageglobal2026()),
  new KontentDelivery.TypeResolver("Form2026", (rawData: any) => new Form2026()),
  new KontentDelivery.TypeResolver("Visitorpage2026", (rawData: any) => new Visitorpage2026()),
  new KontentDelivery.TypeResolver("Exhibitpage2026", (rawData: any) => new Exhibitpage2026()),
  new KontentDelivery.TypeResolver("Partnerpage", (rawData: any) => new Partnerpage()),
];
