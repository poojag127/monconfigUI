

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
 monName:string;
 enable:boolean;
 hostName:string;
 port:number;
 userName:string;
 pwd:string;
 mBeanType:string;
 instanceName:string;
}
