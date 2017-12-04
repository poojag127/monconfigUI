export class monitorsData
{
 weblogic: configureData[];
}

export class configureData
{
 tierName:string;
 monName:string;
 enable:boolean;
 hostName:string;
 port:number;
 userName:string;
 pwd:string;
 mBeanType:string;
 instanceName:string;
}

