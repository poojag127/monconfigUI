
const  SERVICE_URL = 'http://10.10.40.7:8006/ProductUI/productSummary/MonitorWebService';

//for running configUI as a standAlone
export const ROUTING_PATH: string = "";

/* Url for Home Screen */
export const GET_TOPO_LIST = `${SERVICE_URL}/getListOfTopology`;
export const GET_TIER_LIST = `${SERVICE_URL}/getTiers`;
// export const UPDATE_TOPOLOGY = `${SERVICE_URL}/uploadtopology`;


/* Url for configuration Screen */
export const GET_MONITORS_DATA = `${SERVICE_URL}/getMonitorsData`;
