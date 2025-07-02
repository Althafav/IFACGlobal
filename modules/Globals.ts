import { TypeResolver } from "./TypeResolvers";


const KontentDelivery = require("@kentico/kontent-delivery");

export default class Globals {
    static PROJECT_ID: string = "ffaed23c-be9d-00c4-c635-e5ab90e66639";

    static SECURE_API_KEY: string =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIwODk3ZDk4OGFlYzQ0NjBlOWFiNTRjMjhiZDNjZjE0OCIsImlhdCI6MTczNjE0ODA1MCwibmJmIjoxNzM2MTQ4MDUwLCJleHAiOjE3Njc2ODM5NDAsInZlciI6IjIuMC4wIiwic2NvcGVfaWQiOiI3MzFmNjVkOTM1YTg0NTJhYTczODg4NDkxYjA3YzlkNCIsInByb2plY3RfY29udGFpbmVyX2lkIjoiMGUzNTE4ZWUyMzcyMDA3MWNhYTE3NDRiM2RhODMzMmEiLCJhdWQiOiJkZWxpdmVyLmtvbnRlbnQuYWkifQ.Eq_7frfwuAjbE82PaXfcEaumkgXK9cmePQud2777icM";
  
    static KontentClient: any = new KontentDelivery.DeliveryClient({
        projectId: Globals.PROJECT_ID,
        globalQueryConfig: {
            useSecuredMode: true, // Queries the Delivery API using secure access.
        },
        secureApiKey: Globals.SECURE_API_KEY,
        typeResolvers: TypeResolver,

    });

     static WSG_PROJECT_ID: string = "0bb5a7d9-15a4-003f-bf75-0042d490fe05";
      static WSG_SECURE_API_KEY: string =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJlZTczNDI1ZDgzZWY0Mjc4OWVlZGEwNTE2OTA0NDBiNCIsImlhdCI6MTczMzEyMzMyOCwibmJmIjoxNzMzMTIzMzI4LCJleHAiOjE3OTYxOTUyODAsInZlciI6IjIuMC4wIiwic2NvcGVfaWQiOiI3MWMzNTk2MjgzZjU0NjVhYTgyYTA3MDUwYWFhYTc5OSIsInByb2plY3RfY29udGFpbmVyX2lkIjoiMjRmOWIzNzM4OGVkMDAzZWMwMWFhOGViMTI1ODdhYzYiLCJhdWQiOiJkZWxpdmVyLmtvbnRlbnQuYWkifQ.XH-9J-1g_jX-XfyvPpc1xI5oQtxSUb5-6W-FgQDx8eM";
    static WSG_KontentClient: any = new KontentDelivery.DeliveryClient({
        projectId: Globals.WSG_PROJECT_ID,
        globalQueryConfig: {
        useSecuredMode: true,
        },
        secureApiKey: Globals.WSG_SECURE_API_KEY,
       
    });
    static SITE_NAME = "IFAC";


    static CURRENT_LANG_CODENAME: string = "default";

    static LANG_COOKIE: string = "0cd50f-lang-cookie";

    static BASE_URL: string =
        process.env.NODE_ENV === "production"
            ? "https://strategic-v2-omega.vercel.app/"
            : "http://localhost:3000/";
}