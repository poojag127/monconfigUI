
const  SERVICE_URL = 'http://10.10.40.7:8006/ProductUI/productSummary/MonitorWebService';
// const  SERVICE_URL = 'https://10.10.50.5/ProductUI/productSummary/MonitorWebService';
// const  SERVICE_URL = 'https://10.10.60.12/ProductUI/productSummary/MonitorWebService';

//for running configUI as a standAlone
export const ROUTING_PATH: string = "";

/* Url for Home Screen */
export const GET_TOPO_LIST = `${SERVICE_URL}/getListOfTopology`;
export const GET_TIER_LIST = `${SERVICE_URL}/getTiers`;
export const GET_PROFILE_LIST = `${SERVICE_URL}/getProfileListFromTopo/`;
// export const UPDATE_TOPOLOGY = `${SERVICE_URL}/uploadtopology`;


/** Url for configuration Home Screen */
export const GET_MONITORS_DATA = `${SERVICE_URL}/getMonitorsData`;
export const GET_TIER_MONITORS_DATA = `${SERVICE_URL}/getTreeTableData`; 
export const GET_CHILD_NODES = `${SERVICE_URL}/getChildNodesDataByCategoryName`;
export const GET_COMPONENTS = `${SERVICE_URL}/getComponentByMon`;

/** Url for getting server list***/
export const GET_SERVER_LIST = `${SERVICE_URL}/getServerList`;
