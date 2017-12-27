

export class WeblogicTypesData
{
  JDBCStats :WeblogicConfigureData[];
  JVMStats :WeblogicConfigureData[];
  ThreadPoolStats :WeblogicConfigureData[];
  SessionStats:WeblogicConfigureData[];
  JMSQueueStats:WeblogicConfigureData[];
  MinThreadConstraintStats:WeblogicConfigureData[];
  TransactionStats:WeblogicConfigureData[];
}

export class WeblogicConfigureData
{
 tierName:string;
 weblogicStats:string;
 monName:string
 enable:boolean=false;
 hostName:string ='127.0.0.1';
 port:number=17000;
 userName:string='weblogic';
 pwd:string='weblogic';
 mBeanType:string;
 instanceName:string;
 server:string;
 id:number;
}
